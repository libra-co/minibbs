import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/badge.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) { }

  @Post('add')
  create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.create(createBadgeDto);
  }

  @Post('list')
  list(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.list(createBadgeDto);
  }

}
