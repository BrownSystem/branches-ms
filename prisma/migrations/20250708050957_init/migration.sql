-- CreateTable
CREATE TABLE "EBranchProduct" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EBranchProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EBranch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EBranch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EBranchProduct_id_branchId_productId_available_idx" ON "EBranchProduct"("id", "branchId", "productId", "available");

-- CreateIndex
CREATE UNIQUE INDEX "EBranchProduct_branchId_productId_key" ON "EBranchProduct"("branchId", "productId");

-- CreateIndex
CREATE INDEX "EBranch_id_name_available_idx" ON "EBranch"("id", "name", "available");

-- AddForeignKey
ALTER TABLE "EBranchProduct" ADD CONSTRAINT "EBranchProduct_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "EBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
