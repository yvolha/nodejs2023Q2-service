import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { database } from 'src/database/database';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  getAll() {
    return database.users;
  }

  getOne(id: string) {
    return database.users.find((user) => user.id === id);
  }

  createOne(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    database.users = [...database.users, newUser];

    return newUser;
  }

  updateOne(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = database.users.find((user) => user.id === id);
    const userIndex = database.users.findIndex((user) => user.id);

    if (user && user.password === updatePasswordDto.oldPassword) {
      const updatedUser = {
        ...user,
        version: user.version + 1,
        updatedAt: Date.now(),
        password: updatePasswordDto.newPassword,
      };

      database.users[userIndex] = updatedUser;

      return updatedUser;
    }

    return;
  }

  async deleteOne(id: string) {
    database.users = database.users.filter((user) => user.id !== id);

    return;
  }
}
