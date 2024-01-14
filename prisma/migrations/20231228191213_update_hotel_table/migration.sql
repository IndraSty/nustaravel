/*
  Warnings:

  - Added the required column `city` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hotels` ADD COLUMN `city` VARCHAR(255) NOT NULL,
    ADD COLUMN `province` VARCHAR(255) NOT NULL;
