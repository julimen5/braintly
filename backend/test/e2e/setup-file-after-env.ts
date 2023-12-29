import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import { AppModule } from '../../src/app.module';
import { destroyConnection } from './setup-utils';
import { DataSource } from 'typeorm';
import * as express from 'express';
import helmet from 'helmet';

let app: INestApplication;
let server: any;

beforeAll(async () => {
  // Load plugins

  // Create Nest application for Test
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(express.json({ limit: '2mb' }));
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  server = app.getHttpServer();
  global.server = server;
  global.appContext = moduleFixture;

  // init app
  await app.init();
});

afterAll(async () => {
  const dataSource = app.get(DataSource);

  await destroyConnection(dataSource);
  await app.close();
});
