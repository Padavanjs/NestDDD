import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Session {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  userId: Types.ObjectId;

  @Prop({ type: String })
  IP: string;

  @Prop({ type: String })
  deviceId: string;

  @Prop({ type: String })
  accessToken: string;

  @Prop({ type: String })
  refreshToken: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

export const SessionModel = {
  name: Session.name,
  schema: SessionSchema,
};
