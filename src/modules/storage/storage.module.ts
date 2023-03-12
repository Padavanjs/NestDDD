import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { createUseCasesProvider } from 'src/lib/use-cases/createUseCasesProvider';
import { UserModule } from '../user/user.module';
import { StoreService } from './application/services/store.service';
import { StorageController } from './application/storage.controller';
import { StoreModuleUseCases } from './application/use-cases';
import { StoreHydrator } from './infra/hydrators/store.hydrator';
import { StoreRepository } from './infra/repositories/store.repository';
import { StoreModel } from './infra/schemas/storage.shema';
import { CredsEncryptor } from './infra/services/creds.encryptor';
import { PasswordExtractor } from './infra/services/password.extractor';

@Module({
  imports: [MongooseModule.forFeature([StoreModel]), UserModule],
  controllers: [StorageController],
  providers: [
    PasswordExtractor,
    StoreHydrator,
    StoreRepository,
    CredsEncryptor,
    StoreService,
    ...createUseCasesProvider('STORE_USECASES', StoreModuleUseCases),
  ],
})
export class StorageModule {}
