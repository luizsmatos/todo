import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@shared/infrastructure/http/decorators/user.decorator';
import {
  GetProfileUseCase,
  GetProfileUseCaseInput,
} from '@src/modules/user/application/use-cases/get-profile.use-case';

import { GetProfileResponseDto } from '../dtos/get-profile.dto';
import { ApiGetProfile } from './docs/get-profile.swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class GetProfileController {
  constructor(private readonly getProfileUseCase: GetProfileUseCase) {}

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  @ApiGetProfile()
  async handle(@User() userId: string): Promise<GetProfileResponseDto> {
    const getProfile: GetProfileUseCaseInput = {
      userId,
    };

    const { user } = await this.getProfileUseCase.execute(getProfile);

    return new GetProfileResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
