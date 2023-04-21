/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 09:26:50
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-20 11:09:34
 * @FilePath: /minibbs/src/activeLog/entities/activeLog.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as dayjs from 'dayjs'
import { CoinOperationType } from 'src/operationCoin/const';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActiveLog {
    @PrimaryGeneratedColumn('uuid')
    alid: string

    @Column({
        comment: '用户操作 id'
    })
    operationType: CoinOperationType

    @Column({
        type: 'datetime',
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        comment: '操作日期'
    })
    operationTime: string
}
