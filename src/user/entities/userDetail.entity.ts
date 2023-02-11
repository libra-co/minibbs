import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserDetail {
    @PrimaryColumn({
        comment: '对应用户的id'
    })
    uid: number

    @Column({ nullable: true })
    height?: number

    @Column({ nullable: true })
    weight?: number

    @Column({
        nullable: true,
        comment: '星座'
    })
    constellation?: string

    @Column({ nullable: true })
    habit?: string

    @Column({ nullable: true })
    isMarry?: 0 | 1

    @Column({
        nullable: true,
        comment: '职业'
    })
    vocation?: string

    @Column({
        type: 'datetime'
    })
    createTime: string

    @IsEmail()
    @Column({ nullable: true })
    mail: string

    @IsString()
    @MinLength(5, { message: '请输入正确的 QQ 号' })
    @MaxLength(13, { message: '请输入正确的 QQ 号' })
    @Column({ comment: 'QQ号,必填' })
    qqNumber: string

    @Column({
        default: 0,
        comment: '在线时间'
    })
    activeTime: number
}