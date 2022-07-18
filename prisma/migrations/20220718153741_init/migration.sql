-- CreateTable
CREATE TABLE `idea` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `voteCount` INTEGER NOT NULL DEFAULT 0,
    `authorImage` VARCHAR(191) NULL,
    `authorName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
