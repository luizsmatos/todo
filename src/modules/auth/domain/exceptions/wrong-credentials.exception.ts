import { UnauthorizedException } from '@nestjs/common';

export class WrongCredentialsException extends UnauthorizedException {
  constructor() {
    super('Credentials are invalid');
  }
}
