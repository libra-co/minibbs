/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 18:06:35
 * @FilePath: /minibbs/src/coin/coin.controller.ts
 * @Description: coin controller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinRecordService } from './coinRecord.service';


@Controller('coin')
export class CoinRecordController {
  constructor(private readonly coinService: CoinRecordService) { }

  // @Post()
  // create(@Body() createCoinDto: CreateCoinRecordDto) {
  //   return this.coinService.update(createCoinDto);
  // }

}
