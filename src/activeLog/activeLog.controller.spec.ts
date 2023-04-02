import { Test, TestingModule } from '@nestjs/testing';
import { ActiveLogController } from './activeLog.controller';
import { ActiveLogService } from './activeLog.service';

describe('ActiveLogController', () => {
  let controller: ActiveLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActiveLogController],
      providers: [ActiveLogService],
    }).compile();

    controller = module.get<ActiveLogController>(ActiveLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
