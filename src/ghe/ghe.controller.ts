import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  HttpCode,
  Req,
  Delete,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GheService } from './ghe.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ghe, gheUpdate } from 'src/interface/interface';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Quản lý ghế ngồi')
@Controller('ghe')
export class GheController {
  constructor(private readonly gheService: GheService) {}

  @Get('/LayDanhSachGheTheoMaRap/:ma_rap')
  LayDanhSachGheTheoMaRap(@Param('ma_rap') ma_rap: number) {
    return this.gheService.layDanhSachGheTheoMaRap(+ma_rap);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/ThemGhe')
  @HttpCode(201)
  ThemGhe(@Body() body: ghe ,  @Req() req ,@Res() res) {
    return this.gheService.themGhe(body,req,res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/XoaGhe')
  XoaGhe(@Query('ma_ghe') ma_ghe: number ,  @Req() req ,@Res() res) {
    return this.gheService.xoaGhe(+ma_ghe,req,res);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/CapNhatGhe')
  @HttpCode(200)
  CapNhatGhe(@Body() body: gheUpdate ,  @Req() req ,@Res() res) {
    return this.gheService.capNhatGhe(body,req,res);
  }
}
