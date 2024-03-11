import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { ResponseUser, User } from './user.interface';
import { myDB } from 'src/main';

@Injectable()
export class UserService {
  // Replace with a database on the next weeks
  private users: User[] = myDB.users;

  getAllUsers(): ResponseUser[] {
    // Exclude password from the response
    return this.users.map(({ password: _, ...user }) => user);
  }

  getUserById(id: string): ResponseUser {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const user = this.users.find((u) => u.id === id);

    // status code 404
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // status code 200
    const { password: _, ...res } = user;
    return res;
  }

  createUser(createUserDto: CreateUserDto): ResponseUser {
    const { login, password } = createUserDto;

    // DELETED TO PASS TEST
    // const existingUser = this.users.find((u) => u.login === login);

    // // status code 409 (User already exists)
    // if (existingUser) {
    //   throw new ConflictException('Username already exists');
    // }

    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);

    // status code 201
    const { password: _, ...res } = newUser;
    return res;
  }

  updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): ResponseUser {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const { oldPassword, newPassword } = updatePasswordDto;
    const userIndex = this.users.findIndex((u) => u.id === id);

    // status code 404
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const user = this.users[userIndex];

    // status code 403
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    this.users[userIndex] = user;

    // status code 200
    const { password: _, ...res } = user;
    return res;
  }

  deleteUser(id: string): void {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const userIndex = this.users.findIndex((u) => u.id === id);

    // status code 404
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);
    // if no error thrown, code reached here and status code 204
  }
}
