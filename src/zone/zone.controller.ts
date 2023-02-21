/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-18 17:09:04
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-21 14:45:03
 * @FilePath: \minibbs\src\zone\zone.controller.ts
 * @Description: zone controller
 */
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto, EditZoneDto } from './dto/zone.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) { }

  @Post('add')
  add(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.add(createZoneDto);
  }

  @Get('list')
  list() {
    return this.zoneService.list()
  }

  @Post('delete')
  delete(@Body('zid') zid: string) {
    return this.zoneService.delete(zid)
  }

  @Post('edit')
  update(@Body() editZoneDto: EditZoneDto) {
    return this.zoneService.edit(editZoneDto)
  }


}
