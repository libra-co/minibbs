import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/entities/user.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { PaginationConfigDto, WithCommonPaginationConfig } from 'src/utils/utils';
import { DataSource, Repository } from 'typeorm';
import { AddCommentDto, ListCommentDto, ListCommentReturnDto } from './dto/comment.dto';
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
    }))
    return {
      message: '小伙伴的评论查到啦！',
      status: HttpStatus.OK,
      result: {
        dataList,
        pageNum,
        pageSize,
        total: dataList.length
      }
    }
  }

}
