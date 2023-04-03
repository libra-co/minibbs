/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 17:55:39
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 18:17:23
 * @FilePath: /minibbs/src/operationCoin/operationcoin.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { OperationcoinService } from './operationCoin.service';
import { OperationcoinController } from './operationCoin.controller';
import { OperationCoin } from './entities/operationCoin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OperationCoin])],
  controllers: [OperationcoinController],
  providers: [OperationcoinService]
})
export class OperationcoinModule { }
