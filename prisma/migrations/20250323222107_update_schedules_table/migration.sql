/*
  Warnings:

  - You are about to drop the column `studio_schedule_id` on the `movie_schedules` table. All the data in the column will be lost.
  - You are about to alter the column `used_at` on the `promotion_usage` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `movie_schedules` DROP FOREIGN KEY `movie_schedules_studio_schedule_id_fkey`;

-- DropIndex
DROP INDEX `movie_schedules_studio_schedule_id_fkey` ON `movie_schedules`;

-- AlterTable
ALTER TABLE `movie_schedules` DROP COLUMN `studio_schedule_id`;

-- AlterTable
ALTER TABLE `promotion_usage` MODIFY `used_at` TIMESTAMP NOT NULL;
