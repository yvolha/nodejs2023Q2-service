import { Controller, Post, Body } from '@nestjs/common';
import { IRoutes } from 'src/routes';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';

@Controller(IRoutes.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(IRoutes.signup)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }
}
