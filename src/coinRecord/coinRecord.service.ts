/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-14 21:04:10
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-16 00:31:40
 * @FilePath: \minibbs\src\coinRecord\coinRecord.service.ts
 * @Description: coinRecord service
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ListCoinRecordDto, ListCoinRecordReturnDto, TransferCoinRecordDto } from './dto/coinRecord.dto';
import { CoinRecord } from './entities/coinRecord.entity';
import * as dayjs from 'dayjs'
import { User } from 'src/user/entities/user.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { WithCommonPaginationConfig } from 'src/utils/utils';

@Injectable()
export class CoinRecordService {
  constructor(
    @InjectRepository(CoinRecord)
    private readonly coinRecordRepository: Repository<CoinRecord>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly datasource: DataSource
  ) { }

  /**
   * @description 转账
   * @param uid 操作人的uid --> operation uid, 系统id为0
   * @param transferDto 
   * @returns 
   */
  async transfer(uid: number, transferDto: TransferCoinRecordDto): Promise<CommonReturn> {
    console.log('2', 2)
    // 操作人
    const operatorUser = await this.userRepository.findOneOrFail({ where: { uid } })
    if (!operatorUser) return { message: '银行暂时对你的身份标识怀疑，请稍候再找服务君哦！', status: HttpStatus.INTERNAL_SERVER_ERROR, result: '' }
    // 收款人
    const targetUser = await this.userRepository.findOneOrFail({ where: { uid: transferDto.targetUid } })
    if (!targetUser) return { message: '查无此人，请核对号收款人后再找服务君哦！', status: HttpStatus.INTERNAL_SERVER_ERROR, result: '' }
    // 判断转账额度大于账户余额
    if ((operatorUser.coin - transferDto.changeNum) < 0) return { message: '你的存款不够啦，服务君可不自掏腰包哦！', status: HttpStatus.BAD_REQUEST, result: '' }
    const newOperatorUser = { ...operatorUser, coin: operatorUser.coin - transferDto.changeNum }
    const newTargetUser = { ...targetUser, coin: operatorUser.coin + transferDto.changeNum }
    // 生成转账记录
    const newCoinRecord = new CoinRecord()
    for (const field in transferDto) {
      if (Object.prototype.hasOwnProperty.call(transferDto, field)) {
        newCoinRecord[field] = transferDto[field];
      }
    }
    newCoinRecord.balance = targetUser.coin - transferDto.changeNum
    newCoinRecord.operationTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    newCoinRecord.operatorUid = uid

    const queryRunner = this.datasource.createQueryRunner()
    queryRunner.connect()
    queryRunner.startTransaction()
    try {
      // 扣除转账用户余额，增加目标账户余额
      await queryRunner.manager.save(User, [newOperatorUser, newTargetUser,])
      await queryRunner.manager.save(CoinRecord, newCoinRecord)
      await queryRunner.commitTransaction()
      return {
        message: '服务君已经把钱给到他手里啦，希望他能好好利用这笔钱！',
        status: HttpStatus.OK,
        result: ''
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return {
        message: '银行下班啦，请稍候再找服务君哦！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: ''
      }
    } finally {
      await queryRunner.release()
    }
  }

  // 查询
  async list(uid: number, listCoinRecordDto: ListCoinRecordDto): Promise<CommonReturn<WithCommonPaginationConfig<ListCoinRecordReturnDto[]> | []>> {
    // 还未做角色校验，此处强制修改为登录的uid
    if (listCoinRecordDto.uid !== uid) {
      listCoinRecordDto.uid = uid
    }
    const { pageNum, pageSize, uid: queryUid, ...queryParmms } = listCoinRecordDto
    const findOutRecordList = await this.coinRecordRepository.find({
      where: [{ targetUid: queryUid || uid, ...queryParmms }, { operatorUid: queryUid || uid, ...queryParmms }],
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    })
    const resultList = await Promise.all(findOutRecordList.map(async item => {
      const operatorUsername = await this.userRepository.findOneOrFail({ where: { uid: item.operatorUid }, select: ['username'] })
      return { ...item, operatorUsername: operatorUsername.username }
    }))
    return {
      message: '大人，这是您的账本！',
      status: HttpStatus.OK,
      result: {
        dataList: resultList,
        pageNum: pageNum,
        pageSize: pageSize,
        total: resultList.length
      }
    }
  }

}
