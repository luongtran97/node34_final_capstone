import { Controller, Post ,Body , Res } from '@nestjs/common';
import { DatVeService } from './dat-ve.service';
import { ApiTags } from '@nestjs/swagger';
import { datVe } from 'src/interface/interface';

@ApiTags('Quản lý đặt vé')
@Controller('datVe')
export class DatVeController {
  constructor(private readonly datVeService: DatVeService) {}

  @Post('DatVe')
  DatVe(@Body() body:datVe){
    return this.datVeService.datVe(body)
  }
}
