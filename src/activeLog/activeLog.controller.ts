/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-04-01 18:23:46
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-04-02 12:36:49
 * @FilePath: \MINIBBS_NEST\src\activeLog\active-log.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActiveLogService } from './activeLog.service';
import { CreateActiveLogDto } from './dto/activeLog.dto';

@Controller('activeLog')
export class ActiveLogController {
  constructor(private readonly activeLogService: ActiveLogService) {}

  @Post()
  create(@Body() createActiveLogDto: CreateActiveLogDto) {
    return this.activeLogService.create(createActiveLogDto);
  }

  @Get()
  findAll() {
    return this.activeLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activeLogService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activeLogService.remove(+id);
  }
}
