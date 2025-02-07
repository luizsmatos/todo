import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Task } from '@src/modules/task/domain/entities/task.entity';
import request from 'supertest';
import { App } from 'supertest/types';

export async function createTask(
  app: INestApplication<App>,
  accessToken: string,
) {
  const response = await request(app.getHttpServer())
    .post('/tasks')
    .send({
      title: faker.lorem.text(),
      description: faker.lorem.text(),
    })
    .set('Authorization', `Bearer ${accessToken}`);

  const task = response.body as Task;
  return task;
}
