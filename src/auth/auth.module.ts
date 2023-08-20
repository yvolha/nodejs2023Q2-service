import { Module } from '@nestjs/common';
import { AuthServce } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthServce],
})
export class AuthModule {}
