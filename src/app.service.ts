/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-03-07 21:09:26
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-08 21:59:01
 * @FilePath: \MINIBBS_NEST\src\app.service.ts
 * @Description: hellow wrold
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Minibbs!';
  }
}
