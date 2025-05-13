/*
  Warnings:

  - You are about to drop the column `movie_status_id` on the `movies` table. All the data in the column will be lost.
  - You are about to alter the column `used_at` on the `promotion_usage` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `movies` DROP FOREIGN KEY `movies_movie_status_id_fkey`;

-- DropIndex
DROP INDEX `movies_movie_status_id_fkey` ON `movies`;

-- AlterTable
ALTER TABLE `movies` DROP COLUMN `movie_status_id`;

-- AlterTable
ALTER TABLE `promotion_usage` MODIFY `used_at` TIMESTAMP NOT NULL;
