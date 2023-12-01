import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * @description Swagger Documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Esi Application')
    .setDescription('The ESI API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3080);
}
bootstrap();
