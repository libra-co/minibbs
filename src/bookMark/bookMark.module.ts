import { Module } from '@nestjs/common';
import { BookMarkService } from './bookMark.service';
import { BookMarkController } from './bookMark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookMark } from './entities/bookMark.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BookMark,User])],
  controllers: [BookMarkController],
  providers: [BookMarkService]
})
export class BookMarkModule {}
