import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { PrismaService } from '@src/shared/infrastructure/persistence/prisma/prisma.service';
import { createAndAuthenticateUser } from '@test/fixture/create-and-authenticate-user';
import request from 'supertest';
import { App } from 'supertest/types';

describe('Create Task (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/tasks (POST)', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: faker.lorem.text(),
        description: faker.lorem.text(),
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(201);

    const taskOnDatabase = await prisma.task.findFirst();

    expect(taskOnDatabase).toBeTruthy();
  });
});
