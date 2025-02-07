import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

export async function createAndAuthenticateUser(
  app: INestApplication<App>,
): Promise<{ accessToken: string }> {
  await request(app.getHttpServer()).post('/register').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'teste123',
  });

  const response = await request(app.getHttpServer()).post('/login').send({
    email: 'johndoe@example.com',
    password: 'teste123',
  });

  return response.body as { accessToken: string };
}
