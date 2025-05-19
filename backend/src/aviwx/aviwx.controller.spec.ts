import { Test, TestingModule } from '@nestjs/testing';
import { AviwxController } from './aviwx.controller';

describe('AviwxController', () => {
  let controller: AviwxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AviwxController],
    }).compile();

    controller = module.get<AviwxController>(AviwxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
