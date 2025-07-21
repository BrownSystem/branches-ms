import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(dto: CreateNotificationDto): Promise<{
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
    update(dto: UpdateNotificationDto): Promise<{
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
