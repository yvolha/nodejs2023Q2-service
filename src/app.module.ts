import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { PrismaModule } from './prisma-module/prisma.module';
import { PrismaService } from './prisma-module/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
    FavsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
