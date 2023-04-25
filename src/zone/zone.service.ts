/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-21 11:13:40
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-25 14:07:35
 * @FilePath: /minibbs/src/zone/zone.service.ts
 * @Description: zone service
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonReturn } from 'src/utils/commonInterface';
import { Repository } from 'typeorm';
import { CreateZoneDto, EditZoneDto, ListZoneDto } from './dto/zone.dto';
import { Zone } from './entities/zone.entity';
import { BlockService } from 'src/block/block.service';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
    private readonly blockService: BlockService,
  ) { }

  async add(createZoneDto: CreateZoneDto): Promise<CommonReturn> {
    const newZone = new Zone()
    newZone.zoneName = createZoneDto.zoneName
    await this.zoneRepository.save(newZone)
    return {
      message: '服务君已经新增模块啦，好好规划一下吧！',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async list(): Promise<CommonReturn<ListZoneDto[]>> {
    const findResult = await this.zoneRepository.find()
    const result = await Promise.all(findResult.map(async (zoneItem) => {
      const { result: blockList } = await this.blockService.list({ zid: zoneItem.zid });
      return { ...zoneItem, blockList }
    }))
    return {
      message: '这写是服务君记在小本本上的分区信息！',
      status: HttpStatus.OK,
      result: result
    }
  }

  async delete(zid: string): Promise<CommonReturn> {
    const deleteZone = await this.zoneRepository.findOneOrFail({ where: { zid } })
    await this.zoneRepository.remove(deleteZone)
    return {
      message: '服务君已将把分区划掉啦！',
      status: HttpStatus.OK,
      result: ''
    }
  }

  async edit(editZoneDto: EditZoneDto): Promise<CommonReturn> {
    const { zid, ...rest } = editZoneDto
    const editZone = await this.zoneRepository.findOneOrFail({ where: { zid } })
    await this.zoneRepository.save({ ...editZone, ...rest })
    return {
      message: '服务君把改动记录好啦！',
      status: HttpStatus.OK,
      result: ''
    }
  }


}
