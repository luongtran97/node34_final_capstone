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

export class uploadFileFilm {
  // @ApiProperty()
  // ten_phim: string;

  @ApiProperty({ type: String, format: 'binary' })
  img: any;

  // @ApiProperty()
  // ngay_khoi_chieu: Date;

  @ApiProperty({ type: String, format: 'binary' })
  video: string;

  // @ApiProperty()
  // danh_gia: number;

  // @ApiProperty()
  // hot: boolean;

  // @ApiProperty()
  // dang_chieu: boolean;

  // @ApiProperty()
  // sap_chieu: boolean;

  // @ApiProperty()
  // mo_ta: string;
}
