import { IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrganizationDto } from './organization.dto';
import { RoleDto } from './role.dto';

export class UserDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => OrganizationDto)
  org?: OrganizationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RoleDto)
  role?: RoleDto;
}