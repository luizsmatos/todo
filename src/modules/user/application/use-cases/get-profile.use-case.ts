import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

import { User } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../domain/repositories/users.repository';

export interface GetProfileUseCaseInput {
  userId: string;
}

export interface GetProfileUseCaseOutput {
  user: User;
}

@Injectable()
export class GetProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetProfileUseCaseInput): Promise<GetProfileUseCaseOutput> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundException();
    }

    return { user };
  }
}
