/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-13 09:27:44
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-19 14:37:30
 * @FilePath: /minibbs/src/user/user.service.ts
 * @Description: user service
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonReturn } from 'src/utils/commonInterface';
import { DataSource, Repository } from 'typeorm';
import { BasicProfileReturnDto, CreateUserDto, DetailProfileReturnDto, EditProfileDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userDetail.entity';
import { Friend } from '../friend/entities/friend.entity';
import { commonCatchErrorReturn } from 'src/utils/utils';
import { Mail } from 'src/mail/entities/mail.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetail) private readonly userDetailRepository: Repository<UserDetail>,
    @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>,
    @InjectRepository(Mail) private readonly mailRepository: Repository<Mail>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    private dataSource: DataSource,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<string | CommonReturn> {
    // 用户表字段
    const userFields = ['password', 'username', 'age']
    // 用户详情表字段
    const userDetailFields = ['region', 'mail', 'qqNumber']
    const newUser = new User()
    const newUserDetail = new UserDetail()
    for (const key in createUserDto) {
      userFields.includes(key) && (newUser[key] = createUserDto[key])
      userDetailFields.includes(key) && (newUserDetail[key] = createUserDto[key])
    }

    const queryRunner = this.dataSource.createQueryRunner()
    queryRunner.connect()
    queryRunner.startTransaction()
    try {
      await this.dataSource.transaction(async manager => {
        const userReesult = await manager.save(User, newUser)
        newUserDetail.uid = userReesult.uid
        await manager.save(UserDetail, newUserDetail)
      })
      await queryRunner.commitTransaction()
      return {
        status: HttpStatus.OK,
        message: '注册成功，记得常来呀！',
        result: ''
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return commonCatchErrorReturn
    } finally {
      await queryRunner.release()
    }
  }

  // 基础个人资料
  async basicProfile(uid: number): Promise<CommonReturn<BasicProfileReturnDto | string>> {
    if (!uid) return commonCatchErrorReturn
    console.log('uid', uid)
    try {
      return this.dataSource.transaction(async entityManager => {
        const friendsNum = await this.friendRepository.count({ where: { uid } })
        const user = await this.userRepository.findOneOrFail({ where: { uid } })
        const mailNum = await this.mailRepository.count({ where: { reciveUid: uid } })
        const replyNum = await this.commentRepository.count({ where: { uid } })
        const returnResult: BasicProfileReturnDto = {
          friendsNum: friendsNum,
          mailNum: mailNum,
          replyNum: replyNum,
          username: user.username,
          coin: user.coin,
          age: user.age,
          uid: user.uid,
          experience: user.experience,
          level: user.level,
          identity: user.identity,
          role: user.role,
          reviews: user.reviews,
          expireTime: user.expireTime,
          badge: user.badge ? user.badge.split(',') : []
        }
        if (user) {
          return {
            status: HttpStatus.OK,
            message: '',
            result: returnResult,
          }
        }
        return {
          status: HttpStatus.BAD_REQUEST,
          message: '未找到目标用户',
          result: '',

        }
      })
    } catch (error) {
      console.log('error', error)
      return commonCatchErrorReturn
    }
  }

  // 个人资料详情
  async getDetailProfile(uid: number): Promise<CommonReturn<DetailProfileReturnDto | string>> {
    if (!uid) return commonCatchErrorReturn
    try {
      return this.dataSource.transaction(async manager => {
        const { result: basicProfile } = await this.basicProfile(uid) as unknown as CommonReturn<BasicProfileReturnDto>
        const detailEntity = await manager.findOneOrFail(UserDetail, { where: { uid } })
        const detailProfile: DetailProfileReturnDto = {
          ...basicProfile,
          mail: detailEntity.mail,
          qqNumber: detailEntity.qqNumber,
          activeTime: detailEntity.activeTime,
          createTime: detailEntity.createTime,
          height: detailEntity.height,
          weight: detailEntity.weight,
          constellation: detailEntity.constellation,
          habbit: detailEntity.habbit,
          isMarry: detailEntity.isMarry,
          vocation: detailEntity.vocation,
        }
        return {
          message: '报告大人，查到啦！',
          status: HttpStatus.OK,
          result: detailProfile,
        }
      })
    } catch (error) {
      return {
        message: '资料卡坏掉了，请联系管理员修补！',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        result: ''
      }
    }
  }

  // 编辑个人资料
  async editProfile(uid: number, editProfileDto: EditProfileDto): Promise<CommonReturn> {
    const targetUer = await this.userRepository.findOneOrFail({ where: { uid } })
    const targetUserDetail = await this.userDetailRepository.findOneOrFail({ where: { uid } })
    for (const field in editProfileDto) {
      if (Object.prototype.hasOwnProperty.call(editProfileDto, field)) {
        if (field in targetUer) {
          targetUer[field] = editProfileDto[field];
        } else if (field in targetUserDetail) {
          targetUserDetail[field] = editProfileDto[field]
        }
      }
    }

    const queryRunner = this.dataSource.createQueryRunner()
    queryRunner.connect()
    queryRunner.startTransaction()
    try {
      await queryRunner.manager.save(User, targetUer)
      await queryRunner.manager.save(UserDetail, targetUserDetail)
      await queryRunner.commitTransaction()
      return {
        message: '服务君偷偷帮你把资料卡改好啦！',
        status: HttpStatus.OK,
        result: ''
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return commonCatchErrorReturn
    } finally {
      await queryRunner.release()
    }
  }


}
