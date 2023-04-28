/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-14 21:04:10
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-26 15:39:02
 * @FilePath: \minibbs\src\coinRecord\coinRecord.service.ts
 * @Description: coinRecord service
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, QueryRunner, Repository } from 'typeorm';
import { CommentRewardReturnDto, ListCoinRecordDto, ListCoinRecordReturnDto, TransferCoinRecordDto } from './dto/coinRecord.dto';
import { CoinRecord } from './entities/coinRecord.entity';
import { User } from 'src/user/entities/user.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { commonCatchErrorReturn, WithCommonPaginationConfig } from 'src/utils/utils';
import { CoinOperationType } from 'src/operationCoin/const';
import { OperationcoinService } from 'src/operationCoin/operationCoin.service';

@Injectable()
export class CoinRecordService {
  constructor(
    @InjectRepository(CoinRecord)
    private readonly coinRecordRepository: Repository<CoinRecord>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @Inject(OperationcoinService)
    private readonly operationCoinService: OperationcoinService,
    private readonly datasource: DataSource
  ) { }

  /**
   * @description 转账
   * @param uid 操作人的uid --> operation uid, 系统id为0
   * @param transferDto 
   * @returns 
   */
  async transfer(uid: number, transferDto: TransferCoinRecordDto): Promise<CommonReturn> {
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
    newCoinRecord.operatorUid = uid

    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
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
  /**
   * 
   * @param uid 
   * @param listCoinRecordDto 
   * @returns 
   * @todo 需要添加角色校验
   */
  async list(uid: number, listCoinRecordDto: ListCoinRecordDto): Promise<CommonReturn<WithCommonPaginationConfig<ListCoinRecordReturnDto[]> | []>> {
    // 还未做角色校验，此处强制修改为登录的uid
    if (listCoinRecordDto.uid !== uid) {
      listCoinRecordDto.uid = uid
    }
    const { pageNum, pageSize, uid: queryUid, ...queryParmms } = listCoinRecordDto
    // 查询条件
    const condition: Record<string, any> = {}
    // 时间条件
    if (queryParmms.day && queryParmms.month && queryParmms.year) {
      condition.operationTime = Like(`${queryParmms.year}-${+queryParmms.month < 10 ? '0' + queryParmms.month : queryParmms.month}-${+queryParmms.day < 10 ? '0' + queryParmms.day : queryParmms.day}%`)
    } else if (queryParmms.month && queryParmms.year) {
      condition.operationTime = Like(`${queryParmms.year}-${+queryParmms.month < 10 ? '0' + queryParmms.month : queryParmms.month}%`)
    } else if (queryParmms.year) {
      condition.operationTime = Like(`${queryParmms.year}%`)
    }
    // 操作类型
    if (listCoinRecordDto.operationType in CoinOperationType) {
      condition.operationType = queryParmms.operationType
    }

    const findOutRecordList = await this.coinRecordRepository.find({
      where: [{ targetUid: queryUid || uid, ...condition }, { operatorUid: queryUid || uid, ...condition },],
      order: { operationTime: 'DESC' },
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    })
    const resultList = await Promise.all(findOutRecordList.map(async item => {
      const operatorUsername = await this.userRepository.findOneOrFail({ where: { uid: item.operatorUid }, select: ['username'] })
      return { ...item, operatorUsername: operatorUsername.username }
    }))
    const total = await this.coinRecordRepository.count({ where: [{ targetUid: queryUid || uid, ...condition }, { operatorUid: queryUid || uid, ...condition }] })
    return {
      message: '大人，这是您的账本！',
      status: HttpStatus.OK,
      result: {
        dataList: resultList,
        pageNum: pageNum,
        pageSize: pageSize,
        total: total
      }
    }
  }

  /**
  * @description 用户金币、经验变更，记录金币变更到表
  * @param uid 用户UID
  * @param operationType 操作类型
  * @param startedQueryRunner 来自调用者的QueryRunner
  * @returns 
  */
  async operationCoinExChange(uid: number, operationType: CoinOperationType, startedQueryRunner?: QueryRunner): Promise<CommonReturn<CommentRewardReturnDto> | CommonReturn> {
    // 查询变更数据
    const targetChangeResult = await this.operationCoinService.findOne({ operationType })
    const { changeCoin, changeEx } = targetChangeResult.result
    targetChangeResult.result
    // 查询目标用户信息
    const currentUser = await this.userRepository.findOneOrFail({ where: { uid } })
    let isCoinEnough = currentUser.coin + changeCoin >= 0  // 用户金币经验是否可以足够本次扣除
    let isExEnough = currentUser.experience + changeEx >= 0 // 用户金币经验是否可以足够本次扣除
    // 根据用户剩余金币、经验决定用户信息
    currentUser.coin = isCoinEnough ? currentUser.coin + changeCoin : 0
    currentUser.experience = isExEnough ? currentUser.experience + changeEx : 0
    // 生成金额变更记录
    const newCoinRecord = new CoinRecord()
    newCoinRecord.balance = currentUser.coin
    newCoinRecord.changeNum = isCoinEnough ? changeCoin : currentUser.coin
    newCoinRecord.operationType = operationType
    newCoinRecord.operatorUid = 0
    newCoinRecord.targetUid = uid
    // 成功的回复
    const successReturn = {
      message: '操作成功！',
      status: HttpStatus.OK,
      result: { changeEx, changeCoin },
    }
    // 如果是调用来自外部的 QueryRunner
    if (startedQueryRunner) {
      await startedQueryRunner.manager.save(User, currentUser)
      await startedQueryRunner.manager.save(CoinRecord, newCoinRecord)
      return successReturn
    }
    // 调用方法内部的QueryRunner
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.save(User, currentUser)
      await queryRunner.manager.save(CoinRecord, newCoinRecord)
      await queryRunner.commitTransaction()
      return successReturn
    } catch (error) {
      console.log('error', error)
      await queryRunner.rollbackTransaction()
      return commonCatchErrorReturn
    } finally {
      await queryRunner.release()
    }
  }

}
