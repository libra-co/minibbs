/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 17:54:15
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 18:02:33
 * @FilePath: \minibbs\src\user\entities\friends.entity.ts
 * @Description: 好友表
 */
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
        comment: '添加好友时间'
    })
    addTime: string
}