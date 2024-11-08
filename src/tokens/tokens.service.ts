import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import configuration from 'src/config/configuration';


@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  public async generateToken(authDto: AuthDto) {
    return {
      token: this.jwtService.sign(authDto),
      expiresIn: configuration().jwtExpiration
    }
  }
}
