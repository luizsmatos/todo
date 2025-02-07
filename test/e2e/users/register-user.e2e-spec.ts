import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { PrismaService } from '@src/shared/infrastructure/persistence/prisma/prisma.service';
import request from 'supertest';
import { App } from 'supertest/types';

describe('Register User (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    prisma = moduleRef.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/register (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'j5l7a@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'j5l7a@example.com',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });

  test('/register (POST) with email already in use', async () => {
    await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'j5l7a@example.com',
      password: '123456',
    });

    const response = await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'j5l7a@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(409);
  });

  test('/register (POST) with invalid email', async () => {
    const response = await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'other-email',
      password: '123456',
    });

    console.log(response);

    expect(response.statusCode).toBe(400);
  });

  test('/register (POST) with invalid password', async () => {
    const response = await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'j5l7a@example.com',
      password: undefined,
    });

    expect(response.statusCode).toBe(400);
  });

  test('/register (POST) with invalid name', async () => {
    const response = await request(app.getHttpServer()).post('/register').send({
      name: undefined,
      email: 'j5l7a@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(400);
  });
});
