import { Request } from 'express';
import { SessionEntity } from '../../domain/entities/session.entity';

export interface AuthorizedRequest extends Request {
  session: SessionEntity;
}
