/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-10 18:27:25
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 17:11:49
 * @FilePath: /minibbs/src/main.ts
 * @Description: mainjs 全局设置
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionInterceptor } from './utils/errorInterceptor.interceptor';
import { HttpExceptionFilter, testExceptionFIlter } from './utils/filters';
import { ValidationPipe } from './utils/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false, // 应用程序时发生了任何错误时进行抛出错误
  });
  app.useGlobalPipes(new ValidationPipe()); // 全局管道，用于验证参数
  app.useGlobalFilters(new HttpExceptionFilter());  // 全局异常过滤器
  app.useGlobalInterceptors(new ErrorExceptionInterceptor()); // 全局异常映射
  await app.listen(3000);
}
bootstrap();
