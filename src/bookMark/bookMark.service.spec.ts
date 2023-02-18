import { Test, TestingModule } from '@nestjs/testing';
import { BookMarkService } from './bookMark.service';

describe('BookMarkService', () => {
  let service: BookMarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookMarkService],
    }).compile();

    service = module.get<BookMarkService>(BookMarkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
