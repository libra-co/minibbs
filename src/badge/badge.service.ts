/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-15 17:43:32
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-16 00:31:29
 * @FilePath: /minibbs/src/badge/badge.service.ts
 * @Description: badge service
 */
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commonCatchErrorReturn, WithCommonPaginationConfig } from 'src/utils/utils';
import { DataSource, Repository } from 'typeorm';
import { CreateBadgeDto, ListBadgeDto, ListBadgeReturnDto, UpdateBadgeDto } from './dto/badge.dto';
import { Badge } from './entities/badge.entity';
import * as dayjs from 'dayjs'
import { CommonReturn } from 'src/utils/commonInterface';
import { User } from 'src/user/entities/user.entity';
import { CoinRecordService } from 'src/coinRecord/coinRecord.service';
import { OperationType } from 'src/coinRecord/cosnt';
import { ReservedAccount } from 'src/user/const';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @Inject()
    private readonly coinRecordService: CoinRecordService,
    private readonly dataSource: DataSource
  ) { }

  async create(createBadgeDto: CreateBadgeDto): Promise<CommonReturn> {
    const newBadge = new Badge()
    for (const field in createBadgeDto) {
      if (Object.prototype.hasOwnProperty.call(createBadgeDto, field)) {
        newBadge[field] = createBadgeDto[field];
      }
      newBadge.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    await this.badgeRepository.save(newBadge)
    return {
      message: '服务君把勋章摆到勋章墙上啦',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async list(listBadgeDto: ListBadgeDto): Promise<CommonReturn<WithCommonPaginationConfig<ListBadgeReturnDto[]>>> {
    const { pageNum, pageSize, ...queryPrams } = listBadgeDto
    const badgeList = await this.badgeRepository.find({
      where: { ...queryPrams },
      select: ['bid', 'description', 'name', 'picLink', 'price'],
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    })
    return {
      message: '服务君把勋章摆到勋章墙上啦',
      status: HttpStatus.OK,
      result: {
        total: badgeList.length,
        pageNum: pageNum,
        pageSize: pageSize,
        dataList: badgeList,
      }
    }
  }

  async delete(bid: string): Promise<CommonReturn> {
    const targetBadge = await this.badgeRepository.findOne({ where: { bid } })
    this.badgeRepository.remove(targetBadge)
    return {
      message: '服务君把勋章从勋章墙上摘下来啦',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async update(updateBadgeDto: UpdateBadgeDto): Promise<CommonReturn> {
    const { bid, ...updateParams } = updateBadgeDto
    const targetBadge = await this.badgeRepository.findOneOrFail({ where: { bid } })
    for (const field in updateBadgeDto) {
      if (Object.prototype.hasOwnProperty.call(updateBadgeDto, field)) {
        targetBadge[field] = updateBadgeDto[field];
      }
    }
    console.log('targetBadge', targetBadge)
    await this.badgeRepository.save(targetBadge)

    return {
      message: '服务君把勋章擦亮啦~',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async buy(uid: number, bid: string): Promise<CommonReturn> {
    const currentUser = await this.userRepository.findOneOrFail({ where: { uid } })
    const currentBadge = await this.badgeRepository.findOneOrFail({ where: { bid } })
    // 校验账户余额
    if (currentUser.coin < currentBadge.price) return { message: '大人，钱不够啦！服务君可不赊账噢！', status: HttpStatus.BAD_REQUEST, result: '' }
    const newUserBadgeInfo = currentUser.badge ? currentUser.badge + ',' + bid : bid
    console.log('newUserBadgeInfo', newUserBadgeInfo)
    const newCurrentUser: User = { ...currentUser, badge: newUserBadgeInfo }
    const queryRunner = this.dataSource.createQueryRunner()
    console.log('567', 567)
    
    queryRunner.connect()
    queryRunner.startTransaction()
    try {
      await this.userRepository.save(newCurrentUser)
      await this.coinRecordService.transfer(uid, { targetUid: ReservedAccount.stystem, changeNum: currentBadge.price, operationType: OperationType.BuyBadge })
      await queryRunner.commitTransaction()
      return {
        message: '服务君亲手把勋章给你带上啦，今天魅力又多了一分~',
        status: HttpStatus.OK,
        result: ''
      }
    } catch {

      await queryRunner.rollbackTransaction()
      return commonCatchErrorReturn
    } finally {
      await queryRunner.release()
    }
  }

}
