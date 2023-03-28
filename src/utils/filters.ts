/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-03-28 14:44:29
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-28 15:47:52
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
