import { HttpStatus, OnModuleInit } from '@nestjs/common';
import { CreateBranchProductDto } from './dto/create-branch-product.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { ManipulateStockDto } from './dto/manipulate-stock.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBranchProductToRegister } from './dto/update-branch-product.dto';
import { FindProductBranchIdDto } from './dto/find-product-branch-id.dto';
export declare class BranchProductService extends PrismaClient implements OnModuleInit {
    private readonly client;
    private readonly logger;
    private _findBranchProductOrThrow;
    private _updateStock;
    constructor(client: ClientProxy);
    onModuleInit(): void;
    create(createDto: CreateBranchProductDto): Promise<{
        id: string;
        available: boolean;
        productId: string;
        branchId: string;
        stock: number;
    }[] | {
        message: string;
        status: HttpStatus;
    }>;
    findOneProductBranchId(findProductBranchIdDto: FindProductBranchIdDto): Promise<{
        id: string;
        available: boolean;
        productId: string;
        branchId: string;
        stock: number;
    }>;
    productsStockAtBranchId(paginationDto: PaginationDto): Promise<{
        message: string;
        status: HttpStatus;
        data?: undefined;
        meta?: undefined;
    } | {
        data: any[];
        meta: {
            total: any;
            page: number;
            lastPage: number;
        };
        message?: undefined;
        status?: undefined;
    }>;
    productsOutOfStockAtBranchId(paginationDto: PaginationDto): Promise<{
        message: string;
        status: HttpStatus;
        data?: undefined;
        meta?: undefined;
    } | {
        data: any[];
        meta: {
            total: any;
            page: number;
            lastPage: number;
        };
        message?: undefined;
        status?: undefined;
    }>;
    increaseStock(dto: ManipulateStockDto): Promise<{
        id: string;
        available: boolean;
        productId: string;
        branchId: string;
        stock: number;
    }>;
    decreaseStock(dto: ManipulateStockDto): Promise<{
        id: string;
        available: boolean;
        productId: string;
        branchId: string;
        stock: number;
    }>;
    unregisterBranchProduct(dto: UpdateBranchProductToRegister): Promise<{
        id: string;
        available: boolean;
        productId: string;
        branchId: string;
        stock: number;
    } | {
        message: string;
    }>;
    toRegister(updateBranchProductDto: UpdateBranchProductToRegister): Promise<{
        message: string;
        status: HttpStatus;
        data?: undefined;
        error?: undefined;
    } | {
        message: string;
        status: HttpStatus;
        data: {
            id: string;
            available: boolean;
            productId: string;
            branchId: string;
            stock: number;
        };
        error?: undefined;
    } | {
        message: string;
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    generateExcelFromInventory(inventory: {
        code: string;
        description: string;
        branches: {
            name: string;
            stock: number;
        }[];
    }[]): Promise<Buffer>;
    generatedFullInventaryInExcel(): Promise<Buffer<ArrayBufferLike>>;
}
