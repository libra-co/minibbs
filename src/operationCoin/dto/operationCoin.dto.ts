/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 17:58:32
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-18 10:26:30
 * @FilePath: /minibbs/src/operationCoin/dto/operationCoin.dto.ts
 * @Description: 用户金币变更
 */

import { IsEnum, IsNumber, IsString } from "class-validator"
import { CoinOperationType } from "../const"
import { Optional } from "@nestjs/common"

export class AddNewCoinOperationTypeDto {
    @IsEnum(CoinOperationType)
    operationType: CoinOperationType
    @IsNumber()
    changeCoin: number
    @IsNumber()
    changeEx: number
}
export class EditCoinOperationTypeDto {
    @IsEnum(CoinOperationType)
    operationType: CoinOperationType
    @IsNumber()
    changeCoin: number
    @IsNumber()
    changeEx: number
}
export class RemoveCoinOperationTypeDto {
    @IsEnum(CoinOperationType)
    operationType: CoinOperationType
}

export class FindOneCoinOperationTypeDto {
    @IsEnum(CoinOperationType)
    operationType: CoinOperationType
}
