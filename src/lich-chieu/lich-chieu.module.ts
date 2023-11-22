import { Module } from '@nestjs/common';
import { LichChieuService } from './lich-chieu.service';
import { LichChieuController } from './lich-chieu.controller';

@Module({
  controllers: [LichChieuController],
  providers: [LichChieuService],
})
export class LichChieuModule {}
