/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 19:11:28
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-19 21:50:29
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
import { Comment } from 'src/comment/entities/comment.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend, User, UserDetail, Mail, Comment, Article])
  ],
  controllers: [FriendController],
  providers: [FriendService, UserService]
})
export class FriendModule { }
