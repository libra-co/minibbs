import { Test, TestingModule } from '@nestjs/testing';
import { OperationcoinService } from './operationCoin.service';

describe('OperationcoinService', () => {
  let service: OperationcoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationcoinService],
    }).compile();

    service = module.get<OperationcoinService>(OperationcoinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
