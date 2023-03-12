import { SessionType } from '../types/session.type';
import { TokenValueObject } from '../value-objects/token.object';

export class SessionEntity {
  private id: string;
  private userId: string;
  // @TODO: IP VALUE OBJECT
  private IP: string;
  private deviceId: string;
  private accessToken: TokenValueObject;
  private refreshToken: TokenValueObject;

  constructor(payload: SessionType) {
    this.id = payload.id;
    this.IP = payload.IP;
    this.deviceId = payload.deviceId;
    this.accessToken = payload.accessToken;

    if (payload.refreshToken) {
      this.refreshToken = payload.refreshToken;
    }

    this.userId = payload.userId;
  }

  setUserId(userId: string): SessionEntity {
    this.userId = userId;

    return this;
  }

  getId() {
    return this.id;
  }

  getIp() {
    return this.IP;
  }

  getUserId(): string {
    return this.userId;
  }

  getDeviceId(): string {
    return this.deviceId;
  }

  getAccessToken(): string {
    return this.accessToken.get();
  }

  setRefreshToken(token: TokenValueObject): SessionEntity {
    this.refreshToken = token;

    return this;
  }

  setIpAddress(IP: string): SessionEntity {
    this.IP = IP;

    return this;
  }

  verifyIpAddress(IP: string): boolean {
    return this.IP === IP;
  }

  verifyDeviceId(deviceId: string): boolean {
    return this.deviceId === deviceId;
  }

  verifyAccessToken(): boolean {
    return this.accessToken.verify();
  }

  verifyRefreshToken(): boolean {
    return this.refreshToken.verify();
  }

  refresh(): SessionEntity {
    this.accessToken.refresh();
    this.refreshToken.refresh();

    return this;
  }

  get() {
    return {
      id: this.id,
      IP: this.IP,
      deviceId: this.deviceId,
      userId: this.userId,
      accessToken: this.accessToken.get(),
      refreshToken: this.refreshToken.get(),
    };
  }

  getTokens() {
    return {
      accessToken: this.accessToken.get(),
      refreshToken: this.refreshToken.get(),
    };
  }
}
