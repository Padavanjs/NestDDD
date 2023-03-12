import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordValueObject } from '../../domain/value-objects/password.object';
import { UserRepository } from '../../infra/repositories/user.repository';
import { Types } from 'mongoose';
import { PasswordEncryptor } from '../../infra/services/password.encryptor';
import { UserEntity } from '../../domain/entities/user.entity';
import { ChengePasswordDto } from '../dto/chengePassword.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private passwordEncryptor: PasswordEncryptor,
  ) {}

  async create(username: string, rawPassword: string): Promise<UserEntity> {
    const id = new Types.ObjectId().toString();

    const password = PasswordValueObject.hashPassword(
      rawPassword,
      this.passwordEncryptor,
    );

    const user = new UserEntity({
      id,
      username,
      password,
    });

    return this.userRepository.create(user);
  }

  async checkPasswordPolicy(
    username: string,
    rawPassword: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Username or password is not corect');
    }
    const comparePassword = await user.checkPassword(rawPassword);
    if (!comparePassword) {
      throw new BadRequestException('Username or password is not corect');
    }
    return user;
  }

  async changePassword(id: string, data: ChengePasswordDto): Promise<void> {
    const user = await this.userRepository.findById(id);
    const comparePassword = await user.checkPassword(data.oldPassword);
    if (!comparePassword) {
      throw new BadRequestException('password not valid');
    }
    const password = PasswordValueObject.hashPassword(
      data.newPassword,
      this.passwordEncryptor,
    );

    user.changePassword(data.oldPassword, password);

    await this.userRepository.save(user);
  }
}
