import { Test, TestingModule } from '@nestjs/testing';
import { BookMarkController } from './bookMark.controller';
import { BookMarkService } from './bookMark.service';

describe('BookMarkController', () => {
  let controller: BookMarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookMarkController],
      providers: [BookMarkService],
    }).compile();

    controller = module.get<BookMarkController>(BookMarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
