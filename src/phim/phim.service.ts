import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Phim } from 'src/interface/interface';

@Injectable()
export class PhimService {
  prisma = new PrismaClient();

  // xử lý lấy danh sách phim
  async getFlimsList(req, res): Promise<Phim[]> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
    return await this.prisma.phim.findMany();
  }

  // xử lý lấy danh sách phim phân trang
  async getFlimPagination(page, pageSize, res, req): Promise<Phim[]> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
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
  async createFlim(body, res, req): Promise<void> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
    const checkFLim: Phim[] = await this.prisma.phim.findMany({
      where: {
        ten_phim: body.ten_phim,
      },
    });

    if (checkFLim.length == 0) {
      try {
        await this.prisma.phim.create({ data: body });
        return res.status(201).send('Đã thêm phim thành công!');
      } catch (error) {
        return res.status(400).send(error);
      }
    } else {
      return res.status(400).send('Tên phim đã tồn tại!');
    }
  }

  // xử lý upload hình phim
  async uploadFlimImg(ma_phim, file, res, req): Promise<Phim> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
    try {
      const data: Phim = await this.prisma.phim.update({
        data: {
          hinh_anh: file.filename,
        },
        where: {
          ma_phim,
        },
      });
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  //xử lý upload trailer
  async uploadFlimTrailer(ma_phim, video, res, req): Promise<Phim> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }

    try {
      const data: Phim = await this.prisma.phim.update({
        data: {
          trailer: video.filename,
        },
        where: {
          ma_phim,
        },
      });

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý cập nhập thông tin thông phim
  async uploadFlimInfo(body, res, ma_phim, req): Promise<Phim> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
    try {
      const data = await this.prisma.phim.update({
        data: body,
        where: {
          ma_phim,
        },
      });
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý lấy thông tin phim
  async GetFlimInfo(ma_phim, res, req): Promise<Phim> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }

    try {
      const data = await this.prisma.phim.findMany({
        where: {
          ma_phim,
        },
      });
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý xóa phim
  async delFlim(ma_phim, res, req): Promise<void> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }

    const checkFlimExisting = await this.prisma.phim.findMany({
      where: {
        ma_phim,
      },
    });
    if (checkFlimExisting.length == 0) {
      return res.send('Phim không tồn tại!');
    }
    try {
      await this.prisma.phim.delete({
        where: {
          ma_phim,
        },
      });
      return res.status(200).send('Xóa thành công');
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý lấy danh sách phim theo ngày
  async getFLimListByDay(tu_ngay, den_ngay, res, req): Promise<Phim[]> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }

    try {
      const data: Phim[] = await this.prisma.phim.findMany({
        where: {
          ngay_khoi_chieu: {
            gte: tu_ngay,
            lte: den_ngay,
          },
        },
      });
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
