import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/lib/use-cases/types/use-case.type';
import { StoreService } from '../services/store.service';

@Injectable()
export class CreateProtectedStoreUseCase implements UseCase {
  usecase = 'createStore';
  constructor(private storeService: StoreService) {}
  async execute(title: string, text: string, userId: string, password: string) {
    return this.storeService.createProtectedStore(
      title,
      text,
      userId,
      password,
    );
  }
}
