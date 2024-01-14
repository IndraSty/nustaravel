/*
  Warnings:

  - You are about to alter the column `availability` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Added the required column `check_in` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_out` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hotels` ADD COLUMN `check_in` VARCHAR(255) NOT NULL,
    ADD COLUMN `check_out` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `rooms` MODIFY `availability` INTEGER NULL;
