import { IsPositive, IsString } from 'class-validator';

export class FindProductBranchIdDto {
  @IsString()
  productId: string;

  @IsString()
  branchId: string;
}
