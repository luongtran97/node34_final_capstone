import { ApiProperty } from '@nestjs/swagger';

export type decodeTokenType = {
  data: {
    id_nguoi_dung: number;
    tai_khoan: string;
    email: string;
    mat_khau: string;
    loai_nguoi_dung: string;
    ho_ten: string;
    so_dt: string;
  };

  iat: number;
  exp: number;
};

export type responseDecode = {
  id_nguoi_dung: number;
  tai_khoan: string;
  email: string;
  loai_nguoi_dung: string;
  ho_ten: string;
  so_dt: string;
  token: string;
};
export class bodySignUp {
  @ApiProperty()
  tai_khoan: string;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  so_dt: string;

  @ApiProperty()
  mat_khau: string;
}

export class bodySignIn {
  @ApiProperty()
  email: string;

  @ApiProperty()
  mat_khau: string;
}
export type nguoiDungResponse = {
  id_nguoi_dung: number;
  tai_khoan: string;
  mat_khau: string;
  email: string;
  loai_nguoi_dung: string;
  ho_ten: string;
  so_dt: string;
};
export type nguoiDungType = {
  id_nguoi_dung: number;
  tai_khoan: string;
  email: string;
  loai_nguoi_dung: string;
  ho_ten: string;
  so_dt: string;
};
export class nguoiDung {
  @ApiProperty()
  tai_khoan: string;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  so_dt: string;

  @ApiProperty()
  mat_khau: string;

  @ApiProperty()
  loai_nguoi_dung: number;
}

export class thongTinNguoiDung {
  @ApiProperty()
  id_nguoi_dung: number;
  @ApiProperty()
  tai_khoan: string;
  @ApiProperty()
  ho_ten: string;
  @ApiProperty()
  so_dt: string;
  @ApiProperty()
  mat_khau: string;
  @ApiProperty()
  loai_nguoi_dung: string;
}

export const mapNguoiDungToResponsesType = (data: nguoiDungType[]) => {
  return data.map((item) => ({
    id_nguoi_dung: item.id_nguoi_dung,
    ho_ten: item.ho_ten,
    so_dt: item.so_dt,
    tai_khoan: item.tai_khoan,
    loai_nguoi_dung: item.loai_nguoi_dung,
    email: item.email,
  }));
};
export class upLoadFlim {
  @ApiProperty()
  ten_phim: string;

  @ApiProperty()
  mo_ta: string;

  @ApiProperty()
  ngay_khoi_chieu: Date;

  @ApiProperty()
  danh_gia: number;

  @ApiProperty()
  hot: boolean;

  @ApiProperty()
  dang_chieu: boolean;

  @ApiProperty()
  sap_chieu: boolean;
}
export type Phim = {
  ma_phim: number;
  ten_phim: string;
  trailer: string;
  hinh_anh: string;
  mo_ta: string;
  ngay_khoi_chieu: Date;
  danh_gia: number;
  hot: boolean;
  dang_chieu: boolean;
  sap_chieu: boolean;
};
export class uploadFlim {
  @ApiProperty()
  ten_phim: string;

  @ApiProperty()
  ngay_khoi_chieu: Date;

  @ApiProperty()
  danh_gia: number;

  @ApiProperty()
  hot: boolean;

  @ApiProperty()
  dang_chieu: boolean;

  @ApiProperty()
  sap_chieu: boolean;

  @ApiProperty()
  mo_ta: string;
}
export class uploadBannerDot {
  @ApiProperty({ type: String, format: 'binary' })
  banner_img: any;

  @ApiProperty()
  ma_phim: number;
}
export class addBannerDto {
  @ApiProperty()
  ma_phim: number;
}
export class bannerDto {
  @ApiProperty()
  ma_banner: number;
}
export class uploadFilmImg {
  @ApiProperty({ type: String, format: 'binary' })
  img: any;
}
export class uploadFilmTrailer {
  @ApiProperty({ type: String, format: 'binary' })
  video: any;
}

export class uploadBanner {
  @ApiProperty({ type: String, format: 'binary' })
  banner_img: any;

  @ApiProperty()
  ma_banner: number;
}

export class uploadCinema {
  @ApiProperty({ type: String, format: 'binary' })
  logo: any;

  @ApiProperty()
  ten_he_thong_rap: string;
}
export class updateCinema {
  @ApiProperty({ type: String, format: 'binary' })
  logo: any;

  @ApiProperty()
  ma_he_thong_rap: number;

  @ApiProperty()
  ten_he_thong_rap: string;
}
export class lichChieu {
  @ApiProperty()
  ma_rap: number;

  @ApiProperty()
  ma_phim: number;

  @ApiProperty()
  gia_ve: number;
}

export class datVe {
  @ApiProperty()
  ma_lich_chieu: number;

  @ApiProperty()
  ma_ghe: number

}

export class ghe{
  @ApiProperty()
  ten_ghe:string

  @ApiProperty()
  loai_ghe:string

  @ApiProperty()
  ma_rap:number
}
export class gheUpdate{
  @ApiProperty()
  ma_ghe:number

  @ApiProperty()
  ten_ghe:string

  @ApiProperty()
  loai_ghe:string

  @ApiProperty()
  ma_rap:number
}