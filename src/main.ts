import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // config swagger
   const config = new DocumentBuilder().setTitle("Api Capstone").addBearerAuth().build();
   const document = SwaggerModule.createDocument(app,config);
   SwaggerModule.setup("/swagger",app,document);


   app.enableCors({origin:"*"})
  await app.listen(8080);
}
bootstrap();
