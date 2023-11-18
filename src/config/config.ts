import { decodeTokenType } from 'src/interface/interface';
import { JwtService } from '@nestjs/jwt';
import { diskStorage } from 'multer';
import compress_images from 'compress-images';
import * as fs from 'fs';
export const decodeToken = (token: string): decodeTokenType => {
  const jwtService = new JwtService();
  let data = jwtService.decode(token) as decodeTokenType;
  return data;
};

export const multerOption = (path: string) => {
  return {
    storage: diskStorage({
      destination: process.cwd() + path,
      filename(req, file, callback) {
        callback(null, new Date().getTime() + '_' + file.originalname);
      },
    }),
  };
};

export const ultimateImg = async (file) => {
  if (file.size > 50000) {
    compress_images(
      process.cwd() + '/public/imgRaw/' + file.filename,
      process.cwd() + '/public/file/',

      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: 'mozjpeg', command: ['-quality', '20'] } },
      { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
      { svg: { engine: 'svgo', command: '--multipass' } },
      {
        gif: {
          engine: 'gifsicle',
          command: ['--colors', '64', '--use-col=web'],
        },
      },
      function (error, completed, statistic) {
        // xóa file hình chưa tối ưu
        if (completed) {
          fs.unlink(process.cwd() + './public/imgRaw' + file.filename, () => {});
        }
        return file
      },
    );
  }
};
