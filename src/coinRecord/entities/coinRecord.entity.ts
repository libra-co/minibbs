/*
* @Author: liuhongbo liuhongbo@dip-ai.com
* @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-14 21:39:40
* @FilePath: /minibbs/src/coin/entities/coin.entity.ts
* @Description: coin entity
*/

import * as dayjs from "dayjs";
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
    operatorUid: number
    @Column({
        comment: '目标账户的uid'
    })
    targetUid: number
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
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        comment: '操作日期'
    })
    operationTime: string
}
