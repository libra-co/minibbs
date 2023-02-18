import { Body, HttpStatus, Injectable, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockArticleArticleDto, BlockArticleArticleReturnDto, PostArticleDto } from './dto/article.dto';
import { Article } from './entities/article.entity';
import * as dayjs from 'dayjs'
import { CommonReturn } from 'src/utils/commonInterface';
import { commonCatchErrorReturn, WithCommonPaginationConfig } from 'src/utils/utils';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) { }


  async post(uid: number, postArticleDto: PostArticleDto): Promise<CommonReturn> {
    const newArticle = new Article()
    for (const field in postArticleDto) {
      if (Object.prototype.hasOwnProperty.call(postArticleDto, field)) {
        newArticle[field] = postArticleDto[field];
      }
    }
    newArticle.uid = uid
    newArticle.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    newArticle.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const saveArticleResult = await this.articleRepository.save(newArticle)
    if (saveArticleResult) {
      return {
        message: '服务君帮你把文章发布啦，快去看看吧！',
        status: HttpStatus.OK,
        result: ''
      }
    }
    return commonCatchErrorReturn
  }

  async getBlockArticle(blockAriticleArticleDto: BlockArticleArticleDto): Promise<CommonReturn<WithCommonPaginationConfig<BlockArticleArticleReturnDto[]>> | CommonReturn> {
    const { pageNum, pageSize, ...rest } = blockAriticleArticleDto
    const findResult = await this.articleRepository.find({
      where: [{ ...rest, isTop: pageNum === 1 ? 1 : 0 }, { ...rest, isTop: 0 }],
      select: ['aid', 'uid', 'updateTime'],
      order: { 'updateTime': 'DESC' },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
    })
    const dataList: BlockArticleArticleReturnDto[] = await Promise.all(findResult.map(async article => {
      const postUserName = await this.userRepository.findOneOrFail({
        where: { uid: article.uid },
        select: ['username']
      })
      // const replyNum = 
      return { ...article, userName: postUserName as unknown as string }
    }))
    if (dataList) {
      return {
        message: '看看服务君这里有没有你感兴趣的吧~',
        status: HttpStatus.OK,
        result: {
          dataList,
          pageNum,
          pageSize,
          total: dataList.length
        }
      }
    }
    return commonCatchErrorReturn
  }

}
