import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { DatVeModule } from './dat-ve/dat-ve.module';
import { PhimModule } from './phim/phim.module';
import { BannerModule } from './banner/banner.module';
import { HeThongRapModule } from './he_thong_rap/he_thong_rap.module';
import { CumRapModule } from './cum_rap/cum_rap.module';
import { RapPhimModule } from './rap_phim/rap_phim.module';
import { LichChieuModule } from './lich-chieu/lich-chieu.module';

@Module({
  imports: [NguoiDungModule, AuthModule ,  ConfigModule.forRoot({
    isGlobal:true
  }), DatVeModule, PhimModule, BannerModule, HeThongRapModule, CumRapModule, RapPhimModule, LichChieuModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
