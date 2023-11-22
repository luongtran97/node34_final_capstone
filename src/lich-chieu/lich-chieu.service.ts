import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LichChieuService {
  prisma = new PrismaClient();
  async getLichChieu(ma_rap) {
    const data = await this.prisma.lichChieu.findMany({
      where: {
        ma_phim:ma_rap,
      },
      include: {
        Phim: {
          select: {
            ma_phim: true,
            ten_phim: true,
            trailer: true,
            hinh_anh: true,
            mo_ta: true,
            ngay_khoi_chieu: true,
            danh_gia: true,
            hot: true,
            dang_chieu: true,
            sap_chieu: true,
          },
        },
        RapPhim: {
          select: {
            ma_rap: true,
            ten_rap: true,
            CumRap: {
              select: {
                ma_cum_rap: true,
                ten_cum_rap: true,
                dia_chi: true,
                HeThongRap: {
                  select: {
                    ma_he_thong_rap: true,
                    ten_he_thong_rap: true,
                    logo: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return data;
  }
}
