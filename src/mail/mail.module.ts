/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-13 22:32:26
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-15 11:08:11
 * @FilePath: \minibbs\src\mail\mail.module.ts
 * @Description: mail module
 */
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mail, User])],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
