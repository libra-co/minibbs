import { IsString } from "class-validator";
import { PaginationConfigDto } from "src/utils/utils";

export class PostArticleDto {
    @IsString()
    title: string

    @IsString()
    content: string

    @IsString()
    zid: string
}

export class BlockArticleArticleDto extends PaginationConfigDto {

}

export interface BlockArticleArticleReturnDto {
    aid: string
    userName: string
    title: string
    content: string
    updateTime: string
    viewNum: number
    // replyNum: number
}