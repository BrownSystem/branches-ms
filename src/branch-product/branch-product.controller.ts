import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BranchProductService } from './branch-product.service';
import { CreateBranchProductDto } from './dto/create-branch-product.dto';
import { ManipulateStockDto } from './dto/manipulate-stock.dto';
import { PaginationDto } from './dto/pagination.dto';
import {
  UpdateBranchProductDto,
  UpdateBranchProductToRegister,
} from './dto/update-branch-product.dto';
import { find } from 'rxjs';
import { FindProductBranchIdDto } from './dto/find-product-branch-id.dto';

@Controller()
export class BranchProductController {
  constructor(private readonly branchProductService: BranchProductService) {}

  @MessagePattern({ cmd: 'emit_create_branch_product' })
  create(@Payload() createBranchProductDto: CreateBranchProductDto) {
    return this.branchProductService.create(createBranchProductDto);
  }

  @MessagePattern({ cmd: 'find_one_product_branch_id' })
  findOneProductBranchId(
    @Payload() findProductBranchIdDto: FindProductBranchIdDto,
  ) {
    return this.branchProductService.findOneProductBranchId(
      findProductBranchIdDto,
    );
  }

  @MessagePattern({ cmd: 'find_all_stock_branch' })
  productsStockAtBranchId(@Payload() paginationDto: PaginationDto) {
    return this.branchProductService.productsStockAtBranchId(paginationDto);
  }

  @MessagePattern({ cmd: 'find_out_of_stock_branch' })
  littleStock(@Payload() paginationDto: PaginationDto) {
    return this.branchProductService.productsOutOfStockAtBranchId(
      paginationDto,
    );
  }

  @MessagePattern({ cmd: 'generated_full_inventary_in_excel' })
  generatedFullInventaryInExcel() {
    return this.branchProductService.generatedFullInventaryInExcel();
  }

  @MessagePattern({ cmd: 'de_registration_by_branch' })
  searchByProductIdDeRegistration(
    @Payload() updateBranchProductDto: UpdateBranchProductToRegister,
  ) {
    return this.branchProductService.unregisterBranchProduct(
      updateBranchProductDto,
    );
  }

  @MessagePattern({ cmd: 'to_register_branch_product' })
  searchByProductIdToRegister(
    @Payload() updateBranchProductDto: UpdateBranchProductToRegister,
  ) {
    return this.branchProductService.toRegister(updateBranchProductDto);
  }

  @MessagePattern({ cmd: 'increase_branch_product_stock' })
  increaseStock(@Payload() manipulateStockDto: ManipulateStockDto) {
    return this.branchProductService.increaseStock(manipulateStockDto);
  }

  @MessagePattern({ cmd: 'descrease_branch_product_stock' })
  decreaseStock(@Payload() manipulateStockDto: ManipulateStockDto) {
    return this.branchProductService.decreaseStock(manipulateStockDto);
  }
}
