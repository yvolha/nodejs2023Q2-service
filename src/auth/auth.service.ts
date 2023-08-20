import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signup(createUserDto: CreateUserDto) {
    return await this.userService.createOne(createUserDto);
  }

  async login({ login, password }: LoginUserDto) {}

  async refreshToken() {
    console.log('refreshing');
  }
}
