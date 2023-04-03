import { Test, TestingModule } from '@nestjs/testing';
import { OperationcoinController } from './operationCoin.controller';
import { OperationcoinService } from './operationCoin.service';

describe('OperationcoinController', () => {
  let controller: OperationcoinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationcoinController],
      providers: [OperationcoinService],
    }).compile();

    controller = module.get<OperationcoinController>(OperationcoinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
