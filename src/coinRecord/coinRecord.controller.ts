/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 18:00:35
 * @FilePath: /minibbs/src/coin/coin.controller.ts
 * @Description: coin controller
 */
import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
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

}
