import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServce {
  async signup() {
    console.log('signing up');
  }

  async login() {
    console.log('logging in');
  }

  async refreshToken() {
    console.log('refreshing');
  }
}
