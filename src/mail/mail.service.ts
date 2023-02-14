/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-13 22:32:26
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-14 21:09:11
 * @FilePath: \minibbs\src\mail\mail.service.ts
 * @Description: mail service
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateMailDto, ListMailDto, ListMailReturnDto } from './dto/mail.dto';
import { Mail } from './entities/mail.entity';
import * as dayjs from 'dayjs'
import { CommonReturn } from 'src/utils/commonInterface';
import { HttpStatus } from '@nestjs/common/enums';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private readonly mail: Repository<Mail>,
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
          newMail.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        await manager.save(Mail, newMail)
        return {
          message: '发送成功，期待回复呢！',
          status: HttpStatus.OK,
          result: ''
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
        console.log('mid', mid)
        const currentMall = await manger.findOne(Mail, { where: { mid } })
        console.log('currentMall', currentMall)
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

  async delteAll(uid: string): Promise<CommonReturn> {
    try {
      return this.dataSource.transaction(async manger => {
        const mailList = await manger.find(Mail, { where: { reciveUid: uid, isDelete: 0 } })
        const deletedMailList = mailList.map(item => {
          item.isDelete = 1
          return item
        })
        await manger.save(Mail, deletedMailList)
        return {
          message: '垃圾全部清理啦，邮箱干净如新！',
          status: HttpStatus.OK,
          result: ''
        }
      })
    } catch (error) {
      return {
        message: '服务君的垃圾箱满了，请稍候再试吧！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: ''
      }
    }
  }

  async list(listMailDeto: ListMailDto): Promise<CommonReturn<ListMailReturnDto[] | []>> {
    try {
      return this.dataSource.transaction(async manger => {
        const mailList = await manger.find(Mail, {
          where: { reciveUid: listMailDeto.uid, isDelete: 0 },
          select: ['aid', 'content', 'createTime', 'mid', 'postUid', 'reciveUid', 'title'],
          take: listMailDeto.pageSize,
          skip: (listMailDeto.pageNum - 1) * listMailDeto.pageSize
        })

        const resultList = await Promise.all(mailList.map(async item => {
          const { username: postUsername } = await manger.findOne(User, { where: { uid: item.postUid as unknown as number }, select: ['username'] })
          return { ...item, postUsername }
        }))

        return {
          message: '累死咯，邮件好多，幸好服务君找到啦！',
          status: HttpStatus.OK,
          result: resultList
        }
      })
    } catch (error) {
      return {
        message: '服务君太忙啦,暂时拒绝查看邮箱噢！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: []
      }
    }
  }


}
