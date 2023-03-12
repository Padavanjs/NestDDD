import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { StoreEntity } from '../../domain/entities/store.entity';
import { CredsValueObject } from '../../domain/value-object/creds.object';
import { StoreRepository } from '../../infra/repositories/store.repository';
import { CredsEncryptor } from '../../infra/services/creds.encryptor';
import { PasswordExtractor } from '../../infra/services/password.extractor';

@Injectable()
export class StoreService {
  constructor(
    private storeRepository: StoreRepository,
    private credsEncryptor: CredsEncryptor,
    private passwordExtractor: PasswordExtractor,
  ) {}

  async createConventionalStore(title: string, text: string, userId: string) {
    const id = new Types.ObjectId().toString();
    const creds = new CredsValueObject(text, this.credsEncryptor);
    const store = new StoreEntity(id, title, creds, userId, false);
    return this.storeRepository.create(store);
  }

  async createProtectedStore(
    title: string,
    text: string,
    userId: string,
    password: string,
  ) {
    const id = new Types.ObjectId().toString();
    const creds = new CredsValueObject(text, this.credsEncryptor);
    const store = new StoreEntity(id, title, creds, userId, false);
    const basicPassword = this.passwordExtractor.getBasicPassword();
    const protectedStore = store.protect(basicPassword, password);
    return this.storeRepository.create(protectedStore);
  }

  async recrypt(id: string, password: string) {
    const store = await this.storeRepository.findById(id);
    const basicPassword = this.passwordExtractor.getBasicPassword();
    if (!store.getIsProtected()) {
      const protectedStore = store.protect(basicPassword, password);
      return this.storeRepository.save(protectedStore);
    }
    const commonStore = store.unProtect(password, basicPassword);
    return this.storeRepository.save(commonStore);
  }

  async share(id: string, password: string) {
    const store = await this.storeRepository.findById(id);
    if (!store.getIsProtected()) {
      const basicPassword = this.passwordExtractor.getBasicPassword();
      const sharedStore = store.decriptCreds(basicPassword);
      return sharedStore;
    }
    const sharedStore = store.decriptCreds(password);
    return sharedStore;
  }
}
