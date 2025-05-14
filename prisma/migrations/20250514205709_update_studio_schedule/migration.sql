/*
  Warnings:

  - You are about to alter the column `used_at` on the `promotion_usage` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `studio_schedule_id` to the `movie_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `show_date` to the `studio_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie_schedules` ADD COLUMN `studio_schedule_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `promotion_usage` MODIFY `used_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `studio_schedules` ADD COLUMN `show_date` DATE NOT NULL;

-- AddForeignKey
ALTER TABLE `movie_schedules` ADD CONSTRAINT `movie_schedules_studio_schedule_id_fkey` FOREIGN KEY (`studio_schedule_id`) REFERENCES `studio_schedules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
