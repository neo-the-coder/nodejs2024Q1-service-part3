import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { IUser, ResponseUser } from './user.interface';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    // status code 200
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<ResponseUser> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const user: null | User = await this.userRepository.findOneBy({ id });

    // status code 404
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // status code 200
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // status code 201
    const newUser = this.userRepository.create({
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return await this.userRepository.save(newUser);
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const user: null | User = await this.userRepository.findOneBy({ id });

    // status code 404
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // status code 403
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }

    // status code 200
    await this.userRepository.update(
      { id },
      { password: newPassword, updatedAt: Date.now() },
    );
    return await this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: string): Promise<void> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const user: null | User = await this.userRepository.findOneBy({ id });

    // status code 404
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // status code 204
    await this.userRepository.remove(user);
  }

  async getUserByLogin(login: string): Promise<IUser> {
    const user: null | User = await this.userRepository.findOneBy({ login });

    // status code 403
    if (!user) {
      throw new ForbiddenException('Incorrect user name');
    }

    // status code 200
    return user;
  }
}
