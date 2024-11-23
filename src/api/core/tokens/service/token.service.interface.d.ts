import { AuthDto } from "../dto/auth.dto"

export interface ITokensService {
  generateToken(authDto: AuthDto): Promise<{
    token: string
    expiresIn: string
  }>
}