/*
  Warnings:

  - You are about to drop the column `room_availability` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `room_price` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `room_type` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `price` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hotels` ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `room_availability`,
    DROP COLUMN `room_price`,
    DROP COLUMN `room_type`,
    ADD COLUMN `availability` VARCHAR(255) NULL,
    ADD COLUMN `category` VARCHAR(255) NULL,
    ADD COLUMN `price` INTEGER NULL,
    ADD COLUMN `type` VARCHAR(255) NULL;
