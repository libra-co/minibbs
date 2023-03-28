/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-28 10:34:43
 * @FilePath: /minibbs/src/block/dto/block.dto.ts
 * @Description: block dto
 */

import { IsOptional, IsString } from "class-validator";

export class AddBlockDto {
    @IsString()
    zid: string

    @IsString()
    blockName: string

    @IsOptional()
    priority: number
}

export class ListBlockDto {
    @IsOptional()
    @IsString()
    zid?: string
}

export interface ListBlockReturnDto {
    blid: string
    blockName: string
}

export class EditBlockDto {
    @IsString()
    blid: string

    @IsOptional()
    @IsString()
    blockName?: string

    @IsOptional()
    @IsString()
    zid?: string
}

export class BlockDetailDto {
    @IsString()
    blid: string
}

export interface BlockDetailReturnDto {
    blid: string
    blockName: string
}