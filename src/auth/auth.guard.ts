import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import configuration from 'src/config/configuration';

export const RoleGuard = (role: 'admin' | 'user') => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(public jwtService: JwtService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const apiToken = request.query?.token;
      if (!apiToken) return false;

      if (role === 'admin') {
        return configuration().masterKeys.includes(apiToken);
      }

      if (configuration().masterKeys.includes(apiToken)) return true
      
      try {
        this.jwtService.verify(apiToken);
      } catch (error) {
        throw new UnauthorizedException('Token not valid');
      }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
