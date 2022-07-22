/*
  Warnings:

  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `idea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_ideaId_fkey`;

-- AlterTable
ALTER TABLE `likes` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `idea`;

-- CreateTable
CREATE TABLE `Idea` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `voteCount` INTEGER NOT NULL DEFAULT 0,
    `authorImage` VARCHAR(191) NULL,
    `authorName` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_ideaId_fkey` FOREIGN KEY (`ideaId`) REFERENCES `Idea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
