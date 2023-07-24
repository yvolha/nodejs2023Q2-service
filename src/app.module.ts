import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { FavsController } from './favs/favs.controller';
import { TrackController } from './track/track.controller';

@Module({
  imports: [],
  controllers: [AppController, AlbumController, ArtistController, FavsController, TrackController, UserController],
  providers: [AppService],
})
export class AppModule {}
