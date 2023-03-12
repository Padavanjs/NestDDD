import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenGenerator } from '../../domain/interfaces/token-generator.interface';

@Injectable()
export class TokenService implements ITokenGenerator {
  constructor(private jwtService: JwtService) {}

  sign(payload: Record<string, unknown>): string {
    const token = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
    return token;
  }

  decode<T extends Record<string, unknown>>(token: string): T {
    return this.jwtService.decode(token) as T;
  }

  verify(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
