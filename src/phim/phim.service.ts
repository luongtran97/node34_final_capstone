import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ultimateImg } from 'src/config/config';
import { Phim } from 'src/interface/interface';

@Injectable()
export class PhimService {
  prisma = new PrismaClient();

  // xử lý lấy danh sách phim
  async getFlimsList(): Promise<Phim[]> {
    return await this.prisma.phim.findMany();
  }

  // xử lý lấy danh sách phim phân trang
  async getFlimPagination(page, pageSize, res): Promise<Phim[]> {
    let index: number = (1 - page) * pageSize;

    try {
      const data: Phim[] = await this.prisma.phim.findMany({
        take: index,
        skip: pageSize,
      });

      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  // xử lý thêm phim
  async createFlim(files) {
    console.log("🚀 ~ files:", files)
 

    // let imgBase = await ultimateImg(file)
  }
}
