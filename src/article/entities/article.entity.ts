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
        type: 'datetime'
    })
    createTime: string

    @Column({
        nullable: true,
        default: null,
        type: 'datetime'
    })
    updateTime: string

    @Column({
        default: 0,
        comment: '点赞数'
    })
    likeNum: number

    @Column({
        default: 0,
        comment: '浏览数'
    })
    viewNum: number

    @Column({
        comment: '板块id'
    })
    zid: string

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
}
