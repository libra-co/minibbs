/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:07:03
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-13 10:02:16
 * @FilePath: /minibbs/src/const.ts
 * @Description: app 常量
 */

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

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