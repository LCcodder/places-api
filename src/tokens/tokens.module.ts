import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';

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
