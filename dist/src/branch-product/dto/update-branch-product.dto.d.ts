import { CreateBranchProductDto } from './create-branch-product.dto';
declare const UpdateBranchProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBranchProductDto>>;
export declare class UpdateBranchProductDto extends UpdateBranchProductDto_base {
    id: string;
    productId: string;
}
export declare class UpdateBranchProductToRegister {
    branchId: string;
    productId: string;
}
export {};
