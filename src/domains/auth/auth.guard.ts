import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IJwtPayload } from './auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      'isPublicRoute',
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) return true;

    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization?.split(' ') || [];
    const token = authHeader[0] === 'Bearer' ? authHeader[1] : null;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<IJwtPayload>(token, {
        secret:
          process.env.JWT_SEC_KEY ||
          '521ae6ec1826376dcb6a6e42472bd311ab7014df775713031b10e131478465fb',
      });

      req['token'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
