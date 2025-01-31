## Sample Database structure

```sql
-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.28-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.5.0.6677
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `products`
    (
        `id`    INT(10) UNSIGNED NOT NULL auto_increment,
        `label` VARCHAR(50) NOT NULL DEFAULT 'product',
        `price` FLOAT UNSIGNED NOT NULL DEFAULT 0,
        `description` VARCHAR(50) NOT NULL DEFAULT 'short desc',
        `tags` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL check (json_valid(`tags`)),
        `imgs` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"{}"',
        `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON
    UPDATE CURRENT_TIMESTAMP(),
    PRIMARY KEY (`id`),
    KEY `id` (`id`)
    )engine=innodb DEFAULT charset=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `promo_codes`
    (
        `discount` INT(11) NOT NULL DEFAULT 10,
        `code`     VARCHAR(50) NOT NULL DEFAULT 'free10',
        `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() on
    UPDATE CURRENT_TIMESTAMP()
    )engine=innodb DEFAULT charset=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## Sample ENV file

```env
DATABASE_TYPE=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=user123
DATABASE_PASSWORD=mysecretpwd
DATABASE_NAME=myawsomeshop

API_PORT=5055
```
