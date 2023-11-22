import { Controller, Get, Query } from '@nestjs/common';
import { CumRapService } from './cum_rap.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Quản lý hệ thống rạp')
@Controller('cum-rap')
export class CumRapController {
  constructor(private readonly cumRapService: CumRapService) {}
  @Get('/LayThongTinCumRapTheoHeThong')
  layThongTinCumRapTheoHeThong(@Query('ma_he_thong_rap') ma_he_thong_rap:number) {
    return this.cumRapService.layThongTinCumRapTheoHeThong(+ma_he_thong_rap)
  }

}
