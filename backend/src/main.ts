import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { ExceptionFilter } from './config/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // app.use(express.json({ limit: '2mb' }));
  app.use(helmet());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });
  await app.listen(process.env.PORT);
}
bootstrap();
