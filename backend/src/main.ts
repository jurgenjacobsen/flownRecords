import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that do not have any decorators
    }),
  );

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // You can specify specific origins if needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization, Bearer',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
