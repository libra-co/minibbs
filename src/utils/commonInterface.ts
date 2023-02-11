import { HttpStatus } from "@nestjs/common";

/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-11 17:28:25
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-11 17:32:36
 * @FilePath: /minibbs/src/utils/commonInterface.ts
 * @Description: 全局公用接口
 */
export interface CommonReturn<T = any> {
    status: HttpStatus,
    message: string,
    result: T
}