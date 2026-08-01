-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('CDB', 'BTC', 'USD', 'OTHER');

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "targetValue" DOUBLE PRECISION NOT NULL,
    "monthlyContribution" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allocation" (
    "id" SERIAL NOT NULL,
    "goalId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "entryPrice" DOUBLE PRECISION,
    "fxRate" DOUBLE PRECISION,
    "yieldPercent" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Allocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Allocation_goalId_idx" ON "Allocation"("goalId");

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
