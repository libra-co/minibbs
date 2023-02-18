/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-18 17:25:32
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-18 18:57:30
 * @FilePath: \minibbs\src\article\article.controller.ts
 * @Description: article controller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { BlockArticleArticleDto, PostArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('post')
  post(@Req() req, @Body() postArticleDto: PostArticleDto) {
    return this.articleService.post(req.user.uid, postArticleDto);
  }

  // 板块下的文章
  @Post('blockArticle')
  getBlockArticle(@Body() blockAriticleArticleDto: BlockArticleArticleDto) {
    return this.articleService.getBlockArticle(blockAriticleArticleDto)
  }
}
