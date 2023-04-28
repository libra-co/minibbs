/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-04-01 18:23:46
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-27 10:21:31
 * @FilePath: \MINIBBS_NEST\src\activeLog\active-log.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ActiveLogService } from './activeLog.service';
import { AuthGuard } from '@nestjs/passport';
import { ActiveLogListDto } from './dto/activeLog.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('activeLog')
export class ActiveLogController {
  constructor(private readonly activeLogService: ActiveLogService) { }


  @Post('list')
  list(@Body() activeLogListDto: ActiveLogListDto) {
    return this.activeLogService.list(activeLogListDto);
  }

}
