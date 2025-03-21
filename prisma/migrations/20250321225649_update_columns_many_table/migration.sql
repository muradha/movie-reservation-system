/*
  Warnings:

  - You are about to alter the column `used_at` on the `promotion_usage` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `promotion_usage` MODIFY `used_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `promotions` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `studio_types` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `vouchers` MODIFY `description` TEXT NULL;
