/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-22 15:27:41
 * @FilePath: /minibbs/src/utils/utils.ts
 * @Description: utuils
 */
import { HttpStatus } from "@nestjs/common"
import { IsNumber } from "class-validator"


// 带有翻页的返回信息
export interface WithCommonPaginationConfig<T> extends PaginationConfigDto {
    dataList: T
    total: number
}

// 通用报错处理
export const commonCatchErrorReturn = {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '服务君忙不过来啦，稍后再试一下吧~',
    result: ''
}

// 分页信息
export class PaginationConfigDto {
    @IsNumber()
    pageNum: number
    @IsNumber()
    pageSize: number
}
