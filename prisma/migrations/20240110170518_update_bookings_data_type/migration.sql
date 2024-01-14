-- AlterTable
ALTER TABLE `bookings` MODIFY `booking_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `check_in_date` VARCHAR(255) NULL,
    MODIFY `check_out_date` VARCHAR(255) NULL;
