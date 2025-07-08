import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  @IsString()
  branchId: string;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  offset: number;

  constructor(partial: Partial<PaginationDto> = {}) {
    Object.assign(this, partial);
    this.limit = partial?.limit || 10;
    this.offset = partial?.offset || 1;
  }
}
