import { CanActivate, ExecutionContext, Injectable, mixin, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import configuration from 'src/config/configuration';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }
export const RoleGuard = (role: "admin" | "user") => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor (public jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest()
      const apiToken = request.query?.token
      if (!apiToken) return false
      
      if (role === 'admin') {
        return configuration().masterKeys.includes(apiToken)
      }

      try {
        this.jwtService.verify(apiToken);
      } catch (error) {
        throw new UnauthorizedException('Token not valid');
      }

      return true
    }
  }

  return mixin(RoleGuardMixin)
}