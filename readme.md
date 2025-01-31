## Sample Database structure

```sql
-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.28-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.5.0.6677
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL DEFAULT 'product',
  `price` float unsigned NOT NULL DEFAULT 0,
  `description` varchar(50) NOT NULL DEFAULT 'short desc',
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `imgs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"{}"',
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `promo_codes` (
  `discount` int(11) NOT NULL DEFAULT 10,
  `code` varchar(50) NOT NULL DEFAULT 'free10',
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
