import { IsString, IsUUID, IsOptional, MaxLength, ValidateIf } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsUUID()
  organization_id: string;

  @ValidateIf((object: CreateDepartmentDto) => object.parent_id !== null)
  @IsUUID()
  parent_id: string | null;

  @IsOptional()
  @IsString()
  comment?: string;
}