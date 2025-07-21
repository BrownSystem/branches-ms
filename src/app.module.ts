import { Module } from '@nestjs/common';
import { BranchesModule } from './branches/branches.module';
import { BranchProductModule } from './branch-product/branch-product.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [BranchesModule, BranchProductModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
