/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-25 17:38:08
 * @FilePath: /minibbs/src/article/dto/article.dto.ts
 * @Description: article dto
 */
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { PaginationConfigDto } from "src/utils/utils";

export class PostArticleDto {
    @IsString()
    title: string

    @IsString()
    content: string

    @IsString()
    blid: string
}

export interface PostArticleReturnDto {
    aid: string
}

export class HomeArticleListArticleDto extends PaginationConfigDto {
    @IsOptional()
    @IsString()
    blid?: string

    @IsOptional()
    @IsNumber()
    isNewest?: 0 | 1

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
    blid?: string

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

export class UserArticleListDto extends PaginationConfigDto {
    @IsOptional()
    @IsNumber()
    uid?: number
    @IsOptional()
    @IsString()
    keyword?: string
    @IsOptional()
    @IsUUID()
    blid?: string
}

export interface UserArticleReturnDto {
    aid: string
    title: string
    viewNum: number
    userName: string
    replyNum: number
}

export class ArticleDetailDto {
    @IsString()
    aid: string
}

export interface ArticleDetailDto {
    aid: string;
    uid: number
    title: string;
    content: string;
    createTime: string;
    updateTime: string;
    likeNum: number;
    viewNum: number;
    dislikeNum: number;
    bid: string;
    activeTime: string;
    isAttachment: 0 | 1;
    // 用户相关
    username: string
    level: number
    signatrue: string
    badge: string[]
    city: string
}

export class LikeArticleDto {
    @IsString()
    aid: string
}
export class DislikeArticleDto {
    @IsString()
    aid: string
}

export class ActiveArticleDto {
    @IsString()
    aid: string
}

export class SearchArticleDto {
    @IsString()
    keyword: string
}