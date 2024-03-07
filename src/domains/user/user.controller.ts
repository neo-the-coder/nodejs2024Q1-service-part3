import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Header,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDtoClass, UpdatePasswordDtoClass } from './user.dto';
import { ResponseUser } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAllUsers(): ResponseUser[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getUserById(@Param('id') id: string): ResponseUser {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDtoClass): ResponseUser {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDtoClass,
  ): ResponseUser {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string): void {
    return this.userService.deleteUser(id);
  }
}
