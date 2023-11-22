import { Module } from '@nestjs/common';
import { HeThongRapService } from './he_thong_rap.service';
import { HeThongRapController } from './he_thong_rap.controller';

@Module({
  controllers: [HeThongRapController],
  providers: [HeThongRapService],
})
export class HeThongRapModule {}
