import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsString } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsString()
  id: string;
}
