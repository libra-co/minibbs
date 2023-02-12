/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 14:14:14
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 17:48:33
 * @FilePath: \minibbs\src\auth\auth.controller.ts
 * @Description: 身份验证constroller
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

}
