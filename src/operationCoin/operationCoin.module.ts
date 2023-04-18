/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 17:55:39
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-18 11:17:57
 * @FilePath: /minibbs/src/operationCoin/operationcoin.module.ts
 * @Description: 金币变更模块
 */
import { Module } from '@nestjs/common';
import { OperationcoinService } from './operationCoin.service';
import { OperationcoinController } from './operationCoin.controller';
import { OperationCoin } from './entities/operationCoin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([OperationCoin]), 
  ],
  controllers: [OperationcoinController],
  providers: [OperationcoinService],
  exports: [OperationcoinService]
})
export class OperationcoinModule { }
