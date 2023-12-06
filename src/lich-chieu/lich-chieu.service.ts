import { Injectable } from '@nestjs/common';
import { LichChieu, PrismaClient } from '@prisma/client';

@Injectable()
export class LichChieuService {
  prisma = new PrismaClient();

  async layLichChieuTheoMaRap(ma_rap) {
    const data = await this.prisma.lichChieu.findMany({
      where: {
        ma_rap,
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

  async layThongTinLichChieuTheoMaPhim(ma_phim) {
    const data = await this.prisma.lichChieu.findMany({
      where: {
        ma_phim,
      },
      include: {
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

  async taoLichChieu(body, res,req): Promise<LichChieu> {
    const role = req.user.data.loai_nguoi_dung;

    if (role !== 'admin') {
      return res.send(403);
    }
    let data = {
      ma_rap: body.ma_rap,
      ma_phim: body.ma_phim,
      ngay_gio_chieu: new Date(),
      gia_ve: body.gia_ve,
    };

    try {
      const response = await this.prisma.lichChieu.create({ data });
      return res.status(201).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async xoaLichChieu(ma_lich_chieu,res,req): Promise<string> {
    const role = req.user.data.loai_nguoi_dung;

    if (role !== 'admin') {
      return res.send(403);
    }
    try {
      await this.prisma.lichChieu.delete({
        where: {
          ma_lich_chieu,
        },
      });
      return res.send("xóa thành công")
    } catch (error) {
      console.log('🚀 ~ error:', error)
      return res.send(error)
    }
  }
}
