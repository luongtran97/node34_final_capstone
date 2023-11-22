import { Controller, Get , Query } from '@nestjs/common';
import { LichChieuService } from './lich-chieu.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Quản lý hệ thống rạp')
@Controller('lich-chieu')
export class LichChieuController {
  constructor(private readonly lichChieuService: LichChieuService) {}

  @Get('/LayLichChieuTheoMaRap')
  getLichChieu(@Query('ma_rap') ma_rap:number) {
    return this.lichChieuService.getLichChieu(+ma_rap);
  }
}
