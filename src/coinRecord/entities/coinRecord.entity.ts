/*
* @Author: liuhongbo liuhongbo@dip-ai.com
* @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 18:03:06
* @FilePath: /minibbs/src/coin/entities/coin.entity.ts
* @Description: coin entity
*/

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OperationType } from "../cosnt";

@Entity()
export class CoinRecord {
    @PrimaryGeneratedColumn('uuid')
    cfid: string
    @Column({
        comment: '变动金额'
    })
    changeNum: number
    @Column({
        comment: '操作人uid'
    })
    oUid: number
    @Column({
        comment: '别操作账户的uid'
    })
    uid: number
    @Column({
        comment: '操作后余额'
    })
    balance: number
    @Column({
        comment: '变动类型'
    })
    operationType: OperationType
    @Column({
        type: 'datetime',
        comment: '操作日期'
    })
    operationTime: string
}
