/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 17:54:15
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-20 21:47:10
 * @FilePath: \minibbs\src\user\entities\friends.entity.ts
 * @Description: 好友表
 */

import * as dayjs from "dayjs";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Friend {
    @PrimaryColumn({
        comment: '用户uid'
    })
    uid: number

    @Column({
        comment: '好友的uid'
    })
    friendUid: number

    @Column({
        nullable: true,
        comment: '好友备注'
    })
    nickName?: string

    @Column({
        type: 'datetime',
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        comment: '添加好友时间'
    })
    addTime: string
}