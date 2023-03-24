/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-20 15:50:55
 * @FilePath: /minibbs/src/article/article.module.ts
 * @Description: article moudle
 */
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { UserDetail } from 'src/user/entities/userDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User, Comment, UserDetail])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
