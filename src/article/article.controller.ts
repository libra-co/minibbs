/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-18 17:25:32
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-20 16:01:47
 * @FilePath: \minibbs\src\article\article.controller.ts
 * @Description: article controller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { BlockArticleListArticleDto, HomeArticleListArticleDto, PostArticleDto, UserArticleListDto } from './dto/article.dto';

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
  getBlockArticle(@Body() blockAriticleArticleDto: BlockArticleListArticleDto) {
    return this.articleService.getBlockArticleList(blockAriticleArticleDto)
  }
  // 主页文章
  @Post('homeArticle')
  getHomeArticle(@Body() blockAriticleArticleDto: HomeArticleListArticleDto) {
    return this.articleService.getHomeArticleList(blockAriticleArticleDto)
  }

  // 获取用户发的文章，按发布倒序
  @Post('userArticleList')
  getUserArticle(@Body() userArticleListDto: UserArticleListDto) {
    return this.articleService.getUserArticle(userArticleListDto)
  }
}
