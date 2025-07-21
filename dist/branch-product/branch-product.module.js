"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchProductModule = void 0;
const common_1 = require("@nestjs/common");
const branch_product_service_1 = require("./branch-product.service");
const branch_product_controller_1 = require("./branch-product.controller");
const nats_module_1 = require("../transports/nats.module");
let BranchProductModule = class BranchProductModule {
};
exports.BranchProductModule = BranchProductModule;
exports.BranchProductModule = BranchProductModule = __decorate([
    (0, common_1.Module)({
        imports: [nats_module_1.NatsModule],
        controllers: [branch_product_controller_1.BranchProductController],
        providers: [branch_product_service_1.BranchProductService],
    })
], BranchProductModule);
//# sourceMappingURL=branch-product.module.js.map