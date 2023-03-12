import { CreateProtectedStoreUseCase } from './create.protectedStore.case';
import { CreateStoreUseCase } from './create.store.case';
import { RecryptUseCase } from './recrypt.case';
import { ShareStoreUseCase } from './share.case';

export const StoreModuleUseCases = [
  CreateStoreUseCase,
  CreateProtectedStoreUseCase,
  RecryptUseCase,
  ShareStoreUseCase,
];
