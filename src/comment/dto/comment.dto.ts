/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 16:20:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-21 18:06:45
 * @FilePath: /minibbs/src/comment/dto/comment.dto.ts
 * @Description: comment dto
 */

import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationConfigDto } from "src/utils/utils";

export class AddCommentDto {
    @IsString()
    aid: string

    @IsString()
    content: string

    @IsOptional()
    @IsString()
    rcid?: string

    @IsOptional()
    @IsNumber()
    ruid?: number

    @IsOptional()
    @IsNumber()
    isNoteAriticleAuth?: 0 | 1 // 是否通知发帖人

    @IsOptional()
    @IsNumber()
    isNoteCommentAuth?: 0 | 1 // 是否通知回复的评论人

}

export class ListCommentDto extends PaginationConfigDto {
    aid: string
}

/**
 * @param commentUid 发评论的uid
 * @param commentUsername 发评论人的username
 * @param replyUid 回复给评论人的uid
 * @param replyUsername 回复给评论人的username
 */
export interface ListCommentReturnDto {
    cid: string
    commentUid: number
    commentUsername: string
    commentTime: string
    content: string
    replyUid: number
    replyUsername: string
}

