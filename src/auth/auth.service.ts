import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { decodeToken } from 'src/config/config';
import { decodeTokenType, responseDecode } from 'src/interface/interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  primsa = new PrismaClient();

  // xử lý đăng ký
  async signUp(body, res): Promise<void> {
    const { tai_khoan, ho_ten, email, so_dt, mat_khau } = body;

    // kiểm tra email đã được đăng ký hay chưa
    const checkEmail = await this.primsa.nguoiDung.findMany({
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
      loai_nguoi_dung: 'user',
    };

    try {
      await this.primsa.nguoiDung.create({ data });
      res.status(201).send('Đăng ký thành công!');
    } catch (error) {
      console.log('🚀 ~ error:', error);
      res.status(400).send(error);
    }
  }

  // xử lý đăng nhập
  async signIn(body, res): Promise<responseDecode> {
    const { email, mat_khau } = body;

    const checkUser = await this.primsa.nguoiDung.findFirst({
      where: { email },
    });
  

    if (checkUser) {
      const checkPass = await bcrypt.compare(mat_khau, checkUser.mat_khau);

      if (checkPass) {
        const token = this.jwtService.sign(
          {
            data: checkUser,
          },
          { expiresIn: '5d', secret: 'BATMI' },
        );

        const decode: decodeTokenType = decodeToken(token);

        const response: responseDecode = {
          tai_khoan:decode.data.tai_khoan,
          email: decode.data.email,
          ho_ten: decode.data.ho_ten,
          id_nguoi_dung: decode.data.id_nguoi_dung,
          loai_nguoi_dung: decode.data.loai_nguoi_dung,
          so_dt: decode.data.so_dt,
          token,
        };
        return res.send(response);
      } else {
        res.status(400).send('Mật khẩu không đúng!');
      }
    } else {
      res.status(400).send('Email  không đúng!');
    }
  }
}
