/*
  Warnings:

  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_ideaId_fkey`;

-- DropTable
DROP TABLE `likes`;

-- CreateTable
CREATE TABLE `Like` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ideaId` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_ideaId_fkey` FOREIGN KEY (`ideaId`) REFERENCES `Idea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
