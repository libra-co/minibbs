/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:07:03
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 10:16:23
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