import { Module } from '@nestjs/common';
import { CumRapService } from './cum_rap.service';
import { CumRapController } from './cum_rap.controller';

@Module({
  controllers: [CumRapController],
  providers: [CumRapService],
})
export class CumRapModule {}
