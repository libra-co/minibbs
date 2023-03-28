/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-03-28 10:36:05
 * @FilePath: /minibbs/src/block/block.service.ts
 * @Description: block service
 */
import { Body, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonReturn } from 'src/utils/commonInterface';
import { Repository } from 'typeorm';
import { AddBlockDto, BlockDetailDto, EditBlockDto, ListBlockDto, ListBlockReturnDto } from './dto/block.dto';
import { Block } from './entities/block.entity';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
  ) { }


  async add(addBlockDto: AddBlockDto): Promise<CommonReturn> {
    const newBlock = new Block()
    for (const field in addBlockDto) {
      if (Object.prototype.hasOwnProperty.call(addBlockDto, field)) {
        newBlock[field] = addBlockDto[field];
      }
    }
    this.blockRepository.save(newBlock)
    return {
      message: '服务君帮记在小本本上啦！',
      status: HttpStatus.OK,
      result: '',
    }
  }

  async list(listBlockDto: ListBlockDto): Promise<CommonReturn<ListBlockReturnDto[]>> {
    let blockList: ListBlockReturnDto[]
    if (Object.keys(listBlockDto).length === 0) {
      blockList = await this.blockRepository.find({ order: { priority: 'ASC' } })
    } else {
      blockList = await this.blockRepository.find({
        where: { ...listBlockDto },
        order: { priority: 'ASC' }
      })
    }
    return {
      message: '大人，这是服务君在小本本上的记录！',
      status: HttpStatus.OK,
      result: blockList
    }
  }

  async delete(blid: string): Promise<CommonReturn> {
    const deleteBlock = await this.blockRepository.findOneOrFail({ where: { blid } })
    await this.blockRepository.remove(deleteBlock)
    return {
      message: '服务君在小本本上划掉啦！',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async edit(editBlockDto: EditBlockDto): Promise<CommonReturn> {
    const { blid, ...rest } = editBlockDto
    const editBlock = await this.blockRepository.findOneOrFail({ where: { blid } })
    await this.blockRepository.save({ ...editBlock, ...rest })
    return {
      message: '服务君把改动记录好啦！',
      status: HttpStatus.OK,
      result: ''
    }
  }

  // 查询板块信息
  async blockDetail(blockDetailDto: BlockDetailDto): Promise<CommonReturn> {
    const currentBlock = await this.blockRepository.findOneOrFail({
      where: { blid: blockDetailDto.blid },
      select: ['blid', 'blockName']
    },
    )
    return {
      message: '这是大人要查询的信息！',
      status: HttpStatus.OK,
      result: currentBlock
    }
  }

}
