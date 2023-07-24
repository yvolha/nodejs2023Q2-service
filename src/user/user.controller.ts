import { Controller } from '@nestjs/common';
import { IRoutes } from '../routes';

@Controller(IRoutes.user)
export class UserController {}
