import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class TaskDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}