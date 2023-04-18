/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-03-31 11:15:34
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-31 14:26:16
 * @FilePath: /minibbs_react/src/utils/decorator/catchErrorDec.ts
 * @Description: 捕获路由类抛出的异常，处理并再此抛出。让过滤器拿到处理
 */

import { HttpException, HttpStatus } from "@nestjs/common"

/**
 * @description 捕获路由的异常
 * @returns 
 * @deprecated 已弃用，没有帮助
 */
export function CatchRouteError() {
    return (target: any) => {
        for (const key in target.prototype) {
            if (typeof target['prototype'][key] === 'function') {
                const fn = target['prototype'][key]
                target.prototype = {
                    ...target.prototype,
                    [key]: () => {
                        try {
                            fn(...arguments)
                        } catch (error) {
                            console.log('error', error)
                            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
                        }
                    }
                }
            }
        }
        return target
    }
}