import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthorizedRequest } from '../types/authorized-request.type';

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthorizedRequest>();

    const { session } = request;

    if (!session) {
      throw new UnauthorizedException();
    }

    return session;
  },
);
