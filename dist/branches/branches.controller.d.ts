import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    create(createBranchDto: CreateBranchDto): Promise<{
        id: string;
        name: string;
        location: string;
        available: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        location: string;
        available: boolean;
    }[]>;
    findOne(payload: {
        id: string;
    }): Promise<{
        branchProducts: {
            description: any;
            productId: string;
            stock: number;
        }[];
        id: string;
        name: string;
        location: string;
    }>;
    findOneById(payload: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        location: string;
        available: boolean;
    } | {
        message: string;
        status: import("@nestjs/common").HttpStatus;
    }>;
    update(updateBranchDto: UpdateBranchDto): Promise<{
        id: string;
        name: string;
        location: string;
        available: boolean;
    } | {
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
