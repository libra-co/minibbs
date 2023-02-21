/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-21 15:15:44
 * @FilePath: /minibbs/src/block/block.module.ts
 * @Description: block module
 */
import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from './entities/block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Block])],
  controllers: [BlockController],
  providers: [BlockService]
})
export class BlockModule { }
