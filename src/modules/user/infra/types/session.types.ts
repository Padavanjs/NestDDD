import { HydratedDocument, LeanDocument } from 'mongoose';
import { Session } from '../schemas/session.schema';

export type SessionDocument = HydratedDocument<Session>;
export type SessionLeanDocument = LeanDocument<SessionDocument>;
