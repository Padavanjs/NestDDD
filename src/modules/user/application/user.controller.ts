import {
  Body,
  Controller,
  Inject,
  Ip,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { DeviceId } from './decorators/deviceId.decorator';
import { ChengePasswordDto } from './dto/chengePassword.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { AuthUseCases } from './types/use-cases.types';
import { Response } from 'express';
import { SessionEntity } from '../domain/entities/session.entity';

@Controller('auth')
export class UserController {
  constructor(@Inject('USER_USECASES') private useCases: AuthUseCases) {}

  @Post('register')
  async register(
    @Ip() ip: string,
    @DeviceId() deviceId: string,
    @Body() data: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const responsePayload = await this.useCases.register.execute(
      ip,
      deviceId,
      data,
    );

    response.cookie('sessionId', responsePayload.sessionId);

    return responsePayload.tokens;
  }

  @Post('login')
  async login(
    @Ip() ip: string,
    @DeviceId() deviceId: string,
    @Body() data: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const responsePayload = await this.useCases.login.execute(
      ip,
      deviceId,
      data,
    );

    response.cookie('sessionId', responsePayload.sessionId);

    return responsePayload.tokens;
  }

  @Post('/change-password')
  @UseGuards(AuthGuard)
  async changePassword(
    @Session() session: SessionEntity,
    @Body() data: ChengePasswordDto,
  ) {
    return this.useCases.changePassword.execute(session.getUserId(), data);
  }
}
