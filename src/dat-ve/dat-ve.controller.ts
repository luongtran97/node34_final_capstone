import { Controller } from '@nestjs/common';
import { DatVeService } from './dat-ve.service';

@Controller('dat-ve')
export class DatVeController {
  constructor(private readonly datVeService: DatVeService) {}
}
