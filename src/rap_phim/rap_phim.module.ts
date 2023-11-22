import { Module } from '@nestjs/common';
import { RapPhimService } from './rap_phim.service';
import { RapPhimController } from './rap_phim.controller';

@Module({
  controllers: [RapPhimController],
  providers: [RapPhimService],
})
export class RapPhimModule {}
