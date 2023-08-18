import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from './role-enum/role-enum';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [ //! ROLE ENUM & DECORATORS
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (user) return requiredRoles.some((_role) => user.role == (_role));
    else return false
  }
}
