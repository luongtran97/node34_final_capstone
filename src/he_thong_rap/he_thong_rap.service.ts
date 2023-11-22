import { Injectable } from '@nestjs/common';
import { HeThongRap, PrismaClient } from '@prisma/client';
import { type } from 'os';

@Injectable()
export class HeThongRapService {
  prisma = new PrismaClient();

  // xử lý lấy thông tin hệ thống rạp
  async getCinemaManagement(): Promise<HeThongRap[]> {
    try {
      const data = await this.prisma.heThongRap.findMany();
      return data;
    } catch (error) {
      return error;
    }
  }

  // xử lý thêm hệ thống rạp
  async addCinemaManagement(body, file, res): Promise<HeThongRap> {
    try {
      const response = await this.prisma.heThongRap.create({
        data: {
          ten_he_thong_rap: body.ten_he_thong_rap,
          logo: file.filename,
        },
      });

      return res.send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý xóa hệ thống rạp
  async delCinemaManagement(ma_he_thong_rap, res): Promise<void> {
    try {
      await this.prisma.heThongRap.delete({ where: { ma_he_thong_rap } });
      res.send('Xoá thành công!');
    } catch (error) {
      res.send(error);
    }
  }

  // xử lý update hệ thống rạp
  async updateCinemaManagement(body, file, res): Promise<HeThongRap> {
    console.log('🚀 ~ file:', file);
    console.log('🚀 ~ body:', body);
    const { ma_he_thong_rap, ten_he_thong_rap } = body;
    try {
      const data = await this.prisma.heThongRap.update({
        data: {
          ten_he_thong_rap,
          logo: file.filename,
        },
        where: {
          ma_he_thong_rap,
        },
      });
      return res.send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
