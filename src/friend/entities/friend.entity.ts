/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 17:54:15
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-26 10:14:55
 * @FilePath: \minibbs\src\user\entities\friends.entity.ts
 * @Description: 好友表
 */

import * as dayjs from "dayjs";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

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

    @CreateDateColumn({
        type: 'datetime',
        transformer: {
            to: (value) => value,
            from: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        }
    })
    addTime: string
}