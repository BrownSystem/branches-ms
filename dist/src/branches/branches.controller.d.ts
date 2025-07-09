import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    create(createBranchDto: CreateBranchDto): Promise<{
        name: string;
        location: string;
        id: string;
        available: boolean;
    }>;
    findAll(): Promise<{
        name: string;
        location: string;
        id: string;
        available: boolean;
    }[]>;
    findOne(payload: {
        id: string;
    }): Promise<{
        branchProducts: {
            description: any;
            productId: string;
            colorCode: string;
            stock: number;
        }[];
        name: string;
        location: string;
        id: string;
    }>;
    findOneById(payload: {
        id: string;
    }): Promise<{
        name: string;
        location: string;
        id: string;
        available: boolean;
    } | {
        message: string;
        status: import("@nestjs/common").HttpStatus;
    }>;
    update(updateBranchDto: UpdateBranchDto): Promise<{
        name: string;
        location: string;
        id: string;
        available: boolean;
    } | {
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
