import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookMark {
    @PrimaryGeneratedColumn('uuid')
    bmid: string

    @Column({
        comment: '收藏用户的uid'
    })
    uid: number

    @Column({
        comment: '帖子aid'
    })
    aid: string

    @Column({
        type: 'datetime',
        comment: '收藏时间'
    })
    bookMarkTime: string
}
