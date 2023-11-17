import {
  Controller,
  Post,
  Get,
  Res,
  HttpCode,
  Query,
  UseGuards,
  Req,
  Body,
  Put,
  Delete,
  Header,
  Headers,
  Param,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  nguoiDung,
  nguoiDungType,
  thongTinNguoiDung,
} from 'src/interface/interface';
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Quản lý người dùng')
@Controller('user')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  // api lấy danh sách người dùng
  @Get('/LayDanhSachNguoiDung')
  @HttpCode(200)
  signUp(@Res() res, @Req() req) {
    return this.nguoiDungService.getUsersList(res, req);
  }

  // api tìm kiếm người dùng
  @Get('/TimKiemNguoiDung')
  @HttpCode(200)
  searchUser(@Req() req, @Res() res, @Query('tai_khoan') tai_khoan: string) {
    return this.nguoiDungService.searchUser(req, res, tai_khoan);
  }

  // api thêm người dùng
  @Post('/ThemNguoiDung')
  addUser(@Body() body: nguoiDung, @Res() res, @Req() req) {
    return this.nguoiDungService.addUser(body, res, req);
  }

  // api cập nhật thông tin người dùng
  @Put('/CapNhatThongTinNguoiDung')
  updateUser(@Body() body: thongTinNguoiDung, @Res() res, @Req() req) {
    return this.nguoiDungService.updateUser(body, res, req);
  }

  // api xóa người dùng
  @Delete('/XoaNguoiDung')
  delUser(
    @Query('nguoi_dung_id') nguoi_dung_id: number,
    @Res() res,
    @Req() req,
  ) {
    return this.nguoiDungService.delUser(+nguoi_dung_id, res, req);
  }

  // api lấy thông tin tài khoản
  @Get('/LayThongTinTaiKhoan')
  getUserInfo(
    @Query('id_nguoi_dung') id_nguoi_dung: number,
    @Res() res,
    @Req() req,
  ) {
    return this.nguoiDungService.getUserInfo(+id_nguoi_dung, res, req);
  }

  // lấy thông tin cá nhân
  @Get('/ThongTinCaNhan')
  getInfor(@Headers('token') token: string, @Req() req, @Res() res) {
    return this.nguoiDungService.getInfor(token, req, res);
  }

  // lấy danh sách người dùng phân trang
  @Get('/LayDanhSachNguoiDungPhanTrang/:page/:pageSize')
  getPaginationUserList(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
    @Res() res,
    @Req() req
  ) {
    return this.nguoiDungService.getPaginationUserList(+page, +pageSize, res,req);
  }
}
