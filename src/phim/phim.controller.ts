import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  Put,
  UploadedFile,
  Query,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { PhimService } from './phim.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  upLoadFlim,
  uploadFilmImg,
  uploadFilmTrailer,
} from 'src/interface/interface';
import { multerOption } from 'src/config/config';
@ApiTags('Quản lý phim')
@Controller('flim')
export class PhimController {
  constructor(private readonly phimService: PhimService) {}

  // api lấy danh sách phim
  @Get('/LayDanhSachPhim')
  @HttpCode(200)
  getFilmsList() {
    return this.phimService.getFlimsList();
  }

  // api lấy danh sách phim phân trang
  @Get('/LayDanhSachPhimPhanTrang/:page/:pageSize')
  getFlimPagination(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
    @Res() res,
  ) {
    return this.phimService.getFlimPagination(+page, +pageSize, res);
  }

  //api lấy danh sách phim theo ngày
  @Get('/LayDanhSachPhimTheoNgay')
  getFLimListByDay(
    @Query('tu_ngay') tu_ngay: number,
    @Query('den_ngay') den_ngay: number,
    @Res() res,
  ) {
    return this.phimService.getFLimListByDay(+tu_ngay, +den_ngay, res);
  }

  //api lấy thông tin phim
  @Get('LayThongTinChiTietPhim')
  GetFlimInfo(@Query('ma_phim') ma_phim: number, @Res() res) {
    return this.phimService.GetFlimInfo(+ma_phim, res);
  }

  // api thêm phim
  @Post('/ThemPhim')
  createFlim(@Body() body: upLoadFlim, @Res() res) {
    return this.phimService.createFlim(body, res);
  }

  // api upLoad hình Phim
  @ApiBody({ type: uploadFilmImg })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('img', multerOption('/public/imgRaw', 'img')),
  )
  @Put('/uploadHinhPhim')
  uploadFlimImg(
    @UploadedFile()
    img: Express.Multer.File,
    @Query('ma_phim') ma_phim: number,
    @Res() res,
  ) {
    return this.phimService.uploadFlimImg(+ma_phim, img, res);
  }

  // api upload trailer
  @ApiBody({ type: uploadFilmTrailer })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('video', multerOption('/public/video', 'video')),
  )
  @Put('/uploadTrailerPhim')
  uploadFlimTrailer(
    @UploadedFile()
    video: Express.Multer.File,
    @Query('ma_phim') ma_phim: number,
    @Res() res,
  ) {
    return this.phimService.uploadFlimTrailer(+ma_phim, video, res);
  }

  //api upload thông tin phim
  @Put('/CapNhatThongTinPhim')
  uploadFlimInfo(
    @Body() body: upLoadFlim,
    @Res() res,
    @Query('ma_phim') ma_phim: number,
  ) {
    return this.phimService.uploadFlimInfo(body, res, +ma_phim);
  }

  //api xóa phim
  @Delete('/XoaPhim')
  delFlim(@Query('ma_phim') ma_phim: number, @Res() res) {
    return this.phimService.delFlim(+ma_phim, res);
  }
}
