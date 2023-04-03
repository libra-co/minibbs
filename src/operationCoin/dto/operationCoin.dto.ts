/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 17:58:32
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 18:11:11
 * @FilePath: /minibbs/src/operationCoin/dto/operationCoin.dto.ts
 * @Description: 用户金币变更
 */

import { IsEnum, IsNumber, IsString } from "class-validator"
import { CoinOperationType } from "../const"

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
