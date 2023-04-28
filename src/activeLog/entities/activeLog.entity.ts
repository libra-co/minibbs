/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 09:26:50
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-27 10:58:33
 * @FilePath: /minibbs/src/activeLog/entities/activeLog.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as dayjs from 'dayjs'
import { CoinOperationType } from 'src/operationCoin/const';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActiveLog {
    @PrimaryGeneratedColumn('uuid')
    alid: string

    @Column()
    uid: number

    @Column({
        comment: '用户操作 id'
    })
    operationType: CoinOperationType

    @CreateDateColumn({
        type: 'datetime',
        transformer: {
            to: (value) => value,
            from: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
        },
        comment: '操作日期'
    })
    operationTime: string

    @Column({
        nullable: true,
        comment: '若为文章或回复，则写文章 aid'
    })
    aid?: string

    @Column({
        nullable: true,
        comment: '如果是查询，则写关键字'
    })
    keyword?: string
}
