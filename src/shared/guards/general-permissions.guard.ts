import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenPayloadMiddleware } from '../middlewares/token.middleware';

@Injectable()
export class PermissionsGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & TokenPayloadMiddleware = context
      .switchToHttp()
      .getRequest();

    // TODO: validações de company: planos, modulos, etc
    if (request.tokenPayload.employee.role !== 'admin') {
      throw new ForbiddenException('resource avaliable only for admin users');
    }

    return true;
  }
}
