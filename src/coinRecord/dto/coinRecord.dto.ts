/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-27 16:59:39
 * @FilePath: /minibbs/src/coin/dto/coin.dto.ts
 * @Description: coin DTO
 */

import { IsEnum, IsNumber, IsString } from "class-validator"
import { OperationType } from "../cosnt"

// 转账DTO
export class TransferCoinRecordDto {
    @IsNumber()
    changeNum: number
    @IsNumber()
    targetUid: number
    @IsNumber()
    operationType: OperationType
}

/**
 * @description 查询列表
 * @param uid 被查询的用户id
 */
export class ListCoinRecordDto {
    @IsNumber()
    uid?: number
    @IsNumber()
    operatorUid?: number
    @IsString()
    year?: string
    @IsString()
    month?: string
    @IsEnum(OperationType)
    operationType?: OperationType
    @IsString()
    keyword?: string
    @IsNumber()
    pageSize: number
    @IsNumber()
    pageNum: number
}

// 查询列表结果
export interface ListCoinRecordReturnDto {
    operationType: OperationType
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
    operationType: OperationType
    
}
export interface DeleteCommentPunishmentReturnDto {
    punishmentEx: number,
    punishmentCoin: number
}