import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NotificationService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(NotificationService.name);

  onModuleInit() {
    this.logger.log('NotificationService module initialized');
    void this.$connect();
  }

  async create(data: CreateNotificationDto) {
    return this.eNotification.create({
      data: {
        ...data,
        type: data.type || 'GENERAL',
      },
    });
  }

  async findAll(query: QueryNotificationDto) {
    return this.eNotification.findMany({
      where: {
        branchId: query.branchId,
        available: query.includeDeleted ? undefined : false,
        read: query.onlyUnread ? false : undefined,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.eNotification.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateNotificationDto) {
    return this.eNotification.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return this.eNotification.update({
      where: { id },
      data: { available: true },
    });
  }
}
