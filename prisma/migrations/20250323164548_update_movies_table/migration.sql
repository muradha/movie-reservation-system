/*
  Warnings:

  - You are about to alter the column `used_at` on the `promotion_usage` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `movies` ADD COLUMN `end_date` DATE NULL,
    ADD COLUMN `release_date` DATE NULL;

-- AlterTable
ALTER TABLE `promotion_usage` MODIFY `used_at` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `movie_availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NOT NULL,
    `theater_id` INTEGER NOT NULL,
    `movie_status_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movie_availability` ADD CONSTRAINT `movie_availability_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_availability` ADD CONSTRAINT `movie_availability_theater_id_fkey` FOREIGN KEY (`theater_id`) REFERENCES `theaters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_availability` ADD CONSTRAINT `movie_availability_movie_status_id_fkey` FOREIGN KEY (`movie_status_id`) REFERENCES `movie_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
