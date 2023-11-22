import {
  Controller,
  Get,
  Res,
  Req,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  addBannerDto,
  bannerDto,
  uploadBanner,
  uploadBannerDot,
} from 'src/interface/interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/config/config';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Quản lý Banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  //api lấy danh sách banner
  @Get('/LayDanhSachBanner')
  getBannerList(@Res() res) {
    return this.bannerService.getBannerList(res);
  }

  // api thêm banner
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: uploadBannerDot })
  @UseInterceptors(
    FileInterceptor('banner_img', multerOption('img', '/public/imgRaw')),
  )
  @Post('/ThemBanner')
  addBanner(
    @Req() req,
    @Res() res,
    @Body() body: addBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bannerService.addBanner(res, body, file, req);
  }

  // api xóa banner
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/XoaBanner')
  delBanner(@Body() body: bannerDto, @Res() res, @Req() req) {
    return this.bannerService.delBanner(body, res, req);
  }

  // api update banner
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: uploadBanner })
  @UseInterceptors(
    FileInterceptor('banner_img', multerOption( '/public/imgRaw','img',)),
  )
  @Put('/CapNhatBanner')
  updateBanner(
    @Req() req,
    @Res() res,
    @UploadedFile() banner_img: Express.Multer.File,
    @Body() body: number,
  ) {
    return this.bannerService.updateBanner(res, body, banner_img, req);
  }

  // api lấy chi tiết banner
  @Get('/LayThongTinBanner/:bannerId')
  getBannerInfo(@Param('bannerId') bannerId: number, @Res() res) {
    return this.bannerService.getBannerInfo(+bannerId, res);
  }
}
