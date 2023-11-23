import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatVeService {
    primsa = new PrismaClient()
    
   async datVe(body){
   console.log("🚀 ~ body:", body)

    }

}
