/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-14 22:00:53
 * @FilePath: /minibbs/src/coin/coin.controller.ts
 * @Description: coin controller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoinRecordService } from './coinRecord.service';
import { ListCoinRecordDto, TransferCoinRecordDto } from './dto/coinRecord.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('coinRecord')
export class CoinRecordController {
  constructor(private readonly coinRecordService: CoinRecordService) { }

  @Post('transfer')
  transfer(@Req() req, @Body() tranferRecordDto: TransferCoinRecordDto) {
    return this.coinRecordService.transfer(req.user.uid, tranferRecordDto)
  }

  @Post('list')
  list(@Req() req, @Body() listCoinRecordDto: ListCoinRecordDto) {
    return this.coinRecordService.list(req.user.uid, listCoinRecordDto)
  }

  // @Post()
  // create(@Body() createCoinDto: CreateCoinRecordDto) {
  //   return this.coinService.update(createCoinDto);
  // }

}
