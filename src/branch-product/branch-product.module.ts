import { Module } from '@nestjs/common';
import { BranchProductService } from './branch-product.service';
import { BranchProductController } from './branch-product.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [BranchProductController],
  providers: [BranchProductService],
})
export class BranchProductModule {}
