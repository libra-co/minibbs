/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:20:13
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 19:02:43
 * @FilePath: /minibbs/src/user/user.module.ts
 * @Description: user module
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userDetail.entity';
import { Friend } from '../friend/entities/friend.entity';
import { FriendService } from 'src/friend/friend.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetail, Friend])
  ],
  controllers: [UserController],
  providers: [UserService, FriendService],
  exports: [UserService]
})
export class UserModule { }
