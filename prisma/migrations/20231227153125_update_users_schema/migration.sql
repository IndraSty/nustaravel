-- CreateTable
CREATE TABLE `bookings` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `room_id` INTEGER NULL,
    `booking_date` DATETIME(0) NULL,
    `check_in_date` DATETIME(0) NULL,
    `check_out_date` DATETIME(0) NULL,

    INDEX `room_id`(`room_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotels` (
    `id` INTEGER NOT NULL,
    `hotel_name` VARCHAR(255) NULL,
    `hotel_address` VARCHAR(255) NULL,
    `hotel_description` TEXT NULL,
    `hotel_rating` FLOAT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` INTEGER NOT NULL,
    `booking_id` INTEGER NULL,
    `date` DATETIME(0) NULL,
    `amount` INTEGER NULL,
    `status` VARCHAR(255) NULL,

    INDEX `booking_id`(`booking_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL,
    `booking_id` INTEGER NULL,
    `date` DATETIME(0) NULL,
    `amount` INTEGER NULL,
    `method` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,

    INDEX `booking_id`(`booking_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL,
    `hotel_id` INTEGER NULL,
    `room_type` VARCHAR(255) NULL,
    `room_price` INTEGER NULL,
    `room_availability` VARCHAR(255) NULL,

    INDEX `hotel_id`(`hotel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL,
    `fullname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `phone` INTEGER NULL,
    `token` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `update_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookinghistory` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `booking_id` INTEGER NULL,
    `date` DATETIME(0) NULL,
    `action` BOOLEAN NULL,

    INDEX `booking_id`(`booking_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facilities` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `icon` VARCHAR(255) NULL,
    `category` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotelfacilities` (
    `id` INTEGER NOT NULL,
    `hotel_id` INTEGER NULL,
    `facility_id` INTEGER NULL,

    INDEX `facility_id`(`facility_id`),
    INDEX `hotel_id`(`hotel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `review_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `hotel_id` INTEGER NULL,
    `date` DATETIME(0) NULL,
    `rating` FLOAT NULL,
    `text` TEXT NULL,

    INDEX `hotel_id`(`hotel_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bookinghistory` ADD CONSTRAINT `bookinghistory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bookinghistory` ADD CONSTRAINT `bookinghistory_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hotelfacilities` ADD CONSTRAINT `hotelfacilities_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hotelfacilities` ADD CONSTRAINT `hotelfacilities_ibfk_2` FOREIGN KEY (`facility_id`) REFERENCES `facilities`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
