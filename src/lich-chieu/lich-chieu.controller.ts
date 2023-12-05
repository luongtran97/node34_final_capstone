import { Controller, Get, Query, Post, Body, Res, Delete ,UseGuards, Req} from '@nestjs/common';
import { LichChieuService } from './lich-chieu.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { lichChieu } from 'src/interface/interface';
import { AuthGuard } from '@nestjs/passport';
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('TaoLichChieu')
  TaoLichChieu(@Body() body: lichChieu, @Res() res , @Req() req) {
    return this.lichChieuService.taoLichChieu(body, res,req);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/XoaLichChieu')
  XoaLichChieu(@Query('ma_lich_chieu') ma_lich_chieu: number, @Res() res , @Req() req){
    return this.lichChieuService.xoaLichChieu(ma_lich_chieu,res,req)
  }

}
