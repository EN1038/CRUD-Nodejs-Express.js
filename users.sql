-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 12, 2024 at 01:26 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tutorials`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fisrt_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('ชาย','หญิง','ไม่ระบุ') NOT NULL,
  `interests` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fisrt_name`, `last_name`, `age`, `gender`, `interests`, `description`) VALUES
(1, 'ทดสอบ', 'สอบทด', 10, 'ชาย', 'เกม กีฬา', 'บลาๆ'),
(2, 'กระโดด', 'วิ่ง', 15, 'หญิง', 'หมอลำ', 'บลาๆ'),
(4, 'ทดสอบ', 'สอบทด', 10, 'ชาย', 'เกม กีฬา', 'บลาๆ'),
(5, 'ทด', 'ทด', 10, 'ชาย', 'เกม กีฬา', 'บลาๆ'),
(6, 'ทดแมว', 'แมวทด', 10, 'หญิง', 'เกม กีฬา', 'บลาๆ'),
(7, 'นกน้อย', 'บินนนไปมา', 21, 'หญิง', 'asdadsasds', 'Dance, Game');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
