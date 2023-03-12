import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/user/application/guards/auth.guard';
import { SessionEntity } from 'src/modules/user/domain/entities/session.entity';
import { CreateCredsDto } from './dto/createCreds.Dto';
import { StoreUseCases } from './types/use-case.types';

@Controller('storage')
export class StorageController {
  constructor(@Inject('STORE_USECASES') private useCase: StoreUseCases) {}

  @Post('/create-store')
  @UseGuards(AuthGuard)
  async create(
    @Session() session: SessionEntity,
    @Body() data: CreateCredsDto,
  ) {
    return this.useCase.create.execute(
      data.title,
      data.text,
      session.getUserId(),
    );
  }

  @Post('/create-protect-store')
  @UseGuards(AuthGuard)
  async createProtectStore(
    @Session() session: SessionEntity,
    @Body() data: CreateCredsDto,
    password: string,
  ) {
    return this.useCase.createProtectedStore.execute(
      data.title,
      data.text,
      session.getUserId(),
      password,
    );
  }

  @Post('/:id/recrypt')
  @UseGuards(AuthGuard)
  async recrypt(@Param('id') id: string, password: string) {
    return this.useCase.recrypt.execute(id, password);
  }
}
