import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<{ user: { userId: string } }>();

    const userId = request.user?.userId;
    return userId;
  },
);
