import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBranchProductDto {
  @IsString()
  branchId: string;

  @IsString()
  productId: string;

  @IsNumber()
  stock: number;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}
