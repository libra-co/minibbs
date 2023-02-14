/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-13 22:32:27
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 16:43:09
 * @FilePath: \minibbs\src\mail\entities\mail.entity.ts
 * @Description: mail Entity
 */

import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mail {
    @PrimaryGeneratedColumn('uuid')
    mid: string

    @Column({
        comment: '发件人uid,可以为用户uid,系统uid,自己uid'
    })
    postUid: string

    @Column({
        comment: '收件人uid'
    })
    reciveUid: string

    @Column({
        nullable: true,
        comment: '如果没有title前端默认取内容',
    })
    title: string

    @Column({
        type: 'datetime',
        comment: '回复创建日期'
    })
    createTime: string

    @Column({
        comment: '邮件内容'
    })
    content: string

    @Column({
        nullable: true,
        comment: '如果是帖子来的，则是帖子的aid'
    })
    aid: string

    @Column({
        default: 0,
        comment: '是否删除，0 未删除，1 删除'
    })
    isDelete: 0 | 1
}
