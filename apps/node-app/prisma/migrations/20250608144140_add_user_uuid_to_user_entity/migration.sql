/*
  Warnings:

  - You are about to drop the column `uuid` on the `users_modules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "users_modules_uuid_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users_modules" DROP COLUMN "uuid";

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");
