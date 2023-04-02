/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-04-01 18:23:46
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-04-02 13:03:31
 * @FilePath: \MINIBBS_NEST\src\activeLog\activeLog.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { CreateActiveLogDto } from './dto/activeLog.dto';

@Injectable()
export class ActiveLogService {
  create(createActiveLogDto: CreateActiveLogDto) {
    return 'This action adds a new activeLog';
  }

  findAll() {
    return `This action returns all activeLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activeLog`;
  }


  remove(id: number) {
    return `This action removes a #${id} activeLog`;
  }
}
