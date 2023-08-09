import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PrismaService } from 'src/prisma-module/prisma.service';

@Module({
  providers: [CommonService, PrismaService],
})
export class CommonModule {}
