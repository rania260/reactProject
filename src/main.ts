import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('react-nest example')
  .setDescription('The react-nest API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  dotenv.config();
  // Enable CORS
  app.enableCors({
    origin: '*', // Replace '*' with your frontend URL in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
});
  await app.listen(8000);
}
bootstrap();
