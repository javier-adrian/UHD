-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2024 at 03:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `health`
--

-- --------------------------------------------------------

--
-- Table structure for table `health_declarations`
--

CREATE TABLE `health_declarations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `body_temperature` decimal(4,2) NOT NULL,
  `covid_diagnosed` enum('Yes','No') NOT NULL,
  `covid_vaccinated` enum('Yes','No') NOT NULL,
  `nationality` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_declarations`
--

INSERT INTO `health_declarations` (`id`, `name`, `gender`, `mobile_number`, `age`, `body_temperature`, `covid_diagnosed`, `covid_vaccinated`, `nationality`) VALUES
(1, 'noel', 'Male', '05556', 7, 37.00, 'No', 'Yes', 'filipino'),
(2, 'noel', 'Male', '0556', 27, 37.00, 'Yes', 'No', 'filipino'),
(3, 'Cha', 'Female', '05565', 36, 37.50, 'No', '', 'Filipion'),
(4, 'Cha2', 'Female', '05565', 36, 37.50, 'No', 'No', 'Filipino'),
(5, 'Cha3', 'Female', '05565', 36, 37.50, 'No', '', 'Filipino'),
(6, 'tutoy', 'Male', '091555', 5, 36.50, 'No', 'Yes', 'Filipino'),
(7, 'tetet', 'Female', '5465456', 3, 38.00, 'Yes', 'No', 'Filipino');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(9, 'user1', '$2y$10$KzRyJyc08m5RM85.RzAosOTz7kqNEf9Wn0eXK25kIis7DWgtNhQFy'),
(10, 'admin', '$2y$10$YzcF3Dp.BedIYpHWyVWeKOFIR1Nl.WeKqmYPDgoqcHyDahlKnLeKG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `health_declarations`
--
ALTER TABLE `health_declarations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `health_declarations`
--
ALTER TABLE `health_declarations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
