import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './application/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infra/repositories/user.repository';
import { SessionRepository } from './infra/repositories/session.repository';
import { UserModel } from './infra/schemas/user.schema';
import { SessionModel } from './infra/schemas/session.schema';
import { TokenService } from './infra/services/token.generator';
import { PasswordEncryptor } from './infra/services/password.encryptor';
import { UserHydrator } from './infra/hydrators/user.hydrator';
import { UserModuleUseCases } from './application/use-cases';
import { SessionService } from './application/services/session.service';
import { SessionHydrator } from './infra/hydrators/session.hydrator';
import { createUseCasesProvider } from 'src/lib/use-cases/createUseCasesProvider';
import { AuthGuard } from './application/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([UserModel, SessionModel]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.register(),
  ],
  controllers: [UserController],
  providers: [
    AuthGuard,
    UserRepository,
    UserService,
    UserHydrator,
    SessionHydrator,
    SessionService,
    SessionRepository,
    TokenService,
    PasswordEncryptor,
    ...createUseCasesProvider('USER_USECASES', UserModuleUseCases),
  ],
  exports: [
    CacheModule,
    AuthGuard,
    JwtModule,
    SessionService,
    SessionRepository,
    TokenService,
  ],
})
export class UserModule {}
