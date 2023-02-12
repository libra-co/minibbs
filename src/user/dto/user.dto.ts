/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-12 12:52:25
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-12 22:15:22
 * @FilePath: \minibbs\src\user\dto\user.dto.ts
 * @Description: userDto
 */
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { User } from '../entities/user.entity'
import { UserDetail } from "../entities/userDetail.entity"

export class CreateUserDto {
    @IsString()
    @MinLength(6, { message: '密码不能少于6位' })
    @MaxLength(12, { message: '密码不能多于12位' })
    password: string

    @IsString()
    @MinLength(6, { message: '用户名不能少于6位' })
    @MaxLength(12, { message: '用户名不能多于12位' })
    username: string

    @IsNotEmpty()
    @IsString()
    age: number

    @IsString()
    region: string

    @IsEmail()
    mail: string

    @IsString()
    @MinLength(5, { message: '请输入正确的 QQ 号' })
    @MaxLength(13, { message: '请输入正确的 QQ 号' })
    qqNumber: string

}

// 需要从User表中提取的
type PickUserFieldsInBasicProfileReturnDeto = 'uid' | 'username' | 'experience' | 'coin' | 'level' | 'identity' | 'expireTime' | 'role' | 'age' | 'family' | 'reviews'

// 基本资料返回dto
export interface BasicProfileReturnDto extends Pick<User, PickUserFieldsInBasicProfileReturnDeto> {
    friendsNum: number
    mailNum: number
    replyNum: number
    badge: string[]
}

// 需要从 UserDetail获取到字段
type PickUserFieldsInDetailProfileReturnDto = 'activeTime' | 'createTime' | 'qqNumber' | 'height' | 'weight' | 'constellation' | 'habit' | 'isMarry' | 'vocation' | 'mail'

// 详细资料返回DTO
export interface DetailProfileReturnDto extends BasicProfileReturnDto, Pick<UserDetail, PickUserFieldsInDetailProfileReturnDto> {

}