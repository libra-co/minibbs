/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 18:27:25
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-28 15:24:27
 * @FilePath: /minibbs/src/main.ts
 * @Description: mainjs 全局设置
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/filters';
import { ValidationPipe } from './utils/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 全局管道，用于验证参数
  app.useGlobalFilters(new HttpExceptionFilter());  // 全局异常过滤器
  await app.listen(3000);
}
bootstrap();
