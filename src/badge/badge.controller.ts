import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BadgeService } from './badge.service';
import { CreateBadgeDto, ListBadgeDto, UpdateBadgeDto } from './dto/badge.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) { }

  @Post('add')
  create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.create(createBadgeDto);
  }

  @Post('list')
  list(@Body() createBadgeDto: ListBadgeDto) {
    return this.badgeService.list(createBadgeDto);
  }

  @Post('delete')
  delete(@Body('bid') bid: string) {
    return this.badgeService.delete(bid)
  }

  @Post('update')
  update(@Body() updateBadgeDto: UpdateBadgeDto) {
    return this.badgeService.update(updateBadgeDto)
  }
  @Post('buy')
  buy(@Req() req, @Body('bid') bid: string) {
    return this.badgeService.buy(req.user.uid, bid)
  }

}
