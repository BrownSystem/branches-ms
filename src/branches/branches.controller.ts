import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller()
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @MessagePattern({ cmd: 'create_branch' })
  create(@Payload() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @MessagePattern({ cmd: 'find_all_branches' })
  findAll() {
    return this.branchesService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_branch' })
  findOne(@Payload() payload: { id: string }) {
    return this.branchesService.findOne(payload.id);
  }

  @MessagePattern({ cmd: 'find_one_branch_by_id' })
  findOneById(@Payload() payload: { id: string }) {
    return this.branchesService.findOneBranchById(payload.id);
  }

  @MessagePattern({ cmd: 'find_one_branch_by_name' })
  findOneByName(@Payload() payload: { name: string }) {
    return this.branchesService.findOneByName(payload.name);
  }

  @MessagePattern({ cmd: 'update_branch' })
  update(@Payload() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(updateBranchDto.id, updateBranchDto);
  }
}
