/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-18 10:50:19
 * @FilePath: /minibbs/src/coinRecord/CoinRecordModule.module.ts
 * @Description: CoinRecordModule module
 */
import { Module } from '@nestjs/common';
import { CoinRecordService } from './coinRecord.service';
import { CoinRecordController } from './coinRecord.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinRecord } from './entities/coinRecord.entity';
import { User } from 'src/user/entities/user.entity';
import { OperationCoin } from '../operationCoin/entities/operationCoin.entity';
import { OperationcoinModule } from 'src/operationCoin/operationCoin.module';
import { BadgeModule } from 'src/badge/badge.module';
import { OperationcoinService } from 'src/operationCoin/operationCoin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoinRecord, User,OperationCoin]),
    OperationcoinModule,
  ],
  controllers: [CoinRecordController],
  providers: [CoinRecordService,OperationcoinService],
  exports: [CoinRecordService]
})
export class CoinRecordModule { }
