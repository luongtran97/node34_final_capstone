import { Controller, Get, Query, Post, Body, Res, Delete } from '@nestjs/common';
import { LichChieuService } from './lich-chieu.service';
import { ApiTags } from '@nestjs/swagger';
import { lichChieu } from 'src/interface/interface';
@ApiTags('Quản lý lịch chiếu')
@Controller('LichChieu')
export class LichChieuController {
  constructor(private readonly lichChieuService: LichChieuService) {}

  @Get('/LayLichChieuTheoMaRap')
  getLichChieu(@Query('ma_rap') ma_rap: number) {
    return this.lichChieuService.layLichChieuTheoMaRap(+ma_rap);
  }

  @Get('/LayLichChieuTheoMaPhim')
  LayThongTinLichChieuTheoMaPhim(@Query('ma_phim') ma_phim: number) {
    return this.lichChieuService.layThongTinLichChieuTheoMaPhim(+ma_phim);
  }

  @Post('TaoLichChieu')
  TaoLichChieu(@Body() body: lichChieu, @Res() res) {
    return this.lichChieuService.taoLichChieu(body, res);
  }

  @Delete('/XoaLichChieu')
  XoaLichChieu(@Query('ma_lich_chieu') ma_lich_chieu: number){
    return this.lichChieuService.xoaLichChieu(ma_lich_chieu)
  }

}
