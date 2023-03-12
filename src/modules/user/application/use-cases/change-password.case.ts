import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UseCase } from 'src/lib/use-cases/types/use-case.type';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';
import { ChengePasswordDto } from '../dto/chengePassword.dto';
import { SessionRepository } from '../../infra/repositories/session.repository';

@Injectable()
export class ChangePasswordUseCase implements UseCase {
  usecase = 'changePassword';
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private sessionRepository: SessionRepository,
  ) {}
  async execute(id: string, data: ChengePasswordDto): Promise<void> {
    await this.userService.changePassword(id, data);
    await this.sessionRepository.closeAllSessionByUserId(id);
  }
}
