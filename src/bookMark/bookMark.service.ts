import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBookMarkDto, DeleteBookMarkDto, ListBookMarkDtoReturn, ListBookMarkDto } from './dto/bookMark.dto';
import { BookMark } from './entities/bookMark.entity';
import * as dayjs from 'dayjs'
import { CommonReturn } from 'src/utils/commonInterface';
import { commonCatchErrorReturn, PaginationConfigDto, WithCommonPaginationConfig } from 'src/utils/utils';


@Injectable()
export class BookMarkService {
  constructor(
    @InjectRepository(BookMark)
    private readonly bookMarkRepository: Repository<BookMark>,
  ) { }

  async add(uid: number, addBookMarkDto: AddBookMarkDto): Promise<CommonReturn> {
    const newBookMarkRecord = new BookMark()
    for (const field in addBookMarkDto) {
      if (Object.prototype.hasOwnProperty.call(addBookMarkDto, field)) {
        newBookMarkRecord[field] = addBookMarkDto[field];
      }
    }
    newBookMarkRecord.uid = uid
    newBookMarkRecord.bookMarkTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const saveResult = await this.bookMarkRepository.save(newBookMarkRecord)
    if (saveResult) {
      return {
        message: '服务君帮您记录在小本本上啦！',
        status: HttpStatus.OK,
        result: ''
      }
    }
    return commonCatchErrorReturn
  }

  async delete(uid: number, deleteBookMarkDto: DeleteBookMarkDto): Promise<CommonReturn> {
    const findoutBookMark = await this.bookMarkRepository.findOneOrFail({ where: { uid, aid: deleteBookMarkDto.aid } })
    const removeResult = await this.bookMarkRepository.remove(findoutBookMark)
    if (removeResult) {
      return {
        message: '服务君帮您把小本本上的记录划掉啦！',
        status: HttpStatus.OK,
        result: ''
      }
    }
    return commonCatchErrorReturn
  }

  async list(uid: number, listBookMarkDto: ListBookMarkDto): Promise<CommonReturn<WithCommonPaginationConfig<ListBookMarkDtoReturn[]>>> {
    const { pageNum, pageSize } = listBookMarkDto
    const bookMarkList = await this.bookMarkRepository.find({
      where: { uid },
      select: ['aid', 'bmid', 'bookMarkTime'],
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    })
    // 文章列表标题
    // const resultList = await Promise.all(bookMarkList.map(async bookMarkListItem => {
      
    // } ))
    return {
      message: '这是大人的收藏簿，请大人过目！',
      status: HttpStatus.OK,
      result: {
        dataList: bookMarkList,
        pageNum,
        pageSize,
        total: bookMarkList.length
      }
    }
  }



}
