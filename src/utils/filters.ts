/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-03-28 14:44:29
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-31 11:28:02
 * @FilePath: /minibbs/src/utils/filters.ts
 * @Description: 异常过滤器
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { commonCatchErrorReturn } from "./utils";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() { }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest() // 获取请求上下文 request 对象
    const response = ctx.getResponse() // 获取请求上下文的 response 对象
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    // 设置错误信息
    const message = exception.message ? exception.message : commonCatchErrorReturn
    // 错误的响应体 对象
    const errorResponse = {
      result: '',
      message,
      status
    }
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8',)
    response.send(errorResponse)
  }
}

// import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
//@Catch() //如果要捕获任意类型的异常，则此处留空
export class testExceptionFIlter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //catch(exception:unknown, host:ArgumentsHost){//如果要捕获任意类型的异常，则异常类型应为any或unkown
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //如果要捕获的是任意类型的异常，则可能需要对此做如下判断来区分不同类型的异常
    /*
       const exceptionStatus=
            exception instanceof HttpException
            ? exception.getStatus()
            :HttpStatus.INTERNAL_SERVER_ERROR;
    
    */

    //如果要区分不同的异常状态，则可能需要做类似如下判断
    /*
        if (status=== HttpStatus.UNAUTHORIZED) {
                    if (typeof response !== 'string') {
                        response['message'] =
                            response['message'] || 'You do not have permission to access this resource';
                    }
                }
    */
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: response['message'] || exception.message,
        path: request.url,
      });
  }
}

