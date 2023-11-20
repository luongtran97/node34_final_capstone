import { Injectable } from '@nestjs/common';
import { Banner, Phim, PrismaClient } from '@prisma/client';

@Injectable()
export class BannerService {
  prisma = new PrismaClient();

  // xử lý lấy danh sách banner
  async getBannerList(res): Promise<Banner[]> {
    try {
      const data = await this.prisma.banner.findMany({
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
        },
      });
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý thêm banner
  async addBanner(res, body, file, req): Promise<Banner> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
    const data = {
      hinh_anh: file.filename,
      ma_phim: +body.ma_phim,
    };
    try {
      const response: Banner = await this.prisma.banner.create({
        data,
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
        },
      });
      return res.status(201).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý xóa banner
  async delBanner(body, res, req): Promise<void> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
    try {
      await this.prisma.banner.delete({
        where: {
          ma_banner: body.ma_banner,
        },
      });
      return res.status(200).send('Xóa thành công!');
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý update banner
  async updateBanner(res, body, file, req): Promise<Phim> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
    const data = {
      hinh_anh: file.filename,
    };

    try {
      const response = await this.prisma.banner.update({
        data,
        where: {
          ma_banner: +body.ma_banner,
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
        },
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return res.status(200).send(error);
    }
  }

  // xử lý lấy thông tin banner
  async getBannerInfo(bannerId, res): Promise<Phim> {
    const data = await this.prisma.banner.findMany({
      where: {
        ma_banner: bannerId,
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
      },
    });
    return res.status(200).send(data);
  }
}
