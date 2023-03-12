import { PasswordValueObject } from '../value-objects/password.object';

export type AuthType = {
  id: string;
  username: string;
  password: PasswordValueObject;
};
