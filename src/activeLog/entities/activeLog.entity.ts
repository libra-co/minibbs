import * as dayjs from 'dayjs'
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OperationTypeId } from '../const';

@Entity()
export class ActiveLog {
    @PrimaryGeneratedColumn('uuid')
    alid: string

    @Column({
        comment: '用户操作 id'
    })
    operationType: OperationTypeId

    @Column({
        type: 'datetime',
        default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        comment: '操作日期'
    })
    operationTime: string
}
