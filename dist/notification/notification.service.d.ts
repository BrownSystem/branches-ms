import { OnModuleInit } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { PrismaClient } from '@prisma/client';
export declare class NotificationService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    create(data: CreateNotificationDto): Promise<{
        id: string;
        available: boolean;
        message: string;
        branchId: string;
        title: string;
        type: string;
        read: boolean;
        createdAt: Date;
    }>;
    findAll(query: QueryNotificationDto): Promise<{
        id: string;
        available: boolean;
        message: string;
        branchId: string;
        title: string;
        type: string;
        read: boolean;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        available: boolean;
        message: string;
        branchId: string;
        title: string;
        type: string;
        read: boolean;
        createdAt: Date;
    } | null>;
    update(id: string, data: UpdateNotificationDto): Promise<{
        id: string;
        available: boolean;
        message: string;
        branchId: string;
        title: string;
        type: string;
        read: boolean;
        createdAt: Date;
    }>;
    softDelete(id: string): Promise<{
        id: string;
        available: boolean;
        message: string;
        branchId: string;
        title: string;
        type: string;
        read: boolean;
        createdAt: Date;
    }>;
}
