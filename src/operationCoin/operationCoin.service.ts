/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 17:55:39
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 18:08:13
 * @FilePath: /minibbs/src/operationCoin/operationcoin.service.ts
 * @Description: 操作金币变更
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonReturn } from 'src/utils/commonInterface';
import { Repository } from 'typeorm';
import { AddNewCoinOperationTypeDto, EditCoinOperationTypeDto, RemoveCoinOperationTypeDto } from './dto/operationCoin.dto';
import { OperationCoin } from './entities/operationCoin.entity';

@Injectable()
export class OperationcoinService {
    constructor(
        @InjectRepository(OperationCoin)
        private readonly operationCoinOperationRepository: Repository<OperationCoin>,
    ) { }

    async list(): Promise<CommonReturn<OperationCoin[]>> {
        const operationList = await this.operationCoinOperationRepository.find()
        return {
            message: '服务君上小本本的内容都在这里啦！',
            status: HttpStatus.BAD_REQUEST,
            result: operationList,
        }
    }

    async add(addNewCoinOperationTypeDto: AddNewCoinOperationTypeDto): Promise<CommonReturn> {
        const targetCoinOperation = await this.operationCoinOperationRepository.findOne({ where: { operationType: addNewCoinOperationTypeDto.operationType } })
        if (targetCoinOperation) {
            return {
                message: '该项目已经被添加过啦！',
                status: HttpStatus.BAD_REQUEST,
                result: '',
            }
        }
        const newCoinOpertionType = new OperationCoin()
        for (const field in addNewCoinOperationTypeDto) {
            if (Object.prototype.hasOwnProperty.call(addNewCoinOperationTypeDto, field)) {
                newCoinOpertionType[field] = addNewCoinOperationTypeDto[field];
            }
        }
        await this.operationCoinOperationRepository.save(newCoinOpertionType)
        return {
            message: '添加成功！',
            status: HttpStatus.OK,
            result: '',
        }
    }

    async edit(editCoinOperationTypeDto: EditCoinOperationTypeDto): Promise<CommonReturn> {
        const targetCoinOperation = await this.operationCoinOperationRepository.findOne({ where: { operationType: editCoinOperationTypeDto.operationType } })
        if (!targetCoinOperation) {
            return {
                message: '添加成功！',
                status: HttpStatus.BAD_REQUEST,
                result: '',
            }
        }
        const newCoinOpertionType = new OperationCoin()
        for (const field in editCoinOperationTypeDto) {
            if (Object.prototype.hasOwnProperty.call(editCoinOperationTypeDto, field)) {
                newCoinOpertionType[field] = editCoinOperationTypeDto[field];
            }
        }
        await this.operationCoinOperationRepository.save(newCoinOpertionType)
        return {
            message: '服务君修改好啦！',
            status: HttpStatus.OK,
            result: '',
        }
    }

    async remove(removeCoinOperationTypeDto: RemoveCoinOperationTypeDto): Promise<CommonReturn> {
        const targetCoinOperation = await this.operationCoinOperationRepository.findOne({ where: { operationType: removeCoinOperationTypeDto.operationType } })
        if (!targetCoinOperation) {
            return {
                message: '添加成功！',
                status: HttpStatus.BAD_REQUEST,
                result: '',
            }
        }
        await this.operationCoinOperationRepository.remove(targetCoinOperation)
        return {
            message: '服务君删掉啦！',
            status: HttpStatus.OK,
            result: '',
        }
    }
}
