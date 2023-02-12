/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 19:11:28
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 19:25:56
 * @FilePath: \minibbs\src\friend\friend.controller.ts
 * @Description: friend controller
 */
import { Controller, Get, Post, Body, Req, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetFriendDto } from './dto/friend.dto';
import { FriendService } from './friend.service';

@UseGuards(AuthGuard('jwt'))
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) { }

  @Post('add')
  addFriend(@Req() req, @Body('uid') friendUid: number) {
    console.log('req', req)
    return this.friendService.add(req.user.uid, friendUid)
  }

  @Get('list')
  list(@Req() req, @Query() getFriendDto: GetFriendDto) {
    return this.friendService.list(req.user.id, getFriendDto)
  }

  @Post('delete')
  delete(@Req() req, @Query('uid') friendUid: number) {
    return this.friendService.delete(req.user.id, friendUid)
  }
}
