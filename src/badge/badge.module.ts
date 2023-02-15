/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-15 17:43:32
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-15 17:45:40
 * @FilePath: /minibbs/src/badge/badge.module.ts
 * @Description: badge module
 */
import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './entities/badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  controllers: [BadgeController],
  providers: [BadgeService]
})
export class BadgeModule { }
