/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:20:13
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-11 00:53:34
 * @FilePath: /minibbs/src/user/user.module.ts
 * @Description: user module
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userDetail.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,UserDetail])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
