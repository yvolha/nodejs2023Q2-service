import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signup(createUserDto: CreateUserDto) {
    return await this.userService.createOne(createUserDto);
  }

  async login() {
    console.log('logging in');
  }

  async refreshToken() {
    console.log('refreshing');
  }
}
