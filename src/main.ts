import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('Api Capstone')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.enableCors({ origin: '*' });
  app.use(express.static('.'));
  await app.listen(8080);
}
bootstrap();
