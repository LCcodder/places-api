import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class TokensController {
  constructor(private readonly authService: TokensService) {}

  @Post()
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )
  public async getToken(@Body() authDto: AuthDto) {
    return this.authService.generateToken(authDto);
  }
}
