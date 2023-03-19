/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 14:14:14
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-09 22:24:15
 * @FilePath: \minibbs\src\auth\auth.service.ts
 * @Description: 验证service
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserDetail } from 'src/user/entities/userDetail.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { Repository } from 'typeorm';
import { LoginReturnDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
    private jwtService: JwtService
  ) { }
  async validateUser(username: number, password: string): Promise<Omit<User, 'password'>> {
    let user
    // 根据数据类型判断ＱＱ号还是uid登录,暂时只做 uid登录
    // if (typeof username === 'number') {
    user = await this.userRepository.findOne({ where: { uid: username } })
    // } else {
    //   const { uid: findOutUid } = await this.userDetailRepository.findOne({ where: { qqNumber: username } }) || {}
    //   user = await this.userRepository.findOne({ where: { uid: findOutUid } })
    // }
    if (user && user.password == password) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User): Promise<CommonReturn<LoginReturnDto>> {
    const payload = { username: user.username, sub: user.uid }
    return {
      status: HttpStatus.OK,
      message: '登录成功!',
      result: {
        uid: user.uid,
        token: this.jwtService.sign(payload)
      },

    }

  }
}