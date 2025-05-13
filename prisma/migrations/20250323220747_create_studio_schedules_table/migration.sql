/*
  Warnings:

  - You are about to drop the column `show_date` on the `movie_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `show_time` on the `movie_schedules` table. All the data in the column will be lost.
  - You are about to alter the column `used_at` on the `promotion_usage` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `studio_schedule_id` to the `movie_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie_schedules` DROP COLUMN `show_date`,
    DROP COLUMN `show_time`,
    ADD COLUMN `studio_schedule_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `promotion_usage` MODIFY `used_at` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `studio_schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `show_time` TIME NOT NULL,
    `sequence` INTEGER NOT NULL,
    `studio_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movie_schedules` ADD CONSTRAINT `movie_schedules_studio_schedule_id_fkey` FOREIGN KEY (`studio_schedule_id`) REFERENCES `studio_schedules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studio_schedules` ADD CONSTRAINT `studio_schedules_studio_id_fkey` FOREIGN KEY (`studio_id`) REFERENCES `studios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
