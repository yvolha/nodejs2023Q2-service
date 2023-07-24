import { Controller } from '@nestjs/common';
import { IRoutes } from '../routes';

@Controller(IRoutes.favs)
export class FavsController {}
