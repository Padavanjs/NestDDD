import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/lib/use-cases/types/use-case.type';
import { SessionRepository } from '../../infra/repositories/session.repository';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Injectable()
export class LoginUseCase implements UseCase {
  usecase = 'login';

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(ip: string, deviceId: string, data: any) {
    const user = await this.userService.checkPasswordPolicy(
      data.username,
      data.password,
    );

    const session = await this.sessionRepository.findByDeviceAndUserId(
      deviceId,
      user.getId(),
    );

    if (session) {
      session.refresh();
      await this.sessionRepository.save(session);

      return {
        tokens: session.getTokens(),
        sessionId: session.getId(),
      };
    }

    const payloadAccess = {
      userId: user.getId(),
      username: user.getUsername(),
      thisAccess: 'this is Access',
    };
    const payloadRefresh = {
      userId: user.getId(),
      username: user.getUsername(),
      thisRefresh: 'this is Refresh',
    };
    const newSession = await this.sessionService.create(
      deviceId,
      user.getId(),
      ip,
      payloadAccess,
      payloadRefresh,
    );
    return {
      tokens: newSession.getTokens(),
      sessionId: newSession.getId(),
    };
  }
}
