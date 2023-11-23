import { Module } from '@nestjs/common';
import { GheService } from './ghe.service';
import { GheController } from './ghe.controller';

@Module({
  controllers: [GheController],
  providers: [GheService],
})
export class GheModule {}
