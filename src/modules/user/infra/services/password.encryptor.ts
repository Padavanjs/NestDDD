import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordEncryptor } from '../../domain/interfaces/password-ecryptor.interface';

@Injectable()
export class PasswordEncryptor implements IPasswordEncryptor {
  encode(password: string): string {
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }

  compare(hashPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}
