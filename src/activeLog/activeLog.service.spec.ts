import { Test, TestingModule } from '@nestjs/testing';
import { ActiveLogService } from './activeLog.service';

describe('ActiveLogService', () => {
  let service: ActiveLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveLogService],
    }).compile();

    service = module.get<ActiveLogService>(ActiveLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
