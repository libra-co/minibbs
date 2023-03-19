/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:20:13
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-19 21:51:32
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
import { Comment } from 'src/comment/entities/comment.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetail, Friend, Mail, Comment, Article])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
