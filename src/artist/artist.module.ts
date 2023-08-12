import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { PrismaService } from 'src/prisma-module/prisma.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
