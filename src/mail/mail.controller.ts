/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 16:14:17
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-15 11:23:28
 * @FilePath: /minibbs/src/mail/mail.controller.ts
 * @Description: maill controller
 */
import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto, ListMailDto } from './dto/mail.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('add')
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @Post('delete')
  deleteOne(@Body('mid') mid: string) {
    return this.mailService.deleteOne(mid)
  }

  @Post('deleteAll')
  deleteAll(@Req() req) {
    return this.mailService.deleteAll(req.user.uid)
  }

  @Post('list')
  list(@Req() req, @Body() listMailDto: ListMailDto) {
    return this.mailService.list({ uid: req.user.uid as string, ...listMailDto })
  }

}
