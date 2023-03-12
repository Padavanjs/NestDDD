import { HydratedDocument, LeanDocument } from 'mongoose';
import { Store } from '../schemas/storage.shema';

export type StoreDocument = HydratedDocument<Store>;
export type StoreLeanDocument = LeanDocument<StoreDocument>;
