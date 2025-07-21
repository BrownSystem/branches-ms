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
var BranchesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const config_1 = require("../config");
let BranchesService = BranchesService_1 = class BranchesService extends client_1.PrismaClient {
    client;
    logger = new common_1.Logger(BranchesService_1.name);
    constructor(client) {
        super();
        this.client = client;
    }
    onModuleInit() {
        this.logger.log('BranchesService module initialized');
        void this.$connect();
    }
    async create(createBranchDto) {
        const { name, location } = createBranchDto;
        try {
            const newBranch = await this.eBranch.create({
                data: { name, location: location || 'no tiene ubicación' },
            });
            let page = 1;
            const pageSize = 100;
            let hasMore = true;
            while (hasMore) {
                const response = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_product_for_branch' }, { page, pageSize }));
                const products = response.data;
                if (!products.length)
                    break;
                const createManyBranchProducts = products.map((product) => ({
                    productId: product.id,
                    branchId: newBranch.id,
                    stock: 0,
                    colorCode: 'default',
                }));
                await this.eBranchProduct.createMany({
                    data: createManyBranchProducts,
                    skipDuplicates: true,
                });
                if (products.length < pageSize)
                    hasMore = false;
                else
                    page++;
            }
            return newBranch;
        }
        catch (error) {
            console.error('Error creating branch:', error);
            throw new Error('Error creating branch: ' + (error.message || 'unknown error'));
        }
    }
    async findAll() {
        return await this.eBranch.findMany({
            where: {
                available: true,
            },
        });
    }
    async findOneBranchById(id) {
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
                    status: common_1.HttpStatus.NOT_FOUND,
                };
            }
            return branch;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async findOne(id) {
        const branch = await this.eBranch.findFirst({
            where: { id, available: true },
            select: {
                id: true,
                name: true,
                location: true,
                branchProducts: {
                    select: {
                        productId: true,
                        colorCode: true,
                        stock: true,
                    },
                },
            },
        });
        if (!branch) {
            throw new microservices_1.RpcException({
                message: `Branch with id ${id} not found`,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            });
        }
        const productIds = branch.branchProducts.map((branchProduct) => branchProduct.productId);
        if (productIds.length) {
            const products = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'validate_products' }, productIds));
            return {
                ...branch,
                branchProducts: branch.branchProducts.map((branchProduct) => ({
                    ...branchProduct,
                    description: products.find((product) => product.id === branchProduct.productId)
                        ?.description || 'No description available',
                })),
            };
        }
        return {
            ...branch,
            branchProducts: [],
        };
    }
    async update(id, updateBranchDto) {
        const branchId = await this.eBranch.findUnique({
            where: { id },
        });
        if (!branchId) {
            return { message: 'Branch not found', statusCode: common_1.HttpStatus.NOT_FOUND };
        }
        const { name, location } = updateBranchDto;
        const updatedBranch = await this.eBranch.update({
            where: { id },
            data: {
                name,
                location: location || 'no tiene ubicación',
            },
        });
        return updatedBranch;
    }
};
exports.BranchesService = BranchesService;
exports.BranchesService = BranchesService = BranchesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], BranchesService);
//# sourceMappingURL=branches.service.js.map