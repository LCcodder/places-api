import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TokensService } from './service/tokens.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class TokensController {
  constructor(private readonly authService: TokensService) {}

  @Post()
  public async getToken(@Body() authDto: AuthDto) {
    return this.authService.generateToken(authDto);
  }
}
