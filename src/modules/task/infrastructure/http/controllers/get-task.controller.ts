import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@shared/infrastructure/http/decorators/user.decorator';
import { GetTaskUseCase } from '@src/modules/task/application/use-cases/get-task.use-case';

import { GetTaskRequestDto, GetTaskResponseDto } from '../dtos/get-task.dto';
import { GetTaskUseCaseInput } from './../../../application/use-cases/get-task.use-case';
import { ApiGetTask } from './docs/get-task.swagger';

@ApiTags('Tasks')
@Controller()
export class GetTaskController {
  constructor(private readonly getTaskUseCase: GetTaskUseCase) {}

  @Get('tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiGetTask()
  async handle(
    @User() userId: string,
    @Param() params: GetTaskRequestDto,
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
