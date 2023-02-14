export interface WithCommonPaginationConfig<T> {
    dataList: T
    pageNum: number
    pageSize: number
    total: number
}