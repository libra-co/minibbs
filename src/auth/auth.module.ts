/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 14:14:14
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-27 10:31:49
 * @FilePath: \minibbs\src\auth\auth.module.ts
 * @Description: auth 身份验证module
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserDetail } from 'src/user/entities/userDetail.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from './const';
import { JwtStrategy } from './jwt.strategy';
import { ActiveLogService } from 'src/activeLog/activeLog.service';
import { ActiveLogModule } from 'src/activeLog/activeLog.module';
import { ActiveLog } from 'src/activeLog/entities/activeLog.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetail,
      ActiveLog, 
      Article
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expireTime
      }
    }),
    UserModule,
    // ActiveLogModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy,ActiveLogService],
  exports:[AuthService]
})
export class AuthModule { }
