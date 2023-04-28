/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-04-01 18:23:46
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-27 10:28:01
 * @FilePath: \MINIBBS_NEST\src\activeLog\activeLog.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { ActiveLogService } from './activeLog.service';
import { ActiveLogController } from './activeLog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveLog } from './entities/activeLog.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActiveLog, Article])
  ],
  controllers: [ActiveLogController],
  providers: [ActiveLogService],
  exports: [ActiveLogService]
})
export class ActiveLogModule { }
