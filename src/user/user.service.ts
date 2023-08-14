import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { PrismaService } from 'src/prisma-module/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async getOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createOne(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async updateOne(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.getOne(id);

    if (user && user.password === updatePasswordDto.oldPassword) {
      return await this.prisma.user.update({
        data: {
          password: updatePasswordDto.newPassword,
          version: user.version + 1,
        },
        where: {
          id,
        },
      });
    }

    return;
  }

  async deleteOne(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
