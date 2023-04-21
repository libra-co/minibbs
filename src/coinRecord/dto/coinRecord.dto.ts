/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-20 11:19:36
 * @FilePath: /minibbs/src/coin/dto/coin.dto.ts
 * @Description: coin DTO
 */

import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { CoinOperationType } from "src/operationCoin/const"

// 转账DTO
export class TransferCoinRecordDto {
    @IsNumber()
    changeNum: number
    @IsNumber()
    targetUid: number
    @IsNumber()
    operationType: CoinOperationType
}

/**
 * @description 查询列表
 * @param uid 被查询的用户id
 */
export class ListCoinRecordDto {
    @IsOptional()
    @IsNumber()
    uid?: number
    @IsOptional()
    @IsNumber()
    operatorUid?: number
    @IsOptional()
    @IsString()
    year?: string
    @IsOptional()
    @IsString()
    month?: string
    @IsOptional()
    @IsString()
    day?: string
    @IsOptional()
    @IsEnum(CoinOperationType)
    operationType?: CoinOperationType
    @IsOptional()
    @IsString()
    keyword?: string
    @IsNumber()
    pageSize: number
    @IsNumber()
    pageNum: number
}

// 查询列表结果
export interface ListCoinRecordReturnDto {
    operationType: CoinOperationType
    changeNum: number
    balance: number
    operatorUid: number
    operatorUsername: string
    operationTime: string

}

export interface CommentRewardReturnDto {
    rewardEx: number,
    rewardCoin: number
}

export interface CreateCoinRecordDto {
    changeNum: number
    operatorUid: number
    targetUid: number
    balance: number
    operationType: CoinOperationType

}
export interface DeleteCommentPunishmentReturnDto {
    punishmentEx: number,
    punishmentCoin: number
}