import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { PasswordValueObject } from '../../domain/value-objects/password.object';
import { PasswordEncryptor } from '../services/password.encryptor';
import { UserLeanDocument } from '../types/user.types';

@Injectable()
export class UserHydrator {
  constructor(private passwordEncryptor: PasswordEncryptor) {}

  toDomain(user: UserLeanDocument): UserEntity {
    const password = new PasswordValueObject(
      user.password,
      this.passwordEncryptor,
    );

    return new UserEntity({
      id: user._id.toString(),
      username: user.username,
      password,
    });
  }
}
