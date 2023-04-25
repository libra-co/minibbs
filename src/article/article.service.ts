/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-25 16:06:15
 * @FilePath: /minibbs/src/article/article.service.ts
 * @Description: article service
 */
import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveArticleDto, ArticleDetailDto, BlockArticleListArticleDto, BlockArticleListArticleReturnDto, DislikeArticleDto, HomeArticleListArticleDto, HomeArticleListArticleReturnDto, LikeArticleDto, PostArticleDto, PostArticleReturnDto, SearchArticleDto, UserArticleListDto, UserArticleReturnDto } from './dto/article.dto';
import { Article } from './entities/article.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { commonCatchErrorReturn, WithCommonPaginationConfig } from 'src/utils/utils';
import { User } from 'src/user/entities/user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { UserDetail } from 'src/user/entities/userDetail.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
  ) { }


  async post(uid: number, postArticleDto: PostArticleDto): Promise<CommonReturn<PostArticleReturnDto> | CommonReturn> {
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
        result: { aid: saveArticleResult.aid }
      }
    }
    return commonCatchErrorReturn
  }

  async getHomeArticleList(blockAriticleArticleDto: HomeArticleListArticleDto): Promise<CommonReturn<WithCommonPaginationConfig<HomeArticleListArticleReturnDto[]>> | CommonReturn> {
    const { pageNum, pageSize, isNewest, ...rest } = blockAriticleArticleDto
    const findResult = await this.articleRepository.find({
      where: Object.keys(rest).length === 0 ? [] : [{ ...rest }],
      select: ['aid', 'title'],
      order: isNewest ? { createTime: 'DESC' } : { activeTime: 'DESC' },
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
      const total = await this.articleRepository.count({ where: { ...rest } })
      return {
        message: '看看服务君这里有没有你感兴趣的吧~',
        status: HttpStatus.OK,
        result: {
          dataList,
          pageNum,
          pageSize,
          total: total
        }
      }
    }
    return commonCatchErrorReturn
  }

  // 获取用户发表的文章
  async getArticleList(userArticleListDto: UserArticleListDto): Promise<CommonReturn<WithCommonPaginationConfig<UserArticleReturnDto[]>> | CommonReturn> {
    const { pageNum, pageSize, ...rest } = userArticleListDto
    let queryCondition: FindOptionsWhere<Article> = {}
    if (rest.uid) {
      queryCondition = { uid: rest.uid }
    } else if (rest.keyword) {
      queryCondition = { title: Like(`%${rest.keyword}%`) }
    } else if (rest.blid) {
      queryCondition = { blid: rest.blid }
    }
    try {
      const articleList = await this.articleRepository.find({
        where: queryCondition,
        select: ['aid', 'title', 'createTime', 'viewNum'],
        order: { createTime: 'DESC' },
        take: pageSize,
        skip: (pageNum - 1) * pageSize
      })
      const dataList: UserArticleReturnDto[] = await Promise.all(articleList.map(async articleItem => {
        const currentUser = await this.userRepository.findOneOrFail({ where: { uid: userArticleListDto.uid }, select: ['username'] })
        const ReplyNum = await this.commentRepository.count({ where: { aid: articleItem.aid } })
        return {
          ...articleItem,
          userName: currentUser.username,
          replyNum: ReplyNum
        }
      }))
      const total = await this.articleRepository.count({ where: queryCondition })
      return {
        message: '看看服务君这里有没有你感兴趣的吧~',
        status: HttpStatus.OK,
        result: {
          dataList,
          pageNum,
          pageSize,
          total: total
        }
      }

    } catch (error) {
      console.log('error', error)
      return commonCatchErrorReturn
    }

  }

  // viewNum + 1
  // 返回帖子内容
  async articleDetail({ aid }: ArticleDetailDto): Promise<CommonReturn<Article> | CommonReturn> {
    try {
      this.addArticleVieNum(aid)
      const currentArticle = await this.articleRepository.findOneOrFail({
        where: { aid },
        select: ['aid', 'uid', 'title', 'content', 'createTime', 'updateTime', 'likeNum', 'viewNum', 'blid', 'activeTime', 'isAttachment', 'dislikeNum']
      })
      const postUserInfo = await this.userRepository.findOneOrFail({
        where: { uid: currentArticle.uid },
        select: ['username', 'level', 'signatrue', 'badge']
      })
      const postUserDetail: Omit<UserDetail, 'activeTime'> = await this.userDetailRepository.findOne({
        where: { uid: currentArticle.uid },
        select: ['city']
      })
      const newPostUserInfo = { ...postUserInfo, badge: postUserInfo.badge.split(',') }
      return {
        message: '看看服务君这里有没有你感兴趣的吧~',
        status: HttpStatus.OK,
        result: { ...currentArticle, ...newPostUserInfo, ...postUserDetail }
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  // 增加帖子阅读数
  async addArticleVieNum(aid: string): Promise<CommonReturn> {
    try {
      const currentArticle = await this.articleRepository.findOneOrFail({ where: { aid } })
      const newCurrentArticle = { ...currentArticle, viewNum: currentArticle.viewNum + 1 }
      await this.articleRepository.save(newCurrentArticle)
      return {
        message: '欢迎大人莅临本帖，阅读数+1~',
        status: HttpStatus.OK,
        result: ''
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  // 点赞帖子
  async likeArticle(likeArticleDto: LikeArticleDto): Promise<CommonReturn> {
    const currentArticle = await this.articleRepository.findOneOrFail({ where: { aid: likeArticleDto.aid } })
    const newCurrentArticle = { ...currentArticle, likeNum: currentArticle.likeNum + 1 }
    await this.articleRepository.save(newCurrentArticle)
    return {
      message: '服务君把大人的赞收录啦！',
      status: HttpStatus.OK,
      result: ''
    }
  }
  // 点踩帖子
  async dislikeArticle(likeArticleDto: DislikeArticleDto): Promise<CommonReturn> {
    const currentArticle = await this.articleRepository.findOneOrFail({ where: { aid: likeArticleDto.aid } })
    const newCurrentArticle = { ...currentArticle, dislikeNum: currentArticle.dislikeNum + 1 }
    await this.articleRepository.save(newCurrentArticle)
    return {
      message: '不喜欢也没关系，看看别的文章吧~',
      status: HttpStatus.OK,
      result: ''
    }
  }

  /**
   * @description 更新帖子活跃时间
   * @param activeArticleDto
   */
  async activeArticle(activeArticleDto: ActiveArticleDto) {
    const targetArticle = await this.articleRepository.findOne({ where: { aid: activeArticleDto.aid } })
    targetArticle.activeTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await this.articleRepository.save(targetArticle)

  }
}
