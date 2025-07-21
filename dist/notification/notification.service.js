"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let NotificationService = NotificationService_1 = class NotificationService extends client_1.PrismaClient {
    logger = new common_1.Logger(NotificationService_1.name);
    onModuleInit() {
        this.logger.log('NotificationService module initialized');
        void this.$connect();
    }
    async create(data) {
        return this.eNotification.create({
            data: {
                ...data,
                type: data.type || 'GENERAL',
            },
        });
    }
    async findAll(query) {
        return this.eNotification.findMany({
            where: {
                branchId: query.branchId,
                available: query.includeDeleted ? undefined : false,
                read: query.onlyUnread ? false : undefined,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.eNotification.findUnique({ where: { id } });
    }
    async update(id, data) {
        return this.eNotification.update({
            where: { id },
            data,
        });
    }
    async softDelete(id) {
        return this.eNotification.update({
            where: { id },
            data: { available: true },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
//# sourceMappingURL=notification.service.js.map