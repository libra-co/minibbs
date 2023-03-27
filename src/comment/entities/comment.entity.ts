/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 16:20:42
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-21 17:39:12
 * @FilePath: /minibbs/src/comment/entities/comment.entity.ts
 * @Description: comment Entity
 */

import * as dayjs from "dayjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    cid: string

    @Column({
        comment: '发出评论的aid'
    })
    aid: string

    @Column({
        comment: '发出评论的uid'
    })
    uid: number

    @Column({
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        type: 'datetime'
    })
    commentTime: string


    @Column()
    content: string

    @Column({
        default: null,
        comment: '被回复的cid，若有值则表示回复帖子的其他评论'
    })
    rcid: string

    @Column({
        default: null,
        comment: '被回复评论的评论人uid'
    })
    ruid: number

    @Column({
        default: 0,
        comment: '是否已读,已读1,未读0'
    })
    isRead: 0 | 1

    @Column({
        default: 0
    })
    isDelete: 0 | 1
}
