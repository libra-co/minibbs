import { Test, TestingModule } from '@nestjs/testing';
import { CoinRecordController } from './coinRecord.controller';
import { CoinRecordService } from './coinRecord.service';


describe('CoinRecordController', () => {
  let controller: CoinRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinRecordController],
      providers: [CoinRecordService],
    }).compile();

    controller = module.get<CoinRecordController>(CoinRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
