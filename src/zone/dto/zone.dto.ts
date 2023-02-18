/*
* @Author: liuhongbo 916196375@qq.com
* @Date: 2023-02-18 17:09:04
* @LastEditors: liuhongbo 916196375@qq.com
* @LastEditTime: 2023-02-18 17:13:06
* @FilePath: \minibbs\src\zone\dto\zone.dto.ts
* @Description: zone dto
*/

import { IsString } from "class-validator";

export class CreateZoneDto {
    @IsString()
    zoneName: string
}
