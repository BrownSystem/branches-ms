import { IsOptional, IsString } from 'class-validator';

export class QueryNotificationDto {
  @IsString()
  @IsOptional()
  branchId?: string;
  @IsString()
  @IsOptional()
  includeDeleted?: boolean;
  @IsString()
  @IsOptional()
  onlyUnread?: boolean;
}
