import {
  Controller,
  Body,
  ForbiddenException,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { IRoutes } from 'src/routes';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginUserDto, RefreshTokenDto } from './auth.dto';
import { ERR_MSGS } from 'src/utils/messages';
import { JwtAuthGuard } from './auth.guard';
import { HasRefreshToken, Public } from 'src/utils/decorators';

@Controller(IRoutes.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post(IRoutes.signup)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Public()
  @Post(IRoutes.login)
  async login(@Body() loginUserDto: LoginUserDto) {
    const tokens = await this.authService.login(loginUserDto);

    if (tokens) return tokens;

    throw new ForbiddenException(ERR_MSGS.DENIED());
  }

  @Post(IRoutes.refresh)
  async refresh(
    @HasRefreshToken(
      new ValidationPipe({
        validateCustomDecorators: true,
        errorHttpStatusCode: HttpStatus.UNAUTHORIZED,
        exceptionFactory: () => new UnauthorizedException(ERR_MSGS.DENIED()),
      }),
    )
    refreshTokenDto: RefreshTokenDto,
  ) {
    const tokens = await this.authService.refreshToken(refreshTokenDto);

    if (tokens) return tokens;

    throw new ForbiddenException(ERR_MSGS.DENIED());
  }
}
