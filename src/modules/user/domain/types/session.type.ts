import { TokenValueObject } from '../value-objects/token.object';

export type SessionType = {
  id: string;
  deviceId: string;
  userId?: string;
  IP: string;
  accessToken: TokenValueObject;
  refreshToken?: TokenValueObject;
};
