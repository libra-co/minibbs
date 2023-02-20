import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonReturn } from 'src/utils/commonInterface';
import { Repository } from 'typeorm';
import { CreateZoneDto } from './dto/zone.dto';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>
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


}
