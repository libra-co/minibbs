/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-18 17:25:32
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-24 16:41:23
 * @FilePath: \minibbs\src\article\entities\article.entity.ts
 * @Description: article entity
 */
import * as dayjs from "dayjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn('uuid')
    aid: string

    @Column({
        comment: '发帖人uid'
    })
    uid: number

    @Column()
    title: string

    @Column()
    content: string

    @Column({
        type: 'datetime',
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
    createTime: string

    @Column({
        type: 'datetime',
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
    updateTime: string

    @Column({
        default: 0,
        comment: '点赞数'
    })
    likeNum: number
    
    @Column({
        default: 0,
        comment: '点踩数'
    })
    dislikeNum: number

    @Column({
        default: 0,
        comment: '浏览数'
    })
    viewNum: number

    @Column({
        comment: '板块id'
    })
    bid: string

    @Column({
        default: 0,
        comment: '1 删除，0 未删除'
    })
    isDelete: 0 | 1

    @Column({
        default: 0,
        comment: '1 置顶，0 未置顶'
    })
    isTop: 0 | 1

    @Column({
        type: 'datetime',
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        comment: '活跃时间，若被回复则更新，否则为创建、更新时间'
    })
    activeTime: string

    @Column({
        default: 0,
        comment: '是否为精华帖'
    })
    isBestArticle: 0 | 1

    @Column({
        default: 0,
        comment: '是否含附件'
    })
    isAttachment: 0 | 1
}
