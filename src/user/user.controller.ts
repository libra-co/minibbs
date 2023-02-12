/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:20:13
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 21:57:25
 * @FilePath: /minibbs/src/user/user.controller.ts
 * @Description: user controller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  getBasicProfile(@Query('uid') uid: number) {
    return this.userService.basicProfile(uid)
  }

  @Get('detailProfile')
  getDetailProfile(@Query('uid') uid: number) {
    return this.userService.getDetailProfile(uid)
  }

}
