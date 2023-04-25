/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-25 14:02:04
 * @FilePath: /minibbs/src/zone/zone.module.ts
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { BlockModule } from 'src/block/block.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Zone]),
    BlockModule
  ],
  controllers: [ZoneController],
  providers: [ZoneService]
})
export class ZoneModule { }
