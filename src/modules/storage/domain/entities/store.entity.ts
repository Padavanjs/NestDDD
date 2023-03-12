import { CredsValueObject } from '../value-object/creds.object';

export class StoreEntity {
  private id: string;
  private title: string;
  private creds: CredsValueObject;
  private userId: string;
  private isProtected: boolean;

  constructor(
    id: string,
    title: string,
    creds: CredsValueObject,
    userId: string,
    isProtected: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.creds = creds;
    this.userId = userId;
    this.isProtected = isProtected;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getUserId(): string {
    return this.userId;
  }

  getIsProtected(): boolean {
    return this.isProtected;
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      creds: this.creds,
      userId: this.userId,
      isProtected: this.isProtected,
    };
  }

  protect(systemPassword: string, password: string): StoreEntity {
    if (this.isProtected) {
      throw new Error('Store is already protected');
    }

    this.creds = this.creds.recrypt(systemPassword, password);
    this.isProtected = true;
    return this;
  }

  unProtect(password: string, systemPassword: string): StoreEntity {
    if (!this.isProtected) {
      throw new Error('Store is already unprotected');
    }
    this.creds = this.creds.recrypt(password, systemPassword);
    this.isProtected = false;
    return this;
  }

  decriptCreds(password: string): string {
    return this.creds.decrypt(password);
  }
}
