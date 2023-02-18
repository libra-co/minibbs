/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-18 17:09:04
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-18 17:12:40
 * @FilePath: \minibbs\src\zone\zone.controller.ts
 * @Description: zone controller
 */
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/zone.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  add(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.add(createZoneDto);
  }



}
