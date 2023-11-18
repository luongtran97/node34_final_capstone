import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { DatVeModule } from './dat-ve/dat-ve.module';
import { PhimModule } from './phim/phim.module';

@Module({
  imports: [NguoiDungModule, AuthModule ,  ConfigModule.forRoot({
    isGlobal:true
  }), DatVeModule, PhimModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
