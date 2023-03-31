/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-03-30 16:40:23
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-30 16:48:22
 * @FilePath: /minibbs/src/utils/notFunoundEntity.interceptor.ts
 * @Description: 拦截typeorm findOrFail 的拦截器
 */
import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { commonCatchErrorReturn } from './utils'

@Injectable()
export class ErrorExceptionInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err: any, caught: Observable<any>) => {
                commonCatchErrorReturn
                console.log('err', err)
                if (err.name === 'EntityNotFound') {
                    throw new HttpException('服务君忙不过来啦，稍后再试一下吧~', HttpStatus.INTERNAL_SERVER_ERROR)
                }
                throw new HttpException('服务君忙不过来啦，稍后再试一下吧~', HttpStatus.INTERNAL_SERVER_ERROR)
            }),
        )
    }
}