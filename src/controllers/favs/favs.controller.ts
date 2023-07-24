import { Controller } from '@nestjs/common';
import { IRoutes } from '../controllers';

@Controller(IRoutes.favs)
export class FavsController {}
