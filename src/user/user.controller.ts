import { Controller, Get } from '@nestjs/common';
import { IRoutes } from '../routes';
import { UserService } from './user.service';

@Controller(IRoutes.user)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHelloWorld();
  }
}
