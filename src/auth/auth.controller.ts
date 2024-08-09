import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ValidationPipe({skipMissingProperties: true}))
  @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, whitelist: true, transform: true}))
  authorize(@Body() authDto: AuthDto) {
    return this.authService.authorize(authDto);
  }

}
