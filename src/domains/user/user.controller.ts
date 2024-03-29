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
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDtoClass, UpdatePasswordDtoClass } from './user.dto';
import { User } from './user.entity';

@Controller('user')
// Hide response fields marked with @Exclude
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDtoClass): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDtoClass,
  ) {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
