/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-15 17:43:32
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-15 17:48:12
 * @FilePath: /minibbs/src/badge/entities/badge.entity.ts
 * @Description: badge entity
 */

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
    pirce: number

    @Column({
        comment: '对勋章的描述'
    })
    description: string

    @Column({
        type: 'datetime'
    })
    createTime: string
}
