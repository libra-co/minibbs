/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-03-07 21:09:26
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-08 21:59:01
 * @FilePath: \MINIBBS_NEST\src\app.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Minibbs!';
  }
}
