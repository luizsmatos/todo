import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { PrismaService } from '@src/shared/infrastructure/persistence/prisma/prisma.service';
import { createAndAuthenticateUser } from '@test/fixture/create-and-authenticate-user';
import { createTask } from '@test/fixture/create-task';
import request from 'supertest';
import { App } from 'supertest/types';

describe('Delete Task (e2e)', () => {
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

  test('/tasks/:taskId (DELETE)', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    const createdTask = await createTask(app, accessToken);

    const response = await request(app.getHttpServer())
      .delete(`/tasks/${createdTask.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(204);

    const taskOnDatabase = await prisma.task.findFirst({
      where: { id: createdTask.id },
    });

    expect(taskOnDatabase).toBeFalsy();
  });
});
