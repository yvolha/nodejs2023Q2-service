import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { AlbumController } from './controllers/album/album.controller';
import { ArtistController } from './controllers/artist/artist.controller';
import { FavsController } from './controllers/favs/favs.controller';
import { TrackController } from './controllers/track/track.controller';

@Module({
  imports: [],
  controllers: [AppController, AlbumController, ArtistController, FavsController, TrackController, UserController],
  providers: [AppService],
})
export class AppModule {}
