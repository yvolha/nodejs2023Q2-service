import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Get,
  Param,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import { Artist } from '@prisma/client';

import { IRoutes } from '../routes';
import { ArtistService } from './artist.service';
import { IDbEntities } from 'src/database/entities';
import { ERR_MSGS } from 'src/utils/messages';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';

@Controller(IRoutes.artist)
@ApiTags(IRoutes.artist)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

}
