import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RapPhimService {
  prisma = new PrismaClient();
  async LayThongTinRapPhim(ma_cum_rap) {

    try {
      const data = await this.prisma.rapPhim.findMany({
        where: {
          ma_cum_rap
        },
        include: {
          CumRap: {
            select: {
              ten_cum_rap: true,
              dia_chi: true,
              HeThongRap: {
                select:{
                    ma_he_thong_rap:true, 
                    ten_he_thong_rap:true,
                    logo:true
                }
              },
            },
          },
     
        },
      });

      return data;
    } catch (error) {}
  }
}
