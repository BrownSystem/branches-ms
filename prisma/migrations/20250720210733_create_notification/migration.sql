-- CreateTable
CREATE TABLE "ENotification" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ENotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ENotification_branchId_createdAt_idx" ON "ENotification"("branchId", "createdAt");

-- AddForeignKey
ALTER TABLE "ENotification" ADD CONSTRAINT "ENotification_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "EBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
