import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SessionModel } from '../schemas/session.schema';
import { SessionDocument } from '../types/session.types';
import { SessionEntity } from '../../domain/entities/session.entity';
import { SessionHydrator } from '../hydrators/session.hydrator';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectModel(SessionModel.name)
    private sessionModel: Model<SessionDocument>,
    private sessionHydrator: SessionHydrator,
  ) {}

  async create(session: SessionEntity): Promise<SessionEntity> {
    const payload = this.sessionHydrator.toDocument(session);
    const sessionDoc = new this.sessionModel(payload);
    await sessionDoc.save();

    return session;
  }

  async findByDeviceAndUserId(
    deviceId: string,
    userId: string,
  ): Promise<SessionEntity> {
    const session = await this.sessionModel.findOne({
      deviceId,
      userId: new Types.ObjectId(userId),
    });
    if (!session) {
      return null;
    }
    return this.sessionHydrator.toDomain(session.toJSON());
  }

  async findById(id: string): Promise<SessionEntity> {
    const session = await this.sessionModel
      .findById(new Types.ObjectId(id))
      .exec();

    return this.sessionHydrator.toDomain(session.toJSON());
  }

  async save(session: SessionEntity): Promise<SessionEntity> {
    const payload = this.sessionHydrator.toDocument(session);

    await this.sessionModel.updateOne(
      {
        _id: new Types.ObjectId(payload.id),
      },
      {
        $set: payload,
      },
    );

    return session;
  }

  async closeAllSessionByUserId(userId: string): Promise<void> {
    await this.sessionModel.deleteMany({
      userId: new Types.ObjectId(userId),
    });
  }
}
