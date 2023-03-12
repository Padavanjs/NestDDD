import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { TokenValueObject } from '../../domain/value-objects/token.object';
import { TokenService } from '../../infra/services/token.generator';
import { Cache } from 'cache-manager';
import { SessionEntity } from '../../domain/entities/session.entity';
import { SessionService } from '../services/session.service';
import { SessionRepository } from '../../infra/repositories/session.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private sessionService: SessionService,
    private tokenService: TokenService,
    private sessionRepository: SessionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHead = req.headers.authorization;
    const token = authHead.replace('Bearer ', '');
    const IP = req.ip;

    const { deviceId, sessionId } = req.cookies;

    if (!token || !deviceId || !sessionId) {
      throw new UnauthorizedException('You are not authorized');
    }

    const accessToken = new TokenValueObject(token, this.tokenService);
    const cachedSessionPayload = await this.cacheManager.get<any>(sessionId);

    let session: SessionEntity;

    if (cachedSessionPayload) {
      console.log('verify using cache');
      session = new SessionEntity({
        id: sessionId,
        deviceId: cachedSessionPayload.deviceId,
        userId: cachedSessionPayload.userId,
        IP: cachedSessionPayload.IP,
        accessToken: new TokenValueObject(
          cachedSessionPayload.accessToken,
          this.tokenService,
        ),
      });
    } else {
      console.log('verify using db');
      session = await this.sessionRepository.findById(sessionId);
    }

    const isValidSession = await this.sessionService.verify(
      {
        id: sessionId,
        deviceId,
        IP,
        accessToken,
      },
      session,
    );

    if (isValidSession) {
      req.session = session;
      return true;
    }
  }
}
