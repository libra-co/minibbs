/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-15 17:43:32
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-15 22:51:48
 * @FilePath: /minibbs/src/badge/entities/badge.entity.ts
 * @Description: badge entity
 */

import * as dayjs from "dayjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Badge {
    @PrimaryGeneratedColumn('uuid')
    bid: string

    @Column()
    name: string

    @Column({
        comment: '勋章链接'
    })
    picLink: string

    @Column()
    price: number

    @Column({
        nullable: true,
        comment: '对勋章的描述'
    })
    description: string

    @Column({
        type: 'datetime',
        default: dayjs().format('YYYY-MM-DD HH:mm:ss')
    })
    createTime: string

    @Column({
        default: 0,
        comment: '是否可以购买'
    })
    canBuy: 0 | 1

    @Column({
        default: 0,
        comment: '是否可以申请'
    })
    canApply: 0 | 1
}
