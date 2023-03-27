/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 19:11:28
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-27 15:57:30
 * @FilePath: \minibbs\src\friend\friend.service.ts
 * @Description: friend service
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { commonCatchErrorReturn, WithCommonPaginationConfig } from 'src/utils/utils';
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
        message: '好友走丢啦，帮服务君一起找找吧~',
        result: ''
      }
    }
    const newFriend = new Friend()
    newFriend.uid = uid
    newFriend.friendUid = friendUid

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.save(Friend, newFriend)
      await queryRunner.commitTransaction()
    } catch (error) {
      return commonCatchErrorReturn
    } finally {
      await queryRunner.release()
    }
    return {
      status: HttpStatus.OK,
      message: '添加成功!',
      result: ''
    }
  }

  async delete(uid: number, friendUid: number): Promise<CommonReturn> {
    const currentFriendEntity = await this.friendRepository.findBy({ uid, friendUid })
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.delete(Friend, currentFriendEntity)
      queryRunner.commitTransaction()
      return {
        message: '你们友谊的小船翻船啦！',
        status: HttpStatus.OK,
        result: '',
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return commonCatchErrorReturn
    } finally {
      await queryRunner.release()
    }
  }

  async list(uid: number, getFriendDto: GetFriendDto): Promise<CommonReturn<WithCommonPaginationConfig<GetFriendReturnDto[]> | []>> {
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
    const total = await this.friendRepository.count({ where: { uid } })
    if (friendFinout) {
      return {
        message: '服务君把您的朋友都叫过来啦~',
        status: HttpStatus.OK,
        result: {
          dataList: result,
          pageNum: getFriendDto.pageNum,
          pageSize: getFriendDto.pageSize,
          total
        },
      }
    }

  }
}
