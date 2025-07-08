import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchProductDto } from './create-branch-product.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBranchProductDto extends PartialType(
  CreateBranchProductDto,
) {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  productId: string;
}

export class UpdateBranchProductToRegister {
  @IsString()
  branchId: string;

  @IsString()
  productId: string;
}
