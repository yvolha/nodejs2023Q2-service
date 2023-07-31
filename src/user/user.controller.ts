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
import { IRoutes } from '../routes';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ERR_MSGS } from 'src/utils/messages';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Controller(IRoutes.user)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    const users = this.userService.getAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.getOne(id);

    if (user) {
      return new UserEntity(user);
    } else {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('User', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.createOne(createUserDto);
    const { login, password } = createUserDto;

    if (!login || !password) {
      throw new HttpException(
        ERR_MSGS.INCORRECT_DATA(),
        HttpStatus.BAD_REQUEST,
      );
    }

    return new UserEntity(user);
  }

  @Put(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = this.userService.getOne(id);
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

    const updatedUser = this.userService.updateOne(id, updatePasswordDto);

    if (!updatedUser) {
      throw new HttpException(ERR_MSGS.WRONG_PASS(), HttpStatus.FORBIDDEN);
    }

    return new UserEntity(updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const user = this.userService.getOne(id);

    if (!user) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('User', id),
        HttpStatus.NOT_FOUND,
      );
    }

    this.userService.deleteOne(id);
  }
}
