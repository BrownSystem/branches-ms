"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchProductController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const branch_product_service_1 = require("./branch-product.service");
const create_branch_product_dto_1 = require("./dto/create-branch-product.dto");
const manipulate_stock_dto_1 = require("./dto/manipulate-stock.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
const update_branch_product_dto_1 = require("./dto/update-branch-product.dto");
const find_product_branch_id_dto_1 = require("./dto/find-product-branch-id.dto");
let BranchProductController = class BranchProductController {
    branchProductService;
    constructor(branchProductService) {
        this.branchProductService = branchProductService;
    }
    create(createBranchProductDto) {
        return this.branchProductService.create(createBranchProductDto);
    }
    findOneProductBranchId(findProductBranchIdDto) {
        return this.branchProductService.findOneProductBranchId(findProductBranchIdDto);
    }
    productsStockAtBranchId(paginationDto) {
        return this.branchProductService.productsStockAtBranchId(paginationDto);
    }
    littleStock(paginationDto) {
        return this.branchProductService.productsOutOfStockAtBranchId(paginationDto);
    }
    generatedFullInventaryInExcel() {
        return this.branchProductService.generatedFullInventaryInExcel();
    }
    searchByProductIdDeRegistration(updateBranchProductDto) {
        return this.branchProductService.unregisterBranchProduct(updateBranchProductDto);
    }
    searchByProductIdToRegister(updateBranchProductDto) {
        return this.branchProductService.toRegister(updateBranchProductDto);
    }
    increaseStock(manipulateStockDto) {
        return this.branchProductService.increaseStock(manipulateStockDto);
    }
    decreaseStock(manipulateStockDto) {
        return this.branchProductService.decreaseStock(manipulateStockDto);
    }
};
exports.BranchProductController = BranchProductController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'emit_create_branch_product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_branch_product_dto_1.CreateBranchProductDto]),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_product_branch_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_product_branch_id_dto_1.FindProductBranchIdDto]),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "findOneProductBranchId", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_stock_branch' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "productsStockAtBranchId", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_out_of_stock_branch' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "littleStock", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'generated_full_inventary_in_excel' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "generatedFullInventaryInExcel", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'de_registration_by_branch' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_branch_product_dto_1.UpdateBranchProductToRegister]),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "searchByProductIdDeRegistration", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'to_register_branch_product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_branch_product_dto_1.UpdateBranchProductToRegister]),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "searchByProductIdToRegister", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'increase_branch_product_stock' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manipulate_stock_dto_1.ManipulateStockDto]),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "increaseStock", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'descrease_branch_product_stock' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manipulate_stock_dto_1.ManipulateStockDto]),
    __metadata("design:returntype", void 0)
], BranchProductController.prototype, "decreaseStock", null);
exports.BranchProductController = BranchProductController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [branch_product_service_1.BranchProductService])
], BranchProductController);
//# sourceMappingURL=branch-product.controller.js.map