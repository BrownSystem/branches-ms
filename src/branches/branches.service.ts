import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class BranchesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(BranchesService.name);

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
    super();
  }

  onModuleInit() {
    this.logger.log('BranchesService module initialized');
    void this.$connect();
  }

  async create(createBranchDto: CreateBranchDto) {
    const { name, location } = createBranchDto;

    try {
      const newBranch = await this.eBranch.create({
        data: { name, location: location || 'no tiene ubicación' },
      });

      let page = 1;
      const pageSize = 100;
      let hasMore = true;

      while (hasMore) {
        const response = await firstValueFrom(
          this.client.send(
            { cmd: 'find_product_for_branch' },
            { page, pageSize },
          ),
        );

        const products = response.data;
        if (!products.length) break;

        const createManyBranchProducts = products.map((product) => ({
          productId: product.id,
          branchId: newBranch.id,
          stock: 0,
        }));

        await this.eBranchProduct.createMany({
          data: createManyBranchProducts,
          skipDuplicates: true,
        });

        if (products.length < pageSize) hasMore = false;
        else page++;
      }

      return newBranch;
    } catch (error) {
      console.error('Error creating branch:', error);
      throw new Error(
        'Error creating branch: ' + (error.message || 'unknown error'),
      );
    }
  }

  async findAll() {
    return await this.eBranch.findMany({
      where: {
        available: true,
      },
    });
  }

  async findOneBranchById(id: string) {
    try {
      const branch = await this.eBranch.findFirst({
        where: {
          id,
          available: true,
        },
      });

      if (!branch) {
        return {
          message: '[FIND_ONE_BRANCH] not existing branch',
          status: HttpStatus.NOT_FOUND,
        };
      }

      return branch;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(id: string) {
    const branch = await this.eBranch.findFirst({
      where: { id, available: true },
      select: {
        id: true,
        name: true,
        location: true,
        branchProducts: {
          select: {
            productId: true,
            stock: true,
          },
        },
      },
    });

    if (!branch) {
      throw new RpcException({
        message: `Branch with id ${id} not found`,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const productIds = branch.branchProducts.map(
      (branchProduct) => branchProduct.productId,
    );

    if (productIds.length) {
      const products: any[] = await firstValueFrom(
        this.client.send({ cmd: 'validate_products' }, productIds),
      );

      return {
        ...branch,
        branchProducts: branch.branchProducts.map((branchProduct) => ({
          ...branchProduct,
          description:
            products.find((product) => product.id === branchProduct.productId)
              ?.description || 'No description available',
        })),
      };
    }

    // Si no hay productos, devolver branch sin descripciones
    return {
      ...branch,
      branchProducts: [],
    };
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    const branchId = await this.eBranch.findUnique({
      where: { id },
    });
    if (!branchId) {
      return { message: 'Branch not found', statusCode: HttpStatus.NOT_FOUND };
    }
    const { name, location, available } = updateBranchDto;

    const updatedBranch = await this.eBranch.update({
      where: { id },
      data: {
        name,
        location: location || 'no tiene ubicación',
        available,
      },
    });

    return updatedBranch;
  }
}
