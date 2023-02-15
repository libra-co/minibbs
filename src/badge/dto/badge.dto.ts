/*
* @Author: liuhongbo liuhongbo@dip-ai.com
* @Date: 2023-02-15 17:43:32
* @LastEditors: liuhongbo liuhongbo@dip-ai.com
* @LastEditTime: 2023-02-15 18:07:23
* @FilePath: /minibbs/src/badge/dto/badge.dto.ts
* @Description: badge DTO
*/

import { IsNumber, IsString, IsUrl } from "class-validator";

export class CreateBadgeDto {
    @IsString()
    name: string
    @IsUrl()
    pickLink: string
    @IsNumber()
    price: number
    @IsString()
    description
}

export class ListBadgeDto {

}

