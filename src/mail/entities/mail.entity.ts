/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-13 22:32:27
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-26 10:15:13
 * @FilePath: \minibbs\src\mail\entities\mail.entity.ts
 * @Description: mail Entity
 */

import * as dayjs from "dayjs";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mail {
    @PrimaryGeneratedColumn('uuid')
    mid: string

    @Column({
        comment: '发件人uid,可以为用户uid,系统uid,自己uid'
    })
    postUid: number

    @Column({
        comment: '收件人uid'
    })
    reciveUid: number

    @Column({
        nullable: true,
        comment: '如果没有title前端默认取内容',
    })
    title: string

    @CreateDateColumn({
        type: 'datetime',
        transformer: {
            to: (value) => value,
            from: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        }
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

    @Column({
        default: 0,
        comment: '是否已读，0 未读，1 已读'
    })
    isRead: 0 | 1
}
