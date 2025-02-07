import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@shared/infrastructure/http/decorators/user.decorator';
import {
  ListTasksUseCase,
  ListTasksUseCaseInput,
} from '@src/modules/task/application/use-cases/list-tasks.use-case';

import { BaseTaskResponseDto } from '../dtos/base-task.dto';
import {
  ListTasksQueryDto,
  ListTasksResponseDto,
} from '../dtos/list-tasks.dto';
import { ApiListTasks } from './docs/list-tasks.swagger';

@ApiTags('Tasks')
@Controller()
export class ListTasksController {
  constructor(private readonly listTasksUseCase: ListTasksUseCase) {}

  @Get('tasks')
  @HttpCode(HttpStatus.OK)
  @ApiListTasks()
  async handle(
    @User() userId: string,
    @Query() query: ListTasksQueryDto,
  ): Promise<ListTasksResponseDto> {
    const { title, description, status, page, pageSize } = query;

    const listTasksUseCaseInput: ListTasksUseCaseInput = {
      userId,
      title,
      description,
      status,
      page,
      pageSize,
    };

    const { tasks } = await this.listTasksUseCase.execute(
      listTasksUseCaseInput,
    );

    return new ListTasksResponseDto({
      items: tasks.items.map((task) => {
        return new BaseTaskResponseDto({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status.toString(),
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        });
      }),
      page: tasks.page,
      pageSize: tasks.pageSize,
      totalItems: tasks.totalItems,
      totalPages: tasks.totalPages,
    });
  }
}
