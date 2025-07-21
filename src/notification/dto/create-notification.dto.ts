import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  branchId: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  type?: string;
}
