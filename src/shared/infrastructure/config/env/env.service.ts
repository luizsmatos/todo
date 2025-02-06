import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './env.validation';

@Injectable()
export class EnvService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  get<T extends keyof EnvironmentVariables>(key: T) {
    return this.configService.get<T>(key, { infer: true });
  }
}
