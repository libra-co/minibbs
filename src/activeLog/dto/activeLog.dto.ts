import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CoinOperationType } from "src/operationCoin/const";
import { PaginationConfigDto } from "src/utils/utils";

type AddActiveLogDtoAid<T extends CoinOperationType> = T extends CoinOperationType.PostArtical | CoinOperationType.DeleteArtical | CoinOperationType.ReplyArtical | CoinOperationType.ReplyComment | CoinOperationType.LikeArticle | CoinOperationType.DisLikeArticle ? string : never
type AddActiveLogDtoKeyword<T extends CoinOperationType> = T extends CoinOperationType.SearchArticle ? string : never

export class AddActiveLogDto<T extends CoinOperationType | unknown> {
    @IsNumber()
    uid: number
    @IsOptional()
    @IsEnum(CoinOperationType)
    operationType: CoinOperationType
    @IsOptional()
    @IsString()
    aid?: T extends CoinOperationType ? AddActiveLogDtoAid<T> : string  // 若为文章或回复，则写文章 aid
    @IsOptional()
    @IsString()
    keyword?: T extends CoinOperationType ? AddActiveLogDtoKeyword<T> : never
}

export class ActiveLogListDto extends PaginationConfigDto {
    @IsNumber()
    uid: number
}
export interface ListActiveLogReturnDto {
    alid: string
    uid: number
    operationType: CoinOperationType
    operationTime: string
    aid?: string
    keyword?: string // 搜索时的关键词
    articleTitle?: string // 文章标题
}
