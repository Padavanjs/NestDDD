import { ITokenGenerator } from '../interfaces/token-generator.interface';
import { TokenSignOptions } from '../types/token.types';

export class TokenValueObject {
  private options: TokenSignOptions;

  constructor(private token: string, private tokenGenerator: ITokenGenerator) {}

  static encode(
    payload: Record<string, unknown>,
    options: TokenSignOptions,
    tokenGenerator: ITokenGenerator,
  ): TokenValueObject {
    const token = tokenGenerator.sign(payload, options);

    const tokenObject = new TokenValueObject(token, tokenGenerator);
    tokenObject.setOptions(options);

    return tokenObject;
  }

  setOptions(options: TokenSignOptions) {
    this.options = options;
    return this;
  }

  refresh(): TokenValueObject {
    const { iat, exp, ...payload } = this.decode();
    const newToken = this.tokenGenerator.sign(payload, this.options);

    this.token = newToken;

    return this;
  }

  get(): string {
    return this.token;
  }

  decode<T extends Record<string, unknown>>(): T {
    return this.tokenGenerator.decode(this.token);
  }

  verify(): boolean {
    return this.tokenGenerator.verify(this.token);
  }
}
