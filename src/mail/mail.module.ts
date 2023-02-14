/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-13 22:32:26
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-13 22:54:14
 * @FilePath: \minibbs\src\mail\mail.module.ts
 * @Description: mail module
 */
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mail])],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule { }
