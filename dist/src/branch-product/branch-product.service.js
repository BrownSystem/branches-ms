"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BranchProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchProductService = void 0;
const common_1 = require("@nestjs/common");
const ExcelJS = require("exceljs");
const client_1 = require("@prisma/client");
const config_1 = require("../../config");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const pagination_helper_1 = require("./dto/pagination.helper");
let BranchProductService = BranchProductService_1 = class BranchProductService extends client_1.PrismaClient {
    client;
    logger = new common_1.Logger(BranchProductService_1.name);
    async _findBranchProductOrThrow(id) {
        const branchProduct = await this.eBranchProduct.findUnique({
            where: { id },
        });
        if (!branchProduct) {
            throw new microservices_1.RpcException({
                message: `[STOCK] No se encontró el registro branchProduct con id ${id}`,
                status: common_1.HttpStatus.NOT_FOUND,
            });
        }
        return branchProduct;
    }
    async _updateStock(id, newStock) {
        return this.eBranchProduct.update({
            where: { id },
            data: { stock: newStock },
        });
    }
    constructor(client) {
        super();
        this.client = client;
    }
    onModuleInit() {
        this.logger.log('Connecting to the database..');
        void this.$connect();
    }
    async create(createDto) {
        const { productId, stock = 0, colorCode = 'default' } = createDto;
        const [branches, product] = await Promise.all([
            this.eBranch.findMany(),
            (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_product' }, { id: productId })),
        ]);
        if (!product) {
            return {
                message: 'Product not found',
                status: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return Promise.all(branches.map((branch) => this.eBranchProduct.upsert({
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
                colorCode,
            },
        })));
    }
    async findOneProductBranchId(findProductBranchIdDto) {
        const { productId, branchId } = findProductBranchIdDto;
        const branchProduct = await this.eBranchProduct.findFirst({
            where: { branchId, productId, available: true },
        });
        if (!branchProduct) {
            throw new common_1.BadRequestException('[BRANCH_PRODUCT_ID] Branch product not found');
        }
        return branchProduct;
    }
    async productsStockAtBranchId(paginationDto) {
        if (!paginationDto || !paginationDto.branchId) {
            return {
                message: 'Invalid paginationDto',
                status: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const where = {
            branchId: paginationDto.branchId,
            available: true,
        };
        const paginated = await (0, pagination_helper_1.PaginateWithMeta)({
            model: this.eBranchProduct,
            where,
            pagination: paginationDto,
        });
        const products = await Promise.all(paginated.data.map(async (branchProduct) => {
            const { productId, stock, price, colorCode } = branchProduct;
            const product = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_product' }, { id: productId }));
            return {
                ...product,
                colorCode,
                price,
                stock,
            };
        }));
        return {
            data: products,
            meta: paginated.meta,
        };
    }
    async productsOutOfStockAtBranchId(paginationDto) {
        if (!paginationDto || !paginationDto.branchId) {
            return {
                message: 'Invalid paginationDto',
                status: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const where = {
            branchId: paginationDto.branchId,
            stock: { lt: 2 },
            available: true,
        };
        const paginated = await (0, pagination_helper_1.PaginateWithMeta)({
            model: this.eBranchProduct,
            where,
            pagination: paginationDto,
        });
        const products = await Promise.all(paginated.data.map(async (branchProduct) => {
            const { productId, stock, price, colorCode } = branchProduct;
            const product = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_product' }, { id: productId }));
            return {
                ...product,
                colorCode,
                price,
                stock,
            };
        }));
        return {
            data: products,
            meta: paginated.meta,
        };
    }
    async increaseStock(dto) {
        const branchProduct = await this._findBranchProductOrThrow(dto.id);
        return this._updateStock(dto.id, branchProduct.stock + dto.stock);
    }
    async decreaseStock(dto) {
        const { id, stock } = dto;
        if (!Number.isInteger(stock) || stock <= 0) {
            throw new microservices_1.RpcException({
                message: '[STOCK] El valor de stock debe ser un número entero positivo',
                status: common_1.HttpStatus.BAD_REQUEST,
            });
        }
        const branchProduct = await this._findBranchProductOrThrow(id);
        if (stock > branchProduct.stock) {
            throw new microservices_1.RpcException({
                message: `[STOCK] No se puede restar más stock (${stock}) que el disponible (${branchProduct.stock})`,
                status: common_1.HttpStatus.BAD_REQUEST,
            });
        }
        return this._updateStock(id, branchProduct.stock - stock);
    }
    async unregisterBranchProduct(dto) {
        const { branchId, productId } = dto;
        const existingBranch = await this.eBranchProduct.findFirst({
            where: { branchId, productId, available: true },
        });
        if (!existingBranch) {
            return {
                message: '[FIND_UPDATE] Lista de stock no registrada o ya dada de baja.',
            };
        }
        if (existingBranch.stock > 0) {
            return {
                message: '[DETECTED_STOCK] No se puede deshabilitar, tiene stock disponible.',
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
    async toRegister(updateBranchProductDto) {
        const { branchId, productId } = updateBranchProductDto;
        const existingBranch = await this.eBranchProduct.findFirst({
            where: {
                branchId,
            },
        });
        if (!existingBranch) {
            return {
                message: `[FIND_UPDATE] Esta Sucursal esta dada de baja o no esta registrada.`,
                status: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        try {
            const branchData = await this.eBranchProduct.update({
                where: {
                    branchId_productId: {
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
                status: common_1.HttpStatus.OK,
                data: branchData,
            };
        }
        catch (error) {
            return {
                message: `Error al actualizar el producto.`,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message,
            };
        }
    }
    async generateExcelFromInventory(inventory) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Inventario Completo');
        const allBranchesSet = new Set();
        inventory.forEach((product) => product.branches.forEach((branch) => allBranchesSet.add(branch.name)));
        const allBranches = Array.from(allBranchesSet);
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
        inventory.forEach((product) => {
            const rowData = {
                code: product.code,
                description: product.description,
            };
            allBranches.forEach((branchName) => {
                const branchStock = product.branches.find((b) => b.name === branchName);
                rowData[branchName] = branchStock ? branchStock.stock : 0;
            });
            worksheet.addRow(rowData);
        });
        worksheet.getRow(1).font = { bold: true };
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
                const product = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_product' }, { id: productId }));
                if (!product)
                    continue;
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
        const inventoryArray = Object.values(groupedByProduct);
        const buffer = await this.generateExcelFromInventory(inventoryArray);
        return buffer;
    }
};
exports.BranchProductService = BranchProductService;
exports.BranchProductService = BranchProductService = BranchProductService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], BranchProductService);
//# sourceMappingURL=branch-product.service.js.map