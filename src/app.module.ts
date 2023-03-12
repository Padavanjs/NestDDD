import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageModule } from './modules/storage/storage.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('DB_PROTOCOL')}://${configService.get<string>(
          'DB_USER',
        )}:${configService.get<string>('DB_PASSWORD')}@${configService.get(
          'DB_HOST',
        )}/${configService.get('DB_NAME')}?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
