import * as dayjs from 'dayjs'
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonReturn } from 'src/utils/commonInterface';
import { DataSource, Repository } from 'typeorm';
import { BasicProfileReturnDto, CreateUserDto, DetailProfileReturnDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userDetail.entity';
import { Friend } from '../friend/entities/friend.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetail) private readonly userDetailRepository: Repository<UserDetail>,
    @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>,
    private dataSource: DataSource,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<string | CommonReturn<any>> {
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
    newUserDetail.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    try {
      await this.dataSource.transaction(async manager => {
        const userReesult = await manager.save(User, newUser)
        newUserDetail.uid = userReesult.uid
        await manager.save(UserDetail, newUserDetail)
      })
      return {
        status: HttpStatus.OK,
        message: '注册成功，记得常来呀！',
        result: ''
      }
    } catch (error) {
      console.log('error', error)
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '注册失败，请联系管理员！！',
        result: ''
      }

    }
  }

  // 基础个人资料
  async basicProfile(uid: number): Promise<CommonReturn<BasicProfileReturnDto | ''>> {
    try {
      return this.dataSource.transaction(async entityManager => {
        const friendsNum = await this.friendRepository.count({ where: { uid } })
        const user = await this.userRepository.findOne({ where: { uid } })
        const returnResult: BasicProfileReturnDto = {
          friendsNum: friendsNum,
          mailNum: 9999999,
          replyNum: 99999999,
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
      console.log('123', 123)
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '出错啦，请联系管理员',
        result: '',
      }
    }
  }

  // 个人资料详情
  async getDetailProfile(uid: number): Promise<CommonReturn<DetailProfileReturnDto | ''>> {
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
          habit: detailEntity.habit,
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



}
