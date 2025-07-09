import { HttpStatus, OnModuleInit } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
export declare class BranchesService extends PrismaClient implements OnModuleInit {
    private readonly client;
    private readonly logger;
    constructor(client: ClientProxy);
    onModuleInit(): void;
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
    findOneBranchById(id: string): Promise<{
        name: string;
        location: string;
        id: string;
        available: boolean;
    } | {
        message: string;
        status: HttpStatus;
    }>;
    findOne(id: string): Promise<{
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
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<{
        name: string;
        location: string;
        id: string;
        available: boolean;
    } | {
        message: string;
        statusCode: HttpStatus;
    }>;
}
