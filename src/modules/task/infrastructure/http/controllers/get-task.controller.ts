import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@shared/infrastructure/http/decorators/user.decorator';
import {
  GetTaskUseCase,
  GetTaskUseCaseInput,
} from '@src/modules/task/application/use-cases/get-task.use-case';

import { GetTaskParamsDto, GetTaskResponseDto } from '../dtos/get-task.dto';
import { ApiGetTask } from './docs/get-task.swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller()
export class GetTaskController {
  constructor(private readonly getTaskUseCase: GetTaskUseCase) {}

  @Get('tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiGetTask()
  async handle(
    @User() userId: string,
    @Param() params: GetTaskParamsDto,
  ): Promise<GetTaskResponseDto> {
    const { taskId } = params;

    const getTaskUseCaseInput: GetTaskUseCaseInput = {
      userId,
      taskId,
    };

    const { task } = await this.getTaskUseCase.execute(getTaskUseCaseInput);

    return new GetTaskResponseDto({
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
