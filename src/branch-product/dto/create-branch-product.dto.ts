import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBranchProductDto {
  @IsString()
  @IsOptional()
  branchId?: string;

  @IsString()
  productId: string;

  @IsString()
  @IsOptional()
  colorCode: string;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}
