import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrganizationDto } from './organization.dto';
import { PermissionDto } from './permission.dto';

export class TaskDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @ValidateNested()
  @Type(() => OrganizationDto)
  org: OrganizationDto;

  @IsNumber()
  adminId: number;

  @IsNumber()
  ownerId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  viewerIds?: number[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  deleteDate?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}