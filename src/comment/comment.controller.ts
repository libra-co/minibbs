/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 16:20:42
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-21 21:28:42
 * @FilePath: /minibbs/src/comment/comment.controller.ts
 * @Description: comment controller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { AddCommentDto, ListCommentDto } from './dto/comment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('add')
  add(@Req() req, @Body() addCommentDto: AddCommentDto) {
    return this.commentService.add(req.user.uid, addCommentDto)
  }

  @Post('list')
  list(@Req() req, @Body() addCommentDto: ListCommentDto) {
    return this.commentService.list(addCommentDto)
  }

  @Post('delete')
  delete(@Body('cid') cid: string) {
    return this.commentService.delete(cid)
  }

}
