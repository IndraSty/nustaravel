-- CreateTable
CREATE TABLE `hotelimages` (
    `id` VARCHAR(191) NOT NULL,
    `hotel_id` VARCHAR(191) NULL,
    `image_path` VARCHAR(255) NOT NULL,

    INDEX `hotel_id`(`hotel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hotelimages` ADD CONSTRAINT `hotelimages_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
