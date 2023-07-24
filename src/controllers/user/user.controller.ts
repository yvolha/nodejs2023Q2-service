import { Controller } from '@nestjs/common';
import { IRoutes } from '../controllers';

@Controller(IRoutes.user)
export class UserController {}
