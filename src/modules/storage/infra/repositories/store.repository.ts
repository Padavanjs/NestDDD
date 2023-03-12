import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StoreEntity } from '../../domain/entities/store.entity';
import { StoreHydrator } from '../hydrators/store.hydrator';
import { Store } from '../schemas/storage.shema';
import { StoreDocument } from '../types/creds.types';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    private storeHydrator: StoreHydrator,
  ) {}

  async create(store: StoreEntity): Promise<StoreEntity> {
    const payload = this.storeHydrator.toDocument(store);
    const storeDoc = new this.storeModel(payload);
    await storeDoc.save();

    return store;
  }

  async save(store: StoreEntity): Promise<StoreEntity> {
    const payload = this.storeHydrator.toDocument(store);
    await this.storeModel.updateOne(
      { _id: payload.id },
      {
        $set: payload,
      },
    );
    return store;
  }

  async findById(id: string): Promise<StoreEntity> {
    const store = await this.storeModel.findById(new Types.ObjectId(id)).exec();
    return this.storeHydrator.toDomain(store.toJSON());
  }

  async findByUserId(userId: string): Promise<StoreEntity[]> {
    const findStores = await this.storeModel
      .find({
        userId: new Types.ObjectId(userId),
      })
      .exec();
    const stores = findStores.map((store) =>
      this.storeHydrator.toDomain(store.toJSON()),
    );
    return stores;
    // Как правильно вернуть???
  }

  // Скорее всего вернется массив ибо только по тайтлу поиск. Возможно лучше ещё по ид?
  async findByTitle(title: string): Promise<StoreEntity> {
    const store = await this.storeModel.findOne({ title }).exec();
    return this.storeHydrator.toDomain(store.toJSON());
  }
}
