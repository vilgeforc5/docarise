import { IsOptional, IsString } from 'class-validator';

export class BaseEventsDto {
  @IsOptional()
  @IsString()
  operationId: string;

  @IsString()
  authToken: string;
}
