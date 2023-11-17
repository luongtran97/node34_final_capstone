import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { bodySignIn, bodySignUp } from 'src/interface/interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quản lý người dùng')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // api đăng ký
  @Post('/DangKy')
  signUp(@Body() body: bodySignUp, @Res() res) {
    return this.authService.signUp(body, res);
  }

  // api đăng nhập
  @Post('/DangNhap')
  signIn(@Body() body: bodySignIn, @Res() res) {
    return this.authService.signIn(body, res);
  }
}
