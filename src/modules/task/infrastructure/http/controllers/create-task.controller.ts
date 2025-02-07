import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@shared/infrastructure/http/decorators/user.decorator';
import {
  CreateTaskUseCase,
  CreateTaskUseCaseInput,
} from '@src/modules/task/application/use-cases/create-task.use-case';

import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
} from '../dtos/create-task.dto';
import { ApiCreateTask } from './docs/create-task.swagger';

@ApiTags('Tasks')
@Controller()
export class CreateTaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post('tasks')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateTask()
  async handle(
    @User() userId: string,
    @Body() body: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    const { title, description } = body;

    const createTaskUseCaseInput: CreateTaskUseCaseInput = {
      userId,
      title,
      description,
    };

    const { task } = await this.createTaskUseCase.execute(
      createTaskUseCaseInput,
    );

    return new CreateTaskResponseDto({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status.toString(),
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }
}
