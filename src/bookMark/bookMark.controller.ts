import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookMarkService } from './bookMark.service';
import { AddBookMarkDto, ListBookMarkDto } from './dto/bookMark.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('bookMark')
export class BookMarkController {
  constructor(
    private readonly bookMarkService: BookMarkService,
  ) { }

  @Post('add')
  add(@Req() req, @Body() addBookMarkDto: AddBookMarkDto) {
    return this.bookMarkService.add(req.user.uid, addBookMarkDto)
  }
  @Post('delete')
  delete(@Req() req, @Body() addBookMarkDto: AddBookMarkDto) {
    return this.bookMarkService.delete(req.user.uid, addBookMarkDto)
  }

  @Post('list')
  list(@Req() req, @Body() listBookMarkDto: ListBookMarkDto) {
    return this.bookMarkService.list(req.user.uid, listBookMarkDto)
  }

}
