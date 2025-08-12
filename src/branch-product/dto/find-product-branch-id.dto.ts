import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class FindProductBranchIdDto {
  @IsString()
  productId: string;

  @IsString()
  branchId: string;

  @IsOptional()
  @IsBoolean()
  filterbystock: boolean;
}
