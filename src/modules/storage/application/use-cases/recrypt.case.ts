import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/lib/use-cases/types/use-case.type';
import { StoreService } from '../services/store.service';

@Injectable()
export class RecryptUseCase implements UseCase {
  usecase = 'recryptStore';
  constructor(private storeService: StoreService) {}

  async execute(id: string, password: string) {
    return this.storeService.recrypt(id, password);
  }
}
