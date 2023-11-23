import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { DatVeService } from './dat-ve.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { datVe } from 'src/interface/interface';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Quản lý đặt vé')
@Controller('datVe')
export class DatVeController {
  constructor(private readonly datVeService: DatVeService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('DatVe')
  DatVe(@Body() body: datVe, @Req() req, @Res() res) {
    return this.datVeService.datVe(body, req, res);
  }
}
