/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:07:03
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 17:12:35
 * @FilePath: /minibbs/src/const.ts
 * @Description: app 常量
 */

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { UserDetail } from "./user/entities/userDetail.entity";

// 数据库配置
export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '139.155.5.202',
  port: 3306,
  username: 'minibbsdev',
  password: 'x8N8tN4BmsfjTcDE',
  database: 'minibbsdev',
  entities: [],
  autoLoadEntities: true,
  synchronize: true,
}

// 默认分页信息
export const initPaginationConfig = {
  pageSize: 99999999999999,
  pageNum: 1
}