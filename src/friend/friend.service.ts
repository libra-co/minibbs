/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 19:11:28
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-14 23:26:43
 * @FilePath: \minibbs\src\friend\friend.service.ts
 * @Description: friend service
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from 'src/user/entities/user.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { WithCommonPaginationConfig } from 'src/utils/utils';
import { DataSource, Repository } from 'typeorm';
import { GetFriendDto, GetFriendReturnDto } from './dto/friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendService {

  constructor(
    @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private dataSource: DataSource,
  ) { }

  /**
 * @description 好友添加
 * @param uid 用户uid
 * @param friendUid 好友uid
 * @returns BasicProfileReturnDto
 */
  async add(uid: number, friendUid): Promise<CommonReturn> {
    try {
      return this.dataSource.transaction(async entityMangeer => {
        const isAlreadyFriend = await this.friendRepository.findOne({ where: { uid, friendUid } })
        if (isAlreadyFriend) {
          return {
            status: HttpStatus.BAD_REQUEST,
            message: '你们已经是好友啦！',
            result: ''
          }
        }
        const friendsResult = await this.userRepository.findOne({ where: { uid: friendUid } })
        if (!friendsResult) {
          return {
            status: HttpStatus.BAD_REQUEST,
            message: '添加失败，未找到指定用户',
            result: ''
          }
        }
        const newFriend = new Friend()
        newFriend.addTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        newFriend.uid = uid
        newFriend.friendUid = friendUid
        await entityMangeer.save(Friend, newFriend)
        return {
          status: HttpStatus.OK,
          message: '添加成功!',
          result: ''
        }
      })
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '添加失败，请联系管理员',
        result: ''
      }
    }
  }

  async delete(uid: number, friendUid: number): Promise<CommonReturn> {
    try {
      this.dataSource.transaction(async entityMangeer => {
        const currentFriendEntity = await this.friendRepository.findBy({ uid, friendUid })
        await entityMangeer.delete(Friend, currentFriendEntity)
      })
      return {
        message: '你们友谊的小船翻船啦！',
        status: HttpStatus.OK,
        result: '',
      }
    } catch (error) {
      return {
        message: '删除失败，请稍候再试！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: '',
      }
    }
  }

  async list(uid: number, getFriendDto: GetFriendDto): Promise<CommonReturn<WithCommonPaginationConfig<GetFriendReturnDto[]> | []>> {

    const queryRunner = this.dataSource.createQueryRunner()
    queryRunner.connect()
    queryRunner.startTransaction()
    try {
      const friendFinout = await this.friendRepository.find({
        where: { uid },
        select: ['friendUid', 'addTime', 'nickName'],
        take: getFriendDto.pageSize || 9999999999,
        skip: ((getFriendDto.pageNum - 1) * getFriendDto.pageSize) || 0,
      })
      const result = await Promise.all(friendFinout.map(async item => {
        const currentUser = await this.userRepository.findOne({
          where: { uid: item.friendUid },
          select: ['username']
        })
        return {
          ...item,
          username: currentUser.username,
        }
      }))
      if (friendFinout) {
        return {
          message: '服务君把您的朋友都叫过来啦~',
          status: HttpStatus.OK,
          result: {
            dataList: result,
            pageNum: getFriendDto.pageNum,
            pageSize: getFriendDto.pageSize,
            total: result.length
          },
        }
      }
    } catch (error) {
      return {
        message: '服务君找不到您的朋友啦，容服务君先找一找吧',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: []
      }
    } finally {
      queryRunner.release()
    }

  }
}
