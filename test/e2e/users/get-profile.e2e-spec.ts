import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { createAndAuthenticateUser } from '@test/fixture/create-and-authenticate-user';
import request from 'supertest';
import { App } from 'supertest/types';

describe('Get Profile (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/users/profile/:userId (POST)', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    const response = await request(app.getHttpServer())
      .get('/users/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(201);
  });
});
