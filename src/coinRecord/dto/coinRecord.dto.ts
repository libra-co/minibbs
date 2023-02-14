/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 18:15:55
 * @FilePath: /minibbs/src/coin/dto/coin.dto.ts
 * @Description: coin DTO
 */

import { IsNumber, IsString } from "class-validator"
import { OperationType } from "../cosnt"

// 转账DTO
export class TransferCoinRecordDto {
    @IsNumber()
    changeNum: number
    @IsNumber()
    operatorUid: number
    @IsNumber()
    operationType: OperationType
}
