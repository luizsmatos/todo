import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { PrismaService } from '@src/shared/infrastructure/persistence/prisma/prisma.service';
import { createAndAuthenticateUser } from '@test/fixture/create-and-authenticate-user';
import { createTask } from '@test/fixture/create-task';
import request from 'supertest';
import { App } from 'supertest/types';

describe('Lists Tasks (e2e)', () => {
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

  test('/tasks (GET)', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    const createManyTasks = Array.from({ length: 10 }, () =>
      createTask(app, accessToken),
    );

    await Promise.all(createManyTasks);

    const response = await request(app.getHttpServer())
      .get(`/tasks`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);

    const taskOnDatabase = await prisma.task.findMany();

    expect(taskOnDatabase).toHaveLength(10);
  });
});
