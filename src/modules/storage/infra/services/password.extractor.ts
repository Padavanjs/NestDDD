import { Injectable } from '@nestjs/common';
import { IPassowrdExtractor } from '../../domain/interfaces/password-extractor.interface';

@Injectable()
export class PasswordExtractor {
  getBasicPassword(): string {
    const basicPassword = process.env.ENCRYPT_PASSWORD_CREDS;
    return basicPassword;
  }
}
