import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockArticleListArticleDto, BlockArticleListArticleReturnDto, HomeArticleListArticleDto, HomeArticleListArticleReturnDto, PostArticleDto } from './dto/article.dto';
import { Article } from './entities/article.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { commonCatchErrorReturn, WithCommonPaginationConfig } from 'src/utils/utils';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

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

  async getHomeArticleList(blockAriticleArticleDto: HomeArticleListArticleDto): Promise<CommonReturn<WithCommonPaginationConfig<HomeArticleListArticleReturnDto[]>> | CommonReturn> {
    const { pageNum, pageSize, ...rest } = blockAriticleArticleDto
    console.log('rest', rest)
    const findResult = await this.articleRepository.find({
      where: Object.keys(rest).length === 0 ? [] : [{ ...rest }],
      select: ['aid', 'title'],
      order: { activeTime: 'DESC' },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
    })
    const dataList: BlockArticleListArticleReturnDto[] = await Promise.all(findResult.map(async article => {
      const postUserName = await this.userRepository.findOneOrFail({
        where: { uid: article.uid },
        select: ['username']
      })
      return { ...article, userName: postUserName.username }
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

  async getBlockArticleList(blockAriticleArticleDto: BlockArticleListArticleDto): Promise<CommonReturn<WithCommonPaginationConfig<BlockArticleListArticleReturnDto[]>> | CommonReturn> {
    const { pageNum, pageSize, isNewest, ...rest } = blockAriticleArticleDto
    let findResult: Article[] = []
    findResult = await this.articleRepository.find({
      where: [{ ...rest }],
      select: ['aid', 'uid', 'updateTime', 'title'],
      order: isNewest ? { isTop: 'DESC', createTime: 'DESC' } : { isTop: 'DESC', activeTime: 'DESC' },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
    })
    const dataList: BlockArticleListArticleReturnDto[] = await Promise.all(findResult.map(async article => {
      const postUserName = await this.userRepository.findOneOrFail({
        where: { uid: article.uid },
        select: ['username']
      })
      // const replyNum = 
      return { ...article, userName: postUserName.username }
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
