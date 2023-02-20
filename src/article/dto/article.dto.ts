import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationConfigDto } from "src/utils/utils";

export class PostArticleDto {
    @IsString()
    title: string

    @IsString()
    content: string

    @IsString()
    bid: string
}


export class HomeArticleListArticleDto extends PaginationConfigDto {
    @IsOptional()
    @IsString()
    bid?: string
}

export interface HomeArticleListArticleReturnDto {
    aid: string
    userName: string
    title: string
    updateTime: string
    viewNum: number
}

export class BlockArticleListArticleDto extends PaginationConfigDto {
    @IsOptional()
    @IsString()
    bid?: string

    @IsOptional()
    @IsNumber()
    isBestrAticle?: 0 | 1 // 是否查询精华帖

    @IsOptional()
    @IsNumber()
    isNewest: 0 | 1 // 是否查询最新帖
}
export interface BlockArticleListArticleReturnDto {
    aid: string
    userName: string
    title: string
    updateTime: string
    viewNum: number
    // replyNum: number
}