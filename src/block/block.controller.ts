/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-28 10:37:44
 * @FilePath: /minibbs/src/block/block.controller.ts
 * @Description: block controller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlockService } from './block.service';
import { AddBlockDto, BlockDetailDto, EditBlockDto, ListBlockDto } from './dto/block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) { }

  @Post('add')
  add(@Body() addBlockDto: AddBlockDto) {
    return this.blockService.add(addBlockDto)
  }

  @Post('list')
  list(@Body() listBlockDto: ListBlockDto) {
    return this.blockService.list(listBlockDto)
  }

  @Post('delete')
  delete(@Body('blid') blid: string) {
    return this.blockService.delete(blid)
  }

  @Post('edit')
  edit(@Body() editBlockDto: EditBlockDto) {
    return this.blockService.edit(editBlockDto)
  }

  @Get('detail')
  blockDetial(@Query() blockDetailDto: BlockDetailDto) {
    return this.blockService.blockDetail(blockDetailDto)
  }

}
