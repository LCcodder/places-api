import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: configuration().jwtExpiration },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
