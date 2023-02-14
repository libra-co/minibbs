/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 18:07:31
 * @FilePath: /minibbs/src/coinRecord/coinRecord.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TransferCoinRecordDto } from './dto/coinRecord.dto';
import { CoinRecord } from './entities/coinRecord.entity';


@Injectable()
export class CoinRecordService {
  constructor(
    @InjectRepository(CoinRecord)
    coinRecord: Repository<CoinRecord>,
    datasource: DataSource
  ) { }

  async transfer(uid: number, transferDto: TransferCoinRecordDto) {
    const newCoinRecord = new CoinRecord()
  }

  update(id: number, updateCoinDto: any) {
    return `This action updates a #${id} coin`;
  }

}
