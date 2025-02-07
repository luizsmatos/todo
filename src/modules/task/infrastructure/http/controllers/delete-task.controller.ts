import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@shared/infrastructure/http/decorators/user.decorator';
import {
  DeleteTaskUseCase,
  DeleteTaskUseCaseInput,
} from '@src/modules/task/application/use-cases/delete-task.use-case';

import { DeleteTaskParamsDto } from '../dtos/delete-task.dto';
import { ApiDeleteTask } from './docs/delete-task.swagger';

@ApiTags('Tasks')
@Controller()
export class DeleteTaskController {
  constructor(private readonly deleteTaskUseCase: DeleteTaskUseCase) {}

  @Delete('tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteTask()
  async handle(
    @User() userId: string,
    @Param() params: DeleteTaskParamsDto,
  ): Promise<void> {
    const { taskId } = params;

    const deleteTaskUseCaseInput: DeleteTaskUseCaseInput = {
      userId,
      taskId,
    };

    await this.deleteTaskUseCase.execute(deleteTaskUseCaseInput);
  }
}
