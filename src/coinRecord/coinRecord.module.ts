/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-15 23:28:23
 * @FilePath: /minibbs/src/coinRecord/CoinRecordModule.module.ts
 * @Description: CoinRecordModule module
 */
import { Module } from '@nestjs/common';
import { CoinRecordService } from './coinRecord.service';
import { CoinRecordController } from './coinRecord.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinRecord } from './entities/coinRecord.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoinRecord, User])],
  controllers: [CoinRecordController],
  providers: [CoinRecordService],
  exports: [CoinRecordService]
})
export class CoinRecordModule { }
