import { Module } from '@nestjs/common';
import { BranchesModule } from './branches/branches.module';
import { BranchProductModule } from './branch-product/branch-product.module';

@Module({
  imports: [BranchesModule, BranchProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
