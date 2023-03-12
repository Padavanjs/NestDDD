export interface IPasswordEncryptor {
  encode(passowrd: string): string;
  compare(hashPassword: string, password: string): boolean;
}
