import * as dayjs from "dayjs";
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
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        comment: '收藏时间'
    })
    bookMarkTime: string
}
