/*
  Warnings:

  - You are about to drop the column `userId` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `module_usage_logs` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `module_usage_logs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `module_usage_logs` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `maxPerDay` on the `plan_module_limits` table. All the data in the column will be lost.
  - You are about to drop the column `maxPerMonth` on the `plan_module_limits` table. All the data in the column will be lost.
  - You are about to drop the column `maxTotal` on the `plan_module_limits` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `plan_module_limits` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `plan_module_limits` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `plans_modules` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `plans_modules` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `canRead` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `canWrite` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `users_modules` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users_modules` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module_id` to the `module_usage_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `module_usage_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_per_day` to the `plan_module_limits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_per_month` to the `plan_module_limits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_total` to the `plan_module_limits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module_id` to the `plan_module_limits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_id` to the `plan_module_limits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module_id` to the `plans_modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_id` to the `plans_modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `can_read` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `can_write` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module_id` to the `users_modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `users_modules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "module_usage_logs" DROP CONSTRAINT "module_usage_logs_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "module_usage_logs" DROP CONSTRAINT "module_usage_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "plan_module_limits" DROP CONSTRAINT "plan_module_limits_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "plan_module_limits" DROP CONSTRAINT "plan_module_limits_planId_fkey";

-- DropForeignKey
ALTER TABLE "plans_modules" DROP CONSTRAINT "plans_modules_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "plans_modules" DROP CONSTRAINT "plans_modules_planId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_userId_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_productId_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_productId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "users_modules" DROP CONSTRAINT "users_modules_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "users_modules" DROP CONSTRAINT "users_modules_userId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "module_usage_logs" DROP COLUMN "createdAt",
DROP COLUMN "moduleId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "module_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "orderId",
DROP COLUMN "productId",
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "customerId",
DROP COLUMN "userId",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "plan_module_limits" DROP COLUMN "maxPerDay",
DROP COLUMN "maxPerMonth",
DROP COLUMN "maxTotal",
DROP COLUMN "moduleId",
DROP COLUMN "planId",
ADD COLUMN     "max_per_day" INTEGER NOT NULL,
ADD COLUMN     "max_per_month" INTEGER NOT NULL,
ADD COLUMN     "max_total" INTEGER NOT NULL,
ADD COLUMN     "module_id" INTEGER NOT NULL,
ADD COLUMN     "plan_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "plans_modules" DROP COLUMN "moduleId",
DROP COLUMN "planId",
ADD COLUMN     "module_id" INTEGER NOT NULL,
ADD COLUMN     "plan_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "canRead",
DROP COLUMN "canWrite",
ADD COLUMN     "can_read" BOOLEAN NOT NULL,
ADD COLUMN     "can_write" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "productId",
DROP COLUMN "userId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "productId",
DROP COLUMN "userId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users_modules" DROP COLUMN "moduleId",
DROP COLUMN "userId",
ADD COLUMN     "module_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "plan_module_limits" ADD CONSTRAINT "plan_module_limits_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_module_limits" ADD CONSTRAINT "plan_module_limits_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_usage_logs" ADD CONSTRAINT "module_usage_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_usage_logs" ADD CONSTRAINT "module_usage_logs_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans_modules" ADD CONSTRAINT "plans_modules_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans_modules" ADD CONSTRAINT "plans_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_modules" ADD CONSTRAINT "users_modules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_modules" ADD CONSTRAINT "users_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
