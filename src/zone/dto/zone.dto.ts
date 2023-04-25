/*
* @Author: liuhongbo 916196375@qq.com
* @Date: 2023-02-18 17:09:04
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-25 14:06:57
* @FilePath: \minibbs\src\zone\dto\zone.dto.ts
* @Description: zone dto
*/

import { IsOptional, IsString } from "class-validator";
import { ListBlockReturnDto } from "src/block/dto/block.dto";

export class CreateZoneDto {
    @IsString()
    zoneName: string
}

export interface ListZoneDto {
    zoneName: string
    zid: string
    blockList: ListBlockReturnDto[]
}

export class EditZoneDto {
    @IsString()
    zid: string

    @IsOptional()
    @IsString()
    zoneName?: string
}