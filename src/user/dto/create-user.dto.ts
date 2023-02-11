import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

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
