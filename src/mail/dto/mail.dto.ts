/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-13 22:32:27
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-31 16:29:22
 * @FilePath: \minibbs\src\mail\dto\mail.dto.ts
 * @Description: mailDTO
 */

import { IsNumber, IsOptional, IsString } from "class-validator";
import { Mail } from "../entities/mail.entity";

export class CreateMailDto {
    @IsString()
    postUid: number

    @IsString()
    reciveUid: number

    @IsString()
    title: string

    @IsString()
    content: string

    @IsString()
    aid?: string

}

export class ListMailDto {
    @IsOptional()
    @IsString()
    keywords?: string
    @IsNumber()
    pageNum: number
    @IsNumber()
    pageSize: number
}

type OmitMailFieldsForListMailReturnDto = 'aid' | 'content' | 'createTime' | 'mid' | 'title'

/**
 * @Api mail/delteAll
 */
export interface ListMailReturnDto extends Pick<Mail, OmitMailFieldsForListMailReturnDto> {
    postUsername: string
}

export class ReadMailDto {
    @IsString()
    mid: string
}