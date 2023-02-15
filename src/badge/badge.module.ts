/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-15 17:43:32
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-15 23:26:22
 * @FilePath: /minibbs/src/badge/badge.module.ts
 * @Description: badge module
 */
import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './entities/badge.entity';
import { User } from 'src/user/entities/user.entity';
import { CoinRecordService } from 'src/coinRecord/coinRecord.service';
import { CoinRecord } from 'src/coinRecord/entities/coinRecord.entity';
import { CoinRecordModule } from 'src/coinRecord/coinRecord.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, User, CoinRecord]),
    // CoinRecordModule,
  ],
  controllers: [BadgeController],
  providers: [BadgeService, CoinRecordService]
})
export class BadgeModule { }
