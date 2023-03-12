import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from 'src/lib/use-cases/types/use-case.type';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Injectable()
export class RegistrationUseCase implements UseCase {
  usecase = 'register';

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  async execute(ip: string, deviceID: string, data: any) {
    if (!deviceID) {
      throw new BadRequestException();
    }
    const user = await this.userService.create(data.username, data.password);
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
    const session = await this.sessionService.create(
      deviceID,
      user.getId(),
      ip,
      payloadAccess,
      payloadRefresh,
    );
    return {
      tokens: session.getTokens(),
      sessionId: session.getId(),
    };
  }
}
