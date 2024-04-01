-- CreateTable
CREATE TABLE `Wrestler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WrestlerGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wrestler_1_id` INTEGER NOT NULL,
    `wrestler_2_id` INTEGER NOT NULL,
    `wrestler_3_id` INTEGER NOT NULL,
    `wrestler_4_id` INTEGER NOT NULL,

    UNIQUE INDEX `WrestlerGroup_wrestler_1_id_key`(`wrestler_1_id`),
    UNIQUE INDEX `WrestlerGroup_wrestler_2_id_key`(`wrestler_2_id`),
    UNIQUE INDEX `WrestlerGroup_wrestler_3_id_key`(`wrestler_3_id`),
    UNIQUE INDEX `WrestlerGroup_wrestler_4_id_key`(`wrestler_4_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DailyWrestlers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `starting_at` DATETIME(3) NOT NULL,
    `ending_at` DATETIME(3) NOT NULL,
    `wrestler_group_id` INTEGER NOT NULL,

    UNIQUE INDEX `DailyWrestlers_wrestler_group_id_key`(`wrestler_group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WrestlerGroup` ADD CONSTRAINT `WrestlerGroup_wrestler_1_id_fkey` FOREIGN KEY (`wrestler_1_id`) REFERENCES `Wrestler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WrestlerGroup` ADD CONSTRAINT `WrestlerGroup_wrestler_2_id_fkey` FOREIGN KEY (`wrestler_2_id`) REFERENCES `Wrestler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WrestlerGroup` ADD CONSTRAINT `WrestlerGroup_wrestler_3_id_fkey` FOREIGN KEY (`wrestler_3_id`) REFERENCES `Wrestler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WrestlerGroup` ADD CONSTRAINT `WrestlerGroup_wrestler_4_id_fkey` FOREIGN KEY (`wrestler_4_id`) REFERENCES `Wrestler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyWrestlers` ADD CONSTRAINT `DailyWrestlers_wrestler_group_id_fkey` FOREIGN KEY (`wrestler_group_id`) REFERENCES `WrestlerGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
