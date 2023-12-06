import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  decodeTokenType,
  mapNguoiDungToResponsesType,
  nguoiDungResponse,
  nguoiDungType,
} from 'src/interface/interface';
import * as bcrypt from 'bcrypt';
import { decodeToken } from 'src/config/config';

@Injectable()
export class NguoiDungService {
  prisma = new PrismaClient();
  // xử lý lấy danh sách người dùng
  async getUsersList(res, req): Promise<nguoiDungType[]> {
    const { loai_nguoi_dung } = req.user.data;

    // kiểm tra role người dùng
    if (loai_nguoi_dung !== 'admin') {
      return res.send(403);
    }

    try {
      const result: nguoiDungType[] = await this.prisma.nguoiDung.findMany();
      const responses: nguoiDungType[] = mapNguoiDungToResponsesType(result);
      return res.send(responses);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  //   xử lý tìm kiếm người dùng
  async searchUser(req, res, tai_khoan): Promise<nguoiDungType[]> {
    const { loai_nguoi_dung } = req.user.data;

    // kiểm tra role người dùng
    if (loai_nguoi_dung !== 'admin') {
      return res.send(403);
    }

    try {
      const data: nguoiDungType[] = await this.prisma.nguoiDung.findMany({
        where: {
          tai_khoan: {
            contains: tai_khoan,
          },
        },
      });

      const responses: nguoiDungType[] = mapNguoiDungToResponsesType(data);
      return res.send(responses);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // xử lý thêm người dùng
  async addUser(body, res, req): Promise<void> {
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.send(403);
    }

    const { tai_khoan, ho_ten, email, loai_nguoi_dung, so_dt, mat_khau } = body;

    const checkEmail = await this.prisma.nguoiDung.findMany({
      where: {
        email,
      },
    });
    //  nếu email đã tồn tại báo lỗi
    if (checkEmail.length != 0) {
      res.status(400).send('Email đã được sử dụng!');
      return;
    }
    // nếu email chưa tồn tại -> mã hóa mật khẩu -> lưu xuống databse

    const encodePassWord: string = bcrypt.hashSync(mat_khau, 10);

    const data = {
      tai_khoan,
      mat_khau: encodePassWord,
      ho_ten,
      email,
      so_dt,
      loai_nguoi_dung,
    };

    try {
      await this.prisma.nguoiDung.create({ data });
      res.status(201).send('Tạo thành công!');
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // xử lý cập nhật thông tin người dùng
  async updateUser(body, res, req): Promise<nguoiDungType> {
    const {ho_ten,so_dt,loai_nguoi_dung,id_nguoi_dung} = body
    const role = req.user.data.loai_nguoi_dung;
    if (role !== 'admin') {
      return res.status(403);
    }
    try {
      const updatedUserData: nguoiDungResponse =
        await this.prisma.nguoiDung.update({
          data: {
            ho_ten,
            so_dt,
            loai_nguoi_dung,
            mat_khau: bcrypt.hashSync(body.mat_khau, 10),
          },
          where: {
            id_nguoi_dung,
          },
        });
      const response: nguoiDungType = {
        id_nguoi_dung: updatedUserData.id_nguoi_dung,
        so_dt: updatedUserData.so_dt,
        tai_khoan: updatedUserData.tai_khoan,
        loai_nguoi_dung: updatedUserData.loai_nguoi_dung,
        email: updatedUserData.email,
        ho_ten: updatedUserData.ho_ten,
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  // xử lý xóa người dùng
  async delUser(id_nguoi_dung, res, req): Promise<void> {
    const role = req.user.data.loai_nguoi_dung;

    if (role !== 'admin') {
      return res.send(403);
    }

    try {
      await this.prisma.nguoiDung.delete({
        where: {
          id_nguoi_dung,
        },
      });
      return res.status(200).send('Xóa thành công!');
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý lấy thông tin tài khoản
  async getUserInfo(id_nguoi_dung, res, req): Promise<nguoiDungType> {
    const role = req.user.data.loai_nguoi_dung;

    if (role !== 'admin') {
      return res.send(403);
    }

    try {
      const data: nguoiDungResponse = await this.prisma.nguoiDung.findFirst({
        where: {
          id_nguoi_dung,
        },
      });

      if (!data) {
        res.status(404).send('Không tìm thấy người dùng!');
      }

      const response: nguoiDungType = {
        id_nguoi_dung: data.id_nguoi_dung,
        ho_ten: data.ho_ten,
        email: data.email,
        tai_khoan: data.tai_khoan,
        so_dt: data.so_dt,
        loai_nguoi_dung: data.loai_nguoi_dung,
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý lấy thông tin cá nhân
  async getInfor(token, req, res): Promise<nguoiDungType> {
    const decode: decodeTokenType = decodeToken(token);
    const role = req.user.data.loai_nguoi_dung;

    if (role !== 'admin') {
      return res.send(403);
    }

    try {
      const data: nguoiDungResponse = await this.prisma.nguoiDung.findFirst({
        where: {
          id_nguoi_dung: decode.data.id_nguoi_dung,
        },
      });
      const response: nguoiDungType = {
        id_nguoi_dung: data.id_nguoi_dung,
        ho_ten: data.ho_ten,
        email: data.email,
        tai_khoan: data.tai_khoan,
        so_dt: data.so_dt,
        loai_nguoi_dung: data.loai_nguoi_dung,
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // xử lý phân trang người dùng
  async getPaginationUserList(page, pageSize, res, req): Promise<nguoiDungType[]> {

    let index: number = (page - 1) * pageSize;
    const role: string = req.user.data.loai_nguoi_dung;


    if (role !== 'admin') {
      return res.send(403);
    }
    try {
      const data: nguoiDungType[] = await this.prisma.nguoiDung.findMany({
        skip: index,
        take: pageSize,
      });

      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }
}
