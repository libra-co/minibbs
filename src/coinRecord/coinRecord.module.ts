/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 18:06:44
 * @FilePath: /minibbs/src/coinRecord/coinRecord.module.ts
 * @Description: coinRecord module
 */
import { Module } from '@nestjs/common';
import { CoinRecordService } from './coinRecord.service';
import { CoinRecordController } from './coinRecord.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinRecord } from './entities/coinRecord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoinRecord])],
  controllers: [CoinRecordController],
  providers: [CoinRecordService]
})
export class CoinModule { }
