import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import request from 'supertest';
import { App } from 'supertest/types';

describe('Authenticate User (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/login (POST)', async () => {
    await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'teste123',
    });

    const response = await request(app.getHttpServer()).post('/login').send({
      email: 'johndoe@example.com',
      password: 'teste123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      accessToken: expect.any(String) as string,
    });
  });

  test('/login (POST) with invalid email', async () => {
    const response = await request(app.getHttpServer()).post('/login').send({
      email: 'other-email',
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 401,
        message: 'Credentials are invalid',
      }),
    );
  });

  test('/login (POST) with invalid password', async () => {
    await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'teste123',
    });

    const response = await request(app.getHttpServer()).post('/login').send({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 401,
        message: 'Credentials are invalid',
      }),
    );
  });
});
