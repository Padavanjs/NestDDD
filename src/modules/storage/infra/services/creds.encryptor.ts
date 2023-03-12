import {
  createCipheriv,
  randomBytes,
  scryptSync,
  createDecipheriv,
} from 'crypto';
import { IEncryptor } from '../../domain/interfaces/encryptor.interface';
import { PasswordExtractor } from './password.extractor';

export class CredsEncryptor implements IEncryptor {
  constructor(private passwordExtractor: PasswordExtractor) {}
  basicEncode(text: string): string {
    const iv = randomBytes(16);
    const passwordForEncode = this.passwordExtractor.getBasicPassword();
    const key = scryptSync(passwordForEncode, 'salt', 32);
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    let cipherText = cipher.update(text, 'utf8', 'hex');
    cipherText += cipher.final('hex');
    return cipherText.toString();
  }

  encode(text: string, password: string): string {
    const iv = randomBytes(16);
    const key = scryptSync(password, 'salt', 32);
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    let cipherText = cipher.update(text, 'utf8', 'hex');
    cipherText += cipher.final('hex');
    return cipherText.toString();
  }

  decode(text: string, password: string): string {
    const iv = randomBytes(16);
    const key = scryptSync(password, 'salt', 32) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted.toString();
  }
}
