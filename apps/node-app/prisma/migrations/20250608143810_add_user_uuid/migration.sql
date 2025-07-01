/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `users_modules` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `users_modules` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "users_modules" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_modules_uuid_key" ON "users_modules"("uuid");
