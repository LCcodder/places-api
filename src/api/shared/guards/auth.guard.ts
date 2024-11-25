import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import configuration from 'src/api/shared/config/configuration';

export const RoleGuard = (role: 'admin' | 'user') => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    private static extractToken(context: any): string | undefined {
      return context.contextType === 'http'
      ? context.switchToHttp().getRequest().query?.token
      : context.args[2]?.headers['token'];
    }

    constructor(public jwtService: JwtService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const apiToken = RoleGuardMixin.extractToken(context)
      if (!apiToken) return false;

      const isAdminToken = configuration().masterKeys.includes(apiToken)
      
      // admin auth scenario
      if (role === 'admin') {
        return isAdminToken
      }


      // user auth scenrario

      // admin can also access user routes
      if (isAdminToken) return true

      try {
        this.jwtService.verify(apiToken);
      } catch {
        throw new UnauthorizedException('Token not valid');
      }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
