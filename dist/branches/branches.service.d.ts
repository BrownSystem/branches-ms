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
    findOneBranchById(id: string): Promise<{
        id: string;
        name: string;
        location: string;
        available: boolean;
    } | {
        message: string;
        status: HttpStatus;
    }>;
    findOne(id: string): Promise<{
        branchProducts: {
            description: any;
            productId: string;
            stock: number;
        }[];
        id: string;
        name: string;
        location: string;
    }>;
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<{
        id: string;
        name: string;
        location: string;
        available: boolean;
    } | {
        message: string;
        statusCode: HttpStatus;
    }>;
}
