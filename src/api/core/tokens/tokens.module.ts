import { Module } from '@nestjs/common';
import { TokensService } from './service/tokens.service';
import { TokensController } from './tokens.controller';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/api/shared/config/configuration';

@Module({
  imports: [
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: configuration().jwtExpiration },
    }),
  ],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
