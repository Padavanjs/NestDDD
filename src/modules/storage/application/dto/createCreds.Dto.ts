import { IsString } from 'class-validator';

export class CreateCredsDto {
  @IsString()
  title: string;

  @IsString()
  text: string;
}
