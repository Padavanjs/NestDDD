import { HydratedDocument, LeanDocument } from 'mongoose';
import { User } from '../schemas/user.schema';

export type UserDocument = HydratedDocument<User>;
export type UserLeanDocument = LeanDocument<UserDocument>;
