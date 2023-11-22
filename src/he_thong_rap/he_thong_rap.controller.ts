import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Res,
  Req,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HeThongRapService } from './he_thong_rap.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/config/config';
import { updateCinema, uploadCinema } from 'src/interface/interface';

@ApiTags('Quản lý hệ thống rạp')
@Controller('QuanLyRap')
export class HeThongRapController {
  constructor(private readonly heThongRapService: HeThongRapService) {}

  // api lấy thông tin hệ thống rạp
  @Get('/LayThongTinHeThongRap')
  @HttpCode(200)
  getCinemaManagement() {
    return this.heThongRapService.getCinemaManagement();
  }

  // api thêm cụm rạp
  @Post('/ThemHeThongRap')
  @HttpCode(201)
  @ApiBody({ type: uploadCinema })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('hinh_he_thong_rap', multerOption('/public/imgRaw', 'img')),
  )
  addCinemaManagement(
    @Body() body: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    return this.heThongRapService.addCinemaManagement(body, file, res);
  }

  // api xóa cụm rạp
  @Delete('/XoaHeThongRap')
  delCinemaManagement(
    @Query('ma_he_thong_rap') ma_he_thong_rap: number,
    @Res() res,
  ) {
    return this.heThongRapService.delCinemaManagement(+ma_he_thong_rap, res);
  }

  // api cập nhật hệ thống rạp
  @Put('/CapNhatHeThongRap')
  @HttpCode(201)
  @ApiBody({ type: updateCinema })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('hinh_he_thong_rap', multerOption('/public/imgRaw', 'img')),
  )
  updateCinemaManagement(
    @Body() body: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    return this.heThongRapService.updateCinemaManagement(body, file, res);
  }
}
