import { Controller,Get,Query } from '@nestjs/common';
import { RapPhimService } from './rap_phim.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Quản lý hệ thống rạp')

@Controller('rapPhim')
export class RapPhimController {
  constructor(private readonly rapPhimService: RapPhimService) {}
  @Get('/LayThongRapPhimTheoCumRap')
  LayThongTinRapPhim(@Query('ma_cum_rap') ma_cum_rap:number){
    return this.rapPhimService.LayThongTinRapPhim(+ma_cum_rap)
  }
}
