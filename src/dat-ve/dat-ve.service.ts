import { Injectable } from '@nestjs/common';
import { DatVe, PrismaClient } from '@prisma/client';

@Injectable()
export class DatVeService {
  primsa = new PrismaClient();

  async datVe(body, req, res): Promise<string> {
    const { ma_lich_chieu, ma_ghe } = body;

    const gheAvailable = await this.primsa.datVe.findFirst({
      where: {
        ma_lich_chieu,
        ma_ghe,
        tinh_trang: true,
      },
    });

    let data = {
      tai_khoan: req.user.data.id_nguoi_dung,
      ma_lich_chieu,
      ma_ghe,
      tinh_trang: true,
    };

    const checkDatVeExisting = await this.primsa.datVe.findFirst({
      where: {
        tai_khoan: req.user.data.id_nguoi_dung,
        ma_lich_chieu,
        ma_ghe,
      },
    });

    // kiểm tra và ngăn người dùng khác đặt trùng ghế đã được đặt
    if (gheAvailable && gheAvailable.tai_khoan !== data.tai_khoan) {
      return res.send('Ghế không còn trống!');
    }

    // kiểm tra người dùng đã đặt ghế hay chưa, xử lý đặt và hủy ghế
    if (checkDatVeExisting) {
      const isDatVe = await this.primsa.datVe.findFirst({
        where: {
          ma_dat_ve: checkDatVeExisting.ma_dat_ve,
          tinh_trang: true,
        },
      });
      if (isDatVe) {
        await this.primsa.datVe.update({
          where: {
            ma_dat_ve: checkDatVeExisting.ma_dat_ve,
          },
          data: {
            ...data,
            tinh_trang: false,
          },
        });
        res.send('Đã hủy đặt vé!');
      } else {
        await this.primsa.datVe.update({
          where: {
            ma_dat_ve: checkDatVeExisting.ma_dat_ve,
          },
          data: {
            ...data,
            tinh_trang: true,
          },
        });
        return res.send('Đã đặt vé!');
      }
    } else {
      try {
        await this.primsa.datVe.create({
          data,
        });
        return res.send('Đã đặt vé!');
      } catch (error) {
        return error;
      }
    }
  }
}
