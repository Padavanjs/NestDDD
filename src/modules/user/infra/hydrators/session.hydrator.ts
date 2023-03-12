import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SessionEntity } from '../../domain/entities/session.entity';
import { TokenValueObject } from '../../domain/value-objects/token.object';
import { TokenService } from '../services/token.generator';
import { SessionLeanDocument } from '../types/session.types';

@Injectable()
export class SessionHydrator {
  constructor(private tokenGenerator: TokenService) {}

  toDomain(session: SessionLeanDocument): SessionEntity {
    return new SessionEntity({
      id: session._id.toString(),
      IP: session.IP,
      deviceId: session.deviceId,
      accessToken: new TokenValueObject(
        session.accessToken,
        this.tokenGenerator,
      ),
      refreshToken: new TokenValueObject(
        session.refreshToken,
        this.tokenGenerator,
      ),
      userId: session.userId.toString(),
    });
  }

  toDocument(session: SessionEntity): SessionLeanDocument {
    const payload = session.get();
    return {
      ...payload,
      _id: new Types.ObjectId(payload.id),
      userId: new Types.ObjectId(payload.userId),
    };
  }
}
