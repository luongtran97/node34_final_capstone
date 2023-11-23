import { Injectable } from '@nestjs/common';
import { DatVe, PrismaClient } from '@prisma/client';

@Injectable()
export class DatVeService {
  primsa = new PrismaClient();

  async datVe(body, req, res): Promise<string> {
    let data = {
      tai_khoan: req.user.data.id_nguoi_dung,
      ma_lich_chieu: body.ma_lich_chieu,
      ma_ghe: body.ma_ghe,
      tinh_trang: true,
    };

    const checkDatVeExisting = await this.primsa.datVe.findFirst({
      where: {
        tai_khoan: req.user.data.id_nguoi_dung,
        ma_lich_chieu: body.ma_lich_chieu,
        ma_ghe: body.ma_ghe,
      },
    });

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
            tai_khoan: req.user.data.id_nguoi_dung,
            ma_lich_chieu: body.ma_lich_chieu,
            ma_ghe: body.ma_ghe,
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
            tai_khoan: req.user.data.id_nguoi_dung,
            ma_lich_chieu: body.ma_lich_chieu,
            ma_ghe: body.ma_ghe,
            tinh_trang: true,
          },
        });
        return res.send('Đã đặt vé');
      }
    } else {
      try {
        await this.primsa.datVe.create({
          data,
        });
        return res.send('Đã đặt vé');
      } catch (error) {
        return error;
      }
    }
  }
}
