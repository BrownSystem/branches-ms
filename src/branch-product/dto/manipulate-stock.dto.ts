import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ManipulateStockDto {
  @IsString()
  id: string;

  @IsPositive()
  @IsNumber()
  stock: number;
}
