import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { IRoutes } from 'src/routes';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginUserDto } from './auth.dto';
import { ERR_MSGS } from 'src/utils/messages';

@Controller(IRoutes.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(IRoutes.signup)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Post(IRoutes.login)
  async login(@Body() loginUserDto: LoginUserDto) {
    const tokens = await this.authService.login(loginUserDto);

    if (tokens) return tokens;

    throw new ForbiddenException(ERR_MSGS.DENIED());
  }
}
