/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-21 14:50:02
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
}
