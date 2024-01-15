/*
  Warnings:

  - You are about to drop the column `action` on the `bookinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `bookinghistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bookinghistory` DROP COLUMN `action`,
    DROP COLUMN `date`,
    ADD COLUMN `status` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `status` VARCHAR(255) NULL;
