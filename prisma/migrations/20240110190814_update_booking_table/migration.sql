-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `hotel_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `hotel_id` ON `bookings`(`hotel_id`);

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
