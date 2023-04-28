/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-04-01 18:23:46
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-27 11:50:20
 * @FilePath: \MINIBBS_NEST\src\activeLog\activeLog.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { AddActiveLogDto, ListActiveLogReturnDto, ActiveLogListDto } from './dto/activeLog.dto';
import { Repository } from 'typeorm';
import { ActiveLog } from './entities/activeLog.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { WithCommonPaginationConfig } from 'src/utils/utils';
import { CoinOperationType } from 'src/operationCoin/const';
import { Article } from 'src/article/entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ActiveLogService {
  constructor(
    @InjectRepository(ActiveLog)
    private readonly activeLogRepository: Repository<ActiveLog>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) { }

  /**
   * @description 创建活动日志
   * @param createActiveLogDto 
   * @param T 泛型 CoinOperationType，如果没有则传 unknown
   * @returns 
   */
  async addRecord<T extends CoinOperationType>(createActiveLogDto: AddActiveLogDto<T>): Promise<boolean> {
    try {
      const newActiveLog = new ActiveLog()
      for (const field in createActiveLogDto) {
        if (Object.prototype.hasOwnProperty.call(createActiveLogDto, field)) {
          newActiveLog[field] = createActiveLogDto[field]
        }
      }
      const saveResult = this.activeLogRepository.save(newActiveLog)
      if (!saveResult) return Promise.reject(false)
      return Promise.resolve(true)

    } catch (error) {
      console.log('error', error)
      return Promise.reject(false)
    }
  }

  async list(listActiveLogDto: ActiveLogListDto): Promise<CommonReturn<WithCommonPaginationConfig<ListActiveLogReturnDto[]>>> {
    const { pageNum, pageSize, uid } = listActiveLogDto
    const activeLogList = await this.activeLogRepository.find({
      where: { uid },
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    })

    const dataList = await Promise.all(activeLogList.map(async activeLogItem => {
      switch (activeLogItem.operationType) {
        case CoinOperationType.PostArtical || CoinOperationType.DeleteArtical || CoinOperationType.ReplyArtical || CoinOperationType.ReplyComment:
          const targetArticle = await this.articleRepository.findOne({ where: { aid: activeLogItem.aid } })
          return { ...activeLogItem, articleTitle: targetArticle.title }
        default:
          return activeLogItem;
      }
    }))

    const total = await this.activeLogRepository.count({ where: { uid } })
    return {
      result: {
        dataList,
        pageNum,
        pageSize,
        total
      },
      status: HttpStatus.OK,
      message: '查到近期的活动记录啦！'
    }
  }

}
