/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-13 22:32:26
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-31 18:21:24
 * @FilePath: \minibbs\src\mail\mail.service.ts
 * @Description: mail service
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateMailDto, ListMailDto, ListMailReturnDto, ReadMailDto } from './dto/mail.dto';
import { Mail } from './entities/mail.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { HttpStatus } from '@nestjs/common/enums';
import { User } from 'src/user/entities/user.entity';
import { commonCatchErrorReturn, WithCommonPaginationConfig } from 'src/utils/utils';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource
  ) { }


  async create(createMailDto: CreateMailDto): Promise<CommonReturn> {
    try {
      return this.dataSource.transaction(async manager => {
        const newMail = new Mail()
        for (const field in createMailDto) {
          if (Object.prototype.hasOwnProperty.call(createMailDto, field)) {
            newMail[field] = createMailDto[field];
          }
        }
        await manager.save(Mail, newMail)
        return {
          message: '发送成功，期待回复呢！',
          status: HttpStatus.OK,
          result: '',
        }
      })
    } catch (error) {
      return {
        message: '邮箱坏掉了，请联系管理员修理！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: ''
      }
    }
  }

  async deleteOne(mid: string): Promise<CommonReturn> {
    try {
      return this.dataSource.transaction(async manger => {
        const currentMall = await manger.findOne(Mail, { where: { mid } })
        currentMall.isDelete = 1
        await manger.save(Mail, currentMall)
        return {
          message: '邮件扔掉啦，记得定期整理邮件鸭！',
          status: HttpStatus.OK,
          result: ''
        }
      })
    } catch (error) {
      return {
        message: '塞进垃圾箱的路上跑丢啦，请等服务君寻找一下吧！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: ''
      }
    }
  }

  async deleteAll(uid: number): Promise<CommonReturn> {
    const mailList = await this.mailRepository.find({ where: { reciveUid: uid, isDelete: 0 } })
    const deletedMailList = mailList.map(item => {
      item.isDelete = 1
      return item
    })
    try {
      await this.mailRepository.save(deletedMailList)
      return {
        message: '垃圾全部清理啦，邮箱干净如新！',
        status: HttpStatus.OK,
        result: ''
      }
    } catch (error) {
      return commonCatchErrorReturn
    }
  }

  async list(uid: number, listMailDto: ListMailDto): Promise<CommonReturn<WithCommonPaginationConfig<ListMailReturnDto[]>> | CommonReturn> {
    // 判断是否有关键字搜索
    const findCondition: FindOptionsWhere<Mail> = { reciveUid: uid, isDelete: 0 }
    if (listMailDto.keywords) {
      findCondition.content = Like(`%${listMailDto.keywords}%`)
    }
    try {
      const mailList = await this.mailRepository.find({
        where: findCondition,
        select: ['aid', 'content', 'createTime', 'mid', 'postUid', 'reciveUid', 'title', 'isRead'],
        take: listMailDto.pageSize,
        skip: (listMailDto.pageNum - 1) * listMailDto.pageSize
      })

      // 总数
      const total = await this.mailRepository.count({ where: findCondition })

      const resultList = await Promise.all(mailList.map(async item => {
        const { username: postUsername } = await this.userRepository.findOne({ where: { uid: item.postUid as unknown as number }, select: ['username'] })
        return { ...item, postUsername }
      }))
      console.log('mailList', mailList)
      return {
        message: '累死咯，邮件好多，幸好服务君找到啦！',
        status: HttpStatus.OK,
        result: {
          pageNum: listMailDto.pageNum,
          pageSize: listMailDto.pageSize,
          total,
          dataList: resultList
        }
      }
    } catch (error) {
      return commonCatchErrorReturn
    }
  }

  async readMail(uid: number, readMailDto: ReadMailDto): Promise<CommonReturn> {
    const currentMail = await this.mailRepository.findOneOrFail({ where: { reciveUid: uid, mid: readMailDto.mid } })
    if (currentMail.isRead === 1) {
      return {
        status: HttpStatus.OK,
        result: '',
        message: '邮件已经读过啦！'
      }
    }
    currentMail.isRead = 1
    await this.mailRepository.save(currentMail)
    return {
      status: HttpStatus.OK,
      result: '',
      message: '服务君已经标记为大人已过目！'
    }
  }
}
