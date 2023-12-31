import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { getHashedPassword } from 'src/utils/getHashedPassword';
import { compare } from 'bcryptjs';

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
    const hashedPassword = await getHashedPassword(createUserDto.password);
    return await this.prisma.user.create({
      data: { login: createUserDto.login, password: hashedPassword },
    });
  }

  async updateOne(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.getOne(id);

    const isPassCorrect = await compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (user && isPassCorrect) {
      const newHashedPassword = await getHashedPassword(
        updatePasswordDto.newPassword,
      );
      return await this.prisma.user.update({
        data: {
          password: newHashedPassword,
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
