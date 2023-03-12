import { IPasswordEncryptor } from '../interfaces/password-ecryptor.interface';

export class PasswordValueObject {
  constructor(
    private password: string,
    private encryptor: IPasswordEncryptor,
  ) {}

  static hashPassword(
    password: string,
    encryptor: IPasswordEncryptor,
  ): PasswordValueObject {
    const hashedPassword = encryptor.encode(password);
    return new PasswordValueObject(hashedPassword, encryptor);
  }

  get() {
    return this.password;
  }

  compare(rawPassword: string): boolean {
    return this.encryptor.compare(this.password, rawPassword);
  }
}
