import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/lib/use-cases/types/use-case.type';
import { StoreService } from '../services/store.service';

@Injectable()
export class ShareStoreUseCase implements UseCase {
  usecase = 'shareStore';
  constructor(private storeService: StoreService) {}

  async execute(id: string, password: string) {
    return this.storeService.share(id, password);
  }
}
