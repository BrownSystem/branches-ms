import { BranchProductService } from './branch-product.service';
import { CreateBranchProductDto } from './dto/create-branch-product.dto';
import { ManipulateStockDto } from './dto/manipulate-stock.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBranchProductToRegister } from './dto/update-branch-product.dto';
import { FindProductBranchIdDto } from './dto/find-product-branch-id.dto';
export declare class BranchProductController {
    private readonly branchProductService;
    constructor(branchProductService: BranchProductService);
    create(createBranchProductDto: CreateBranchProductDto): Promise<{
        available: boolean;
        id: string;
        branchId: string;
        productId: string;
        stock: number;
    }[] | {
        message: string;
        status: import("@nestjs/common").HttpStatus;
    }>;
    findOneProductBranchId(findProductBranchIdDto: FindProductBranchIdDto): Promise<{
        available: boolean;
        id: string;
        branchId: string;
        productId: string;
        stock: number;
    }>;
    productsStockAtBranchId(paginationDto: PaginationDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
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
    littleStock(paginationDto: PaginationDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
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
    generatedFullInventaryInExcel(): Promise<Buffer<ArrayBufferLike>>;
    searchByProductIdDeRegistration(updateBranchProductDto: UpdateBranchProductToRegister): Promise<{
        available: boolean;
        id: string;
        branchId: string;
        productId: string;
        stock: number;
    } | {
        message: string;
    }>;
    searchByProductIdToRegister(updateBranchProductDto: UpdateBranchProductToRegister): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data?: undefined;
        error?: undefined;
    } | {
        message: string;
        status: import("@nestjs/common").HttpStatus;
        data: {
            available: boolean;
            id: string;
            branchId: string;
            productId: string;
            stock: number;
        };
        error?: undefined;
    } | {
        message: string;
        status: import("@nestjs/common").HttpStatus;
        error: any;
        data?: undefined;
    }>;
    increaseStock(manipulateStockDto: ManipulateStockDto): Promise<{
        available: boolean;
        id: string;
        branchId: string;
        productId: string;
        stock: number;
    }>;
    decreaseStock(manipulateStockDto: ManipulateStockDto): Promise<{
        available: boolean;
        id: string;
        branchId: string;
        productId: string;
        stock: number;
    }>;
}
