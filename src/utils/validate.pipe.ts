import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || this.skipVlidate(metatype)) {
            return value
        }
        const object = plainToInstance(metatype, value)
        const errors = await validate(object)
        if (errors.length > 0) {
            console.log('ValidationPipeErrors', errors)
            throw new BadRequestException({ message: '您传给服务君的小纸条，服务君识别不了噢，再重新写一份吧~', status: HttpStatus.BAD_REQUEST, result: '' })
        }
        return value
    }

    private skipVlidate(metaType: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return types.includes(metaType)
    }
}