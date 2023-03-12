import { IEncryptor } from '../interfaces/encryptor.interface';

export class CredsValueObject {
  constructor(private text: string, private encryptor: IEncryptor) {}

  static encode(text: string, encryptor: IEncryptor): CredsValueObject {
    const encyptedText = encryptor.basicEncode(text);
    return new CredsValueObject(encyptedText, encryptor);
  }

  get() {
    return this.text;
  }

  // encrypt(
  //   text: string,
  //   password: string,
  //   encryptor: IEncryptor,
  // ): CredsValueObject {
  //   const encyptedText = encryptor.encode(text, password);
  //   return new CredsValueObject(encyptedText, encryptor);
  // } нужно ли?

  decrypt(password: string): string {
    return this.encryptor.decode(this.text, password);
  }

  recrypt(currentPassword: string, newPassword: string) {
    const rawText = this.decrypt(currentPassword);
    this.text = this.encryptor.encode(rawText, newPassword);

    return this;
  }
}
