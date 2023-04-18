/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 17:18:07
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 18:09:58
 * @FilePath: /minibbs/src/operationCoin/entities/operationCoin.entity.ts
 * @Description: 用户金币变更
 */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoinOperationType } from "../const";

@Entity()
export class OperationCoin {
    @PrimaryGeneratedColumn('uuid')
    ocid: string

    @Column()
    operationType: CoinOperationType

    @Column({
        comment: '变动金币'
    })
    changeCoin: number

    @Column({
        comment: '变动经验'
    })
    changeEx: number
}