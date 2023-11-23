import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  HttpCode,
  Delete,
  Query,
} from '@nestjs/common';
import { GheService } from './ghe.service';
import { ApiTags } from '@nestjs/swagger';
import { ghe, gheUpdate } from 'src/interface/interface';

@ApiTags('Quản lí ghế ngồi')
@Controller('ghe')
export class GheController {
  constructor(private readonly gheService: GheService) {}

  @Get('/LayDanhSachGheTheoMaRap/:ma_rap')
  LayDanhSachGheTheoMaRap(@Param('ma_rap') ma_rap: number) {
    return this.gheService.layDanhSachGheTheoMaRap(+ma_rap);
  }

  @Post('/ThemGhe')
  @HttpCode(201)
  ThemGhe(@Body() body: ghe) {
    return this.gheService.themGhe(body);
  }

  @Delete('/XoaGhe')
  XoaGhe(@Query('ma_ghe') ma_ghe: number) {
    return this.gheService.xoaGhe(+ma_ghe);
  }

  @Put('/CapNhatGhe')
  @HttpCode(200)
  CapNhatGhe(@Body() body: gheUpdate) {
    return this.gheService.capNhatGhe(body);
  }
}
