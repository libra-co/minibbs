/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 17:26:55
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-18 16:48:05
 * @FilePath: /minibbs/src/app.module.ts
 * @Description: 主程序入口
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { dataBaseConfig } from './const'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendModule } from './friend/friend.module';
import { MailModule } from './mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinRecordModule } from './coinRecord/coinRecord.module';
import { BadgeModule } from './badge/badge.module';
import { BookMarkModule } from './bookMark/bookMark.module';
import { BlockModule } from './block/block.module';
import { ZoneModule } from './zone/zone.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    UserModule,
    AuthModule,
    FriendModule,
    MailModule,
    CoinRecordModule,
    BadgeModule,
    BookMarkModule,
    BlockModule,
    ZoneModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
