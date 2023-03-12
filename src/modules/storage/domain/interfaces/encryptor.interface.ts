export interface IEncryptor {
  basicEncode(text: string): string;
  encode(text: string, password: string): string;
  decode(text: string, password: string): string;
}
