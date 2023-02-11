import * as dayjs from 'dayjs'
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CommonReturn } from 'src/utils/commonInterface';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userDetail.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetail) private readonly userDetailRepository: Repository<UserDetail>,
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
      const saveResult = await this.dataSource.transaction(async manager => {
        const userReesult = await manager.save(User, newUser)
        newUserDetail.uid = userReesult.uid
        const userDetailResult = await manager.save(UserDetail, newUserDetail)
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
