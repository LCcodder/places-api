import { IsEmail, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @Length(4, 32)
  email: string;
}
