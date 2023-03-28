/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-28 09:56:51
 * @FilePath: /minibbs/src/block/entities/block.entity.ts
 * @Description: block entity
 */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Block {
    @PrimaryGeneratedColumn('uuid')
    blid: string

    @Column()
    blockName: string

    @Column({
        comment: '所属板块zid'
    })
    zid: string

    @Column({
        default: 9999999,
        comment: '优先级，即排序。从0开始，越小越靠前'
    })
    priority: number
}
