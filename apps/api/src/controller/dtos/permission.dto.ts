import { IsString, IsNumber } from 'class-validator';

export class PermissionDto {
  @IsNumber()
  id: number;

  @IsString()
  action: string;
}