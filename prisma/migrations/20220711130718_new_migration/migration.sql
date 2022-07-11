/*
  Warnings:

  - You are about to drop the column `userId` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IdeaToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Idea` DROP FOREIGN KEY `Idea_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_IdeaToUser` DROP FOREIGN KEY `_IdeaToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_IdeaToUser` DROP FOREIGN KEY `_IdeaToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Idea` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `_IdeaToUser`;
