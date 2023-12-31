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

import { IRoutes } from '../routes';
import { TrackService } from './track.service';
import { ERR_MSGS } from 'src/utils/messages';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';

@ApiTags(IRoutes.track)
@Controller(IRoutes.track)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.trackService.getAll(IRoutes.track);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.getOne(id, IRoutes.track);

    if (track) {
      return track;
    } else {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Track', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createOne(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto, IRoutes.track);
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.trackService.getOne(id, IRoutes.track);

    if (!track) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Track', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.trackService.update(id, updateTrackDto, IRoutes.track);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const track = await this.trackService.getOne(id, IRoutes.track);

    if (!track) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Track', id),
        HttpStatus.NOT_FOUND,
      );
    }

    await this.trackService.delete(id, IRoutes.track);
  }
}
