-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 09, 2024 at 04:42 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--
CREATE DATABASE IF NOT EXISTS `task` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `task`;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `mrp` double NOT NULL DEFAULT 0,
  `srp` double NOT NULL DEFAULT 0,
  `image` varchar(250) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `mrp`, `srp`, `image`, `updated_at`) VALUES
(1, 'Repsol Moto Spot XTI 20W40 SN-50 L', 500, 250, '/uploads/file_1715187222384.png', '2024-05-08 16:53:42'),
(2, 'Repsol Moto Spot XTI 20W40 SN-52 L', 450, 200, '/uploads/file_1715187250144.png', '2024-05-08 16:54:10'),
(3, 'Repsol Moto Spot XTI 20W40 SN-53 L', 600, 350, '/uploads/file_1715187272653.JPG', '2024-05-08 16:54:32'),
(4, 'Repsol Moto Spot XTI 20W40 SN-57 L', 750, 500, '/uploads/file_1715187299955.jpg', '2024-05-08 16:54:59'),
(5, 'Repsol Moto Spoty XTE 20W40 SN-50 L', 380, 220, '/uploads/file_1715187328411.jpg', '2024-05-08 16:55:28'),
(6, 'Repsol Moto Spot XXI 20W40 SN-50 L', 450, 290, '/uploads/file_1715187356616.jpg', '2024-05-08 16:55:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
