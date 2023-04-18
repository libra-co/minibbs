import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddNewCoinOperationTypeDto, EditCoinOperationTypeDto, FindOneCoinOperationTypeDto, RemoveCoinOperationTypeDto } from './dto/operationCoin.dto';
import { OperationcoinService } from './operationCoin.service';

@UseGuards(AuthGuard('jwt'))
@Controller('operationCoin')
export class OperationcoinController {
  constructor(
    private readonly operationcoinService: OperationcoinService
  ) { }
  @Get('list')
  list() {
    return this.operationcoinService.list()
  }

  @Post('add')
  add(@Req() req, @Body() addNewCoinOperationTypeDto: AddNewCoinOperationTypeDto) {
    return this.operationcoinService.add(addNewCoinOperationTypeDto)
  }
  @Post('edit')
  edit(@Req() req, @Body() editCoinOperationTypeDto: EditCoinOperationTypeDto) {
    return this.operationcoinService.edit(editCoinOperationTypeDto)
  }
  @Post('remove')
  remove(@Req() req, @Body() removeCoinOperationTypeDto: RemoveCoinOperationTypeDto) {
    return this.operationcoinService.remove(removeCoinOperationTypeDto)
  }
  @Get('findOne')
  findOne(@Query() findOneCoinOperationTypeDto: FindOneCoinOperationTypeDto) {
    return this.operationcoinService.findOne(findOneCoinOperationTypeDto)
  }
}
