import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { SessionEntity } from '../../domain/entities/session.entity';
import { TokenValueObject } from '../../domain/value-objects/token.object';
import { SessionRepository } from '../../infra/repositories/session.repository';
import { TokenService } from '../../infra/services/token.generator';
import { Cache } from 'cache-manager';

@Injectable()
export class SessionService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private tokenService: TokenService,
    private sessionRepository: SessionRepository,
  ) {}

  create(
    deviceId: string,
    userId: string,
    IP: string,
    accessTokenPayload: Record<string, unknown>,
    refreshTokenPayload: Record<string, unknown>,
  ) {
    const sessionId = new Types.ObjectId().toString();
    const accessToken = TokenValueObject.encode(
      accessTokenPayload,
      { expiresAt: '10m' },
      this.tokenService,
    );

    const refreshToken = TokenValueObject.encode(
      refreshTokenPayload,
      { expiresAt: '1d' },
      this.tokenService,
    );

    const session = new SessionEntity({
      id: sessionId,
      userId,
      deviceId: deviceId,
      IP: IP,
      accessToken,
      refreshToken,
    });

    return this.sessionRepository.create(session);
  }

  async verify(
    data: {
      id: string;
      deviceId: string;
      accessToken: TokenValueObject;
      IP: string;
    },
    session: SessionEntity,
  ) {
    if (!data.accessToken.verify()) {
      throw new UnauthorizedException('Access token verification error');
    }

    if (session.getAccessToken() !== data.accessToken.get()) {
      throw new UnauthorizedException('Wrong Access token');
    }

    if (!session.verifyDeviceId(data.deviceId)) {
      throw new UnauthorizedException('Wrong device');
    }

    if (!session.verifyIpAddress(data.IP)) {
      session.setIpAddress(data.IP);
      await this.sessionRepository.save(session);
    }

    await this.cacheManager.set(
      session.getId(),
      {
        userId: session.getUserId(),
        deviceId: session.getDeviceId(),
        IP: session.getIp(),
        accessToken: session.getAccessToken(),
      },
      1000 * 60 * 10,
    );

    return true;
  }
}
