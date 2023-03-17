/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 19:11:28
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 19:24:49
 * @FilePath: \minibbs\src\friend\friend.module.ts
 * @Description: Friends 模块
 */
import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserDetail } from 'src/user/entities/userDetail.entity';
import { Mail } from 'src/mail/entities/mail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend, User, UserDetail,Mail])
  ],
  controllers: [FriendController],
  providers: [FriendService, UserService]
})
export class FriendModule { }
