import {
  ClassSerializerInterceptor,
  Controller,
  ParseUUIDPipe,
  HttpException,
  Get,
  Param,
  UseInterceptors,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IRoutes } from '../routes';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ERR_MSGS } from 'src/utils/messages';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@ApiTags(IRoutes.user)
@Controller(IRoutes.user)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const users = (await this.userService.getAll()) as unknown as UserEntity[];
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = (await this.userService.getOne(id)) as unknown as UserEntity;

    if (user) {
      return new UserEntity(user);
    } else {
      user;
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('User', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createOne(createUserDto);
    const { login, password } = createUserDto;

    if (!login || !password) {
      throw new HttpException(
        ERR_MSGS.INCORRECT_DATA(),
        HttpStatus.BAD_REQUEST,
      );
    }

    return new UserEntity(user as unknown as UserEntity);
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.getOne(id);
    const { oldPassword, newPassword } = updatePasswordDto;

    if (!oldPassword || !newPassword) {
      throw new HttpException(
        ERR_MSGS.INCORRECT_DATA(),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('User', id),
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedUser = await this.userService.updateOne(id, updatePasswordDto);

    if (!updatedUser) {
      throw new HttpException(ERR_MSGS.WRONG_PASS(), HttpStatus.FORBIDDEN);
    }

    return new UserEntity(updatedUser as unknown as UserEntity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const user = await this.userService.getOne(id);

    if (!user) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('User', id),
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userService.deleteOne(id);
  }
}
