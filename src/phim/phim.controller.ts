import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PhimService } from './phim.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadFileFilm, uploadFlim } from 'src/interface/interface';
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

  // api thêm phim
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBody({
    type: uploadFileFilm,
  })
  @UseInterceptors(
    FileInterceptor
  )
  @Post('/ThemPhim')
  createFlim(
    @UploadedFile() img: Express.Multer.File,
    @UploadedFile() video: Express.Multer.File,
  ) {
    return this.phimService.createFlim(img);
  }
}
