/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-04-01 18:23:46
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-04-02 12:48:25
 * @FilePath: \MINIBBS_NEST\src\activeLog\activeLog.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { ActiveLogService } from './activeLog.service';
import { ActiveLogController } from './activeLog.controller';

@Module({
  controllers: [ActiveLogController],
  providers: [ActiveLogService]
})
export class ActiveLogModule {}
