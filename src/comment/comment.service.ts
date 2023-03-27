/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-03-07 21:09:26
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-26 17:13:00
 * @FilePath: \MINIBBS_NEST\src\comment\comment.service.ts
 * @Description: comment service
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/entities/user.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { WithCommonPaginationConfig } from 'src/utils/utils';
import { DataSource, Repository } from 'typeorm';
import { AddCommentDto, ListCommentDto, ListCommentReturnDto, ReadCommentDto, UserCommentDto, UserCommentReturnDto } from './dto/comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly dataSource: DataSource,
  ) { }

  async add(uid: number, addCommentDto: AddCommentDto): Promise<CommonReturn> {
    const { isNoteAriticleAuth, isNoteCommentAuth, ...rest } = addCommentDto
    const newComment = new Comment()
    for (const field in rest) {
      if (Object.prototype.hasOwnProperty.call(addCommentDto, field)) {
        newComment[field] = addCommentDto[field];
      }
    }
    newComment.uid = uid
    await this.commentRepository.save(newComment)
    // 通知发帖人
    if (isNoteAriticleAuth) {
      const articleinfo = await this.articleRepository.findOneOrFail({ where: { aid: addCommentDto.aid }, select: ['uid'] })
      await this.mailService.create({
        postUid: uid,
        reciveUid: addCommentDto.ruid || articleinfo.uid,
        title: addCommentDto.content,
        content: addCommentDto.content,
        aid: addCommentDto.aid
      })
    }
    // 通知楼层评论人
    if (isNoteCommentAuth) {
      await this.mailService.create({
        postUid: uid,
        reciveUid: addCommentDto.ruid,
        title: addCommentDto.content,
        content: addCommentDto.content,
        aid: addCommentDto.aid
      })
    }
    return {
      message: '锵锵~评论成功！',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async list(listCommentDto: ListCommentDto): Promise<CommonReturn<WithCommonPaginationConfig<ListCommentReturnDto[]>>> {
    const { pageSize, pageNum, ...rest } = listCommentDto
    const findCommentList = await this.commentRepository.find({
      where: { aid: rest.aid },
      order: { commentTime: 'DESC' },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
    })

    const dataList: ListCommentReturnDto[] = await Promise.all(findCommentList.map(async item => {
      const commentUser = await this.userRepository.findOneOrFail({ where: { uid: item.uid }, select: ['username'] })
      if (item.ruid) {
        const replyUser = await this.userRepository.findOneOrFail({ where: { uid: item.ruid }, select: ['username'] })
        return {
          cid: item.cid,
          commentUid: item.uid,
          commentUsername: commentUser.username,
          commentTime: item.commentTime,
          content: item.content,
          replyUid: item.ruid,
          replyUsername: replyUser.username,
        }
      } else {
        return {
          cid: item.cid,
          commentUid: item.uid,
          commentUsername: commentUser.username,
          commentTime: item.commentTime,
          content: item.content,
        }
      }

    }))
    const total = await this.commentRepository.count({ where: { aid: rest.aid } })
    return {
      message: '小伙伴的评论查到啦！',
      status: HttpStatus.OK,
      result: {
        dataList,
        pageNum,
        pageSize,
        total
      }
    }
  }

  async delete(cid: string): Promise<CommonReturn> {
    const deleteComment = await this.commentRepository.findOneOrFail({ where: { cid } })
    await this.commentRepository.remove(deleteComment)
    return {
      message: '服务君悄悄帮你涂掉啦！',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async readComment(uid: number, { cid }: ReadCommentDto): Promise<CommonReturn> {
    const readTarget = await this.commentRepository.findOneOrFail({ where: { cid } })
    readTarget.isRead = 1
    const querryRunner = this.dataSource.createQueryRunner()
    querryRunner.connect()
    querryRunner.startTransaction()
    try {
      await querryRunner.manager.save(Comment, readTarget)
      await querryRunner.commitTransaction()
    } catch (error) {
      await querryRunner.rollbackTransaction()
      return {
        message: '服务君的笔没水了诶,已读标记失败！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: ''
      }
    } finally {
      await querryRunner.release()
    }
    return {
      message: '回复已经标记为查看过啦!!',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async readAllComment(uid: number): Promise<CommonReturn> {
    const readTargets = await this.commentRepository.find({ where: { ruid: uid, isRead: 0 } })
    readTargets.forEach(item => { item.isRead = 1 })
    const querryRunner = this.dataSource.createQueryRunner()
    querryRunner.connect()
    querryRunner.startTransaction()
    try {
      await querryRunner.manager.save(Comment, readTargets)
      await querryRunner.commitTransaction()
    } catch (error) {
      await querryRunner.rollbackTransaction()
      return {
        message: '服务君的笔没水了诶,已读标记失败！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: ''
      }
    } finally {
      await querryRunner.release()
    }
    return {
      message: '回复已经标记为查看过啦!!',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async userCommentList(userCommentDto: UserCommentDto): Promise<CommonReturn<WithCommonPaginationConfig<UserCommentReturnDto[]>>> {
    const { pageNum, pageSize, ...rest } = userCommentDto
    const commentList = await this.commentRepository.find({
      where: { uid: rest.uid },
      select: ['uid', 'commentTime', 'aid', 'cid', 'content'],
      order: { commentTime: 'desc' },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
    })
    const dataList = await Promise.all(commentList.map(async comment => {
      const currentUser = await this.userRepository.findOneOrFail({ where: { uid: comment.uid }, select: ['username'] })
      return {
        ...comment,
        userName: currentUser.username
      }
    }))
    const total = await this.commentRepository.count({ where: { uid: rest.uid } })
    return {
      message: '小伙伴的评论查到啦！',
      status: HttpStatus.OK,
      result: {
        dataList: dataList,
        pageNum,
        pageSize,
        total
      }
    }
  }

}
