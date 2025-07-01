/*
  Warnings:

  - You are about to drop the column `planId` on the `user_plans` table. All the data in the column will be lost.
  - You are about to drop the column `IsActive` on the `users` table. All the data in the column will be lost.
  - Added the required column `plan_id` to the `user_plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_plans" DROP CONSTRAINT "user_plans_planId_fkey";

-- AlterTable
ALTER TABLE "user_plans" DROP COLUMN "planId",
ADD COLUMN     "plan_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "IsActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
