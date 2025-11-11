import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class OrganizationDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  childIds?: number[];
}