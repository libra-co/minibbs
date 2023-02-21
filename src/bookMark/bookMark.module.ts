/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-21 15:35:12
 * @FilePath: /minibbs/src/bookMark/bookMark.module.ts
 * @Description: bookMark module
 */
import { Module } from '@nestjs/common';
import { BookMarkService } from './bookMark.service';
import { BookMarkController } from './bookMark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookMark } from './entities/bookMark.entity';
import { User } from 'src/user/entities/user.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookMark, User, Article])],
  controllers: [BookMarkController],
  providers: [BookMarkService]
})
export class BookMarkModule { }
