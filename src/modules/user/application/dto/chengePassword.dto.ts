import { IsString } from 'class-validator';

export class ChengePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
