import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { Comment } from './entities/comment.entity';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { Mail } from 'src/mail/entities/mail.entity';
import { User } from 'src/user/entities/user.entity';
import { CoinRecord } from 'src/coinRecord/entities/coinRecord.entity';
import { CoinRecordService } from 'src/coinRecord/coinRecord.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Article, Mail, User, CoinRecord]),
    MailModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, MailService, CoinRecordService]
})
export class CommentModule { }
