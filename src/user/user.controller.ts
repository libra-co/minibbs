/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:20:13
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-15 15:02:47
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
  getBasicProfile(@Req()req,@Query('uid') uid: number) {
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
