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
        `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `label` VARCHAR(50) NOT NULL DEFAULT 'product' COLLATE 'utf8mb4_general_ci',
        `price` FLOAT UNSIGNED NOT NULL DEFAULT '0',
        `description` VARCHAR(50) NOT NULL DEFAULT 'short desc' COLLATE 'utf8mb4_general_ci',
        `tags` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
        `imgs` LONGTEXT NOT NULL COLLATE 'utf8mb4_bin',
        `time` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`) USING BTREE,
        INDEX `id` (`id`) USING BTREE,
        CONSTRAINT `tags` CHECK (json_valid(`tags`)),
        CONSTRAINT `imgs` CHECK (json_valid(`imgs`))
    )

CREATE TABLE IF NOT EXISTS `promo_codes`
    (
        `discount` INT(11) NOT NULL DEFAULT '10',
        `code` VARCHAR(50) NOT NULL DEFAULT 'free10' COLLATE 'utf8mb4_general_ci',
        `time` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
    )
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
