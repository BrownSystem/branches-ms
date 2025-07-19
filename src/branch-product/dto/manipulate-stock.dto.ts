import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ManipulateStockDto {
  @IsString()
  productId: string;

  @IsString()
  branchId: string;

  @IsPositive()
  @IsNumber()
  stock: number;
}
