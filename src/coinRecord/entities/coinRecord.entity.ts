/*
* @Author: liuhongbo liuhongbo@dip-ai.com
* @Date: 2023-02-14 17:16:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-26 10:13:35
* @FilePath: /minibbs/src/coin/entities/coin.entity.ts
* @Description: coin entity
*/

import * as dayjs from "dayjs";
import { CoinOperationType } from "src/operationCoin/const";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CoinRecord {
    @PrimaryGeneratedColumn('uuid')
    cfid: string
    @Column({
        comment: '变动金额'
    })
    changeNum: number
    @Column({
        default: 0,
        comment: '操作人uid,默认为系统'
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
    operationType: CoinOperationType
    @CreateDateColumn({
        type: 'datetime',
        transformer: {
            to: (value) => value,
            from: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        }
    })
    operationTime: string
}
