import { CreateProtectedStoreUseCase } from '../use-cases/create.protectedStore.case';
import { CreateStoreUseCase } from '../use-cases/create.store.case';
import { RecryptUseCase } from '../use-cases/recrypt.case';
import { ShareStoreUseCase } from '../use-cases/share.case';

export interface StoreUseCases {
  create: CreateStoreUseCase;
  createProtectedStore: CreateProtectedStoreUseCase;
  recrypt: RecryptUseCase;
  share: ShareStoreUseCase;
}
