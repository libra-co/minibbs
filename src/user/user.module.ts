/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:20:13
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-17 14:50:48
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
import { Badge } from 'src/badge/entities/badge.entity';
import { Mail } from 'src/mail/entities/mail.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetail, Friend, Mail])
  ],
  controllers: [UserController],
  providers: [UserService, FriendService, MailService],
  exports: [UserService]
})
export class UserModule { }
