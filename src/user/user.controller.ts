/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:20:13
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-09 21:56:38
 * @FilePath: /minibbs/src/user/user.controller.ts
 * @Description: user controller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditProfileDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  getBasicProfile(@Req() req, @Query('uid') uid: number) {
    console.log('ui123d', uid)
    const d1d123 = uid
    return this.userService.basicProfile(uid)
  }

  @Get('detailProfile')
  getDetailProfile(@Query('uid') uid: number) {
    return this.userService.getDetailProfile(uid)
  }

  @Post('editProfile')
  editProfile(@Req() req, @Body() editProfileDto: EditProfileDto) {
    return this.userService.editProfile(req.user.uid, editProfileDto)
  }


}
