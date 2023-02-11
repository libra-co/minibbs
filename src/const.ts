/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 23:07:03
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-10 23:12:17
 * @FilePath: /minibbs/src/const.ts
 * @Description: app 常量
 */

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// 数据库配置
export const dataBaseConfig:TypeOrmModuleOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'minibbs',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }
