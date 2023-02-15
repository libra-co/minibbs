/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 17:26:55
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 16:14:35
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
import { CoinModule } from './coinRecord/coinRecord.module';
import { BadgeModule } from './badge/badge.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    UserModule,
    AuthModule,
    FriendModule,
    MailModule,
    CoinModule,
    BadgeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
