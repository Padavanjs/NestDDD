import { AuthType } from '../types/auth.type';
import { PasswordValueObject } from '../value-objects/password.object';

export class UserEntity {
  private id: string;
  private username: string;
  private password: PasswordValueObject;

  constructor(payload: AuthType) {
    this.id = payload.id;
    this.username = payload.username;
    this.password = payload.password;
  }

  checkPassword(rawPassword: string): boolean {
    return this.password.compare(rawPassword);
  }

  changePassword(oldPassword: string, newPassword: PasswordValueObject) {
    const passwordIsValid = this.checkPassword(oldPassword);

    if (!passwordIsValid) {
      throw new Error('Invalid password');
    }

    this.password = newPassword;

    return this;
  }

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  get() {
    return {
      username: this.username,
      password: this.password.get(),
      id: this.getId(),
    };
  }
}
