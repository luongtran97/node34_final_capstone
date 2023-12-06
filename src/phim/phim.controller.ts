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
  Req,
  UseInterceptors,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PhimService } from './phim.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  upLoadFlim,
  uploadFilmImg,
  uploadFilmTrailer,
} from 'src/interface/interface';
import { multerOption } from 'src/config/config';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Quản lý phim')
@Controller('flim')
export class PhimController {
  constructor(private readonly phimService: PhimService) {}

  // api lấy danh sách phim
  @Get('/LayDanhSachPhim')
  @HttpCode(200)
  getFilmsList(@Req() req, @Res() res) {
    return this.phimService.getFlimsList(req, res);
  }

  // api lấy danh sách phim phân trang
  @Get('/LayDanhSachPhimPhanTrang/:page/:pageSize')
  getFlimPagination(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
    @Res() res,
    @Req() req,
  ) {
    return this.phimService.getFlimPagination(+page, +pageSize, res, req);
  }

  //api lấy danh sách phim theo ngày
  // @Get('/LayDanhSachPhimTheoNgay')
  // getFLimListByDay(
  //   @Query('tu_ngay') tu_ngay: number,
  //   @Query('den_ngay') den_ngay: number,
  //   @Res() res,
  //   @Req() req,
  // ) {
  //   return this.phimService.getFLimListByDay(+tu_ngay, +den_ngay, res, req);
  // }

  //api lấy thông tin phim
  @Get('LayThongTinChiTietPhim')
  GetFlimInfo(@Query('ma_phim') ma_phim: number, @Res() res, @Req() req) {
    return this.phimService.GetFlimInfo(+ma_phim, res, req);
  }

  // api thêm phim
  @Post('/ThemPhim')
  createFlim(@Body() body: upLoadFlim, @Res() res, @Req() req) {
    return this.phimService.createFlim(body, res, req);
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
    @Req() req,
  ) {
    return this.phimService.uploadFlimImg(+ma_phim, img, res, req);
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
    @Req() req,
  ) {
    return this.phimService.uploadFlimTrailer(+ma_phim, video, res, req);
  }

  //api upload thông tin phim
  @Put('/CapNhatThongTinPhim')
  uploadFlimInfo(
    @Body() body: upLoadFlim,
    @Res() res,
    @Query('ma_phim') ma_phim: number,
    @Req() req,
  ) {
    return this.phimService.uploadFlimInfo(body, res, +ma_phim, req);
  }

  //api xóa phim
  @Delete('/XoaPhim')
  delFlim(@Query('ma_phim') ma_phim: number, @Res() res, @Req() req) {
    return this.phimService.delFlim(+ma_phim, res, req);
  }
}
