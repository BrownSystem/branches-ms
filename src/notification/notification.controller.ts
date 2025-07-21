import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern({ cmd: 'create-notification' })
  create(@Payload() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @MessagePattern({ cmd: 'find-all-notification' })
  findAll(@Payload() query: QueryNotificationDto) {
    return this.notificationService.findAll(query);
  }

  @MessagePattern({ cmd: 'find-one-notification' })
  findOne(@Payload() id: string) {
    return this.notificationService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-notification' })
  update(@Payload() dto: UpdateNotificationDto) {
    return this.notificationService.update(dto.id, dto);
  }

  @MessagePattern({ cmd: 'soft-delete-notification' })
  softDelete(@Payload() id: string) {
    return this.notificationService.softDelete(id);
  }
}
