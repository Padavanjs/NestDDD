import { TokenSignOptions } from '../types/token.types';

export interface ITokenGenerator {
  sign<T extends Record<string, unknown>>(
    payload: T,
    signOptions: TokenSignOptions,
  ): string;

  decode<T extends Record<string, unknown>>(token: string): T;

  verify(token: string): boolean;
}
