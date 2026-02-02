-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 13, 2026 at 08:32 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mediconnect_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('patient','medecin','admin') DEFAULT 'patient',
  `specialite` varchar(100) DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `role`, `specialite`, `date_creation`) VALUES
(1, 'SYSTEM', 'Admin', 'root@mediconnect.cg', '$2y$10$mC7GjtLpE.2vHh.Y.K3Oee1.YfFpU6UvX7z7vY.m8eE8OqO7v.B6u', 'admin', NULL, '2026-01-07 23:56:34'),
(14, 'MOUKILA', 'Edgard', 'Mouki@gmail.com', '$2y$10$34pPDVgVYKUXQyYR4fqmI.ECVIqslubTsLNzzNYLAl1eLlqUbV7rG', 'patient', NULL, '2026-01-12 18:13:30'),
(15, 'Mac', 'Doe', 'Mac@gmail.com', '$2y$10$ODU9wH3GVNes.Wrhc3vnUuBv0BNmlrJAblauxfSZd4Dz10fQWM32e', 'patient', NULL, '2026-01-12 22:17:05'),
(16, 'Let\'s', 'Play', 'Let@gmail.com', '$2y$10$aZn7/X5plbIZ43ZTFUjRcOWM8WfH3SNafLv7ZJR2neDyg1LC3aTb.', 'patient', NULL, '2026-01-12 22:33:49'),
(18, 'DOS', 'Judo', 'Dos@gmail.com', '$2y$10$xybfZahn0Hg68UuCsgfIyOWBpP8QYoCZoG1vW4QCqy6HH3PXO7LMy', 'medecin', 'Cardiologue', '2026-01-13 08:03:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
