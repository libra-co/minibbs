/*
* @Author: liuhongbo liuhongbo@dip-ai.com
* @Date: 2023-02-10 23:20:13
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 16:56:30
* @FilePath: /minibbs/src/user/entities/user.entity.ts
* @Description: user 表
*/
import { IsNotEmpty, IsNumber, MinLength, MaxLength, IsString, IsPhoneNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenderEnum, IentityEnum, RoleEnum } from "../const";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        comment: '应该从10000开始自增'
    })
    uid: number

    @IsString()
    @MinLength(6, { message: '密码不能少于6位' })
    @MaxLength(12, { message: '密码不能多于12位' })
    @Column({
        comment: '密码,6~12位'
    })
    password: string

    @IsString()
    @MinLength(6, { message: '用户名不能少于6位' })
    @MaxLength(12, { message: '用户名不能多于12位' })
    @Column({
        comment: '用户名，必填'
    })
    username: string

    @IsNumber()
    @Column({
        default: 0,
        comment: '经验'
    })
    experience: number

    @Column({
        default: 0,
        comment: '金币'
    })
    coin: number

    @IsNumber()
    @Column({
        default: 1,
        comment: '等级',
    })
    level: number


    @Column({
        default: 1,
        comment: '会员身份 default 1 - 普通会员'
    })
    identity: IentityEnum

    @Column({
        default: null,
        type: 'datetime',
        comment: '身份过期时间 为空时 永不过期',
    })
    expireTime: string


    @Column({
        default: RoleEnum.user,
        comment: '角色-管理权限',
    })
    role: RoleEnum


    @Column({
        default: '',
        comment: '勋章,多个以逗号分隔'
    })
    badge: string

    @Column({
        default: 0,
    })
    age: number

    @Column({
        default: GenderEnum.unknown
    })
    gernder: GenderEnum

    @Column({
        default: '',
        comment: '个性签名'
    })
    signatrue: string

    @Column({
        default: '',
        comment: '家族'
    })
    family?: string

    @Column({
        default: '',
        comment: '黑名单,多个以逗号分隔'
    })
    blackList: string

    @Column({
        default: '',
        comment: '地区，必填'
    })
    region: string

    @IsPhoneNumber('CN')
    @Column({
        default: '',
        comment: '手机号，必填'
    })
    phone?: string


    @Column({
        default: '',
        comment: '微信号'
    })
    weChat: string

    @Column({
        default: '',
        comment: '好友,多个以逗号分隔'
    })
    firends: string

    @Column({
        default: 0,
        comment: '人气 - 浏览主页数量'
    })
    reviews: number

    @Column({
        default: 0,
        comment: '帐号是否被封禁'
    })
    isBaned: 0 | 1

    @Column({
        nullable: true,
        type: 'datetime',
        comment: '解封时间'
    })
    unBanedTime?: string

    @Column({
        default: 0,
        comment: '是否注销账号'
    })
    isDelete: 0 | 1
}
