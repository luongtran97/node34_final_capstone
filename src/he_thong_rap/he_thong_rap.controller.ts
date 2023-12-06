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
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HeThongRapService } from './he_thong_rap.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/config/config';
import { updateCinema, uploadCinema } from 'src/interface/interface';
import { AuthGuard } from '@nestjs/passport';

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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/ThemHeThongRap')
  @HttpCode(201)
  @ApiBody({ type: uploadCinema })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('logo', multerOption('/public/imgRaw', 'img')),
  )
  addCinemaManagement(
    @Body() body: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
    @Req() req
  ) {
    return this.heThongRapService.addCinemaManagement(body, file, res, req);
  }

  // api xóa cụm rạp
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/XoaHeThongRap')
  delCinemaManagement(
    @Query('ma_he_thong_rap') ma_he_thong_rap: number,
    @Res() res,
    @Req() req,
  ) {
    return this.heThongRapService.delCinemaManagement(+ma_he_thong_rap, res ,req);
  }

  // api cập nhật hệ thống rạp
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/CapNhatHeThongRap')
  @HttpCode(201)
  @ApiBody({ type: updateCinema })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('logo', multerOption('/public/imgRaw', 'img')),
  )
  updateCinemaManagement(
    @Body() body: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
    @Req() req,
  ) {
    return this.heThongRapService.updateCinemaManagement(body, file, res , req);
  }
}
