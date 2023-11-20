import { decodeTokenType } from 'src/interface/interface';
import { JwtService } from '@nestjs/jwt';
import { diskStorage } from 'multer';
import compress_images from 'compress-images';

import * as fs from 'fs';
// const compress_images = require('compress-images');
export const decodeToken = (token: string): decodeTokenType => {
  const jwtService = new JwtService();
  let data = jwtService.decode(token) as decodeTokenType;
  return data;
};

export const multerOption = (path: string, key: string) => {
  return {
    storage: diskStorage({
      destination: process.cwd() + path,
      filename(req, file, callback) {
        const isImage = key === 'img';
        const isVideo = key === 'video';

        // Kiểm tra tên tệp hoặc đuôi file để chặn các định dạng không phù hợp
        const isValidImageType = /\.(png|jpg|jpeg)$/i.test(file.originalname);
        const isValidVideoType = /\.(mp4|mp3)$/i.test(
          file.originalname,
        );

        if (isImage && !isValidImageType) {
          return callback(new Error('File không hợp lệ'), null);
        } else if (isVideo && !isValidVideoType) {
          return callback(new Error('File không hợp lệ'), null);
        }

        callback(null, new Date().getTime()+'_'+file.originalname);
      },
    }),
  };
};

export const ultimateImg = async (file:any) => {
  console.log("🚀 ~ file:", file)
  if (file.size > 50000) {
    try {
      await compress_images(
        process.cwd() + '/public/imgRaw/' + file.filename,
        process.cwd() + '/public/img/',
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: 'mozjpeg', command: ['-quality', '20'] } },
        { png: { engine: 'pngquant', command: ['--quality=20-50', "-o"] } },
        { svg: { engine: 'svgo', command: '--multipass' } },
        {
          gif: {
            engine: 'gifsicle',
            command: ['--colors', '64', '--use-col=web'],
          },
        },
      );
      // Xóa tệp hình ảnh chưa được tối ưu
      fs.unlink(process.cwd() + '/public/imgRaw/' + file.filename, (err) => {
        if (err) {
          console.error('Error deleting original image:', err);
        } else {
          console.log('Original image deleted.');
        }
      });
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  }
};
