import { Injectable } from '@nestjs/common';
import { Ghe, PrismaClient } from '@prisma/client';

@Injectable()
export class GheService {
  prisma = new PrismaClient();

  async themGhe(body): Promise<Ghe> {
    try {
      const data = await this.prisma.ghe.create({ data: body });
      return data;
    } catch (error) {
      return error;
    }
  }

  async xoaGhe(ma_ghe): Promise<string> {
    try {
      await this.prisma.ghe.delete({
        where: {
          ma_ghe,
        },
      });
      return 'Xóa thành công!';
    } catch (error) {
      return error;
    }
  }

  async layDanhSachGheTheoMaRap(ma_rap): Promise<Ghe[]> {
    try {
      const data = await this.prisma.ghe.findMany({
        where: {
          ma_rap,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async capNhatGhe(body): Promise<Ghe> {
    const { ma_ghe, ten_ghe, loai_ghe } = body;
    let data = {
      ten_ghe,
      loai_ghe,
    };
    try {
      const response = await this.prisma.ghe.update({
        data,
        where: {
          ma_ghe,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
