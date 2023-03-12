import { Injectable } from '@nestjs/common';
import { StoreEntity } from '../../domain/entities/store.entity';
import { CredsValueObject } from '../../domain/value-object/creds.object';
import { CredsEncryptor } from '../services/creds.encryptor';
import { StoreLeanDocument } from '../types/creds.types';
import { Types } from 'mongoose';

@Injectable()
export class StoreHydrator {
  constructor(private credsEncryptor: CredsEncryptor) {}

  toDomain(store: StoreLeanDocument): StoreEntity {
    const creds = new CredsValueObject(store.creds, this.credsEncryptor);
    return new StoreEntity(
      store._id.toString(),
      store.title,
      creds,
      store.userId.toString(),
      store.isProtected,
    );
  }

  toDocument(store: StoreEntity): StoreLeanDocument {
    const payload = store.get();
    return {
      ...payload,
      creds: payload.creds.toString(),
      _id: new Types.ObjectId(payload.id),
      userId: new Types.ObjectId(payload.userId),
    };
  }
}
