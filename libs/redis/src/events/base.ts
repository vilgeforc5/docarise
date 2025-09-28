import { IsOptional, IsString } from 'class-validator';

export class BaseEventsDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  authToken: string;
}
