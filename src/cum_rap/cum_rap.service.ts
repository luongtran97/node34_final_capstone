import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CumRapService {
  prisma = new PrismaClient();
  async layThongTinCumRapTheoHeThong(ma_he_thong_rap) {
    const data = await this.prisma.cumRap.findMany({
      where: {
        ma_he_thong_rap,
      },
      include: {
        HeThongRap: {
          select: {
            ma_he_thong_rap: true,
            ten_he_thong_rap: true,
            logo: true,
          },
        },
      },
    });

    return data;
  }
}
