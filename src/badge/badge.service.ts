/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-15 17:43:32
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-15 18:14:49
 * @FilePath: /minibbs/src/badge/badge.service.ts
 * @Description: badge service
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WithCommonPaginationConfig } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { CreateBadgeDto, ListBadgeDto } from './dto/badge.dto';
import { Badge } from './entities/badge.entity';
import * as dayjs from 'dayjs'
import { CommonReturn } from 'src/utils/commonInterface';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
  ) { }

  async create(createBadgeDto: CreateBadgeDto): Promise<CommonReturn> {
    const newBadge = new Badge()
    for (const field in createBadgeDto) {
      if (Object.prototype.hasOwnProperty.call(createBadgeDto, field)) {
        newBadge[field] = createBadgeDto[field];
      }
      newBadge.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    await this.badgeRepository.save(newBadge)
    return {
      message: '服务君把勋章摆到勋章墙上啦',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async list(listBadgeDto: any) {

  }

}
