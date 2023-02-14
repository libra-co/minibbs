/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 17:26:55
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-10 17:44:35
 * @FilePath: /minibbs/src/app.module.ts
 * @Description: 主程序入口
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
