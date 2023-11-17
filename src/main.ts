import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import {
  ErrorFilter,
  HttpExceptionFilter,
  MongoExceptionFilter,
  ServerExceptionFilter,
} from './utils/exceptionFilters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './utils/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ServerExceptionFilter(),
    new MongoExceptionFilter(),
    new ErrorFilter(),
  );

  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('POLO API')
    .setDescription('Polo app APIs')
    .setVersion('1.0')
    .addTag('Polo application')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(5000);
}
bootstrap();
