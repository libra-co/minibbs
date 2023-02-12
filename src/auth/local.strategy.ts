/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 14:33:29
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 15:34:49
 * @FilePath: \minibbs\src\auth\local.strategy.ts
 * @Description: Local策略
 */
import { HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super();
    }
    async validate(uid: number, password: string) {
        const user = await this.authService.validateUser(uid, password)
        if (!user) {
            throw new UnauthorizedException({ message: '用户名或密码错误！', status: HttpStatus.UNAUTHORIZED, result: '' })
        }
        return user
    }
}