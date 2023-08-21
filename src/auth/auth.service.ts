import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from './auth.interface';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.createOne(createUserDto);
  }

  async login({ login, password }: LoginUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          login,
        },
      });

      const isPassCorrect = await compare(password, user.password);

      if (user && isPassCorrect) {
        const payload = { login: user.login, sub: user.id };

        return await this.createTokens(payload);
      }
    } catch (err) {}
  }

  async refreshToken() {
    console.log('refreshing');
  }

  async createTokens(payload: IPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
