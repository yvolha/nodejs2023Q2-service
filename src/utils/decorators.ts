import {
  SetMetadata,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);

export const HasRefreshToken = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const body = context.switchToHttp().getRequest().body;

    if (Object.keys(body).length !== 1) {
      return true;
    }

    return body;
  },
);
