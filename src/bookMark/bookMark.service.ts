/*
 * @Author: liuhongbo 916196375@qq.com
 * @Date: 2023-02-18 11:24:26
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-02-20 21:44:43
 * @FilePath: \minibbs\src\bookMark\bookMark.service.ts
 * @Description: bookMark service
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBookMarkDto, DeleteBookMarkDto, ListBookMarkDtoReturn, ListBookMarkDto } from './dto/bookMark.dto';
import { BookMark } from './entities/bookMark.entity';
import { CommonReturn } from 'src/utils/commonInterface';
import { commonCatchErrorReturn,  WithCommonPaginationConfig } from 'src/utils/utils';


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
