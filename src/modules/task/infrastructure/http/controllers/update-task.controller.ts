import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@shared/infrastructure/http/decorators/user.decorator';
import {
  UpdateTaskUseCase,
  UpdateTaskUseCaseInput,
} from '@src/modules/task/application/use-cases/update-task.use-case';

import {
  UpdateTaskBodyDto,
  UpdateTaskParamsDto,
  UpdateTaskResponseDto,
} from '../dtos/update-task.dto';
import { ApiUpdateTask } from './docs/update-task.swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller()
export class UpdateTaskController {
  constructor(private readonly updateTaskUseCase: UpdateTaskUseCase) {}

  @Put('tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiUpdateTask()
  async handle(
    @User() userId: string,
    @Param() params: UpdateTaskParamsDto,
    @Body() body: UpdateTaskBodyDto,
  ): Promise<UpdateTaskResponseDto> {
    const { taskId } = params;
    const { title, description, status } = body;

    const updateTaskUseCaseInput: UpdateTaskUseCaseInput = {
      userId,
      taskId,
      title,
      description,
      status,
    };

    const { task } = await this.updateTaskUseCase.execute(
      updateTaskUseCaseInput,
    );

    return new UpdateTaskResponseDto({
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
