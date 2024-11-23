import { Injectable } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import configuration from 'src/api/shared/config/configuration';
import { ITokensService } from './token.service.interface';


@Injectable()
export class TokensService implements ITokensService {
  constructor(private readonly jwtService: JwtService) {}

  public async generateToken(authDto: AuthDto) {
    return {
      token: this.jwtService.sign(authDto),
      expiresIn: configuration().jwtExpiration
    }
  }
}
