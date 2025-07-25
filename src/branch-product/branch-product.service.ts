import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { CreateBranchProductDto } from './dto/create-branch-product.dto';
import { EBranchProduct, PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ManipulateStockDto } from './dto/manipulate-stock.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginateWithMeta } from './dto/pagination.helper';
import { UpdateBranchProductToRegister } from './dto/update-branch-product.dto';
import { FindProductBranchIdDto } from './dto/find-product-branch-id.dto';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class BranchProductService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(BranchProductService.name);

  private async _findBranchProductOrThrow(productId: string, branchId: string) {
    const branchProduct = await this.eBranchProduct.findUnique({
      where: {
        branchId_productId: {
          branchId,
          productId,
        },
      },
    });

    if (!branchProduct) {
      throw new RpcException({
        message: `[STOCK] No se encontró el registro branchProduct con id ${productId} y branchId ${branchId}`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return branchProduct;
  }

  private async _updateStock(id: string, newStock: number) {
    return this.eBranchProduct.update({
      where: { id },
      data: { stock: newStock },
    });
  }

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
    super();
  }

  onModuleInit() {
    this.logger.log('Connecting to the database..');
    void this.$connect();
  }

  async create(createDto: CreateBranchProductDto) {
    const { productId, stock = 0 } = createDto;

    const [branches, product] = await Promise.all([
      this.eBranch.findMany(),
      firstValueFrom(
        this.client.send({ cmd: 'find_one_product' }, { id: productId }),
      ),
    ]);

    if (!product) {
      return {
        message: 'Product not found',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    return Promise.all(
      branches.map((branch) =>
        this.eBranchProduct.upsert({
          where: {
            branchId_productId: {
              branchId: branch.id,
              productId,
            },
          },
          update: {},
          create: {
            branchId: branch.id,
            productId,
            stock,
          },
        }),
      ),
    );
  }

  async findOneProductBranchId(findProductBranchIdDto: FindProductBranchIdDto) {
    const { productId, branchId } = findProductBranchIdDto;

    const branchProduct = await this.eBranchProduct.findFirst({
      where: { branchId, productId, available: true },
    });

    if (!branchProduct) {
      throw new BadRequestException(
        '[BRANCH_PRODUCT_ID] Branch product not found',
      );
    }

    return branchProduct;
  }

  async productsStockAtBranchId(paginationDto: PaginationDto) {
    if (!paginationDto || !paginationDto.branchId) {
      return {
        message: 'Invalid paginationDto',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    const where = {
      branchId: paginationDto.branchId,
      available: true,
    };

    const paginated = await PaginateWithMeta<EBranchProduct>({
      model: this.eBranchProduct,
      where,
      pagination: paginationDto,
    });

    const products = await Promise.all(
      paginated.data.map(
        async (branchProduct: {
          productId: any;
          stock: any;
          price: any;
          colorCode: any;
        }) => {
          const { productId, stock, price } = branchProduct;

          const product = await firstValueFrom(
            this.client.send({ cmd: 'find_one_product' }, { id: productId }),
          );

          return {
            ...product,
            price,
            stock,
          };
        },
      ),
    );

    return {
      data: products,
      meta: paginated.meta,
    };
  }

  async productsOutOfStockAtBranchId(paginationDto: PaginationDto) {
    if (!paginationDto || !paginationDto.branchId) {
      return {
        message: 'Invalid paginationDto',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    const where = {
      branchId: paginationDto.branchId,
      stock: { lt: 2 },
      available: true,
    };

    const paginated = await PaginateWithMeta<EBranchProduct>({
      model: this.eBranchProduct,
      where,
      pagination: paginationDto,
    });

    // Completar con la info del microservicio
    const products = await Promise.all(
      paginated.data.map(async (branchProduct) => {
        const { productId, stock, price, colorCode } = branchProduct;

        const product = await firstValueFrom(
          this.client.send({ cmd: 'find_one_product' }, { id: productId }),
        );

        return {
          ...product,
          colorCode,
          price,
          stock,
        };
      }),
    );

    return {
      data: products,
      meta: paginated.meta,
    };
  }

  async increaseStock(dto: ManipulateStockDto) {
    const { productId, branchId, stock } = dto;

    const branchProduct = await this._findBranchProductOrThrow(
      productId,
      branchId,
    );

    return this._updateStock(branchProduct.id, branchProduct.stock + stock);
  }

  async decreaseStock(dto: ManipulateStockDto) {
    const { productId, branchId, stock } = dto;

    const branchProduct = await this._findBranchProductOrThrow(
      productId,
      branchId,
    );

    return this._updateStock(branchProduct.id, branchProduct.stock - stock);
  }

  async unregisterBranchProduct(dto: UpdateBranchProductToRegister) {
    const { branchId, productId } = dto;

    const existingBranch = await this.eBranchProduct.findFirst({
      where: { branchId, productId, available: true },
    });

    if (!existingBranch) {
      return {
        message:
          '[FIND_UPDATE] Lista de stock no registrada o ya dada de baja.',
      };
    }

    if (existingBranch.stock > 0) {
      return {
        message:
          '[DETECTED_STOCK] No se puede deshabilitar, tiene stock disponible.',
      };
    }

    return this.eBranchProduct.update({
      where: {
        branchId_productId: { branchId, productId },
      },
      data: {
        available: false,
      },
    });
  }

  async toRegister(updateBranchProductDto: UpdateBranchProductToRegister) {
    const { branchId, productId } = updateBranchProductDto;
    const existingBranch = await this.eBranchProduct.findFirst({
      where: {
        branchId,
      },
    });

    if (!existingBranch) {
      return {
        message: `[FIND_UPDATE] Esta Sucursal esta dada de baja o no esta registrada.`,
        status: HttpStatus.BAD_REQUEST,
      };
    }

    try {
      const branchData = await this.eBranchProduct.update({
        where: {
          branchId_productId: {
            // <-- uso correcto de la clave compuesta
            branchId: existingBranch.branchId,
            productId,
          },
        },
        data: {
          available: true,
        },
      });

      return {
        message: `Producto actualizado correctamente.`,
        status: HttpStatus.OK,
        data: branchData,
      };
    } catch (error) {
      return {
        message: `Error al actualizar el producto.`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }

  async generateExcelFromInventory(
    inventory: {
      code: string;
      description: string;
      branches: { name: string; stock: number }[];
    }[],
  ): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventario Completo');

    // 1. Obtener nombres de sucursales únicas
    const allBranchesSet = new Set<string>();
    inventory.forEach((product) =>
      product.branches.forEach((branch) => allBranchesSet.add(branch.name)),
    );
    const allBranches = Array.from(allBranchesSet);

    // 2. Definir columnas
    const baseColumns = [
      { header: 'Código', key: 'code', width: 15 },
      { header: 'Descripción', key: 'description', width: 40 },
    ];
    const branchColumns = allBranches.map((branchName) => ({
      header: `Stock en ${branchName}`,
      key: branchName,
      width: 15,
    }));
    worksheet.columns = [...baseColumns, ...branchColumns];

    // 3. Agregar filas
    inventory.forEach((product) => {
      const rowData: Record<string, any> = {
        code: product.code,
        description: product.description,
      };
      allBranches.forEach((branchName) => {
        const branchStock = product.branches.find((b) => b.name === branchName);
        rowData[branchName] = branchStock ? branchStock.stock : 0;
      });
      worksheet.addRow(rowData);
    });

    // 4. Estilos para el header
    worksheet.getRow(1).font = { bold: true };

    // 5. Generar buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async generatedFullInventaryInExcel() {
    const branchProducts = await this.eBranchProduct.findMany({
      where: { available: true },
      include: {
        branch: true,
      },
    });

    const groupedByProduct = {};

    for (const bp of branchProducts) {
      const { productId, branch, stock } = bp;

      if (!groupedByProduct[productId]) {
        const product = await firstValueFrom(
          this.client.send({ cmd: 'find_one_product' }, { id: productId }),
        );

        if (!product) continue;

        groupedByProduct[productId] = {
          code: product.code,
          description: product.description,
          branches: [],
        };
      }

      groupedByProduct[productId].branches.push({
        name: branch.name,
        stock,
      });
    }

    const inventoryArray = Object.values(groupedByProduct) as {
      code: string;
      description: string;
      branches: { name: string; stock: number }[];
    }[];

    const buffer = await this.generateExcelFromInventory(inventoryArray);

    // Acá llamamos al servicio que genera el EXCEL
    return buffer;
  }
}
