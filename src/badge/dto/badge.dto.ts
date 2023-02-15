/*
* @Author: liuhongbo liuhongbo@dip-ai.com
* @Date: 2023-02-15 17:43:32
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-15 22:56:43
* @FilePath: /minibbs/src/badge/dto/badge.dto.ts
* @Description: badge DTO
*/

import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { PaginationConfigDto } from 'src/utils/utils'

export class CreateBadgeDto {
    @IsString()
    name: string
    @IsUrl()
    picLink: string
    @IsNumber()
    price: number
    @IsString()
    description: string
    @IsNumber()
    canBuy: 0 | 1
    @IsOptional()
    @IsNumber()
    canApply?: 0 | 1
}

export class ListBadgeDto extends PaginationConfigDto {
    @IsOptional()
    @IsNumber()
    canBuy?: 0 | 1
    @IsOptional()
    @IsNumber()
    canApply?: 0 | 1
}

export interface ListBadgeReturnDto {
    bid: string
    name: string
    picLink: string
    price: number
    description: string
}

export class UpdateBadgeDto {
    @IsString()
    bid: string
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsUrl()
    picLink?: string

    @IsOptional()
    @IsNumber()
    price?: number

    @IsOptional()
    @IsString()
    description?: string
    @IsOptional()
    @IsNumber()
    canBuy?: 0 | 1
    @IsOptional()
    @IsNumber()
    canApply?: 0 | 1


}