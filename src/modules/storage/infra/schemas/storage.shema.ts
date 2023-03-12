import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserModel } from './../../../user/infra/schemas/user.schema';

@Schema()
export class Store {
  @Prop()
  title: string;

  @Prop()
  creds: string;

  @Prop({
    type: Types.ObjectId,
    ref: UserModel.name,
  })
  userId: Types.ObjectId;

  @Prop()
  isProtected: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);

export const StoreModel = {
  name: Store.name,
  schema: StoreSchema,
};
