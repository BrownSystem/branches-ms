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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBranchProductToRegister = exports.UpdateBranchProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_branch_product_dto_1 = require("./create-branch-product.dto");
const class_validator_1 = require("class-validator");
class UpdateBranchProductDto extends (0, mapped_types_1.PartialType)(create_branch_product_dto_1.CreateBranchProductDto) {
    id;
    productId;
}
exports.UpdateBranchProductDto = UpdateBranchProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBranchProductDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBranchProductDto.prototype, "productId", void 0);
class UpdateBranchProductToRegister {
    branchId;
    productId;
}
exports.UpdateBranchProductToRegister = UpdateBranchProductToRegister;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBranchProductToRegister.prototype, "branchId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBranchProductToRegister.prototype, "productId", void 0);
//# sourceMappingURL=update-branch-product.dto.js.map