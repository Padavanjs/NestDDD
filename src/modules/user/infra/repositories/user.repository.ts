import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserHydrator } from '../hydrators/user.hydrator';
import { User } from '../schemas/user.schema';
import { UserDocument } from '../types/user.types';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userHydrator: UserHydrator,
  ) {}

  async create(data: UserEntity): Promise<UserEntity> {
    const userDoc = new this.userModel(data.get());

    await userDoc.save();

    return this.userHydrator.toDomain(userDoc);
  }

  async save(data: UserEntity): Promise<UserEntity> {
    const payload = data.get();
    await this.userModel.updateOne(
      {
        _id: new Types.ObjectId(payload.id),
      },
      {
        $set: payload,
      },
    );

    return data;
  }

  async findById(id: string): Promise<UserEntity> {
    const userDoc = await this.userModel
      .findById(new Types.ObjectId(id))
      .exec();

    return this.userHydrator.toDomain(userDoc.toJSON());
  }

  async findByUsername(introducedUsername: string): Promise<UserEntity> {
    const userDoc = await this.userModel
      .findOne({
        username: introducedUsername,
      })
      .exec();
    if (!userDoc) {
      throw new NotFoundException('User not found');
    }
    return this.userHydrator.toDomain(userDoc.toJSON());
  }
}
