import { HttpStatus } from "@nestjs/common"


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
    pageNum: number
    pageSize: number
}
