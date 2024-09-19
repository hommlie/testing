-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 12, 2024 at 01:39 PM
-- Server version: 10.11.8-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u630860416_hommlie`
--

-- --------------------------------------------------------

--
-- Table structure for table `abouts`
--

CREATE TABLE `abouts` (
  `id` int(11) NOT NULL,
  `about_content` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `abouts`
--

INSERT INTO `abouts` (`id`, `about_content`, `created_at`, `updated_at`) VALUES
(1, '<p>Welcome to Hommlie, your trusted partner for creating a cleaner, safer, and healthier living environment. At Hommlie, we specialize in delivering top-notch services that cater to all your home maintenance needs. Whether you\'re dealing with pests, looking for a thorough cleaning, or need specialized solutions like mosquito meshing and bird control, we\'ve got you covered.</p><p>Our journey began with a simple mission: to provide reliable and effective home services that make a real difference in the lives of our customers. We understand that your home is your sanctuary, and we are committed to ensuring it remains a place of comfort and peace.</p><p>At Hommlie, we pride ourselves on our professional and dedicated team, equipped with the latest tools and techniques to handle any challenge. From pest control to cleaning services, we approach every job with the utmost care and attention to detail, ensuring your complete satisfaction.</p><p>Our services include:</p><ul><li><strong>Pest Control:</strong> Safe and efficient solutions for all types of pests, including cockroaches, ants, rodents, and more.</li><li><strong>Cockroach Control:</strong> Specialized treatments to eliminate cockroaches and prevent future infestations.</li><li><strong>Cleaning Services:</strong> Comprehensive cleaning solutions for homes, offices, and commercial spaces.</li><li><strong>Bird Control:</strong> Humane and effective methods to keep birds from nesting and causing damage to your property.</li><li><strong>Mosquito Meshing:</strong> High-quality mosquito mesh installations to keep your home protected from disease-carrying mosquitoes.</li></ul><p>What sets us apart is our commitment to quality, customer satisfaction, and eco-friendly practices. We believe in building lasting relationships with our clients through trust, transparency, and exceptional service.</p><p>Choose Hommlie for all your home service needs and experience the difference that true professionalism can make.</p>', '2021-11-29 11:12:00', '2024-09-01 06:05:33');

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `first_name`, `last_name`, `street_address`, `landmark`, `pincode`, `mobile`, `email`, `created_at`, `updated_at`) VALUES
(1, 5, 'mohammad shoaib', 'ahmed', '1, 1st Cross Rd', 'SLV bhavan', '560011', '9148635342', 'shoaib.fmp@gmail.com', '2022-05-30 09:07:12', '2022-05-30 09:07:12'),
(2, 1, 'shoaib', 'ahmed', 'BTM 2 stage dollars colony', 'SLV Bhavan', '560087', '9148635342', 'shoaib.fmp@gmail.com', '2022-05-30 14:00:45', '2022-05-30 14:00:45'),
(3, 7, 'Kundan', 'Kumar', 'btm 2 stage dollars colony', NULL, '560076', '9108650221', 'kundan.fmp@gmail.com', '2022-05-31 07:20:30', '2022-05-31 07:20:30'),
(4, 8, 'mohammad shoaib', 'ahmed', '1, 1st Cross Rd', 'SLV bhavan', '560011', '9131044631', 'mdshoaib2308@gmail.com', '2022-06-02 08:50:25', '2022-06-02 08:50:25'),
(5, 11, 'Lokesh', 'R', '#91, S Square infrastructure apartment', 'Kothanur dinne', '560078', '9742935402', 'Lokesh2star@gmail.com', '2022-06-03 11:28:29', '2022-06-03 11:28:29'),
(7, 13, 'Mahammad', 'Addur', 'Al Futah Dist, Riyadh', 'Shamsiya building', '12632', '0508030788', 'Iqbal1515@gmail.com', '2022-06-11 21:04:45', '2022-06-11 21:04:45'),
(8, 4, 'Final', 'Test', 'Street', 'Landmark', '324567', '8790876567', 'final@yopmail.com', '2022-06-20 08:26:10', '2022-06-20 08:26:10'),
(9, 16, 'Mohammed', 'Shameer', '8073 King Faisal Street\r\nAlfutah\r\nRiyadh\r\nSaudi Arabia', 'Shamsiya Building', '12632', '0566898362', 'shameer.shibu@gmail.com', '2022-06-22 17:36:45', '2022-06-22 17:36:45'),
(10, 20, 'Norain', 'Salman', 'Ak aziziya dist, Al maqrizi street building no 40, first floor, apartment no 3', NULL, '23342 jeddah', '0541448577', 'norainsalman@gmail.com', '2022-07-21 14:31:26', '2022-07-21 14:31:26'),
(11, 14, 'moosa', 'kooriyodath', 'mahmmas Al hazani', 'madain al Fahad', '22343', '0533613773', 'firos2012@gmail.com', '2022-07-29 01:08:10', '2022-07-29 01:08:10'),
(12, 25, 'Kundan', 'Kumar', 'Btm Second Stage', 'Btm', '560076', '9108650221', 'kundan.fmp@gmail.com', '2022-08-04 07:47:57', '2022-08-04 07:47:57'),
(13, 31, 'Mohammed', 'Shameer', '8073 - Shamsiah Building,\r\nApartment Number: 301. 4th floor\r\nKing Faisal Street,\r\nRiyadh', NULL, '12632', '0566898362', 'shameer.shibu@gmail.com', '2022-08-06 16:04:04', '2022-08-06 16:04:04'),
(14, 32, 'Kundan', 'Kumar', 'btm 2 stage dollars colony', 'Btm', '560076', '9108650221', 'kundan.fmp@gmail.com', '2022-08-10 14:53:34', '2022-08-10 14:53:34'),
(15, 40, 'Khaled', 'Abduljabbar', 'Dammam-Alsafa area-Saif Bin Qais street-Plus Arabia Compound', NULL, '34222', '0551342205', 'kham92@yahoo.com', '2022-08-11 12:07:11', '2022-08-11 12:07:11'),
(16, 40, 'Khaled', 'Abduljabbar', 'Dammam-Alsafa area-Saif Bin Qais street-Plus Arabia Compound', NULL, '34222', '0551342205', 'kham95@yahoo.com', '2022-08-11 12:07:50', '2022-08-11 12:07:50'),
(17, 40, 'Khaled', 'Ameen', 'Dammam-Alsafa area-Saif Bin Qais street-Plus Arabia Compound', NULL, '34222', '0551342205', 'kham95@yahoo.com', '2022-08-11 12:10:01', '2022-08-11 12:10:01'),
(18, 41, 'Khaled', 'Ameen', 'Dammam-Alsafa area-Saif Bin Qais street-Plus Arabia Compound', 'Plus Arabia Compound', '34222', '0551342205', 'kham95@yahoo.com', '2022-08-11 15:08:38', '2022-08-11 15:08:38'),
(19, 39, 'Kundan', 'Kumar', 'btm 2 stage dollars colony', 'Btm', '560076', '9108650221', 'kundan.fmp@gmail.com', '2022-08-11 15:55:11', '2022-08-11 15:55:11'),
(21, 44, 'akbar', 'badusha', 'King fahad', 'test', '12987', '0556985989', 'akbarbadusha794@gmail.com', '2022-08-13 14:11:22', '2022-08-13 14:11:22'),
(24, 51, 'dilshad', 'test', 'New York junction', NULL, '679505', '09656127678', 'msdcva786@gmail.com', '2022-08-16 14:27:17', '2022-08-16 14:27:17'),
(25, 56, 'rathaur', 'rathaur', 'Gwalior', 'Hazira', '474003', '9179518784', 'vishalrathaur56@gmail.com', '2024-06-18 06:16:57', '2024-06-18 06:16:57'),
(26, 62, 'Vishal', 'Rathaur', 'Gwalior Madhya Pradesh', 'Hazira', '474003', '9179518784', 'vishalrathaur56@gmail.com', '2024-06-20 08:25:36', '2024-06-20 08:26:18'),
(27, 56, 'vishal', 'rathaur', 'Hazira', 'Gwalior', '474003', '+919179518784', 'vishalrathaur@gmail.com', '2024-06-22 14:07:14', '2024-06-22 14:07:14'),
(28, 62, 'rathaur', 'rathaur', 'bhrekma', 'gwal', '474033', '+91917951875', 'vishalrathaurpc@gmail.com', '2024-06-25 09:31:52', '2024-06-25 09:31:52'),
(29, 62, 'vishal', 'rathaur', 'Bheekam nagar Sharma Farm road', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', '474003', '7000473898', 'vishalrathaurpc@gmail.com', '2024-07-06 21:14:33', '2024-07-06 21:14:33'),
(30, 98, 'Mohammed', 'Aslam', 'mankada via, Malappuram district', 'tmh', '679324', '9745275325', 'azlamazl.aa@gmail.com', '2024-07-07 09:02:54', '2024-07-07 09:02:54'),
(31, 101, 'Mohammed', 'Aslam', 'thennattu house, vellila p/o , mankada via, Malappuram district', 'tmh', '679324', '09745275325', 'azlamazl.aa@gmail.com', '2024-07-11 06:48:20', '2024-07-11 06:48:20'),
(32, 62, 'vishal', 'rathaur', '57, 6th Main Rd, opp. ICICI Bank, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050, India', 'pin', '560050', '9179518784', 'vishalrathaur56@gmail.com', '2024-07-17 16:17:26', '2024-07-17 16:19:14'),
(33, 98, 'test', 'test', 'J P Nagar 1st Main Rd J P Nagar Surappattu', '', '600066', '9745275325', 'test@gmail.com', '2024-07-17 11:05:32', '2024-07-17 11:05:32'),
(34, 98, 'test', 'test', 'Jay Prakash Nagar Rd No-3 Unnat Nagar Jay Prakash Nagar', 'medical shop', '400063', '7845878542', 'test@gmail.com', '2024-08-23 06:04:40', '2024-08-23 06:04:40'),
(35, 93, 'abs', 'qert', 'btm second stsge', 'vega city', '560086', '9148635342', 'unicorn4686@gmail.com', '2024-08-27 12:14:34', '2024-08-27 12:14:34');

-- --------------------------------------------------------

--
-- Table structure for table `allocations`
--

CREATE TABLE `allocations` (
  `id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `emp_timeslots` int(11) NOT NULL,
  `emp_role` int(11) NOT NULL,
  `emp_location` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `allocations`
--

INSERT INTO `allocations` (`id`, `emp_id`, `emp_timeslots`, `emp_role`, `emp_location`, `status`, `updated_at`, `created_at`) VALUES
(1, 2, 3, 1, 14, 1, NULL, '2024-06-24 12:36:23');

-- --------------------------------------------------------

--
-- Table structure for table `AssignedInventory`
--

CREATE TABLE `AssignedInventory` (
  `id` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `empName` varchar(200) DEFAULT NULL,
  `category` varchar(150) NOT NULL,
  `subCategory` varchar(150) NOT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `price` varchar(50) DEFAULT NULL,
  `is_verified` int(11) DEFAULT 2,
  `status` int(11) NOT NULL DEFAULT 1,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `AssignedInventory`
--

INSERT INTO `AssignedInventory` (`id`, `empId`, `empName`, `category`, `subCategory`, `quantity`, `type`, `price`, `is_verified`, `status`, `updated_at`, `created_at`) VALUES
(1, 30, NULL, 'Kits', 'Pest Control Kits', '2', 'pkts', '600', 1, 1, '2024-08-21 11:53:33', '2024-08-16 19:05:46'),
(2, 30, NULL, 'test cat', 'test sub', '1', 'ML', '200', 1, 1, '2024-08-20 19:07:31', '2024-08-16 19:17:03'),
(3, 30, NULL, 'Cockroach Control', 'Cockroach Spray', '20', 'L', '3040', 1, 1, '2024-08-23 12:50:39', '2024-08-16 19:19:27'),
(4, 30, NULL, 'test cat', 'test sub', '5', 'ML', '1000', 1, 1, '2024-08-20 19:07:19', '2024-08-16 19:21:30'),
(5, 27, NULL, 'test cat', 'test sub', '10', 'ML', '2000', NULL, 1, '2024-08-16 19:25:59', '2024-08-16 19:25:59'),
(6, 29, NULL, 'Cockroach Control', 'Cockroach Spray', '500', 'L', '76000', NULL, 1, '2024-08-16 19:26:48', '2024-08-16 19:26:48'),
(7, 29, NULL, 'test cat', 'test sub', '5', 'ML', '1000', NULL, 1, '2024-08-16 19:31:59', '2024-08-16 19:31:59'),
(8, 27, NULL, 'Cockroach Control', 'Cockroach Spray', '5', 'L', '760', NULL, 1, '2024-08-16 19:55:48', '2024-08-16 19:55:48'),
(9, 28, NULL, 'test cat', 'test sub', '5', 'ML', '1000', NULL, 1, '2024-08-16 20:09:24', '2024-08-16 20:09:24'),
(10, 25, NULL, 'test cat', 'test sub', '1', 'ML', '200', NULL, 1, '2024-08-16 20:16:30', '2024-08-16 20:16:30'),
(11, 28, NULL, 'Cockroach Control', 'Cockroach Spray', '5', 'L', '760', NULL, 1, '2024-08-16 20:17:05', '2024-08-16 20:17:05'),
(12, 30, 'Aslam', 'Cockroach Control', 'Cockroach Spray', '5', 'L', '760', 1, 1, '2024-08-20 19:05:56', '2024-08-16 20:21:20'),
(13, 30, 'Aslam', 'Cockroach Control', 'Cockroach Spray', '50', 'L', '7600', 1, 1, '2024-08-20 19:04:48', '2024-08-16 20:24:59'),
(14, 30, 'Vishal Rathaur', 'test cat', 'test sub', '1', 'ML', '200', 1, 1, '2024-08-20 19:03:53', '2024-08-17 13:01:49'),
(15, 27, 'Vishal Rathaur', 'test cat', 'test sub', '0', 'ML', '0', 2, 1, '2024-09-05 06:56:46', '2024-09-04 10:08:26'),
(16, 30, 'Vishal Rathaur', 'test cat', 'testing', '2', 'pkts', '198', 1, 1, '2024-09-05 06:57:44', '2024-09-05 12:25:15'),
(17, 43, 'New EMP', '1', 'test cat', '20', '50', '0', 2, 1, '2024-09-06 11:35:30', '2024-09-06 11:35:30'),
(18, 30, 'Vishal Rathaur', '1', 'test cat', '5', '30', '0', 2, 1, '2024-09-06 11:36:14', '2024-09-06 11:36:14');

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `attribute` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `attribute`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Package', '1', '2022-05-30 16:38:03', '2024-06-18 08:43:55'),
(4, 'Add On', '1', '2024-06-20 18:20:13', '2024-06-20 18:20:13'),
(5, 'BHK', '1', NULL, NULL),
(7, 'Size', '1', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `account_type` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `routing_number` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `vendor_id`, `bank_name`, `account_type`, `account_number`, `routing_number`, `created_at`, `updated_at`) VALUES
(1, 0, 'IDBI', 'CURRENT', '23222885858995008345', 'IFSC2203', '2022-05-30 06:03:04', '2022-05-30 06:03:04'),
(2, 6, 'XXXX', 'XXXX', 'XXXX', 'XXXX', '2024-08-15 09:30:20', '2024-08-15 15:00:20');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `image` varchar(191) NOT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `type` varchar(191) DEFAULT NULL,
  `positions` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `vendor_id`, `image`, `cat_id`, `product_id`, `type`, `positions`, `created_at`, `updated_at`) VALUES
(1, NULL, 'topbanner-66718deea2d62.png', NULL, 759, 'product', 'top', '2021-05-25 11:57:56', '2024-06-18 13:38:54'),
(3, NULL, 'topbanner-6669efb669576.png', NULL, NULL, 'product', 'top', '2021-05-26 14:44:27', '2024-06-12 18:57:58'),
(4, NULL, 'topbanner-66718c3d7dd20.png', NULL, NULL, 'product', 'top', '2021-05-26 14:44:37', '2024-06-18 13:31:41'),
(5, NULL, 'largebanner-6669ef75ea48f.png', 18, NULL, 'category', 'large', '2021-05-26 14:44:37', '2024-06-12 18:56:53'),
(6, NULL, 'leftbanner-66718d810b51f.png', 18, 759, 'category', 'left', '2021-05-26 14:44:37', '2024-06-18 13:37:06'),
(7, NULL, 'banner-66718dbf019c7.png', NULL, 759, 'product', 'bottom', '2021-05-25 11:57:56', '2024-06-18 13:38:07'),
(9, NULL, 'banner-66718d4320ff9.png', 18, NULL, 'category', 'bottom', '2021-05-26 14:44:37', '2024-06-18 13:36:03'),
(10, NULL, 'popupbanner-6669efe3e9a8c.jpeg', NULL, NULL, 'category', 'popup', '2021-05-26 14:44:37', '2024-06-12 18:58:43'),
(13, 6, 'storebanner-66bdcaacde5e1.png', NULL, NULL, NULL, 'store', '2024-08-15 15:00:20', '2024-08-15 15:00:20');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `booking_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_name` varchar(191) NOT NULL,
  `icon` varchar(191) NOT NULL DEFAULT 'default.png',
  `status` varchar(191) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `brand_name`, `icon`, `status`, `created_at`, `updated_at`) VALUES
(2, 'mno', 'brand-63ba4df6b4869.jpg', '1', '2022-06-02 11:38:53', '2024-06-04 13:22:42'),
(3, 'pqr', 'brand-63ba4dee7e3b1.jpg', '1', '2022-08-26 22:15:13', '2024-06-04 13:22:31'),
(4, 'abc', 'brand-63ba4e12d67e7.jpg', '1', '2022-08-26 22:19:48', '2024-06-04 13:21:57'),
(6, 'xyz', 'brand-63ba4dcd6237b.jpg', '1', '2022-08-26 22:24:30', '2024-06-04 13:21:35');

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `applyingFor` varchar(255) NOT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `name`, `email`, `applyingFor`, `resume`, `message`, `created_at`, `updated_at`) VALUES
(1, 'User', 'test@gmail.com', 'engineer', 'storage\\app\\public\\pdfs\\resume\\resume-1723356506429-48165347.pdf', 'test application', '2024-08-11 06:08:26', '2024-08-11 06:08:26');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `product_name` varchar(191) NOT NULL,
  `slug` text DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` varchar(191) NOT NULL,
  `attribute` varchar(255) DEFAULT NULL,
  `variation` varchar(191) DEFAULT NULL,
  `variations_sku` varchar(50) DEFAULT NULL,
  `tax` varchar(255) DEFAULT NULL,
  `shipping_cost` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `vendor_id`, `product_name`, `slug`, `image`, `qty`, `price`, `attribute`, `variation`, `variations_sku`, `tax`, `shipping_cost`, `created_at`, `updated_at`) VALUES
(239, 93, 765, 6, 'Honey bee removals', NULL, 'product-665f53c10b326.png', 1, '0.0', NULL, NULL, '', '1', '0.00', '2024-06-26 22:41:55', '2024-06-26 22:41:55'),
(327, 93, 762, 6, 'cockroach control services1', NULL, 'product-666ed916d1001.png', 1, '0.0', NULL, NULL, NULL, '1', '0.00', '2024-07-10 22:59:47', '2024-07-10 22:59:47'),
(339, 101, 769, 6, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '7752', NULL, 'intense, 2 BHK', NULL, '152', '0', '2024-07-12 05:11:29', '2024-07-12 05:11:29'),
(397, 11, 761, 6, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, 'OneTime', NULL, '1', '0.00', '2024-08-28 08:02:20', '2024-08-28 08:02:20'),
(418, 94, 761, 6, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '7400', NULL, 'AMC, 2 BHK', NULL, '148', '0', '2024-08-30 17:53:46', '2024-08-30 17:53:46'),
(431, 62, 761, 6, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '5600.0', NULL, 'OneTime,1 BHK', NULL, '112.0', '0.00', '2024-08-31 07:38:13', '2024-08-31 07:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(191) NOT NULL,
  `icon` varchar(191) NOT NULL DEFAULT 'default.png',
  `web_icon` varchar(191) NOT NULL,
  `video` varchar(250) DEFAULT NULL,
  `thumbnail` varchar(250) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT '1',
  `slug` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `icon`, `web_icon`, `video`, `thumbnail`, `status`, `slug`, `created_at`, `updated_at`) VALUES
(18, 'Pest Control', 'category-666de34ece3c9.png', 'webcategory-66bef621ea644.png', NULL, NULL, '1', 'pest-control', '2024-06-01 11:11:36', '2024-08-16 12:18:01'),
(19, 'Home Cleaning', 'category-666de359ae82d.png', 'webcategory-66bef61633d81.png', NULL, NULL, '1', 'home-cleaning', '2024-06-01 11:12:39', '2024-08-16 12:17:50'),
(20, 'Painting Renovation', 'category-666de363a9483.png', 'webcategory-668eca5117210.png', NULL, NULL, '2', 'painting-renovation', '2024-06-01 11:14:11', '2024-08-16 12:04:53'),
(21, 'Beauty Salon', 'category-666de2bd8fbf7.png', 'webcategory-668eca607848a.png', NULL, NULL, '2', 'beauty-salon', '2024-06-01 11:14:37', '2024-08-16 12:04:50'),
(22, 'AC Repairing', 'category-666de30bea1f0.png', 'webcategory-668eca8f475ec.png', NULL, NULL, '2', 'ac-repairing', '2024-06-01 11:15:08', '2024-08-16 12:04:04'),
(23, 'Plumber', 'category-666de3014ecdb.png', 'webcategory-668ecab35e862.png', NULL, NULL, '2', 'plumber', '2024-06-01 11:15:36', '2024-08-16 12:04:00'),
(24, 'Other', 'category-665b02e8c22ac.jpg', '', NULL, NULL, '2', 'other', '2024-06-01 11:15:52', '2024-08-15 14:33:03'),
(27, 'Test', 'category-66bdc8db086c3.png', 'webcategory-66bdc8db1fdc2.png', NULL, NULL, '2', 'test', '2024-08-15 14:52:35', '2024-08-16 10:26:48'),
(28, 'Bird Control', 'category-66bef1dccd573.png', 'webcategory-66bef6d650d20.png', NULL, NULL, '1', 'bird-control', '2024-08-16 11:59:48', '2024-08-16 12:21:02'),
(29, 'Mosquito Control', 'category-66bef2205ff7b.png', 'webcategory-66bef5fcc6a5b.png', NULL, NULL, '1', 'mosquito-control', '2024-08-16 12:00:56', '2024-08-16 12:17:24'),
(30, 'Invisible Netting', 'category-66bef2a55f70d.png', 'webcategory-66bef606c6c3e.png', NULL, NULL, '1', 'invisible-netting', '2024-08-16 12:03:09', '2024-08-16 12:17:34'),
(31, 'Sanitization', 'category-66bef3f758d56.png', 'webcategory-66bef4abaa6ab.png', NULL, NULL, '1', 'sanitization', '2024-08-16 12:03:55', '2024-08-16 12:11:47'),
(38, 'Shop Now', 'icon-66d1e42486fe8.jpeg', 'webicon-66d1e4248711d.jpeg', 'video-66d1e424872ec.mp4', 'thumbnail-66d1e4248722e.jpeg', '1', 'shop-now', '2024-08-30 20:54:20', '2024-08-30 20:56:21'),
(39, 'test Category', 'icon-66d31acd2074c.jpeg', 'webicon-66d31acd208ee.jpeg', 'video-66d31acd24f73.mp4', 'thumbnail-66d31acd20a64.jpeg', '1', 'test-category', '2024-08-31 13:29:49', '2024-08-31 13:29:49'),
(40, 'test', 'icon-66d563c5d5022.jpeg', 'webicon-66d563c5d523e.jpeg', 'video-66d563c5d5bab.mp4', 'thumbnail-66d563c5d5441.jpeg', '1', '66d563c643462-test', '2024-09-02 07:05:42', '2024-09-02 07:05:42'),
(41, 'New Test Category', 'icon-66d6e8541526e.jpg', 'webicon-66d6e85415480.jpg', 'video-66d6e854156e3.mp4', 'thumbnail-66d6e854155b3.jpg', '1', 'new-test-category', '2024-09-03 10:43:32', '2024-09-03 10:43:32'),
(42, 'test', 'icon-66daeeb6980f9.jpeg', 'webicon-66daeeb698230.jpeg', 'NA', 'NA', '1', '66daeeb69852f-test', '2024-09-06 11:59:50', '2024-09-06 11:59:50');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coupon_name` varchar(191) NOT NULL,
  `type` int(11) NOT NULL,
  `percentage` varchar(191) DEFAULT NULL,
  `amount` varchar(191) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `times` int(11) DEFAULT NULL,
  `start_date` varchar(191) DEFAULT NULL,
  `end_date` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `coupon_name`, `type`, `percentage`, `amount`, `quantity`, `times`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`) VALUES
(8, 'ABDUL80', 0, '30', NULL, 0, NULL, '2023-01-22', '2023-01-28', '1', '2023-01-22 15:15:50', '2023-01-22 15:15:50'),
(9, 'HOMMLIE50', 0, '25', '500', 3, 5, '2023-01-22', '2023-01-28', '1', '2023-01-22 15:15:50', '2023-01-22 15:15:50'),
(10, 'FLAT75', 0, '65', '700', 4, 10, '2023-01-22', '2023-01-28', '1', '2023-01-22 15:15:50', '2023-01-22 15:15:50'),
(11, 'FLASH20', 0, '35', '600', 5, 15, '2023-01-22', '2023-01-28', '1', '2023-01-22 15:15:50', '2023-01-22 15:15:50'),
(12, 'DEAL70', 0, '45', '900', 7, 10, '2023-01-22', '2023-01-28', '1', '2023-01-22 15:15:50', '2023-01-22 15:15:50'),
(13, 'OFFER70', 0, '15', '200', 5, 15, '2023-01-22', '2023-01-28', '1', '2023-01-22 15:15:50', '2023-01-22 15:15:50'),
(14, 'FIRST70', 0, '', '900', 9, 10, '2023-01-22', '2024-10-28', '1', '2023-01-22 15:15:50', '2023-01-22 15:15:50'),
(15, 'FREE90', 0, '35', '', 5, 10, '2023-01-22', '2024-10-28', '1', '2023-01-22 15:15:50', '2023-01-22 15:15:50'),
(16, 'TESTCoupon', 0, NULL, NULL, 0, NULL, '2024-08-30', '2024-08-22', '1', '2024-08-31 12:06:12', '2024-08-31 12:06:12'),
(17, 'TESTCOUPON', 0, NULL, NULL, 0, NULL, '2024-09-06', '2024-09-13', '1', '2024-09-05 06:07:27', '2024-09-05 06:07:27');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `mobile` varchar(191) NOT NULL,
  `password` varchar(191) DEFAULT NULL,
  `profile_pic` varchar(191) NOT NULL DEFAULT 'default.png',
  `store_address` longtext DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `notification_status` int(11) NOT NULL DEFAULT 1,
  `type` int(11) NOT NULL DEFAULT 2,
  `google_id` varchar(191) DEFAULT NULL,
  `facebook_id` varchar(191) DEFAULT NULL,
  `login_type` varchar(191) NOT NULL,
  `referral_code` varchar(191) DEFAULT NULL,
  `referred_id` varchar(250) DEFAULT NULL,
  `referral_amount` varchar(191) DEFAULT NULL,
  `wallet` varchar(191) NOT NULL DEFAULT '0',
  `token` text DEFAULT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `is_verified` int(11) NOT NULL,
  `is_available` int(11) NOT NULL DEFAULT 1,
  `return_policies` longtext DEFAULT NULL,
  `facebook` text DEFAULT NULL,
  `instagram` text DEFAULT NULL,
  `twitter` text DEFAULT NULL,
  `google` text DEFAULT NULL,
  `youtube` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `mobile`, `password`, `profile_pic`, `store_address`, `status`, `notification_status`, `type`, `google_id`, `facebook_id`, `login_type`, `referral_code`, `referred_id`, `referral_amount`, `wallet`, `token`, `otp`, `is_verified`, `is_available`, `return_policies`, `facebook`, `instagram`, `twitter`, `google`, `youtube`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', '+919148635342', '$2y$10$AG/qbkVqfF91k2Z0RV382uxGLCpoahaQu4oHFPk1VN3R1PWSAn5SK', 'default.png', NULL, 1, 1, 1, '', '', '', '', NULL, NULL, '0', '', '139564', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-13 00:45:55', '2021-12-14 18:51:52'),
(6, 'Hommlie', 'info@gmail.com', '+966-554302222', '$2y$10$nuSj9XxX0.VgTewX4wFCdORW.O9ZpFidM8aWWsQSz1SicaFxfcDA2', 'profile-63093ccae560b.png', 'Bangalore', 1, 1, 3, NULL, NULL, 'email', 'oXnxVOl72E', NULL, NULL, '1073.38', '', NULL, 1, 1, 'Enjoy shopping on hommlie.com with these great return policy features:\r\n\r\n\r\n\r\n\r\n7 Days Returns\r\n\r\nYou have 7 days to make a refund request after your order has been delivered (from the date of receipt).\r\n\r\nTo be eligible for a return, your item must be unused and in the same condition that you received it.\r\n\r\nYour item must be in the original packaging.\r\n\r\nYour item needs to have a receipt or proof of purchase.\r\n\r\nNote:- All customized articles are not entitled to any exchange or refund (that includes sizes-XS, 3XL, and bigger sizes, Length 60 inches or more).\r\n\r\nNo Exchange or refund is applicable on customized articles. (If you request any change in the color/ fabric/ design of the garment.)\r\n\r\nNo exchange or refund shall be accepted on accessories.\r\n\r\nFor a refund or exchange, the customer has to pay the courier charges and send the article back to us.\r\n\r\n \r\n\r\nEasy and Free Returns\r\n\r\nYou can return most of the products you have bought (except a few - Please cheque FAQ).\r\n\r\nOnce we receive your item, we will inspect it and notify you that we have received your returned\r\n\r\nitem. We will immediately notify you of the status of your refund after inspecting the item.\r\n\r\nIf your return is approved, we will initiate a refund to your credit card (or original method of payment).\r\n\r\nYou will receive the credit within a certain amount of days, depending on your card issuer’s policies.\r\n\r\nFor a refund or exchange, the customer has to pay the courier charges and send the article back to us. Refund or exchange will be initiated only after we receive the item back and if the condition of the item is perfectly all right.\r\n\r\nNote:- All customized articles are not entitled to any exchange or refund.\r\n\r\n \r\n\r\nIf the item you have received is damaged, defective, or not as described on the website, you will receive a full refund.\r\n\r\n\r\nWe shall need a box/parcel opening video proof for the same.\r\n\r\nAuthenticity Guaranteed\r\n\r\nIf your purchase is found to be counterfeit, you will receive a full refund along with any shipping fees paid.\r\n\r\n \r\n\r\nShipping\r\n\r\nYou will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non­refundable.\r\n\r\nIf you receive a refund, the cost of return shipping will be deducted from your refund.\r\n\r\n \r\n\r\nHow does Return Policy Work?\r\n\r\n\r\n\r\n\r\nInitiate A Return\r\n\r\nCall our customer toll free number  920033709 or return via Email:- info@ikksa.com,  / My Accounts/Help & Contact Us\r\n\r\n\r\n\r\n\r\nReturn the Item\r\n\r\nPack the item in its original state and packaging. Contact any local courier service or Indian Post office and send it back to us (Customer bears the return expenses). Make sure that all the tags are intact. Send us the tracking details through email or WhatsApp.\r\n\r\n\r\n\r\n\r\nRefund Processed\r\n\r\nOnce we receive your item, we will inspect it and notify you that we have received your returned\r\n\r\nitem. We will immediately notify you of the status of your refund after inspecting the item.\r\n\r\nIf your return is approved, we will initiate a refund to your credit card (or original method of payment).\r\n\r\nYou will receive the credit within a certain amount of days, depending on your card issuer’s policies.\r\n\r\nGeneral Policy:\r\n\r\nAlways write ‘not for sale’ or ‘Defective good return’ on the cover while sending us the products.\r\n\r\nPlease inform us about the returning of the product to us on info@ikksa.com or by calling us on 920033709 mentioning your ORDER ID.\r\n\r\nThe products being returned should be returned in the ORIGINAL CONDITION along with TAGS and PACKING.\r\n\r\nIf upon receipt, we found that the product is USED, WASHED, ALTERED, or is not in ORIGINAL FORM, no refund or exchange or return is accepted.\r\n\r\nReturn of goods that are custom-made, pre-stitched, or prepared as per your specific order will not be accepted.', NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-30 05:57:38', '2024-08-15 14:59:51'),
(9, 'lokesh', 'lokeshyr17@gmail.com', '+919742935402', '$2y$10$9soSklp8/5rtRIwBgsEUY.TpHb39VlHqhrufCHaMJXgGg7ngvxN1O', 'default.png', NULL, 1, 1, 3, NULL, NULL, 'email', 'sVBiWJpNLG', NULL, NULL, '0', '', '843421', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-02 12:14:18', '2022-06-02 12:14:18'),
(11, 'Arman Shah', 'lokesh2star@gmail.com', '+919108650221', '$2y$10$nuSj9XxX0.VgTewX4wFCdORW.O9ZpFidM8aWWsQSz1SicaFxfcDA2', 'profile-6694506380b0e.jpeg', NULL, 1, 1, 2, NULL, NULL, 'email', 'D2BbPXAEpg', NULL, NULL, '0', 'vishal', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-03 11:19:16', '2024-08-08 17:09:30'),
(14, 'Moosa kooriyodath', 'firos2012@gmail.com', '+966533613773', '$2y$10$T7rNzCsTbkLJHlJlmL2VhuzYUj5/4XWcbZA9Bl/DLNrdWP6Kda11S', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'email', 'auZjYpgJT4', NULL, NULL, '0', 'cxg2DK7-TVOAOKN_mW3lTh:APA91bEg3xoWXiTNFyFlXGVKtaVgMKt6rWdFM2UsUA7Wz0w0VRAuSBRzdl_hRjPDWB649Tnh89yKKlqHudQa7R1shuJNXvfzHYR1qjsitXFx_QP_xMlGGG0gtBtA3jZAB_BQW2jfhA5i', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-17 08:13:59', '2022-07-29 05:47:51'),
(15, 'Ayshia jaliya', 'Aishajaliya.jaleel@gmail.com', '+918137999362', '$2y$10$PGCSfbUWF6mCBHtjVBw49e7CCvvPQCjEll9WajuUA1PwSL6D4.yL2', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'email', 'D1Nx06dXmA', NULL, NULL, '0', 'fU9S9-3MT1eQNwFa1fhMdl:APA91bF7XGry4rLc-XnNKs0cubvGUH17FIpkSJ4OWXi6gbQasrToJ6UBRsdshiipkAabWzsciFSaAsK9aX7fFKnXpu4gnx0CHQX8xaLoBSuBB-i3-8GLxR70E68JJ4kAHRvXctjDn-XD', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-20 15:58:37', '2022-06-23 01:26:11'),
(20, 'Norain', 'norainsalman@gmail.com', '+966541448577', '$2y$10$KAfWyjBocxthTfxwh2p8M.mv7ydmeep27t0mJvwQ2/gX/fyYAuguO', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'email', 'rU26giLMFV', NULL, NULL, '0', 'd1XfG3hMSNOJTf6w-5yDre:APA91bFUQIl4g7v09T-VkQikf2BEEEvYlTai4YUij2v6eGyXU3jxPUcFBOxsCDzhNp6Urc-GZLAH93QF-HwaBnrL2h96caGYG-VDuPvo49XseBRBe9YQi2knzM3vHlaZ8uuKF2zMyIK6', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-17 21:38:57', '2022-07-18 09:26:17'),
(31, 'Mohammed Shameer', 'shameer.shibu@gmail.com', '+966566898362', '$2y$10$lqjdgWF0IhBjPMvqG7l3Pe1vZAu/l4.G.LRsgonC91QTAA3bYeyiS', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'email', '2l8XBxQSio', NULL, NULL, '217.35', '', '927105', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 16:00:51', '2022-08-24 12:12:14'),
(37, 'koko', 'aa@gmail.com', '+9669131044636', '$2y$10$AG/qbkVqfF91k2Z0RV382uxGLCpoahaQu4oHFPk1VN3R1PWSAn5SK', 'default.png', NULL, 1, 1, 3, NULL, NULL, 'email', 'yxX7rjZslU', NULL, NULL, '0', 'eodQAjuLdEDgvYjlXznykq:APA91bGntYZAopHQjonW2nVpD89_KoiMPeyWdmyRR7AZ4zOEU8srNYOjF4tvpKMZxH5zRRhipxa0YGmN8g_qpYWjgwWVlz42PJGJesTlpKL-xowZcBNtqacYL-ZOK8gXzu1-tmiumuod', '188549', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-07 14:32:45', '2022-08-07 14:32:45'),
(44, 'akbar badusha', 'akbarbadusha794@gmail.com', '0556985989', '$2y$10$FN9AYd.nJNm5gzkP4PAZRuOGPHDhxIYWUsacP8UE.LmvS6mKCarnq', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'email', 'dMX5moKAHf', NULL, NULL, '0', 'fP_QeHVGQFOCiTuwrc6CCi:APA91bFd8Dy_UU3soGGGkgZKjMrHlL0QK2amvNaTLSo_lZuace7k0LpEtZDIIB6pB_1IGMyN1DyYzevMG0L9KutSUrDFUUTeO3AUZPpe6kY_XHlFq-YuXKcvlx2jBGoJky1Hf3byZGPj', '376497', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-13 14:04:04', '2022-08-13 14:04:04'),
(47, 'Yadu', 'yadu.s.das@gmail.com', '+919633310185', '$2y$10$CQ4oi/tp/DzzLP9OdbrZqurfHLfbOajrOceZAvnhvbdlZMn6/7ovK', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'email', '35lAEbj7wR', NULL, NULL, '0', '', '446131', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-15 04:03:42', '2022-08-15 04:03:42'),
(48, 'Mohammed Shameer', 'shameer@fourplustech.com.sa', '+966123456789', '$2y$10$JyUspY/5WkMBn.cItJLlTuPTNtpV6Zc/uaPd78qgDC9i5itTnPWl.', 'default.png', NULL, 1, 1, 3, NULL, NULL, 'email', 'nlOZKBd9YG', NULL, NULL, '0', '', '506593', 0, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-16 08:36:51', '2022-08-16 08:36:51'),
(51, 'dilshad', 'msdcva786@gmail.com', '+9666282572253', '$2y$10$gQaf4Zet3o2HhON.J64I3eKW3wk6kL.bETfDola4hkBYOvFpvCw7y', 'default.png', NULL, 1, 1, 3, NULL, NULL, 'email', 'UZAD5q7kSn', NULL, NULL, '0', '', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-16 14:20:12', '2022-08-16 14:21:20'),
(62, 'Vishal Rathaur', '', '+919179518784', '', 'profile-667a53c3788a7.jpg', NULL, 1, 1, 2, NULL, NULL, 'mobile', '76bIvyojga', NULL, NULL, '0', 'vishal', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-18 16:15:20', '2024-08-27 06:01:14'),
(89, 'User', NULL, '+919179518454', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'xj2ua5Mo1s', NULL, NULL, '0', '783rmr3it73rm', '6023', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-22 11:16:13', '2024-06-22 11:16:13'),
(90, 'User', NULL, '+919179818454', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', '8RNhaKdpcL', NULL, NULL, '0', '783rmr3it73rm', '5224', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-22 11:16:39', '2024-07-02 12:15:11'),
(91, 'User', NULL, '+919179518799', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', '6BOeXYtjr1', NULL, NULL, '0', '783m', '9993', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-22 11:19:05', '2024-06-22 11:19:05'),
(92, 'User', NULL, '+919179218454', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', '4yodeWBJtI', NULL, NULL, '0', '783rmr3it73rm', '3267', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-22 11:27:01', '2024-06-22 11:27:01'),
(93, 'User', NULL, '+918962222948', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'J9egK4wYOx', NULL, NULL, '0', 'ddhfFfF7r0u7g1pQOMgIAX:APA91bEzBXAhU2czELaaDIm6QqXbN-wnE5mDyD8BaBAPvi04R-CL1CODxdA-sjMB-qeP9_OGrOuj6TXIaUEhsbpKYgWfYacUvA9edptjXkeRKsKadD2VZTWdlSyjmnZkLDU47x6j5dcI', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-26 22:40:20', '2024-08-27 06:43:22'),
(94, 'User', NULL, '+919985951017', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'WK3qO1evpb', NULL, NULL, '0', 'vishal', '6085', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-02 13:09:00', '2024-07-02 13:10:22'),
(95, 'User', NULL, '+919985951027', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'fIlpgKeODx', NULL, NULL, '0', 'vishal', '9354', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-02 13:10:34', '2024-07-02 13:10:34'),
(96, 'User', NULL, '+919179518787', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'AsZgdrcPxS', NULL, NULL, '0', 'vishal', '3975', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-02 13:57:28', '2024-07-02 13:57:28'),
(97, 'User', NULL, '+919179518785', '', 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'Nn4zRJrTm8', NULL, NULL, '0', 'vishal', '9559', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-06 20:06:49', '2024-07-16 23:54:46'),
(98, 'Aslam', 'azlamazl.aa@gmail.com', '+919745275325', NULL, 'IMG_2768.jpg', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'HM541I9Y', '', NULL, '0', NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-07 08:41:03', '2024-08-31 06:18:45'),
(99, 'User', NULL, '+919638527410', NULL, 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'KBSd1MIbGR', NULL, NULL, '0', 'vishal', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 23:08:34', '2024-07-10 23:08:50'),
(100, 'User', NULL, '+911234567890', NULL, 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'RG70qzWJos', NULL, NULL, '0', 'vishal', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-11 00:17:10', '2024-07-11 00:17:22'),
(101, 'User', NULL, '+919743881444', NULL, 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', NULL, NULL, NULL, '0', NULL, '7070', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-11 06:44:56', '2024-07-17 17:26:53'),
(102, 'User', NULL, '+919179518781', NULL, 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'HrCTzdRXgj', NULL, NULL, '0', 'vishal', '9214', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-16 23:55:02', '2024-07-16 23:55:02'),
(103, 'User', NULL, '+919148635341', NULL, 'default.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', '6bpT2jHisK', NULL, NULL, '0', 'vishal', '7636', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-01 02:38:03', '2024-08-01 02:38:03'),
(108, 'User1', 'user1@gmail.com', '+918431918562', NULL, 'profile_pic-1725005009800-420473798.png', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'HMU1JD', '98', NULL, '0', NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 07:58:37', '2024-08-30 08:04:15'),
(109, 'Abhijith ', 'abhijithboxer07@gmail.com', '+919946757406', NULL, 'profile_pic-1725095170166-750827492.jpg', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'HMX44P', NULL, NULL, '0', NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-31 08:17:32', '2024-08-31 09:06:10'),
(110, 'NIRMAL K MOHAN ', 'nirmalmohank@gmail.com', '+917907732934', NULL, 'profile_pic-1725098018242-730940210.jpg', NULL, 1, 1, 2, NULL, NULL, 'mobile', 'HM2SY8', NULL, NULL, '0', NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-31 09:50:51', '2024-08-31 09:53:38'),
(117, 'NIRMAL K MOHAN ', 'nirmalmonk@gmail.com', '9.18E+11', 'NULL', 'default.png', 'NULL', 1, 1, 2, 'NULL', 'NULL', 'admin', 'NULL', NULL, 'NULL', '0', 'NULL', 'NULL', 1, 1, NULL, 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', NULL, '2024-09-05 10:48:00', '2024-09-05 10:48:00'),
(118, 'pallavi', 'pall@gmail.com', '6.30E+09', 'NULL', 'default.png', 'NULL', 1, 1, 2, 'NULL', 'NULL', 'admin', 'NULL', NULL, 'NULL', '0', 'NULL', 'NULL', 1, 1, NULL, 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', NULL, '2024-09-05 10:50:02', '2024-09-05 10:50:02'),
(119, 'venky', 'krishna@gmail.com', '9.99E+09', 'NULL', 'default.png', 'NULL', 1, 1, 2, 'NULL', 'NULL', 'admin', 'NULL', NULL, 'NULL', '0', 'NULL', 'NULL', 1, 1, NULL, 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', NULL, '2024-09-05 10:50:02', '2024-09-05 10:50:02'),
(130, 'pallavi', 'pall12@gmail.com', '63000000000', 'NULL', 'default.png', 'NULL', 1, 1, 2, 'NULL', 'NULL', 'admin', 'NULL', NULL, 'NULL', '0', 'NULL', 'NULL', 1, 1, NULL, 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', NULL, '2024-09-05 13:42:08', '2024-09-05 13:42:08'),
(131, 'venky', 'krishn12a@gmail.com', '99900000000', 'NULL', 'default.png', 'NULL', 1, 1, 2, 'NULL', 'NULL', 'admin', 'NULL', NULL, 'NULL', '0', 'NULL', 'NULL', 1, 1, NULL, 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', NULL, '2024-09-05 13:42:08', '2024-09-05 13:42:08');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `emp_id` varchar(50) NOT NULL,
  `emp_name` varchar(100) NOT NULL,
  `emp_phone` varchar(15) NOT NULL,
  `emp_email` varchar(100) NOT NULL,
  `emp_address` longtext NOT NULL,
  `emp_photo` varchar(100) NOT NULL DEFAULT 'profile.png',
  `emp_category` varchar(50) DEFAULT NULL,
  `skills` longtext DEFAULT NULL,
  `bank_name` varchar(100) NOT NULL,
  `bank_branch` varchar(100) NOT NULL,
  `bank_ifsc` varchar(20) NOT NULL,
  `bank_acc_no` varchar(50) NOT NULL,
  `name_as_per_bank` varchar(100) NOT NULL,
  `bank_book_image` varchar(100) NOT NULL,
  `pan_no` varchar(20) NOT NULL,
  `pan_image` varchar(100) NOT NULL,
  `aadhar_no` varchar(20) NOT NULL,
  `aadhar_image` varchar(100) NOT NULL,
  `otp` varchar(15) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `timeslot` varchar(50) DEFAULT NULL,
  `token` varchar(150) DEFAULT NULL,
  `longitude` varchar(150) NOT NULL,
  `latitude` varchar(150) NOT NULL,
  `battery` varchar(100) NOT NULL,
  `device` varchar(150) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT 0,
  `is_active_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `logout_at` varchar(155) DEFAULT NULL,
  `is_verified` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1-Active,0-Inactive',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `emp_id`, `emp_name`, `emp_phone`, `emp_email`, `emp_address`, `emp_photo`, `emp_category`, `skills`, `bank_name`, `bank_branch`, `bank_ifsc`, `bank_acc_no`, `name_as_per_bank`, `bank_book_image`, `pan_no`, `pan_image`, `aadhar_no`, `aadhar_image`, `otp`, `role`, `location`, `timeslot`, `token`, `longitude`, `latitude`, `battery`, `device`, `is_active`, `is_active_at`, `logout_at`, `is_verified`, `status`, `created_at`, `updated_at`) VALUES
(1, 'EMP9648276766', 'krishna1', '9985956211', 'krishna1@gmail.com', 'Tirupati1, Andhra Pradesh', 'profile666890c1932f1.png', '41,39,38,30,23', NULL, 'Union Bank of India', 'Tirupati, Ramanuja Circle', 'UBIN0809919', '099110100144630', 'krishna1', 'bank66689191948d6.jpg', 'ECEPA16441', 'pan6668919fd31ca.jpg', '499639238031', 'aadhar666891ace5339.jpg', '', '5', '23', '14', NULL, '77.56983', '12.85985', '95%', 'CPH1803, OPPO, RealMe', 1, '2024-09-06 08:03:57', NULL, 0, 1, '2024-06-11 11:00:03', '2024-09-06 08:03:57'),
(2, 'EMP8003622630', 'Abhijeet', '9965356210', 'abj@gmail.com', 'Bangalore', 'profile6668300785f88.png', NULL, NULL, 'SBI', 'Bangalore', 'SBI0523', '0022112213', 'Abhi', 'bank66683007860e1.png', 'GETPS12555', 'pan66683007861bf.png', '445652365412', 'aadhar666830078626d.png', '', '4', '20', '11', NULL, '77.2', '12.1', '', '', 1, '2024-09-01 06:24:18', NULL, 0, 1, '2024-06-11 11:07:51', '2024-09-01 06:24:18'),
(5, 'EMP2783779251', '', '9985951027', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '556903', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 06:24:13', NULL, 0, 1, '2024-07-02 14:23:18', '2024-09-02 06:24:13'),
(6, 'EMP4032738675', '', '9986596958', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '984028', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 06:24:16', NULL, 0, 1, '2024-07-02 14:42:52', '2024-09-02 06:24:16'),
(7, 'EMP7846598923', 'venky', '9986596948', 'test@gmail.com', 'test', 'profile.png', NULL, NULL, 'testBank', 'TestBranch', 'TESTIFSC', '123', 'TEST', 'test.png', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 06:24:18', NULL, 1, 1, '2024-07-02 14:47:58', '2024-09-02 06:24:18'),
(8, 'EMP6274705388', '', '9986596908', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, '5', '22', '13', NULL, '', '', '', '', 0, '2024-09-02 06:24:20', NULL, 1, 1, '2024-07-03 06:00:47', '2024-09-02 06:24:20'),
(9, 'EMP8112745411', '', '96427723503', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '270699', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 13:19:19', NULL, 1, 1, '2024-07-03 12:38:19', '2024-09-02 13:19:19'),
(10, 'EMP5964383709', 'Pallavi', '9956859563', 'pallavi@gmail.com', 'Bangalore', 'profile668639bf0db7a.png', NULL, NULL, 'test', 'test', '123456789', '099110100122563', 'pallavi', 'bank668639bf0dd2d.png', 'GEVPA13665', 'pan668639bf0deae.png', '499639238032', 'aadhar668639bf0df9b.png', NULL, '5', '23', '13', NULL, '', '', '', '', 1, '2024-08-22 15:28:01', NULL, 0, 1, '2024-07-04 05:57:19', '2024-08-22 20:58:01'),
(11, 'EMP2948258829', '', '7000473898', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '687611', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 06:24:07', NULL, 0, 1, '2024-07-04 07:17:27', '2024-09-02 06:24:07'),
(12, 'EMP7964567956', '', '+917000473898', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '815403', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 06:24:05', NULL, 0, 1, '2024-07-04 07:17:33', '2024-09-02 06:24:05'),
(13, 'EMP2346260466', '', '+9170473898', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 06:24:02', NULL, 1, 1, '2024-07-04 07:17:41', '2024-09-02 06:24:02'),
(14, 'EMP3856876167', '', '123', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '855150', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 06:24:00', NULL, 0, 1, '2024-07-04 07:59:27', '2024-09-02 06:24:00'),
(15, 'EMP8879928485', '', '1235', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '3878', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-09-02 06:23:57', NULL, 0, 1, '2024-07-04 08:00:57', '2024-09-02 06:23:57'),
(16, 'EMP9993600143', '', '6302592117', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '123', '', '', '', '', 0, '2024-07-04 09:49:01', NULL, 1, 1, '2024-07-04 09:48:01', '2024-07-04 09:49:01'),
(17, 'EMP8652515077', '', '6302592118', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '123', '', '', '', '', 0, '2024-07-04 12:50:07', NULL, 1, 0, '2024-07-04 09:53:07', '2024-07-04 12:50:07'),
(18, 'EMP1163641277', '', '6302592119', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '9700', NULL, NULL, NULL, '12346', '', '', '', '', 0, '2024-07-04 09:55:44', NULL, 0, 1, '2024-07-04 09:55:44', '2024-07-04 09:55:44'),
(19, 'EMP1480096875', '', '6302592129', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '6426', '5', '20', '11', NULL, '', '', '', '', 0, '2024-07-11 04:59:58', NULL, 0, 0, '2024-07-04 09:58:30', '2024-07-11 04:59:58'),
(20, 'EMP7535314142', '', '6302592529', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '4894', '5', '20', '9', '654564', '', '', '', '', 0, '2024-07-11 05:00:02', NULL, 0, 1, '2024-07-04 10:20:19', '2024-07-11 05:00:02'),
(21, 'EMP5701649181', '', '6302592522', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, '20', '9', NULL, '', '', '', '', 0, '2024-07-11 05:00:06', NULL, 1, 1, '2024-07-04 10:20:38', '2024-07-11 05:00:06'),
(22, 'EMP6584705349', '', '6302592526', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '4147', '3', '20', '8', NULL, '', '', '', '', 0, '2024-07-11 05:00:09', NULL, 0, 1, '2024-07-04 10:21:50', '2024-07-11 05:00:09'),
(23, 'EMP2501657725', 'Vishal Rathaur', '+919179518784', 'vishalrathaur56@gmail.com', '17,18 kothnur road Banglore Karnataka', 'profile.png', NULL, NULL, '', '', '', '', '', '', 'EXOSHJ1F', '', '7658358358', '', NULL, '5', '20', '8', NULL, '77.6029855', '12.9099661', '100%', 'CPH2373, OPPO', 1, '2024-08-28 09:33:43', NULL, 1, 1, '2024-07-04 10:22:04', '2024-08-28 15:03:43'),
(24, 'EMP3748211395', '', '6302592126', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, '4', '20', '9', NULL, '', '', '', '', 0, '2024-07-11 05:00:22', NULL, 1, 1, '2024-07-04 11:37:50', '2024-07-11 05:00:22'),
(25, 'EMP1224203831', 'Krishna', '+919876543210', 'krish@gmail.com', 'A14, ASR 4th main kudloo gate banglore Karnataka', 'profile.png', NULL, NULL, '', '', '', '', '', '', 'DSJ6GD6', '', '369852147', '', NULL, '5', NULL, NULL, NULL, '77.5517485', '12.9419246', '62%', 'V2312, vivo', 0, '2024-07-17 11:46:49', NULL, 1, 1, '2024-07-11 00:33:31', '2024-07-17 17:16:49'),
(26, 'EMP1874771621', '', '+919632587410', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-07-11 06:09:05', NULL, 1, 1, '2024-07-11 11:38:58', '2024-07-11 11:39:05'),
(27, 'EMP5806520770', 'Vishal Rathaur', '+917418965320', 'vishalrathaur56@gmail.com', '17,18 kothnur road Banglore Karnataka', 'profile.png', NULL, NULL, '', '', '', '', '', '', 'SUUGB6G', '', '8253972398', '', NULL, '5', '20', '12', NULL, '77.551754', '12.9419878', '12%', 'CPH2373, OPPO', 1, '2024-07-11 09:59:42', NULL, 1, 1, '2024-07-11 13:24:20', '2024-07-11 09:59:42'),
(28, 'EMP8624407519', 'Aslam', '+919985951017', 'asl@gmail.com', '11 Bangalore', 'profile.png', NULL, NULL, '', '', '', '', '', '', 'ECE1655838', '', '499639896090', '', NULL, NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-07-11 10:39:29', NULL, 1, 1, '2024-07-11 16:07:56', '2024-07-11 16:09:29'),
(29, 'EMP2611516719', 'Harshit', '+919449559199', 'harshith@hommlie.com', '11 Banashankari', 'profile.png', NULL, NULL, '', '', '', '', '', '', 'GHJSSN', '', '499698686', '', NULL, '5', '23', '12', NULL, '77.5978245', '12.9493208', '81%', 'V2312, vivo', 1, '2024-08-12 10:59:13', NULL, 1, 1, '2024-07-11 16:13:15', '2024-08-12 10:59:13'),
(30, 'EMP3973989424', 'Vishal Rathaur', '+916396875423', 'rathaurvishal65@gmail.com', 'kothnur road banglore', 'profile.png', NULL, NULL, '', '', '', '', '', '', 'EHT6GH6', '', '9632572885668', '', NULL, '5', '24', '12', NULL, '77.6028917', '12.9099536', '28%', 'CPH2373, OPPO', 0, '2024-08-31 03:18:43', '2024-08-31 03:18:43', 1, 1, '2024-07-17 17:37:59', '2024-08-31 03:18:43'),
(31, 'EMP9376064593', 'egf', '9985951017', 'dfdgd@fdghfd.hj', 'hjjh', 'profile66c071bf569a0.png', NULL, 'dsfg,dfg,dfgrwer,fverg,errsdf,rgergsdv,aewrgferg,sddv', 'yhjtghj', 'ghjghj', 'ghjghj', '099011123564', 'ghjghj', 'bank66c071c025fde.jpeg', 'iuyiy', 'pan66c071c09358d.jpg', '499639238030', 'aadhar66c071c0a8912.png', NULL, NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-17 09:47:45', NULL, 0, 1, '2024-08-17 15:17:45', '2024-08-17 15:17:45'),
(32, 'EMP8801906209', 'test', '9985951017', 'test@gmail.com', 'test', 'profile66c31eb26299a.png', NULL, 'test', 'test', 'test', 'test', '099110100144639', 'test', 'bank66c31eb262b31.jpeg', 'ECE95544', 'pan66c31eb2c5e22.jpg', '499639238030', 'aadhar66c31eb2d965b.png', NULL, '5', '22', '11', NULL, '', '', '', '', 0, '2024-08-22 15:27:07', NULL, 0, 1, '2024-08-19 16:00:11', '2024-08-22 20:57:07'),
(33, 'EMP6282641157', '', '+91', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '9833', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-28 09:05:42', NULL, 0, 1, '2024-08-28 14:35:36', '2024-08-28 14:35:42'),
(34, 'EMP5645582827', '', '+913555585666', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '9051', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-28 09:07:15', NULL, 0, 1, '2024-08-28 14:37:15', '2024-08-28 14:37:15'),
(35, 'EMP4768181768', '', '+913866666666', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '5201', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-28 09:18:06', NULL, 0, 1, '2024-08-28 14:48:06', '2024-08-28 14:48:06'),
(36, 'EMP6927309251', '', '+916863645666', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '6637', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-28 09:22:13', NULL, 0, 1, '2024-08-28 14:52:13', '2024-08-28 14:52:13'),
(37, 'EMP3457248493', '', '+915956675666', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '1397', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-28 09:22:22', NULL, 0, 1, '2024-08-28 14:52:22', '2024-08-28 14:52:22'),
(38, 'EMP1561060753', '', '+917268882233', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '6438', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-28 09:22:49', NULL, 0, 1, '2024-08-28 14:52:49', '2024-08-28 14:52:49'),
(39, 'EMP7899360962', '', '+913356566666', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '1361', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-28 09:23:42', NULL, 0, 1, '2024-08-28 14:53:42', '2024-08-28 14:53:42'),
(40, 'EMP3724401532', '', '+913566666665', '', '', 'profile.png', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '2292', NULL, NULL, NULL, NULL, '', '', '', '', 0, '2024-08-28 09:25:16', NULL, 0, 1, '2024-08-28 14:55:16', '2024-08-28 14:55:16'),
(41, 'EMP1642048268', '', '+91699666666', '', '', 'profile.png', '21', NULL, '', '', '', '', '', '', '', '', '', '', '1913', '5', '21', '11', NULL, '', '', '', '', 0, '2024-08-29 09:36:03', NULL, 0, 1, '2024-08-28 14:55:25', '2024-08-29 15:06:03'),
(42, 'EMP4683264315', '', '+916655368523', '', '', 'profile.png', '29,28', NULL, '', '', '', '', '', '', '', '', '', '', '1642', '5', '22', '12', NULL, '', '', '', '', 0, '2024-09-06 09:12:09', NULL, 0, 1, '2024-08-28 14:59:52', '2024-09-06 09:12:09'),
(43, 'EMP1476125496', 'New EMP', '+919108650221', 'emp@gmailcom', '', 'profile.png', '41,31,30,28,24,23,20,18', NULL, '', '', '', '', '', '', '', '', '', '', NULL, '5', '22', '13', NULL, '77.5835607', '12.8827286', '42%', 'CPH2373, OPPO', 1, '2024-09-06 09:11:54', '2024-08-31 02:37:44', 1, 1, '2024-08-28 18:09:58', '2024-09-06 09:11:54');

-- --------------------------------------------------------

--
-- Table structure for table `employee_login_history`
--

CREATE TABLE `employee_login_history` (
  `id` int(11) NOT NULL,
  `emp_id` varchar(50) NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `longitude` varchar(100) NOT NULL,
  `on_off` int(11) NOT NULL COMMENT '1-Online,2-Offline',
  `status` int(11) NOT NULL DEFAULT 1,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emp_attendence`
--

CREATE TABLE `emp_attendence` (
  `id` int(11) NOT NULL,
  `emp_id` varchar(50) NOT NULL,
  `login_at` varchar(50) DEFAULT NULL,
  `logout_at` varchar(50) DEFAULT NULL,
  `distance_travelled` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `emp_attendence`
--

INSERT INTO `emp_attendence` (`id`, `emp_id`, `login_at`, `logout_at`, `distance_travelled`, `status`, `created_at`, `updated_at`) VALUES
(1, '43', '2024-08-29 15:42:19', '2024-08-29 17:44:17', '25', 1, '2024-08-29 15:42:19', '2024-08-30 09:21:17'),
(3, '30', '2024-08-30 12:01:39', NULL, NULL, 1, '2024-08-30 12:01:39', '2024-08-30 12:01:39'),
(4, '43', '2024-08-30 12:13:47', '2024-08-30 12:20:41', '25', 1, '2024-08-30 12:13:47', '2024-08-30 09:19:11'),
(5, '43', '2024-08-30 12:19:37', '2024-08-30 12:20:28', '500', 1, '2024-08-30 12:19:37', '2024-08-30 09:19:14'),
(6, '43', '2024-08-30 12:21:29', '2024-08-31 02:37:44', '125', 1, '2024-08-30 12:21:29', '2024-08-31 05:15:29'),
(7, '43', '2024-08-30 12:21:32', NULL, NULL, 1, '2024-08-30 12:21:32', '2024-08-30 12:21:32'),
(8, '43', '2024-08-31 02:44:43', NULL, NULL, 1, '2024-08-31 02:44:43', '2024-08-31 02:44:43'),
(9, '30', '2024-08-31 03:18:25', '2024-08-31 03:18:43', '0.0', 1, '2024-08-31 03:18:25', '2024-08-31 03:18:43');

-- --------------------------------------------------------

--
-- Table structure for table `emp_verified_attendence`
--

CREATE TABLE `emp_verified_attendence` (
  `id` int(11) NOT NULL,
  `emp_id` varchar(20) NOT NULL,
  `totaltime` varchar(50) NOT NULL,
  `totaldistance` varchar(50) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `is_verified` int(11) NOT NULL DEFAULT 2 COMMENT '1=verified, 2=unverifed',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `emp_verified_attendence`
--

INSERT INTO `emp_verified_attendence` (`id`, `emp_id`, `totaltime`, `totaldistance`, `date`, `is_verified`, `status`, `created_at`, `updated_at`) VALUES
(1, '43', '06:08:13', '4025', '2024-08-30', 1, 1, '2024-08-30 18:50:36', '2024-08-30 18:50:36'),
(4, '43', '02:01:58', '25', '2024-08-29', 1, 1, '2024-08-30 19:21:15', '2024-08-30 19:21:15'),
(5, '29', '00:00:00', '0', '2024-08-06', 1, 1, '2024-08-31 11:25:13', '2024-08-31 11:25:13');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `helps`
--

CREATE TABLE `helps` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` text NOT NULL,
  `message` longtext NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `helps`
--

INSERT INTO `helps` (`id`, `user_id`, `first_name`, `last_name`, `mobile`, `email`, `subject`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Mohammed', 'Shameer', '0566898362', 'shameer.shibu@gmail.com', 'test help option', 'test help option', 0, '2022-07-03 17:28:41', '2022-07-03 17:30:48'),
(2, 20, 'Norain', 'Salman', '0541448577', 'norainsalman@gmail.com', 'complain', 'Hi, why your application is not working, there are no images of the products and it is showing error...', 0, '2022-07-18 09:38:33', '2022-08-13 19:59:16'),
(3, 1, 'Mohammed', 'Shameer', '0566898362', 'shameer.shibu@gmail.com', 'test help', 'test help', 0, '2022-08-11 09:57:12', '2022-08-13 19:59:16'),
(4, 6, 'dilshad', 'test', '09656127678', 'asdsa@gmail.com', 'asd', 'a', 0, '2022-08-16 14:30:27', '2022-08-16 14:30:32'),
(5, 6, 'dilshad', 'test', '6282572253', 'msdcva786@gmail.com', 'dasd', 'test message', 0, '2022-08-16 14:31:03', '2022-08-27 22:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `home_data`
--

CREATE TABLE `home_data` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `currency_position` varchar(255) NOT NULL,
  `featured_products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `hot_products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `new_products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vendors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `brands` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `notifications` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `home_data`
--

INSERT INTO `home_data` (`id`, `status`, `message`, `currency`, `currency_position`, `featured_products`, `hot_products`, `new_products`, `vendors`, `brands`, `notifications`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Testing', 'Rupee', 'Left', 'New Feature Product', 'New Hot Product', 'New New Product', 'New Vendor', 'New Brand', 1, '2024-06-18 16:05:21', '2024-06-18 16:05:21');

-- --------------------------------------------------------

--
-- Table structure for table `innersubcategories`
--

CREATE TABLE `innersubcategories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cat_id` int(11) NOT NULL,
  `subcat_id` int(11) NOT NULL,
  `innersubcategory_name` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT '1',
  `slug` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `innersubcategories`
--

INSERT INTO `innersubcategories` (`id`, `cat_id`, `subcat_id`, `innersubcategory_name`, `status`, `slug`, `created_at`, `updated_at`) VALUES
(70, 18, 42, 'House Cleaning', '1', 'house-cleaning', '2024-06-05 07:44:56', '2024-06-05 07:44:56'),
(71, 19, 47, 'House Cleaning', '1', 'home-cleaning-home-cleaning-home-deep-cleaning-house-cleaning', '2024-06-18 08:34:32', '2024-06-18 08:34:32');

-- --------------------------------------------------------

--
-- Table structure for table `inspections`
--

CREATE TABLE `inspections` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `time` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `inspections`
--

INSERT INTO `inspections` (`id`, `fullName`, `address`, `latitude`, `longitude`, `mobile`, `email`, `date`, `time`, `created_at`, `updated_at`) VALUES
(1, 'test new', 'Jalahalli Cross Rd, Chokkasandra, Peenya, Bengaluru, Karnataka, India', 13.0384, 77.5183, '741523587', '', '2024-08-29', '9 to 11 AM', '2024-08-25 16:28:02', '2024-08-25 16:28:02');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `category` varchar(150) NOT NULL,
  `subCategory` varchar(150) NOT NULL,
  `quantity` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `total` varchar(100) NOT NULL,
  `vendor` varchar(150) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `category`, `subCategory`, `quantity`, `type`, `price`, `total`, `vendor`, `status`, `updated_at`, `created_at`) VALUES
(1, 'Bird Control', 'Zip', '24.33', 'M', '', '', '', 1, '2024-07-11 15:16:12', '2024-07-07 19:47:20'),
(2, 'Bird Control', 'Pigeon Nets- Black', '50', 'MM', '', '', '', 1, '2024-07-07 19:58:49', '2024-07-07 19:58:49'),
(3, 'Bird Control', 'Safety Nets', '1', 'MM', '', '', '', 1, '2024-07-07 20:44:22', '2024-07-07 19:59:20'),
(4, 'Cockroach Control', 'Cockroach Chalk piece', '10', 'KG', '', '', '', 1, '2024-07-07 20:02:20', '2024-07-07 20:02:20'),
(5, 'Kits', 'Cockroach Kill Powder', '500', 'pkts', '', '', '', 1, '2024-07-07 20:04:02', '2024-07-07 20:03:01'),
(6, 'Kits', 'Hommlie Kit', '500', 'pkts', '', '', '', 1, '2024-07-07 21:08:23', '2024-07-07 21:08:23'),
(7, 'Oils', 'Freedom Oil', '50', 'L', '', '', '', 1, '2024-07-07 21:14:09', '2024-07-07 21:14:09'),
(8, 'Kits', 'Rat Control Kits', '300', 'pkts', '', '', '', 1, '2024-07-08 08:54:56', '2024-07-08 08:54:56'),
(9, 'Kits', 'testSub', '10.23', 'CM', '', '', '', 1, '2024-07-11 15:04:05', '2024-07-11 15:04:05'),
(10, 'Kits', 'Pest Control Kits', '200', 'pkts', '300', '60000.00', 'Krishna', 1, '2024-07-12 12:08:06', '2024-07-12 12:08:06'),
(11, 'Kits', 'Pest Control Kits', '190', 'pkts', '300', '60000.00', 'Krishna', 1, '2024-07-12 16:47:27', '2024-07-12 12:08:06'),
(12, 'Cockroach Control', 'Cockroach Spray', '126.5', 'L', '152', '106628.00', 'Krish', 1, '2024-08-16 20:24:59', '2024-07-12 12:11:13'),
(13, 'test cat', 'test sub', '2', 'ML', '200', '4400.00', 'vendor', 1, '2024-08-17 13:01:49', '2024-07-17 18:06:37'),
(14, 'test cat', 'test cate', '25', 'L', '500', '0.00', '200', 1, '2024-08-31 11:23:56', '2024-08-20 11:13:46'),
(15, 'Kits', 'new', '50', 'pkts', '500', '0.00', 'test', 1, '2024-08-20 11:14:13', '2024-08-20 11:14:13'),
(16, 'Kits', 'new Kits', '50', 'pkts', '50', '2500.00', 'test', 1, '2024-08-20 11:26:59', '2024-08-20 11:26:59'),
(17, 'test cat', 'testing', '48', 'pkts', '99', '4950.00', 'test', 1, '2024-08-23 12:25:15', '2024-08-23 12:24:34'),
(18, 'test', 'test in new dash', '50', 'pkts', '50', '2500', 'TEST', 1, '2024-08-31 11:15:30', '2024-08-31 11:15:30'),
(19, 'test', 'test in new dash', '50', 'pkts', '50', '2500', 'TEST', 1, '2024-08-31 11:16:38', '2024-08-31 11:16:38'),
(20, 'TEST IN NEW', 'new in new', '40', 'test', '50', '2529', 'dfgdf', 1, '2024-08-31 11:24:05', '2024-08-31 11:19:01'),
(21, 'Kits', 'egdfg', '50', 'ML', '501', '25001', 'dfgfdhg', 1, '2024-09-03 04:43:50', '2024-08-31 11:22:19'),
(22, 'test cat', 'gfccf', '25', 'test', '52', '2600.00', 'bgcvghv', 0, '2024-09-06 11:45:28', '2024-09-06 04:34:27'),
(23, 'TEST IN NEW', 'hgjh', '80', 'test', '50', '2500.00', 'gcbgc', 1, '2024-09-06 11:45:01', '2024-09-06 11:44:26');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_category`
--

CREATE TABLE `inventory_category` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `inventory_category`
--

INSERT INTO `inventory_category` (`id`, `name`, `updated_at`, `created_at`) VALUES
(1, 'Bird Control', '2024-07-07 19:43:54', '2024-07-07 19:43:54'),
(2, 'Cockroach Control', '2024-07-07 19:44:08', '2024-07-07 19:44:08'),
(3, 'Oils', '2024-07-07 19:44:57', '2024-07-07 19:44:57'),
(4, 'Kits', '2024-07-07 19:45:01', '2024-07-07 19:45:01'),
(5, 'test', '2024-07-11 15:03:29', '2024-07-11 15:03:29'),
(6, 'test cat', '2024-07-17 18:04:25', '2024-07-17 18:04:25'),
(7, 'TEST IN NEW', '2024-08-31 11:17:18', '2024-08-31 11:17:18');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_history`
--

CREATE TABLE `inventory_history` (
  `id` int(11) NOT NULL,
  `action` varchar(150) NOT NULL,
  `category` varchar(150) NOT NULL,
  `subCategory` varchar(150) NOT NULL,
  `quantity` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` varchar(50) DEFAULT NULL,
  `total` varchar(100) DEFAULT NULL,
  `vendor` varchar(150) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `inventory_history`
--

INSERT INTO `inventory_history` (`id`, `action`, `category`, `subCategory`, `quantity`, `type`, `price`, `total`, `vendor`, `status`, `updated_at`, `created_at`) VALUES
(6, 'Inward', 'Kits', 'Hommlie Kit', '500', 'pkts', '', '', '', 1, '2024-07-07 21:08:23', '2024-07-07 21:08:23'),
(7, 'Inward', 'Bird Control', 'Zip', '34.33', 'M', '', '', '', 1, '2024-07-07 21:13:38', '2024-07-07 21:13:38'),
(8, 'New Inventory', 'Oils', 'Freedom Oil', '50', 'L', '', '', '', 1, '2024-07-07 21:14:09', '2024-07-07 21:14:09'),
(9, 'New Inventory', 'Kits', 'Rat Control Kits', '300', 'pkts', '', '', '', 1, '2024-07-08 08:54:56', '2024-07-08 08:54:56'),
(10, 'New Inventory', 'Kits', 'testSub', '10.23', 'CM', '', '', '', 1, '2024-07-11 15:04:06', '2024-07-11 15:04:06'),
(11, 'Outward', 'Bird Control', 'Zip', '24.33', 'M', '', '', '', 1, '2024-07-11 15:16:12', '2024-07-11 15:16:12'),
(12, 'New Inventory', 'Kits', 'Pest Control Kits', '200', 'pkts', '', '', '', 1, '2024-07-12 12:08:06', '2024-07-12 12:08:06'),
(13, 'New Inventory', 'Kits', 'Pest Control Kits', '200', 'pkts', '', '', '', 1, '2024-07-12 12:08:06', '2024-07-12 12:08:06'),
(14, 'New Inventory', 'Cockroach Control', 'Cockroach Spray', '500.5', 'L', '', '', '', 1, '2024-07-12 12:11:13', '2024-07-12 12:11:13'),
(15, 'Outward', 'Kits', 'Pest Control Kits', '190', 'pkts', '', '', '', 1, '2024-07-12 16:47:27', '2024-07-12 16:47:27'),
(16, 'Inward', 'Cockroach Control', 'Cockroach Spray', '501.5', 'L', '', '', '', 1, '2024-07-12 17:01:21', '2024-07-12 17:01:21'),
(17, 'Inward', 'Cockroach Control', 'Cockroach Spray', '701.5', 'L', '', '', '', 1, '2024-07-12 17:01:53', '2024-07-12 17:01:53'),
(18, 'Inventory_update', 'Cockroach Control', 'Cockroach Spray', '701.5', 'L', '', '', '', 1, '2024-07-12 18:43:25', '2024-07-12 18:43:25'),
(19, 'New Inventory', 'test cat', 'test sub', '22', 'ML', '', '', '', 1, '2024-07-17 18:06:37', '2024-07-17 18:06:37'),
(20, 'Outward', 'test cat', 'test sub', '12', 'ML', '', '', '', 1, '2024-07-17 18:07:11', '2024-07-17 18:07:11'),
(21, 'Inward', 'test cat', 'test sub', '32', 'ML', '', '', '', 1, '2024-07-17 18:07:24', '2024-07-17 18:07:24'),
(22, 'Outward', 'test cat', 'test sub', '30', 'ML', '', '', '', 1, '2024-07-25 12:41:41', '2024-07-25 12:41:41'),
(23, 'Inventory_update', 'test cat', 'test sub', '30', 'ML', '', '', '', 1, '2024-08-15 15:05:45', '2024-08-15 15:05:45'),
(24, 'Inward', 'Cockroach Control', 'Cockroach Spray', '691.5', 'L', '', '', '', 1, '2024-08-16 19:19:49', '2024-08-16 19:19:49'),
(25, 'Assigned to Aslam', 'Cockroach Control', 'Cockroach Spray', '50', 'L', '', '', '', 1, '2024-08-16 20:24:59', '2024-08-16 20:24:59'),
(26, 'Assigned to Vishal Rathaur', 'test cat', 'test sub', '1', 'ML', '', '', '', 1, '2024-08-17 13:01:49', '2024-08-17 13:01:49'),
(27, 'Assigned to Vishal Rathaur', 'test cat', 'test sub', '0', 'ML', '', '', '', 1, '2024-08-19 10:08:26', '2024-08-19 10:08:26'),
(28, 'New Inventory', 'test cat', 'test cate', '5', 'L', '', '', '', 1, '2024-08-20 11:13:46', '2024-08-20 11:13:46'),
(29, 'New Inventory', 'Kits', 'new', '50', 'pkts', '', '', '', 1, '2024-08-20 11:14:13', '2024-08-20 11:14:13'),
(30, 'New Inventory', 'Kits', 'new Kits', '50', 'pkts', '', '', '', 1, '2024-08-20 11:26:59', '2024-08-20 11:26:59'),
(31, 'New Inventory', 'test cat', 'testing', '50', 'pkts', '', '', '', 1, '2024-08-23 12:24:34', '2024-08-23 12:24:34'),
(32, 'Assigned to Vishal Rathaur', 'test cat', 'testing', '2', 'pkts', '', '', '', 1, '2024-08-23 12:25:15', '2024-08-23 12:25:15'),
(33, 'New Inventory', 'Kits', 'egdfg', '50', 'ML', NULL, NULL, NULL, 1, '2024-08-31 11:22:19', '2024-08-31 11:22:19'),
(34, 'Inventory_update', 'Kits', 'egdfg', '50', 'ML', NULL, NULL, NULL, 1, '2024-08-31 11:22:31', '2024-08-31 11:22:31'),
(35, 'Inward', 'test cat', 'test cate', '15', 'L', NULL, NULL, NULL, 1, '2024-08-31 11:23:51', '2024-08-31 11:23:51'),
(36, 'Inward', 'test cat', 'test cate', '25', 'L', NULL, NULL, NULL, 1, '2024-08-31 11:23:56', '2024-08-31 11:23:56'),
(37, 'Outward', 'TEST IN NEW', 'new in new', '40', 'test', NULL, NULL, NULL, 1, '2024-09-05 06:44:05', '2024-09-05 11:24:06'),
(38, 'New Inventory', 'test cat', 'gfccf', '50', 'test', NULL, NULL, NULL, 1, '2024-09-06 04:34:27', '2024-09-06 04:34:27'),
(39, 'Assigned to New EMP', '1', 'test cat', '20', '50', NULL, NULL, NULL, 1, '2024-09-06 11:35:30', '2024-09-06 11:35:30'),
(40, 'Assigned to Vishal Rathaur', '1', 'test cat', '5', '30', NULL, NULL, NULL, 1, '2024-09-06 11:36:14', '2024-09-06 11:36:14'),
(41, 'New Inventory', 'TEST IN NEW', 'hgjh', '50', 'test', NULL, NULL, NULL, 1, '2024-09-06 11:44:26', '2024-09-06 11:44:26'),
(42, 'Inward', 'TEST IN NEW', 'hgjh', '80', 'test', NULL, NULL, NULL, 1, '2024-09-06 11:45:01', '2024-09-06 11:45:01');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_quantity_type`
--

CREATE TABLE `inventory_quantity_type` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `shortcut` varchar(35) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `inventory_quantity_type`
--

INSERT INTO `inventory_quantity_type` (`id`, `name`, `shortcut`, `updated_at`, `created_at`) VALUES
(2, 'Grams', 'GM', '2024-07-07 14:16:52', '2024-07-07 12:19:21'),
(3, 'Kilo Grams', 'KG', '2024-07-07 19:16:08', '2024-07-07 19:16:08'),
(4, 'Metre', 'M', '2024-07-07 14:16:19', '2024-07-07 19:45:42'),
(5, 'Milli Meter', 'MM', '2024-07-07 14:16:23', '2024-07-07 19:45:50'),
(6, 'Centi Meter', 'CM', '2024-07-07 14:16:26', '2024-07-07 19:46:01'),
(7, 'Litre', 'L', '2024-07-07 19:46:07', '2024-07-07 19:46:07'),
(8, 'Milli Litre', 'ML', '2024-07-07 19:46:36', '2024-07-07 19:46:36'),
(9, 'Packets', 'pkts', '2024-07-07 20:02:32', '2024-07-07 20:02:32'),
(10, 'test in new', 'test', '2024-08-31 11:17:41', '2024-08-31 11:17:41');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `coordinates` text NOT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `coordinates`, `status`, `updated_at`, `created_at`) VALUES
(14, 'Bangalore', 'POLYGON((11.438641554889948 76.82131905327387, 11.039944140325725 76.46975655327387, 10.764849564639883 76.65103096733637, 10.575913363084924 77.10696358452387, 10.656900389280954 77.96389717827387, 10.872240156331019 78.35313085368767, 11.308875658663183 78.08945897868767, 11.448890565957798 77.46323827556267 ))', 'Active', '2024-07-11 05:06:38', '2024-06-24 06:53:35'),
(18, 'Navodaya Nagara', 'POLYGON((11.438641554889948 76.82131905327387, 11.039944140325725 76.46975655327387, 10.764849564639883 76.65103096733637, 10.575913363084924 77.10696358452387, 10.656900389280954 77.96389717827387, 10.872240156331019 78.35313085368767, 11.308875658663183 78.08945897868767, 11.448890565957798 77.46323827556267 ))', 'Active', '2024-07-11 05:06:35', '2024-07-09 17:42:35'),
(19, 'test', 'POLYGON((11.438641554889948 76.82131905327387, 11.039944140325725 76.46975655327387, 10.764849564639883 76.65103096733637, 10.575913363084924 77.10696358452387, 10.656900389280954 77.96389717827387, 10.872240156331019 78.35313085368767, 11.308875658663183 78.08945897868767, 11.448890565957798 77.46323827556267 ))', 'Active', '2024-07-11 05:06:32', '2024-07-11 10:21:04'),
(20, 'Mysuru', 'POLYGON((11.438641554889948 76.82131905327387, 11.039944140325725 76.46975655327387, 10.764849564639883 76.65103096733637, 10.575913363084924 77.10696358452387, 10.656900389280954 77.96389717827387, 10.872240156331019 78.35313085368767, 11.308875658663183 78.08945897868767, 11.448890565957798 77.46323827556267 ))', 'Active', '2024-07-11 05:06:26', '2024-07-11 10:22:18'),
(21, 'Banshankari', 'POLYGON((13.37861913396886 77.22664799041861, 13.143364943463054 76.96572269744986, 12.838268703664518 76.83937992401236, 12.540845052968873 76.97121586151236, 12.299437975909921 77.54250492401236, 12.345054218047817 78.09731449432486, 12.546207102355222 78.44338383026236, 12.8757567951511 78.43239750213736, 13.228938241298446 78.41042484588736, 13.416024872162172 77.33376468963736 ))', 'Active', '2024-07-11 05:00:51', '2024-07-11 10:27:30'),
(22, 'Coimbatore', 'POLYGON((11.438641554889948 76.82131905327387, 11.039944140325725 76.46975655327387, 10.764849564639883 76.65103096733637, 10.575913363084924 77.10696358452387, 10.656900389280954 77.96389717827387, 10.872240156331019 78.35313085368767, 11.308875658663183 78.08945897868767, 11.448890565957798 77.46323827556267 ))', 'Active', '2024-07-11 10:35:32', '2024-07-11 10:35:32'),
(23, 'bnglr', 'POLYGON((13.018232220755415 77.5356485028568, 12.97005971468514 77.50989929631383, 12.925558763827564 77.51813904240758, 12.89878745164973 77.56002441838415, 12.89811813211528 77.6290322919193, 12.937939525243342 77.68499390080602, 13.00351383571927 77.69975677922399, 13.027263524320503 77.65546814397008, 13.036628972725707 77.59195343449743 ))', 'Active', '2024-07-17 18:01:36', '2024-07-17 18:01:36'),
(24, 'All', 'POLYGON((13.170181706534343 77.49376312688024, 12.832984795086455 77.02409759953649, 12.51946781806719 77.50749603703649, 12.307560614404407 78.06230560734899, 12.80888184851495 78.21336761906774, 13.047131235586045 78.19688812688024 ))', 'Active', '2024-08-12 17:14:20', '2024-08-12 17:14:20');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `fullName`, `email`, `phoneNumber`, `message`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test@gmail.com', '7845987456', 'test note', '2024-08-10 13:53:44', '2024-08-10 13:53:44'),
(2, 'vishalrathaur', 'vishalrathaurpc@gmail.com', '9179518784', 'ok', '2024-08-27 10:39:45', '2024-08-27 10:39:45');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_resets_table', 1),
(2, '2019_04_15_191331679173_create_1555355612601_permissions_table', 1),
(3, '2019_04_15_191331731390_create_1555355612581_roles_table', 1),
(4, '2019_04_15_191331779537_create_1555355612782_users_table', 1),
(5, '2019_04_15_191332603432_create_1555355612603_permission_role_pivot_table', 1),
(6, '2019_04_15_191332791021_create_1555355612790_role_user_pivot_table', 1),
(7, '2019_04_15_191441675085_create_1555355681975_products_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `order_number` varchar(191) DEFAULT NULL,
  `return_number` varchar(255) DEFAULT NULL,
  `order_status` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `order_id`, `order_number`, `return_number`, `order_status`, `message`, `is_read`, `type`, `created_at`, `updated_at`) VALUES
(1, 5, 2, 'YL35ZBX93L', NULL, 1, 'Order YL35ZBX93L has been placed', 1, 'order', '2022-05-30 04:09:21', '2022-05-30 04:09:21'),
(2, 5, 2, 'YL35ZBX93L', NULL, 2, 'Floral has been confirmed', 1, 'order', '2022-05-30 09:18:52', '2022-05-30 09:18:52'),
(3, 5, 1, 'YL35ZBX93L', NULL, 2, 'Floral has been confirmed', 1, 'order', '2022-05-30 09:19:05', '2022-05-30 09:19:05'),
(4, 5, 2, 'YL35ZBX93L', NULL, 3, 'Floral has been shipped', 1, 'order', '2022-05-30 09:49:03', '2022-05-30 09:49:03'),
(5, 5, 1, 'YL35ZBX93L', NULL, 3, 'Floral has been shipped', 1, 'order', '2022-05-30 09:49:12', '2022-05-30 09:49:12'),
(6, 5, 1, 'YL35ZBX93L', NULL, 4, 'Floral has been delivered', 1, 'order', '2022-05-30 09:49:51', '2022-05-30 09:49:51'),
(7, 5, 2, 'YL35ZBX93L', NULL, 4, 'Floral has been delivered', 1, 'order', '2022-05-30 09:49:57', '2022-05-30 09:49:57'),
(8, 1, 3, '0AKZ8IJWG6', NULL, 1, 'Order 0AKZ8IJWG6 has been placed', 1, 'order', '2022-05-30 09:01:45', '2022-05-30 09:01:45'),
(9, 5, 4, 'K78X9Y0KD0', NULL, 1, 'Order K78X9Y0KD0 has been placed', 1, 'order', '2022-05-30 09:06:18', '2022-05-30 09:06:18'),
(10, 7, 5, 'UZORBAFFUO', NULL, 1, 'Order UZORBAFFUO has been placed', 1, 'order', '2022-05-31 12:50:40', '2022-05-31 12:50:40'),
(11, 7, 5, 'UZORBAFFUO', NULL, 6, 'Order UZORBAFFUO has been cancelled by you', 1, 'order', '2022-05-31 14:52:00', '2022-05-31 14:52:00'),
(12, 7, 6, 'HLPSIUHV2K', NULL, 1, 'Order HLPSIUHV2K has been placed', 1, 'order', '2022-06-01 09:32:36', '2022-06-01 09:32:36'),
(13, 7, 6, 'HLPSIUHV2K', NULL, 2, 'Floral Wear has been confirmed', 1, 'order', '2022-06-01 04:13:56', '2022-06-01 04:13:56'),
(14, 7, 6, 'HLPSIUHV2K', NULL, 3, 'Floral Wear has been shipped', 1, 'order', '2022-06-01 04:15:08', '2022-06-01 04:15:08'),
(15, 7, 6, 'HLPSIUHV2K', NULL, 4, 'Floral Wear has been delivered', 1, 'order', '2022-06-01 04:15:27', '2022-06-01 04:15:27'),
(16, 5, 2, 'YL35ZBX93L', NULL, 6, 'Floral has been cancelled by you', 1, 'order', '2022-06-01 21:19:00', '2022-06-01 21:19:00'),
(17, 5, 4, 'K78X9Y0KD0', NULL, 3, 'Floral has been shipped', 1, 'order', '2022-06-02 06:53:57', '2022-06-02 06:53:57'),
(18, 5, 4, 'K78X9Y0KD0', NULL, 2, 'Floral has been confirmed', 1, 'order', '2022-06-02 07:22:57', '2022-06-02 07:22:57'),
(19, 5, 4, 'K78X9Y0KD0', NULL, 2, 'Floral has been confirmed', 1, 'order', '2022-06-02 07:28:00', '2022-06-02 07:28:00'),
(20, 5, 4, 'K78X9Y0KD0', NULL, 2, 'Floral has been confirmed', 1, 'order', '2022-06-02 07:46:26', '2022-06-02 07:46:26'),
(21, 5, 4, 'K78X9Y0KD0', NULL, 3, 'Floral has been shipped', 1, 'order', '2022-06-02 07:47:33', '2022-06-02 07:47:33'),
(22, 5, 4, 'K78X9Y0KD0', NULL, 4, 'Floral has been delivered', 1, 'order', '2022-06-02 07:47:48', '2022-06-02 07:47:48'),
(23, 5, 4, 'K78X9Y0KD0', NULL, 2, 'Floral has been confirmed', 1, 'order', '2022-06-02 07:48:19', '2022-06-02 07:48:19'),
(24, 5, 4, 'K78X9Y0KD0', NULL, 3, 'Floral has been shipped', 1, 'order', '2022-06-02 07:52:35', '2022-06-02 07:52:35'),
(25, 5, 7, '9TZBLTQQNY', NULL, 1, 'Order 9TZBLTQQNY has been placed', 1, 'order', '2022-06-02 14:11:34', '2022-06-02 14:11:34'),
(26, 8, 8, 'FBEMIWTAM9', NULL, 1, 'Order FBEMIWTAM9 has been placed', 1, 'order', '2022-06-02 14:20:42', '2022-06-02 14:20:42'),
(27, 8, 8, 'FBEMIWTAM9', NULL, 6, 'Mitra Classic Wear has been cancelled by you', 1, 'order', '2022-06-02 14:22:08', '2022-06-02 14:22:08'),
(28, 8, 9, 'ITFJKSN9EE', NULL, 1, 'Order ITFJKSN9EE has been placed', 1, 'order', '2022-06-02 14:25:49', '2022-06-02 14:25:49'),
(29, 8, 9, 'ITFJKSN9EE', NULL, 2, 'Floral Short Sleeve has been confirmed', 1, 'order', '2022-06-02 08:57:12', '2022-06-02 08:57:12'),
(30, 8, 9, 'ITFJKSN9EE', NULL, 3, 'Floral Short Sleeve has been shipped', 1, 'order', '2022-06-02 08:57:47', '2022-06-02 08:57:47'),
(31, 8, 9, 'ITFJKSN9EE', NULL, 4, 'Floral Short Sleeve has been delivered', 1, 'order', '2022-06-02 08:58:08', '2022-06-02 08:58:08'),
(32, 8, 10, 'UG3JBHI3Q5', NULL, 1, 'Order UG3JBHI3Q5 has been placed', 1, 'order', '2022-06-02 16:53:03', '2022-06-02 16:53:03'),
(33, 8, 10, 'UG3JBHI3Q5', NULL, 2, 'Zara Printed has been confirmed', 1, 'order', '2022-06-02 11:24:54', '2022-06-02 11:24:54'),
(34, 8, 10, 'UG3JBHI3Q5', NULL, 3, 'Zara Printed has been shipped', 1, 'order', '2022-06-02 11:25:34', '2022-06-02 11:25:34'),
(35, 8, 10, 'UG3JBHI3Q5', NULL, 4, 'Zara Printed has been delivered', 1, 'order', '2022-06-02 11:26:04', '2022-06-02 11:26:04'),
(36, 8, 11, 'VGGZLNTYJS', NULL, 1, 'Order VGGZLNTYJS has been placed', 1, 'order', '2022-06-02 17:15:07', '2022-06-02 17:15:07'),
(37, 8, 12, 'VUKQOG8N8I', NULL, 1, 'Order VUKQOG8N8I has been placed', 1, 'order', '2022-06-02 17:22:40', '2022-06-02 17:22:40'),
(38, 8, 12, 'VUKQOG8N8I', NULL, 2, 'Zara Printed has been confirmed', 1, 'order', '2022-06-02 11:53:29', '2022-06-02 11:53:29'),
(39, 8, 12, 'VUKQOG8N8I', NULL, 3, 'Zara Printed has been shipped', 1, 'order', '2022-06-02 11:53:43', '2022-06-02 11:53:43'),
(40, 8, 12, 'VUKQOG8N8I', NULL, 4, 'Zara Printed has been delivered', 1, 'order', '2022-06-02 11:53:54', '2022-06-02 11:53:54'),
(41, 8, 12, 'VUKQOG8N8I', NULL, 7, 'Return request for Zara Printed has been raised', 1, 'order', '2022-06-02 17:24:23', '2022-06-02 17:24:23'),
(42, 8, 13, 'VTFP3GCZY1', NULL, 1, 'Order VTFP3GCZY1 has been placed', 1, 'order', '2022-06-02 17:35:47', '2022-06-02 17:35:47'),
(43, 8, 13, 'VTFP3GCZY1', NULL, 2, 'Zara Printed has been confirmed', 1, 'order', '2022-06-02 12:06:19', '2022-06-02 12:06:19'),
(44, 8, 13, 'VTFP3GCZY1', NULL, 3, 'Zara Printed has been shipped', 1, 'order', '2022-06-02 12:06:26', '2022-06-02 12:06:26'),
(45, 8, 13, 'VTFP3GCZY1', NULL, 4, 'Zara Printed has been delivered', 1, 'order', '2022-06-02 12:06:33', '2022-06-02 12:06:33'),
(46, 7, 14, 'DIVIJC7HQF', NULL, 1, 'Order DIVIJC7HQF has been placed', 1, 'order', '2022-06-02 17:51:59', '2022-06-02 17:51:59'),
(47, 1, 15, '8XSUR1YRDO', NULL, 1, 'Order 8XSUR1YRDO has been placed', 1, 'order', '2022-06-02 23:22:50', '2022-06-02 23:22:50'),
(48, 7, 16, '2K2JB2RC7F', NULL, 1, 'Order 2K2JB2RC7F has been placed', 1, 'order', '2022-06-03 04:01:06', '2022-06-03 04:01:06'),
(49, 11, 17, '3VMWVFCYGM', NULL, 1, 'Order 3VMWVFCYGM has been placed', 0, 'order', '2022-06-03 16:59:26', '2024-08-02 18:11:18'),
(50, 8, 18, '3AFRN8ZCU6', NULL, 1, 'Order 3AFRN8ZCU6 has been placed', 1, 'order', '2022-06-04 03:06:25', '2022-06-04 03:06:25'),
(51, 8, 19, '8LNF0SQVAB', NULL, 1, 'Order 8LNF0SQVAB has been placed', 1, 'order', '2022-06-04 09:31:03', '2022-06-04 09:31:03'),
(52, 8, 21, 'YFSEJOAOZD', NULL, 1, 'Order YFSEJOAOZD has been placed', 1, 'order', '2022-06-04 16:36:06', '2022-06-04 16:36:06'),
(53, 8, 21, 'YFSEJOAOZD', NULL, 2, 'Floral Short Sleeve has been confirmed', 1, 'order', '2022-06-04 11:08:35', '2022-06-04 11:08:35'),
(54, 8, 21, 'YFSEJOAOZD', NULL, 3, 'Floral Short Sleeve has been shipped', 1, 'order', '2022-06-04 11:09:00', '2022-06-04 11:09:00'),
(55, 8, 21, 'YFSEJOAOZD', NULL, 4, 'Floral Short Sleeve has been delivered', 1, 'order', '2022-06-04 11:09:15', '2022-06-04 11:09:15'),
(56, 8, 22, '8GN4QMQP4V', NULL, 1, 'Order 8GN4QMQP4V has been placed', 1, 'order', '2022-06-05 19:34:08', '2022-06-05 19:34:08'),
(57, 8, 23, 'QXY42SWMKJ', NULL, 1, 'Order QXY42SWMKJ has been placed', 1, 'order', '2022-06-06 21:06:26', '2022-06-06 21:06:26'),
(58, 8, 24, '5N0Z7FLJ5L', NULL, 1, 'Order 5N0Z7FLJ5L has been placed', 1, 'order', '2022-06-06 21:20:24', '2022-06-06 21:20:24'),
(59, 8, 26, 'X45VCR1D7S', NULL, 1, 'Order X45VCR1D7S has been placed', 1, 'order', '2022-06-06 21:56:37', '2022-06-06 21:56:37'),
(60, 8, 27, 'WYOMH7L6Q8', NULL, 1, 'Order WYOMH7L6Q8 has been placed', 1, 'order', '2022-06-08 23:27:49', '2022-06-08 23:27:49'),
(61, 8, 27, 'WYOMH7L6Q8', NULL, 2, 'Zara Printed has been confirmed', 1, 'order', '2022-06-08 17:58:45', '2022-06-08 17:58:45'),
(62, 8, 27, 'WYOMH7L6Q8', NULL, 3, 'Zara Printed has been shipped', 1, 'order', '2022-06-08 17:59:21', '2022-06-08 17:59:21'),
(63, 8, 27, 'WYOMH7L6Q8', NULL, 4, 'Zara Printed has been delivered', 1, 'order', '2022-06-08 18:01:00', '2022-06-08 18:01:00'),
(64, 8, 28, 'SHCRS8YQE2', NULL, 1, 'Order SHCRS8YQE2 has been placed', 1, 'order', '2022-06-09 15:13:53', '2022-06-09 15:13:53'),
(65, 8, 28, 'SHCRS8YQE2', NULL, 2, 'Zara Printed has been confirmed', 1, 'order', '2022-06-09 09:45:15', '2022-06-09 09:45:15'),
(66, 8, 28, 'SHCRS8YQE2', NULL, 3, 'Zara Printed has been shipped', 1, 'order', '2022-06-09 09:46:21', '2022-06-09 09:46:21'),
(67, 8, 29, 'GDCQ36QGXT', NULL, 1, 'Order GDCQ36QGXT has been placed', 1, 'order', '2022-06-09 16:16:08', '2022-06-09 16:16:08'),
(68, 8, 29, 'GDCQ36QGXT', NULL, 6, 'Abaya has been cancelled by you', 1, 'order', '2022-06-09 16:16:29', '2022-06-09 16:16:29'),
(69, 8, 29, 'GDCQ36QGXT', NULL, 6, 'Abaya has been cancelled by you', 1, 'order', '2022-06-09 16:16:37', '2022-06-09 16:16:37'),
(70, 6, 30, 'PCZUPKIX8N', NULL, 1, 'Order PCZUPKIX8N has been placed', 1, 'order', '2022-06-11 15:26:36', '2022-06-11 15:26:36'),
(71, 6, 30, 'PCZUPKIX8N', NULL, 2, 'ABAYA WITH DETAILED EMBROIDERY TO FRONT AND SLEEVES. has been confirmed', 1, 'order', '2022-06-11 09:57:03', '2022-06-11 09:57:03'),
(72, 6, 30, 'PCZUPKIX8N', NULL, 3, 'ABAYA WITH DETAILED EMBROIDERY TO FRONT AND SLEEVES. has been shipped', 1, 'order', '2022-06-11 09:57:34', '2022-06-11 09:57:34'),
(73, 6, 30, 'PCZUPKIX8N', NULL, 5, 'ABAYA WITH DETAILED EMBROIDERY TO FRONT AND SLEEVES. has been cancelled by vendor', 1, 'order', '2022-06-11 09:57:43', '2022-06-11 09:57:43'),
(74, 8, 31, 'Q43DWW4UW1', NULL, 1, 'Order Q43DWW4UW1 has been placed', 1, 'order', '2022-06-11 15:33:08', '2022-06-11 15:33:08'),
(75, 8, 32, 'J6B1IBCI84', NULL, 1, 'Order J6B1IBCI84 has been placed', 1, 'order', '2022-06-11 22:07:28', '2022-06-11 22:07:28'),
(76, 8, 32, 'J6B1IBCI84', NULL, 6, 'Occasional Farasha Style Abaya has been cancelled by you', 1, 'order', '2022-06-11 22:09:40', '2022-06-11 22:09:40'),
(77, 8, 31, 'Q43DWW4UW1', NULL, 5, 'ABAYA WITH DETAILED EMBROIDERY TO FRONT AND SLEEVES. has been cancelled by vendor', 1, 'order', '2022-06-11 18:17:55', '2022-06-11 18:17:55'),
(78, 8, 33, 'K5MDZ4RY28', NULL, 1, 'Order K5MDZ4RY28 has been placed', 1, 'order', '2022-06-11 23:53:05', '2022-06-11 23:53:05'),
(79, 13, 34, '0VCBA4AY0G', NULL, 1, 'Order 0VCBA4AY0G has been placed', 1, 'order', '2022-06-12 01:05:31', '2022-06-12 01:05:31'),
(80, 11, 35, '4ATDJ5QHK1', NULL, 1, 'Order 4ATDJ5QHK1 has been placed', 0, 'order', '2022-06-12 01:15:41', '2024-08-02 18:11:18'),
(81, 7, 36, 'EVMO2QRHOD', NULL, 1, 'Order EVMO2QRHOD has been placed', 1, 'order', '2022-06-13 20:35:14', '2022-06-13 20:35:14'),
(82, 8, 37, 'PBCEPZDTIM', NULL, 1, 'Order PBCEPZDTIM has been placed', 1, 'order', '2022-06-16 09:21:09', '2022-06-16 09:21:09'),
(83, 8, 38, 'WZ0S7HBQVT', NULL, 1, 'Order WZ0S7HBQVT has been placed', 1, 'order', '2022-06-17 15:32:47', '2022-06-17 15:32:47'),
(84, 8, 38, 'WZ0S7HBQVT', NULL, 2, 'Embroidered Flared Abaya has been confirmed', 1, 'order', '2022-06-17 11:38:19', '2022-06-17 11:38:19'),
(85, 8, 38, 'WZ0S7HBQVT', NULL, 5, 'Embroidered Flared Abaya has been cancelled by vendor', 1, 'order', '2022-06-18 13:27:38', '2022-06-18 13:27:38'),
(86, 8, 39, 'EBOG3OHSRT', NULL, 1, 'Order EBOG3OHSRT has been placed', 1, 'order', '2022-06-18 17:58:26', '2022-06-18 17:58:26'),
(87, 8, 39, 'EBOG3OHSRT', NULL, 2, 'Embroidered Flared Abaya has been confirmed', 1, 'order', '2022-06-18 13:59:33', '2022-06-18 13:59:33'),
(88, 8, 39, 'EBOG3OHSRT', NULL, 3, 'Embroidered Flared Abaya has been shipped', 1, 'order', '2022-06-18 14:01:16', '2022-06-18 14:01:16'),
(89, 8, 39, 'EBOG3OHSRT', NULL, 4, 'Embroidered Flared Abaya has been delivered', 1, 'order', '2022-06-18 14:02:09', '2022-06-18 14:02:09'),
(90, 8, 39, 'EBOG3OHSRT', NULL, 7, 'Return request for Embroidered Flared Abaya has been raised', 1, 'order', '2022-06-18 18:04:19', '2022-06-18 18:04:19'),
(91, 8, 39, NULL, 'GYIMGB08AR', 8, 'Return request GYIMGB08AR for Embroidered Flared Abaya has been accepted', 1, 'order', '2022-06-18 14:05:28', '2022-06-18 14:05:28'),
(92, 8, 39, NULL, 'GYIMGB08AR', 9, 'Return request GYIMGB08AR for Embroidered Flared Abaya has been Completed', 1, 'order', '2022-06-18 14:05:38', '2022-06-18 14:05:38'),
(93, 8, 40, 'FREIS02FNR', NULL, 1, 'Order FREIS02FNR has been placed', 1, 'order', '2022-06-19 01:13:04', '2022-06-19 01:13:04'),
(94, 4, 43, 'Y3G6D9TI5J', NULL, 1, 'Order Y3G6D9TI5J has been placed', 0, 'order', '2022-06-20 16:22:06', '2022-06-20 12:23:58'),
(95, 4, 47, 'YH41VPMQ6F', NULL, 1, 'Order YH41VPMQ6F has been placed', 1, 'order', '2022-06-21 21:00:42', '2022-06-21 21:00:42'),
(96, 4, 48, '6WN46PD7PI', NULL, 1, 'Order 6WN46PD7PI has been placed', 1, 'order', '2022-06-22 21:05:17', '2022-06-22 21:05:17'),
(97, 16, 49, '1ZPGCSR1Q7', NULL, 1, 'Order 1ZPGCSR1Q7 has been placed', 1, 'order', '2022-06-22 21:36:56', '2022-06-22 21:36:56'),
(98, 6, 54, 'M9AXS9LYHR', NULL, 1, 'Order M9AXS9LYHR has been placed', 1, 'order', '2022-06-28 00:15:45', '2022-06-28 00:15:45'),
(99, 6, 56, 'AONM6CXEHD', NULL, 1, 'Order AONM6CXEHD has been placed', 1, 'order', '2022-06-28 15:00:10', '2022-06-28 15:00:10'),
(100, 20, 57, 'WYQJWME01B', NULL, 1, 'Order WYQJWME01B has been placed', 1, 'order', '2022-07-21 17:34:51', '2022-07-21 17:34:51'),
(101, 20, 57, 'WYQJWME01B', NULL, 6, 'Order WYQJWME01B has been cancelled by you', 1, 'order', '2022-07-21 18:02:58', '2022-07-21 18:02:58'),
(102, 25, 58, 'UKOOU5NJG0', NULL, 1, 'Order UKOOU5NJG0 has been placed', 1, 'order', '2022-08-04 11:26:31', '2022-08-04 11:26:31'),
(103, 31, 59, 'D5NM38ENG4', NULL, 1, 'Order D5NM38ENG4 has been placed', 1, 'order', '2022-08-06 19:04:38', '2022-08-06 19:04:38'),
(104, 31, 59, 'D5NM38ENG4', NULL, 2, 'AIK9006 has been confirmed', 1, 'order', '2022-08-06 16:10:03', '2022-08-06 16:10:03'),
(105, 31, 59, 'D5NM38ENG4', NULL, 4, 'AIK9006 has been delivered', 1, 'order', '2022-08-06 16:10:40', '2022-08-06 16:10:40'),
(106, 31, 59, 'D5NM38ENG4', NULL, 7, 'Return request for AIK9006 has been raised', 1, 'order', '2022-08-06 19:13:57', '2022-08-06 19:13:57'),
(107, 31, 59, NULL, '7EI09WDTOC', 8, 'Return request 7EI09WDTOC for AIK9006 has been accepted', 1, 'order', '2022-08-06 16:15:36', '2022-08-06 16:15:36'),
(108, 31, 59, NULL, '7EI09WDTOC', 9, 'Return request 7EI09WDTOC for AIK9006 has been Completed', 1, 'order', '2022-08-06 16:15:44', '2022-08-06 16:15:44'),
(109, 40, 60, 'KZGYUT36PB', NULL, 1, 'Order KZGYUT36PB has been placed', 1, 'order', '2022-08-11 15:10:16', '2022-08-11 15:10:16'),
(110, 40, 60, 'KZGYUT36PB', NULL, 5, 'AIK5006 Black has been cancelled by vendor', 1, 'order', '2022-08-11 13:42:00', '2022-08-11 13:42:00'),
(111, 41, 61, 'MEYAJMSAHC', NULL, 1, 'Order MEYAJMSAHC has been placed', 1, 'order', '2022-08-11 18:08:58', '2022-08-11 18:08:58'),
(112, 39, 62, 'XZPJVVGG0R', NULL, 1, 'Order XZPJVVGG0R has been placed', 0, 'order', '2022-08-11 18:55:18', '2022-08-24 14:29:57'),
(113, 41, 61, 'MEYAJMSAHC', NULL, 5, 'AIK6015 Black has been cancelled by vendor', 1, 'order', '2022-08-11 16:00:01', '2022-08-11 16:00:01'),
(114, 31, 63, '0YZSCV0RT3', NULL, 1, 'Order 0YZSCV0RT3 has been placed', 1, 'order', '2022-08-13 12:44:47', '2022-08-13 12:44:47'),
(115, 31, 64, 'XWJ7TIMSQN', NULL, 1, 'Order XWJ7TIMSQN has been placed', 1, 'order', '2022-08-13 13:51:22', '2022-08-13 13:51:22'),
(116, 31, 64, 'XWJ7TIMSQN', NULL, 6, 'Order XWJ7TIMSQN has been cancelled by you', 1, 'order', '2022-08-13 14:05:24', '2022-08-13 14:05:24'),
(117, 31, 63, '0YZSCV0RT3', NULL, 6, 'Order 0YZSCV0RT3 has been cancelled by you', 1, 'order', '2022-08-13 14:05:48', '2022-08-13 14:05:48'),
(118, 44, 66, 'NI7BVIF0IX', NULL, 1, 'Order NI7BVIF0IX has been placed', 1, 'order', '2022-08-13 17:11:43', '2022-08-13 17:11:43'),
(119, 6, 67, 'AJ64PN0A9K', NULL, 1, 'Order AJ64PN0A9K has been placed', 1, 'order', '2022-08-14 20:34:43', '2022-08-14 20:34:43'),
(120, 6, 67, 'AJ64PN0A9K', NULL, 2, 'IK7790 Dark Purple has been confirmed', 1, 'order', '2022-08-14 17:37:45', '2022-08-14 17:37:45'),
(121, 6, 67, 'AJ64PN0A9K', NULL, 3, 'IK7790 Dark Purple has been shipped', 1, 'order', '2022-08-14 17:38:05', '2022-08-14 17:38:05'),
(122, 6, 67, 'AJ64PN0A9K', NULL, 5, 'IK7790 Dark Purple has been cancelled by vendor', 1, 'order', '2022-08-14 17:38:19', '2022-08-14 17:38:19'),
(123, 6, 68, '90AP69PFC6', NULL, 1, 'Order 90AP69PFC6 has been placed', 1, 'order', '2022-08-14 21:34:25', '2022-08-14 21:34:25'),
(124, 6, 68, '90AP69PFC6', NULL, 5, 'AIK6018 Black has been cancelled by vendor', 1, 'order', '2022-08-14 18:52:23', '2022-08-14 18:52:23'),
(125, 51, 69, 'LD6KJ41ITY', NULL, 1, 'Order LD6KJ41ITY has been placed', 1, 'order', '2022-08-16 17:27:30', '2022-08-16 17:27:30'),
(126, 39, 70, '6454I9VV18', NULL, 1, 'Order 6454I9VV18 has been placed', 0, 'order', '2022-08-21 19:24:00', '2022-08-24 14:29:57'),
(127, 39, 71, 'ZI6ID7SJQS', NULL, 1, 'Order ZI6ID7SJQS has been placed', 0, 'order', '2022-08-21 22:47:39', '2022-08-24 14:29:57'),
(128, 39, 72, '2LUO371GHJ', NULL, 1, 'Order 2LUO371GHJ has been placed', 0, 'order', '2022-08-23 12:22:46', '2022-08-24 14:29:57'),
(129, 39, 62, 'XZPJVVGG0R', NULL, 4, 'AIK6015 Black has been delivered', 0, 'order', '2022-08-24 13:27:29', '2022-08-24 14:29:57'),
(130, 39, 73, '1S8Z9S10NN', NULL, 1, 'Order 1S8Z9S10NN has been placed', 1, 'order', '2022-08-25 16:44:55', '2022-08-25 16:44:55'),
(131, 39, 74, '8D7N0A3NHJ', NULL, 1, 'Order 8D7N0A3NHJ has been placed', 1, 'order', '2022-08-25 17:47:53', '2022-08-25 17:47:53'),
(132, 39, 75, 'CQYS47KFTL', NULL, 1, 'Order CQYS47KFTL has been placed', 1, 'order', '2022-08-26 00:22:19', '2022-08-26 00:22:19'),
(133, 56, 76, 'NOTTZRIVB3', NULL, 1, 'Order NOTTZRIVB3 has been placed', 1, 'order', '2024-06-18 12:22:56', '2024-06-18 12:22:56'),
(134, 11, 77, 'X6JS0WPQ7O', NULL, 1, 'Order X6JS0WPQ7O has been placed', 0, 'order', '2024-06-18 14:22:52', '2024-08-02 18:11:18'),
(135, 11, 78, 'K1G439X9IG', NULL, 1, 'Order K1G439X9IG has been placed', 0, 'order', '2024-06-18 14:26:02', '2024-08-02 18:11:18'),
(136, 56, 79, '5CJWPSN4TZ', NULL, 1, 'Order 5CJWPSN4TZ has been placed', 1, 'order', '2024-06-18 17:11:20', '2024-06-18 17:11:20'),
(137, 62, 81, 'RY66IVTE2A', NULL, 1, 'Order RY66IVTE2A has been placed', 1, 'order', '2024-06-21 13:48:00', '2024-06-21 13:48:00'),
(138, 62, 82, 'KOTYZE92KT', NULL, 1, 'Order KOTYZE92KT has been placed', 1, 'order', '2024-06-21 16:59:48', '2024-06-21 16:59:48'),
(139, 62, 83, 'MWZFSLTWZR', NULL, 1, 'Order MWZFSLTWZR has been placed', 1, 'order', '2024-06-21 17:14:07', '2024-06-21 17:14:07'),
(140, 62, 84, 'JKU231B61Z', NULL, 1, 'Order JKU231B61Z has been placed', 1, 'order', '2024-06-22 11:08:59', '2024-06-22 11:08:59'),
(141, 11, 85, 'FPZNHPO6PQ', NULL, 1, 'Order FPZNHPO6PQ has been placed', 0, 'order', '2024-06-24 12:30:14', '2024-08-02 18:11:18'),
(142, 62, 87, '8HP55PYSL8', NULL, 1, 'Order 8HP55PYSL8 has been placed', 1, 'order', '2024-06-24 13:37:53', '2024-06-24 13:37:53'),
(143, 62, 90, 'NKHM5KRXNI', NULL, 1, 'Order NKHM5KRXNI has been placed', 1, 'order', '2024-06-24 13:45:14', '2024-06-24 13:45:14'),
(144, 62, 91, 'RKW2VGJLQQ', NULL, 1, 'Order RKW2VGJLQQ has been placed', 1, 'order', '2024-06-25 13:48:15', '2024-06-25 13:48:15'),
(145, 62, 92, 'CIURRUBEOL', NULL, 1, 'Order CIURRUBEOL has been placed', 1, 'order', '2024-06-25 13:53:25', '2024-06-25 13:53:25'),
(146, 62, 93, 'F9HQTCMU2R', NULL, 1, 'Order F9HQTCMU2R has been placed', 1, 'order', '2024-06-25 14:05:49', '2024-06-25 14:05:49'),
(147, 62, 94, 'Y316RS8IXR', NULL, 1, 'Order Y316RS8IXR has been placed', 1, 'order', '2024-06-25 14:23:02', '2024-06-25 14:23:02'),
(148, 62, 95, '908SFICJBD', NULL, 1, 'Order 908SFICJBD has been placed', 1, 'order', '2024-06-25 14:25:36', '2024-06-25 14:25:36'),
(149, 62, 96, 'FSFDJHNZA9', NULL, 1, 'Order FSFDJHNZA9 has been placed', 1, 'order', '2024-06-25 15:04:12', '2024-06-25 15:04:12'),
(150, 62, 97, 'S40USIM1HA', NULL, 1, 'Order S40USIM1HA has been placed', 1, 'order', '2024-06-28 17:47:06', '2024-06-28 17:47:06'),
(151, 11, 100, 'QE2OHY6D0K', NULL, 1, 'Order QE2OHY6D0K has been placed', 0, 'order', '2024-06-29 06:18:24', '2024-08-02 18:11:18'),
(152, 62, 101, 'UF73N48FJC', NULL, 1, 'Order UF73N48FJC has been placed', 1, 'order', '2024-07-04 16:09:01', '2024-07-04 16:09:01'),
(153, 62, 102, 'KUS4N3YJNR', NULL, 1, 'Order KUS4N3YJNR has been placed', 1, 'order', '2024-07-05 05:01:36', '2024-07-05 05:01:36'),
(154, 11, 100, 'QE2OHY6D0K', NULL, 2, 'Termite Treatment has been confirmed', 0, 'order', '2024-07-06 02:38:54', '2024-08-02 18:11:18'),
(155, 11, 99, 'QE2OHY6D0K', NULL, 2, 'Termite Treatment has been confirmed', 0, 'order', '2024-07-06 02:39:10', '2024-08-02 18:11:18'),
(156, 11, 98, 'QE2OHY6D0K', NULL, 2, 'Bathroom Cleaner has been confirmed', 0, 'order', '2024-07-06 02:39:18', '2024-08-02 18:11:18'),
(157, 11, 100, 'QE2OHY6D0K', NULL, 3, 'Termite Treatment has been shipped', 0, 'order', '2024-07-06 02:39:24', '2024-08-02 18:11:18'),
(158, 11, 100, 'QE2OHY6D0K', NULL, 4, 'Termite Treatment has been delivered', 0, 'order', '2024-07-06 02:39:34', '2024-08-02 18:11:18'),
(159, 62, 103, 'I302B1QC5Q', NULL, 1, 'Order I302B1QC5Q has been placed', 1, 'order', '2024-07-06 16:42:20', '2024-07-06 16:42:20'),
(160, 62, 104, 'MX893EBNI0', NULL, 1, 'Order MX893EBNI0 has been placed', 1, 'order', '2024-07-06 16:59:34', '2024-07-06 16:59:34'),
(161, 62, 105, '1GLFA038SH', NULL, 1, 'Order 1GLFA038SH has been placed', 1, 'order', '2024-07-06 20:12:14', '2024-07-06 20:12:14'),
(162, 62, 107, 'QEHVJIKUSB', NULL, 1, 'Order QEHVJIKUSB has been placed', 1, 'order', '2024-07-06 21:14:52', '2024-07-06 21:14:52'),
(163, 98, 108, 'zd3pj', NULL, 1, 'Order zd3pj has been placed', 1, 'order', '2024-07-07 12:58:42', '2024-07-07 12:58:42'),
(164, 98, 109, 'istgt', NULL, 1, 'Order istgt has been placed', 1, 'order', '2024-07-07 13:01:55', '2024-07-07 13:01:55'),
(165, 98, 110, '0b5cgb', NULL, 1, 'Order 0b5cgb has been placed', 1, 'order', '2024-07-08 06:33:53', '2024-07-08 06:33:53'),
(166, 98, 110, '0b5cgb', NULL, 4, 'Order 0b5cgb has been cancelled', 1, 'order', '2024-07-08 08:54:34', '2024-07-08 08:54:34'),
(167, 98, 111, '1lm8xr', NULL, 1, 'Order 1lm8xr has been placed', 1, 'order', '2024-07-08 15:06:58', '2024-07-08 15:06:58'),
(168, 62, 117, 'IWYS3ZN4P9', NULL, 1, 'Order IWYS3ZN4P9 has been placed', 1, 'order', '2024-07-09 12:21:36', '2024-07-09 12:21:36'),
(169, 62, 119, 'NAFJWSL4NB', NULL, 1, 'Order NAFJWSL4NB has been placed', 1, 'order', '2024-07-09 12:23:13', '2024-07-09 12:23:13'),
(170, 62, 130, '9T02C8F8LO', NULL, 1, 'Order 9T02C8F8LO has been placed', 0, 'order', '2024-07-09 17:11:04', '2024-07-09 17:11:04'),
(171, 62, 131, 'ZAXRN8IC9L', NULL, 1, 'Order ZAXRN8IC9L has been placed', 0, 'order', '2024-07-09 17:22:52', '2024-07-09 17:22:52'),
(172, 62, 132, 'MZMSZOPJSE', NULL, 1, 'Order MZMSZOPJSE has been placed', 0, 'order', '2024-07-09 17:26:32', '2024-07-09 17:26:32'),
(173, 62, 133, 'SGEUIO2XAE', NULL, 1, 'Order SGEUIO2XAE has been placed', 0, 'order', '2024-07-09 17:32:19', '2024-07-09 17:32:19'),
(174, 62, 0, 'GHFH3P8Y56', NULL, 1, 'Order GHFH3P8Y56 has been placed', 0, 'order', '2024-07-09 17:33:56', '2024-07-09 17:33:56'),
(175, 62, 0, 'N2489E3K0Q', NULL, 1, 'Order N2489E3K0Q has been placed', 0, 'order', '2024-07-09 17:40:48', '2024-07-09 17:40:48'),
(176, 62, 0, 'MU3SKSKOVR', NULL, 1, 'Order MU3SKSKOVR has been placed', 0, 'order', '2024-07-09 17:48:30', '2024-07-09 17:48:30'),
(177, 62, 139, 'DCMWOL0GPL', NULL, 1, 'Order DCMWOL0GPL has been placed', 0, 'order', '2024-07-09 17:55:46', '2024-07-09 17:55:46'),
(178, 62, 140, '2TUH3KVNFH', NULL, 1, 'Order 2TUH3KVNFH has been placed', 0, 'order', '2024-07-09 18:02:18', '2024-07-09 18:02:18'),
(179, 62, 142, '6JXY6IEUND', NULL, 1, 'Order 6JXY6IEUND has been placed', 0, 'order', '2024-07-09 18:08:12', '2024-07-09 18:08:12'),
(180, 62, 0, 'LV5LC18NNK', NULL, 1, 'Order LV5LC18NNK has been placed', 0, 'order', '2024-07-09 18:10:15', '2024-07-09 18:10:15'),
(181, 98, 109, 'istgt', NULL, 4, 'Order istgt has been cancelled', 1, 'order', '2024-07-10 04:17:01', '2024-07-10 04:17:01'),
(182, 62, 149, 'KKE6YWLR0B', NULL, 1, 'Order KKE6YWLR0B has been placed', 0, 'order', '2024-07-10 11:59:11', '2024-07-10 11:59:11'),
(183, 62, 150, '1RUBQSYJ98', NULL, 1, 'Order 1RUBQSYJ98 has been placed', 0, 'order', '2024-07-10 12:00:02', '2024-07-10 12:00:02'),
(184, 62, 151, 'VS2IMT4LBY', NULL, 1, 'Order VS2IMT4LBY has been placed', 0, 'order', '2024-07-10 12:04:43', '2024-07-10 12:04:43'),
(185, 62, 152, 'N2SRDBI2OS', NULL, 1, 'Order N2SRDBI2OS has been placed', 0, 'order', '2024-07-10 12:13:12', '2024-07-10 12:13:12'),
(186, 62, 153, 'FNNWYE9LF0', NULL, 1, 'Order FNNWYE9LF0 has been placed', 0, 'order', '2024-07-10 12:16:38', '2024-07-10 12:16:38'),
(187, 62, 154, 'JVQ064QWLW', NULL, 1, 'Order JVQ064QWLW has been placed', 0, 'order', '2024-07-10 12:22:37', '2024-07-10 12:22:37'),
(188, 62, 155, 'FXPK88IPNF', NULL, 1, 'Order FXPK88IPNF has been placed', 0, 'order', '2024-07-10 12:33:04', '2024-07-10 12:33:04'),
(189, 62, 156, '5V9QIU2D7D', NULL, 1, 'Order 5V9QIU2D7D has been placed', 0, 'order', '2024-07-10 12:38:28', '2024-07-10 12:38:28'),
(190, 62, 157, '1WHIC6UNGP', NULL, 1, 'Order 1WHIC6UNGP has been placed', 0, 'order', '2024-07-10 12:42:31', '2024-07-10 12:42:31'),
(191, 62, 158, 'AZAC73VX4F', NULL, 1, 'Order AZAC73VX4F has been placed', 0, 'order', '2024-07-10 13:02:35', '2024-07-10 13:02:35'),
(192, 62, 159, 'HVXK5N5Z66', NULL, 1, 'Order HVXK5N5Z66 has been placed', 0, 'order', '2024-07-10 13:05:50', '2024-07-10 13:05:50'),
(193, 62, 160, '5L0GG3O7FO', NULL, 1, 'Order 5L0GG3O7FO has been placed', 0, 'order', '2024-07-10 13:08:33', '2024-07-10 13:08:33'),
(194, 62, 161, 'IVGXK5NO74', NULL, 1, 'Order IVGXK5NO74 has been placed', 0, 'order', '2024-07-10 13:10:34', '2024-07-10 13:10:34'),
(195, 62, 162, 'FG0HMRHL6A', NULL, 1, 'Order FG0HMRHL6A has been placed', 0, 'order', '2024-07-10 13:35:11', '2024-07-10 13:35:11'),
(196, 62, 163, '5W1E2EZH6K', NULL, 1, 'Order 5W1E2EZH6K has been placed', 0, 'order', '2024-07-10 13:38:42', '2024-07-10 13:38:42'),
(197, 62, 164, 'PRNU8HCYSZ', NULL, 1, 'Order PRNU8HCYSZ has been placed', 0, 'order', '2024-07-10 13:40:14', '2024-07-10 13:40:14'),
(198, 62, 165, 'V94CZS5LWY', NULL, 1, 'Order V94CZS5LWY has been placed', 0, 'order', '2024-07-10 14:01:27', '2024-07-10 14:01:27'),
(199, 62, 166, 'PVZKQO8PVQ', NULL, 1, 'Order PVZKQO8PVQ has been placed', 0, 'order', '2024-07-10 14:22:33', '2024-07-10 14:22:33'),
(200, 62, 167, 'WMPPPRC06B', NULL, 1, 'Order WMPPPRC06B has been placed', 0, 'order', '2024-07-10 14:30:29', '2024-07-10 14:30:29'),
(201, 62, 168, 'YC1SFAUUPS', NULL, 1, 'Order YC1SFAUUPS has been placed', 0, 'order', '2024-07-10 14:33:14', '2024-07-10 14:33:14'),
(202, 62, 169, 'SDASQVU2BV', NULL, 1, 'Order SDASQVU2BV has been placed', 0, 'order', '2024-07-10 14:38:03', '2024-07-10 14:38:03'),
(203, 98, 170, 'hqi3zb', NULL, 1, 'Order hqi3zb has been placed', 1, 'order', '2024-07-10 12:57:23', '2024-07-10 12:57:23'),
(204, 98, 171, 'qqkc1d', NULL, 1, 'Order qqkc1d has been placed', 1, 'order', '2024-07-10 18:50:27', '2024-07-10 18:50:27'),
(205, 98, 172, '2dnoc8', NULL, 1, 'Order 2dnoc8 has been placed', 1, 'order', '2024-07-10 19:37:26', '2024-07-10 19:37:26'),
(206, 62, 173, '92K1LHKAD6', NULL, 1, 'Order 92K1LHKAD6 has been placed', 0, 'order', '2024-07-11 01:32:57', '2024-07-11 01:32:57'),
(207, 62, 174, 'X63HTJX7QU', NULL, 1, 'Order X63HTJX7QU has been placed', 0, 'order', '2024-07-11 01:55:17', '2024-07-11 01:55:17'),
(208, 98, 112, '1lm8xr', NULL, 4, 'Order 1lm8xr has been cancelled', 1, 'order', '2024-07-10 20:25:18', '2024-07-10 20:25:18'),
(209, 98, 112, '1lm8xr', NULL, 4, 'Order 1lm8xr has been cancelled', 1, 'order', '2024-07-10 20:26:08', '2024-07-10 20:26:08'),
(210, 98, 175, 'sn82eo', NULL, 1, 'Order sn82eo has been placed', 1, 'order', '2024-07-10 20:31:09', '2024-07-10 20:31:09'),
(211, 101, 176, 'ygoo2n', NULL, 1, 'Order ygoo2n has been placed', 1, 'order', '2024-07-11 06:49:42', '2024-07-11 06:49:42'),
(212, 62, 178, 'C1CI7H5OB6', NULL, 1, 'Order C1CI7H5OB6 has been placed', 0, 'order', '2024-07-11 13:08:07', '2024-07-11 13:08:07'),
(213, 101, 179, 'NaN', NULL, 1, 'Order NaN has been placed', 1, 'order', '2024-07-11 08:32:23', '2024-07-11 08:32:23'),
(214, 101, 180, '10001', NULL, 1, 'Order 10001 has been placed', 1, 'order', '2024-07-11 09:09:27', '2024-07-11 09:09:27'),
(215, 101, 181, '10002', NULL, 1, 'Order 10002 has been placed', 1, 'order', '2024-07-11 10:03:05', '2024-07-11 10:03:05'),
(216, 98, 182, '10003', NULL, 1, 'Order 10003 has been placed', 1, 'order', '2024-07-17 11:08:57', '2024-07-17 11:08:57'),
(217, 62, 183, '10004', NULL, 1, 'Order 10004 has been placed', 1, 'order', '2024-08-10 08:38:41', '2024-08-10 08:38:41'),
(218, 98, 184, '10005', NULL, 1, 'Order 10005 has been placed', 1, 'order', '2024-08-20 08:40:10', '2024-08-20 08:40:10'),
(219, 98, 190, '10007', NULL, 1, 'Order 10007 has been placed', 1, 'order', '2024-08-21 06:29:34', '2024-08-21 06:29:34'),
(220, 98, 193, '10007', NULL, 1, 'Order 10007 has been placed', 1, 'order', '2024-08-21 07:08:24', '2024-08-21 07:08:24'),
(221, 98, 194, '10008', NULL, 1, 'Order 10008 has been placed', 1, 'order', '2024-08-21 07:17:19', '2024-08-21 07:17:19'),
(222, 98, 195, '10009', NULL, 1, 'Order 10009 has been placed', 1, 'order', '2024-08-21 07:20:47', '2024-08-21 07:20:47'),
(223, 62, 211, '10020', NULL, 1, 'Order 10020 has been placed', 1, 'order', '2024-08-22 19:11:01', '2024-08-22 19:11:01'),
(224, 62, 211, '10020', NULL, 3, 'cockroach control services has been shipped', 1, 'order', '2024-08-23 06:58:54', '2024-08-23 06:58:54'),
(225, 62, 212, '10021', NULL, 1, 'Order 10021 has been placed', 1, 'order', '2024-08-23 05:18:01', '2024-08-23 05:18:01'),
(226, 62, 213, '10022', NULL, 1, 'Order 10022 has been placed', 1, 'order', '2024-08-23 05:21:12', '2024-08-23 05:21:12'),
(227, 62, 214, '10023', NULL, 1, 'Order 10023 has been placed', 1, 'order', '2024-08-23 05:22:52', '2024-08-23 05:22:52'),
(228, 98, 215, '10024', NULL, 1, 'Order 10024 has been placed', 1, 'order', '2024-08-23 06:05:44', '2024-08-23 06:05:44'),
(229, 62, 217, '10026', NULL, 1, 'Order 10026 has been placed', 1, 'order', '2024-08-26 11:05:44', '2024-08-26 11:05:44'),
(230, 11, 220, '10027', NULL, 1, 'Order 10027 has been placed', 1, 'order', '2024-08-27 23:33:00', '2024-08-27 23:33:00'),
(231, 98, 223, '10028', NULL, 1, 'Order 10028 has been placed', 1, 'order', '2024-08-29 11:08:37', '2024-08-29 11:08:37'),
(232, 98, 224, '10029', NULL, 1, 'Order 10029 has been placed', 1, 'order', '2024-08-29 11:21:19', '2024-08-29 11:21:19'),
(233, 98, 225, '10030', NULL, 1, 'Order 10030 has been placed', 1, 'order', '2024-08-29 15:51:48', '2024-08-29 15:51:48'),
(234, 62, 230, '10031', NULL, 1, 'Order 10031 has been placed', 1, 'order', '2024-08-30 06:58:29', '2024-08-30 06:58:29'),
(235, 98, 232, '10032', NULL, 1, 'Order 10032 has been placed', 1, 'order', '2024-08-30 07:07:32', '2024-08-30 07:07:32'),
(236, 98, 235, '10034', NULL, 1, 'Order 10034 has been placed', 1, 'order', '2024-08-30 18:51:30', '2024-08-30 18:51:30'),
(237, 98, 225, '10030', NULL, 4, 'Order 10030 has been cancelled', 1, 'order', '2024-08-30 19:37:22', '2024-08-30 19:37:22'),
(238, 98, 238, '10035', NULL, 1, 'Order 10035 has been placed', 1, 'order', '2024-08-30 20:10:24', '2024-08-30 20:10:24'),
(239, 98, 239, '10035', NULL, 1, 'Order 10035 has been placed', 1, 'order', '2024-08-30 20:10:24', '2024-08-30 20:10:24'),
(240, 98, 240, '10036', NULL, 1, 'Order 10036 has been placed', 1, 'order', '2024-08-31 06:16:31', '2024-08-31 06:16:31'),
(241, 98, 243, '10037', NULL, 1, 'Order 10037 has been placed', 1, 'order', '2024-08-31 06:20:19', '2024-08-31 06:20:19'),
(242, 98, 243, '10037', NULL, 4, 'Order 10037 has been cancelled', 1, 'order', '2024-08-31 07:04:15', '2024-08-31 07:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `order_number` varchar(191) NOT NULL,
  `payment_id` text DEFAULT NULL,
  `product_name` varchar(191) NOT NULL,
  `slug` text DEFAULT NULL,
  `image` varchar(191) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` varchar(191) NOT NULL,
  `attribute` varchar(255) DEFAULT NULL,
  `variation` varchar(191) DEFAULT NULL,
  `variations_sku` varchar(50) DEFAULT NULL,
  `tax` varchar(191) DEFAULT NULL,
  `coupon_name` varchar(255) DEFAULT NULL,
  `discount_amount` varchar(255) DEFAULT NULL,
  `shipping_cost` varchar(191) DEFAULT NULL,
  `order_total` varchar(191) NOT NULL,
  `order_notes` longtext DEFAULT NULL,
  `payment_type` int(11) NOT NULL,
  `full_name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `mobile` varchar(191) NOT NULL,
  `landmark` varchar(191) DEFAULT NULL,
  `street_address` text NOT NULL,
  `pincode` varchar(191) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `return_reason` text DEFAULT NULL,
  `return_number` varchar(255) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `vendor_comment` text DEFAULT NULL,
  `reselling_order_flag` varchar(20) DEFAULT 'no',
  `resell_margin` varchar(50) DEFAULT NULL,
  `desired_date` varchar(50) NOT NULL,
  `desired_time` varchar(50) NOT NULL,
  `order_status` int(11) NOT NULL DEFAULT 1 COMMENT '\r\n1-Scheduled,2-Dispatched,3-OnSite,4-Completed,5-Incomplete\r\n',
  `questions` longtext DEFAULT NULL,
  `emp_onsite_image` longblob DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `is_otp_verified` int(11) NOT NULL DEFAULT 2,
  `confirmed_at` datetime DEFAULT NULL,
  `shipped_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `returned_at` datetime DEFAULT NULL,
  `accepted_at` datetime DEFAULT NULL,
  `started_at` varchar(50) DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `rejected_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `vendor_id`, `product_id`, `order_number`, `payment_id`, `product_name`, `slug`, `image`, `qty`, `price`, `attribute`, `variation`, `variations_sku`, `tax`, `coupon_name`, `discount_amount`, `shipping_cost`, `order_total`, `order_notes`, `payment_type`, `full_name`, `email`, `mobile`, `landmark`, `street_address`, `pincode`, `status`, `return_reason`, `return_number`, `comment`, `vendor_comment`, `reselling_order_flag`, `resell_margin`, `desired_date`, `desired_time`, `order_status`, `questions`, `emp_onsite_image`, `otp`, `is_otp_verified`, `confirmed_at`, `shipped_at`, `delivered_at`, `cancelled_at`, `returned_at`, `accepted_at`, `started_at`, `completed_at`, `rejected_at`, `created_at`, `updated_at`, `assigned_to`) VALUES
(76, 56, 6, 761, 'NOTTZRIVB3', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, NULL, '', '59.98', NULL, '0.0', '0.00', '3058.98', NULL, 1, 'rathaur rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '', '', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-18 12:22:56', '2024-09-05 02:45:49', 7),
(77, 11, 6, 770, 'X6JS0WPQ7O', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '650.0', 'Package', '3 BHK', '', '0', NULL, '0.0', '0', '650', NULL, 1, 'Lokesh R', 'lokesh2star@gmail.com', '9742935402', 'Kothanur dinne', '#91, S Square infrastructure apartment', '560078', 1, NULL, NULL, NULL, NULL, 'no', '', '', '', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-18 14:22:52', '2024-06-18 14:22:52', NULL),
(78, 11, 6, 770, 'K1G439X9IG', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.00', 'Package', '2 BHK', '', '0', NULL, '0', '0.00', '450', NULL, 1, 'Lokesh R', 'Lokesh2star@gmail.com', '9742935402', 'Kothanur dinne', '#91, S Square infrastructure apartment', '560078', 1, NULL, NULL, NULL, NULL, 'no', '', '', '', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-18 14:26:02', '2024-06-18 14:26:02', NULL),
(79, 56, 6, 761, '5CJWPSN4TZ', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2999.0', NULL, NULL, '', '119.96', NULL, '0.0', '0.00', '6117.96', NULL, 1, 'rathaur rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '', '', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-18 17:11:20', '2024-06-18 17:11:20', NULL),
(85, 11, 6, 770, 'FPZNHPO6PQ', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', '', '1', NULL, '0.0', '0', '251', '0', 1, 'Lokesh R', 'Lokesh2star@gmail.com', '9742935402', 'Kothanur dinne', '#91, S Square infrastructure apartment', '560078', 1, NULL, NULL, NULL, NULL, 'no', '', '', '', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-24 12:30:14', '2024-06-24 12:30:14', NULL),
(93, 11, 6, 770, 'F9HQTCMU2R', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', '', '1', NULL, '', '0', '251', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-09', '09:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-25 14:05:49', '2024-06-25 14:05:49', 1),
(94, 62, 6, 770, 'Y316RS8IXR', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '650.0', 'Package', '3 BHK', '', '1', NULL, '', '0', '651', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-09', '09:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-25 14:23:02', '2024-06-25 14:23:02', 1),
(95, 62, 6, 770, '908SFICJBD', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '650.0', 'Package', '3 BHK', '', '1', NULL, '', '0', '651', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-09', '12:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-25 14:25:36', '2024-06-25 14:25:36', 2),
(96, 62, 6, 770, 'FSFDJHNZA9', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', '', '1', NULL, '', '0', '251', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-09', '15:00', 3, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-25 15:04:12', '2024-06-25 15:04:12', 1),
(97, 62, 6, 770, 'S40USIM1HA', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', '', '1', NULL, '', '0', '451', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '', '', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-28 17:47:06', '2024-06-28 17:47:06', 1),
(100, 11, 6, 764, 'QE2OHY6D0K', NULL, 'Termite Treatment', NULL, 'product-666eda718e3c7.png', 1, '999.00', NULL, NULL, '', '19.98', NULL, NULL, '0.00', '1018.98', NULL, 1, 'Lokesh R', 'Lokesh2star@gmail.com', '9742935402', 'Kothanur dinne', '#91, S Square infrastructure apartment', '560078', 4, NULL, NULL, NULL, NULL, 'no', '', '2024-07-02', '03:00', 1, NULL, NULL, NULL, 2, '2024-07-06 02:38:54', '2024-07-06 02:39:24', '2024-07-06 02:39:34', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-29 06:18:24', '2024-07-06 02:39:34', 23),
(101, 62, 6, 770, 'UF73N48FJC', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', '', '1', NULL, '', '0', '251', '0', 1, 'rathaur rathaur', 'vishalrathaurpc@gmail.com', '+91917951875', 'gwal', 'bhrekma', '474033', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-01', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-04 16:09:00', '2024-09-05 02:45:10', 7),
(102, 62, 6, 770, 'KUS4N3YJNR', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', '', '1', NULL, '', '0', '451', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-04', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-05 05:01:36', '2024-07-05 05:01:36', 23),
(103, 62, 6, 770, 'I302B1QC5Q', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '650.0', 'Package', '3 BHK', '', '1', NULL, '', '0', '651', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '', '', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-06 16:42:19', '2024-07-06 16:42:19', NULL),
(104, 62, 6, 770, 'MX893EBNI0', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', '', '1', NULL, '', '0', '251.0', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-08', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-06 16:59:34', '2024-07-06 16:59:34', 23),
(105, 62, 6, 770, '1GLFA038SH', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', '', '1', NULL, '', '0', '-649.0', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-08', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-06 20:12:14', '2024-07-08 15:14:30', 20),
(106, 62, 6, 761, 'QEHVJIKUSB', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '0.0', NULL, NULL, '', '1', NULL, '', '0.00', '252.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-11', '04:00 PM', 5, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-06 21:14:52', '2024-07-06 21:14:52', 22),
(107, 62, 6, 770, 'QEHVJIKUSB', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', '', '1', NULL, NULL, '0', '252.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', '', '2024-07-11', '04:00 PM', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-06 21:14:52', '2024-07-06 21:14:52', 23),
(109, 98, 6, 759, 'istgt', NULL, 'AC Repair', NULL, 'product-665f08919d9a5.jpg', 1, '199', NULL, 'L', NULL, '0', NULL, NULL, '0', '199', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 6, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-10', '09:00 AM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-07 13:01:54', '2024-07-10 04:17:01', NULL),
(110, 98, 6, 759, '0b5cgb', NULL, 'AC Repair', NULL, 'product-665f08919d9a5.jpg', 3, '199', NULL, 'L', NULL, '0', NULL, NULL, '0', '597', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 6, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-09', '04:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-08 06:33:53', '2024-07-08 08:54:34', NULL),
(111, 98, 6, 769, '1lm8xr', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '12362.4', NULL, 'intense, 2 BHK, 1000 - 1500 Sq', NULL, '242.4', NULL, NULL, '0', '25001.6', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 0, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '09:00 AM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-08 15:06:57', '2024-07-08 15:06:57', NULL),
(112, 98, 6, 769, '1lm8xr', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '12158.4', NULL, 'AMC, 2 BHK, 1000 - 1500 Sq', NULL, '238.4', NULL, NULL, '0', '25001.6', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 6, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-13', '01:00 PM', 6, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-08 15:06:57', '2024-07-10 20:26:07', NULL),
(113, 62, 6, 770, 'VEJARXKIAI', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', NULL, '1', NULL, '', '0', '451.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '04:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 12:13:23', '2024-07-09 12:13:23', NULL),
(114, 62, 6, 770, 'U9K6FCZ06T', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', NULL, '1', NULL, '', '0', '451.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 12:15:51', '2024-07-09 12:15:51', NULL),
(115, 62, 6, 770, 'HDJXS2JPCM', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', NULL, '1', NULL, '', '0', '451.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 12:15:51', '2024-07-09 12:15:51', NULL),
(116, 62, 6, 770, 'QTD1QXNOOY', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', NULL, '1', NULL, '', '0', '451.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 12:18:42', '2024-07-09 12:18:42', NULL),
(117, 62, 6, 770, 'IWYS3ZN4P9', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', NULL, '1', NULL, '', '0', '451.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 12:21:36', '2024-07-09 12:21:36', NULL),
(118, 62, 6, 768, 'NAFJWSL4NB', NULL, 'BedBug Controller', NULL, 'product-665ff37357e3a.png', 1, '0.0', NULL, NULL, NULL, '1', NULL, '', '0', '652.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '05:00 PM', 4, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 12:23:13', '2024-07-10 21:02:30', 23),
(119, 62, 6, 770, 'NAFJWSL4NB', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '650.0', 'Package', '3 BHK', NULL, '1', NULL, NULL, '0', '652.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 12:23:13', '2024-07-09 12:23:13', 23),
(120, 62, 6, 769, 'QAW3O47YQG', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:01:40', '2024-07-09 16:01:40', NULL),
(121, 62, 6, 769, 'OQ1MCTT6WU', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:01:58', '2024-07-09 16:01:58', NULL),
(122, 62, 6, 769, 'UMRLC3BBJK', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:06:35', '2024-07-09 16:06:35', NULL),
(123, 62, 6, 769, '2CH21L1QPR', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:06:59', '2024-07-09 16:06:59', NULL),
(124, 62, 6, 769, 'ZBY1QBSUPW', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:06:59', '2024-07-09 16:06:59', NULL),
(125, 62, 6, 769, '9FQAK3B937', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'rathaur rathaur', 'vishalrathaurpc@gmail.com', '+91917951875', 'gwal', 'bhrekma', '474033', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:08:23', '2024-07-09 16:08:23', NULL),
(126, 62, 6, 769, '50J470LRH7', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:15:51', '2024-07-09 16:15:51', NULL),
(127, 62, 6, 769, 'EA1A9FT4QA', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:24:13', '2024-07-09 16:24:13', NULL),
(128, 62, 6, 769, '9I7HIMLL6Q', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:24:44', '2024-07-09 16:24:44', NULL),
(129, 62, 6, 769, '04ZWHKSGK1', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 16:25:43', '2024-07-09 16:25:43', NULL),
(130, 62, 6, 769, '9T02C8F8LO', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '2999.0', 'Add On', 'intense', NULL, '1', NULL, '', '0.00', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:11:03', '2024-07-09 17:11:03', NULL),
(131, 62, 6, 770, 'ZAXRN8IC9L', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '650.0', 'Package', '3 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:22:52', '2024-07-09 17:22:52', NULL),
(132, 62, 6, 770, 'MZMSZOPJSE', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:26:32', '2024-07-09 17:26:32', NULL),
(133, 62, 6, 770, 'SGEUIO2XAE', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:32:18', '2024-07-09 17:32:18', NULL),
(134, 62, 6, 770, 'GHFH3P8Y56', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:33:56', '2024-07-09 17:33:56', 1),
(135, 62, 6, 770, 'N2489E3K0Q', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:40:48', '2024-07-09 17:40:48', 1),
(136, 62, 6, 770, 'MU3SKSKOVR', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:48:30', '2024-07-09 17:48:30', 1),
(137, 62, 6, 770, 'MU3SKSKOVR', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, NULL, '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:48:30', '2024-07-09 17:48:30', 1),
(138, 62, 6, 770, 'DCMWOL0GPL', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:55:46', '2024-07-09 17:55:46', NULL),
(139, 62, 6, 770, 'DCMWOL0GPL', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, NULL, '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 17:55:46', '2024-07-09 17:55:46', NULL),
(140, 62, 6, 770, '2TUH3KVNFH', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 18:02:18', '2024-07-09 18:02:18', NULL),
(141, 62, 6, 770, 'R8ZVB50V8R', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 18:05:13', '2024-07-09 18:05:13', NULL),
(142, 62, 6, 770, '6JXY6IEUND', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 18:08:12', '2024-07-09 18:08:12', NULL),
(143, 62, 6, 770, 'LV5LC18NNK', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 18:10:15', '2024-07-09 18:10:15', 1),
(144, 62, 6, 770, 'WCUJ6MG6M6', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '3000.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-12', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-09 19:05:02', '2024-07-09 19:05:02', NULL),
(145, 62, 6, 770, 'L1KFTPC54J', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 11:49:17', '2024-07-10 11:49:17', NULL),
(146, 62, 6, 770, 'XNREFGNYOW', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 11:49:21', '2024-07-10 11:49:21', NULL),
(147, 62, 6, 770, 'M31UR0T595', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 11:49:39', '2024-07-10 11:49:39', NULL),
(148, 62, 6, 770, 'SJJDGK6TVE', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '451.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 11:54:24', '2024-07-10 11:54:24', NULL),
(149, 62, 6, 770, 'KKE6YWLR0B', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '451.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 11:59:11', '2024-07-10 11:59:11', NULL),
(150, 62, 6, 770, '1RUBQSYJ98', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '451.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '01:00 PM', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:00:01', '2024-07-10 12:00:01', NULL),
(151, 62, 6, 770, 'VS2IMT4LBY', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:04:43', '2024-07-10 12:04:43', NULL),
(152, 62, 6, 770, 'N2SRDBI2OS', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:13:12', '2024-07-10 12:13:12', NULL),
(153, 62, 6, 770, 'FNNWYE9LF0', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:16:37', '2024-07-10 12:16:37', NULL),
(154, 62, 6, 770, 'JVQ064QWLW', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:22:37', '2024-07-10 12:22:37', NULL),
(155, 62, 6, 770, 'FXPK88IPNF', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:33:04', '2024-07-10 12:33:04', NULL),
(156, 62, 6, 770, '5V9QIU2D7D', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:38:28', '2024-07-10 12:38:28', NULL),
(157, 62, 6, 770, '1WHIC6UNGP', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:42:31', '2024-07-10 12:42:31', NULL),
(158, 62, 6, 770, 'AZAC73VX4F', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 13:02:35', '2024-07-10 13:02:35', NULL),
(159, 62, 6, 770, 'HVXK5N5Z66', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 13:05:50', '2024-07-10 13:05:50', NULL),
(160, 62, 6, 770, '5L0GG3O7FO', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 13:08:33', '2024-07-10 13:08:33', NULL),
(161, 62, 6, 770, 'IVGXK5NO74', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 13:10:34', '2024-07-10 13:10:34', NULL),
(162, 62, 6, 770, 'FG0HMRHL6A', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 13:35:11', '2024-07-10 13:35:11', NULL),
(163, 62, 6, 770, '5W1E2EZH6K', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 13:38:42', '2024-07-10 13:38:42', NULL),
(164, 62, 6, 770, 'PRNU8HCYSZ', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 13:40:14', '2024-07-10 13:40:14', 25),
(165, 62, 6, 770, 'V94CZS5LWY', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-14', '03:00', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 14:01:27', '2024-07-10 14:01:27', 30),
(166, 62, 6, 770, 'PVZKQO8PVQ', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '03:00', 4, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 14:22:33', '2024-07-10 21:21:45', 23),
(167, 62, 6, 770, 'WMPPPRC06B', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-10', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 14:30:29', '2024-07-10 14:30:29', NULL),
(168, 62, 6, 770, 'YC1SFAUUPS', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '23:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 14:33:14', '2024-07-11 00:49:33', 2),
(169, 62, 6, 770, 'SDASQVU2BV', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '251.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-10', '23:30', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 14:38:03', '2024-07-10 23:11:34', 2),
(170, 98, 6, 761, 'hqi3zb', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2548.98', NULL, '', NULL, '99.96000000000001', NULL, NULL, '0', '5197.92', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9179518784', 'tmh', 'mankada via, Malappuram district', '679324', 4, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-10', '02:00', 4, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 12:57:22', '2024-07-11 01:02:17', 25),
(171, 98, 6, 769, 'qqkc1d', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '7548', NULL, 'AMC, 2 BHK', NULL, '148', NULL, NULL, '0', '7696', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 0, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '03:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 18:50:26', '2024-07-10 19:31:58', NULL),
(172, 98, 6, 770, '2dnoc8', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '208', NULL, '', NULL, '8', NULL, NULL, '0', '216', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 0, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-10', '02:00', 4, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 19:37:25', '2024-07-11 01:28:02', 25),
(173, 62, 6, 770, '92K1LHKAD6', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '51.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '10:20', 4, NULL, NULL, NULL, 2, '2024-07-11 01:32:57', '2024-07-11 01:32:57', '2024-07-11 01:32:57', NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-11 01:32:57', '2024-07-11 01:38:49', 25),
(174, 62, 6, 770, 'X63HTJX7QU', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '51.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '12:40', 4, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-11 01:55:17', '2024-07-11 11:02:58', 25),
(175, 98, 6, 761, 'sn82eo', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2548.98', NULL, '', NULL, '49.980000000000004', NULL, NULL, '0', '2598.96', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '12:00', 4, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-10 20:31:08', '2024-07-11 10:48:29', 25),
(176, 101, 6, 769, 'ygoo2n', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '5508', NULL, 'AMC, 1 BHK', NULL, '108', NULL, NULL, '0', '5616', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '09745275325', 'tmh', 'thennattu house, vellila p/o , mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '13:00', 4, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-11 06:49:41', '2024-08-13 15:52:21', 30),
(177, 62, 6, 770, 'C1CI7H5OB6', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '250.0', 'Package', '1 BHK', NULL, '1', NULL, '', '0', '502.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '9179518784', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-15', '05:00 PM', 3, NULL, 0x2f746d702f706870557868444f75, 564940, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 12:38:01', NULL, NULL, '2024-07-11 13:08:07', '2024-08-22 12:38:01', 30),
(178, 62, 6, 770, '10000', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', 'Package', '2 BHK', NULL, '1', NULL, NULL, '0', '502.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '14:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-11 13:08:07', '2024-07-11 14:03:35', 27);
INSERT INTO `orders` (`id`, `user_id`, `vendor_id`, `product_id`, `order_number`, `payment_id`, `product_name`, `slug`, `image`, `qty`, `price`, `attribute`, `variation`, `variations_sku`, `tax`, `coupon_name`, `discount_amount`, `shipping_cost`, `order_total`, `order_notes`, `payment_type`, `full_name`, `email`, `mobile`, `landmark`, `street_address`, `pincode`, `status`, `return_reason`, `return_number`, `comment`, `vendor_comment`, `reselling_order_flag`, `resell_margin`, `desired_date`, `desired_time`, `order_status`, `questions`, `emp_onsite_image`, `otp`, `is_otp_verified`, `confirmed_at`, `shipped_at`, `delivered_at`, `cancelled_at`, `returned_at`, `accepted_at`, `started_at`, `completed_at`, `rejected_at`, `created_at`, `updated_at`, `assigned_to`) VALUES
(180, 101, 6, 770, '10001', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '208', NULL, '', NULL, '8', NULL, NULL, '0', '216', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9179518784', 'tmh', 'thennattu house, vellila p/o , mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-13', '11:00 AM', 3, NULL, 0xffd8ffe000104a46494600010100000100010000ffdb008400060606060706070808070a0b0a0b0a0f0e0c0c0e0f1610111011101622151915151915221e241e1c1e241e362a26262a363e3432343e4c44444c5f5a5f7c7ca701060606060706070808070a0b0a0b0a0f0e0c0c0e0f1610111011101622151915151915221e241e1c1e241e362a26262a363e3432343e4c44444c5f5a5f7c7ca7ffc20011080384064003012200021101031101ffc40032000002030101010000000000000000000000010203040506070101010101010100000000000000000000000102030405ffda000c03010002100310000002d30bce7bce5d123280974b3caae2134000000054c000000130ae3722a251443290c10000026000000000000009800000000000c0130892412844b4ac2c20c90980c00059efc335aeee5ee96e1ad61918ad85103519226c8e49c5b176154ae9d66d130892711241126116c10c0180304c06028d342481b40c095800d3002c1a6004ac00657663af44d61a27241320000004d00021a543421a10d09308a92126849a146488a944528c86d01876da66d200d300001d21a1a8c23252f52df3458081128108b8c5e874a132279d4c51bab4a63a05cee70276672cd2533260200000a000000038b0846e4524e224c1008000000140218818818818818980000c430062a2442241124c8130acb19516854ae814212d9655289e7d17180db2b314b592d165886e20da062600030000001800d3b00001a800c01808c0180313069800313069834c002346845778c00000008000001000020150024d021020126849a12691458a85224d31830006000030010ea994c840a84d40e20ebb4b33e88aa9464ca66aa8baa9a88b7102535821908dd12857c4ae71897cb2cacd0576000000000000102615c2fad603043043110c10c10c10c10c000626000342b000018000034c000006020d154d775217d5a40094006020028d3401800000c0500060000c00006050d300600d00060034c1a6000030681898c018818031300004c0010d00c843421824c549a129212611524454911528954a5006a439260d3006000c0a0100312718693a8b6925153aae5304c00033ceb59484ea2e51232574aab1884c93ad8a1644cf26c56c264c6ac00000000020002328cb000132900002000000000313000000069800a0340050018000003b000130ae3704660002800c080006000580030251a0600c000018034c00a600c00068098c40d80300001a60d3149300001803000060000015d81086800543409a10d093088d093424d0934461242946449a60d31800000140c41308a71056322d803400500026196ab88e6f4251940109c05b2a9c88c640810c944a270b658b0b2c02c00000000020002324b58000081a2000608609800000500e000000001a158000c4c430430062018003130018000000c1006002800c4c0000600003a00806086c00a698898c1a600119a60d30006980d30698340c0069800300000000080004c10021a543424c22a4849a126851944812445a90da44c8b18300749820028020340300000000a1340019864880000436b54dc614a2d6da498d5779965163105c05800000d008600287162d604099400098898000a0080000c4315300068980000d3004a300681898000d14c00010681800d0ac231202c184a00800301469800000da06053010698000c01a6000300698340d344930180003001a600c0000621821908608000040080549a10d09344549118ce24632446509126983520029800000c13040001821800521822cb8cb2d934e2810991245532400260802319b582b11546c84a883350a5620100140000002000a86a501d2011a0189800000000000000034530200280014800000060000000c000069800000c4c0000060003002069a805800ac1800830069800300180340c0180000d0c6263130681b40c4c1a60206003489021a60868432129044611524b152428cd1152445344534465190da6300180014003000040018ac205f619a7a1442c8d90893b130d4e2012a8ce267b26119c1164a90b94113828ac74572260215d810b1030040000a00004001589aa681821a0462060000000014000003000000007001400a0300200626140000d00000006000003112b14800400560042511c890980000d3a1a600c01800803131886034c1802689000c0018030001a600000030434000010260934a80126849a12944519220a4aa124e24d30006000000e90ef4cf2dd594d859ce8dcb521291a886acaeda6e9a00de400e20d6289821821828cc2a8de8a5db12b911ab65448b54250c6009820001400008002b1c55a04602a608000000000001400000c000200018000a000d163025001a18000c0130000060000300018002249a0681a6e9490340371637170c0a6260d0368189a000c01898c0000600c4c1a600c00180000c00000000204000086849a54a4888d0934454a24534465190da6000c00006051b716eb2ccfa33e539a962303bc0004ebca3767d13401bc801c503150d0d000d0000000009a1466ca55c55139c093aa658040862014020008294158002062000460800180000000000c10c500060800a0c002c1a256050020d10c4d400000698000d30001a062600034c1a29a681a63698003130681898c40da062060c018340c041a60c0018340da06260c00006982680000204d0268134a93424d093428ca24534465190da06d30000180147479dd1b9745f9b36e70b1019d2000028aaea6e94035000e52c7ab97450d965981ebc763010001304000000000098260000002000094008c2cac005001808000982600000000c00000000614000c4302500001180a00000340c4c004005600342301400001881898c40c018300280626000c184030060000d0322aac22132ab06d30624600d80030698000d30000000210c540080126093424d0a32446338918ca2427190c1834c0180140c17479fd0b974dd44b60e4801b80011928aaeaec94035000e26acf7f0edadc65d3060e8624cec110d000000268000000000000004000012800abb6a0621a1802189808189800000345302001401189a8023114c40c05000006221898000c00001800003130004310370458565969532d2889a4c68dc608a744e623a872635d838e93b2f8703be79e8a7a0870d9d95c70eb2e589d38600df1c6eb5f5b8ddc9b009589a8d391b4e80600c0189800000000004a86843409a1268498453428ca24538d4651943698300614300602e8f3f7dcba2faa26d9600680000a2338c800a003949d5c3b751d72e98966bea4c405c800262a020004304304000140100009a0000094aecac4000000034000313000000001a600000002b00000001a06260003502664c573d88f22367697151db5c38a7797051dc8f159d78f283a91e709bd610d91caecd31a02e5584e2818983424810da0600c4c000698300060301a909922ceff9ff00413a2193434c18c018003001800000c43400001289824d026813424d0a3288a32891528d45a70d8c1a060530060d16fc1d0b0aada62e13d400a0004c88ca32002800e667adf0edd59f3acd675d742b2b07ac21a10c10d086086086940204ca43500009a04d0c44aebb20440504231031031031031037174c000000188181034531300254c000b180a427047e7bd070ee2b02e134c02427288d00d4a031a009112484ec440112236909d8554350c1d886818c1a060c4480062631300926369acbd179df493701934980c600c018000035008000000004d0012a1a10024d093428b428ca245355169c49a060c01d8310d806fc1bb51c27545a05801400004260005001c2aeda78769dd9ecb2d75c8934fa7243290c1260860819119086094908609492a525093040042719628144218841289592cf5783b22e5614e8b230c42b1300000000626000c000001898c519c4af95d5c3ac61659715c6eac4e4c8d77d28adae449c1162885d5a928934924c9572057d512d75304da0304c01b153420c7436c43044a4b5c980e4c835611f4be6bd34dc06a6c1900c06313ab31b8a6e000062a6108608680010d4a26813424d093428c9114d118ca35169c49a60d321cbaf26a6c9e6d9a74aeaed85bb0ee429ba31202c00a0000200000a0038b9b5e7e1d94d164a5165b2859d39a19728611182182182524a860949086094942520829212929546709609a10200428ca042fa25a919c2cb0b3386f8d909526420158003000006098000030006d308ce2519afab59e79135cc92a0d0b1db2dd145cb108dc45938839464890c1c92a90c4d09352442719119466119c49268929442dae5512512716e20c118351a90c107a6f33e95b60f3b00018af06ff312f3055d743d0f95e859ea40c8000050080004d026a513049a1201292229a14651229aa834e1b4c755b8ab8f2959a59d5c1d26ad96acce6b6e2da109d72580500500001000005001c7a3467e1d94e12d65805b6d1a37840ee50021845c4191950d38430430892425242524b14d424d2919462a2bae6ae2865a56c70940538bb9aedae7639d362ed84e08934a0128d31800000030437160d3069d8301c27032a25673a2a3ae78e8b2b9b1dbae6f3df4ddae400c0d313184a3222d8484c6c880cb2c8004a2c90322c094ab63946442c8c4b5541746b98003681b4c1a07e8bcefa19bb1867a0c62632bf23dff003f3a2c9d1a25aec9bde3d8be76fcc630134a0000409a04c950020049a12711268519448a6aa0d386d03c10e669aa59f65b774b9ddb254119896cc5b6c2bb33468cdc7a57b2f8f35ef5bc8eadcc8000000a003914df570ed53946c90cb1e9cbaf5843379430430ae16572c6499683b10c10c12609491152ae2153cd357cb2a8dbcf79daae925acab32ce5d10ad857603a74655bacaa7d39d9762df9bb6ccf6e6c88b188591122420620620600c00698da74e4a484271314e32b3974b8ef9575df4e3abd74cf3dada3664df9c0779a6344c2984cada224e216453063a0009290da42410e500b61175310313424824d3a06a06c54d81e83cff75bd20f3d131898463f2bedf2b5e5f561b73d0e7f4b99ac5fe83cdef67d74b16d80010d280409a00254262041192229a126851688c651a8810f35b86b9cfb7d6de7ceefec48c1aec1324655eb9cb6e3d99e870fb9e773acc11272aa75b3a5cada9d401002800003955d91e1d6a8c85066b2b5e5d3acc866f0861118570ba0532b495b1ea219094908622524b0ae614f3f6e1cd22a99a4105a23653ac4dd28b95255d6650d2a9b299396b35dd6b215a866f69f2ba99d48443006d39400018003060329b248c1d109c4c738d870e01be2537e59aaf467b33d6eb2166b8343b9001b53216573224a4565b01592914d8d15ce112fb33c8994c9524e0251013b252848728b4938ba60c600c112131f7785dc9bd4333d0600028ce6cbc5ae7d0c74e84345d33e127d0e7f49dfec79deea5e04098a80810086a54d009a10028b424e224e228b5514d4532951a9874f33a3eaf2f4b573ee71eac1d7c3d9873ebcbeaf9fbb773b7f9fd3579eeff9fe5eb228689db3b21d0c9d067781600000001cb0971eb92709ca986b2b45176b370ce9cd29210c22a71962c0903b10c22304308928954c663c1d3e6e754516e4cea2eb8ea5d4b57281d44611183b212aba519d9ae13859954a329bf9f6e6f584674da70da0600342b71649c59270693700b0acab235c4aaca651c41e6df29d16a6f674b857ce944a0ee2f9e7779e849b3270922b504d556125090e24aa24a3134912684528c9545a04031a1ca321b8bb24e2d24e3224860d3069abedf17b0d6f198ea8711b4c3cbfa8f219ddfbf1e9ceba44d49cce07a0e06e6feef1baf66f0210d0264b152a87cfe27397af5f30b3b5d4f2723d959e6f54bd941114d0a2e82c555b50021e3db8779e4df43f470f415572ede0d91cbcfe5dfab3e118efd9eaf959e77eb3cf4ba1cfaf127d0e4ab754cd1ab0589e8edf3fddb260000001cc707c7a5121cd4586b2adae773a5875e68608010c224928369160218218454911248a397d6e54b9706fe5674da7acb52548611184493a52524b6c84f4d94d914c90b2b0033aeaddcce9e2b716ac4449c418856e2e1881881a512518aa9248528b938945f56e4a708ea5c9caabb675908b84394625ba31a4dd6733645b6e79dc4e79ec6673a0ab63148098c009408690a031a9446e0c991764a51904a324983a1aa25bdd562d9d6e4f517a6067ac68b39b2f59c2c1794e965c6e19e7cbcf7e864a21be0f5659d9d8f43e37b167a13cc74e3a88204d4a72babe6d785123ac8e2ead75da7435f3ba474f15986cedbe219bab97811b258efd4d7bf8d197d161e6d06974eed654e18358915bc74b1d6e5b675dd44e692d967be5c8c8cb6d94c8bfa5cbd31df95376b200001cb6df2e94928e75107aca6166c61d790008608684300000281a00040094a255caebf2a39dcbe860cee72aecb99291641492a4c10144d4ecb2c5759629b31556d64a128e6ddd3e7efc6a445cadc58c4d58030200000146501021a10a517671abb0dcaeab684d33aa54f44214b36a8cce6771149a033e98426aeb71d937b2556f331a736f89171bcdca0e0710621649031031163719034c94a121ca3349c9739aab391cf7d45169d8ebf0b66b1e986b1ac5e7bb9866f91a3a5c69ad59ebc31b2aa6cd625762bea6b4553766ac93d66fcf8897d1757c56967da1c4ece6cbcc7a7f272f1e37d3a9102e65a32b3476787dbad9bf95beb8183760cd45d4259a324aba0b3eab2871bd71cdd79ebb313832383667284aadd3d0d96716ed39d3349466ab7094b6595e98968cd08eddfe76767a07e7e75e8a5e774a6861cba42bbf367448359132cd8e13ebcc0113012921300194818879a341951a8c7a6a4a712be575b951c8c5bf0e7719c25acd80c8a6840804ea53aecb3468cf6d9b230b4e7537d037179bb74d17e3434e56e2c6d3189a8d0300040a0e30352a8b1a2af467393070dc545d52682256ad1d2f487815d0c179c584c89a1556426a17d364def953375d7835e1df194651736270d20645a8206269222c934ec728cc4c76138cc9f235f2a769c13cee57e7b0e8eee395f42519665746c0865d9cd3c5c34656cb2a93364a1651af9fd1bba32ceaccb6da4b9d10759a7afe76e97de790ef73f3ae2e5b6ba8a6ae06ad25d6e474edb254e3ce96cc3dbb99cb3db670e8ea7309eec3a2c9571a4b650bb3bae2901775ace57475d09d6aaae0d9e871e4d16669d766759e48cead8548b5d4d2e95122eb33db56a52b3b2071d993666ceda66b22659a2da2fe9cc02c4304009949762e5f217d4f3389134d35296e8d6c9ca86752ee3a3d367e007639d7d314ca13a9ca2ec4a51102a621276536568bb2dba9b4a2714e7b2aa8a0c5ea5b19634301812b6818030251a0138d45302719a458ea7975e539193b9c2b2c529b54d8da753a1c27a96d28bc98366299118d82d760d134164415ca0d26412b488109589a371958da763929a0c7448909b2c870fbdc2c768b4f3d1c96f3277399d7d4f4ec3260071fa5e6aeb8f2aabbbb2814c59653249db4c5a8b4a494a0d2d8a553d39b69afbde7346750e47b9f2535cf53359d1ab9b7d99fb1c6eb23c3d9e2ce9bfa9e63af71d3c1ca8dcd2e3aa51955918b94bd4c9d3e34b5b8b5d76e1b8aa51bac21741257e4beb45f994b4d6a32cc889375b26e0cb27448bf462b2cf480f8eca2fcf34d4a36035659a726cde101ac8982182f2fdaf22b18a8cb38a892716034000da0524c251431202216cf3babd573462764acaacad16517ea6b8ca267cb765891519d771f33466ec70b21312b07000002b10342126909c24128bb2ccf754478bdce36f1413a73bd0e9be6edbeb8ea5320d7162180084304c9ac55d25a0d328c86c6b896e0c366c6bce3a73392fb28e4d9d15b98e5a63642718597cf115bdf3e35d6b7814cbdcf31655cba45d9667a2e9e4d1ab4db7e067ab1e62ebcba7b385d1df3edf9bf65e57cde8e367d14aa7194cdb6d764e97d3aac38f1f43e7ef31c59215b53b14aceb9da82f97a6ed73a62362b39ab5668cfd4e6f5d9d58fb5cfd5f3e4abccba50824f4e68592b2825be55d6d77a8cdad3973b1ac6da526fbf992b3ab9f35c9196cccaaa71ceb2c6ea84e2249c4252ac2e579a94d94591eb00e3b74dd096b8ca2ad35acbdb837ef0266b2860819c9f2ddae12c62d4a2902900e128d39c0071b222308b9448ca36153beaa52524896446d4e89c2db27742cd4d19ede74b5e70c6984095f9e469e871e67a3a73f3b2df97244b6dc8ebb5bbccec97b4a2e1881c5a0710908a9a9589979bd296b3ce875b02c77e2ea2cebdb2dccdc9ec4733952eba97972e9230cb612e47a4333bc8a0bc5a256388124128a2c7075670bb7c5ebce94edf679e835592e13a4f3798ba8ab98ba659cb8e8c3c3d0cadf0edd0709cdc84edb20a498ca9dcfa5d5c3d3af3fa1f1bd1f3f9b55b1d33a6395f329b73e8ceb56fe35b6747cfd955c4a376d6b9d2f45cdd3275399d299f51e53d3f22b8bd1e5ef9d2c52c468c2a05dd0e6ee37e384ab8cadab38bcdfa74e6bebd16f3a1b6bcda33edc116dd5c666518a24e013700b2ecd3b3a37f3ba1ace5ab773b3ab22ae971138000370669b71e8d48d8d1ea5f95dbcb5dd5ccba5b8cab3ad6556eb31db9356b330378001341e2f07479ca90a56263095894eb18c0993a519c481252ab2b98eb9446122764dae402e25641d5daf9cecd9cad3933a8b466898138cec9c855664ba9cd251b0832749cd9d5287d33b4a67c3a4d44493832c51753b68b92d4164b93d3c4b9ba7cceb69b1c23bcb841e2b119a2230c8a59a8a26a0449c05990091111b8b253ae753e37678fd79ce79ed2646565729c75211992c0bde6f1f36dcfcfb56ee9cd4eea64d4c82b6c2304aaaba373a3473ccba1cf154b6e0e855bcdbb04cc45ad239fa98edcdb2eb9a84ecbae9f4f0e9d65e5d2cb32dd8d9e75b1ea5bc8c3e9f21c295865b2701a5195319542e9cbb56e1ec6ee5966b1a863b2bc5a736bcb2112d92a5b73cb581ac0d359082cd58aeb9ea510d1a9cfbead52c79be8f8255284b34220eda59b2a8958c89249c0344b2b8db0ce56bd5c991ecf7f80efd9e806910d1e339fbf9ea9352801269d91939115354c60acae4494915ceea259e7dd92565d7b57e7b2a5ca4e1ae539892aa3a315c8ac0cac3346092941d5964342d50bccf5c32859792b142cb674debd0c7dbe675c4b573b5f0ef34899938489b8cac95b55a9638ba2b9b397d0c1aaba34590de4713164919a41c16515189288b3201351091122644a94a2d27284acb393d6e5f4ce4d50b3724279080a232cd8d571ce2ea8c567a5a550cdd0a855a234ab3446a565918965ceab2ea49c5a7a33da9152892225b77470f4ea4edb12ab02800941819754a381b36720ecca9bface565ea72f09baaccedd53a64c76576e796dec70bafbb5c15336414334cd6d59cdfd4c0f8fb6db7156d575ec37c6bdd568e3ebd1c5f478b5e5e24a2fd1e3d7bb9bbb78cbd0c3d32ee3eec0611c71a1a60d324cb4e700800000dc641284c26a55e87bbe13d926902cf1383b5c59526a50024e259263a6344a3281628592a73b49e3ebe1ceeec7ae9d18f39a212c722727ae6ec56e965d5596578f561cea9528e3526a5724932ebf3ec6b2abf24de76873b1c6547631ed9d34f3f4ddf43c3cad98f6fcef7214b382509db3719d92baa9d931031064274575142cd48350cdb14238b283809a14600a409a0687002a94ab9a592ae556e1d996ce8727a7cdb11547b62f9653593069e6f0eaada6dcd96ac9b1610df0d4c84cf4738925a838913c3aabc6a8d593570ea8a4b6e250564424e2d76f4799a757a1662b93495cc9098c24917390b81e9799546ce5efd9f07d179f955b4db8a5919a72ac818e7777787ddd5c75d8a6e885d5cb4553319958ebe7edceb5d1be160accfa355f9b470f5eae34f176f9cda3b797469cb6eb366ccb0b27446ccef1dd3e872f553cef47cfceb940faf9257e79598c132dc58340e6a441c65639d768bb1c4b57de99ee6795e47e87e04a5352800c154c884e554a9c2daa57d1c1d7cf5e7e9d9953a596fcd35457d2e875e3c187a4359f2357abc7970a73cf16d99a55b3473675bb1e8a3533436c396f2cada61cd68b67bebba6f063ed53d79732fe86acb36c2fd66ac5d492f29ea527323d7f3bcfaf6edc8ee5cd4598cc94d4a70713122420860e8f3ab76de5efd4809e34465188c5a0015b4d04c00141034224264e75cee674dd2acd9f34ecaa8d19fe879653adee1837e3f9fe9ab44a1cf71d98b71a706cc12e7496a4b467d1a922a3b62d55964dd613754e6b564d597cfdc717527166bd196ed6b4db96dcb55b9efd66d9465434c9ceab52d0b0f27d2a6ddeb4f13b7c129b69b716517747323deb673e3766fa3573476d12e0ab5e1c584e0626c8e6b39fba409b2ea26b766d93c5e497d1dfe739d73d72d511ea68cf7665868c9a31e8d57d77f93e9cf99d19de5c58f7791e9f0d73d156b8f2c430c00946d3666e8e79bc1216b9b7198a50dabdeea5734cbe67d0e63caabe80021a650980c65b5d95cdcfaf83af9e91a9a89c969df39cab9f4e3688b1cea468f35dac337c89ce4d40218d5d3a69cdddab0ec2d957ab7cefb6a96f1a28baf97cfdfd2e44b2973ebe99efd1ca5acf773f3e85f45570eb3d5f2b9303455bb9bc3bbd3c6e8de7d5419d4e50794920620961d98d67b32eddc81178ae2288a694608c1800340218a8681a6939c2cb256427679ce8e2e9573f2f49fab973e5d2959cbe7f6b89e6eb0ba9d39b56cc9aa59f3a500682cb2b9932cd5b9856dc9bcc54172eb645462d79e5560168d32fbb3dd777d94ce3568cba359d13aaca62095b4da975955865e4fa3f29abd8f3de87cedb5df45d8596d1acd5a32db737c16a3267d988af91d8e3f345c6186b29b79fba138db2aa35f3ee3a7af91d2e5e8becbb24e7c4647d7f3efba8d9ac5346baf3d3269969e5eda6d8cb9fb2eb3154e3b79f5cbd1e2e9d946cebcbca81cf93061ab3ef5be71967a72e8db875ca53859647bfc4ed1e8e135673c95d1c4e07a6c470cb6a51a63600e4aafb29e867a62e8ca39db8ab93a3555676f3dd652f59af1f5334d73ea9e4e1dec559356ca3646570bacbf36b29eb5a75cabd0a7bc1125574616597a48cf87aecf2547b8c9d73e525b2958da4bcfd70e996ad677f17a39e6bcf5b08e1dad5e7fb06a69c310a081e4d590b3a1cce8ee54d18ad221021b40c41222034128b82cc884a516964a36593942cb383d2c1d0a3a1ccea0981cbf35e9f8abcfd1e9aa4f35a68d12e5aecb4cc698128ce05d751742cda86a8cfb28b295647798b145a21d1b4cba71575a2caa72e9d38f56b3a2cae7a3104eda2e4b6daac2df31e9bce2eef3ddee0691baabb15eacb335eba745cca49d93c3a6264e4f6f99960adc7947a335937d08d9a7cff0046be36dc5d7c85f41be1ae983a6a2336e9c9aeb46ae4f5387baecb3387b63cdec72fbf9a903bf89b8bb36ede6edd3cf01cf936ac16cc9735beecd3cece475f95ae6aed1dade399dad4f58bd524b46cc5a73ae55775251c3f4187379675f4e9c07e86773e76def8bc5d3d28e77955d4e76b42dbbe71a6cc7be7d7cb7f38e8c79f197a5551d14c10e9e7c6aac7d4f39cfa474c2fbd25629dcebb6b9f4e2a59d96c73e92db62f596e0c9ca39cdf2a662e17a2f2335a4cfb5752a5267c65267a35d98d64ead64741d6e59902244513c7a72d1d2e5efd49c5c3359125910896914934a2b614a2f334635acccd4b34aaf964926d961959b5e39d65d38acb2ee8f1f456f7880e66ee6c7a3f39d2e3dd46ea2eca8aaea12d5505b3a34174f3e8008c515d9554010c027286cdb34b4cba66baf61a573b1d3d59a573d09f316b3d4394abab67144eebe0173e838f9cb376389acb7330839d1d337949bcdcaa765ab0cfcde8d18a19b8f4623875604a5901583131a226888edb54274cafb9c2d1cbbf7e9c97f97e8e8cbb0bcf80afa3dde01c4d73bb6f37769c771b39f3be7184ddd6d76cd4a719adb7d72e9c3a0dc3af16ea92ab62a264513a8cd2d099cba5bbb9daba635ceab7a627284d2762962945ef37978fbdc2d5786ea25d74909559125d0e965bab1df660c77439f7b2e2ecee36d51df3d95d576b9c2cbeed661644d41309244384ec2ea7462b36f98f4be765d16e5d2b5a14bcec7ab9b1a2dc266ddaf06e5dcaba3375acca5d2b2a35530cc6cd9c7d7a9d1caab96e8d645d14c90d0d32c846c52d25c873821baa4939d256a9e30d8b1bb0b33157f47956274a5cd65fc9d7825ed71b767ac56d1642cfa33803b168cfa20be8b9675d3492888060004ba3cfd1db9eb77e7f67990cebcc100d39464a581394545c66d468967595dbaa4abad23e4f6a559679b73f3be8383f47855294be8662a75e77868953e0f5826835322d4950c56d3872775550d99ca4751642701d90d2ba6faabe5f47a2f950e6d9ce47a3c801be4f7f3f659cb7e8e8cf3e76895f3798e85a736dd77595962df26e50d49aae512993a88678b39f6ae7ba9daa5b6faeee989d9196f326349ca0c9cea717e0d44be62be8f226f5c79d69aeee46e35b8ca534e65672f4e4bb8fa3a9666bedc90ccfd3e5ec5dc3874c77abe22b3b31e4075ce42b3af6f0caf552c76f1d6fc56d38d6ce1f738b2d1afccee9aeac2324cf55fbd7c9ae9f33163bb0ec976d16e696e559139d22dfcbd992c8d910baccf6174b2da692b52b69a0c06984460c4c4d306144860d094ceae85668bd366734229c3d3e61d3e77479d19af1ad7468ce000eda2f0be8bccd5db02249037322fb1a2b8576fabbf2bebb28f471b4a4de2e2a0b4a82690a294b361adbf17b2cb73dd8db8dae66979f2f96746ee66873d3cbd10f5db1d3077d789633357b06719d0a4a4babca0dc889316322659ae1b3595cdedf32ce53466813a3761b6eb6662aba1272000084969cba2ba53c3b33cad845d9a432d97f4f97baa3094acae8e846cc0eee6aed798e7a40f1a432ac5a21bcd364f39be7cbd766e20f7994a3620e102e7190c812e6e2fa592f8a87b7c9a9e4f46fe6eda34e27518695cba455b3de709b63d39e3bf4f4337835b8f5c894b1b8aba5cb6a77cee75c96f99cbaf2eec6a78b6b8f9f9278e9d3db83a1a99b7e4b88713bbc9c5a8bf3cbb28d159026e5ad5c14d3b2a32c361664969057d5a08932544e4953b6246368565caab2d0ae52656e5615169667868a65ce4f3c5bbf9bd0d493a8b2de47439d2f6b91b709a5d371868be995294f4a6f8c90bf3e8cdcf28c0babba255219a74e62bab4e6db6510be9f4f088cefcc64a6936f346e536a6a3e7eb3891e5d2cbb2ebabf2ce9acf5d23762ad162a42c5011a008c82c8ada9ce761cd19cedb211d2acc2ed8cbb3663d9ace80b759f2d9bd970f3793bd764e573fa9ca52da6f5837151a0001dd4ccafabcbe9e7126e6cc1c8d47654eb4ddcd959d6b70575bb9d5df8d56e6e33b4e594e46b36ccb3a633e6d1973a4d18d6ed5cde874c5f5cb36b2eea74abae5241d715b1a91209446a73398bad89ace5929aaa530838e0c6b4e13a19d73b1efcbedf2d72bb46b35cecd9e7ecb0edcd657d8f3fddd665358f9efa5cbc79a28e959866b375b8dd78aedab01d5e569cab3cdaf2e2ec8ab4adcd1073656ac46595e8ae5299172089221c62ea48622644236a2b2d6505c1417baa1df2333d2d30d3d38d727ab55d52010e4f63912f539bd2c02d39b69cba6f2584eadb58c9c350bf368c5aaab6922d144a2ce826a473835e83e76ba217d5d7084fbe25284a594a2f3a125e7eb65782e9755d8dd75b1468acca316a5140c423130130015efe7746c78fa39b08df4e96494a5667a376783565b6b5d996cb36cf2df655c4f4a97c99d7e1e75a234f4d79d0d996dac0913424a50929be8d38c46719592b2a2cd2f1bad754e32c8a6dcb458e5d71079f41899a31ab54e7d79d7756565a612e5b432596fe7edd66c8a8ee5da68bac9574c47a280d265b0d6e308212756274c551dbe7a6fab872db8e959a9e35662aebefc4b5dbbc16d8f1a71710aac89c7ef707d3f5c79aa2da387775c2899db8d12f43a5cbe9d90c9af1553adb8597565c6aeba8d02248180e322aa1b4726c88c9546d551622499124d034ac9ba9c35174dc026e0c9900945c69d9448bca48b793d0c25f54eb8a74e5dcb8ab9ea39bbb16b1513a47a68b8aaaba92212b22c17a308d909a06909a6dc115d0b255d33be3896e6bd1cfed63673b4e2c6f4dd0b0724cab3f5b0e98d02800021800086803afc7ead5f29db271764f2c9b86d9ae9bb3aa94650edce56dd1ced16746ee7dfa9b387d9a63c7fa8e0fb7c6bcae3ef7375790acad50123945aead197567121499938ba949294a5412775772f420abe9885f0995e984b599c94750a6dab37143455cf701a1ce046ab7159a7474f33a1bc5756aaaa33ac215dd9e5d9664da8e68b140ba59733a554be642de7e880e5655a699f4e5a34350c458d088c2754bcfeff0bb3d319b83eb3cc6779f36acb8a018ba7a7cbe959664d9cb5dd0ae72cf3dd4c3d58f4930760930111168ab54193204b251634826ea63708922044cac5b5568b0a9963ad25841d3aaca473848b4822cc7a331aa94ca3563bcaecad84a1296baec9d84aea2c8537532c75e4dc652496e9c2496c22c7284471688517d00133a1a259eee8ada373ae646c522ccfa28d308251a0000006800421d5e5750b3665b63a1c9edd371cdb68b21e7bea5a9c087022b65d9ed4d56e6b353a2f3eab2be9ce9cde1737daf8fba395e93cf15810dc64bd2619e6da7637198e89d30385f539ab076d76ef329a86f24eaba2c84a36421767955538e37085b1cdadca21241674399a759e8ba6ce988d7a28211929a86ccd7d97b52b1b4449a23835f4f97c7d518dcb3b960b72ef9f75d53ebca4268d0859eea65cfd1c37ef3d7f33e9b0e6f9d52b1a84a4242eade6e9e76fc38aeda2d9655ca2474e4d05ae0c624488825145e41d4846445a501034c49a0001a0040c489900b0808eb70a6e0c9a8bb0aac84a4a2e29d39e3563550edcf791640d35c2c48556d4b0ba9b88b62db284d13541a4cd03457504e0987470f594cb6e7ba8b5235a9a292f0a0b635884e868188192210dc40b2453bf33b3aa736d3b33e3d973b331516c6aba5cd1d08cf1d02d36ced45296eb174abd028dd49678bd3ce5eee0d5a74f311bc4a6574d3581c83458e51258d73aec5af1eb87a2ad3b8891bc954821ab3ea48271a299579d119c71529c48c2e84b0181381674a78b5f4cdf595591942f94d307acdb18549aca2e964261e7fd073f1d39c88f2f42c7663d63b97727a5d794a5522e597542a2ea48556e6de7bf45d1c5f353adb539572d468862eac7b3262d76d3766b422bbf3e824e320600088a6aa6d480100295a001009824d0010d050081a0602461385269d8260a3288d0a5b08d05d095646da6d1c6559a235d846ab6a216402d71d37426a4545f42414e221a0091b34baaeebae5583524dd595a84a4165361cf600454935122d74b2d49584e965a54c94e9135952ae9678c2b45f9635ab4f3aed6774b9b6f5c6c31c778dd2e6c779e84f96a5eac798acdf1c2b5372c459ba38c35ac846b697cef5302c7170ce9d538595ecc3bcd36d52e99142316d95dd6474513d45490ce9c66b35a10ebb2a8b5165511b1e54938d2bf39674a8aafd4d10dfcfde336be35f9d6e866d34ba982f353aac4945b97cee5e8f2e752cb1d96f579dbc8f27adc9ca5b306fb235cc8c7ab9fd83654f3d9e7c8d9d0dc658ae9d18f177e5d39f368bf3df2b22a2bd19b48e5064c804920145d5a20644189449215898090c4891144c80488a49a884d441c1c6c6229a0a49824c88d764a529bc33db5584aab6a0be9bd2155d4ac4193b60aae2bb20a2fa0525694ab6047566e92ba6755d42228724ecd036a94336b1d0c5545271473d3221212a6812c8c183884840dc5964aa9d590518baec96d593cf616dd9a5a9b2b81bcdb96ea7d3c405d30340c095300100c65c45fcdf4ce55ce9556d30a55c6a7ab2cecd6f34eadb73da6ab29b379846a3166ea4b7ca89548838be10761351a946313457442cd35e789ab77221b9ead79fdec51cbf55e4b1beae8cd755d277d8acae43957396bf31eb788b8e517cbadfd1e56babf93bf35ce3eb70bb84509399d8e2f6175727a9e73a621aa3d0eb8e2ab9793bd2f4e68d99aead68bf3df956a5704674ad8e0c9248b144094649261a1192488d4a010c22348069802010313004022c7115313a4d0800a0884990ada9ac4b6a2555b505f9ef1d3752453512d596ea26e363a2fa658590859aa29caf6f3b52bae55ac401c922d85312514a4622c680010c40d00000d04900d00ecaa60b467a27070e500b0806abf0df66e967b1871dd6f5c730e855df194be3d715923594c00198dd278bd7a6cc226985054a0152702c64424eb16eb7206c784351943446909c514464245b290c068a91022657a317611e976f3c79db799e6ef758dcbafade7eeaeeaad6b32945cb3cba43cd5d557cfa74a31552e1d31975f6f85da4111b399d3e5eb58d11bfd1cafaf467f3f4e738c71b9a944d15c94517d36c475d696b8ca058268c0000528c894a25388868434381340c04da0088000e21249008b1a0a0000284d40920043112d84a76535ea5592eeb7479e7cd53e9eb3cd2f4513817f565a728eb1abc98768d3855fa27a9e727e8a5679c97a22b833ed071a5d681c8cfa32f0e826a13400c01031000003100000340d0c0689a8b131127190021ce0cd13cd6d76b67276eb3a23583a6764635ba1ae745d5d78ba5e7b1be008f673001a006818841a15a01881880000143122444964910d33350c88c9ca5d3dae2762306aa25eaf363cf7e7f27a3a37677a9a2daf6174f3d9acdcaad012866ceb170f5f2b9f4d99a00eea349b37733a564e12859cdd14425974215d964425e64a8b39f553885ae13b8a6c84e2eada580226d340004d0dc1d4c40d2004249d64b628b18824418d26249d0811a60801021b4c00a13444144ba5cdee2e3a7b35154f0ebf472b27574739aa365fe4658eeaadcd1be1335964d61a547af553516955be3ae5cf5a689539d6a293d4af9fd1f3b6c221cf6200000000000000000001880000069b01034224e2c90806a43b2a91af7f2359d9b70dbac6eaf2cbb66e9433d97e68cf9f485b15cdc02e3d38a4b8aa4b9a50680ce682a87724a9d85409a10c44c000a13043110ca43990b6f396e1aeebf96b32b68a8d57e6f470cf97453e4efbacaacde6fb73ec5d36e4a4dcb931c75d5988e3ac791d5e5b358179880d9d0e76ed4d75ca158f1ede762eb59ae374ea9d7340cd1013b2ab4cd7c6e88c18a8492c7160262054c4121340054090698d372c492a4c210d914dd89482230430498260311426456a487bb0dcbda509cb9257cee75b53e3c25d2476ea09eb59f9b7479e26d3d581a63ad51710d625494e25b46ac93764a82dbadcf9ab479bb33ca208000001304c000000000000000006119c4241220a484d324206d049c244aca64bd2e979fdb5be74df25459199939dd6e47b9b3e4c67d0e286086086d22d8219486c430436915604098454d11261127a31aaadb2df3f5ab748088878376134e0e9f27b72b7077df2df0a51c9cfa6e59cceecb73db8e9aa545cd4e12495733761bcd366b098e5b7662d5a9bab957651cee960cd85b072ee9d53b3322896e856165b5585f5564ae509918ca09394243043481014dc6448411007104b184aa22269049c014a32b1a44ad0ac1a01304c00004d0a16c555b099af67277cbae59f6e39c2e8473cf55b95dbbb3d2a885b0df650b4b6a9c27d79a9b8dcc5c7370de89d126ae951758b81e87cb5528254000000086000000000000003400c4d034c134164aa9544b2311600043717527164f4e4b4eddfcfd6e7b6ee759abbe395cba963a3338ea47d0e2860860860865886089026e508904492489216248233b2de7b527ab8748dc96a3040841877618dbcde862eb8df667d89c0c7d0c7e7ed5b84f3a56409bd1667b26f415d7665aa45e498c0612d19afb37d73ab521cfdd8f15305d36d16d94537e795914597537158887384c51712528b2516114ca00148634d95934916daa8d8e2a770564e225240389248b1889651459242184558980808b20b2ab29ecc57c742bcc4d689e571d0b39c4c74e5ceb263a50c52d6b64e99ea4d23ae132abac8e1af8f49d2dcd2d36e3e9cf2f07b1c594112800000206000000000000000000000c40003134126824931000d3189ab9c59a2fcb3d4d36f3ecdce9cb1e8de745f46fc4f306acfd7311edc6f09adcb8ce8239eba38ba620d4baf318d148218026310d91b672e1d49cb4e34816a00868010831eccb2db44cd667bf9bd6df3e6f27d1e1e5d38b1d3a31bb307a0ab79f3d6f7aacef9f97d3798ace27ce800860eea6cb3a354aaa5876e5cd8b02fb2ab52bcfab32a6ae8b14a256a51094582944938cc134205481a2622626a989184a50883131301b4045a44354340d340388c40002182025270baa0d011d3763a73def5191e98d55628173ce8d73c324df6f35a752ce4ca67aaf9aaba2b015be58ada870bb7c78a86b4000400301304c000000000001304c000000000062601388008600da639466b2b29b520c5a5fa31ddd33d0b799bf7231a34f93d3cfbeaace9554e909d3615dd9c2765bd7f47979b7741ef9f1b9feaa35e50e8f3f795276cb5df27c3ac744a4388b4014342000438cab2ebe7965f93798fb7e7bbddf8384ce7acf65905ae33cc69244a79cf47e571bad0f9ec0431225655626c8a1566d3944e122dba9b5164d98d5eda2e88c48080068a6263946500c22354308432a2c621b131c45a06206451320c185801289942046904a2d00009824d12d19ad589654977578bdacedb9ca6aa57333ad28cd1d618a3bd1cfafa68e547ad18e547ab1398fa11ac2f540ab3ea82608e8cfac805898000000000000000000000000000000030000001821b412681ca2c9595c96709c2c95955ba858a8d35efa35f2ed9b0fa2e032f765d79ddb8f6e52fc7bb21a7a1836eb1b80ede61811f3fe8a8b3833af463aad2d6b2935609a540a04d0323280831ebce63ea71fad18bafcae8f7e3a5c5e2baec82d56d7744012d7e5fd079fe7d108c69a010c159099a1c642a2faca468b2ea2e1e6d14978eb963112343a1a06459294251210020626269d00868626a5087118000c4994804001a9460028103400000021a14e129745338d2d3988ec5bc6bb3d3a73e72ae99cc4754e50754e4a3ae71cb3b071e27657191d98f1d1d88f21275a1cb46de55f459101000000130000000000000000000000000060000000d386829b4c90a413838b62144eb9ee6823a373d0d968e6f97d489e5b662d3c3d7af1e8cd2eac7af396efe7f4f58da35dbcc00880398ada6e84d0210214a002642562434d0556070fb1c3ece6c35679fa3874255bc6a79efa22e9d5059a14bcae569a5a82d39f150cc690d04a322eb2ab029baa289089df45c3719c2ae55ac40b01a13041a63945ac90400500400534214934250b258800980c049a0001891a01a0a43400000004a2609a74eea6e2a043db8b5173d6ace753d4a3ae319bcf570c26f4627b0321ad990d4198d28cc680a0bd4b562e964c6b026bc7e800000000000000000000000000000000069800000c081a74c4c2cad926992942646517a5da72e8e98f5c31cd42c47973665e5e9d393a9c79bdd1b526adb977ef8b496f9306284f9f55206840085289a07142052800210c4270ba5cfd59d6b85b4f7e3d3991cd8b8a95ce2c792fe1ae6b14b6aa01e7e802cd0224a4a44eda6e142cac8d6913ba9b493443ad4400a001ce08626369921100000c4340980495121426804c06a4253441b422408921260800000004c1260980e5129881b8b3a33c525df9ab3590c6bd7c36ac68d66452eb594352ca2ea32a8d4b30693292e98d0a549af3740000000000000000000000000000000006000003002069838c860c1c64b2941d484596e8cda3a67d828caf1061c03a14e3be8e3f639735d2d38f76b1343df24da822b3d3c728da2b2a959152c882249a083e3cbd674dc20434244e2ce5b9539d756ca2ede6d8ca7731910598f04b57394f70d4b2f2d5299cf6860802714c9df9f40a3381990165b4dc49384240045d3100092426ada70c018806988013024209d73445b006818045821a249a10c10c22da04d9124086111821a0054eda640aea906a410956b509ea00098430001826c813081344633445c672c400000000010c100310c0000000000000600003000008018980da090859341269ea4eea6ddcf6806b884524d565494a4424c86aae6af4f370f035d6d3e77bcb702b204d2a1a04e98b618f999b75319e6f4f4e3d7a8210d08422cc593a5cbcebab14ecb2ec2f536c7342cd1c953d595b5e9c23cedf8b8ee00280c49a09459668cda01346409965b28c42b94448552719026918c51a06270da06260d026301a131924d08112680681c65100449000d0000003001a0004002688814a55cc18239d76118ce267014001a28000041a06206206011251945288000000000098002180000000000030000068069c0d300001809a8c436827284f52765766e7b156bdf9ea9c94ac5026b93c59af4dc7e1473bbe84b3abe544ecb7b3c1dfa76563c9acf5aae0d19bdbc7cf25ba91cb1273856d7a6cbb7f3f7ea2490c484e211e575b991ab4e1d5538e6cfd336e79bd86b5e0ea170e92c9ab2c5458d6a5288000c09e8cf78d3465d345a5d590884a20932b419ccc6d3d51a0068728b86260d3000000006dc948ca08c10c40dc41a680000001aa1888600009a1800004648801558e296ba2d594a013516523043400c43290c10d0290916d4a03a13222a715834231300000000000001343006800189a6000010c0069800a34d001401069aca5196a4ecaeddcf68837c24047178218eb4205404080001800c28009301b02ce901c6b80d1b42c8c40101060439612dfa80c0c3d1826165930f3748a0c52a0a7504b4800006a028d0038819e00698841001014004980c01003610c018034039009812884ad050c110030010080060000d00a40261020a00060200ac02358512027000006000026000080248000000400300884b04160c000000400c0000100c000000180000010d054808680600000003059483525686e7fffc40002ffda000c03010002000300000021eba6e20c30c2880010b07c71a41400082082482082fa24978cf0dec9fc30cc47348c3320e8fce5755475139965c92a95a7e0b57294c30d736492c919c0431016d16a9aa5b89056442343d40960fa3bd0032de2824141706af2c304534d34d241e7d036092dbadd9f024857a63a62be882f96a5de3c515555269f5da49e6de4177ffcb6e1e2851eebe58b61d318786f82213936a83a1e243af68a608a978f2e014ffd53ce03cf3cf3cdf6f3bb2f82faa1be0e5ccdfbe0f6afb0f701e8be0b6528e11545b7df7abbbe4c488c30338ec7ed8730232eb699082ae96004e0233777430cddd9767963acd71928b30cab08243eff00ff00ff00ee35ff00ace6d6d824b90513c1f3c0868bdf46bb61be8aa51403164dd71afaaaa7bce04401063dc8d14838802faa6a903c1bef134fbccf5dcb1015ecfae849bcf91f3c32808343c039ff003ce31c9ec35ffb924a61be3a62a64823a7ec258a3be7b8396f9c461255a69753af9b04a14014b0b0d3b64818d0c31e89881ee9897cf47cc73c052c8dd158fda58a87df3cf1cf4f62e40c4677bfff00bdaeee33eb5a2b8a78c03db71b16f72cf759e1be99c169561255869b474a0f3ca38138c73cef06da3c840cb67ad71af00f3084fcf3070e8986124f67da05ab943df3cf3fa72e3d7cb0c30c3cf794317dc41f6117d855a45f59f7d059ff00e77461d86975196d555f5f69eba66a8f34844405ff00b244f922aaa8a39e894f0057f2f165ee82b754438d7b1ccdb9c1f7cf3eb48b067cf0c30c007d84137b044e16ea003907de45f4e693c82592086a28f18571a75b614cfdbae86a86b30d3d3d132877dd5ac3507609ee35f63330148000d9de75c56fc505fccb778f3efec7408430c30c1f7d07bfe37beb52f9a3a248669ee868965a642872cb9462c819d556415c1661e1453c00d34b7eb84cc25062a8125d0960040f30001c20002b67f4fbe39ea98919059f02dec00c33d1df0c7fff00cf63a73b614e031bca4bea96a96b8a1aab04b00018928104330e2c569859b4c72076957d3d7744b1db47b8116909a13918bc00149000ab612a092faa7864a3041e72b99f3c053cc3bf7ec35ff8559424bf0befa62b3f82bc2dbe39a3be6bce34e060925aad18328945878214a41043ca8a380054735a146b494d2f12800054a0008c88a2dae096fbefbe2c5f724a595914b3db0d7b434bf29734d034b0e1be886c8e6ae3bab9de41e970b424cb5bba7df091103fa78e1084534d0b4d04f39b4330b867820127453000181000174a8d250b82cb2dbcf815694a9f7df6ff00cb0d7feb0d3f825beb8aeae9d561d2eaf83cb975183cf45d4d375b206142efbbe3a279e7a23bad7db9271c101777907cee0044fb4ca00048900084d4599ff1fb44439098a5553b1a0d3cff00f7ee9c51f4d4e5256dbd0254c7ac3fae18e286ade289089d71148c69ae5ed65b1b51d5137819eb8516e928f3865671e9fa2479cc10200008200064d22df2072023fad7b545992716168e7ccc49338907df49f45059a69f44cbe5eb5d3ca34d79cffc7bea1e124d23c33fc845f6ca33ddc22cb7276584e1446b53e0ee0c6108402000082000c068b8841a410d4b14f164fd4e6d659c3631b784fe57213a49ce96a82e3c35ae01124851620b77bee58a5a8b0adde687f595703b160f148083556e9c230a1603eff955cc480420000820009095582cfac7a67fc3dd743b635c29b1ecd7bbfc52f82cbe9aaca9d51572b51511a752ea08a079147a6d8fbada7040657eeac3333647c54f3e552aaa00484382aed8b36bc95e75870820001b5c37f7ca06fdef007158eadc408283fa1a7a9a400b2ceedc6c80e8eb6c0e64dabfd37f38681c217ef776c7ef047ca7738c2666905eac1d0f542aac47da4b533a720b006058f72b0800007d6c06ea2fbdd90896ec205f8607e2335b35b4760f56a1ba79653f61011091fdd94591fe893bfe3d8a82c4c8c47349093bf1c4f14106d3d43e476ab4a1d967703ac826554bece40b00000060d938055f6624906db651627bc5f837e116ef214cf85f6c308252608eabdd4abff8fccb2f058e5d0471d3231de977eea6bdeb85527dc83d5286e0c18a8e5fc3f8e78acf08ded69d2400009e292397f26dd1bbfb0fe8960b7704b904d4c8141323d874ab2c9630c8e2155fefee5d851d915d84f2b218a2629953f69ec1f23afa464be55e9a3a28294243e613476ad390c43da4880000e40530b4fec1ece30420c131a1b4d86b4d5b7cb7db4a17344b6ca2986b688db849feef857f8373dde28a7697087c2c3db4619bf2386139b23e4d2e47844ddbd9e71eb6e800ec40129adb0c9a5a9a30e8f79c07370fdd1f10128a3a87472faccbe8f848b0030ea2fede4d5a5da976476b5c3a6d0c3b0b21b92247505164e3bb3d439a438844956bf2ebc2709548d605c7ecf0d6ccbf2c1f4e98142ccb974a7219f7ce9c68b20136b06a8ee3956155ca6d3885023ea13f2503e0313de7ce2dcee936732257abe2a1604494425c51f33acdc799f42027282293b02e2f344111375e8aef8a66ebe6f730618ae965ebf71f9cf9f2b841b130ae44c5c003018e1cf2fba81cf63cec60b095369090d2bfd11cf394ea90d3e53403ed7e330ba74d72ea1a17ec3860522eeacd25d2a93d1d38be653cd3a5efa25241badfa8095d86a4f1010c91f0dde5bfd33c40bb143f0f13d0293f0cfe8c438ae827995220d061e54cd5121055611fd7f128b2c507ce2ba9ca69896d7cff00aba920a61aa6cab0efc4e2a116916d938634643035022c891b2d88624b8b1d86d739c425c33d185ec12f8c8c6104d3170f5af4d4618e0adbee93ced62695665cd7bb29b03a4f9816ad6a212ae4bc36daf56530f7256d8dcd4b9eab9a997380ec1a21cd6a40b79afb42739ff4a02eff00a740fc214f8cbcf56834f57172779ee06756555c00a9cc34e925410055a5ab6fa8ed469a8006a10e955102031cb90ec0796989d02686f67318bf3c06b94473288ba6d7c453618978f285b43c7d0040c2ccec8e95f2de0cd38fb5a903a784fbac71a38bfa105a5e5185cd26fe3fa313894a3e962e8c10e3bec57c07ad33c10ecc35240f8024fb693214f8124e2d131860bb12c7ced2f21f9d01f7cf3ce2d2a34707cd21ef24339cd8ace2d5a91b78754402e339f0efcbfe6aaef6bd443c758d8929aa8aaf6255c055c3ff00751d6c2dd7fcadbe4f270d10695b51e07a7f01dffceb097fcd5bfdf420f4b9fd30d247c38496a1f599b41cdcbe5e82fd285885f32a615b346f28d07326c0a45f9c1928665f2bf8dc3779bb163a6faa58fd449f312ed2e412e021b6ece8ecc2f2a1093e7df30c542c9d3dc9dae70bc5c0572de79d1ecce08ddd38e603a5a6b8b9c845891dedc95fbf8c23220219b427d54e5208d0d8ae6da210d60c3f30e432a0901e9c5ec98845026287bc1b65504d50302cd0fdf3bbf2ccdc352392f57ac60b39d0f137c0a9bc511b4c9c476916c50bf34277af9d3b6d251ffa7a3a16089221c3186af4b752887c5232664412b1ac376b223d4b10724b5840ef918a031f62ee44ce1e9c096e7b8961b21959b1368e39dcf212bebbc25eaee9f0fc8a9155d2bfec0f49949ddc58f88aada505705116c7effadee4de493c188f66f84de8b869af09cf866029c7ad3eeb9367e2595f6f2ef3fefa412900892d06df05882662d6c392ff00effbfba3a91a0f01630359181ceebf77730f4da269c7edc7ae3b0b08a9edf6380f84d39fce200c184ecbef4595e2e7edd34b28953ff9f8edf6f536f88d69900ff5a37f1524889ad8afc321159184a31d9e985f3ec43722b74aef8e7e12f1c4bb67787c0d14e715bd3c8d09a9db525fcbbf60d4e5b75b8957fe6dff00fef3d643e5e3f983ecf9305a2b385e221e7098b91618d760f6f9c25686c0b234254ee2ca894d3b51c401f468eb911b8a3224439a26d14b9c106fe35c32571c9372ed65921947fbb94f12db90f94450b050ea73291c6d2a6f745a26eb3c5a2de5ff005fce74f760c50e6ac9e18487774c056c63b39e1c21a7a640b6f5320b528d0f9feb9557250b0ee57a54bcea412bb1a73b51bbac41d7bf86ea77761bad78e9c05a2554b2fd6aae082c2404b7878ac59ef73581bd83ce4f47399b3a5e149477275eed5e24e66a410fdc702553cdc6b8a331058135f89387b7935db206a0cd2121e55278114becf89f8f9bc8726c0f925fe082a87d5054957d84526b7b942165eede7ef2ac0c36633822884c6eb95f6d17c5242da2c12c3d767dc7e57c581ec9ba01a3eef4fbce7e1a174e2400469c1247ee37b25ad0271259dcc04ee88629013911ebaafdaa92e928f30a8ef9de15b539147f871c08000df7e50d1cdfc0e9e53977b8afe2ae9c1bf7b0d7d0dbfdb4ff00eb7fb402245d3c134900cd3cbf5ace19e30f9c3fee6f4e2d353a03a5d0df5e7a485bbf78f5ae95845ae36d0a3361ce64cd2c47208d881a9d06153d4ff5d651fac6201299b227c209dcfdf53ada83d4c60c87f7d1faea284c23fc09aec9167a86c296606eee3fe2c1295dd605b899648292b8c33758c25130b1a032fe25bfb26108b45ed7f8602dc7de206664bb8c5ad201be6a141dcc1fdc3ae67146838ed3f28aaf7451008d8569c8c90ee972452d84b3fb86dc5c33c2ba7a2f92da2643cfcdff00c65c8833e7ae3ee78e330dcd01508f82cfab109159197014891977a78cbccfc1bbff00f3366a939f8a72b877daaeac28475a4390152542380dbc1bf44963880043cebe9ae49258eac7ceb38e0225b7c34f73e23c562f3052cceeb5fd14537d144425c05d558bcdd85269ef03c7af4b93c8b96e622c8d67944f0cdcf36105231fec3b1afbec58671c00042001cf2e6be8a2cbaa97cc92057966f311e6bb9d8f00251555545719fbd884810e948cbb6ad0e84c086364d809cf14332a334d420967b96a197d8734f0809d7783c5aeb40991578e78080d0e392cbcd2aaa24b4ba5add3dd8495c670c3aa671d3a087fbed1d765373d1c31fd9597fb016dd7d8a4ee70cdb3f76f822660d617cd56b657264112803e30fbde4cbda0d9c6700cd32480c02000008e60049aeae4b5a4933065012808bba4f4a2262a217a3869911667f36529ac40a025b6c51c4f6bcb0d3ddb7c8f6762148219208746d465a7df720023b30661bb0133258dec38730420000000420004d79851955a60bf0452b8d33002f344fe6c8572e161c34c951f4161df8f451ea9049f65c3facf3ecec9bce3018e096291c9867d769c711256e92f6e715674f9d4faa0800000002100000035f6157d14d071e0f2ccd2673dced7a8cb6035427d66a1d86bbe04e960c6b4cbee7413d9b263000b0ee2a0918586d8aa3dd47449e4d245f8c0ead7c432e60a1e4d33ee200280000100a40011f65371addf5d2c765252ca87d4bd298d944dba598c4186abf8799f193dbe82c54d80712492d2647e8f949296be786f9e1db275b6df9222013447f506398705f465d6200000400000c00004facb7d0e976d25b18b065bd4a9f3e3d7b64ecc1f34a19193fe7ac96281a673cd25a130d0f142141fff00aa4b03a268f267df168e08659ab80b188cdcc59ba70666e93ea0000000000000001cf34d799ebecb6941b37e350cd64ab68718a6554634169018f6c88ff6840c43a91822b0dd337632cffaa27ba7fb1f57ff001630e66732490c4a35fc62418ffacfef1068a0000061c900000d3ce14c417fbdeb5a2c72e3b7d06c99b40f45150f3df65b54b2d35d0b2cc216a0ef08cfb50455431e9dbae29a966d077765771f7596124d27c1216ef38eb3cf6df7dc62a4000002010002053c001b6bac76ca986a50d660752a62cc46bf489a384e9a62c99946c61c2734016e296ebc3fa0cc2a6ed041f7c17df6dd5dd78f4535556d7fc8c842828628030456ee06f2c200000000500f38a04dc3adeac2cfa872f017c28dff00c281c0010818427bef9c8bc88384289e020f1cf7f002f3c03f05d77d84382177d07df61061fdd741f62f2083cf02882f820a20828fd80003c00073cf3c71c09c7df0dffe205effc40002ffda000c030100020003000000102b14e107dffeb020c518bf4872e4c3071d484821de7f3f709441a35c6a4644297d4a9275570f26fba0ef42d849186889a561b5b7bdcf34daf6ff005a687cb2df808f3944aa98c13b9e27588238a168981ff5d600000d903bf1bdf38043088826b467573a4a9a79a2ab378fb6b6324712c3cbaaa6df143034e16755498e505740410f3f775f9bbecd340a3f4de07395b782618043be9ce007ff00600a8040e8f090fe90b360e1b934d7cfee73dfd04434b48e9e4cd8ab5be5cafd34df0b091618e02c43b3d3e696f135458ff5b3c7cf5da786e1d76d5d6d9bb8fde4f01088b71be2d3492e9c3482025754a0b744d3d4bbf08816d34e6a22cf2f2aea792bb907d93d03c4b6691f7243e496f8ef2c019b4d0659032d517b7ffc447299769ae95bbf516d99efeb452805d65cd69ad45b40a9c422753fc81fbeb55df8e2909bf79d6d6f4cc3adda32eb4d862aa4aec9ec97ff006fbaaa25b8b8fe840f38ebdffbd8a2ebdbaef7e94763990e21e9ec34e5e936cd5b0ee05f579afb94c740bad83e4305d75dbef90f3c81bf42eedb01c6dab26eb4c30be98a8ac415b5d902d663dbaa64ba3a44fbff00faef1ffbd04775d3fdbbf9c020992cb30788bc71e7a3df71cf30bf547723d2307a71f10cff00f80aa4ff00fbe172977e3f7598414720ca303e518750656858e9e7944d46d17dfe687c421fcfde3cef0c3dc8ac994907a7ff00a37364f11ada551c4e1ada458e8810afd58a63b7ad2bfbfeca2feb371843ff00a8234c198454d14108171491cc5b77840e6a0519f55e51f4ea93c9265f08ab246182d7c512ff00c2487d459a487f3d4ca0b4018149a18260995f7e5341b2aeaf6f3cb52bbadaf990c1644d7fc0073247ca8c00577b003dd475f7896b66d9a7a248a282eaa1ae0bca2012c2a0f341053691f7f7337a4ff2d74f0c3775d1f47f8b3d3a20a6d6b70cf29f3cfd8f3cf3c707749845eacfec0db23f60482c3bb27b0c33ff00dfe78bdba66670d9cabb6aaaeaab9ee92934c1870021c224f38404c7d9517a72e7ba854dcdd9d2674e786ce9e2ff00341ba6031ca9ef3c0e2d9fbd9f5d9aa544082bce47df3e0e14474dbec3adf86597ebb7492c8ee93d961f42927b2fa6498a247267b6386624514d7952b8fba91f6fc0a318b48e507ea6d0ecc421f28f3cebdf3cd36d8299201b5ee2c3d0ebceb799db1e9b4ffeb3439972ab14dd0860ec8e39e494b2ed0218d2b242bac4a478e41114a96bd623b1b4eb89ac71fa2b9277865c9687a09448aebf6f3ca77f3c5d87f195828e4b2b0486a441905af3de5f5dcebea30e75862aec8e1a6c5ccdfd15c0a9990204088458546bcfc7df321b1852494ee1a6c59dbf480d8621c18cc10a07512652e15f3ce5ef3c86a28f1201058f0890de11bd11980ff7d0529a4135d4d9e9f6a0b541b7b8b087d32cd7cb4bf76cf0113091758ed3a5444bd3637f7fd86e764a55a8be105f79a97313cc34adb7ef3cf75f3c9baacfa5d25926e515ec0cfad4a01c67142f24130ad5cf9e751762fa697f152c709d543ef18dea7c33eeba06cf3be3c08f581baeb76f427cf4866312fabaa8783a17bf0facb3cf3cfbcf3c556d0e6f7ff305629eaffe39d174fbd659d85a0c7c0b12d9767444032ae5b23335630ef168a4f9728eae9a1b3efc09df42b3d67b68b1ef43ca0d64a2b73fc3a23e1c7adedeefef3cfbef3c1bc7092cee61e4faaa8fd8cc9963e60f40eb6eb76aa423104c18a59ff4c166270a2aa72d6d727442c08314dd201af28fdf3da8bdeaa2ed4b4b2c27a8dc7794297928fdb3d7a6ff00d3fbef3ce3d55dea3076fb18fd360de8efc3f855892c7cbce85611154313fc17bac9341862acd86e8db8361c4dbb63327611396686a86b49db7f30fd52ff002d671280d855ec3531f03cfabe7dfbcf3c791560898f350a47b2dd2ea7c62117a466b06806809676db9cb538410c16e5cfb66a2229b4b8858f23b6906196f93fde4dba4a9930c11eb72b8f6253a5c3ec27a5176a8e8e5ce1baf3cf3ceba2e517dc45139c794f7ace74ec59897f99912694c635402101dff147fb0115b471c8726a119685bcfccd4c7f37886e6734eba7cebc10c8dbff000049393bdbaed1ff00cad987717d8bd3cf3c76d0f9270373110b2ae97def0e0193f78844ed26aad2e1480fb8ff00d7d9fae4cd24c047906f4eecc23e3059a720cccab2bb9944d83eb9a895f724cd69deff00538321a42712e418c68e6bdf3c12b4fe9ead2e953b6517e0b9f9e8efc0c83ca8c08a2fae1499bff3cca64546d9a385f279b865729d944b349efbfb340cb61de23b999e680a68ea14eb0b432f0035219d86752eab381dad5f034900733a34f31a4a9a0291bec3aed9cdb2f876c80ac6d093186bb0ca1046986afeafb8fd8e33c0d85db9c3a5889e69d91453529499643c73c26add8021762e34fe151e909ef38ade5cb527ac0228f838dc6acb2f1e8584e56c01136d3fe96efd7af148bf3c0f4822f528ceadbd3f34cb9c2c6e7bbbb7d686b60b7345b17a9927dba3791b5af24d4120583774ac1af9f1b5a7eb4c1868f4306ab1311a5165cdb12c19084ccd2afdd16146c24e5fd1cf8f887c14955ddeca605fd1ab3190cdc06dc22635a33d20f064e8c9286da95900b314be2a4a6e1b9eb9c503d0759afeca4a58321c99a89911d45e604ae1f37c6b66e3c5810934d892d9fbde53da68c9a8d72fad4ea4fd5d8f5b5595233329e08dc8af402dba3d5831c57817a60728ae9b79b11254ff00d505dfa964619825df68d866a0357ac1bebe1065bf8bd5dbf9f921ab4635b9a8dddbaae69f71577a8623b056eeb98483670c64ed0af8622a5797603c3120eb2a1b1da0a2286d17b4946cbe808483548063bcd0d34179d8a4b7aeb7539bae609b787327ef23cbf7a44ffd393a7408c1cabab41f1d95518717fcd7aa486cd944bc7515bd113c8e6549c60b90d5dd604b6c187294a612366d2c9b31b670e28df8c348e3bd97229386852a0f6e4e847fb4f0abe339afc8675cbca9b02134daad39987532d6b5f6e4b6083267b3f7d88c9be4d376a236218e5a55ebaf3b764c9a0719ecf1413eea6986a1dccfa37ea567ce74f5119ddc6eed1e6c7eac75c409c9d9bbb167188eae92bb7ffeb5f29b2d0b4deaf50ddd91ee7cab142c784c7dc9383151b1e01f5704abe8536fd545cb25f790ad4e50b7a167d682b9264b97d472e896ecbbae7c0c166711ba3e550a48c7fa3a0b81c5e9002e29d574d2a09c5141d041dd8c7361e97c3a49b55255d1f11691ba8e58b67a94a24677c195d9dfc58adbc020b359fc736c9a0abfc44bd740628841164fb4be7acc00232bd7cdecc8eaea202e930d36b7411512615ad00d2c30a9ff0040c235f53386183f865cd04ae763544472b887852a20083ad4fc428bd99d080030c0a03c94b7420aba3b30c90f22274571dc213eae83e0325bacac6c42f603bb8c99dc953bdc7caa8f9200fa37db099f368b7219c85c599f034ad87ad33f6e518f9c99105d845eb575d99fdddf820d1b3c80a0aab7adeef9da6af6a3e50cbea3320dc7ecb7b67e8231227c6f5fdab0a67de49dcefb04557136d9b2263bb9dc6fed2b47e86b307ed1e0369e66f49e882f776ffbc18f62b72776f3f977f90116809fc2940d49be15d40d2e43a72cdbe97ab37e0af755a4f64f88a0c56c532e4a35f770f5b76e9e59112be571c0b90538892df8734d53fe0726854f1f0ca0d76af4fba9113669e0d7f51701de4c4a03f76018e7261d978e7c445c71602260c0e3ee0f800b10fdec97923f111b5b3eba32bb53cd7655660381e680d80ba07e35c196407e7894b91edba988eaa50515e23f887ffd858c72ae22e179ff00dc6bad9c3675f2cb6632a0e84e067b713d3cc3c5b8f7e651c0bb59819412208da1aa76f95dce54a5b9d85fda86e592696719bc7693fbca3f4b1d02b79bca33a695b932198f60873a2d0a9b0499e33a1d409468eb868886017a81166a98f91d35ca77bf5f2b2e6f16116c6020d6010022bdf5281148045e8b3d18428c10c5babf5ec7711ee40d13607ddedd1573a16a3cd7b063ab6ca0e237adba0e0af29364d154fcb3eade8ae77630b3392de9e99142737a84ef82b2d89b3fed3d3b9974b32e402d6fb9e165ee5efbf71fc6f972162872d388cf7b4010bd8976d984a4e559ed0c03cdb5fbd85d6ec78404edf5ac8dc088a30e2545e57bdb965588b774cef373e208b228e3316bb37b859ecafd8b70b44248cd1cdd190793fbff001da750f075af1e9b48bd708aa7336f4f5065adac810148b874bd7ec74820ead02495e5ddc100a57de887ea2c15f8e2261cb25d8460485d5f19e8dde1b1a119c027ccd30e3b8e70cc1258b08b1c242d40c7eb3153d8d5dae6343fe7171fcf79b6b4f131f740f16d1ba3d35bf291b6053c358ce3dca246c5b146ff00537d3898c6651ba1ff00969ba98ec6a30c104bc8b458137df64aa4ced9a03c7cc5bb6126da90dde3e8fd843b5ffcab8d93530cc57184ff00f0c04219ec0514f938fd3facb496f17f8d7f78ecc0f9e594484f30b1bbb8774a29b76f64f1c7f60044cffd9267e6cbe3bf2c4df32a3f906b6e34830e1efb9a05a2b1716cfed12b58690e497af5279f4d6c036c73790a81eb918ccefc740d067b085c1b0887a27b58c6edabaefa5d800237bc9ba482da12b3dfd13ad72436c7080bb0b5a4856e4f99728c8fefbfeaf34c561d5bf119a93c3d632f79a1f384748eda592376181337b236509a3157b959d33b00161c73cffe3d75041928777038e113ba9675351cc244417930d63a109f17d46cde334dd0f970529fc48832810630ddbf21e2d00b985febf330e746ad90dbd3f3dac226ccc10ad306aec64d1bacf4ae1c7ccd730c6a88bd4423ba3abca075eec983eb5d240f1854d14ff0c490d97267c047f5582b916e5dcba1d143a03ca4a83ee6cb6f70b1298b1a8a34f44b48ec89f02df54c5c5d522f17bec0c2c303199518a3a08a5cd0472fbd46541550e128d2005c34b161220fb0ed80f84eeb4254ea0ac9a3d30dea5e04485db1bd731a66aff616e560e10237a1f76673b561aad40526d3db6c2192083120ae307da4d8e7b7162403f512de844f23cdf3d6d21e27955a058f9e8952af8382582e5dc9df05858444245267cd5bfa82280b7bd3853430689767c03f00d0e9ef792f2eebdb3b24ef3dff00f34e3cfb292da5378368d5ee6890c718bd790ce93bff001355b1f85916f1311b21fd20eee74ad44dfdaf4623239af5a381b2aceaa11c0758d735cd52fa4a72dd8a75b3c52a718eacfccf7f96ff00bcf6ca0042f5135b4f130a945ce3fa567402dc8efb838570c8ccfb658c49ee381be119151ae01f60e2b6239ae00746c61da63d357b18920961988cc9f7d2ac0434f816fc19dc72477ffeff007bdf6e482c2d8fda490c95faf81a09186c33ed28c37db9bf07ce77b561f48847043ef0930fadb9c736d47858f41212e1483a269ff565670aef028382648fd145b8c6eba7b9dc34c31f7ff73fff00dbc6bc907a0a41441f2352053040450e6566c600cfb9325b6bd567cf2f64040dea465ca1e5666e8922ace34a89e7df81acc2f55218a4cf562b9ae94903893ea7d88e265c30c30e38fbff00f7c3de36382d67a7f8c2ea0d1dcfe2469d45f4659ba43c27dfd47f31babc7cd36ed9eaf4dc48b8511311c863987c345121245f002519c0e5344a9f552e3c79628a107a5f5eb8c36df9cb4f72d36636100fdd5718cb95d1f027d8922392e73a78a90a099a14d8d191cf2ec01c4be241c6a86c6b3b728325476eeadf45f74e73dfe67a419fc69eeb7092a300753fd87690b0c30e31c32dfeef07c03e2d187cc34587c4a639bde3bc28f09d77507a386c9cbf6bedfec6cf8eccc881ecb9880f0722b0d2db8867b4dc63bce17db6397df4dd7e992f0609cd3466661a82f6c1dc18e3fc375bf79386ff00685017c2b284307cf80f030fd79c7a20420bc81d73c77f0607208fe0828e289c741f80fbf76175e0217c17c08dd7618df0c3fdf7227a30e38c3f827a20ff00f9e8c30ff0c3fc2761f43fdd01d8410608bdffc400381100020201020403050606030101010000000102110304101220213105415113223032711440426181911523334352530650a1603462ffda0008010201013f00dac4cbf80996597cd7f0ed96596596656ee88da69a2cb388e23899c5f98a68734719c6719c6ce267132d96cb2d9d7968ae44dfdcd17cb26444da16d428b6377dc75e5c965fc0e2135b5ed7c97b59659c48e23891c48e34711c6719c4cb670b7e6701d51c45fde5fc1a28a28ae47f06b7a62889451657a8c5bb5b5965ed7cbc4ce267133899c4cb65b2cb7b5fc4ec87f774b7a2be1596597ccfe0a8b1245f2f9eef67b323cec5f75e2f817f705f777f1ea9da1db7b32c42bd98b9d8bfe82b9ebefafee4d595e8532ce83173bffe0abee1439635e7ba7cbc23450b99ecbfeb6fe1d1457dc90e78e3de4896a60bb45b23973e4f9124858323eb2911c105ba745a291434c4bfea6f7a2be35ed7b5f2597f017c08c6dd19a4b0c3898b55926f861057fbb169f533f9e748868f12efd49e3c7184bdd5d8d1afe5bfafc1e262a384a7ff00c1d7c17cd8be63c417f21fd51871b8eab035db837cdfd39fd0d2dac5fafc44cb43adebff00877cd8bbb3c42fd874f54638cdcf1374aa3be4f925f434ff00d35bc72df614dfa09fc67ff5f4cebf735f0317766bbfa0fea8863fe6639dbf92ab7c9f24be860558d6f85d4855b57c57f7bbe4a7e854bd0e197a1c1238247033819c07b347023811c28e14522914513fbabe6c7e66b55e17f54422b862ff002de7f2b31fc8b7c7d2645aa13deb6af84feeaa16bb9ecd1ecd1c113817a1c0bd0e15e852f8143424514514514514491451457c75b3e6c7e66b3fa2fea887cabe9bcfe56415456ed352b5ea43324ba8b3216f456d5f01fdd61db7a28a1a28a384a1a28e128a28ada8a28a28a289a28a28af80f9d6cf7456d8cd53ac4fea88f65bcbb321f2addf7450887cab9a8a28a28ad9a1ecb78c51c08e088d73573e2568e128a545328ae4adab6a28a28a28a28adab69ae9bd6d435f156cf7c71556c49332438481a9578ff5447b6f2ec47b6ec5f2adb17c8be051451450c7cb0f9764892ebcf5bd6f876e85f3d14514514514515b514515b4d74e46e88b1ae28fe7ccfe0bd9098af889b206a3e4fd50bb6f2ec2edbb21f26d87e5e44573d1449168e24712da12543bae82b25f0e868c3f30d31fe67b44883b5b514515f0a97256f35eef264b2122327c23f8cf68636ce16b6975644cdf2afa8a6ce391176862de5d8c4ff97faed81f7e5456d5b56d238c9b524cc5871b82b44f161bec7b3c5fe270c579104b89ba2293823342a371a42bf3f86b6c3f38ccd7742e2661be177b515ce9725f3514645eeed5b4a3653e2a21923d931ab57f150c82b645248b47723a2cb922a51470b8b69997c8434407c925d0c3da6bf31183e62b76288cada8a1a26312f724453714701c0878d34471c692a121e3b44b1244a1c2caf80915b62fea21993b1ee914925bd15b515baedbd0b65b57264f91f24e4a2ad9924f2748f44471ac6d5f66cc2ed1254f763e75b33046da3c37145646bb3ab4cd6e814ef2624a9da1424a75c2eefb1a4e18e9f866b85c246ba1fcc735da4c9df1228a6479598be69a1185d4d0b768ea2e4a123221c7a918271a64634924514242444f32689c6d7c14cb2c83a9a1b435664d3df589152e157cabaef5bb5c8b65cb917b8f9353f811ed210ab35116d41c5dd4d3fd0d34ae1c5ea4f9191836702f41e247b17e438b5dd6e8669bba30c9c2516456384e5fe325c4bd2fb327acc589be1eac9f88e494f8e9277665d54f32a9d19134d35d44edf6189d16b91905593ea8463f997d45c9425b514514642ba914b6b10842422449125d767cf7b2ee47ad6c8af243ee5d164b2a8d591c917d98b6be5a1a16cb772485289929e396cdd1667998f1c325b922308af21771e37256878e43daba8b6a121c2327d513c51525488e38aec88c17a193045f95108f02239b22aea65d7659e28e37e437b2470925b345d0b7687d32c4488f723dbe1e5ec47b89722222da489227dfe1aee6344bc84cbea4d3299c2c9c6fb8e1e8425348836d75e5bde8a10894a9126efa8bb92758da7e85935c4384d766430be26e4ec504bb214531c25191192f66e22ba44a164a0e22ee45d942626798fab2a88ca8694a270a71b1b65ec85022bad1218c7123d0b5e8527e6332749459e6231bb8ae55b5f264ec223b56c8888bebd992ec489777f092198c9f72fb12c95e4269c53d992146d9c2fd083f747b37bae4adb2486d323dc93e2bdac43835b411156e4bf22a9b4449a54356a8aa9531724e6fb220225dc8741ba8d0c42424464d7622fabb764ebaef45090a1b67ec85da2ff21185dc172d97b5b2d9c7224ed56d16a84d6c8444565b25d898f67ce844974126a3163c8c8cd3128bdd8e225459658df224c48a122b6cfe5b28b6c8c2dd2df1c6ed8a515dd1269bb484e8f6bdeb65b4519e16ed18e7294a8e090a2a889962fd0c74872e8fa108d8fd10d3b1adb8989bd9364e4aa85cb175b655ee98fae3808d3bb8be47d3e0514215a22c44448afcc94e29772734fb1c0c6a87ce844bb1895e246582e2386918dbe4adad171f538a271214a271a236fb46c8e1d4bed825fb0b49ad7fd890b43ae7fda1786eb9f9457ea2f0bd579ce287e1f993fea2351078f238b7657520e288d39fe469e3a26fde82eafccd6e2d243479387146daa5495a22d25544f6936d918b2b64acec915fbf9928283e890a4c6da22c8454ad32a9b11c54713b389b1523dd150a7145c1f913852b4c76df224382a4ec4b6c8bdd6617fcbfa311a7f3e496e96cb928a121c6889111964a2ac72b7b2744bdef21c5dd1c08a258fcd1c32abae4455a31cdc6291397118da768e05c3d8c926a9a38d8e6ce365b2d8db2dee8f07fff006c09eab041d4b2c53f4b25acd3257ed10fc474abf13fd88eb74efb4859e1256ba9adf10eae18bf564a4e4edbb656d1953388f6fa48c1fb4d56384bce2eec9e5d34d2f659633f5a12b1c5575649320c6ec8c5b3d8b4ba3b3aa235c7d7ccc9dc48e142493ec2975b1fcc4217143852ec89a82f224e3d290faeec8ba20d3e84e0d32aca7ba69c4543c53258e75d62cc31954d511303f79f249725218a28711c45b3950e4dd098a48f6b14659f176de28e891295b10959c068becfc39e39e4a31789fee74e48eccc11f7acba4667eea2c6cb1b2f6bdd23c2ed6b709ad538ebf32f5958b27babddff00d64758e2bfa18beb44fc45ff00aa1fa448f8aea63694dc7f4279936db6db63cf1f4643327dfa1c70f53da47d48b4d19345a6cb3e3c98d4a463c187174c78e31fa2192646367b3628b231910525dc714c71af31638645d58f4925d850a950d0fa1e662eb0253a44e56325921057292443538723a8cd37b58990912f7a0451960e35ba65efc31152177ec27bcbbee848a2ba089254276d9c5ef325dc87592dac71b147f96f7b3ab1b7c421743889e8f1cfc2bdbc13e28cfde6c725e9b210b7c6e98dfba6a1f6d9b2f9e28d26458b3e39fa33c473e9f36a31e4c72b754fa0864fe61cad53258fa5d24bea7031609bed162d365ff062d266ff005cbf6162c98d7bd1684ef6ab16389d114b84515c95647dc918a4a51fa19970e697e6af692b3ccc4fdd6498c93ea6786a33e6928f5a62d2e48ab71a7ea859f2c70db8db46af579a6ab8dafa743439f25e34e6e49aa6448bf719895f53513be822f92b7470ef25d77b16cd929a439271b213491a7c32cd2924ccd8678dd49108f989118216335519420a9898b693a8b31e0c9913925d177dba8d4a538a8f76ea8c783061d1c7439a4a0f2626db7d1599a1ecf24e3774fb8a69b1342117b41917d0d43f7917b22b96c4d9162f9e3f53168357962a50c4dc5f662f08d6b5f22fdccf8e58f24a3254d6cfb1a7d4422d29c1346396294538b5429635de511e5c2bf1c4d77b2cd8d5648dc48f463ba22ed6efe488a427c8cc0ee299a98db4c48a487f318fb32449d2253a5293f21e48ce7c706e2cc79d4954ba3324928c95f43530727513c3b46f1638b9f590ba09fba275126eccfac8413507d51a5d5ca53e19372bd96cb65565111ca84c7db92cb24c948e3b8d11eacd25e24e5ea666f2aa951ec69743ac58b235f84fb4b5d380f9e1d5742708c5ba911636c95b34b961871fcb76546591c94697a0a317da224a138e4c49464bb1a9cdadd5497b4cce5465c528d36ecc3a586449db27a4c704d95f9724598e5d0caee4fe0a108e8d45f9d9e1924f4587f247040f14496af225b3ec451c52f534f2c5c7fcdba23834b56b18b1e9d76c511bc4bf04519a6a58a697a11de4fdc5b40a2b7d3be86675012251b3ecedbee2c5c2870a33938a945a2782307d27d449d1349c6e8c7abc387256482fca462cb8f2454a124d085d689ba33e570c5268cd96e4dd799a4d7430cbae2b7669b3e3d446e2a8941a1ee9ae2b6c5b4958a34b6685b5144993db4d8ff13424d8a03708f768966c09a936a9327e27a782a862b27e259e5d62a31fd096a73e4e929b31b4a49b30f59dd0b82bb225893ec70aa49f430e873658dc52af5b47f0cd557e15fa90f0dd54fba8c6bd58fc333c6fac48f85649c26a724bd0c3965a4cb24e11927ea66d4bced5c231af418f7890f946edf3d6c8422ba2343e2da7c3a78e39a95af444bc6f07ae5f3f25e66af3473667357d7d7b9e5d86255bc35791575ec3f12c31c7fd3f7fc919b3e6cfd64e97a2ec432e487cb268526ddbd90fe54221b51451a77d59a87ee112842268d4aea8e1b32c1c73fd4c934a5c31f2ee69ab246717d8d769de37ef2b4cd1e2cdedb831faa7fa1052495f731fa99f2461d67248d46b30c970c5d93c6f2f4842cc7e11a89cbdfa8a349a5869e2a311c13ee2da4c641f44446baed1ecf95b2636423c52488a4a3515d3d48ba464f68e2dc7a991e6b77686a5e6f6425d4c78ec84784b388688ce71f964d187c5b2c125923c4bd5773378c644af1e3fdcd46bb55a89dcdafc92306a735c6db746a61eea75d84f67bc7b98faa63efcb7b36588423f09633cce943daf6623142329549d21e0c2bf18e18d767bcbe588880b931749fe86abfa68876299142fa0f1e497684bf6351a4d47039bc534979d0919a0a507d3ad74327b4c71ae07668314a186e5de4ec96384d54a29a218b1c17bb04be8b68ba3c672a8f037d8f6d0923c2733945c1f90842ed7b7424d50d98574663c5293549d7a9f658dfe22781aec284937d069a1b218a53ec2d364f425a6c88960992c524fb1834edf57d897bad2f2334d274bb798f3b692a12537ef24cd46960dbe08bbff00c3d94e126a6ab6c51b64635138d222e537d10a3456dc22c7194a99ece37d11d13354d397e88a2a893ea59641f520fa993e77c9453dd212109095c4554349b2a9a1ae9d062296cf65be9b4d9f50dc7141c9a23e0daf7fd9ff00d47f04d7c92f722bf517fc7f5afbb82fd48f806a7cf2405e0597cf347f63f81bafebff00e11f038f9e667f04c1fec998bc1704256e737f912d068611b9a54bfc9f43db7fc7e1df3e957d72234afc27529fd9e5832577e16a542d3e05db143f638314136a1144ff00e4da584a4969e6e9d1e23e393d545c31c7820d755e7b31a4d755b2ddb3c474ab5181c5baa7689e8f261beb669f533c19a328dd2ab461cb1c908c93b4f6c7d550df41755be9d28c55a389247197b676a306cbb34d2ae82632725e48629b928a4aa89bb64fde67664a726d98df4a5dcd4caf24846175d44e73ec434ebbc85c29521bd922e892ea8f2248d42ae07eb1458c9aea50d11bb232a3235295a16cb67ba11c47189be11b748b916c52717d4b16cf6ae4f0cd6cb48e7351bbe87866be5acc7394a1c2d32d1c487922bcd0f518577c91fdd0f59a75fdd87ee4bc434b1572caa87e33e1ff00eebfd19aaf1ed169b03cb272713c73fe41a9f13ccdb938e24fdc822a4fa25d59ff0008e3d3cf3b846ee293327893c7f3e4c10fab6ccfe2909619a5abc3d63e498fbb7b3632f64869884a878d4d53353e179256a2d3463f04cdc77369234da75820a1176b6c2fa9ece2fcc781df423a79b23a79591851d11c42279610eeccd9f8fa25d08d98a9a4c8a2870892c69f9b3824bb31baee420e5f2a32e1946bdd6707aa12e1322b93218dce4a3156d98fc072fb357912643c19452fe6afd8fe1117df348fe0f8bfdb323e19a651a7c4c5e1da45f85bfd4d4e358b335d9791c2b88c9d1a62ca9f4648c9efa8fe4a871e1193ee50d32086ac51438a384a5ca997bc1f747e147bc3b257e67908be5ea28a6787e97459e34e7253f3468f458b0c6708cf255df73ecf87cde47f59b1e9f4dfe17f56d8b06957f661fb1c3a75db1c3f6467d4e0c18e5369248d76bb2eab25be915f2c48a359a45a9c5c1293493b464f0d9e3c94d3a31e873cb224b14bbf7346a7a4c4e189b5c4bde7ea70499ece47b264f1ca31b131bbd91144a1d36488771b435b518ba488b471f90e7c31a462ec7075bb295118714a9ca31fcdf4465d434da8b1b6c8aea4715c50d3810cc9ba13d9943424e2ee2e998b56e3d3246d1096973a5757e8c968b452fee28bfa99bc274f6dad547f6349a7f0cd2d49e4e39af369f425e27a74ba36cfe27738d2f76fa8f5587ca4999b5f922bdcc1397d22ccbe23ac8db9609c63e56787ea273d45ca4faa6a8f1369e66abc908c9d531c5a96dd1bea66b4d0ac91450914512451c270948e1470a124523a0d23ad98dae138913764ddd17ee88c585e56e9a466d2cb124db434514508c791c649a6d35d9a341e2aa6d432b4a5e4fc99ed479496664b348f12cf29e450be896d11149f914b91935789a2bad3144e12ba903c89c08aa1a23c9074c6e88b1490a6472d13d4c231fcfd09659e6e9e47b2e8c4ba90c5d511899bb975230cf890d8b918e1629b5e43cb27d1b1c8c9a9f242cb9252a4ddb3c365923a582caee46a3570c30b7d5f92336a32676f8cd2b51cd8fea78b455c65eaa84d244a5634975626746a89619ca0db7d1147728a28a1d94ca3a94ca670b3859c2ce067b362c62c5f991c69799c289a44d2a424b81ed8f2383b467d57b58c635db9ee8d1f89cf1d43236e3e4fcd0b3c64ad3b43c84f2d2334f8f24a5eaf68b135cff81928df5228a1a10a42a6381272890927dc92dd7724ec8891744b25f629b6acc789462269a6431b9488c3aa25d22c9c9b7b609536391143625b53b7b55b3878a546a7db47a70f431e1cd91d289a4d1431ab7d599352b1ae183b7ff88729cfab7b45d4933c4971e1c4d5ab34916a52e3f374999dca3924bf31c9beec8f631c2329d49d23539adf043b2188a28a1446915b52ded6d7b589968e2e87112637d109ba1ab13dd73e9352b145a63f1087a19f5529a6937d774ac4b9d7c9212438d3d9ef191191961711a688a6e29b44975deba8844a56e90a29215391c570a31e374d10c6a3b4faa6892698cea88e468c5352435b49b23db676912b4ba11d5648c9f13b469752de78db4a2df5351abeaf1e26abce48863aeaf76e8cf91bc5857970989297145f635516a63443b129b8f62c627437b5898d9659c4391c4711c4711c4cb65b115b31be82ec79101756896cbe02dd322ed73af95886ba1d87b311164e7eea5e624e4ff2f364249f14492ffd57b2122289ba544112748c71b66381d2288bb7b4fa226ec65bdb0cdc5898d0c821ecd1a8c7c3919469e35722fa098c74c93bd263ff00f99909b8cd51a8e1725d2c8628bef14658a8ca8c8f92f74c6c65ecfe02dded17d04550ba324dbd97c48def687911ed4f687b41488cba512385b3824cf65216390a35ddd0ebd3a1c693ae14635d25517d4f6191e26f81dc5dae87d83552eab0c8fb06b2bfa1210893b96ccd3e3f3152252b310dd23264f218c684c4639da449f4229b6462550d6da9c7c51bf419a784fbbec24e8ecf6669da960cb165534fd0934d90af5352d71a263d9f22da4b77ce842470f4287123ba63ebb21c5aad97c1eabc873a1e46393dab742636a8c4d712bec2e08cbf234d874d95b6eebea62d16865da0dfd64c5e1fa3ff004c47e1f82db492fd1331e870425c5c316fe8858e0bf0a291d0b11e42ead9e4415b20d2892ca638b7d4551464ca537b490a368e0ea551195116e6d2138c53fc97723995f989df97722a90d128da34fa48ae294baf5e85c17a1ed138d0e5d45d864652be8c49c9a495bf21f87676ed51f2369c95a350d37176487bd96362d9f2d15b515b445df66d51e5bded5b589b9d0d34fe0234f9e18722938a95793353ac9677f2c62979245b6515b5f22d9338dfa90d4ce1d99a6d7385abee6873a9e14dc8524cb2cb2d96c4c72a811636628f9926d108bbb629a48964949b48a127e870ceee85172f216297a1ec25e87d9a4ff08b4337e461f0fc8bba33e9a7a78a94aa9938463c2d2f32134d0a98c67138dd79927d48d8d74ea41f719034589cf34655d23d4d6ea961c549fbf2ec4a126eec946893d9bdd884d21512d9f2d6e889e63248f22287bd8f65699295bbddc44b91b285ccb743e44c84b2467719b469bc475b89d70f1c7f33178c69fb66c52c6fd7b98b59a3caea1920c5c05a1c911f07979e543f078bef95fec47c1f02fc72178569979c85e1d8176b3ec180fb241763ecb067d8f1fa1f62c62d241791f6788b04458a28e0822e289ea610567dbf24a6aba235cb8f478e544dae9145d119a2b692e83c74ce8912c8db441f7198d5ca9978f4d87a3e8bab33e696594a6cf6cc736c650f77b50ba0ef6bdef91212132cbb1f63a0a86ac8e0cad5a84bf6169b3bfedcbf632e758e5c356c5a95fe22cf0fcc8e5c4d7ce911c7092e9961fb91d2295259a047c325fec89fc3179e4ffc178662ff00362f0dc1eb225e1ba7516f8a46650526a3dbee517d4c795c57727a894ba367b2791f447b2f13c11fe5e4c95e963d7f89c3e7c997f768fe2195bf7b2cff0056597b5a2cb2d168e2471a1e41e6487a88af325aa5ea3d4aff0023dba665c8a5168c3f9926b2785a7e915ff836f8eefcc944840459932460adb1e7536e873754297623b2954cc9a89e48c62df444be568a498a4ee877b312e4ada8651456c8ae445898ded63979a349ac83c31e2ee8d7f8b63c58a4b1af7df446384f34df9beed8f4b9d7959284e2fde4d18f14f249288a31c10a5d644325ba946cf611eea738fd19396787c9a8c8ff00521aad6f96a242d6eb57f76ff4466d6e79c385bfafdd2cc3ec934f23663d6605d218a87a88b4dd997550768c92c4ff000216a15d70cbf63dacfcb14ff638f3bed82656a9f6c2ff0056858f57feb8fee2c1aa7fe08fb2ea7fce28fb1e6f3cdff87d865e79dfec7d823e79667f0fc3e729bfd4fe1fa6f38b7fa9f61d2ffad0b47a65fda892c7a5c69b70825f446a3570c89c610518fd3ab1415d954ecd0bf69a1cb0fa92e921f588ba3279f1c175913d75da8227925276d98ddb2b683db25a90a4c4c6959c3b37b2e6b45a1f2dd17ccded5b4750f0c244e53cd92df76cc185628579f9bdb329e49f6f77c88384209410b4dc74f888692315666d53ae0876f3624c88a514c9c937d17c7ae6524d7538d43aa921e794dd0a1267b3f5674426596596596596711c4711a9d6e2c0babb979232eab366c972974f242458cf099f4cb03369fdf9b4fcc9e59c7a263c937e64db13ebb4378790d992ec4458fa365bda8a223e6e12b9a84b645ad9965992d7546452a2911cf961da6c96ab338d3685f2c5fe447af634d9638e4acf129465a65283fc442292b639cacc6b89f9938f0fc74c521a1bdfa0d591d1b6eed33d8ca3da24a4a3dc96a23e499c47116596596391c4711c4711abf108c138e37722a7927c526db646096ecf0b9567af589a8838e59abf3666be39144e25108391d8b2cc6fa2244dd88893bb287b3172d96597b5b3a9d4ea53dab6adab644bb0d31c13ee89618bec7b097a9ed3324938a7469b598b16552cb8a5443c53c35beb06beb1355acd366c1c38e489c9d108c8841628df175689cb8a5f19f23e5c591a3164b7d4f6587227c514ec96831c5b6a3d05e21a5714fda25f9327e358633a506d7a93f1b57ee631f8e3f2c468fc571676a325c32dba8decc94e318b949d2355ae94ee18dd2f5218ec492e4668a7c3a8c6ff003355fd6c9f533e9efaa218a4e49513d341a5d0968fafcc2c51c78e55b743a1126c6f64c977e4ae7ae75bded5c8b6c939464d1ed59ed4f688e38bf32d7a8e107e4878a22835da6c839afc5639c9c48292bb7f16f97b6d5ba646462cb48c791342b2484aca1394649a34be279e6945c95a5e83d5677fdd6435d35d27522138ce2a517d0cd9f1e28dc9fd119f53933cbf2f24431f9be563ec619d4e2fd19ae69ce0fd63b521f5199dd45f22252bdd0c7df6474f82dfc3abdab7cb1ecca470a3850e08e0438152f52e671c8f6afd08e55e6464a4ba7c6bf80910642c6da1c1a64b04b838aba1545899a697f363be2cd3c57c3e6893c9926dbbb218d2d9f2beccc6ccbef60c392ff0a431963350f6ae77b25c8f7a3a1d063f84b92c44e368e1927d76a93f23827e8cf673ff00167b2c9fe2cf6195fe067d9f37f84bf63ecb9ffd52fd8fb16a1ff667fb1fc3f54ffb33fd85a4cf855cf1ca2bf35f76b22fa9074462a512514fab48a4d38becccb1a91441753043f991e4a5bb1ecf6f231f76604a7a0fce2ded22864b43c74dce8d4e9961e1a95df25f23d9723d96e951637bbf80d7322933c2b3e3c797d9cf1c64a5d9b5d99587fd31fd8fe5ff00ae3fb1c51f2c68e27fe08e397f89c73f44394ebb1733c4313c9a69af45687f7654636626e8b6233c571771c7a10c4e5d8c18a51ee8511d222ac7b3dac7c91f9cd0cd2c19e2d8decd98e3c535e889cd422db66a333cb3bf2f2f82b95ecded7bf98f67b5965bf86998e4e32525dd323adc6e29df912d647c99f6e88f5d1f53edf1f51ebe3ea3d7c7fc87e231f53278846516ac95713fbb264198643514599304a527489609a469f0cd756a8f7625b6d1180d8d97bca4917c92b5331cdae965d9745393a4638a840d66a5ce5c2be55c95cdd76a28a1ae5bdacbf836597b2e5ba1659fa9ed67ea7b49fa9c72f5389fa96cbd98fe15fc5c6cc4ca62849f647b3f56394223937f90dc23d6523dac146d22195c9ecf67248965490e4e4c8fcab9322ea991eb544788516c863a46b35151e08bea3e543dd6cda4d7510d97f765b32fe2317ddb198d33da417688e791fe43fce43c915d90f2c8b14884ea4879635dc967f41e69b1b93386447b10edc992b82cc52ec63c4dd5f44471451a9d42c71e83936db6c765722648775b2d9e16f329b7d12e8b91be74fe32deb6bf87e7f76c66223d8f31b6f25325dc7b2e47b436876d90c97c8cc5dd10ec4be566b1bf6ccf31f6e67b3ee2d91e7bbe67bbe47bbd96cbe02f82fbfdc9f263ec623fffc4003c11000202010302030605020601030500000001021103041021123120415105131422303240526171814291062333435053161560a13462647282ffda0008010301013f00da91d257d0adebf01c148a28a2b6c49512569d9451d2ce93a5148a3a4e93a4e93a51d28a452296dc7d36917f888a24d50f9dedd1685c7647eecbdfa4717f428a28a28af056d451451d274b3a59d2ce93a4e93a4a42925d91d63a657e2931bfa17b5965fd5bf0750dbdb97d8a56c7e1691d2578e91d28a45229148a5e0e3fe12fc77f89b436fc3cb1551cf9edfbecb644bb78d7e1595ff3ca4c734fcb92c4761bdd12f1afa75f8cbff90526853f52d15b4463f12f03f0d7e16ffe51c90e4fd3c699d4c52458fbf896cf6b16f7f8be7f0ab6b2ff0006e97997e898937e69138c23ddb639fa16fc1c96c4c544b6bf1aff0083bfc1515e0a2bf012924acc6de49a8ae09e38c7ee9b1e482ec87924c8b9392e7ccd42a9ff001f4ad9d45af1af0515ff00b0178b2fda8d1ffaf1fd9995db9fff00b6f8bfd487ee6a6bdeff00edecbd91a4af7c9bf464dc6e5dfbef0fbe3fb9a8ff0051ef2c29771e38fa928d7d15e25ffb09fd0cbd91a5ff005a3fc927f72afeade1f7c7f7333bc8f7ccae23b25f5d7e3ad16bd4ea89d487923ea7be87aa3df43d4f8887a9f1303e2627c52f41eabf43e265e87c4cff0043e2267be9fa9efa7ea616dafc5e5f234cdacaabd1926edef1fb9193ef7bcf980d724bb7d75f859e551ee7c4c4f8947c4fe87c53f43e265e87c44c79e67bf9fa9ef67ea7bc97e6675cbd47265965965965965965962669df0596597f815e2cbe460ff5173e4c7ddef1ee89f327bc5a71fe09e2763c4e87c782fe92fc2ea7c8bdac65ed673bd97b596597bd965965899a77f8bc9e462573fe1f81771f7de3d996327c4997bdf86cb2f75e1ef7ca3ad9d7213b5b5fd1bdb52b810ca1be04cea3a86ecb675167523a8b2cb392cbf1234ef96597f8667cc852b32189d4bb5f0fe8447dded97ef7e2b2f7b2cbd93f0cbbecc8bf1df8b51f696c8c252ec3c3343bbdacbf0d97b27c8cb2c4d50d8d9658996699f2fc18a3d52268ecff0002851e792515ee9d11b764cc6adbfd9fd0813bebdb3fddf5a2f93a25e87bb91d12f43a65e84a12bec513e8a8d26b8e488bc55e14675f231b31538aa23a79bf346ae2a392bcf6b2cb2cb2cb1b2f74d6d690e4bd0bdaf6b34afe67fb7834d18f4397993c4a5466c6a13a4efebad9ba2124d72649f4767e42e11331a6e5c7a0b1c7cd9d10f42714bc30ee655f3ff08667f22f7437c17e28a47498a34d33266c8a6e991cd96bb8f264fcc472e55c29332ca5495f3e636d4998a4babe6e47d37c2fa6c466fb18d9a0e878d3be6c4b12f33da7d2b32e9fca5965ed7bdeebc0f6b2fc1a57f3bfdbc1873a82a685255666c53bea68ecfc2be8a192c8acf792f21c9f76ccfed6d360cb1c792d5abb1648648a945da660ef2fd869ed3fb7c30ee8cdde3fb0ccff006f8131cbc36590644bff003224dd49fee75b3ad91c8d34c94e4db2c53a1646295ed7b5f82cbde7f6319a3527938625962fb3353394b2caf7484536749d28a4b652a3a9eefc365eda57fe67f1e0841ce49222d634bce8cb96529dc6d34654b86bcd58beaa32ba4cf6ce5c91d3b9469aecd33d93fe20504b06a1b6afe597a0f3e1f77d6f24546bbd9ed0d5296a32dbb69fcad7a1ec1d67bcc0f14bbc4c0a3d0ebbdf231b44fb3f0a32fdb0648cbcc1f81338f1598d917c129d4ad1297549bf0b1f6132322fe85145324ae2c585ca4c845438461d524aa6658e3949fca8c9a6f380e135de2f6548be7b16ce59cadd17e063dd16697fd45e0d37f5b1639cee8835f3dc5a6e0d7f2493508a7e562f021b48eb3acea4269ae1f8119bb333e38e4c7283ecd1f08e5a9c9829a71ba347fe1dcf994679e5d0bd3ccffc7747277273661f6560c1353c5c3aa6629385d96dc53daac946bc08934f17ecd1226ae2c7e0b1f8b1b13e09786c6c62222178e8ad9f62abc52c38e5e42d0ca77d1cd7a93d3e6c7ccf1c922d27d872636f75ba1eef6862c93fb62d92c1962adc59a5bf78b6845c93a434d3e51831b4adf99a5cba5c3827d714e6fd4c926e6dc7d47d4d5b209cb2282e5bec4938c9a92a6211124f9dac6c5271ec42737dda253639b219192764b143d0c5ecbd3c754f5357212d9b3ab913adeac6a9ee84af14890c7f4e1dc971143f13da2223dbe9b18b79e551950b3c7d4f898d98b5528df498752e6ea693466d1e9723be9e9fd8d669e3864945ba7e0a2b67b5eccd3e179654460a09452a3c991d3af78e69d219824a10b239b0cfba57fa9933f151475b7e675b4636a78ec8b78b538f22f29266af3433669cd452b13134cc6aeff62706b9dfccab8b2ba52d9a22dc647554cd2c34d71949dbf34ccfd0f24fa1546dd6ee637c262f2dec924ce84354231f31923c864f893f1d14fd069fa6d0fb89f7a1f858f65dc447b7d26218b7d57dfbe3663caa138b6c5971cbb4d33da2d3c91fdb6a14448a1a18f7f334389c63d6df7ec86d33c88af95a1898bb9384a3dd6d3668d26a56669273743b22c549d985dbfdd196ea8650972431aee64efc8ff46790d59572b21b3ee36ce9b4d8fb10e5a1f81b3a8460ee3e1b5faed97ef7e1501452f0351f4428c534c7cb6c68a7e0632b823dc88b65e36c645f25a72688e18b88f1b4c71354be7d90a74393621dbf32848ad98c6f67b3340e5d32bbf2ada4e9364a4d45b6588c705263c918aa9ab272529369521a6cc4e78d3e063d9b30df48edc5da1c0a7d4736636fa7932f2d8a3ca24e857dc440b3a55d9210e288479b1f86484627f31938c93199feef0455fd3a4c6ab663da3097a118d162178ded1ee6a5b8e44d1a6cb296344677dcccb8354b945328498a12f462c53fcac58727e53e1f27a0b4d90f869faa3e165f990f4e97798f1e9d77cc86b47ff6ff00f237a15fd67bdd0af2b3dfe97cb111cb85f6c68c11eb8da44704df90f4bc7264d2ca9d19b16a62b84d185e77a88dcdd1832a4d2afe4cf4e4a9ed8a092ec65694687b3111c934f863ba5b382a1f0cc726ec9f728e9b3a6c962e8845fa8ba9b5431b7e4c716fccf9d79909f53e51168f31ecd8a4eea893db1bf991997cff00ba199fcbc115bb7f42cb1ecc826d955b342e04cea2c522fc0cba665c51c8eecc38d63ba27ea393bee74c65c3567bb87e547447d11d28a28a2b767b43ff00a6910c195f2a0e85a7cbf945a5cbe8bfb8f0645e474ca2e9a345a24e2a797b79448251a515485db6944924ed333ac98f338ac4daf530b9b94ae34628a69d9ee9220d76b32f66aca21832495d0f0ba1c1f2a8c151c8ac7d843a3dc4648f73d31e09ae591c6dc6c58c8c2517c53334f24a9485c781a249a2134d174c6c7b5723b6292f523256b933357163332e3c117c2ddef62626798c841c878d4633743299d126638d2763d9b15b126865966a16672c5eea372eb44a138d752da86868644c8f8ada3df648a28adab766b39d3ccd3f4bd341fe943c6adf23d2a6ff00d59ff721a38bfeb97f2c97b3b0bab82918b0b508a5e8470c84a956ce4895751ee71b76d59eeb1aed0438a26c51937c12c3375c18b4f08f3369b1ce08938bec874d53485a65768edc31c58972244bb13eecc5f6a2851a466462d3e5cf2e9c70727fa19bd9bacc31ea9e1697a94283638344a247e599266292926bd07bd165b3a9fa8db659282f2dd765bbf0c6ec945a48943e58f0638708d452c52d92132fe65bd0aac8e183c6ed7343da306fb234fab92f69bc326a9c7e544d4941f54afd367b3de5ca17720b64848af0b199a3d78e51f546971e4c78a5192f3e07b452a20fa249a2399374a4dff07be487aa82eec7abc7f991f150fcc879a32ba6629752b2ca4ce880a86f7ad93a27cc6c84ad0bef6844df04bbb31766451d91376cd264d268741826da8f52b6eaed90f6968737cab241df912f6369b27b43a3de74424ad2345ec6d0e961f263b7e6e5cb35fa7c6f36af0ce2d352bc6dfa559354d8d7ce8c8f934f1a63451456d7bb2c9ab56b683e3c70c539ba48841a9a8bf52781ca5766792c6a2d98b2a9fda6a3271d2cb1c98e6d1a6719cddfa138d6f8a373465d4421171be5ec918128626e55ea4f2e59eb25adc51ea50c955e6d0a4b2e0535e82c89bae46d0c7bf90d18d7025e0bf0318d0bb489ea70c1b529a4c7aed3afeb7fd8c7252826bb3da3369f0c9c1becc95a7ca63bf4674cff002b3039c24ee2e998a6e367bf1374750995687bd9d441f345531774c8992c9ae5987cc8927c10c6f2e58c23de4e8c1a29e2d2ad3ea12c907d9a357ec5cd89b9e17d51f4f3469304f264c192507d6a22b58b975556cf6e6ba12d4e6f76f9970dfe889b1ab91d3d5231c1da491a1ff0fe79b8cf34153ed1be6cd7fb2e10c75d308c95b4e3e69128d31ad9ecd34b66415f04a2d36887868846d9860945b161ac964b83599d4a6a2b9a316778dda43cca6db6526745f99f0d7fd47309d27d859ad7cc8a4c86357cb2118c7b1a8529e465b51abe47277dc7927284a1293717dd10c58b0c2b1e34acd0cdb8b84a8d44324324be769790926f99c8e3c325c905c7853f0318cae59ac8b5a998dccd1b6f042f65dc651914ebe51cf2fe63ab27e767cefcd9895648dfa93ecab64c8731251dd8cba2ee9888b27d89c6dda211e914894b830e478f2c66bbc5da343ed2cf9f1a73d2b51fce992c90baf534d9ba72b85d3f43da7a2d56a705e1cf25eb1f266af47a9c136b241a2487c5b30c1b67b1b4d0cdaec517d97238c30e3eaf446b7431d4e2965ea9ab8f6f3fd92355a0f749ca9ae69a6a9a64f1b45ecb92706f1a490d6d89a4d36649f54db2ea8bf026634637505b6bb376845fee3a475094df64cc78350dd28be48fb373c9fcf92887b3f1274dc99f0d871f6c68cf8b17bb75149991d46931f5fab239b243fa98b2397264d4e384b96ecf8bc37e63d5e28f9b62d641fa9f1aa138b826ccf18eab04669b4d77a2189635ddb10bc12ee2edbdf898c6799a9d164c995ca2d0b413f481871b86349d789e28bb21a3cb39fddf2f9b218f162e2316dfa938425dd2233aa8ec8c4f8243dded0e625f040c8fe5d9b11e43951ecfd5c32fb3a2fce0a9a5fa1a484e70966c89aea7f2af447b5b2cf4b974d9e3c48f677b463afd339627d3923dd3f267b43531cb861925fe5b49a9c7d2516b87ea99a89425966e0aa36e89f7a349827955638b6cf62fb2f3e9f32cd969271f277439e3c50eac93492f366a7dbba0c726d64ebaec9235fed096aa6db549bba1bdf0c6e4232aa9c90d0bed96d2f213af024605c1154659a841b26dca6e727cbf24495bb6e8c2b129a53e3f531c74fd29aa62c90f21e65443976669546ccb91f9b252bda84349f7499934b176e1c330fb3253572cd15fb2b660d061c51a4dbf56ccd831a4d2a3493f9fa7d512eef65e0977178d2286319e686b912176172ce9757b50c47bca8a8a464cd2ae11ef723f214e562768441ed3dded8ffa87d883e09550da6ce3d4f798a3de715fc9f15a77f2acb06fd2c94acd0ea67873c1f5b8c5c9757ec62cf8f334e138c9570933dbfab8e5d4a84656a0aacc3aacf825d58b24a0fd53a336b3539ffd5cd397eecb12b3fc32b14f065c73aeaeab30e28c2dddb7dd9edec370596327449ee8516614d48513554a6bf632658c13e55fa1f19969aa8d10cd7dc738b4a989a62a44b2c227c4e1f56435582f9663d669fca647518dc6d493355aaeae111e793141bb94bf816257764a5282b836ad9835392975be3ff9313f7b4e2f8231a46a5fc84b96740d28a1bbddba662cd28a743caeb9636d982e29bf3b658848a2868910ecbe8363631b2f95b26c4ed330b8f367f4bfdf6b2f77bcf55870c13cb3515fa8fdafecf5fefafeccff00d7bd9ebfdc93fe19ff0091e8179647fc13ff0011e95be31641ff0088f0f96097f73ff23fff001ebf925fe22c9fd38623f6fea1bff4e04ffc41acaa8a821fb6fda53e164fec87aff6bbff00732ff6326b7da0b89e6cabf76d12d56a5f7cd37fc9ef734da5d727fc8bfc3ba99462dea62ad1a3f6563d2bb9cbae69f0f644324e0ee3269faa636df2c68a23072638f41ec3d44a1aae955f32a30452c6b9b667c5efe949713b4ecd769a5a7cd38490d917c98e372565d3aa125b6ae7d79255229b674515c2e0a3146e4958ccd1b5763452121392e5331b4dcafbb2285c2d945244d7af63478d470c3f624cd55ba43518f72599f90edf72b66ceecc4fb8df226637f77efb222f82f6744a37c2231945535bb2bc2d1d2871434ac556ce05470f67baf0eb74b1d4c6309368d7e923a6c918c64ddad9262849f933dc667db1cbfb0b4b9ffeb97f623a1d4c9d2c6db17b1f5f5fe8ff00f28ffd373db4e93349a186085be65e6c5d308b9c976354b1ea1dca4d53f2463f677bcfb31e697ec92317b3271cb06f4d978979b4393a4b6484b762a63744f2b925d46972e48658ca0e9a347eddd27bb8fbf728492e695a667ff107b3e11ff2dca7cf6aa3da1af7abc8a4e2950d8991cb4fb11d562ae4f8ec4bd4c9adc7d0e9d32524c57e474a1b218e52ec8c78ba7bbe4744db437b58991924d3234fb31f1dc8c932cefc189fc897e84e4a317293e12337b5b1b9ba8b689fb41c9fd87c73f2c68f8ec9ff005c47abccdda490f539fd518a729c13f313ab31f7a3a3cd08870dfea44441aa2c4d136464e23c9262933a996fe8c91e6ce054468e1adabc3c0e46b351a9c4d3508b8fa9aad564c8e327085feaacf7f9bca305ff00f28f7fa9f2957ec91ef752ff00dd90be21f79cbfb9874b9b34d4536db347a3c7a68525727de5b64c30c9cb5c9931284785665c39f2c24a3095f91a1f6438353cf4e5e515d90a0fc90e13f21e0c9fa0f0ca23824b81459434499097259dcc1f2c9325953ec7517bc93450a372b6645c9d54a923a9d97c716c8e25fd484924363c9521352ee4b1716b66c5b2164754f92493edc32f247b5b42cf997f43660f69668a49e06cd56a75fa85d2a1d10f44c5a1cadf290f42ba1fe6f223a5c9e68c3a3c73954b3423fbb23a0d2768ea71ca5e8acd5e251852ae0d25a8ff002ca22ea4b75642b645963dd32cb2cb2d96cb63b3915ed35c94c8aa228fea119322810caa4f845f8650524d3568d5fb3ebe6872bd08e116044302f423821e868f0c6116ebb88918fef474af4383a8b192d9a1b3a8b27b2767273d28c657824ad0d0d3298e1647049c88c218ff0071e4e5164a7c325231763c8cb0a1219656d6466d109a970c5148a2185bee74422ada35dd2f3c9c3b18704f2ca976f3663c71c2aa26657097ec691fccd7f228ca5e4471a4ed96df086214e29adef6bdefc165a2cea475a1cd1d675929596c8b22f963bea22648d90c5d3cd8fc79b49197cd154c58abba23023031c7a6296d4423534390db659658d8864d9d44644871da196bb919c5f64394153a386b7431b2cee28faed3c96c69a6894d46239f0c5cc95914b6cb1b424ac9090ca28e0462c97c330c71f76f925931c177353aa94b85c22181cddcfb11518f096d2568d2be8ccdbe68d44e1250e8aaa124d21121b697062857cd2ee2196596589965f8299456d4514749d22425c8eac8ba245f15b3d927e0466c7d4d0b0bf53061e6fd365b293ba7f41ca993e55ed1da894468c33719a32d75f046d24c7b21b1bd92a3a8f23a7e7b2725c327372da0a98b6a25044e34c4f68121d96627538fee3d3c2514e3c1a9c11585d276910d3be27922d7a2252bde850f9a6ff520fe523db69118dec868ade848a28a28a28e928a4514b6bd9143db22e10d917b31761add0c4882a43db81575786f6b27d84c688ec8689212f9ac56ddb20ed49117e5b218c4499126f8272399324aa2220445b3a3246d6c84498dec8d1e6f79863eab8659aa9db51435cbdd15fe6cbf589011293f522ed105f42bea3dd6cd73b39363424b6647b0fbf87146ddecfc5659d48724291290c42a2d1686d0eb6e484e318b4df2c592157d4b864b57a74f9cb116bf4dff006c46c62edb23248e589195f612b210d932f7c90a6256c93a4367712db419ba3274bed211aa9c5d25dc92e4a656d953538b427b331af948f8dec9fd3636265898f76216d8129332a4a6fc308d477bdad1d48733a8ea1c8b2c7b2b1ba5c0e526b833e7d4635c13d66b17f557f03d76aaf99b3e373beec96af34955b5fc8e791f7931b9fa94ce918b6637511f228936912564215ba1b2f6634a29b2dca5fcf6258dd1449ded16e2d344f56f2422a3c71c972638bb2b8a43ee22495313a1eab1c57227d49348826445e0a2b75ba2f6b2cb2cb25e0f3f12da197ddf9129f5bbdaf6c6adf87538de4874a93460c0b12fb9b7eaf6b2cbf1d144a16d5a32e08cff0083538ab27087168a6514523e5f54312b63da7e8288c945b628a48b19c51ca2cea3aa879113cb16639472c9a83b68c529cbad3ef43850f87be17cd3122545db24bb6d3ec65974c1fea62c4f365e7ec889a48bb16d5e06ca6c762dacbf05ecf66f75b31789a4d0956e998e486cbdbac72fa762de6b8e09626d99b0a93ed464d1e7ef1c97fa13c3a882b699f3fab2a428498f56bca0cf8a92ed03e2b27e547c464f447bec8cf7d33de33aceb3de1d67bc3ad9d4cea65362c6d9f0f14b934f70d6e64422edcb670bdac8ba6991c9714c6db231a44bb2da4e958fab2ca8c58d414628f76556eb75b58f7ade87b2637bd15e043c90fcc8f7b8ff003a27aa4a74958b56bce27c662f467c5e2f56475107dad8f5097f4b1eae3e8cf8affed3e2a5f951f1793f43e3735d52212934ac7f8171e09624df623822bb23262c55f312c7a7bb54c84f4ebbe083fe084f48d7fa718ff1f4a8e93a45067bb1633a08c6999092e8f697ee457cb5fa11649d0f6c58a795a518d8f4ef0a4995b328e9b891c4a2db4bb8b8926467192e68cb1c5d369f3ba1bf05965ed7b5963f12f0a467d3b591d1922f1d5be598e129ba44b065f41e3717ca6460dbe0d369aff6336971b8f0e8f731b3e1d523e155771e9925f7183024edfe126a4d703c1a97cf5b7fa13d26a3fab211d3e46f94434f5d912c10ef2a3a3f54547f322f1afeb475e2fce3c987f331e6c5fa9eff001fa31ea63e503e297e447c54bca111eaa7e88f8acbea7c4e6fcc7bfcbf9d8a79a6e94a4cc5865169ca4db1cbd04f868d7ae8d561991ec7691568869b2e469462d983d955ce497f08c78a18d546291ab4a93fd777b43ed28626cb7b25b3f1b4f7ade8a39f0ad93db535187515294edf2d9871a844664864c92b516d1860a3de2cf8be9b5d04f5539baf21b4a5626c57449397088ae95f858da7c3a334a75c34cc7acc71e25163cd6be48b258a7377393fd96d7f42df830e09e47fa10c38f1c785b508f69c3e5c72f4662cdf2c5344210972d10c70f4462a4b6ec6aa56d2de5e6221db662ecb7b2c624f6b5b56d7b56f65965ef4f6e4a28c2937c9ad866eaeafba2bd3cb659271ed263d44daa6cc1f647f624a9599a0e69d094936998b0a4ae4b9238d3f23241479ea31afc0a12f03568962c8a44141778531e48457725ab82edb56d5b3dabc1460d24a6ee7c23e5846921caf748f6846f037e8cc33bc7075e48c5f6c48c8c53429aa3264518926e4db2b690888c647b17ba1f82b668ade90e8691c168b2f6b132f6643b948960c53ef04cc9ecec525f2b7163f66e75da49915abc4abdda68cfa8cae0e2f1b8bf53ab2fe7669b1beb5291e65c52273795d74f0990a4bf0487e092248946f867b9c5e8ac5a2d45d3c6c8fb273385b925fa11f6449ae6685ec77e790d57b3f2605d5dd0fc318ca4e92b660d2a8fcd3e592951dfc08d4c7ab0e45fa185ff950fd8c39bc98f24546ecc7abc9193e6d11d7d2e62cf7f3cb2e4e76a1891434323bb2c7bbf0a2fc75bd6c8623146328267ba5ea7bafd4e891d32f41c6fbc47a6c32ef044b4585f6b47c14976cac8e9f22ef92c96197911c738ae7f06fc14344a364a2d1280bb154c7ea8708e48b546b7410c4dc9274d8b1e3f41e15e4e869a74cc78a791d4571ea61c10c51e3bfa929fa789774648da6bd51a78b8c66bd242639365d508c1dded7b3121ecc485e15e34b6af070707071e0bdf04b868b65b2d9d4cea67516bd0f94e989d1fa92c4c9c1c5fe1e5b5598f34270bb23aa87be704cbba38170cd746f4f3296d28466d58a10841761cdbf1aee89a152cd9615e77b2da28c0a93fa28637e05b58c5ba1fd45be39f4cac8cf1b1b8b7c16bd5171f5475c3f323ae1f990f2635fd68f7b8bf3a3df62ff00b11f11857fb88f8bc0bfdd8ff7279f1647f2cd37f87631ca991c93aaea64724a33525dcc1272845b1771f91aec89619af543dd36d2bf1bda7d919be5d5af4921a228484472f4aaa3164ebbe05e16b65b3f02f0bd97d262f1db35d8f2cf1f5c26d389d79ffed97f73ab2ffd92fee5cff3b39f39b297e72a3ea79f72d791a39f4e68febf8891228ec68a72786e4a88644e7465d4461ccbb59add4c322a8bf31bd908afa12fb0d5c5bc989af5d9229b12a4732748c78d463f45bf0af051451e5ba28a28a43fa50f7752eaefe44b9528f9343d1b5267c20b467c22f41693f43e13f41693f43e108e9a9a742edf87913426ca34babc70c494a462d66194dd3a35da8c4e2a31765def08b484b65b28d8fc11e604e365088a24cc38e95f98bc690875e14fc0fe9d145785ef7b38a3a51d28a4522bc0bf0f244908b3a8b6c488e39cfb445a777cb258e318f0842d922306caa25df6ada0f8a25498dc4437461c76fa9897fc4afa4bb8ff000cc67250a2dbe110d34dfddc10c18e3e57b344a37162c7216214208e11686c9f821f713435475b31c1c99542f12ddecd73f4a87f83afa7e5f854325b231a4b1da421785ef23d096e88fdc89923cd183edd90bc2b643f03178d0ff02bc2be82ec3faebc28648fffc4004a100001030105040705070106040602030001000211030410122131132041512230325261718105144042912333506272a1b153154360c1d1f024348292546370a2e1f1358344c2d2ffda0008010100013f02c0a3703f9a047c0c045bf8362588291cfac390b80eab1356d5a8d75b6254937421a7511bb1f18ea2e6f66279a0c7ce613589adfc0cb80049e0832ad674910136ce060f0eacc2ab69873800a8d4739e64f045aea6638f82a6e733118927895c64e6770b133237b81698708bb08581677e2283c7c0900a23f0580b005b350ee6ba6b11eeac4148de7838725680e8112a8547b5b0f638f8ae912d2cc871ba47358dab6816dbc16d8ac6e59a828523c90a0ee4850f142905802851f8438f2faa3e098c280fc0f35801d7ae7d27d5aa70854acad67192800375c9ef4cbb0a756aaf184951848c60c27d9c8189ae96de581169be48e2854e6a41f8080b0fe1501610b0f8a87afb4eea2e2ded356279f0587fde680f10b0f927b1eb0b84122e895b379f950a0ef04280e2e4293392000e1f87128f49369fe063ae2a1c782c23a87c9d136867d22b086f20b18f944a25c7529c289a521d0fe213ab9753c0e6cf272f0585d8368331c53c522c0f673822f2022ce4a0de1e5631f0387e32142850a142850a3a9a8329e4b3bfa3c967c3e8b5d56067747e29842c0d99fc067e225668316260f1f2589fc3258545d81d04e1d13696d29e263a48d5a8566ecb03a9cf8a05c046239eab0982634d6e98bb0bb0e2032ba014597ca0f41c0fc011d542850a147c73fb57404c6f1ff0cbb293f071b904ae8b752b1f75bea566752a146e0ab528970051cf82a74dd5270c649b8311152426bdccc584c8282001201e250fb0aa41870841c5b384900ac0ec1880c82229e00e0fe9716acd6ab0845a6f0f21078ebddf859b80931f8a81d5f4b741067e14a1f052b35839ac4ce19a979e31e483428dfa6cc6ec20809a5d42b662613dcd350b992d4c6baa121b994461710e19df4db89e183251b1ab0f6e20839c31602403c1613131904090411aa7bdd51d2e027c1319b4ecba1dc8dd5270e4878dd099a75cefc3309e498d8ff0260e9e293e5c3e18a1a7c0e654b071fa2c6780858675cd4754f763762883e08749c33cca7b1ec30e0b1617e2a7213ea3aa1975c7455df4df85cd9c4ba4f225d27828c2f878281224072ce2785ce97ba4ebe08365aece08e08e7b8ce3d73bff0041ddf04ecd06c28eb220ab5336cd18590ee5c0a156d1488da622df1ceee46549bb0385215351398555f49f10c2d2bc65370b5f15065c57382617098c9660823550e7971893a94309a64e2ce74f05c6f6ebd73bfc106782cd66b351e2a3aa6bda6403a6bf883b4fc0e166a45d88c46231c96c9e598c689cfa4f6346087059b8813e19a734b1c5a5627005b391d45d8835f8a993ea834c181a2e2b2b86bd73b4ff00d0c98fc061025bc01f02b4e610692d9106e12e23a5af12b2639edaac9f25c11696612e6f44a2462760270947542e1af5244ee9d3ff004340f890c71f97aac21411a7ee9ee9d6986f92064c62faa6b9adc4d7b25073a20bb208b764e18da1cd213b50875d1f8148d27e18340981aff84f8ee0f86149e7821407128358341d7100a88d1498ec8ff35927ee70fc370b66633fc787f80402740851771c90a74c78a10340b351bc4c2dab1078263aa894e64f1458e5a294decff83c7f8685379e0b6238b906b068d59df0a37dc242823e558c71084707292b16ebfb05303b994278ee1a6d2982047f84a73ff0986b8e8d285177120214e9f9a19682166a14284426ebd4cdd192c016170d0ac4e1a858985793966bcd3c747554c84d33f5f833c7fc074c6a4eb3f03c7ab033fc5a9526b9b250a6c1a3554272cee016151b8ed1335ebcb415b30a2a0588f16a962d9f10e43241c0f1f823aff80f3050ff0008d1fbb6dd5756a6f653779fa2676be0f085b3e457da0f158b9b5070e0e52ff053d7bbf1d0640eae47f83697ddb6eac04b537b210de7cc260cf52a3e18b1ab01e057da0e12b1378840f272c479291d5bb5eb27f151fe14a5f76cf2baaea137b23c9621cf79fa2a7afc5422c0b0bb8141a7ab77fe8ad3ec37caeaa1b884a0c6c04001bced153d77b66de0f5b27781581fdd53f1ee1ffa11c7ad6f64795d5356af95539c02779da266bbc3187006334d0ee68072c33aa7d06f06ae3f1a74ff000cc858dbcd6d1ab179ac5e056d58089cbf171a5d535086837dfa266f556c6c8aa4145f5bef3e34e9fe071b9239a90b105882c6163f05279297293cd6d1bfd46fd56de8ff0059bf55ef343fabfcaf7ab3f7ff0062bdeecff9be8bdf68ff004ddfb2f7f6f0a47eabdfcff487fdcbdf9fdc6af7cadf93fed4dab52b3d8d71fd9536e16344cfe13c7ac3a142ea8d93aa13080f1de76899bd54cd21e0553281bed3da6ff81c4f1f80c948e6b135620b1858dab6816d3c16372c65633de46d0cfea37eabde69ff00542f7aa5dffd91b551ef15ef94b9397beb78532bdf4ff4bf75efb53b8d5ef95bf27d17bd56e63e8bdeab77d1b4563fde15b4a9fd477d5124ea4a81cbabb3fdfd343b2df2fc54e885d535086f94dde7b46c9ea81d3c908bed23a23cff00c0f21626f35882da05b46adab56d4725b5f05b43c96d4a35c7782f7967f507d57bd53fea2f7ba7df5ef74f995ef74f9397be37b857be7e4fdd7be3fba17bdd4fcabde6af31f45ef35bbcb6f5bfa856d6af7dcb1bbbc7ebf170acff007f4fcd7cadfc54e885d535086fb9377b1769bcc2a07209a6faff00767e38ebf8414e6bde7c17bd98c983eabdedfdd6af7aabf957bcd5e63e8bde2af796daaf7cada3fbeefaa93cca8fc2e8fded3fd417cadfc54e850baa629103a8286f32368e0a9e45c3c530e4a54aab9b0fc73b5fc21ca8ea7cd69d4c7c0c7c4b3b6cfd417cadfc1cf5c74285ced475050de2e7b4ca69971f14ca879ada158ca71246bf1ced7f0872a3db77a2aa22ad41f9cef0463083e3174ad55480ecb4b88d234371107309a09941b3a222160035e1c1361ee03212782267845ee30e3c864ba21bce1e40f24ecc30f31fc23f0b26f1da6f985f2b7f1296f31b82e7769bd414ddea9a21a8f24d281fc01dbf28bb23027c11ad540ce9b7fee5b4aa4480cfdd62adf93f75f6ddf68f45f6dfd6ff00dab0d6232adfb214ed435ac3e8878fc43953fbc3e4ad43fe22afea450120f3d516c35a79dc11c9093d13c7317b067323208e1c023818580609f0cbd355dcf2257ca1fc6562981844e12849a70de7984d918c1ee2d69fe93fca7105d8a4f92e06617683a7871bf0199c0ef28504360f39d570891f13e2be46fe1f52a329b71393edd59dd9e8842a3dfda329a301cb2548b88cef173cf4dbd7bfb2bbbe6820a6e1f1aedf3718e283c87c7470f9a041d0cdecd51f8972a7f7a3c95b19f6ae3cd11c5005927ea111c38702b2e0a30e99cc8589a1ad812e8e3c1375c4753fee6f1a1f15cfc549cbc34588ccac4e999403c99133cd39a499c30b0f88432f9c286f78fd174391faa96f73f758bf2b56377350a146e0cefc0ee223cd47e60b5dcc2542c26ec9746e95d12ba17344ca77143eedbd4d4ad4a97de3c357f6958fbe7e8552af46af61e0fe096cab8ea470173553a855288cb74ebd79d16584af2d371ba7c6bb7cdce8964f782c2de410caa541e57b354787c494dfbd62b698ad9f20544540387f92c7964087712b3253465c117464dc820071fa7faa73c99dc0a5bddfdd4f80588accea561939046385c04901003a5e0ba3e2161e942183c6e3009108c448b86427c72b868ff443b2eba3ecff00eab99db6f9a0640c5f5584cc2318e9c6997f28ea7cee76a39465d5734cfb96797516fb59b3b21a3a6744f7bdce2e7193cd07aa4ecd586d3b6696b8f4dbfc7e055dd86994754d098c567b3b5c8d07374d11dc3da1f00322ef2589bfb6e338fc6bb7cdce048c94d5c58b00faa6b1e092ee373d989a44ab2d2d96532b87c4953d3679af688fb467e92b33979a89e289f9bea9f681f285b67782f782eed75438f95c0c194043a786642668efd2869274fe50924f91584f2453fef1de6b85c746795cce3fa53b2cb85c3b0efd42e664f6798510b174484ec9cdf00d4fedbbcee048e2b507aaa3ff002f4fc8751ed1a86a5a1ff972be93e0854ea8a36863c1f3f2f8323aa3bb6b9fd934666ea50550ab07081289e8a8dc71fb468f80f9d0232046e335f8d3be6e3a15b2a7dd585adaa2044b4a91967a9808104b44e67409baaf97e086f9475f55ed0cf647cc2e12de0754756c0e397fa2acf24c72dca6ee1d4819fa5edd1fe49bf37e958ce5a7d168e7c7237b8e66fe10b0a192e1170e2b0a84ecdc5617774fd15463c93d03f44e6c9261ff00f6ad9bb831ff0045b37f74a3cbaab37fcad3fd237ead5652617bce4abbf6959f523b46516626cf1455361d4ad486f1718404003e30ee4ab454198430998584f35636fda669b419b4ca427435aa770b5b8c659a984eb6511c67c97bf0fe9fee85b7f27ee995d8eeadd9544eec91c9db8ced7507b43c97a29e417479a88f817688d56046d2de4b6ed5b50b69e0b1046ed7246b302cdef6bb866b0ff32b209a81c8a3f1053b8ab6e74187f30fe1179cf9725a08555b050129b4a78a6d8f9a34b0d41064753305472d2ee050ff0025848ce0f9a6e5d474638cdd2a54952507bb9952799fadd9a8503975764ff956796ffb55adf770ee21d97aa0b56a2c8cb8a6cb5b84ea73567ad4ecf696d47b647878aa7ed3b354d091e68381d0fc7da2d187208b9ce544c3aea138c2608cc809cec46ee17d7aeca599d782ab687d53d2d392952839512a9ba5bd554d42ce5f3a217b751d43b56acfa402e9e5078e6848d570eb0bc046a2daac414a358d5a91f2855df3530c69c561f342a06f05ef34f9bbe8bdee97e7fd93ad9ddfdc236da9c82f7872a6f2e1984eacf04e12a9e6d9589c3471faadad5ef94db4444c2a7690e110a7e20a76aad19d97e9fca2fcb577f175412d4c191583a3a2a6cc74c82744fa70cd065cbaee1be10f87b1ff00cb33cb7fda14f1d92a65a663d2e0e0a8e0264373e6ad47675278958b354ea4381564b574474842041197c51beb5580613cc94ca552a76584aa762b477152b055f99c152b160338e7d1384a2d2376daf26a91cb702a4559ea4f555740bfd10eadfa7aa7346206140cf24036221088eadc539b929ba555ad0c239ab2e6f77a27fdfbbf514e728250a4b64d4d634234dab64392886e49ed547b251ba853a6ea72580994da6d6f65bf1253f55573b13bc8ff00211b8890a70ba162cb5546be1c4ab5569a7971dd8dc7340e398d7acc26262e3fe5bb374f5f621f620cfcb11d43ec3647ccd16fa2a948d2a8e63b569854ebecdb035fe13d8daf48c76bf9509aacd51ac7e8a83b2d7ac240eb8dcf3927073cc342b3fb3e9eb50c9fd9369528c9606f2dcad5834b422f689dcb4fdf54f3dc0a938095639350f5553b29bc10dc6e837ddd97279c9a5626f3083821cbaa2b8aa9a2e28958a13463712740ac7abbd154caabff00515e6839630b68b68b6a98fe68d6cf258e534c4dec7962355a759faac2d9963b3f141d884fc3955355ad8eb793bf846fafa82a5537c0ecb537324eef0424980882385c7b33decbe89a3f8280dc2dc38bf542009309ac9a6e772282c246b03cd370f9f34d0204b4f675e49cf68ec8f54e7c9640ff00728f69de67e16c1f71d4fb45ed7da9e59e03d551b377be8acd4dad6056df67d2b4309000a9c1c882d241198d53755657cc47009bd5900f5c6e7c9309ac6d305c53ebbab3c4f6783536996e6c223e89950f4703dc3169e6acd55ee25af3985215476113e2ad79e7e883839a41e5fecaa79d319f04157ac293278f0449249371b8266be0acb2da991cbaa7f64a670f35c4ee33b03a868742e92e9725ff004f54e4155373d3cf4135c3633e05593b4ef255f2af53cd13bd2a50b800994dae72ad4c32233523baba3e2a9d4c26439020891f0c555d551ce9d46ffbd14e43caf2fc53cb82c0ee4994aabb46e8a97606f09d39a82443465cd72cd3412d737d426ea7c8ff000853790dcb55b3233c8f87826097040e175339483980863880d9874e88ed099c3c2100f1f2e59e5e8a08f0dc2a9fde33f50be39fc1fb3fee7d7a8b7da4b46c987a47f654e9b7193c1b9054755673881f053d28f05ed6a382d93c1ed94dc9589e064729548c8077c900493b92a7ad37466ada6289ba8171e3213ba0cd38ac7d2c5c4091e2131cd700e0abfdd3871e0a43e926d3d08cc7f926f472f14d392b4d36be9990491a423744a6d091388792d9b4009ac6f11eaacb4e0cce5d5b78a776b72969f0bc542ac2ea8a539a1ba1541e18f9f0559f8ea175e7785c15155ee8f10b0b8705657c82df862aa1cd598e6479288cb95ce7f01759aa378fd511d13e21674c96ce6855779a6bc1dc048d1125da926e69eee66211153e681fb2c2d8cdff00452c1a077d562e4d6ac6fef2d75bc39c389449285f4bef1be699d93fa7e17d9df747cfa8b4d526b5677104c7f09a30b5ad0acc3973cd52182a541cd3276ed1ca9af6db7eca93f93e3ea9aace0cc8567390f2ea0003209ce03555fda7469e43a47c13fda968272c23f75fda56bef8fa267b5ab0ed06b951f6851aa391f142b533f38ea8df6efbaba93b09d63f854dc2ad32d3c420f931f335cb41d1fa233d093aeaa93dac6b9a5c13ab59f0818c648566970e98c82a5184414660c6aad346ab1d2fe29a0b8e48bc37b289275b838aa3687d3e3e8a8da1b5078f543b4e1e68f0f2dca3c7e162eac8aada294e3d58b82a43455f5b9ca739192a4fc2f07e0254a95896258d624f2a918c5e8ab18ab57f5945d2805867359cea857a83c96ae71f15966b8fff002854cff2ac4dd26f11c42c5c9adfe56d2a1f98ddaee46480277dbafa1432f8485ecefbb779ee1bce85769d3de3750385c1c13ea52185d893487542ff00085ed670f740273da20de4acc2078aa20f1d7a8a8fc2d255aed951ee22602952a50129a61c866c542d3518fc2e392ff73baea87e56ac75076983cee37dbbeebd6e6982acaf6f04e6e1afe66556b5b1938732aa5a5efd4ada1e6b1a0f4d7c1e5e4a95bab378e2f34cb559ebc35f91e455baa31a364c00734f6969cca940dd2a9552c20854aa8a8c0e1d4ff7cbe56ee52ed757c7aca89daaadd944f582e0849d0aab71d6fa0fc54c787c04a95894ee37e6fd2ad27ed9fe771e8998cbf647fd92b871fe021fef29444176bc382cff0037d613f2cd01a0f25c3d257ff2b6842655600e9d782611d2cf82d9f37b47ee8e5a154f3c3a78a0ce8833ff00c26b5a4b4630860e983e88d77fca616d1f92776587cfe146f4af67765fe77b8c041d2e42e2601255205cf7ba3a3c139ed03a4136db83165e49f6d38411aa7db2d0fc8d431c964a998132acb5da5e01c93190323d47b52a9a747f52277039665599dd1213a3087f2565ac769b3e10aadb2ad3b43c402c0553736ab4161f428b5c0c61568b6b694b625dc91b6d7ef4792f7aae7fbd28577f329b6aa8de01cd54ed549f90d7927d46304b9c02af5e83d87a49b08b0ce8a83a1c15aed588e16f05894dd28141040cea8384f4bea9f4665e5f92ca7237ca0acb54b65bcf34d3bdd28e0ba5e09ec838e53bfcf729f6c7c3d4d13fb4abf6171be3a90834a0d29ad7b73c4ab34ce65111b9677915078fc3b78fe92ad3f7ce5f27aaef794e4a9bb3ff0035c73ffdcb3238ff000152b39aef6b1b864cf140c3a7a29f11c3ea874962ff007e4bfd10cf2537098170711753700f6bb91dc9c87af57c3aa17131aa369a3cd0aacc38b826b9aed0ddecef9fcefadd84db4d36bc6699518fecbaeb6dbe769429364e84a619644410abb71b08e29cc32b039105009c4e4a81e927daad34e88d9b86699ed6aa3b4e547da38bb4df50819ddf6cd497b19c84a3bb3a263c17363d546ade0559e410efc853a956a525ec25bc5c9b55d48b6338cdbe4ad9ed079185af398ba6e03c56435444792702f13a9b987456678712c3aab45334dc32f544eeb5624c822139881c90798ed442a85a5e70e9b8132442a26593c77ba5c82e9782aa4c440cd1d0fa6e3751f0ef553b4ad472685c6e9ea61421e680f12b0b399faaa8de44fd53fcee107528ab37df37e04ef33b4ad5f7be8a2699d17061cf9261cf8a04780fdcae398ffb93ce591fa04e21c416b1cde88e139aabfefa30a1677939208d75b609b51a5012b0381d11046a2e174fc2053024aaf5cd43f954aa4e8f54d25afd5527626af676afbedcfc3463894f6b874907b8765c421ed0b5011b42a88c34e789cd3ed4076755ef151c2312da21579a0e6bd3a9c15855010e55bb2bde29bacd529bc44e9e6a939ac338d50f68319c7a3c951b552aba1cf96e7b61b15da79b3f84774d57d47623ca3d026129c0e0a47c130741cee4e4cda1007cb09ce7d3e8d46c39bc1137839a61404a0d1d364aa4e330ab528cf9ac0531c5aff19568b4baa800c648eef181aa164b41d1bfba752a940b43a33e4b3735692b878c228205009ad4c6194ca8ca7da7842d7439af7ba3cd0b5d14d7b5dd920ee55eca1fff00543e29fa2abda569cdfe88ea82086fcdc0a908399e3f441cc20647e89e58381fa2710b8dde0aca3a67cbe1e9f6dbe6ad7f7ee4cec7fae8b4a7c7b482a5a1d7d137b5c07ee9e0969ed69c4c23ce1bf5473ffed61581605b30b0058428442634e1c936a86801c082becded07308d3761c4d2de5ba7e045c157aee7b7f29303c53816dcd3985f395b4d98a5fbaf64d479acd33accdfed0feefd55107bb215a3d921c3151307ba9f42a537439b055a6a47d98f544a0e828e6254aa602d5a653734e38080aa5568a5139ac7c9622b3e0a9d4a8c3a1567f6968d77d535c1c245ded4a98ed4ff00cb920d472277021a858a433905b696d360d264aa0e733c8e615baa6d2d151de3fc26b1efecb09f24fb2d6633196e5c48ce2e0e841e553a8651ed0701e68e554c273f4073053fa3926c13da4f39ef58e8369092d97e1cff00d150a6ecdc78ab6d3ab5aab7662401aaa630c899f24fed1e0b8f904504021806ae1e88d6e4216d1c75715896258907ac7c932db506a66fa9d8299a3775bd91f0cfd155eda774aa9f329dadc37a37021278267915270f60aa872391fa270bb826e8559864ef803bd1926f6879ab67fccd5f354f4e0aae9c35e170ecf1f554e71653e8b0f80fe57bb5a3a2366ed34c32b090483323c37cdd673d22139ad76a9a21a13c7fc2bfd3e0e3705d5722187e44f7177f92884130f4d5a580343b8725ec40ddbb9d8b3c390bea33104181374550b69b6ae2cc005d9a2e2733c6f61cd3b5402da188538e84f1075553200928994dd1068d1388d163704dacd3da0ac16c631fb371c9da1532bda4dc36babe39a230ef3053c279f0546764de7098f60a8dc5de556bd5a78a963900e50bb6f6b7998552bd4a3686b299c2d1109b50d5d1a24c8747cc15aac341f4de28d3189bc7c556b3d5a261ec8e57054661629ac5567e68be591c934c37247729d1acfecb0aa161735fd3198cfc935f468530fa86257bfd9a2013f446df65c394ca69064e89f9b8a688a46a73740f459124a68fa2c79405894a952a54a0570dc3d92a9e9ea13bb47729f6075efb5d999ad56a16eb21fef4236fb20fef42fed0b29318d32ad27f61e0deed15a3a327c1501da3e09faa085e778209a5dc903526602fb52346fd53f6b07b1ff72793c915c2ea3d8f5f803bd0b472b57fcc3fcd4f2554cc5c08f04ced2f6551b3d43531b01736084000bda54f676da9f9ba5be6ea620e25884769a8145fff000cff004bb87c35a6bb9b0c6f1bc994103051b4199e311e4a917b4626eadec954ded7b1ae699045f0885ed268164ae7f2ad948e8ba4f24646b7028a1a2720d86cb7d5567e27dc0a050213dc0e88266abd9f5f1d3c24e617b6689c6cabc220a723b980e1954c30ea61599f14987c60a76c9eca8ce2339f14e2a9d3c6f0263c50b37425ee98d0c2652ad4e4c397bd52a621d57d17b42d94eb8a4c668ce374269c2d2534c02538caa54cd431309f4b65aeb7d1a2eaa790e2532cf4a909024f329b6d145b26a0cf80d57f6963c8d3c23eaad96aa1ee318c3cbb454dc43c109d849e5fc2a60c767f74e99740f255f08c0c198608f5e2801c7445fe0a54a952a54a94d41cb2dc19624fed6e51ecf5752dd458708e91f04eb6b5a097611eaaafb5aafcb0aada6ad53d3792b12c65622b120f8cc267b4ad4c1db9f343db168e218533daf41c3a6d2d3f556ab451a8de83c195447d9cf32aaf68a17051bd95c106e880cf8ad91c1388a34ce119b93c04449be97ddb7e1827f6cab7370d7f3682815aac3173067392b15a7615db50825b04155bdb2e8fb3601e2eff00e156af56bb83aa3898d3281bf08377313a224c5f17648fc13d8cc9e7e5dd08b4899e0617b268d0aae2d73714734d6b5a21a001bb6eb6528a9440c64e47904d7603e4b6389b889f45598c6e08e3c2e2989e10a9d139eb70b8724e7217521255179a65370da681055a3d95686925a310f04f690608cefb335a5c0156fa659038112842b053654a0f0ee6ab591f4462d5bcee6ecd94b1c70cd59874d84831e2ad15a9bed0da47b4392f6b3688653cbed4f1f0f1ba0aa6cc4ab1d183d513c1005c400a8d1d98c3a9d55a9f352395f66afb1766247255ad6e7e88c94090aa86f45cd1aa0854cc2da11a2a4d2e7b42b5b7a73cd12a77e50720e3281dc8e9b823f2f96e51f9ba9af59b49988fa27fb4a490f98f04eac7382b129be6f9ba6fa35c8107d155cdc50d6e054a8df0842686f109bb21a808ecb0e81380e48de0401f0c155edab651152ced7716847229b7162a733ffc2f3fdcacf4cfd023daff0073d7cf5b080dc08dcf1f66ff00d250ff002dcb1d9dd51f384e45566e559d1ad6c3f45ec9c4c0fa9878a1a6e5a4b850aa5bae030b6b65a43ec69d473b9bf41e28f1cd0aaf1a14493addc10947128cb75da0417154e30ac7d1565b51a6f4daec7090bda19daeb1f150a107b9ba15b673da71bdc4a02558ce0654f3556aed2ccf6f82981e29cf71c89d1597da8d696ed99a0890b1ed6b39ef39b9d32ad26a17f4de5d035402634a7d4c23239ae12b038aa39556ca0d38de4f3cbc95620d47473bc094e11945c02730c4c286dcdc50984b73551c4e64a277c5d281841e771df7a8f606e51ed753ed0b66daa437b2d45d37cf57888d1639d6e952a50a842c4376502135e3c563f072a350c1fb371fa22f383eedde69ef9e0e46e1afc3855bb49fff002cef2722c694f1854a061353750ad5961f3e250f4f4f83118731b992010a550ff76efa2f77adfd372165afdc5ee95fba3eabdcab7e5faaf72a9c5ec0bdd1bc6d0d5eef438d75b1b277dc50a365eebcfd50a547fa0ffa2b63994acef2da2039340c0fe7900a142a63c9596d62882cc275d655a2afd93da064fad8d58ed6eb387e10d749e2bfb62d7f907a2fed4b59fef3f65eff006a3fdeb9582d155f6a687547105a57b4dc0501272273f155f6bb2da16e161303c51c9aedc0d940042893c55563b1610ccfc13811a8bc2d4dcd6e241d1fe6acd601568838c89568f6554a6dc54dd8f9f04db4da00c2c95b0aa787d50b2bb9846c9f9c234238a0c6e6a15841da6027b4d9c96c6bb7577ecaad9265f4dfe88ac906740ba562c44625180a0e661958a4e69a5a163266344da94da3c5536e18215aec244be9fa841a50a656079d13688f99e07aa14a80f9820297796cbbaf6a36477cad1f55b02df91670a15428efcac2e8c4065714ddcabdb5f2bbcf729f6c751ed0abb3a047129dd64dc11bcee83ba13536552d0e49c7a29ce09d502da26d420caf7ca9f9553b6348e904ca8c7e87e12555e0809a4e1e7fc20aaf67d6e0553ed267355347131fca652ab5331a0fe7a883c96caa1f91df45b0affd32bddabf717bada390faaf73adf957b93f8bda17ba378d76af77b3f1b42d958ffaae5b3b1f371582cbfd279faac147ff000ce585bc2c8a1fff008667ecb6951bfd16faaf787ff5a9af78ff00cf1f45ef0cfeb1ff00b57bcd3efd5fd82f7b672a87fea46d43fa5f572f79ff00caa7fbaf7aa9c99ff6af7badde1f40bdeed3fd57235eb9fef5ff00f7145c4ea4aabd94d6f82d9bf92144f129b419c5329d21f2a750a150444722b66ea7d12161ca4190b340af673bfe328faff09f4e9d48c6d060f15edaaa4db1ac3d96b72f54e2dc378b98c93aa34dcc200f3542b6276620b55b834d89cf2013200378bb2217c9a7aaa54ead7a8703655968e0a4c67246a6c83aa5576413087572e8d492b8df50494ec96751d90563a0fa45f3da5b269a785ce22739409333a8c9caafde3bcee638b338528ba4045d37b74bacf687b7a3af25eff5658472cfc5132f2e8024e811705896244a6d4c28567f3884cb43c94ca98f229fcd9f441fcd104f8a7b4a8cb7e8546b0104aaa29e191709dcac344df9bc8217b7b43cfa8f6833a2ea8780e8f8276bd5475113b995c32dc09b2ba5cd33141e97ecabbfa03a473551fa0054a958ae69cb558a0e4e542d60f45ff54481aaa95035b2bdf806f33c93edb5ce863c96d1fae33f54cb5d76fcff005546dad7e4f1079f581551d154ded1912850addc2bddea1d5a8d2a61c042a74a94e617ba5134e4531392163a1fd30ad165a0ca78b00d78aaec028e4000dcf25b2b3f7cac167f13f558287f4ddf45829ffe1dcb663ff0bfc2c0fe1666fd545a7b8c0b0dab9b16ced1fd56fd16c1ff00d6fd96c3ff0035cbdd9bdf7fd57bb52f1faaf76a1dc5b0a3fd30b654fb83e8b033ba100068376be55aafeaeb0e489f04d7419dd6b95a3814d7c13e2a46b1e6a9fb36c6f635edc44113aaa561a14de1cd6e6174b995ed67e2b754cf481761cae00a19a13c10a80664e6ac2e6161c86b9faaf69d5a22cdb1191c41c06e8588c42f6439ad7d593c91aaca34f1bcc355aed26d159cecf0fca134f482d45e55412e2a93994b992a85b29032e94fae5c768c74b0aad6ba4c32dcddc7927664a0b684b6324da639a6d26466b62c8c97bbb3218ba48d2c27323ea85271ce5bf545d253066b208b94a9b89cd02a55331255374f0c9068554612a4a995532dd952a9bdfc215613074584b7509bb957b099a8f23d67b62b1354338008ee8e286e4dd08a8dc623e4a2f845042e6a685ea3ea839bde1f5568a83b239ef00b3433567adf6471fcaab552ee3e8b28dc0a95a6a52e32de49af6bd98dba29074ea4220109d667139142855ef8fa2f7777f54fd16a818565e9d9dbe197d10f258410411aab334ec303b320b81500700b2eaa54df3b82e055abfe62a79a82782659abd412c61217b8da7bbfbafecfb471809becbacef9dabfb2ea8f982fecca9fecafecf772fdd7b981cbeabdd87702af529b7a2c0df128b94cdccec8dd3d26908a95637da1cc2da6f3978ac16b3ad5ff00de859ad0ef9a7d6557186b546f27154e3189d16d7a25b85a27926b7904e63da3a4214c2a0e6ce69d05e405ef069bf034c0233557b46e631cfd152b351c43193fc277b3aca0004113c4155bd9d5a9e6de98f0584c19c958283708a99932534b9c00f1d57b62cc1982b346b93971549d2114fb413d9c96d1dcca954e9e22a4f358f2d4ac74dcd87342af836870e882a45af683b20530598fc83e8bdda8f71a9d656f00b6185d31fb27b69924e033e2b6d801fb3669cae8c3e6a54ef0529af988549d96b2aad2c43c941191bbb413c41de6a7bf10010a8d80165b8fec3953f97cd7cc771bd91bf6f738daab4f7b781ba32ba2e0d43285938a378d776561330aa510d6cee06a6b7c1318234556367fc27ba4ef464a108984e8846e2df1bc5dec677dabd9cdaa81805bc8f54ddc788a8f1e37580ffc3cf371426ea67b7fad1d4f512a54f596cff9877a2a3f76d5ef2e6d4c33079a1ed1afe0bdfed3e1f45ef75c9d42dadaf865f40a6d47e73f5586bf7bf75b2ae7e6fe57bbbcfcff00b156966cea91b948f405d2a6e955727940ab38732498008e2b694c71fa26daf66669833cd1634924c927894c6b310074429526f0fadd5ea62778237329bb0b9e7409c713a5004e49967ef66837c7d0210382a76a222536a5378d156a2ca83404f8a6e2a796c481e19aa5587063c9e2215a6d38a9be81a644f339fa23663f219f0d0a651aacd69956879c3879dedd5332b8a1139aacdc350854e310ca558b663681bde55e88ed3551a9220a714e7a71253f4519f522e05309cb3f454ea0d02b4b3e61ea503299aab552fb30f1eb78d51d6fa660a7c1d14a67b42b0d5ffb2a5ed703b63e887b5ecbf990f69591df3aa769647473cd54b543ba4c2d94d7137d3ec0dff69ffced5ea0bba2829d542d10703942238a8ba14c2127328e42e1c93045713cd6c8b2a37882ad5f2e792c4cef2c4ce6854a5e2b6d4f915ef0cee942d5f956d8d49187f74778725108894e9bf82685cd404e192f6662168c43834a15034bbc494da988e97cef36e9bad2d8783de5871180a9c35ad68d020aa630d90e54b231c91df952a54df2a77b95d6eff98ffa42b39ff45036aecb83553fba6795d9e889c8f92da659032b6f4c76a9b879ff00f0a9da8b71607083c8adb621da3fcab574aac92a29f34033920d629589620b105230cf8ac6162693d2083b50a7738a19e5c0e8aad4c2dc289baced68389eab39afa65a17bb4005c754ca587b34cf9a14aaf24283bc136cfccad83147259afb45b5a815aad4c7b0b4d2c479f2542bf4b03fd1dfea9aee7ffd27b1aeed3414eb1503f2c792af4b6555cc5444b93bb46f7a76a5506cbdb0e83c17b3ddd37b78cae0bb350a7393ae7688dd4e854a9a357b955f046996ba1d92391df046aa912e55c3764a884ca656cc3985a554661716dc3743b2537ca94caef66853abbde7a4e257bcd427b456d38c9942d9681fdebbeaa9fb56d6cf9811e21593da146d023b2feeef7b44cdb6bf9f53c145c3c571530a75bc092a53198ce68e461535ad613ceeb44163679ad98894c6b5da050d585aaa533add4bb5e85541bd2a500aa8c82d9cd32e1a8d50b8052dc3e283c20559bece83b9bf45558e18fc0ab2d3e8629f528e8a6f1b8372b371533e19a69cd5325355a72a8d3f9552df9537ca953be172f5417b47ef9bfa159dd153cd67b574f73fcd37b3ea7f94572f447fd6e7d40dd734eacccc6009b573c8668bde756cfa20f3ddfd949e4a54a952a535d93c7aa944a260a99cf769d4e8788d1163dc64ad8b78950d6e8a533a4f6854e8b9d9ad9c2c29ad50b2528909ce31923984fb3e255a8e1542a63a788eadc9fe49875075177b469fddbfd159c67289e91ba53b4ba9b49c479095ecf386b8f14e7414fcdc8944a9453f5546948c47d106b8b0163b34ead51afcc66a69da1b84eaaad32c305004e8136838eb904ca5440eccf9a6d8acb56917416aab4cd37969be91cf5550b76255005c553d162e84ab5fde4f5e0ee35d041061587daaec429d7397077faeefb4845b6bf9ef0bf250821c9144668e8104e54a9eae3d902ea4d8129ddb3e6a98c943792c4abfc9ea878a3d17cb516e21d1f3404423e08d10e0831cc7b27494f1d1f2de84d09a157e03905673f793a603ba13699243552a0c650c7c7161f2568c22a81c1398dc5d1434dc17843702a8dc1508e0a89309a79ab4f6a9faa61dd953d7ff00aa0bda7dba47c0a1ecdb41e2cfaa70fb4f423e8871fd46ff00fe505683d9f54fed2a733922fa9aafb439c293de52b1ac6563588a6b882b359a7eaa99e0b4bc2da2c4a54dd65fbcf4549d54002724c391de85170569a38992a83f655f3d0e450e83bcb2f4e08ab609b3bbc3354b26ca1714eb985f85d0158befdaaaea8b913713739523f66d5efc47c9fbaab6b1540964426bf3c8aaafc6cfdd527cb62e1d95637b76351a7cd7b498d6b29f39cbcafa7139aa8efb0392a1c2ea8ee82aee9c3923bc101d4059de17b2adb3f60f3fa4ee7b40cdaeb1fcdbc1046ee1710a744e44a392e4ad12d6d3a7e19a39203a03c93426a714c2abba5ad1f302b350e586a2d95542cb5627213e28585d13b667ee9d44b0e79aaef87b80d2f1b8d4dd42adf7ae43a346a3b9e57e25329a3a413a9818610abf67b3c5c6726c956a69c21d0ecb9aa6572df086eda7b63f4aa7200d20a69e623cd57d69f914dd254a95289ba7afff005415bffb93fa930f45be4154fbd77ea72ff7fb5d9c2e2a0ab43c63c2346e4899547b5e880e050635fcd1a0b66392c0b02c01600b005802c013e64ca1aa91c5485286f593b64f26a041410ea00518842b6d1d9bd31db4a2c7786129871301559b8a9541f94a69fb34dbdacc89213bb4552a98272d42b38fb5679aa88a22f29ca8be2427d3153369cd10418377caa98804a0461f14ccdae5672d60aaf7f670ab4da1d59f88fa0e57b555ca942a51d14e3d02b1f055074414551b3d4add94ef669a74dcf754d380445e134f54d2a5bca14a048320e7c1592d02d141afe3c7ceff006d510caed70f9ba93a2e08dc75cd172a431984e6e0739ae2aced9aad3c95a696d19976868b620d2078a0745f31f3508e27bcf2595266b9ae2879ae3aa9f12b194daae1c562fcc53b32aaf68ef04d545a66557a607d65547cb434682f0106194db31c9c4c29980aabded618714ea0fe886b1ce96e67cd3e9d4b3d5c2f6c714336232141898b85e10ddb409683c8aa2e707168120fcbcd52708e8e21fbaad9b587c570f821b815bbeee99fcca8fdd53fd2156fbe77eb46a86988e03f85b71ddfdd7bc1e416dcf87d13deec2e70d51ba964ff0045f30546e3b2e2e58d9cd6d18b6ac5b662db3792f781c97bc780552ae3d6eadf21fca2e94c0ec0f3c0c6f59be7fd29b29af72151078523721428417b4a8cb71ab099152973d159ccb0f9dd193c7229b7e3c4d2d4fc9c531d84e89b18e60c4ca7427e451461129c553189c8d269d16689c5da4ea71a2193734d0ee48264e815a6d18ba0d3d11fbee3066aa9392a6658422f7294f734d34da3de95462853cb57688557640ab7d2630b30b6244c758d4ed57040959eab164bd91562b16e2c9dc2ff006c59cd5b3870d5867a89b815c1175f64185ae77255438b8b9dc559ce62ea99219b90655e34dff4586a771df44601551d262e0564a100535a9ad4fd11128b4851b8d6a6313040568719f0bb60f39812a959c7cc151b2d2766583c91b2d06c741bf44db1b2b34e780f04683a9bcb5e73f04e634882d9f54d2e630325f1e6ad4c18310d415677f054db53568476bc40f5c9134f8d4a610602241944e7d11e4821bd573a6e59ea152aed71cc16bbf629ff00747e1c2b58fb11e0e0a85771a6d80154fbcffa955ed7a0ba465d1f3f140fda48a63f4a77ddb910a15379391faa3da0a921aa7768f9a3a9bf61f9c2d8b3be7e8b67479b9451e47eaa28f25f67dd45c0c64a47742064c42774a9ef59be7fd05028140a0828dc08209f4f1b1cde6a9cd1b58079c2a5d1af5dbea8a78fb5ade04a6de53c21aaa32f706a7a20b9c9e8a714552c9db9945cd24f14ec6cf9653abd422341e1b8151d53fa4f39a3941d084f7673751d960cc4ba72f04ce91cf4539cc6699569325cfe0ab54dbd42f7396cbc56028051bed692b40b8a29a54c88ba99870565adb6a21dc78dc608cd566e0aaf6f271eaa516e5705641d1f35568b5c151a65af940aaced42b2513f787d162cb8cf82cf9a2675129d63b23f5a23d32553d914cfddd423c0e6abd9aad03d36faf052b13902ff001589c854748cca39b26e342b1d29b97bb57eefeeaad2c11704c4c413296d36ce73c86b725b3a5a606191ca151a7c82750601d3f354f3cc030bec8f6a553703906c0f35558cc9cef212b3886d1c5d28d734fa3820e53e4ab59eab9af0cc3808e59aa6e8298fa71d30e2390742fb1f96c43d50af5876194989cfacf3d27a13cee09a710046eea08f0ba939da15fdd9dd3d54ef0b822dc4d2154abb1189a7b5c132a1a8c63ceb3fe6ab7687e9ff003bb178e8b33cd1fbb77926900e69ed6f04ded23da0a9c2d5e072d5178c47cd1d4dc049011d4f50c3d24c3aa3aeed9f57fe828140a09a5350dc082082f6b52c155b5471fe54fdbd1777e9a2ad262d15bc50be9364c15ee745dcd0b0d9811d05803746809f24c2c18422253da9d7b438e88631ab82940e69f91050cd537427d0a757319155683e9ea3d6f69ca134c3724c07e8b127a954b44cecaa6c04a7c37882a99cfa5a7155ecf41d49cfa79108462cd1a4d3a2823780549b92ae21e885a284d9d513298257b2276153f55d697e817b459f681dcc6f8dc19a215312e4d643dbc804e370299403dd8dfa700b1040df24a09cd654696bda083c15b2c4da1532ecbb4418d5842859058935eee10b68ff000566787620ea527c156c150612c10151b2594eb4826d8ec7fd062166b27fe1d9f45ee5653fdd01e4aa7b3bfa6ef42aae36b3641b0ec79a7d36401305992b2fdd1f079cd557ed1f86602185ad01ba2a8780d78aa549cd1feaab5525d85baf12accd1499e250fb4a9879141b85c615a6ca2b87398d02a0fdc2a44b4969c884fb4bdae2095ef4ee69b59d2251b86f039a884c6c8cd43b0c786e1eae3a809aaab03ad14c3b491fcab5536527616360647f755fe5ff00aae23a0d3881f0e2116b7181b49194ba11021e01919e69d70c1b518663c53f54c3966ad3560611a9fe2f84c6f49be68ba0ad93bc11a642c0b02c214c68a79a91c936a414fd77696a7f494db826a6a1b8104105ed0a5b5b2bf98cd5274d1b2bb93f0fd5395aff00e66a79a085ccd54c2614fd1319c55541551d128dec32d09daa71ce1618088c4c2a9ba324d4c6e2ecf687ee9ae9384f3cc1552c542a32ae16e1a8c44200ac5c9521d1c5c13ca75d4f8a04a05dcd3049d13a7455abb594cd36e64ebe17530c2dcd1a53e378bd82484c109d44d4cd1e8b978a9942eb1d96a5a1c43232d559e8368520c08a774eac2b750662c246442af44d27969ea80c915646cbc2e1a2714131a5c74d35bb0a17e30b6a16ddbc4ab6d6a3558d00cb8141aa13b240282b305537f782a4e2d923291084261681e89ae1cce7a21598004da927b2507ab4d2db06399da6956aa76b05ce3472e6334cb4bd8d86c6a8d67e226536d751b1a216aa81c5d9495fda36988c7fb216aaa0921d9a36cb41fef5c85a2a8d2a387aadb553fde3fea5071919ab451747bc0ffabfd55a9b907fa1bb9144898b86fbfb6ef354aac0cc71d57ca7e105c2e6eaad39566ffbe2bda1daff00a17bb3ed00e02de8bb8f8a1ecbabfd562fecae75ff00f6a1ecba71f7affa0568a0da4486cf62734ed2e7ec0d71b10e0dfcc9e99a14771a0cb4f8a7aa662ec1cbe9c15474e8a4ac2edc6eed3d7d1334b826a086e041041448859b28da1bfd3aa0a39ab57fccd5f34d42ea1088c4324d98533aa1a2aadc9030556d13b5b89549dc13f4549a7b453b9260caea7548807454dee690557687b5b59bafcc15aed781ce6b3523a46e954935b1d93afca9cc77285eeb5dc2430c2f762074b54da0cc200ed20d3c9138755ef51a029d5ea1e31e57054448d5069e7bd41b2e9ba96295691159fe7705177b12369579e1b9fa2a23ed55bdbd972b4d11559e3c0a734b49077e2ea69d67e4994aa8392a65edd4ca719375903e9d32708cf894f7d207a399fd95369225da735829f372af55b47b53074308db699d253abce80a356a1473d772a7693500b0cd430a9d10dd7329ad4320ee6534626007484e7e1e8b3554e9c6aa517700a9f442739dce027596856edb33e7c555f647f4aafa3956b3d6a3f78c23c785d85e74695b27f1809b4878b96de9b7214939a714e8d7688d9daca05d9ce4a9455b361232221546612fa4ed381b854746aa8576d56e0776ae1bf53b6e54758e08767ad71cbab6eaadddbfaab7fcbfa0ab01ceb7fd37856ffbcfff005a76973aa35f5585b4c3341013d52d11e2a0a850a931c731ea9e9975570e8b495ff4ca25a1b9053b835dda7afa261b826a6a1b810410bad03fe26dace6d27fcd30cd3a67f2856aff0099abfa936e08109873c9345c1ce844c855189c72554438a37d371738353ba2040f254e997fd5568a545dcf4bd968a8c10bde6b707c7929e6895283a0adabdf901010a0fd997954ab48c2ed79a9631b8792cc9955417b3134991a8e7bd44ce49b4e7476f51ecdc0156ca785d8f9dc105aaf63655df96add6e3a26746b156b6cd12b56ab4598558330555a4fa6e870ea29ea98772961c52ed027547d53e09ac6b44bb4fe563868711e43920c7e12f7ba072549cda8c32d556c2c39b32f0e0ab30d3ed0846ab56327469586a9e0850a878af778049795c5302098de9bd3426b78ac2a72809a214dcd0a77068aa58283bb2301f056aa15e81fb47183a1081fce7c82c4e3c3f92b154f4e4a01184b724da1d0735dc468ac6fc34e9bb8466adce02b37c5a9fdb779dd4fb4acee2e6b8939cf5157ef0aa47a7e899d6cdf39a9dc08269c905ed01d33ff0052b5674a89e6dff25ecfedbbf4050a2eb7fde53fd0558e832bda0537cc41d10f6458793beaad965f67d9a8c8a4319c9b9a206200a623f3264101160e6b0a697372053d32ec9046a37ba9cfcf40b1ac4a77a9fcdfa4a620826a6a1ba10410569fff0026e1cf2fa8543ee69f865f456a1ff1357f5265d920e0a9800268244cdd28bbc54b7bc13834f156c668e1b94dd85c0a6d5a4fc2091926d560ec0f256ba9d2c1ddfe774de02643555b4b9c72d020dc4c63871088319ddd87b6156c3b4761d277696a9ae83ba151726a055a3a545d7b28d47e8d2553b05a08fbb560b3be8e32f6c725373f2aa13fa4c29b915c4aaed63999a233dd829ac29accd36e286698d2e3017429b0f341c6ad4cf41a2a7444c9568ab8dd1c1518653929d5daec89809f5293dbb3753c4392a7ecca599223c13ec784f43a416cccc109b495ade1a0b02684d0804c1994d680a562e8a1c513af82c59e5c153932534ac4a54e4b10081c90568a5b5a2e6f1e1e68b29c74ad31fb2c7626ff00fc85b7b170e9154f67c9a0f89559c4d4131972549e1b41cc27894e15eb3f161f01e0aab1b4f29975d4bb4acba3fcd0dfaddb4d3042a7a27f6be022ec4102107b02c616d5883d9e2ad8439dea5547ff00c350f4fe1589d85fff00eb5b42792da1e43458ccab6124d13e6ac0ec36b67aa3696c38f00ab567d7ab8ddffd05f38f34dd5386a9ae2d3216d9de0b68792da14f54e08dc3aa7eeb771a7a353f4a620826a61437310e685467782dbd2efaf7aa1de5efd43f37d15a46d6d5b66ba065fb26540cc6359712155a34ea5473cbc89428d11f3396ce87e6faac3439143643e55b51c96d8ada95b42b1958ca7d42d12abda31e434de6d47b7474752240985889bac6eda52637bbaa7c05926e51e2ad96703a6c1e7bac74144ee612a15399410554fd93fc942a165aaf6c8c878ab1d1348e27549f0016d1bc8ada8e456d8774adb0e4555e9c47342ab2332aa0e99e49c9d9b485ee8d27b6536c547f321ecfb31ef7d57f65d9fbcf5fd9543bef5fd934ff00aaefa2fec8e55ff65fd9553faadfa2feceb40ee9f54eb3d6676a995aaa74cb8e4b2a62027f67fe953069792ad570d2f3529cf2eb88c1443b8b8a6e1d9b3699a7566c64f854f6b51e713842ace146997388f0f129ce2f7494c0804153ed26897782a9185c8654e3c536a616f8ae91f54ca770dc9c4ff051880081cd04fb36d2b54fd457ba700d54ecd4e90d017237572f69e898fb4720faa75a840f058470099409e4aa00d647e65643f79e974df2b829557b77523d1055423a2a429528958c2c4b12c48bc2da05b45b4f05b52817735279a952b15d98426e192aff00e68bc1a34c71c9517e0cff0029fe50b47e45b57700d4ea8e9d7280abe28a64aa13ef4d8e655a456f76a93966d40f047b63cd0d53bb4776a7154b40b17797446aa5cef01c93b529fbadd50b3542265abdd1fde6af753df0bddc4118f5f042cf4c7ce56ce9f32b0d252c0b6a16dbc4adb1f15b55b42b685632b1b9632a4de3330335b0adfd277d17bbd7fe995eed5e276477b6cf942aba557ab88f87570b0df4dad3c5557498e014dd440ed66b6cf319a63cbb8274746382a99b42ad4f03c8e1b813336dc1361a24a99402195c106b5dda192a746cfdc0836ecd669ef7370f46e9bde5a049be9c26b506a0105285f52cb46a6adcf984ea5b0f2e6b174954d0fe9289fb4a4abbb40b82267a213402f6b55a0e3701c0235094c6633e083da26340bda2f2eab4da756b7f94d09a10175310b1422f95994da44a6d302e9be514d1250c9a9efc2876917456ac3ff30ab3381c7cd1bed30369fac7ee16d19cd6d99e285ae901d974adb3ea5413f45663d3a88958d637782c7e216d023502da0e49ef6cc9c934b783a552c402b41218c239ada146a1e6b194f3d23e6815390f3370bca859a6050792852398589bde087fbc97a1fa2689e05169e5fb85832ecffee0ab88e5c38a01beead3884ab3c626ce9d24363ccfd17d878fecb1d2e455adcd34db03e6540c5b29feb56c87b5b908e2aa333cd3f54d4fd4eebd53d2ed53aa86e9aa9de6f682a6fe8812b178a93f0366b2beb9e4c1ab964c6e1a6219fcac2de42539a3ba27c952a78478aab876b523bc6ec0fee95b2a9dc29f4ea0a6ee8f05a273fad8445c4a99bd8fc2a263c5330b7c4feca416acc2b53e939a21d9eed1d2e6a7e6c4c7109b70b834c26ce208ba1ab1f4656d3c5071526e92b3e7756d40ba10694cc61026f6a1b8e01c0829ecd9d42d551e9b12df029f9a7984c103c50edae3762c951663c23c55a48368ac477ca19a635009d9029af31926f4b8a14d358b208b90dd84c6ae0ad19d4a238a1a955c45a6d23ff327ea1597b4ff00246fb67f7be4d29c410d86c47ee8ba434611922f90d103254bb6159dd329e7a2b12c4a755894a9551f26392a4e8721696374928da4d46c61680816f308968f982f294438fc8560a9dc3e68b1f24283e1f55eadfaa81fd41f4583f3ff00ed5f67de77eca69fe6534f91faa07937f72891dc0a4771bf446a10728fa2db56ef20fa9cd63773588ac4e52e5533c3e59afeed52ff00fd7f083bc574b9150fe45549c3eab4aedfd415574b1d9a90f184ebc13caa7a276a775ca9dd89d11d40d4283c0ab1d9c3a9567bfe51975185ddd3f45b3a9dc2b6553bab635392d854f05b07736af7677782f75fcdfb2c3406b50ab3d9195f305d838952dc218cc982ee13f4f154db9e2399555e430af79789885ef554e8b15a4f35ff0013c8a79af065ae4fdd1a6f808316c95417b6e0a9519cce8bc93aa61e0bde0f009d68aae6e12ecb96f59cdc324dcd00d8405f4db254e884e5e0ba5c4ac0164117f252a2f7b9b4db89c9d55cf3d82bed390515398fa2d9981f69fb20d3df41a7bffb2c2eeffeca1ddefd90c7de1f4589fe0b1bf90faac7f94a6b81badd4e598f8b7f84e39a72a7531373d46ab572db0c6028e96e51a9b3151c7e56128154d302855eab5b03541ee7f92a6c80b40b6b84f82359b33882f786f797bd81c50b6b78a36d62f7f196abfb4a97f4dca93f1b662155386130cb020715a1cee5fe498bda3d0b59fcec07e992b3d466d22511c4182a4dce6e2aec1de6c2a961c7d9c3e613bba5b0422ec80caea3f7813f36ac0561f2faad9f88584cea21433bc7e8ba1f9af083d0ac5a00cbe8bdedfc153ad55dab8c2c4ee6562f14614a958902b142c4507158d6358962537e774a39923c53995599464a8f0f34196bef1ffb96c6b7177ee859cf309d4708d4277defa855293431e64a7e427c6ea7d94eed6e3481322724e4cde8585607722b0bb91428d49ec1586a468ac45cda75daef9985376587a532a68774ac547fa6b68cfe905b5ffcb6adbbb905b7a9cd6daa735b47f79637f78a977329b4cbbc935a008d13724154a2da8331ea854751a4da7139216c3dd46d18b50bde1a7e6fd959ea9738ab5d49e837d50646a14fa2c94855adf83266bcd54a8fa8e97193b81aa237804d09a1062b5e5514a089be89e82253cc9ea286a8d0a5dc09d63b39e10bdca3b0f4db31f99e9b6661e257ba521cd0b2d271c9c50b1b87648468d41f2df8909e2b09400171206a8da3904e7171cf729be72288e48042503b92a54a39820f1557d9b540e8383bf655439861c082b1b8190bde1f1d9464aa56969003ce7cd0734e841bdf9d1ac3f220985537a7bc3585c89c4ec456270e256d6a77ddf5588f337ca952a56252acd5ba399d55a1dd3842a45227c1526c437ea86abdbade8507f2247d562546def6f45fd21fbadb31ce606f1453bef681fcff00ca731ad31cd7b468c06d4e67a4b17462ea47a6d4eec1bb352562589632b09511781220ad9a6850b0ac2b0a8502f850a3aa764e4c22ad9aa0f99a1503d26feb0b105b41cc2da0e69cf0442adf78aa5690f10554ec2a74f1d37c0cc154f4f54fed6ebb44cb8eab0a8b8269e937cd52b47caefaa3e29ed8d34ba9641dd4c284d6ca196814a050b9c0119e89d6723369909ed3c717d1073b2d4a6542c24a2ff15973589bcd1acd08d7690b634f995b2a5e28d2a4994693b285b0fb62de03344844c9ba161517054db29ad41abda34882d7f0d2e9b8094410a898946a02893d452d50a92b2b8ba5526c2ab532540f494c04face764325d2ca4e49ec3192c9623c174d74d1ad8446a5125c64ee008a3926d54da8a6f9ba374c1d556b0596afc984f30aafb32d2c981887827537b3b4d23cd4219190536d3506b050b58e2d2995984f45cabd3c0fc8744e8821d1e2aa5673f2e17ca6d079a3b5f9651ba56258d622a8d0a954f20aad2d93f0cf056368a8d8f056b0d3829bb370cf1720a9f469f82a221a5c78a62f6b331d85ff00948373750999546f9a72ada7938215740467acab753fb03e60ad937c56c99c8a664f6f9a3d9728be2f394a330a14ac65527e239950a1615856150b0ac392c2792c3e4b02c2b0a80a3c2ec216158516a8551527961f482a9e47e88d00095b05b04ea50c71cf4569ed9f24e6b301cc7653fb0ac0f6376b88f256934cd4059ea9fdadd7683c932e3da4ce28b3928b9bda1e7752af8723a5cea7ddfa2077e142850b2537040a6c1192af51d4ccb745ef2fe051aefe6b6aee6b685625894ef52774daaa8ec9e6d0a142c2835604e62841514c4d4fa4da8c2c76855a2cefa2f83e86fb1512faa0f01aaf68ceda7c1171435ba77e96aa8d5931714cd51727192a9e483a442c202e09a9f469bf509f6678fbb70f54e7db1860b23d135f5a3a4ffa28dc09813d88e99a8588854ea206e01044ac52829589666f3075cd54f67d96a7c91e4ad1ecba94fa54ce31cb8ad9bfba7e8859ab1feeca366aa3fbb29b46bf97aaf76a9de0bdd1ddf0bdcbff0037f646c47854fd97b8bb8d44cf6749e6ab0651b2398797ee8e3e4a1cb0b9358de2b053e49f41c221aac9b51530e1c95bc74d87c17b2fb6078156ba60ecddc8a6fda3c23a4262a8cdad1a94fbcd21612b64feeaee78c27ea5610e30744f6079cb51a2a8fc74aa88821a6e95f3faa3c6f850a02c29cccf541be2830734ea6c95b2a7c9606f0dcc9792c045dca2e0214f92f5bb30a564788422e94514fd2ec4d6f68ea8d4acecdb3074c94da39b97fc4779df54e6548327f755b5f44da32c69c43b3c93bb25589ad73df33a2b4b030b238a7ea8a1a845a1404744c413bb454c3907348c91b86a2fa754b3c9021c2422d94411af57170309b0e6cb7d57487498ad4e0fa523d46e4a953bc4aa5db679a60152931879745110820100a116a2d50a926a081552932a370b848568f673d83a198542c98f373a02a6194da1ac1017b433c378446fb0e61309c4838c2c45632b1b9632b6850ac856050704d39dcfb4536789e49f51f50e67d1009c2e1735ab0c26aada2053934c154dc866b44e7294c0895995854ac4b3414acd54b3b5fa645398f6982b0ad9858160581616a7358cede5e1c53ed4e8c2ce885fb9f156ab38a4291e2e19850a13585c6004d6b69f8bb9a6d37d4298d6b040f52ada3ec9879397b39d15079ab51c5487ea545985b3c4ae298ad5ed1ed328ff00dffe8b0c26d20da6e1c4b53ce548f804ed5699aa153109faaa94c997039c420320a13fb67762f25d1aa859a6b4e8020d51b9d1e6a42c678152a6e952b11588a952a54a9dc728d5546b9c040d1521f674fa47b21401c57479ae8107c956e0a8d4fb2a7fa4270e89562761aaefd2ad4ec5b3cb9aa9add4a963c59e8a2322a114d413b294edc08eb7b5ce619098f6bffd1109cc8f2ea0a0b161d4a36ba7ca50b5523ad24d7539c54aa41e4537a5e0ee5cd5b000d079dd2a54f52ced37cd3465ea7f955998da5df30d7cb9a09a100a1614e62c298988140a06eab670e98c8aae2d748e6e81cc2da543daabfe6ba3c403e8b65673c611a25ad0e065bcee3bc1362536a08d102c2b0b56058542c288841e995471552bb9fe02e0cc9009e32b82c1d1954c14d7705109e653754ed5040c2a6725aa3da519dd0b44e7299405c2e71cd0722d6b84109f4cb27929bc80d6e2768bde7037a2c01dfc273cc9ce4f15a9013693280c6ecddc02b4bcd439ac2994b1792e8b46162a744bb3393564040195d69ce83feaac8e8a9ea15a0e74dbea814fb7506480719f0556d756a822708e41340954d8cee856eb4e09a6ded1d5388d853cbd56a01f047879ac5152468d3a27db3a26153046b755ed94340a37073b884420d418a142c94222381ba100a3c1615856151e0a072585615856150a3c14782817184d2de729d5078a125a080b0b8f0581dcdab09e7fb2ae3b2acc3ec691f04ff9fd5587efff00e92ad83a0cfd4aaea3c93e8fd953a93acaa6f2d788440784fc9704dd6e7ea8ee9d7726132ae2c8eab445b1a7d14ef6a554786052ea85358b3f0534fe6611e21303bfbaa81de1c55aeb3dee6870881d68438fea7264cf8ff2ab53c0439bd8769fe8989aa104e44209a50720e41c9ae41160708215a7d98d209a791e49cc7b0c152ac7ff002d6acbbaaa53cb1374fe11df1aa0205c0958d0abcd62695088586fa4d19b8a6e651edc724e0b8dce8d9eaa8a1a955088089ed262e3713a20ee804ca99eaa7a6735f305a94e2a754c92ecd1c9704e4dd2e2876ae72a94834c8d2ec4c68972ab5cb8a94ca352ae83d5453b3372e9544fa8499264dcd64a213290118bd0226f78c4da839b5513fc2b7978a34eab386bea9f56a54ed3c947a2e9552d0e6bc80d0bdeaa782f7eb444628f244ce650602c631c60f029bd867927e8aab9a098f54c1c7e8b0e103bc5055fb7e899d91ba79284574966500a16150a14785deab25904e2b359f359dd96e03ba53708392253498526e9c8f92add96aa36ba4ca4c699909c7162238caa1576553144e4aa5ab6c30e088cf5553822f25a0725c479a983215518e08f54744dd6e7ea8eee477995b81cd6d5aab5682d23d56d96dd6dca35dfcd59f1bba64e5c14e112aab8b9c982e91c5609d0ca75270cd55739c462eba9b71b5dcf1154c67fc2735ae6fe47ff00ed728753796bb50a9ee3ae940a0e41c98e4d720542f69d9fe70885ec7b38364a98be74e69b3d6731fa7155e9607781d37d94e2f6a8586561704d7be549852b126104a81c9610d612987827e4d4354c6e6aa66004cc94aab05ab240b564a507704da9d14c8994fcdc8284f3d21701984e9c4b68b689a7246a0985f321a9b9e65c8805b07455b6967aa581c638792db17ea994b1e78906d9d9a9c5fba7da5df28c23f74ea97359c4af009adc3aebbbf384d186ab9be242a50fb2343b42c82ad349d4aa3e9ce9a14ca98ba2ed5571d2f4dc2fc4198786be69ae0e6c8553b2e4f18aa26340e9701a2939a855fb4df254fb01088595c39df0a1bc5068ddcbc565e2b25e8a2e91cd7158c8e2b68b12c4566b11e6a4aceecae952b127909ae10b6816d02353c164ec936cf45e24cfa27f4496f2541ad75568768ab52a4ca72d680653f82a54db52cd10271645106e2e876992714da6fc38e3a33173b54ebb0bb95d086602ed79efd4d14a95298d2f786840068006815572d5c9aa47141b3d9cd0c20f49a426161d1eadd4f01665af5cd9891a8714ca8ca9da385dcd16476bb2eed7faab550241efb35f16f3548a1714e42f941c9ae41c9af4d74ab6b66cee54e91ab50306a551a629526b0700bdaf5a8e4c8e9f3e4a98db522ce23b29e20ef517ca9b86e928b904c4cd156765099aaaa9ac414677109fa22375ae4d7ac4094d28270cee69b9c3344aa553a2b0ca6c85c554319aa424cdded3a734db53ba53334e91fe89afc5a27870d5004a0c841a5c9a0334d79ef3bb4d55b2b4bbcd58f3b381e6bda74658cabc4645546710aa1c54c1e47728764aa1f77ea9fa3bc9329ed1ed778669c73cb417da7e4f554bb0868166a372579350ba54dd374de35b89ba54a952b12c4b1ac6b12c4b11449588ca726697f0b98e4fed954dd86a34f8a7d405a44272a55dcc6c0e6aa6649baa6a844ac4e3ce2e76a9d76cdde09c21c45cdec8b810467add04e811611aa373fb3b964a78598cea7f84e309e533b48422a10ad5471c43c507d99fa8c07f656c696ecfa523875d47367aff00922334cdb531dea7c964402de1d9f11dd55e8ecaa4b7b0ecda986e29fba0a6940a6b9522adaf8b39e6720bd9d62d8b768eed15531603875556c155c1ced4aa0ec150156fa59878d1dfcef516119ef9289b9a104d7c04ecca840239219ace539cb8221151ba0a2552a9c130e5739b74a251cca698098e06f792f80808175a19b4a151bcc2634aab4f10d5536c2b43a298f34c263e88544321037ea1cd8ad995569fcaac27ec9de0f56c6cd96bfe89fa263a53c4631e1b943e6567ecb9158aa5311e0a91e80ba7c1571d16f9aa5d9f54dd2ed14a9592908b82c40a9ea25052a54a90b1754571442668a54a94eed14d29fda51d2f558004ed1303709279a721a27aa233251c506e7275cdecb7c954ed9b9bd9dc352a151e28dcfecdec617b834715904f727267682843252d585874784da4ee4d7056ba4d6b1a5b3ae9d759fb27d11567ab80c6284d6e21c35d42a8cda330c6a72f072ec98bdca54a37b504136a06892a8d175578ab5065f2b5689c4bce5a26880ad94c53b4d468e698cdb599ccf0c93841ea85ce3704d086a85c05ce4cb8a2b123711bccd5537a06e2214668dc354c4166146e57a7b3acf1ea2e8cd55649694c10139c31bbcd37b0df2dd2795d5bfbbf356d1d1a67cc2f6719da0f0694f687d37b0f110ad366365a81b32d3d9288c47d10b3b3c57bb53f15b0a3ddfdd3a9b1987088567f9d155bb4152ecdf54743d552d0a6e974ee92829be54a953d646f13bee4115f37aa253b44cecb823286813d53744ada379dce4eb9b560442264cdcdecdc7440cdee7858d39d22fb25386e33c538a71b99da08648ac2b00511a1556a54753c2e33d4c5f0b0ab3189f208161d725b2e20caa0fcf0f823564905566e31b41a8ed7faa958b34e46e9b826a08d4881124e8159acd071d6ed706f24dabc11cf822f737e54e786d22e3c956a85f55ce3cd589da2f6951c15a468ecfab7237305cc080cef250d53771dbb1bb49d9a0735371b866a21310bb86e5be9cb03f97f085f52ae7807add44fd93517b4420e69d0dd26fafd96fea568cecfe442f663bed3cd8aa9c2c738700aded6d6b1e31f2f4820815894f827f6479ab3f6cf9272afa8f554f4374a7f60aa7c50374a9dc72087572a54a952a77a6e3be6e09c0c941e64669da2cf85cdec84f41a5cb64798b9c9d7536b48329e00d2e6766e3a206117b94eed3663706ad027146e67682850b0ac0542a81bb33bf8545d210851926bb2210242158aa755d285576d0e79a15cb1c9d58b0c819146a02bc651a6f3cbea8d9ea6997d57ba5a3ba3eabdced3dcfdd7b9da7b9fba163b47747d50b2d61c07d51b3d7e02073d559a9d9a97cdd2e24ac02a6520f884d635a2020ad2f34e9172b45beb3fa339205594e415b9ada943512345b1abdc2bddeaf70af76abdd5eeb57762f286a8697346480bca6ee494fcf70ef34e698654a053d1d13144a6b60285c77480e041e29ec34de5a785e2932493c53e1af21598cd2bb0b4f04042e37da3ee8f9847a5677f92b1932d84caa4821c11e851b553e1809086e3fb1eaa8fde272adfe6a9f1bdfd82a9ea86f9f8a3ba65094505c6e703e89da208a67653933546395ce46e6184e4c05c8b43721770b8ef5919abbd138a28df28d55b67215eaa16aa9c5a0a2f6d4a6fe8475128e6a0429858d12b122553a984a2e58d62901695404e30e28d41842dae229b540d42155a468b6cccba1e685a1b9fd9af78e881b20bdeaa62c41a0275adcfed53a685723485ef7579af7cafdf4eb5557082f2b1ac41630b185b41cd6d02da85b51ba2f281cd0d130217144dc35474b8b8423ba54223769be14ca94f3731992c94a93c155ad8479aa7503b76df4f2150791b9c9f69034d54b0eb8959eab5939984c38c4b5fe851796eadf50bde29c64655271755937da3ee6a792a19b61590c39be0f4e6c3161da0f42d3eab3dc7760aa5f7813955d153d6f3d93e499aa1be54a1f1e50453b1864c42693399478decd13b4ba4dce46f8c933208ddc2e3ba012400800d681c938a3b8542c2a0221010c85c54ac4a6f95374df2a54dcc3aa298e8684f7f4e56295385c81ccc2c5c536aeab1c85256346a15b52b685632b19588ac454a9ea62e06e75d4fb2136e95374649a3308e89c538e578b8ae37422145f2a9d458939d2a9d3812aad5232083df3aa0e319b50e93b2f5553a4e9fa2648726e9b9519b4a6e6f347299e08bf12d879214473565a34dd5608e0bdde8b4b5c592ef942b63bec9cce2e10bddbdda1b33225523f682fa99d3a9fa4ab2bba2150b3343dcf9e3309b9b534607f86e91d077926769a9caa68533b579d0a66a86f4a9370fc00228b8e0c3c161208947446e6689da5e3409da237b4a953379d571088dcb333a58b922514773502e9546a679c27d6013aab8f153f00d4502a7352b163cd4e6a4a010c96206026b7a4ab3797c11472b9cb8a6650102a5139a09a1119208b938acd70508859a33703b85bb8d7e4a83713d61c93acee12554af503b5e28b8f7894134c84d80b6be09ae952a6ef6952c243c68ed7cd0d56267794b0f0fd950a9b2763c3c13ab06530f3da7054299276b535e0abd7dadaaa6793720987a611bec87254ce49a55b6b6ce81e6720a55318b5d167770210e09c53fb2e4dd6ec4c1f32da53e69ba8be77c22566a7a9952a54a9ba54a9eae145e1efd311b9ccb99a23a5edd13b446fa584e20539a4184ce379d5711710a2e60c34da1147759a5ce780b1227ab9df051392e174a63a1aa7341c83f3552b4a690184a693aa713d6c1e4a6e06e7274ac573474c2958d62b98dbb822512a2e94138a6dd8161bb028581162d9a2d84d5677069520a215aac7997b465c559c125bc931b25086ad506a6ee57a22b52733e8882d7904661627a9a8a8d6a8c99683e6a88157a6e126557ab8a69b7d4ad9b69dae9e11961fe153aa4d769f1451ba86551e3f3154ce577b49fd3a6ce427ea9a0b8c28744304c2dbd5f0fa2dbd5ef2db55ef9411d02aa2610d6e7324932851931896068cf929be54a08f584e7d6cf5e344f1c5338a3a5ecd13f71a874db0754329179d53931d395d0a98e9b7cd39147743e13eb13a29f851bb2815286a8bd53408d116b392d908d616c3c56c4732b64df15b26ac0ce4b0b792c2de4140e5be3445688ac50a9b813e88b90729529952135e1172273bb6b92158adb042b046a356d1ab6ad5b66f358db12b6b4fbc16dd9cc2dbb3985ef54fbcbded9de08db0735efabdec706a36cabc3254ed56a6b01c40f82a1ed00eede4b27b4c710acf50d2385c132a379ad5516ac2a377da54f0d66d4e0ed7cc2c6df158a74614c6d67ba035aba54a69b4f4b8f820234558b457b3f3929a62ab7f5237e969a9fa950ce7c93aa35ad24e815479a8f2e3a929ad8cb894228d39460926066be88391d4f9af9427142e25511ab93cf04733b91ba3766f1f1a0a39a688251d2fa7a276e04382266fc24929c2e6ba51b8560e19eb71dc2513f0e0c27e626e9de050a900aa1de2b162298c257ba83ac0468c7cf8916731088f10b0951746eca6a2e1cd178e68b9aa6e61c24ac6b115b57adb545b77f25ef0fe485b1dc42f7a1c97befe42bde0722bde078adbf82dbbb92db54e6b1d4ef297778dd0a14050164b252a562589523f66d469556678722acb6ac3d12ab01ef153cd426d47854ad51aaa755af192c946e5ae91ab4b2d4190bfea54de1a419555ee79e8360734d6e10aad665166277a0e69955cfb531eeef2ad85b54e1e7b9532b53d522ad369da741bd9fe534474be8acf4fe72ad6e964f095216258ae6f642a9a5e412e108c35a8fe2011dc6c8d53b7021a6e3a448f1517e22ba47e52b6757fa6efa214ad3fd277d16c2d1fd22bddebff4caf75addd4f639baa3f0a771aee08ee1dc0b1a6b8aa353241fcd4b112510d3ab51a3dd3fe49cdaadd7f75887169f44dd81f988f35b262d9d358297253e2a5485214858962589625896252a54fc1ca9ba959def392a59348e4551b4b308a6750abe064b8854de5f51d28058542a45cc782d53c42c4b1a9beded2cb4bfc7354894d556ab28b713fd07355ab3eabf13bffa54cc546798568fbea9e69a7a0cf2bed395a7d021d2a4478214fe8a9b768ef009eef947aab48fb13e8b0bbc166350809d11c933b28a3add4c6729e653ff008fc3c214aa771df45b1aa7e42bddeb770af75afdc561b26cfed6a0ce7a03fcd3c8776b35b2a27fba6fd11b2d94ff007417b8590fca7eabfb36cdcdebfb2a97f55df45fd9cc1f395ee34fc7eabdce9f74af75a5dd5eef478b16c287f4c2d952fe9b7e8b033badfa5d2a771fa2ad504e5f1e77426aa2e1c5070454f8ac5ea8523c4e1fe5611c1cefe51a6d232011a27bab0469929aa3c50abcf17e04d12acf4a99d42a70d1004044456ac3c6552a34ead232dcc1d556da0e8e2901513f6a8140dccc8aa6f045d088434bbdb0ea6052efff00921697374017bed7ef01e89ef73ccb9c49592a4de83dfdd8fdd54e96da99ce1b2d3c552fb9a7fa6fb6fdeb7f4aa0e909b8c92cf1595267fbd50955bee5fe4879ac5083887643d13cc94cd2e76a86899a3ae3f0474dc9bcfc1b5b8880bfb332fbefd91f669feafec9d6675121d32a9bf13419be9b319f0e289928af962eceecd4b95318b33d9fe5632387a2324f6442d8b48e5fba367770734a34aa8f9560a9dc3742c05602b0950ad35444028fc58ea814c72a385013a3250a7dec3e9aac4468216150b24e7009d5cf041cfe4ba1c7f6f8c82b09584ac25612b026b1dc8aa6fd999330a9ba5a0f355c45a7cdaa9d6d935fe2aa55c44942368d3e374aa7519c56163953616bfcd381589c2010b509aab5adacc9b9b95a41ab89c7376ed9ea536e30fd0c7ec98f9aa5eed1d33eaa93f1826204e48dd6ed69faaa0f54dacc45dc4a35439f1cae766c7f91416253732e76a9ba5e7e0b829f0537cfc2b75567ab8a9a94f01c2152269bcb0a94dc4e7068d4ae8b5b85bc2ea566c6dc4e27c13aca672a9fb2f76abe051a5507ca6f6331667b3fca27c3c828528492a13b08199556aecc43467fc20ec5f31584819d431ce5343cff00799233de29ae7733f556aaaf65384f9e3f151d682a8d4842d0f8cb24db43b8adbd53a14dc5f35477d16d1a06a9d5c9c9a16cf176a56ce98d3f745df98201e73032eae0f2585dc960772581cb66e5b22b65e2b67f996cdbcd6062c2c50c50ce4ba3c97a6f008538d568a959e737e9c95b1a1d673969055010c015afb549de3080c523c13822dcd34a0b0054fa2b82286a9d69a6cca64f827da2a3e780b8aa821e46eb7b21594f45d7db04b59e65343c7046a380e4a976c5f869f78afb2f1534f91523804cba655344f1b8a1f027829f86378d5599f0e8bed2c393c70d533a711c552636937f37128aa34b1bb3ec8d5697d77e0640e37369f177fdbfea8bf352a506928649c5d09cec3c65dcf92aa3a65608d10a807042af82a84154465a2b48a4d12e551c0b8c7c503d734aa152106d278cdb051a0350f41b579c84704f49c650a8ee1a2042d9e2d57d937b224ac159d9c2d978ad90ef2c0def2c0ce6b0d3514f92e877548eeac5e0b12c45495254959f5e184a6b40192c33a2a54033376a895584d1a83f2aa0e9682ad63ec679159f0d516bd10536e61389644a796b066e84fb7b6218d9f146b547832ee285d28aabf78edda7d8565f991bad5f763cd494354ced0b827b7a6ef342938ad9ac309badcc66a7c54068846e370eae145f92e4a2ecf723e0c6a864a9bb1345c559e9b688fcc7f60b54c617b835610c6802ecc22e01a494f38ba64ea72f44d89043829d74faa187c564b001c115267084f70d19ea57047374f360470840f317d6b6ecc437555abbea9971f8e8eb039532e29b4eb0cc02137f361f44e279c85d1eefd13297261f55b09edbbd10635ba053f1ada7c4a84c6179c9329b583c6fd72566ecc725584d17f926bb26956880ee8e69c1c50ace68194af7afc9fbaf7a7706846d55cfcd1e4a49324a05338f9206e28a3992a161585614cd1597b47c91455a3ee8a8435435bea76dcb6adf15b66f228d49e09badc3b211379b87c0713bf395c3ae946e1add667e709ce854e939c4174444f9a7b5d32535c81942ad46fce50b53c6a0142d2d3a82ab56c4600e8aabf774bd5374508a698433b9e5d941f94200e4138b009e1fca6d771f906889a71d84d68768c2b62674fd93d840e1f456ad63e3a503cd1628ea82a4f8298e0e4da45dc421419f31941ad6e82f851f050a3a8894ca40667550994b179210040dce29995478fcc56a10c9b1c8c2650a6ea6c71e49f4e9e1d15a06131b8104d2b14f9df5dd0dde671567eda28aabf76edc175630f52a6e1add98aa4782379b875e355c4dc7767e0785c2e6982b1625d3641694cad4eaf81e49d4e3440a959151c949e213d989b4fc1929a5b119cae8735b306733f458334d07842c2788553467927bb00c33d23daf01c9557623e034543ffb46253710f9884df78ef65e2ab5586f8aac65e7f000e8b88ea9a550780b183c50a8469510ad5072285a471057bd351b4b8a351c78fc5067d7926b70f9dcca5c5df4df395a2a26a708a95478ab39fb06aed1856ae95671e1a2210bc205028225557e276f3150fbc0894554ec3bcb71ba0bab8e90f258561508209df780f86f0eacde53350a54dd07928505612b0ac2542851bf3d40becd992792241e29c6792152b0d09faaf79aa3b54e536d54b8b5c135cc7e6c74ac6563042918443be4010638683e89cf70d6534922e24a24a73b0d36ba3a5c11ccea9ac2e72230b406faddd3d43495b5319b0856b79c2611fc045d3d484c7158d6d50a88396105328a14072f8884d6f2faa0004012994c37cfa8ad95a078b533455f2afe6d564ce9b872728856968154809c37250281529e7a277c6aa99e984514ed0ac9746e6765055be5589625285ced7ab8dccafcaf1add2b19e6a512a6f953f0050be93880e58c2da35636ac414f8a9e2b6d1cfeab6cce4e42bb39fd4215dbcd0ae3bcb1ac7e01621c8fd50c2471f255dfd00dc2efa5cce805889e4a1fc9021ac07c154ac1f0ad62294fe1a1052a50726bd34a63c854eab48f878419cfe973585c800d197536aed52779854cab50e9533e61584f4de3c13b355ecf3984f19a2100bdc5ae6373879552854613210529b42a3a9b9fc00faa71e8152a54a92a5494dd50ed04e46f8b99a5d5b30142808004a6b45d1d7ca1ba2e9b8dd1f09c374b49cd607287a97adabb9215bc16dc2dab79a99bb2e683dfcd6ddfc90b413c90ae0ea10ab1cd6d8730ba2ee016cd9f982d991fde0f50bed6ac331b4a1461dd28faab78c4dc91fc35b7ca694d7a69c902aad366469839ea39222136250a54c8468b5358de216c69f25b368e09d469b865927b1cc39f59066233419199d6e6522733a2d321d55afeeda793952392b4fdd83c9c1590c5a078821108aad660ecc27d2734e61596ce5cf04e8aa7c87927e55679a3468b874a9b57bb5069914c2ed3639e4aa08042850a1428b82e2a7246e3a9be9dd53b37d36f14721e6be5951f013ba38a3f0e446e61e8cdf4b3c96cd6cd6c96c96c56c16c16c4ac3539afb542a3c7cab6de056d5ab18e6b166b6cee683bc9170e4a69f16fee98f0d32d7387aa35dfaed27cc2a951ce69ec27e5f87351b820a9d5d9bbc1796898e0ad34c16e31af15299521074a71828544f7740a6d4521e20a6d8aabb305b1e69becfac78b537d97deabf45fd9747bee557d98f1d874a7537b0f49a46e0129bd2ecffddfe8800dd2e6528ccf56255b4c511fa82a0725584d17f92a0e8a948f8846e211a61da84181a202ed630b2a94c1e48229aad7f7b53f59ea41e8846e7768a9b9973fb06e024c203823994f3a0e5f0dc0efcf550a14750354dcc16df44c3c2858560581605b35b35b25b25b15b15b1f05b0f05eeeb6279ad9bf9a8a8a6a725b477756d3c16d1ab1b0f155638277e10375a8de1382a35a06129884110aab303e2e63ca8c43346939b9f04d213e9c66d4c7aa64832a99c6d90a0a8509cc6b84382b5d8b67d3676795d1cd0a73dad3bab44013a26330f5bed0ec53f3566392d426683c14cee38c2a7da50ea350f765648e89aaabb13c9f1ea5bd917d4ed1b8266b73bb26ea2dd4a3a23f0d0a3a23cfac9df1d4040c395419df48e36051bf174285802c0b66b66b66b66b648d208d208d109d4190aa5281f8685c2f17384140154a9355b69e16b4a19a60cd3144884c09ad4f6e0aa98325653dadd22442b559cd2a990c8e89ad033d4f3b98c2e4006e9d565b96e1f61ff5056628223a7507e6544cd36796e551a1548e792e72a00d2eaaec34aa1e4d29daf52cecdf53b57b75bdc04e4501000451ea06fcdf2a77387c6f699e57d1ac58bde5bc442c794c4a6bf1091d74285856158516aacce81fc285e2e3704139880825a7554e16c1b59ae04650b0e0796266a9a9a9ba9f3415a7ef1aa99e8ab376cf96f5a29e3a642e97054e91d5df016bcecef56739a6aabf7cef101598fd88f3dcac618a80509dc2eb63a283bc7244f52cd2f79194844b785cdd6fa63a571f88e03e3699ce13841bdb55cd4cb510bdf3c02f7e3c82f7e7720bdf5de0bdf5de0bdf5de08db9dcc2f7e7f30bdf9fde0bdf9fde5efafef2f7ca9df5ef8fef2f7ba9df2bde9fdf2bde5fde2bde1fde72dbbf9b96d9ff00996d1de2b1bb97e1411bc23704dbaa59693cc909b4290f96eb6585ae9a8ced26a614d5a5570f1415abef1be4a976559bef7d37ea526b6a92a7e02b6746a7e92a89e9262afdb61f02ac87a2f1e3b950e27c7243a214e48dded27e6c67af52153bea70b81dc020228fc41f8d09f9c1bc2651a7504c2f76a7c90a0ceeaad676eab60d5b01c96c0725b11c96c4725b11c96c4725b11c96cbc16cbc16cbc16c7c16c56c96c96c56c56c9576613f868bc26a6ee3880d32a462779aa65072abf7c3c902ad2336aa1aab20cdeef4dfb41fb4ea89df39823c153c88548e4abf65a7939598f4cf929b9cec2d4c1c512b35caeaefda557bbc54239081ebbe153bea68170dd1a4dc7f166e6d2372cef837b848590710a0280a0280b2be4290b105882c41626ac6d58dab1b56d02b41c5f850bc5e104ddca8dc4c2de6aa5134aa10533541553f6de89a15512e605676032a8b70b379eec2d44c99ea5ce6641b33c778def186a3bccaa27255bee9ca81fb46dda239a9bcab555d9d1773390bbb23c513d453d6f76889661812b2bb85d3942e861f158bc06f1a6f68923e047047ad8ebc5c1d0a6f060aa2e3ab9c856cd624ecb1389e50b68b68b6856d0ada2da2da2da2c6b1ac6b1ac6b1ac6b1ada273a47e1c1141353776df59aeaad681a7154d8495eee0539c49ff785519c3a2f77acf2d73464a9595e3b4778955aa623f006fb4655ea79aa072473691e0aca0b9ccb8953b8e2ad35b6b532ec8d134712835cf277db1c565c1335bdfd9dc1a5f3f071b909a3347787c6b1eb166b6aaabc3a81e7216358d6258962589625896258962589625894a952a7f081b8374269ba6fb737fe21308c411a8dd9c7242092ef15400d9b950fbb53b928b95571c27ab7383412531d89b3d45b19153173540a0a9e1a621ab692b3280bc956caf96cc71d5344acdc401e8b2a6d8fa944c93ba25493cae6eb7bb43b8dd3723e1c7e0386464a2e17bf4eba3f1509ab3517daecbb5cc6aa9d89ff003109d64069b84e6850ab4ce12d54e954e3904321034ba2e251727d4e48b8dd8086ca0f07445c1625d25079dee735824aaf58d5778700ace7ec86f0badba8f2540a6a10b0a88ba7347a215a2be06f89d166e28e4202a6cc024f68aab524c2c94a952a54a9410d6f3a1bc6899712a54fc38e3f800530810ed51435bdfbf3f8e8de958967742cae2f8552d2c6e65caafb444c307aa61c4c06f20ceab0a81baf7b58d2e768ab57358f87017590fd9ef0bada3eecf9aa4734c552b1a6f1e49b6b0b6ede68d66f342a8955ed3875d7804e739e64aec8f15459f39d38271c451d7a8086f35b9222211d3e28764fe0035dc1ade74f8408fe1e2f958c292a1428595cea8c60d556f6a516e86555f683dfa27b9cecc994355673348750eaf49babc27fb4290d012abda1f58e7a724dd2eb26877b89bab805a279a66aa9955198e17bbad93471418de0154ae29886e6e449264a688cfe8a9b31bbc38a73b80b9fda779f502ee1b94db2500899329c77608d47c2c743d7f00e3b835bf9f97f8102c4b3584ac0a164a5799556db4296ae55fdae4e54c7aaab68ab53b4e254a69e8df643f677cc23569b3b4f09fed0a234929fed0aa7b2004faf55dabcee53baca7a477be6baa7651c9e7cd532a5128c344b8aa95dcec9b90509ade27459bdd011863605f5074ddd50d2f7768aa6d86a3937cd79dc1c5ba5f4e3b31c7555de49c3c3e0c5c746fc69bca940cee9f81851b87f0d082c22e95373df4e989738055fdaf499d8188aafed1b455f9a07822e2770152b12b2da5acc9c9d6ea038ca7fb49df2353ed35dfabcee4282b09428543a04cd554a6e644f15661d2dee37155e36a61532a724eb4f707a944971926e0113c9319b36fe62b5328dd57b6b66e3c51635a7a451c3c277dba5e631e6b6a3922673477439c342a7772eb84a84fe1e5f801bda642952b1299f863f8684376db6daf4ce16c0552ad47bba4e27ae850a2f684c0033d137b6556712f8e590565ec3b78ea2e7f65de49fc1525f29f2dc3d80ace3a44f20aa9371b9cd05de881cd55ed6f531d1767c2e6e9714fd6e6e82e7f68fc2c28be538e7f801be9ea9c2e8f851f8784d5fffc4002b10000201030303030501010101000000000001111021314151612071813091a140b1c1d1f0e150f160ffda0008010100013f217b58d9655536b0cd80d61fd0b6646ac5c8ff0088da4476a09fa3d469190d9da2f12faa08252cb22d4693611a216531099e11284e7aae43244321904510422110884422c5be8d1aa5373abc1ae4f766c3a0ad8fab63aaab3cb25cb9b589d09b4df2e7d16288183712eb927a9a41559c2dee1b42d5d81a966f23a5db8d069c40a4b0248ab240dcd1b741b68c693289244a19e3e881abfe2427a526f21a7e84b5996eccdf1de44faa3cf4ba189ef518af4b770a2e6c59e291e83908f41c7018b76a36fa926a3b86633a17721ca88ea24e8408108845bfe2b61a68dc3693a242fab637d2a992c40df954eea3c7a6f03637c98e07abc0865c8cec611525233444dabe048d3714ec297224a6d76304db8bf811967294dd989966318b09f355803602c07f40dc37447fc885b1c47012d18ec1daf715cf9246ebbb4d347f24b8f2d86cfe37fb13bc3f195fb20d95f6cfe98d7f9092496122d70d5c0d53e108eeeecc322f0493ff003235c0ce5329104348b2fa77d4fa6ef5b0626f42e44ae6ae904922262f66a17c21277879375e4f07d8842740323c973ead4369765a18e24bb36ee4a6a77373156328dc0d7a551e44ce099f5da4c6fa7d5432192244abf791204084422db753a088368489a16e42c57b5ee4616672247fd31a9791b0b083b73eacf44ae8b744222904520641d57d058926ad08618d63df03d4cf6136097e4574bbbe442095566b264821fc844c466896631221605a8988c968694b982615c4c665a3bb5a51919a5c69a278132c33751210fd76931a9f45cb9043208e90810884422df54921a420544976ff00e0ee47245208f55d58ae2ed7546217ad0429304ce04e0d60d7cb1ff03e06b3efec25584211555b6a75baee5c6df2b685e7924c37931057baca6876abb172b2848490f7a140d8cd12ccfb32e5d313a09accbccf61889ea35ec295926d92ac1bb8121926ad2379b7aeb7ff0097a98e648c43165ff4efd25fad705d3643c387f48cc19821885e9cf4317184e1ce08306fc590d08b1b04b4f2211d5732723d6d0e367aa2e043b686e80318e548b13f34685bc290de2717badd10295b2d052d5b51ec33184c313ac68b325f2423cc5ee9aba2e20a456d613c1042a4af532ff94dc265cbe20b6f2ffe7be9bd2e6beac3ee6fa533062c2ae06217a325c8a37024186e4f6b992e24e6ecb932ee10823d09d87982342e6c4b79667732b6643c7aefe0b1794a2ca2c58cc374523778251b268931ce5dbc693868900be79f04603ba279366acd3944ba136d82a0aab96a6b425dac2cb208e927d2d1ff0061f45e904724f447af25cb902ffa0967d8581885e8c74a348d361780bd4280d24f878110a53bc836b3aeb3b3367ba94f744c40d2be3b12b96e4892238b0669025759ce20d64cde2ee4b81d8d5722951947da7ba21e45d13a09b0211ca3b38842606a46e0b234eb23d1c155fd66be94fa9158fa0b184f268c51dc4e664791088aa8e96330de136ff9ec4a974c93f55a526e16116bdea42d79ccac4aa534cc3baf02c1806d61a1499db708d85d375b1030cd2c474245d27c0f32da4f646b15991bf4a9f5073f49624bf05fae2b1f51378f436ace3ad7fd8546b7362738a25f596208e83b6d22d430994af707eb665277f62534419c9d92093c9659e8e518491bcfdcee85219f628dc4183d142409424bd0a49e9bfa71d5047ab1f51a9a7d62cfacbe9dd18fa151114a8d7ea704c474427a1088ab7b9887bab32726c9c3c0ff000858a5b5cf56125e7869e1f0c817b414d8938296018926fea426751cae4774fd08447447d1dcb13b7d33f78252fbfa7afd6acffc86318c2910895e77fa55770aecd8bdc5b3bec63427d5c929260df07df809e09e308c1644c924587aaf7ff81a1ec89d7eab1d6f427eb12f47d2bd7b924f4c5208208207dba1d19a8be972e31bc97c8cb3619111976a40823a16b22b0a6e3260d68edd6d168206992214275f227b31b7928a1a53d67ffc0eaacaac7d2b12854b7a115b97e85d71ebb18e8be8665c2bb366f712beda3571eec9ed1a9cdc49682f40981e2ead09ec579e17a10ecc86b284d3c31d247698991e49b0cab9c9a5476193b47eb3cbff00e0db4b2c8a450fd0927d0823d0b5f826f4823d38a42fa663a6a2f55b4b266c7c1fe8c623a3ee2c4290bb2c45524c7a4b4981acc896361bb48a27749da33216c968b9a25ba45fee3e73ba3b7d1ca4323ff81cfa644b8267b69ac8fd18ea8774f8e88ea6653bedff00198c66a2f52f3f2cc493b8a416424358b7312ae8b1bd06083c0d4a20854832c87a4da37124449dac0f5a5f22c61fc16084fd167ff99156e3e9126a30f3dc456b421e691cfd045e788ff9cc747917a6cfbea462dc584ede837a257d040dfa0f7089c8908d2044f5223a89a787eb65ff00263e9261bf42c5649ac0b2bfeeb1d26e2f52c471461fb33e17564b9b0a704108fa37481ad068ce4b30172e26729dcdcf689f87e9c869e94907bfa724f45fd285f5e855b5205f537faf746318f22f517d8d1d0fc70a588493c17208a2de25fdbea6088de8413f29265c7a782f4de83ffaaaba334268bebd65fd731d1e442f49e196216ca34e56ed643599a8c48a2124bab3193b754f997c8f45fc034ebf17395bbd8b7d760738eb8ffb4aba75deff004eba17d6ba31d1e02f4de19f154505b76391c5fa9ee1ee9ea912cb06ac5a5c6f8b5a8833738b174cbeb737fd19bc7d02e8b9a7a50410474ca21d4680a48bfb10dbd94cd51dcb128f3d12489fd73a318c7917a6f0cc5dab7e30baa0357521f9da1310d890812161bb7d6e4ff8eda59fab8adcbc08e2e45256e88473d1ef1c070a3708d7980d794780d591f1be43de328f718f0df6117ddc46d72bccc36ffabfc9b5008a712f1082ee2ccf7ff82e8c7463a30bd3f806148ac04810fd59f5daba91bc5caa72552f70feb62540bfe4bdf05eac10589dc718e439eadc342ee2db4516a7745ec23fac3339fee12d5ec87baf847ed6d21e9279ff0023d25f96ce24fe725a7f12196ff091a03e46fcfbb3283c9c0216cbd147cd7f6eb05f5ac746318f22f4f276315dabf0ebc7acd3e2f9f610c96058b4979dbeb9abff0093c8710e7346f4bb8722ad7c08472bf2880cf683dc7b31ff00923de3d8d9f7521be86f63f2d9c3ec19a6cff28986699f7848bddde44ce6e78d28ba24b7d0291099bb16787ee85f07fc47463a3c8bd3c9d8c576a9c175e05bd49a1cb210f76061248d3e0f5d4c5f3ebe4ff90e58ca504945803f919c5ec3ff00304a5b17e725cfb81bf2cf2761e3d08a3cf54fa1ad14d5f52e854c32c2bec3fbf52fae7463a3c8bd3f8062bb524bec0b1d7818f545cc637185301a8d465d98bff8618bfc91a935b36bd043a2116208a4f4c924d523d7d58a41041045208942514b3fa2e35f2fd4370d7a8e8ea7942f4fe018aed46b3e861d68f1a9dc6b6f292401cb4f2a7817fc7249249249fa9c068f20e26fba474a342d8d27268f7aaec92cbb2119f15204cd3243ec6610c8989eccb2b452c72ea7294772d6e9a6a650946d9ce5ba3419cd402908d1e14bc0d495f03748786a4e4fc89ea2c5ee1db8e1088f4d7a1c826d88fe96e35f375afac7563a317541027593bb3abc3315da9f7de86061d4b696f7c5ca1248bd08fa5cd3e89249a1a99292b6e27092e7fc09740be58e44f01b65f127f7625ad3d86803ed1c5df0670a49bd5e3ea303df183be7ee493876128e850eda8992d5f144bc449721a87c9012a3f8fb89d22951231328f31db3724dd7601442bc2757f761a78a934fdfdc5a92d1df066a6ef465a8b16b21b630465bec1a2fb2b637cec37325ad6b5e7714b4a9c2dae76e484252e16761cd591b94d8327205acd169026948d532af86c6e904114b104560817527c52c2a597635e84bea5d5d58e8c5d2f6cf1b8c30d8cb2d30391a90d70b59903c330a252387e8317525c2712e4326e4610930fa18fa424574ed8e4bbcbda13ca53873d12e3b11f43af4457067bb636aa8ddef0361d8d2cc116de23b4c4a529d5c6c776cdc763826b2b6831b084e1d84949954add2fe58cb768e28d098d1f02709767ca37ff824d5ee4180e23c1041e521b9919e6f173fab2eca4769377c1fe894c3fba2fc1b6d3cda71f627ee598505c5bec41e6e434a204c733750236b291a69c350439849b634fdc208fe99126c92c8d34e1abd15da519c1b90bc93426294ac5b5ace0501254cf81d96a28185dd72a2f4f66965ccdd8b2b9b6bedf4aeaeac6318ba6ca7b221da65926a51611b0d0f02a589cfa0c5d4b71a8cab895d4021125de8a3d68f5c56812b1f9226e3da42f726f75454d6df52c59f3482572b4f74c5714b6bbb935700127b2db6652ba75d874b28efadc5f7b89e0b70c744fbd7421acc707feda025e1c76b13907dd904206c30dcd0620cb703526ecba6b782fd392645936cfc23f8c0a27892d46ce046f01aa5ceb70fc997796cb95c37b3ff004c47850d70e4b9625b0ff28b0a45a1b2db3bf0274f6ddecb71d9eb847b092ee0722f80a205d52d3b0eebb0bddc3a908b8027b5723dbbf2c390e68e6eb55943e5ccbce87f46fa18e8c6318aa897a70dd893a19a04d2c6012c334153ef7e82d5c8b0afc855c7ea0c7d1855f49b1b9426535e06cb0bda71f61c72b12d5e3bd306a564749af391e3f5388a0ce240fdd1eccc4af0a1fa13c5c25e13d44c26769187ab966f265b121d8a76f450ff003fea8e443c6e88b4d0c7647f1f2858f00b87e09b6bf8c5c6ef62c4ee8bec0b28fbd31b97cba24b59896bfc8b6272efc9061f2fc320b87f52419ad9c1641f3c6c7f00dc8a4a510e64b3a648775174d2ef3d4aaf0c69eaa5484a62df8c8f54d137a49d7b31defa34369edd2e8c752e8b0f69c12f704af815b0b241cb0a6ec95e5de8a88ec1fa0c5d717a8cc8827512efa0d258c57376f43ba2191f478d5f537d161c131658f27c26264609dc3562f366deab81e83fa95ace02c393dc4996722f136b4ea98eb2aee8e39f034c96858249b087ca9d87d09521972f16ed5679adf7367dc7ec9610d0a1281093d1090352993c0929896b59425450d5b29b8ecc9c4b1fe0d7ba16a5f6e0484709bc7c1381ba2fe965c8dd297ba20285a5ab61b1bce97fe4fda202659a3c16a4984efcbe89a2e8bbac20c09eef8432c99213813066199163431a6b69136a6e8a7911b428fa57d0c752ab445f8c564b3a9b0c21768460eecee98e82a95260f064688db708c5ce36d84cee4e630f67e9d8be517c6d413b57175c0aa7e4273962095c3e4e44b8371cb9f4d8eb3464a4cd5e4ffd226dbdc4ed3e483d4266fec321b21ab4d50922f6c89a42f22d7b0e119b41c3128230b1e4cd46c29a93c7ac9249269355d1cc5e1a3fdd90ec164a3621abccbcf08ec6f031a04340994279c11ed727a174224869dd391ab6dc784c40d25872270addaf81ef7d590936bc5a17241bba6bdc71497a9248893fa94164308409a39883094b8703ff005c36f764ee7ee5da1c4162aaaaa8bbb3eb90e617fb180e605a9688825c0996765046264ed735bbc0f7d802b943edf46fa58c63151b839c8f2ec9cda073a0f70e3bbb11da5e517cd34a3c854d648584d9b82e2954d2ca791527a4b0c16785d5b3bde864724de14ac4f238283208c7746868f56aed849aa133520936dd95d9ec204e2aac371c83abc79c90e7c6bfb23ff21bbffad98ca681bf41c306e5a257066b3261262027a642f920a8b8de705e4d53bd24924924927d142a2998b57b27f687e44a849d9c06f83bf234cbc99ad1cd56d959bd064cd2dad08b3dfaa290416a2cd13c48acf42e1c243a26586edf613b9238e842f417a08abd36b6b70ad8c0b2bb123069a865cce2e10d9b365acfc0986c2139c93a6b7d0b1d5d18ea548806b1b3195ba5638ceec8508ada8611e0cc534152565ad4364898c5a6d651152f492e72449c6b88eb83536424c66386fa923d9adb38fc8b6527e5cfa7a488e4c6189d6a704be062aeb8514cd2a5e58c5a62e4ac1b286218659f3c626e394a152cc40bb12959b53b49249359f59090abce2761f130c865ad0a63095bcc053d9670a6260823abe89510a4ea93d840eeb0f65f6e89244411d18e68dc984609e977e2b24b2e140a4310ab0222d348a2a21bff008c1bb91d73a41bd523ec3a6c873c9219fae88346d5732dcb19bdd644424a7246dd136163d3ca3ea7574631d088467d0c69f108db1ad23fc1270212a32d26eef3b1785a1c584b91628fef46a469a13189c6b1624ab095fd25bfb892bb5a11ebd1776bad7da109c1ff00b468da9ee4708c5bd166025233d5381b3bd3b9638fc47de1abce423519f68a0f171b93cb7b597b972a11361c0ed92d6966e4b6242c70ddc539fb322d622394bf614b5d73dc5f41a89090ba4c44dbf37f05cc6856b8b6baab93769151372dd8d18a16888a40a84490dbd86f780dc98e7787e5246fbdecba057848873788f9810115de85cabfd8525ee21b9c40ed9fbabfb22ec77b4350bdc7b64afb23c8d5e786937de0524949b9bf23fa5bd55cc513a215122442b084daa2a21e7cdd63a16047ee994c8fcbff0037102a53e085daee7720fcc84d9a2d46679b9c0d6f4f28ba9f4b18e892c41c8692cc0d57931fe8fe659e0bf6a5927309a393c22a81aa25e703929b24c4aa526d86197b1cfc09b4ee1821cdfb1c8f625b777de91122103ab1e592155c679f4927b661c0b44ba269d56ba10551843e34137bbe3d166c12116989dd8f105f0a3cb73bb1e11c3e054833292609249104674d60beb087d20dcf63a0ff00324f516b13f5a046a2e9c282f396f7642937812684d460e6b3325e48c9b20d89ccd50ed49a51f212e6da6516a34b0472a5f1c0a45f1dcc0ae133617010f451e4d44a8d4abd96bc12db4dd457c11a3f251e0e4b89265dc9ef724aeb2c7303569fc051a08b173127f92e4cdf722707340dad314549a48858628f411f7555d361acef63204bdcdf19623e2969a89e495c5aecccc0fee2accd4b4922d82646308bf5bd2096ec94d4aab44407d4eac7d0f986c0d6c2122b19efe4481d9639589458b3ff000c7821f1a6ac3ca0d497b853aed6b8d86ee434f70f66e82f021d83a920dea549b01df9d08c4cbd6f81794ce24360cfd23529a2d5c619904ab9d7235284a151aab5491317a2c771816dd1e20d7b130990dcc0f4ce1365272c25f61d1a68d550e2c2a114aec66bc903c753937d7cabfd846a8aebd45d2ba18d614c7f19aa1c8f71af6a4a9b6145d8a741785630a87708c786d381152da4e72706f6303a394da19f3d8e8e579b6c2531b96cfc980bf18489569e9899863b0b62f13f7365976b7d8be46fbdc85b23c1805793214374b3caf61e150a5e46a3a4451095244493d36aa1e3bd1aebff00438206b5a33f9248c81fdc0889bdb7ee4faef882397ec3d074762d7d669350d095221232e26fb389daa42ff2a3e519da1881ed06709af64c991f4b18c6a23277545ca9df7cb7744352762f29f663148ff7b284d4a8d4cecb96b586eec58e3ac620ad96c32f609b5c68a9696bb9a76cb4ee586b77cac0d896633c10d93dd995489d132b496ad82c2508aebd25f090be5bf41aebe841025742f4599d1253336612c2762eb7935a664e10c6477136d207ea0cef85fa15175264924f5158650cf656f911b2fca3ddedb16a7e7087fb8b1eecc11868af03357ed6ee2774f7108ee5ee4368965db50b4ebc3dc4e781ceb63410c8e58d6d30456178fc868438b64e17c092129c4e8dfb291564a51b7cdcc22fe43cbe1916a2adb3dbec1f6209a215113442151523a1226629756ba1519a72d1093533bcadfcfe4b4c8ddc77e5128227b6a2829a95b871fb8a63931b92cd8b0dcbed7f415b40b77115790ce1c8d55ec2c4d3c5a49a47ee2ed28729a949aaab192da93927280b632531454cfd868423262943d560968562374e5ec9a19fc68e509b73349744db6f63184c576b1fb8c914cf7c50e3c51e0564876d054098864ad7c9ec01b7a311dcfee3fb8ba2cef5e9dec8d33ea2d8cf49686c4323ad1a059122058903bd5d185a9cd2c7d524d2491124924d562648d8c6feb92d3cd8ad0f9d8483599c8c937fcec88d907bfda154c287dbd8b8db6ba5736cac3b0618351894bee8429787b5d99bf56f26ec379870ff000b97695f5bf691e29186a581b5157fed104dae613fc0550ba9e37f224a0b6597567f73c513184e4682e47c8eb7bb3c4f92c6c962cb6816234a262c5cc6655be14555ab23845a906151086c4c42bb2455c553134320074976465cc288c6129658a64fcd8c8d892d8c2a5d59cf25b5388a7b39642729492269fb07d2a4f6b1a82b47e831c3bb4526e899a504b081edc544a65948f7724842a378578f25ec2d4eb088cd2c6f61bba617763d845d90c6708be7c4cbadc3110fe07298d36ac90187229b5e2c25aa53efa8be897d1b09637b8d9ba1315049a24ae61211cbc7f61569715238642ed026262c071079ccc0e6af9ea989e42065932ad0259f0556cf44823d281a2040b70f0ec6e6954452c4108b16150c1677666851c09bb91be2289ab916a2974b1f9ac924d24927ad8df4baa569c5dfcbf059f75cfc90dcddf84bf03d849eed2fd884335a36fda23e7125c14a5259b177cc9b5f0fc06866f8f2f2c84a6bbfe04f22324fe9b1727b29fd132c55bfa13c09ace3ee5968314a548d0af3de688763b7dd44ab248d8d53044ca9227542a256a12b8846d924b2d885a6fb218b8f7702c95b24c7f8c0e8b793560c5f61d2f562737ec291325a6065c2178dc4190d5a7b54560d06c45adc32d5d762215dd6c2a38a2fa021135d2a4fbcf2584d1089cb6c84fac488a9b092144a5ce3e4cc0a8ee9f24a385e6ef9443b1496fd8dd0ac5a909b21131d06b372b864dada55f5b0fec2d3dd24daa9e47a60d790e6c9249248c90882cc446ad765a4e8390e67287c246813109dc9931911cd967abf93170f709cdcc92eecb0aad0ee47d4fd6745b19c8f7ae7d8d42109b522972e4724315c2bb225b2f71769f704894bde8884c693795233512d04495b024f0dfd89249249f51ba18cc6b74d7c19bb049a8abecccb2e50f0bffa4529f03492468831ac8cb4b1899f1bb097224db75281a2bb5dc47179f32123244dc9cc31362232a71a886f071085160d60b206710389f14c8744daec913d6ba13221b1374504884213a234107321252d8de95930bf744b69bd8cb3a0d3c8c5b79593cd9fba1d24106312ea2e379ec0c879fdc7327aeec6efdda0e6105c0d96bf05f52645218f1c87aa703ac6d712da64c167433571b25619c4df161f059d7f21335fed6950e92265b6ca5449420ce4c522c6440b25115f0d3ca26486cead74ec2f724ab89aedcb245925dcf43059673fa171dc94895a7d842d7031e2adf066caff000bf926986e2844582431249248a5a25b6c243e492dbd124aee62a095a0c05b5d2d4871bc89ccb92065343260538e491c181c91b79f26ebeccb56666e9af027949c742caf7315cb7c749617d0c558e8217956c8858082085ab24927709a1028559fb1055a424893cc9ab9ddd0cb2c12b32ef02e7b1913f598fa5e28c9636844a49e01cf1acbca1a094becb3e474bec1485739f60f62e49a485f0115ab1e55a62564e31a95954372df7426848c6a4a13b1868c7159ad0efc924d98d886da92492668a8ac4d12aaa9198f8d3888c60b2d8e14eaa5099ef437ef10492952df641724b6be253aa398ad27f03529ef0ba71ab04d760b93a5c28fd68a902da1c8621b9ee870842561ee41a0e6425abac84b84bdd936dec273b32ec917eaa1f9504ed1909ee94e8c4f62512df71616cfa19906af723796b043ee21147c868cc05a3ec1bc5ee2c922c9ab86149cc51d38cb42044ca9ee2a4b5e5912fcf22d61881da4b4ba7c32e9ec8118e074913148f52a9705b079b3ca2cbb2e059591d086da5f0ee277548583916b8fc0f9502dded2e67f31b1e60f2212c52ddcb5cb43dd0a62073922892117dc68c7434b38eb7f40a0d1f53c2a4861497ac0c410242392005787e212a490e63161cdd2b9c860f26a3cdd04276efe84fa2064f1db0d27786ff5f041599e5fa08c32bc90bd898984eaf2e5f0391f33b109a768c69a717623a5a44691b7add783009110b07806ff00248f144311349689a4924d56288451311b6250347d5cd27c32165d96036686665a771466968eed89d1210dd9cbaad5c0b5a079ec184aad82499ccd2fc8d9236044ebcc32360af38d30b8f741e835ee343c2bbd441f0c980ceac701e65ea5abcd927e77ab79122269d8f0e7bc909b7a0eedf4c8db7b448d40fed770823b59684f491666209771e22cc5a8e2cd705666e855f2d5b6ec62bb53cb47d98867a0c99976d09b8e0826ec148514de776466c48e8d527e782696cb34ee13edb19cb279125b312927d8885f2731fe92c124ab2e79ea1aba381ee6e926ac70d07cf434553b06e25d567b237b1c2474177ac384a5b843689dc391f7dfb0cb3761244fc51f0aee468629796db3276ed23e599bb9850aa9249269d83bd890ac71c9642fc89aab5f70d7492f2e1bf430eebef45c2784b613dcceabd72122048560ee771bcb312099d99148c2d1cbb9875bf642bf8b0c180490fd85abf81d1d18e98204276bb6ba1fa29de2e4897c3e4926ea21937268d924d2d446b44aa9166ec2b1822d2ed66fa21ccb1318d2e85a18eb453b06f470224ea27c899034269d61452e9939e883f889908d3e69787528e63210bb17b113cf45642216b8bf91fee42e07092635a30d3dcaa6ae1498954a46a9c650fe48620c270b0d180f81b64d3f8d049cb15f2c6300a5de22c48459cffe45badc8dbeef45441cddbb61725e0c8d6b8f48b059661ae199b519673872e82b79a6787007fe452b66596d39bef8184b37c97303f8d4be67c89d997b17c0f644c422c4979f26df261173ec6499d916c974c208603e0b92c6d925efd0b05e3ec6a6eba1ae5cfa6fb2fb65e4958568c5e58dac4f380d3d89c537ac22f691a7bab11cf6127e024109f6a0ca418d4bee50b09e69b89431c56c7608b056a63ac29ad822176107acf2601131284ee7c1f5d8e884a884b1685c12b2c20128c1a0c49ac16acfcae6090da8cec30ddfc9f811d44f449ac518c740910244de19344c5a84e0751b249a48ab22a5e894b220448494ab73d912fa12496d9132d6e58a64ecb886a8c24a174af015fc1a88835b2e65c6f3d8286b5a4b0b23cc0fa682e248760f91e68c996cd4d9339744a1327fba1b5cd5ff0062b37bc199a4994c74561a8e57315057cb81b6b9f88df64b819643429d8d32fb21a925a564dc0deeccad49bdb91ceeeb0512bb28b3243a5229596645a919c8626639321eed16d6f3279e5b8ddb48e5fe8664b1fa956e518011ba1ec3248e1f224547be848c8973d84274d1314d8924924924c46416147f5bd50fdd0c5fa0f876f47519309b90ed360b044a5e3664f71c86c97437289104c625898ace71ab28bc6eea425d432fd084426da112c7942629c9b813c4d8b9a8a4d6897aeeaba690353be1f95611c0c61df236543115b4f73394bef309a423fe7a9ad17e5cd5a5228a28ba249be294e58db44d2edc2c9715109102421b85b4441733a149258b5cf611b985895110c8f5895ee393bf62892bade2b981a51c47433d856373039c49533f908472eb096d9631612d2e8f03684d49908c791ee48891e13e58e2d0453ede18d21c8b57b6ab7429cafb0e926a9430f662e469b0eb278242bc0dbb97098d84ea787814c694cbd846ac7044b25ac8eed91ba2382705cb10267a0e630b375ee20aa9705f715c40eb9281481bb5a18385123058c8ad91ac5f3a13ab47f6c4660d6d81c56f8127a09b903e7a9ea66c365c249249249189b92c108919e8b579684f0b68556bd71e8369296e1217bb0972f71cd763626644d18aa9b2264d608427ae2e386488639d12dccd3913b2d0da2492509291158f6893fc10c5e5167ffa33d1f60bd17b0eb91e09b44469ebb1d152443981f05fc7fb86182428c0b11caf7782c62a7047b10c77e26832fca84c9827d092451492690dccbc3ad85cd126137d94980f762d1f686f5f9817f9011dfec824fda2ff004df3c24257f6fb1a2f74346ef2fd919fc926e3526efba4673f6327462969dc406f3b824fd84b8b33299d0b50eb4e76f086cc3f37f63da7b29ff92fd16eb22dec585e2a0cf974776db926bb2a4884c258ae08b693c8824ce0c8ca189eceac360b91d66ba0db37c3944ea173952afb18bf4b5892448549595915cb753a8d4afe467f80a787f11049796b24d38621b24cbdc735be13d107461ce5accb498722b514f04388864b7767b97f388c5a4725dd26ec428210618cb58224d7812dd2cebaedc0d1ab2d61296b82027df05f9fb562cd43cafb0d9acc594f0f863b2d8dd2b0796cdeb3681608b0bc072b45124d6491212348de8952643f44d25b433c3f78aad1e86be1943a91be88151d70288b7193152428844e858e99129303164cd10aa3a319c036382f5b25607c04545745c17369eeb060b6f6d48e949903acd5902e841723b5e9eec42133004a50e592116f0aec69bb624e44e6d6fc851039b384f62e458a5e914798761330cfb21617be13b1ed9ccf742c5f105c4f27fa31fe6bfd21fd284acbbd8b4be77f82d21169b7bffe8adc3e60970aeffe0c4f0451b89ecdb1b6be37371fd8bdf3b2fc83fc9a27fa6bfc0df447bbf26d2ff9b9b28eca1ec7d9c19c7866c776d90d2b231eb6f45026ed1f0dd18d93c96b2c9795a2c685f5e4e8c6f6ef61aee425383b881422591249b98e7ed39d44edeec8b52f684990521f1cb84c22163713c337608b29e8212026f5a55d28ac6bebc0f78f1531ab2d9ecc7e110c2ad9b4dc760d9262085cc8553db76490ee5534a2f36219a702d0f715589ac6fbf92d4f3a3fe26a19214d6ab3c8e8cbb2c2314ca88b8ad470cb4638854af3893ee0d0438e473373636136f44686e4fbc4984285eef1a8d470473792132eb912cea164a5e020ee6b1249249248b017c984139b46a26e457dba244fe0b92eeee859e8252be380335e791be95b8ae322508489105872e8d8a3e46a18ac26d0a44436309149719f05dcaf614ffc91dcfb062fb605bc040d98ec249409b35c2c1a256b23796fa7ee2996b1aee43b77f459225e15d906fb9efb8c3335b5c3c4b6d31d4eb24934640f9c6d7f024a1da121165eed0b22e19abbe591b7fcbb3646d0d86447c24c9b48c2615c128d84a57f73fc17f73f02d16f97ec5a6df1fe8b41fc85a0bba7e84ac79dfa25d2f726c865cb78427ab7da8bde4fdd85b56478f648302ffc0304213554c4f2a4924fa0cdc9ec3de81e90a0549185c97b43fc0cfe59246a489b16c3ac56492ed9a4e5b241af51f84cd8689f7a66c1395c8dab6c206c4b2c4038b2359e4296333a28a34e8a461bf6b581219140788625efc12ae077b4446e260746845b646a98b92f93967bcdc68394df0ad8e19b81526c19b1bb1e0978a263039f771bad5c9d5a6a96a05c520286ae8bda4cbd611225e13c908c976c3a5248c424ee45dc22cddab9e3b0a2b3490a85220529b3bdda6c5881a2c492411c4929b3f0f25eb97b0de8b0421c7425dc33dea85464c0b1d3ad249fe7170e9259644941ac49a92606a2b244b9a084bc51ad8e46103212b916210224c41288e260ec7b8a3fcc24be20c27813b5fa1b9244965e2b26b0383229b312d2d759ee86965877861098275ef1caee9ff04f69d7c771289b4a64924924d550d6996032b0c45295f62bf4a886ac64471f6114a576f9040ec6490d094c904f5b8b1bdaa269248d924924d49b93436492354b3f96058ccce60417622bc05fb90825443621fbe73210641b974fe4cba1292db3f63ca49a8d3d8e842dd724efb8a4a77c891857c412b8f382d7f343dde5065fd66571bb414ca039ebf614ddd609b3163991691599b21399b6dbd5de98e5b7311cf23954d83b706ee5ec2808437b324d4ca129b421290d489fad898b2369b1924db70964944b0df2ccf1ccf51be119cc6a46a1346c36b1c8b665e75ad5a1ac21d278436b0a26c5be36f70dabf70a7ed64913a8d123fb972b9cbe5e08a11686ae91220aad7fc0e94f449912b5ac35911eed7e89755197bf0218d6449688b093126f4b259844a2d583794be067b8de6e30efb31a9e7a1251c0d97f6476473563cb78e974d76a65edd1ad2c312636b857b16887311b33d0712da0d73724590d24d2249ba946a4140a3db25ea73354ac2b611b4d03ec2a370249c25da8921d703d049e4824b31e76f78ee8696220528648b890a46ac265ee7b0e67a8bdac49249345498131ea9ea396e13c0d72c81db548e45144f9b7c283e41346c6c9b1237d0249249a49344278a59dbfb07bc9c34ddd0b415533894c515938f6105d2e9be7d881e70dbcd4cfb5bfd90b52f70beba278818ad4504adaa4882f7573221d6f6181e62bec1110472260825b32d8f48f658d23213b4638d0938c306465d852c68f72703048a58a57496da1059c16812a60df371ba24a5a09aed24d0db0fc6e03ab0cc85f714c73b4766a4e9dbcac3d8716bf22c89aafe06f4244941203a133a10844e569e4cf5e711dc8988a3e08d04337b9110c5ad3125ac2917b93d7c89228b89a946745df91a534defb1a6e1e0843432c7c8879656fdab7a993b8dd2344bf91b5ab8c05649c7fe38a9adbaa1b685a9a8eceab5e4482ba1aea8c4247753f81f4a13b1240b04b123889b482158361a76259667059424508dca44dbe4217d312dfe473c96df066c68c0e67b08afd4830303285e7118981a963662c27a11bc4d323990a8a1ba21e8423e4df1d84a49e904928158c13bc8ebcb697b8b897c89268913aaa136375a4f07c112e8bf74275e67aec2a86d24893c421da4270944436228530beed993efd0d9289a1c095124d49244e8859f211f305d8eedf7426ce8dd86d7726e7788fb1814daba5c42ee41065338ec41f8158b7f237f81cafca7f8c9bfde89bbfdc44c4d596052e4fc8dea7e44f0bdee5ba91a86b3b20618bdb58e511b4c2d9a50c4da93492611ec3a45a492e66bd7b50bb63d23b26388cf0600caca2ecfb8e571ad9dcd6ba113a2c24564b09e9246c44c686cc2656e90efb7018a56870ef76fd09e14f28d6ddc2f84a587c3214729641aa89ac224f7084fcca5c4a1b4e0344990c3105a36f72e56b7782db86ed654dfe48e52e444c49cf3d2a921bfb31c5dc2e3230cdac2f644b9d490ad8d44957f31fb7324689131d10c9126493d0c088e03125d2f771ba7ecee06564fb88eecdfa04a92dc7e3a5139edf81f5683912117029c0d70d6427657b104e574425643573b18ef16d4e236b68e04bcb1596a41e8888ee8d161422655c4289db048a4c36069a3477fb0411d08b650d1a516684ccc040ddc6bc7571b9091b639ca1315683022cd5c952f665eb5d24d483e901878ad5df64224ae679a2491aaa955e6b63c19488c8696a486a3f3b96a5cdd92313686c6c918bc6c9e8124924d151f97e07e42473fe458270825225d279816c365fc88439c4167ba6c7989fd1086a34f808894ad1e82d239f37b7727bb5a2ec919da759086b16b4750fb9524f14dc4c72596127913e865912d90ed029dc872bed61602857bcb36aac2ec229bd04a9912a9d362eb45bf22c36103beb22a48893d473395712bfba4faf81cd352d8fd319693dff0083de8999c898c3dc399913a1c112827293ee5e64b874d630d2e82323b3f236cadaf0c42b4995fa1e82b1bf83479a3dd0de18df03e5df6e27426e2b9b69c3872be4cf02f9a2e4b7c3764e5b5efa9002d9ec416817f224c79a66b04b14b27a6683975630193b35a11552b72f410b4b8bf81f52303442472462cf519320e42c2487a445906ac651d8badc0d8cb4fbb2158bf7516449d025b98cee5c3e1dc3a6f44e761e29922532970e4e4ad746c757786393953a0f64b92e3dd681090a8246a487382d4371f610926910a15ae6e4204cb549be24bbf369c381e14a5920de03b8a7d24c5d048c6237d52bb31cc93818a2105efe3f033761b341b1b1d064c12492493492454424cdbf98a3109dfef9a0fe5fa2267acf1fc9e69a277d2562371e5c4c783e28537e2a4c8ed2e9316499acc130fb8cdd41ef6451c449e870082e3b93b590fa1a1b1ae225584dc48942503775933dd940d6a3e42121de592a20b1af490662988ae880e1bc32c5707eeca8efb20f2f70d2c438d61e44a3a1a86e371efadfdc675537424ccb844c49262fbea1108d2732468c262729c3ce44251c4650a4bcc109cb2e20786a6a287546d8c21cdbaac96c88cefdfb0d252d4dd92f259f029352f7a204c744c68629a7e830a44a881363ca819097bdf6e876edf6f5340d72f82705fb90924d3dc81d8b2ef23c4281b2a36121126aab2c8f70a41a04881089047692756173d713d997504e5093139ac91524820999a5c60949bc0c8bdcc7d04850405906452d811f344daa5a09d1c91cb633c8d6b246077b923c85e5e104ad0f0249a210a86b0ea85bbbfd8c9e66eae14ad07a84c6da4d78823202dcd4380eca0d8e24935d7a9ba21313fb3eccd02fb89f62667f105aae2f7159778fb04ee5d098719332b2bbb6824384ef81c4c2fbb518c67ee10a2e5c5dc39910b4938424d889c54948700a456115490e478465ab1d2685d30b19a4935b7761ae934374c52283c50a897746ebff008dfb9ca68e450b0ee30862495b0e246d99583daa6baa6a069b2537a1e46de05ea3022193a932f1aa37348eb7217b21da4245f91beca88da51115169fc16b64b7a0892d260d506cd390c742756acc5d8a2766020a21ae276f410e64b18965cc841bc47612a32396e5098705daad07ae7ba1f42a2c8d4a4581625c90a612663d04ee464057dccf925285c758364de72e04eab082038f2045112d5933549c6dbb993580a1dce25e5ee28e34e5b2d504b844dacfe46d016e72356a211ad09718d858162712e4cf820a34c9e81f840bea6c226d24f26d97494c2b9092e97925f61288f827b19484d092d244434e842ad349a769cf711015bb6cdb920649d9d88d0b6652b9242d4781bb0d8c89ac74b5578254469231e3bf12ff00e0b1a7ddf664daef9206d2ff007b1fc6dfe8fedfec59c4645a253642385ad43f98d4448cda0fb1f38e53b87052706910aa0a5618d13ef148ae1076827a1fe720c3101da8c68224d1610824125108ab1924fd1ee1f3943c9772051debf06648b72e2ca5665a0bc41be47b68b043c40ec20e0305a448e44dd8691b31f05ae3302b14f3a9cc215a203d1a09cb919bdefee066a97bb71ba21cd2e271c2c40ab14afe4cba915eec2124f0a04b52fd8874a37a5365b912f375b8ea43b990621213e8d288810816e1168238c8e0938af21f1048bb6af8aa0bfb20c7d2b22b206ec8b04dc862436d91227610ae1cb0ab4dccde9917258c29e1175aadc2568f9921a3792d87295231ec131be18ed2422a4cf8154c4842640c63de8250912ce364c113aa23284f91897146fab23b8485a056c976973b1e910414fb0baf913a1a6bcb624751ff003045d17dfdc6f7c3c3264329bf1232ab6f1fb8f8a09a7f617633b358d8b891a6df87249f5189d829f61c5aca9c88533cb0be4dd09d66c3e85d10234e844898b0c7b937223090504db37aabf7327f79546fb610b54c8e505a2da1611b21ef1b1218429d9c6a3e51a86b3c1f283fbc4f2489b54786c873fd3b9065de5223d61c93bc5f8ee142966d9464103b7f10c9e96bf4499c88908a4f4053dd0624663bd1a4f26a14b98d1345d87cc918363e57a24b9c8976207024584726917b194adac6a59e1af71dd445c766393409e06d0e23a1bf3cd8779c99564d5342c4b57ff49355fc84989336344d4f2b62e3732751d1e5cb68825dc176396b3844c894968bdf61e805385b2d87b5489d08f43a330a2721321253e0762247643162d870e73b123e16ef4488eac5ab9fd909e978a21b343611cc8105cd3fe2a01ef4168bcce20496b3c7f34026a109084e6e62cbdff4128fc6a23d6b45bb53b4ce70c1942b869c497f744b488b103316f1039af1ee839a7175a6e450b730149f0a89b73298d8dc032e9da37e07b4a049db78e0c98e26c70415254b667036889f86e067252ad37fd8d636d41947813b131739476c1705c70d24511c8e6a4d3712f43189c7b2aeec899cb5ccff002324fd919216be563e44844a054af0a7492491f726fb1c8c3bb1a325c3d0fa4baa1d088a1097266d55bc0d8927abbac99292cf81fc1b3524da52d9c12c793f93e6848dc856eabc32293c9f3883f229518bdb9d89ff0022e6734e60703cc53ec4b27a9090b69cc316190aa8602d507a0de881a896fb429afa8bca358d5907110c418d9b86829c7239cfb4282c221474571a5bab470befb1a848665889b49054d650d129dcd618cf49e130cba3c089312f2bbb282525aead87150f5c8eb62d2fed112c8bbdf77233617de086af1e0c892bf6961aa4209b5ec4986a2a8552dc91ee606856771a25330f41095a0b8dd2267bfe40d8c94bb6a42bab40fba1f46953a2c924b9032190e80b0cb02541a7f29ee41843c9a6885833446612ae73678e0d80b6083ca426eb254259cbe4e26ef23b568ba868c45913a52ffc16def96236fcc250281f841094ff006ee4ecc12edd9864aedd0dd94c482c8896fec3ac21159ee21ab4ddddb704a5bbcca811d9b7ee76ec47df31db9cd8c4ac4d27ec3f91cc60134b621ad9a157253d8bdb758486d2db1aaa9249ac083666b66d16a4d6e24ba3c4209dfa0fd250e942160d26c34a42d70ee1b925a42435fb7e5522b9d36bc1b88c3b2c1ad3c7069401422517a9e68a935b4bcb142e328b899fb177cbf637486e326d2026113ae9c05b2ddb74b04e887537d0712191297ee45cd6bd2e63d84e97187249a30e30c4492d1f817c961aba0a42d902849d21cea952925f38a96e2207917e235a2e59602d2d9493a4ec6c7618b091a5fcc8e4a3289014d3c7d9a203684a220e1683612962f6e6431a120810b21e80f2498231acdc4cb17a4e44a4369347ad6c188806e213b136aef24989e9663e161b30d6c0c7fc909663d79d5bdd96e478430ac02e75b3dd5726048c16a21922421a13986834062c066927b099c09844a9288ce61aa614b7930332856be68236ada8e63889b56e4639b9c8cdef72398cf357ba342cbb07a0b697a685c17d8442aebe4820a2b53aad8e48267e07398737b970d2e75c7681022946ae58813d6382ce285c483ab65c233ff112374cc40794c29536cad4954c4bb44e9836272b893395352b9ed4c09ebe443958445bd267a18fa23d42a12baef41276cd7c15cff90c50a534df855b761bcabc3627fd3fecb937f640dfa36b55e44b28d834d9a5cea24b3e30b6ac9122b40848c6b79143c0e32e2965b7f204ec21bac95178bb1b18da55533f70c131871c727ad20c6c350c5bb517863ca77435589920ef8040ab526c9208a25e961a7630d9211cbf81dde96079bd4c0e3e3391e470c7e820d66b0cd2d2bf6167fe373a21e6e2bc82cea4f6ed25f90f26dbf72b1767d0dda49e53edbc125ddb3de808ce97dccb33cc1b29430bbd017c23a40a887ec51845e4223e53b08266411f1bf7a652477b32c6d314edec1214dc355626648b92b088384c914b16bda641c7b853dd21439c9a0c919de9642d33d85e086ebda5043b7fe019ae3e07dde408225224d2cdf72c28140d3652b6ae5a924589fe20bb37e16e4b6447643f61025169e27642f73522ac86bdc115c1b6fda0a253c361adfd5ba1b597cbdc4a17e3222fbc666b5e084251a29adae8796e71eeee89e2d3bb821644922fe1bdbbb89e469a6d3c910b4214b071cc6ab9a61d13493e77e0b99b90ae4a5b50e05d4a92496a31582bc3ea42347d8592c75c8b0ffdc8b29b71911c37de9363016de7f7a10296c96f31a8d0cc9d9188e224489a6a85171acd068426b0b22776dbe85c10d727a8dc6cb9726ba08cddc5a2471c61c557a1a847f7a10e64fb037baa5199194791cc21732610b097943328738b549634d46ea2eeecbd64b060b2db0a8d650cfbe83a400d35c971b67b0397e54122582fd67c3128b8c134e121970b214be091f212e62d8d689761e1bd26a98bb8fa63021120aec9d6c8dd967deab0878165bbd95e97b0fe41d8973475e4f3497af844aa2e8510682c112258cb448dd15115372376479b8d9a1a23e56bb10d105316f083906d48512236774cd5b83386ec7a08bc89cb816de6c9f0268d894d877a0c4bc724a5f9092f23668089bd498af82273a921dc54d06a56cc5edf378fb10f619b662d625d8fc90124afc33e4715d782092593bd2ed3d1903b7832d3191edf38f721e8bfb63a6f5899819bb1c35744bcbf48b1d334f7c9117706c4624766d7249347d124924d1248ea131086c1301af73de3f1179e3e50bd3bbfda89ec251b0be5fb83d44765d0ec2f97f732aab2b7cefe0630125ada549356d0483d8609a6ee6a315d8921dcb4884e1085928abfe23b17b0e8489dba71c6a1c7ae6898fd0a09ec47e00f6b64be031772258496e26bad320b94884248882084e21ee58bfb83ac0834581bacbfa16233675f610bb136d4c7349db2eecf42670a21a4697f223a687597e45dad031085d2e44a6fc8936fcd112f81d0ba3e544645881909b0ab8371244433e2391963dd21c4c1a4b55a89126f2242dd09221a852cf19f7256e924e37226548109313f4374422c13b508d8f746c8d519fd84c946273b9b0eb03e0e2cba878a2abb65ea4f32fcd5e258f27da62ba12a453e46bd0781adcb952f702117b8d158d491ecc63ad0a7c8d5dc0d608432ee3038a9835bd1189ee6b2c26e634a11b5a5f6d060ab2e94056337e5b14d749bff003307b78bec2159a313c88e12b3e1e83dac1a490f42c09b5fbf04311a5ec37b4aa49a4d1fed247c8d3622c61979247d315822e3c10aae424e4d504bdc85e18c28b8c63fd1227e3486fb1b7e473adc451ea6a23688d0781cff00e443cf8fc08467aba1242eff00f043367197f2e09230c9328710baac8d62230ef15466335d8926ad6aa22706a187a0f4b92b7470c433ef0979412b5fb3210442340f217c90e153a137133092352bd8ee3f9c11fee6688f2082ca57927381576ed5a549c7aecde68c554f0e13d6866714c5c7628d4bd8b2575e99ed57153aea973461a47d1104893aa16c09b61302a1a95944b20da66ad0431d91882517f52a570a5e6d122d70b1c9e94ca783fba222c5bb8de37d881c7797936d84dfd88fee46dfb43ff47fb22c33c90f1fc630656f13f638321496dce6c229f7b15b361604ee149c96291359d17cb270d8f643bb1b0b27f92d0bd8ac908d194b2159598fc03b545511b6ee4a6c490c9165bb8f2b05b7712c62386d5d10868503bba2b25c139741c266e22c9ec35cd11bfe45f60b9387b8edd8b85625af84fe6e35877ccb23c484882c3bb16d3484eee1981cb1343648e0a593325a9b247d5c1818d024337129af63988ba35191c5c563fd1167262196cee0d7663bc317bc889404536ecb3725b3510cce589b1941b63cb6ff009611d982f8234998504bd5ee4eecacb2cb159a0ec5e26ef69160a4b6af8128706bfb90b9387a9f106722af5974e41b5ae41afb86d32f6db71312f807ca1aeba702dc5ab07c8bff00585aded3129a7b23fb26aafb221fd88837f7161212704c1ef7b86fb7c9c4766bdcb4a5d3006db25226ff0088fe8434e078bf4e25bd10b519129c8cb780fd1810b3276206174911096c0a0ec4c88648d6c342524b72d2844179aa1c9e682edd0c7b6a236c48c104c0962a4b0a850d48da16d1f7c8559221d5690672e0bacb244e6c69234a131b96dba2ee10d58668c66a6420d229a4db5aec18c4dc24ddb1bb717c13418b244fc0851191edba69d08f6c9835832ae35530b7005def8135a4a0424eec8ae49d4980b702cd1aa2ca86954040b55bb85dcf8117d5d93f220d881c648cc9bd50e77b1fdd169bbc121b3bc29b2611a645910c1860b1809e1bc471c10b52337a60c6ec80f658d51602bfe51655e8cf59b355c34171771b5019ea3636486c252329cc144895d1e50a5fce3a6f2df6621c7e71916fb47dc695dbd8fc8ae20478dcdab7358c622f925e28fee349bf89f91437ff0038363de277146f9d053c67902cd90aef0c86097587bd0b753e5f4e6cfb84ee6892db7eed86f991b9e9f985d885f85f7393ad7a5b847f9231ba944ea22cebb130b911889d850b2192bff03e8ab5049bc27ec2663db62ff147cc92c84d60bc8c7826a94d174a14899a201106a414d69b09b8995d39d98819797a1181a85c4d1895f047f3578e843dddab7c1a3143944854214562c65a8847615d109c1db4360c4525ca10b71ed3104528439190d492204c525cc4458b6e79175ca6ae3dde8ecf834911cfc05c2140993522d464b6f344cad10fa391858fb1636a8463a798dd8f25c72cdd05ca2e45164d10a46e0bb21931699a206efa6c797f34e0182a31ec84fe2c38130882ec2a008656bdc74791785773b889ad8fb8e5a76de1904b93bc4d3e04b09372514cb61fb16225ca4a1a63db1fde10cef90d6491ded4cb7bc4a6f2764d899477e1dc9212ee308901593ce17c8bfd2abf642cbfe3d8ff00d1320de79cafd990a2da4fe52fc10444a12ec1293f24b216b76e92dc64c7a38d04896e40390e42d0ea4537f7131370bff48d60684b47b27fe00f95e8d44e57f522128be0522f212331f9ebdc3c9a3ec3cd5a8fa605d6d4504c0c85e96f925d52b733813f1ef8ff00c13962ff00de85ff00a0ff00d21394da1344dfd8361a91d861603d9f62380b6b6a45a5e62db2159b3e5965ab2ee5d81eb31391b090437a0ac9bd90b49e5087fe7624e8fcc8ed5ba6c6ea8305294491381b81b9116b4861966ec86a03436d24078b04f422e103488fe685b02d342a76a17b68493248434268b5080d10b09772440c7e6765b93d5e6b09be8f9910c6993921ff009a8999fb05ff008821a0fe9f71737dc5a9fd3b1259f134cd09aeea965f250a0d342081c2a70772382c317aaff42018e25df52122a06183d5d7822ac96c443daec9cc99146e146f903db0f093dc94344fe049c39588d65f6421734b47a109272480d8b2c17b889b781889825a687a6fec87dc694f09bcea3d10a6586e13873a9a2df8b17e50ed24ab2e5ebe4922d9aeb48af30b2aec29b2a3b996718fe4167fb1b6fb2e25feb1ae34db04dae4de844435243875a380d6ae8259f968245f989705ee3050d8bd9692bb893448f904f413a5824f4132c628f344bdc522684b120c96db1b8a968eee304a5166d5e50d25209b07bcd4fce31afd846209c0348769477433712ceeccdd0d60dc4a747b982ec87cf73718ea9d9217f843921fb0417d922b6f3f690058a3d9c10eb9fd59b3ef11d3d83657e0e37b0d85bf5501bb3ef1797fe888124e108ac151a908ee1a28942da9697db9108f07dc9f78ada64ddb78487ee35edc0b69442781704135d488991cae760f0ff40c4a58d92f5823a0e3816d0932e10d98831d1294842827dc833e8021a032afed9f8f06facee84d4afc215c1247f62ca623baf8322c2b40da48665ca44ccd3bc0ae5e11fbb64b1bb5218e4b3a2ad542692e84130cb18486323e39dc3e72f2814a37301a4ee364645097c19f008e6a8d065b478b8c42c5dae389a2263231622bb31b3f706fcbbbba4a21d3d70add327f04fdb4fdc4aecab3bb390bbbd36c3d5fe47b18e9777d04e299df8a1a36710fb75cf0bfae43f98bbb730c566662f5293e12593ba94896d5695f0272224116fb0e3c8da242a113804929b16d154ec15a6c41045152089d5892ecf238996fe2ce84c1aaf723d0f27f243ddc5ade042dbc989f2468c634fc60fba321ab1d707642c29dc5f832a24ef4c0f03fc42586c6dfb1276b96ccca93d9aaff0006a54e83c6dd0d1088441058822a4fbe0868074ce27058a961f3fba0770f090f2ca4a3104d0ca81f3825dfee4eb5213bd31e15d4ac8c3df6614a9f7103d8c9847bc7b13325e0814c993440b714178142859297742a9366a65d3436ee20c631c148fa518c7ac31309a44c84409629410eb98966634861bbcfb10b09343d8791f9a2cc93b80b7b274363ff00cca278cb1510c816f02b8b1da8869082e6a57109484e9240844d722476f671943decbd8751da514235309ee8571e4e4fc5ce454699d9d897b177f412e3e6d043a76d246ab518b4a0240dd0d10d09b02667707cd958e7b8f2db5a11a49183581d6f4ad3ab43728a1298fc08c687f28b9f1326342bdd8c4e7a0d19ccb254dda98b6e51c3ee17fb078241ad704b6219144220c0bcb24812428090392bc513fa35c491dd9e423d8789d82b9148dc26e05cd0f99fc40d147e042d8590e08eca5dcc491e766dda63dcd9bfb32008cb124e4492598b254093df6faad8cfe0c569b7e4d68971bd27963afc00da08cc423b863bde86eb42192f0863a17fed25349a7678323f21996baa1f4a4208a28d8866471e879576e2b31cf287b20c644d90dba8df71d16c64b43724c168dd8d6ff856a515c2aa0432b712c2082fcfc1c8fcbb7b840948e6279c227320ca89a4d4a363ea43154c12d86153b8810e14b1c316f09c9d477832717cac9f7050ba547b211fcde48de07a24416560c890b88588865303dc2625ab0e924108b40563443442609521c224e6e493bfbda2e7f0944fc7be31029a582764fc8caf57bb13f3edb62dc9fdee689f236cf08de0343bb7c046cb8f6be47bebdc857b6f817fe930b66f1af9265ae5d6e8eef75ecc6b8dafc93c257efc40ad08b68b643a48942d87ec1534dba6717261b763c9f2c69a796c681a6e26f7912f04b1701b876504312a15124629ca086acdba8dcb62cd17e0595346e24e0d3ee27656aae05de43df5cb25742729135634f128e111c209cab9695a8732485d10385b11c49062092248cecc2d69c0d37970b26ff0443064da3a9c62da128fd83cf684abe176ee5d8e59e0fb2642281ee2da58e231763334504e645f487b13a7ca1e68ca33a9125e57d8f3f718249fa6456c212108c51c910d0d79132a8c086cd7d56e2e5873d826ac3a524934981ad69ec3af14cc564d9ede46b34d435a0870d35c09953571621c688b8ab0f6718de74f269e6f11711411e5979a74a6a606df522025920552f4d1f308d13d19a1f371a122d77e212cf1314ad5321a266260d2ee84c890c87860a4921b2376c86e25214a245938512c40d8909ea249f76b0fb97573f0e97a9723a0a9c0d2997b2bb370b4d71366ae2bbf71d9b79b5b9b31099e26a980ab29985fc2ec5a3e59fbf6326fe233fbcca3c467f4081436635c44372dd9e8415a48637327db1453906db24ca910d4d7d8327499fb8f604760b1dd26552e432440f61282b093761abc797902677122d293c1e44a377f0cee1be17e646f0ac5ece19381b1cace564a7524489131364b24651810a1dee4e6112cc878bc0f21c9ff00d86f079097ed14acff00e478746339fcc724a10ff01217b0e6455ec18dc6eff20e0cc57631f2681db43579131497bd15ccecccddeb387c0b6d67a84434d4a3273bb6ef54210843451159041d8b317822c12db7774760b059b4344d2fa29e9b0d0ce1f7208690799104f0f7e804b81716c7065a360b34d6286226ee0ecc8c06e8f1f912ff00111fb11a64b1a3915e1f85fcec4090fa5190c88c7d247044dad1d84483c0c0d420a5b42c4bb225d31398c4f1724871ca2f8c95139163237019d82820ac8bf2281a24a8b024981981b85e690f195d7dd0945d872c719f66ef842969ed5de7ff00438c6eccb7158136dbc2c8a8a9338aae33c69c50de3b8963c8c7abb86afb09596d8317b18f911cf608e3e5b6fb10a9c2486dc3387b8c8c9fe5b2394584e1dee6e6c317ec9fe4df14965a5ec4f20867da1c39ae794725d258b772013b6fec7767db0fed220425a162121168c1125931f6a126529e450202499921a49aa0b6c4b6251260356fc2138df61272a8408891323b524917416c8d221cb830b07d8565687a1303d9b36c42539f8245b2102ed16c0584bb50489797da8502c91135aca66e61a433b8bacad895ac78f61d95a0edc66cb03b9e9cc2aa664d3867f7724b6c1918ff002c2478a210aa72d1cdb7610960b309bb8b1f9d7e18e689d9ec64c417bb924fa6d0d0d7d917c960d43556e1b31695f60c348820825844b2c5d093044170f0834f463637ed073434d644fa3b0b2db9256095abe56e17a508595484a2882c89d3101021a32c0ef12d082068302b4722a7163214ecb61e42571d1143045253a991cd849739a46863771e4b978a57ee227360966c3413d4b164c608212dc53ed2e42381308582420ee45127024684b73504f864417e976dc99af7dbb6c388cb4b760b32a62fe9d90fd20d7f4352ee6bb025a8d0b11f94928d9cca0c9635e55fc0b728db411a040b2b5646e525f062bb890319b1b6f2d92b8925a17dc9decc57b0d7be5083b2fc9df635f89b0b55ddc6b644b83edc6f6c6d42208239252b67dc4dafb233b1739844ea0ddd932713159a8565645e74093e5b390b8d2426faa458f5122f691f04586c57d0d815f2c98255113591424cc7c085d49b7b8fdda82d223442f469179b8853e62898c90f96bae33ed1c3d2d2f37159dc09f38278f70d86b0c62d0ca67d09c0d31ee62b248d849eed47b08b57bb6877a1f21ef9ba172d42dc98d0108923429d05a06b92dca10b4135ca1f0d2d6beb2f65b7c58c6c357ee4342766840286431a5091103746a2174e62d97282c68c42857721635d736bc089a6509badcb7abde6e07d08423bc4ac3301982725c4162499ae1c06f3916531bb0848598b1f2b2426d4491994e247c0b7624bac2b1327b092134643611ee17697a6086637d4844c11453a8dec266d111ac60ba348149a18f3105621cb222cc61a4c85486e5cb2868dde4e6c36938c8dd0ae148fb2b6ff00035647b9fa224949e72f714b62c14b691e04dd77d83bb963a3138ec1c2808692823e0cb8377168cfbcc312b7afd85aaa7f455db08ab0a5c1f005356b09974fe432452d5dc8c6a247f1cd2ae63b1908d413b442264ee1cd717118e45831a9aea5f6a4c93d8cec2424f82ede5c12b71a16ec993d8bdcc21ba2209dd1e0d11cc263c1dd04d0d356244e131b72ddcd490d3a9c6c4c3e1b89a532ec28417aa6b089362c421a969b781d2100e1b224dbb6126d3574364f4c9b424646730e454f2a730869c121db7ac09ab1ff00a2e9c3a4d1bb1261ee4c99233e8d8baac589ec21669605a668664ec1af037458513b3245641fa906e22c9d9bb23f5e225b8c59d9da31b4ff000bc08c69545a72a3c8a13d1f5c2c05f6a26fbb0609d4882b47af6053ddefd09451d0a889516658e96d050cb2c0b431b2e62434cbe544c63ca48bf22a43b0593761486917d8d52592351022e04c3a68cf1ac9a066998b51904c7946d42c18b46674169b303ecc45ae05bf12d5f922424603431cd8427df91942136ad5d0631be413be47ee3f8a7c913e5f1bc13ad646e4fdce8f923dfc159ef4721765112c3648626b6356e3077644a029bc9656c8d2d49ee7690db7718d713a26f525eac68b0d92b7bd1284ed61f2910cec4a2151a57f0a23c9db4230b543dc6de5b5251294a4566599f71e7ba714847af6d36e4c51dc406935777163c183b1a852444b069a56ca9cc38905590ab530e8b2866449706145f9744e7022132716da487070cb1b4d859331fbfee176f79cfa934931f17ee8222de1e47ddd9c94117d7fd461309fc11e0b24d7516f91bb0d8d978829b09237214ae22a0f6b845dd9285a4e558dea366a0855f4054712a5ab22b22344acd6868109544a0497632c06921405cba1ded2c316e311454bc426b04b0a1a20645e474d3a9d16143b9b0ba8a5a54e5963b8e095de9a31ce69809d8ac97ba2ec5b6ae225ec29e9c8de88839a4ee74f867983e5112e49f2a1b630d1f468761edf28cbb8b4ab7f019e62483d0419f21ef08dd8d236353dc96e2dcc99529983b4104ec4d27c56550df6a58683d0a258db2f4549ae142b7725b423b52f739237de8246ab70d1b36622265d585c8c1d8cd761f15e147b9249b533468a3cded1558a99a5970b613cdc6048ff002aeb382c24b0942a4d44a44b2375c0bee19f61444f13bdf47562f4517af88fb085c6c9a31f696a2b6e5702a443fc1f9126c650d3b899228ee18624591b035337612220499beecdcdd886205862c15be4435cdddc87b9343e8ec292e4925c370895b24492012435c45930917b1752722372c968d89a218e879a115448d085aa4ee4c1d0a88246192f793730249b132e88b5b69f03139a2ed29682252c2c079670249a24687b8c1636e68939fee11f782c42276ecc752067b1a32756e1cff641a7b8e50985d4c8f74e10e6d347f0c6bfb89b9b0a456cc06f750cb516e8589378c8d8224890a244ba6f4747449f4122c282492c0ddc913704d24ca976eecc129cd91f78799f9686c1a3e31a055e71303bb4e934522ee47263d1d134485a5a8da441b3a2c1543b261daa8eb876d173b9c0266972ec598c9a6a724fa2820912c8f8b406512e4366a10ce3698cb04ecfbad4ece81ac8d8420cc6cba8c69a50e86c272c62aff87fe854d8e768c1becf8161d10a433596c3122962b403e94aa8581aad71b33326090b05c1a5ae5b3469c9a32298c8a343115442888022d4a2d91bb881b317242975ca31dc2c556bd5de1f756ddc5a66de243c9376c8f34f9660474714683b2a676ca676e0821fca63f28907bcb0e0dc7dce132b1217bb6fc46f7231bd0e72317f829ba04d259b88c342e4925c33189ea74510ee4aa20436a1b512c6e90605218c36489d89a3110a20b8509d53b29cef1341821e426bcd7b49a29032f2355c0581e7c9d328d7b1be1b3cbe9626d7ec5a04ac95850d4f975107b05b94390e63ad4964b456a2ce6b22e04615e4422462d64e1b281b924c053746132f41a50935118932c95dd85afc13f8a1fc50ff00081b5fd80cb493a93b3d866f27e50d6b36f5c564c23232ab616b68ec44d2c89f23f43afa4dc6e76f6c4d04dff42d85ef4f279204d24c21d380b1459a0891a8dc139253e449a91c8e6c5add0d22f4810d3a1102114d45819180c04c14188a52232213a6379219966610e247534b0aa4ec990bc32479ca21210da82d474cad99f25a7fb0273ef746024d794c8387f86519142a35dd83c276637404d0e6ec5fe812175ba6948a5faa492e26c724aa891b40da952b227101dd26b28430a1a8aa729890603143428d47146344a343cc164422541e43eb409fd941c6a2ca14511610f4443102380ec4308d1d0c91c6e4d845177099c85804e992dcb113434312e09e5c9cb6b0979a8ed923350a6469a9a945ac792121771a12be46a77a23c8435a71c1c5196de48b0760fc52660c9d848c2fb1cd191b2d9e0f1f63815083638c3df390e424b13c0fb180874c483ca923106ee64e94262d9dc4b06d8eec1ac4de914630e9269a08b910b8c99b0e848a2477379245eef1e164499a4d65d1010da8adabc486da43d489f9fd9636dec17f735dc44b2ec11af36874fba0ddf2819c63e46b19a3cf88412450f2acfc171525ec8d1dd3012fee8cbd8d0bd2bed9a89e8926854199a4934924d296ea8229022d46ea866741caa18cc4699acc8f2a68ad2464c0dc9f76861d158460635835891146ab61d85c104573a0dc2121c2457310872e1288b6855e6723b350e84a2e49095bb8f3663d649342b28911631c941212556c92650a4cd4378379857835292f10d3a03e7398e427b9224927a1629dc3214366a268161123b873265c10a1300c438276728b108628914cd0e95d4a0436624686b42231b23a94c930b3b63d8868dcdd88173ac94761110c6709c922a298e81e69958c73b5a09bfacd5fb1171452234b030639eed91fd81ccf912dde92c62c2dfec1276493b7821691dc2c6cbb2e4ece4502441ef41a1dca35574a981c33098084eb343d013a1be898e864f4cf44d649247591dc561b1a072fc76616c5888e19bb449f72832e2d230ada12d4d0c8642122ae6cead62ef49c7e8f806061b24addd1866bd8701b3d4974b1626a9a8192492489dc9b8f71ae88c62e237750e0512dd6330ed6e59985910e3a48ab3d95924927d04c4ee3c0b23dd0cdac350b24a0611700558575230cc99224416d0c63370f0b0c8224ac710acc998d5a909d06a898cb0ccd26536e2b2515c04126e762193db2695832604e86dabc9a9d4207fb48ad133f226d277a48bd1da2fed06ecdc7644252b5287e48bba66c644cadd1628b123690a666dfbc768f69b13ee596148a5ef9343654aeb8b0631335df71fd9533b42f724912c92491e443509a124f2492891b1b2687d0323a8924bd1d646a081a104421a42fa0e6ff0072672e771185e0767066ee6618849a6c2abb835d89909e42a64135423a20edc4bf23a1c79a2a34a8cd484e9b64a4a257445249a4f526b35bc4884dc49723c231ce6607b191c897b21c0d46534c0eabd1ae88ada934e7083664b8a976bc938489925ef094832dc0993312b13811d894b852760e5e1a5966658145b348309a523388683f4092cb98485a84734c90b9966177a0496d225328d4716211a88725c3776d990e6643458cc78839db200a1bd52267a50dfd87cce6c4d66169f762d4ef8e866e84ee86e27ee1ec5d26dc6ddc24a09cd3c9643c529e076fec4bfbcc10dec21b6d624c546c22e406a70265c38771c7c924d44596ce1442921d1b249addc218d8919e454820b6c38acd1248fa1e13a4d191240ac34c3d8fde3119862639c078ab34e50c95d8311b332854ca68321934863e621a98e430f5548a58030df4492493ea265d61ce0d0583410e4a185b4960bd427dcb2c85b4cf03cef62452ba9ae10d20890e8fde923d342e01089a4922c52b90db621e18e150d0d71a0818b7a8928ba43561304ae4bc8a566491746ed0b225212b512c291250357ed1c1f987fed0f6030b42a5d95244ae0ce2be42772af25a16354dbac0da36c8869b698ecd1a412b064d67e0b094924dc544c1588070fb44d638cbc2b66dc8db275b3416b1ee2f1e2470ced04fbd2c9138bccc40d5accb35c75db81d155bdfa15e7eef963ddf3378dc567fa1ca3fbe139ec8848c90c8d8e727645e869f71bb1492285b561512e8e09a27924644d892d4b0c6e922a475c8c4edd3ad7dc21d8c8019078a988fa18b161bd6c6d32ea45be686da7299a05aa9974ad247d51d13d4a923a4e4224aea605921bb0a8ae6054a6c6c6b496a60af67b0a703bf766e875a93bb240ee30944e0c0c40c45209a2e684741b00d6a3d8397a0e6232a06db1b09a212ee82d909670586b4c49fe85d949a06bb87a683686ed437e7dc21eee88d2e02361d8436e8f2f1a816e6bc9abd992961250b0ddfb9357563511ae8c99931a0cb4224879d45e5f81a148e7b43dfe4440aef567eef8c37abb5f1c19d215f3bc8dd9761d3de97d8c77d05226dae5bdc2925e1cee77978edb8f52bb6295286d44c8c594545b6a2092d10f6e58a91462a4aa2546c65fa16bd85822e349523a229357d502ce470589246c9244c7d37107863c5152a0d4ef6301f41ece845bb51878a79177cd8f604cc7b814c0134e7fd885a91f28d15ee313d572e4b2696ea4e8989a888341ab819089a938a264649c25362748e85c4ff00e86db5842c938e7fd2cbecff00a5dc6fdc30fc02fcf9fb1bec009f897ccd8bb10e45a8f4a3bf45d021b54ec244c9122593d11ea4d0c5d8ac90b9f2f432c61517d4657608d478a46a484d8a249259e372f4b035289a390959284e0832cadf91e3413d3ee0626f65a26c89915bdc933b88c933370ef272677c32cbec47f506a1fe0914a2ce06c96f6fdd08496b092686b7b9749630b089df62fb92a110985c3f6217432495b084c71bf45882c6e40952152465c926936c934b93d4f41d1d2288db83fdb0682cfd84c2fecd1d97b4430b177291e437c0fc0b287a0cb7e17e51b3ed849e639d873be4875fbb25885c6f22463db12f1ed848c2bc056c24896e4b764d5ae26106e93d33d762087d28591daaeea44ad56b1a515529b083d43a3728ed9738f80ce936fd06ab40e63e044187be3e0ddbc5c9bcbb6e2c2726471cf8bafaa9a49249354334c6f79f91514b611fc6d237bc54cbf6662d2361ca646c4321b6424d88bad18ddc83212410e6dced40bdbec072d898b71c8591790c991bad3a2e3cf603a58ffe5c4207ce5da248a57fc8685f3a978a2ee262476b508916c3dfdc665310e949881b6db7a99440853d125a8ab2497aa821eeace2891bfa068fa189757915867b19b5496d6a989190de190ed84ad1b101d937171f21cb2dc367331aba377ddb64418b364c22e33ec8bb12b7777b380bfca5998c99067d8216a29ee49a3f61ff002a93612ca0d2fd78f474a2836187454438aa2239466d5f8319be53f6169fc093f21250f4f91cfb9322065d8db8940e5e3ed04c16ae5fbfa892492fb1c0ce13869f6896e20e533c1687c029461251fc5e0c226c254591d404264cc4c8588cc82c859c31384317c8adfe190899d49e95a8b7221721286f08b4421ec026c950d993c21158413e622e6f6ec496afea065a11d44ba218f674fb6601a8496e48c262ac5249132491ba36683148e63dc5620d89b098c36388ea926924f4cdc68b90c925b91ca6e86581b53c4f76a55220b6e64f77b9bb17184e0b6e479fe60d785da65edc5ee5b61a48b29d7cbb0c092db068652c8ad08a8f74643dc4bb648361beff00cb8d5c5bc1996c17f4d0cdd8e9f7659362e70186577be479ddf4324f5a6318eb621511192c6113c3810c27b0d869890cff00903252f71addf25d96ee1609beeb0ad591a2314373cf8f42697d8e51cfa2e33b072a25b48ea371ce57ef478e820610f15820637091fa41249643f45f209350922052ed8b3946f22d9bb85b205ef411364d62e6751b50830ee8bbb49eec42219b4438a7b95d3f18b17231b1aead01bccc864390e522724766166af406d780c9d13b39153ce35276daa81624924bd249249ab64924d8651da2e44a15c886782e3208121d6d48ebc2b88efeac55eff10ee359780fb7525fe48493ff00581ec4c28f613357b1761c094aef01c474b7dcfdb08b1342cbb417cd7c17613edb81c92c28c979b1238d7cc9dcc46d3dc79bfdc7225b4f5e0823d218d45c7d08622492c264225963cdcb00de4ec29a0de3f28bc8f2887f2c1dcb8da06a37f7253b5a5abc1a264c93f9247728dca3bf4168e116e109e8abdc87213b8bf4c56290d90410624dd4dc4cd097354b6ed43b94f812a3526e058f39dcac6a58a1a0548841c09ad69cb124945aac87ef312b2186c61879ee74b583e1c0c319c8b453918e1e3be48c352798a26525bb25b8dde949db2c438265e4c90a85d2b9717441dc3104101a5a341290931dc5dea4106248b7a410342e8b74ac343a6219b262daa421ce353cdc53aba098411c4e5896184853a8b218b35934da64913083a488b71455cd3fdc8b25b37699118b19511dec5bd86c9cff00a761a49910b8ff00013356f613792051bc3253526a70bbcf03f5e49e88e9744ce0701a8a2174aa2644cb6a4d9e6ceecbe496bef6bfc1221eda57ec49d7f81767ec6606d7c2c8d3ea629723d0b5606ab041041042208a413aba85a160862f92d6bee1b19176e503348dc08bf3f83c190eff00f850d58d61a8b4840ec8ff00340a6037bbbd2796bbfd941cd0f08795bbadde4772d88d6030c5ddc542c0684ee26265bde30c87a058b6f9a88a4d12276db16f5a637440ec4d6e2a374944cb1cf884e11372f34ee586824cae6a3e28fb9304f44924d2c698aa6d4c54819d90391a2688825ba66f9a0628b792e7e800c72f91ea621f2361e7f22388afbb163511734c64ac684e30483ad2aec7db1a5938bbfe87e94f10b36ac3c93dd72c9ed0844ef6074a66a76fab6aa82f02d4aba1c3d34539810a635b2bbb16c8df062f548743a219041148208a4522b04548229148204cd08d55d86e63ef76de2426151d13843b6822cee85ee0f60b0a65193aa24ba1862a30c32d7217447c192326d6f6249249247b07f88c3524a1c51ec84c99ec868f4a26b2b81df01ee91b551443a4923725854421b2668d90684af20dd862604c9436a7a1237724641822915b9034cd1c0e084d18a685f11c2178d0b6473ff0647b0722712c4c3196863558b274b55dc7f40d9133892f0263402cc8ba93f1a91a980b1a50c7826e5ec0815a10823bad35133bccb25c44cd98f634094590f6deff0058ea98e1299b2411d0892454135c8433c2e3434cfbe48b51a709b7ec62ac39bbba45208a474da904091088208208208a3311fc6a2ff253f0027aac5bb4fdd0d63cc9f71ce578944020ab070f14dc621ab0d466f658e8488326341bad618bba037b42648e12a20648dc340133935a3e931d1411442a2e4123e55550c9b509f638a85c583bd1dc424b52c78a4d1349268b3046e655bc9e162ed63349a7720ef3cd7c8af3c2b0d268b41077ad5106496913d10bb07ba1926b7cb5cc2d3ba1f6ea04a1ca278de6e445244d6c5c8d24def322a24d314f57d45d3ba91268ec443888c5a68f2dfd64f4b1276fa0a8419342136a4e68ac31e5b7d91aef91148e9823a60822904562899e0d7fe7825235cf23c84ae5cddc36df5dfb63e06092703f63f8e5c4aa62148510d5c4e50d0aa041ee17a114822bf6889fc8f4b4f60ef3ba9828789771b121b1226c5ebc22e21606e8997a5cb92208e4496e241416d4626f8216c35b63c0a1a1ca13eaeaa58db30a259349acd2c4889e8dcb532ac44f54387916dfc89ef1f23dd628e1c48dd8a77c31584d30d36af6640b3ff1b511951ec6278b350779f03d7f1069cae9d4a4b02cb72d84d68c6ca94bbc7ecd0dc49fed16e892911cd7e0472703fa59ea8a21d657a4a871d82b8c5596b298dd2e1edd31d4910411445ba605b9d89f085fdbd1ddb1b91ef713e82c7f63258543973eaafd846d7c089e41b34f4a5238127cd47d8d1c5e5606108af0f3bfd94086c7693a53a4cc3c77061c643242c534c4f2c8ef423104c9784ae3dc69ab634ba555ba48cc93448bd5c9912a8b922ec423a22b6acf031111923a8aa9b582c863dd20d44bd8485730e5852ea84c58895325a450c3216c087fd19469c5cb425f67fb2c1a6be192b96f7cc0ddf6e9d5586fd3b0d31a3652ed0a7812d273ec3dd048cc06d9604faa9f493b0fa1513a30d5a8837258259239c69c712eea199125c49e0484dc207a016845949704213c9158f43052d9b773309ddb76a6820b2605e92f689682f782830984d070f35202c2b18b10ea69f911c4c2c9772e605efc171252709f218df29c7b1dc7752c2308c90ac8392761a9f289a60c45de74644b960c1d7ec1a49db7842926e57bd555743ae8344512ea8c020844aaa1b1bea756226ac6334f4aea3b52aadf0bd7ec1f11f01f01a1061b22c392969932016e09b516d84f08659bcfbdc5bcaf618efef24fd82743d1a463174dfde05534d6e508f40ffe5210acc6b5c510e3d86ddbbe495679281170028d1250b28ac094c2e0c1d27960c0bb9171f68284ee6be2ecc8b77c5584370164d3d96417427fb457d88dfa2dc0ec9cad6c250dca4520bdfec7f0b48fa191a5a01051a93e0dbc09a066f43d85b0f643a4a5424b972f44eea9ec153c77a94e4d62a4963969a8ab2610d2324e074cd1743208ac5659040adde43912b52da9645ba4ba61bd0913a2dd323634a58f9b21a8744bcf04589489123b5311a0d58c3e032681a116187a6e7390e519065c4bbbd8e736d15eec247fc65441513b51911a218910c63eda12d597cbb3c929a32bb0ac5921bc083985c40b8fdbed493209f025294b8398ef2440cb5b32e6eead948249e1a2d5f622e9fe2e4244925086909222e77637e822c37344bbb3fca255124c4f5b125bdf81044f7522afbfd4489216fe3476d84b461e04169cf6cfddcd152497454627d695ddb20c8f6458dc9a2f91c8a3520b522884ba57444d23812743f742e5c81f7aa824c1e0f145c9e49e8948fd046321b7144e189666f171742d48a22889c04068351aec4761a6c6c0d99b32faa64b9ffc55442b0e92276a206a22634368b88a6e463bc0a92890bd6d5089862205c0b0ee6d0c5ece972e48a73294ccbbf091797f2d28c38dc451eef4a532c6e5d649ec1a63d88b98f9247c7e3a190a247c37e46e5a5c8705078a3a92211d514d0c154f85118e9dc825322081e58d3d3e2a9c89d6c5895b5124b131225ef4669eee99b55a121aa4743abaa748ea5662d8c3bd4fa1604cccdbe83658ce191eab09f1e9b488920446832e96736adff154524cd4910133210f076922c0dc04c4b646c434a772f6d18959ecd8c468ec93217ac410fa111d74a50ddc93cb1e5a05928565e94a48cb96364de289d8c3f9222f61239113703226ab6ad5d88537b9716780dd90b9da97e448db7d36aa76e8d1771e49ce0d719176308e974f61d93634224926b248842ebd7a1343a403a5faa5d2e5e8fd64ec5e6e18c554d665ed409d55407b75ff0021c414cffc432dbec71fd8737e87f7552d6da7921720e32dea24395f5cbd055ca899e9587160cbe7040c290850a59781b0c4451fdcd45100f6227eef5b5dab94872f49b4bb9cb269aaa2c128907b0b1ba47b5cec8464925db221702d08dc98f26c59ba2979a4104115930307d1408c45f7165555e4338da962546fe91b1d89b123c88746ba574c7a686862c13aaab4335c94a8e814b3516c7a096b048d55212d89ec4c9511ff0096a9cd30586554c3d151c182462f13394e02c62d52948fe04c192f88eb921b2ea75820ef49abd289c832f7a14a878c3e48d3b9424472175b52bafa0c45cdb476764266e12193fccdfaa4c0d5467cc2265b0a269b52d7db8ee3c363743e942f4991481e46e69022043a589fa2547e3075b7c9db520b009691d3a60205894721ca729ce73f5452a450b03ff8f9aac2753cd5b082297eb036eb2c17a93d90994d1c74ef442931ab9a4934816e6c739b2fd18383658f157d259205b7de2d0bb814fb1e7ac24c564b2ecb1c0cd6c613fca512ef3e150759a410d5a86a3153b9c5d17a73d6b4eca4a1b077666fb2d3bb26925f0f528c64f12efd0bd0927a2e7dc2dfa249131d2082190c4c34411d73d69b23955ea6886d876c68490686249050fb924890cb989ee779de771df4f7d77d3c8f3ff1a44ea842197a217b54e423e9266025e62472e4d30ec36b696b19659281bac08458745f4183ad8bbfdcb4139e64349690df65440d7415e9b10998687ec212d2d39226ce5b1b27a197ef843baeb557064219654c62272c6d3d1158aae9b8931221d102424362d2f45a96228d0f048dcf4bb22d0374758ea823d08140a1293bcbb3638912264ffe8c01ebac88a90c43d2954cb208bbc415a4092b30bbe2d3c384493bb1c099a350a44ad588b17620e9bf540e3a1ddc24416fa3268f0c5854909e8b78a6f6275112ee37c112c3769a1022166df2ec8957c2cb1c37c2111cd7dc64e96afa21ec22391e520b26318cf8c38a2c2a3a0c8264104566a899e89abaaa48f9ec45e961890aaea865fd28206bae3703659e93dfd2ec2b90422082c7820910eac43ff8ca8a8a89d15449850ab1d3e148b64c9639ab3135b7b358637696b0b05a4204252c0e4a4b1b11a6b2fb0e2899a348ea144c99348918d9364be891bd5bcbe12366284dd4604880b83d89b4160240dd075233e320b9adb1d685abdd96bac7b211b424c36e8f32435cc43a7c6ae0390eee838138eb9aaf452a488c7b48a45188747e8c56174c11d44cc580243a4d17919c752b5124d2110974c0d4d32bfe1aaae94ed54223d50435d097d60484e59dc72f36422518dc56d05cb1ebb7339c2acd969c9b625e174bb88425985a12406fa757724997605a8f636058795ec2704748fcd5c8b373ff002c617cb669eacf068b63b376359f2645cf54d32324319bd5f09149b9fd87813d70410c8eb5e87cf4a8ab14c9031fd1bab5d4bac17acc8ca7d3964b27a9a184ff00969898854c92344306e242716f2530a472f361e1b44b7658a588e6d5c8fa5b182807d78f87e8e4d194c2577b03e94127f2848d06c2277117216533a06d63e043335b6f522cf3a06ba70bb0ab58b425b5123bce8b74642c8b0a6a3b49d8d0a6ef8d47385c6b618ead24daa71554927a23a90dcd60704e7ec1535aaac0c559f466ac54756e04cf412322ddefa46ae657d7af55098aa4be09b2c482525096887b82bb33b13fe486ad98c60722625d01a42756237793b9818e147dccbdf3d1852240e939afe1459f342c3168580d63da0426fddb10470049445de0d9ed5eecbccbcd1ae02ebad65531557dd20b77763c7bfd826964e28fa5e1c133919ed66f5588dac97f3591557acfbe11a902228fd77d104323a1989908a1649249c3ede8411d30410c91dc470317d217d1ae95d02416204f4443d5908072492e730864e7896198637d3645f284615bb072c95dcfb20b0db792190c91c427686b296b264af04b31ce686c926e4923c7b519439c174c5a45a4354ede8371f742789b20989a160b02a4782fc2d86f89a54cd37290a03790912c7087d1f275f05859a61a32f5e13492c5ed21d65a69ab3265e524dcb722e86ec84cd45e9a2c40ad3442649226cb972e5c8208e6b63c52dd698a18c9a3c573a4c60ba0d1322404966e35d11d3043f4a3fe51516299131b7481b8262f245c9f3ce46eb04523a6110881092042a29b1aa02a652e3b2839b18ddfa65dde88938eaa857ee055b60d5b910dede5dcc09a614b8c306974ea6b2be069d1b2d54c311280649ad5556b55d4b14434204412d2252386a4b937a2c116a3aaa6e3d6ac5d2d566af5aada9a31ef5c099228c7d224d18fe817abad74175aa2c5571fffc40029100100020201040202020301010100000001001121314110516171819120a1b1c130d1f0e1f140ffda0008010100013f106e3f4c5f24ed289bd48b7b3c9f90875ae951e8c7a5cb9a7cf332d822a3d2a54f4ce188f4ccae874e657f8cff000d426d9936873d9341f64c262a524a7a9d6ba1059e09be96ab771cafef01907b5ee543a54a87451589ed8f79f44d67f3503825ea69fa9b293b36c352d2c7d47e35984259d0b607641388763ad5e5fbc3ca57bc24748f042cd40ec865a97e20cbe970eae604c43f0b612e3c8b2ff7333605b0ed8bb3771b6534d0dc132b6ca1a139b72fe55d2ba547a24489122448c6318912307427510667c8910f9ec20a83d306757de25299b81f8d789534650310fc43ec2e8e6f8c54465dd174658346b06eab87c240354f6a96ca8db9225c708572638168acc6052a5434418b7c41cd860187d32c465a69ea15524989423e1293ce1308e50441b2bbdc7a0ebf3a3afcf4b9b429ef3cb9de57e152a57e29d1fcb1d3bff9489b222fc7d4e02fd9713debd2c0caf99b97c1f0406aff0028c39cf610d0915c454a952a260db79adc33e5eaaa71294bdb9eb837351733d4ae1e6283e23bd040e5e88eb27e6a5d4023b04c1afd5cc9288beae9073e9a6d01e51a947d1729edb3447eae15423e3876614e098edd160b72e370d7e24210e840e8753a1fe03a93fac59ebcc0bb91e1caf765cbb6eedec417bbcbd6bf3afc13aa462462448c631e800b58c62751e581e139ef2db5117d896ae58743a1d38ebba2d6e1f30f3de8d054c102066203ae6f6b16a2acb6ca72ba2710054087b5b098199ddcc0bfb388dddfc20d6bce2b5dd8ae6bad8a72da5d47b0515752d0634220902bb29c2d3b9994ca8d663c4aa8f989acd7a98c74e6574ab8fe57b9c4d32e90b228c38fc2bad7e3cfe0ff009ae67f0c7e16cee096f187023d4a747dca9b158d2468d0a77c20d605d503995427a51f7650bf377bbbfc10167edcc7b9ad5ef7b7fa843320c3a0d76817f05e28f4cd8be6fe2244b9516b3a943f6b8fe6391f92dc07e88129f2f913f47d0b79eabea7e2f40ae81f91d0e95d0843a90843a1d0e84081310556ff009301b3b30a26988a5ded180001475257f82a5747a546287317a311bb8c63714ba8c054624621645d899e48102881f810dc3f1c3d5143edaa7ea1d9b5dd86351627d4af981dc7089ab9527814712c0bb2176073b4430a7a7e936287a081ec67de6a090a6d2a95ca56e60b155daae5e0951558b1ba6e9da228f1b605dc1a330b258d3ee7fa465cde3dc9b991b30cc1ad3ccdd36ecc00b22b5f8f6fc323d0ebb1213be2535cf47ae7fc172e592e5cb972e5f4af129ad33c10ed744ed4f541779e4c041dc6270a61db9e1942b098eb72e22d0a7d97cc12ad07b62e196a76e40f67e2196b716b3e18e401a61b1621659ea0d68025cb65cbe87f82e0753f33f23f23a10e86a67a5f421d17261c13248b0dd0c8caba1fe2b88372c79259de2c4392792318c291a8cb1b63e51088e16356cdc462a636d5c01f35118da9d2164ab87f8698118d33494751a4cf79880e63a2509ccb7290e7080aac18e23e638be045bf9829bbb8ade8952009558182024936d5d7783b3bade0765be4836d3228f78d3c79703dfc411981611b29d371c8a128fbcccc3b904411b197d653dc81de91bc88c3087cb08a63e623602ff3aff01b92200b48a9b3a372bb2545aba579ef3da7b4a77653bf40e9442bb251da510a0d75b972e5cb84b97d1b7a1f8f3d4525b550018265dcdea7ee63cc1468aff0d7f8ab302075a9443fc0743f33adccc3a95f85c2fa92e5f4be9988ea908bef2506f6ca1d92ba0a95f728ec44f12a24a8918911891224112241005dd5abbba9c4d89af41fe1119516662a3d89444097664fa950a5f5994eb2f1b62dd57ff3887c7c4ebe010daa0f0408095d2ea7e50f4880151b70d65dbb1070b26028f695d53a3956aa7705a1383e0babb198538a94778ec2f989dd701bd4fbee476ff0afc0372e1601764a38354f690b821c19711b0b29b134cd036993ab2587224f69ba03b32bc56f304411bb863f2f3d2ff04b9835c12a575637d79fccea7461f992baf308743f1266c8bacfb81ea000c0183f2c7f84a87523b87e07f88e875210fc1d40874b8bc251d142afa0466592c96746eb04492ccf6aca952a14dd45c5cea129e95f8d46318ca8c4891231a8f41b2f0cfd2fc11aea753a2589000e8a95186350a3b7966ec7baba86e80bb3f6cc78f51fb8ad82ddacbf6f5752baa4a869bae0d71298584d6f2964a032ca361e6ab860d150dce5b6533e94a52eb9592ecc7dc66ecb3923c95a5a555788cda5862aee07922ac4f232e1f318ecd4463de28568c8060f06fb5ddcaf7b6a340f0f7399820088d2263c90da671c5cbd915ce84a93b04ad8ecd4a9420e19dbf1bfca88f51bc5172a262547f17f0a7a9f8d4372cfc330ae8753fc1728d8a058a587180e6fa3fc41f91ae9703ad7e0740fc4fc084212c20c3f045433d4255aea6aa64eff0052b05e3a50c3f1254aeb9841404570e6bfc4c631e8f458c4890454dcd31da6d00b384d7a0810843a12e3596b8c42b2a50ba589e0c788b508eff713ed2bff00849b4a1a739e181d404afcc194a96cd9cf198d1028a5ec656e95b2ec4ecc004a0c534bdaee42166a3139400290a98651a85b78e395dfc905d26d74b308e1455bf62a9508312603dd52b3db4e8ec7b4b451488708d8c74aecaa2d0abaeec6db641d35d85e9226f9e0b0649cd134aaa09ba62823c8bedd107a034b9e95f95f405cd74b35fe5ae94fe27e242733541f8f32ba139e942666097f81f890952c6085ccf6e95d92965fbcb458e2fd41f090a96f10a7e21d084ad75b0e6092e794b5a1950283995d31f81b875204a810874b875aff001a757a2466631b8c6318cc9ab5696a4e11517d0620fe54c074aeb73af70688750a3b040204a812ba057e0f426dc7276bc31d2c5eadfc8c28016d75516aaa40f5acd24d1566daa51a5450bf76bcc44ae5251b92b35b1874dc1194ecd7e9882e87128bc6e06e2c94a33a12cf778309a60efcc82587b2c5a8526e9258273a55e2ea0a2978bbb9251639596e01116546773a67af2a60b6e1c4b25fe24d8f313a50a6b2f44f39eb44ae823729ef03cf43a8fe7c7e0744b11217f85cb215149b60978d4bbe2107a67b7e3508a9550e5f89ae9c30185301b604610332a518ad7195437279934e205bf85405efe2b881bbbe880704a2f52fc4a344c740f30c79c4a59250453087e3cc3f03f33f27f2aeac48c631891189123d19b46512b11ca749087449b7a0eb55f8a4a810254e212bb7e552d25c749c3b8a004156581ba097a80ae30c2ccd8f6711cf3501d2cbb085d8302eab770d6cc517796f30b282c0a21f6a86f211d242855ee8b17bc544814cd3cd4436a2577b7dc8aa5420cc00c78bcbee026e01d12f5fcda65472afc45879b8c5cc0cac5837c4060425d42f9ff15d4254a98afc57932b582e6b6c0f8c30f5acee164caea11513f0574a37d2ff0023a5b5d099eadca66252d62eaebc41cd4d0fe0741fd984ed1a382dc7a51d0950753a07421f85d3d0ea743f0210e95fe46318912318c6e2448c4896c63a9cf45d10a295b50c0a11e49770095f8557f82a543f2a23d2a76e97de0ad3712c7c2f4c6a33c258f6480c3f7c2b0f295737be117136c6152c4999e01b1505b0d76171ec8558da1963184829c6eaf0cab84a06c6db1b98dbb84c91a731055de1f8ddf556b912cc398a63a3999e614c626dee5c63113088f799975d474afc389de52c465a51d73d54a3a710e8c21d2fad42c574acfe14743a1d2c21d3642152e5e7a5f5e7ea57e02102e9ecf53a0743a54d1087e47422ccba487f84e96acfe552a54a8ca952a24a9518d4624489047a2f19c7c4e62865962daba824005a895fe0cfe55f8a4a95d1436c3eda77aa2764e236f32a98e62161bc2bd3534ddf44bd93e4b27ec23492081bae1ae196efbbb67dc42b25a0f6ab56b283dad7d973d8601e722d87923ac2681c5ffb2594e6c2f751430c6ce66a7cfe2c7f274fe4c76354f1b9515f171b28eb513a66014b29d0236f4554a7bcac42bf0cff008712c3731f262962e8e6ba8cb97d6ee5ff008c9430b12c6f34afc161d45842255fb84e3a71d0df435f99d0e8740ea743af130509440ea43f03ff00c4c6318c58b148c62f4088226b9c56a15be8462d868b926ba1f89d0ea75e7a574c74b503d80b66ac79ba99263b6045cca39ab65f83a5046fa54af1f835dfa7a98c3b78cc500b0f0c1aed15467c91cc282142dbaf432b7861fc329df686f18769e3fca6eb9118ca6e57e150fcbb74a3f0b97fe0b95024078930ed735fe2afc0fc587e20616efa9d0d74dbd201fc4a86a30e9995f81073d73f8103a11d4a172c08324257e43f2b972cfc16da2a5bb457696cb637125790624629e630888988b95711891822743a4108043f13a9d4fc6a2816b53efb2b13387fda2458f97fa25100f054add5f50e6b61da426fa30c2bab8bc9b68a85bb568cbd779537d10602244b9932b02086921c50ce4dfcc0e5186b112a65e601979f1f93d38fc9e585ccd9f99f95fe44a057b90fccfc8ff01d0fc29e81f892ba540c43a25be89a7ac1cb2e64abccbc92a1832ae54210952bae61f912e5c1b8928216097442d91b842593109707820b9651d3954f8c2e311466342e467303a54a95292a51d6a211a88746351231208208d59d04087f8abf0360ec05b355577753bc5d9a8e0d06b27f316e48e71f6972847acc007e0dcb8dc511bbb3d904b0e5f2954559dcb9f0516d7dc1593f4b30e100b03f305c5a8c56098623339ce230a0a72731b971a142cf241144fbaa8b1d6ca5e498fc5fc2fad177e6e1af64232a1d4950ff00357f8195d2a12a574afc88743a9f89f9e26e78880623d75f045642cb1a420510668612e0f4a404be9529812a54b43ca53cb2bcc26d8076819ba9a25fb15406d0c91c88692a54a952ba12a512a52e511baea57e552a54631e8d46318c631e8c08c52bdfa4fc43f2265904a74cef54fdc464dec436abf28cf1181d06de80658e21287f81a82a1cd435d024a201aef1bc59e2737f4c75f1dcc41791fabf6406975d72dccdc93cc15ba71a89428bb194860b170874e442704a7f03fc95052f32da82eff851d184e7ff00c47e043a1fe23f16ba5fe152e0dca988b2ded015cc1616c5667aa90ec3b472e071b582d003d2ad950be84db3e203b74710b667a721aaaecf70bae9508a9a269183d00d59362b17e907a0c212e1f99fe56247ab18c631e8104749a43fc4c0849482e8a1a9931f82d8d200b34d423cace0a0c12fc1e144a3d7e4f11b42805ad72caa4d9ef05208e5600a86f712219a459becf723ae0cd76aee6a604f2102d58ef006635d73991aa30f34cd44892ae1fe52c1fc712bf13fc874be99ff00057f8082fa040dd62372db843f1a201da51d43a2e271d184de71c9dc4380a1a2aa88b69b22944666dae615d497d2ff0003a9d2b5ceff001099ae961d487e0743f1aff1b18c63122448912313a8cd1d07e66a12ba0d79adf6f465ce535052042b1bfc9e509f425c1b49f87cc6f3d1eb9e95d1a952937e6e016a3c470408bd5c79ab88298ec2ff00b801787e997e89ee6a0627565c4977195f8130c7b4e07a07543dcc757fce747f3f44ccb65ac2fbf4a80bfc980b2bf1254aea712e8578200ba17060db1d7446b70745445847496c1abf51b048eebd06fa9d0e8307af10fc0839fc884187421d0fc2b37d4ff0544e95d18c6318c63d4698e13a4e81f8843a30d076bd14c652a674f3028fc2ce87c01cdc4e051c51702a39f79801f867a3ebaaf5e654cd313f03512cff0043c4ca8bdc7300ee622deca8cec1d95c07f997f4c6506ef4e1fc2babf85c318a842907f26189e5c432029dea08f4bfcae5fe05bda5f885a1732c0fc12128975592bffcbc4e002826605741859474a8c05957860761d3940857e07421d718e972ea1be9cdc25c3f00c408e45210330e87e47f86bab18c631e8c6728ccfa04454e93a1d4e87423a618dcff0047415ef7632f350ba0c381b65dd285fb1fb9676b0074ba447f823d11ef5339ea6489d59719dceb5131b5b229655f0d41e1007064428579b6b11767e5513cc25f4978fc2fadc0e832223040c292ea37d4952a54a8740fc3884afc0ea7e07f94fc4e874e23c74b8eebac4cd20884b5109706aefbcbfc2de970a8752730ea753f23a250a7154f0f4cc3a1d2bfc8c7a312246318c7a4460c3a55c21f8032ba13f4a20c56efae979ee851b1c553541da89486760afcf0fcb26bf6c0213ef860dcd3e9fc262d155e8303b1d008fa9c63f27f17a3133fe2be88d283843075cca95d1c75636ba9c07dfe57f9938ea7e17f91f85dc3a1d0ea7421f98c23a8b31e94b480f30813350e865fa75be84be94c257409afc484b854b9684cc0accb6d8746eb103fc95d1e892a2746211231e87a8c0ddc57486210fc0812a13f5d8683b7f074bbd8cb0396b1350e3cb77f9f19a56620bc1f890e234d5894a93adbc30f07225cdefe57b4a4c25340f46567ab731d1e8756546275aead46a3afc04c8ea5f4a7f209502badd16fe47e67f8ceb7d6fad0c99abaea7e47e4cde66fa18200332a09c4215d332a540b87e0412a6263bcd96c770ce091391357426761be51017fa23468ae86200825872240212c84b8740ea7f9dfc18c48c631e87f09a7a061d087421d0213e2850de074691fd0455f90b80312efe42298b919986d8631008c0a663f8b0c3f063d787f35fcda6afadf4ed31f474e3aa58900003f160dbf86cff29bff0005f436d5172e6595f884cdce7f23a5423d1baba99bd625460525f454080cc95102a27924b14ac2bc4af702f61d3fbbea3d88a35fb12cc07d7eac5bb7e2682f6a3f96335ee0e63be007f823dd7d100efd293a9f183f963fc3a838df19fe030959555aff008083605f27f3c2b7f487f6b16bd008643c4646a16c577575208d27412fa1d0fc0ff257463d1fc83d6668e821d081f804098b794d5e8e8abd7a653080017b822c4f35f92c882bf265e7ce0422979cfdca90bb823290f250fc9eafe4f548f4be8ce65756c6592588dfe37d5fff003df50ead6aa586637566ea20a06f15d2a54a952a54a7b4a654a9508a4f6225b33ffb91ed657ff895b76ca8e6769cc9c38b0438f27f31ec84c6bcca288822121ed7d2bfc112e6f4b292f939583add2f1fd8c49a4bda252fde7fa85fee22575ea27f981ee17148abeee2a5bc547fa9fc3ea477220a2da776ce77e4203a2f826465b2dfc0175019b530b57bfd0e5fe2751854061ce60742074095f8075afc9e8c6318c63d44eb2ccbd7b4bc210fc0843a1b3f2c4c9bc3a0fb59afd7e74bc387f21ee104c0c57349c0472d40802133fc90eacae8f57a1aeaf57f37f01accb3e5fcaff07f33a3fe2bb7f2b6172fa595042279413b2de989c2680b5f8a8e9b63d98ed432d7ed3b704d9ec961f4d4479f75184dfc56c073fa9773fa7fdce17c687917b805afe57f44538379814707f3fed96da0f46762fa92ecfc084b167677c4ace511254480b51b15b6342b42f2f372cac56e2398a3a65af4348a025b0199bdf4ac4c9d0874197729eb45d296535124200cb1aaf2fb0415ff005c2c094aca8152a036740e9503a1f8e654afc5eac7ab18c4e87acc18741087521d0213f6d3f49d325f2c55e8fccad46a0a39bfcae19c74e28e67a128586e5ae56f50009cc047f17f3663543957f85fcbf621be87e172fa3d5fc9fc8ff01897d2e5cb60c723d1f69b0c91400282ac917d07c2fee29a09578bd41e53e899659e2911d221fb144c42da1f328387d4b2542198b2de616c3ca503164c1e82d54acf4076e21565f4f895e2532a012811d9890242526d82c56cc40fc154db025504094c32c06c46aa257cff006ca4ff00b32812a540813695984a95d03fcb5d1eb51231951e8aea334f490e812a10e8427ef20af53a22abecd86e6a2b887e59a87f26a2bafe9a9e4eff006c6363a51b04fde06a54a952bad4a8ccff00838fc9632fa11678a84b99a972ff000b971eb7fe3be972ff0015c9e5fcf84abe3ff4a9ff00cd61a85b70ef332a3a202c1817895646513044821474b4b60cb81e6521045e2eb0f30a5c4397343466556fb4db752fc4a596d4e6ee0b0ceda829997702578840230d166cc2d2fd214cb2c101d896350b625c3a7fd225ef6fe70254a952ba542540950952ba5753f1a053995d1fc18c631e85e84d9551ba97aba4ea742108421fb93f49d18b156bfa87e7b21c7e56ea6ee65f6ca63a28f330a69043480724542053b55dc147c4a952b89512e24a892a8959952a54ae95f823f87cf4be84b7d60f5b8b2e5cb8b1867389eb5c18fe2fe17d2ee0f4673d48cbea54bcfd0c5aed0f8bc15c449b812ae303463b9714060cc06803fb968625a001db01e5c106e9607e18fe48559709932014dd044f999b5cb12196f0330ad972e00f2c5d5fd1169bed899dc52d1ba4cc515b2ac60b43e396101440aa392d6692a2e178f0df24089656f899183975829f351851e1754adc4d7627cffa18c5adc1166037718257408255240ea233cf46710254ccedd2820551b26604a8baafe04ab1e912994c0254a9505832a57e15fe26051d58c6318c58bd0c496e866dd24b874a840c2e316438160427eb4fd274b7c507e6c1b32b7e5637649747087d4adb72d3a4f3cc11224ac4a951257454a952a54a952a54a952a27448c7a5c3700732aa114b48b187a092334510414716cc3ae2d4c5f824d4727ff2116d7cebfb253065ed60a5fa1252129b15c8093b76b92b3026028bea1fe437f81b65fe152b10671a0773f4904e7fe00c002b067e654daf781a3eb640bab373f9113c4748497005b2eee2320aa818362c959aafaa4c3d15aa82ada354345bb65cdba203034c67cc7b4b376e994ac3bef92dbaf904ae2b051000315f22a3d72d7dd68d4bb85b685c200eb90cc37c5047624ab38587c08fab20ac1de8398841721d8285dab0434d86c2bb69ee21566188adf00b622edacc1b36aec2543b05d4b6cad95df152ec80d5088d414a202e89699420202be253bca778054a21040251d33d05ed12b557c4a15c40b3823817544a02d95056e9b88acf79512710331255cd256604a95f81fe17f07abd0f5247a8cdfa0e84252c0300daec4574e203ec58a026c26645ab59c710195147b8414fd0981f4745fdda940b0d7e631095f933e1cc0f1817d9100aa6ea24b398466232a54a951224a892a54a952a54ae8a951952a246544eba12e3165cb971463361e4a25bb4f8a0afdcc814ab01fae84a54f7d38a43fcc74d741021152a09621d8fea298e06e8a0025788992baf779967c2cd597717daf0c3589b117e266216f273e6a32562974c06fe4978cfa2b2b5c1db9db05f6ab390efdb8869410ad0e3c44a59c80a6fb0aea0ed41bf0963282acbaa392b6a2b89f02aaaaab555312788ac07657682ea0002b673732524081dc83ab8038be2ff00170e502234563c38c90b2d476ff688fde6fd20a574fb03f40198687cbf9183a4f6887f841160f6cce6015d895878453d7684d9395254ae3aab6885d4aae9825907005aca548de10fe7281c98d59fd5438ad600e62b401c8c2040b28a77bc44b093b20650b69f5926496d57c5f6941a14ca09aa814724475509d84d066f385cbea73e60542adc55fa951e0315af074a810331841021d59e18be89550f210419a316968fb5995095d0fc96547ad7e0c518f431ea69373a09708456b3880e2f963565e0730b4e6e9d402e466bb5c62a054135e98c3707e7a4d3f2b03b8c2c7b80f1500cd0ac8dd35ae85087f03d2a54a9512575254a952a54a892a54a891224612313ae27462c5e8b14595e79c458dd331286cd15735028eb5fe1fea19bc41038273fd3014f15125531fc0ebcf43984e2730e8e125408740950c1d27767d90c2523efa444c58f80dd5f89596199360600f3ccb75c82f9622818386541958293b9c2f8256a0a2786cff4115681be0b0776551849de39515f15e818707d87f8098982f85fe56015f167f08f777c8c0421650a8f2196b98d6842230c7b5a975281ad8ba160e0b1dc0fc944b92e19267631e03bf354fab98c2b6175bab8c0e4f256e9ae2a0b14a45b74ba47b3501b81353e3745ff00011dc87ce612944fe2b1675d5df0b1ec801c29e4c407ff00012ff502093ef4fbc46a8aa5dfaf746c86adb545be916a98b77455717fc4d31b1adf104474c9d5566be7711df4692b329861810350695374f28bca2ca9502047a04036884fcaa6de706d9e2086d66844f20cb0d8ae2b7e6bf8bf83d1afc0f51fc26e74107a1e940865966f3b88d5c2b121c8dc9d04aa6228f691caeafd1ff0187e48254f8134c5b920b5463918398254561d91958952a54a892a554a25092afa54a892a54a952a24a89040bd1e9b3a2cee8b2e2c70263e1b0d5ab94d5e393e5e0847846069cf6d3bf47dd3185d5cc13b22aa66918fe2744fc089d79865be87435095364f127f342a7e7be5fee5698577525b6f35385b391840d2017c1eff00302d742dcacce3cb289640ed076d683d928d889de3196e48339e94e189254bdd7edafed2e0b2d4e782613e499b686dc889f23b8107fe54c6a6d37cabf80e5989eda60e570f56877a0fdd41cf2b148ff102412af079cc1a56d517eb413b4e20abbe56ff0089b22b40055a292d8f502cde07f5814b3d97da18aa310289819f548b09577d18e18a6ab9033f1b89e1e73e82011684abef381cc03ba071728e82dc1452feca9502a12a10432ce583eb65f3cdfa2243a11cd4150330b0d2f9e0cb4ee60abea039d59643141266aca6e1482363f8575afcab3d18c62896f4a7ab1e87a8c458741d081bba22e086a4c082e15407c432ed21f0a0b60400eaae372b6d99589a741ddcdffc7f80a98669f904b56a600f6420ea420b3da3f4fc2108f0f78654ae9513a67b0f4172a12a544952a54a9512246244a8c630b1cdc6523d1a8f1165d112e430c52a8b5566e888050a0dc42c0c70af83ee0d4c726868fce21a5f10cfab067adf43f33f26310331212a7135656dd87e98bda7c6defc54a194362986cf922510295ac5fd4b24d6b846212d57d06d104cb3d788025cc544964a8401351916ce7babfea01577b9570216c78e291fc439caaff4d7f480f0d1990301ab82a683abe0c42c0d4c23918c0a4ab0201a6624e0d4774118e6d9df257c310b003e4961db6ef909c050caee7b78676254e59f365646bb67ae6699a786211a9c01df301416710586d327612fe076d99734d238bdc733e08ffb7ad96b55c53e8bf4712a14b0a992e3a860ce18ff00e26ba102040a813ef631380e5635957323d85931d41a370135e0cbb44a5aa86a08a8176e610cba21f057e1c7e4f576757a318f4318f5180b19c21080ef3160e889f72d37458acb022c98c929369e6ad8c0986ff01f132565e2e6bd137738769023016ab411146ed1b3ee2b67cd042043e2ff00c8424078ff00c652ca09bad8dfb5c445c370ba8be4b89d2a54a9528ac077c3fc3032a1b12dd4caeeb6030596239644afbebb9f4be9529e952a54a8913a308b18c5c40801cb08b5fa40ebec4801758e0afa83fa5e66983ee295dc0e522c42d6b300a1a3b2a3f2460a8d0d07a42e353e0793b303292c30b4e54ecb98968aaf925dc1a29ee6d18c25c1ae832e5c1972c94e90f48e616a9706520461c330800059ef8809a8690772ec0e6595a3fbf315dd9734de6c2a00101d76c274585b6c2010520b5d771a8b88908a5d305598d4a5c026441ae4889159115e2df695c5ae5357e2153e5ebe2ffee10cc0fba28982dcd4e4eefe234d9857d0a88d03718236b8a9862e53a7ca03df17688556ca5c1138606015deb27a66bcaae1ab570bfc228bbbdc3cc3db3b55fb4aef6f798914c13b98e201710082074092e1032d6f70a95d42046637f47178b0e95d36de25fd6225e697fdc1388858a12c8eaee3fe6d890302f982c22974a309054b1577f8778fe2fe1716318ca458c63d6d3ac4da8c162f2f2edb12c6d94041163da16b4d923165565f7f371ab087018455e89af4a0351d3ccafa0722bfed82c662b56c4c6698250d0b1869b6d57f86a7adbf883902928ddf78a84357d15af094ca952a54a8e250470cfb25faa14d0a6e05e83b214c194acd985afe6a54a951254a952a2462511da5fa9559d91d8aa6b60a46053b04462c052fe68b80172a052d5a422416e4c94815e4ab86c01da58f883695e97f32771ffaef02dda7201fb854c07dc0aa9f713412ed6e60dbbe20860e616f305fc3954ef5f74ff31f6eaed6c8bf94c28f62f88ede8b975d05f59ebed2f52d96422c571065b07a05844982198b7068afbac28535535b7e965d740f04307931e639753046eed97869b3cdcab174c4f8735061836c8c5516cbbe8742843cc2da6569b7e205aea09715c303c905707cccf786130c448a8160b11d422fae810b6f8839be84ce6169c1d066e1ba1620538818e970254ac9880c372f43c431213881d0791d28184516d54ce121e405a168cc6a26d90256d2bb61ddb0b74e8c7a6fc38818600ad267ad47a5df57f16319b1d091e87aceba14b02d60abcd6e3431a332abbfb46895bf25041a3605822801bac1fbb8a3a8476e08e51e26a7ae8ffd228c30e973c75451b4876decf3d143f309eac88677b8610c2073d054bb4320f7254ae952a384d2391fb975c562822c0ee986bf72e07b5d0f2c090a19e45f376caed2a54a95125448912d880ec6073d1aea3a221887572d0f852e2f293d2b1e5e85fb486051536ddcf5099633d30740c1fb2d44b58c0e44d2293b7f32d601364aeed199dccbd21ee080cd50930de952c05ad216fa3ad49798ad6e1a7460fe4318ea12a0cf485750496af24d05e18ef379b8b648f0c684a32a9865b19f458f25b849c06abc66618b6f42590a85a2595858cb362c426100147ff05cbe9996820dcb37083695662024ab82a58ee98c6e024142db16f6b4fd4bb3a10166e28441b6601f514d209575e27a8617322a5f82b50218f4a44c436c70dd7a16a8c44b772b12b3021121a2060326645e62eb894f0d7c8854177d2fba7bbd8810d268870b2d4384a0ec6290e7bb2dc5d166caec30ca2cafc1a6510c6ba3f83f83e064b10470c7a31e863d0fe20a5c5cce43d17412fa5996e0454629202bc450c8d43a201975054ad2cd44914652d3d91982cb09311eba517d74b3313a16628734a95457ddff000d477068316bb4b6e00ad8877b951314c57fb9e952a542d62622b516ddfacc5c80bab71b2e5d2977a31882d5814cd900ba014023835a84a952ba562544822ab47b98c3c52ed4aa8b84af0400b66a3c57532de57f3135768210b37d9b081640605950a3ef05109c98938201ad2e0df97a2252d34f48c5d29708ed208a2d99a0c92d757cc44107ff009b92028c6141b338108eaa88edc88a5c18421f812ba9dfa102304a986b1d4d10d43dc3fb2a1527bb02ea64070c3e087e5030f0b8b2a0cdd70ca0746ad840d5cb36d454dc105dd8a05e817035d6d384b3c91822f12ab6c5576e57de20db2ebe5ba4b37302d408540b540f6c2735eb2b02ac5a2eba579e60e3e80c99ca08e90fc00b6f8a08ba99e28fd861cd005a693bac33f111dd46a030a95e698e6fc6406f032cc0166201abcaa893b74078b4b8e085552cc06e0eb999ae31198e8b84058e5881596e8699e13ee5412de9c07638998108a95083f7821bd65dbc16912ade55149956092077207c40c36c4558e25533edde0247cd69a844bda79d0b25f47674632babd1e9a7dc54c00046318f5318fe2184a8f918836ac9a40cc40be00a81e5ef06595df2f7545c2558018fadcd96656e442200550ef35581fa2d415ae631705cf7c1fb870cb8a4e5ddc477ea8b60a13bf1724653960a22504056503132922041be02d8d0e1ff00084ad6397d477ff6d92a0ae58304a8933cba298ed0c92a2150224ac8362445e60651ba85685fb20f2fdc82dfb080952a574a95d047a8c8c50a589e6528654e2960f0e7ec133be57af69660376abbe67991b4506a368d3b419da2f63ea335821495440baba6c8bd398932fabf11b8f078708c56d077b08b652bf4c1c9759403b31dcb3b3a90210ea575a810c20d40838206611e9ba1c6612bce9ff56e5f9b5ff50ca00fcb2c44769c3b129b33aa2e6a7c525004dc2197b30232fa350103385c2b2a28ce5ed1d5fda14e977c071022a54012d70422acc7637fb187608d7f3698d3b0fa58b1b8aa93b08ae5db11a525b4352c3ef52d93a98091543c4a21015be759e212041176f6168c91d60702d7e7bc422d1ce54074298bcc0002616d38885494eef7fc099b3ca53e5b8357172903f6fd4bed53f682b2d0c21320e82898fe4e8731584d41cce3a6e318e3bcbf6c72cafc043432f64e078856db82a34f0f967388ee994bcbdd9a25680e6c838c2013d302bd4decf048b0932b23016a2c994c1169bd9d5fc0313da51001047226463d42e620dbd18c63d0c7a8cd262e16cb9170cb945e988b2ee1159aae805f1c1f4cedafb41ac538eccb5e8fe643f30b80257b877f2d1763334f0e4f2f31ecb4c0bc0d4dd74dfc82bfa879566beb13be7c446616732d5a0589d096c9b5742c7ba62e16e820b5cd426ed6556af662353815559bff000843e3112272f6fa9853a673122beda3117040254b25448cc56a5a64e8a95125449512541430b0a50e935572b650281a51492e6158b88a5f03ae96920035777ca5199312a2533a81d0acca65e68a94bbcc19228cabfe640716f95ee10144b05234d72dd1062800b70c3dda31b67c4e1874186bae98fe1a421383a2a97048b151048201046356abf8a17fec8aa1cc73c4a2f3e082ca2eb72847606bd3184c50af64aa6dc34a34c35cc3810494a9cbfa623625aba6d0a17bdcaaf48c935050eca6e47263933954b7aaaf0c1d890302ff002a250a58466ac180f794d60f4971f2d8d547f675fe13917ae4ff00285ffd128342100476154e32bde819612a59923cc56fb7e82cca45056cc9a9414a8a65842fa2c20c308a1585a0acc551d40ef2c21589ac4a3c8ccd2a73d2ba0622c29143c22382e6e8bdef9631391a8775de103fb89325aed3ba9ff50c5dab789565995651dbb0e1b82bf8150c92a24a8f460046110d2083e1259a477a8f6c55c04528966c3f506df0d52bb1bf6d3c6b42c07418c63f8882e0a8dff9f70b096b9a8695fb4af7ca53d948459809aa1fc91486c06e8729f3c4b6d8b8b63b570898144cf2f68c0080669887ab4c2a832b98c24daa36975f175f4ecb99192efa5726896a29b5741395e229455b3b2fd7331ae6f4c751a256057c33798ee57f6478554af17c9dc8dff800494e037fdc266edcdc0e8cf828f4a952a54495716dcbc502a76449528952ba24482c4988624f85c145e66390dcba976cc232c42267ab156116e03eea61e108322bda53db683c590b5a00416fd441c371798f03063ca4bd9f278609f13861ae8398a5cb9ccb978ea0e9ef2a54c6a2227bc321a444499bedf4a019687d2b838b475c99623c62cd1e3bac30d1ad008bdc6ec920ec479aa263e52b151ea5d615db95c2954d0d077e1482dc472796aa302da36da6a31821855b1f995d9d18a25a6ff74c355fca7f6d9533ff00e25497ae8b6181a57ce4fe9322e361925e160c240d0785143ea52ae88a61a7907996093282764dc78216b362a5da91e6369f2ff78abbbbba588c48dc59b636aa749e53cdc05446a036b0e83a4330097965910311fa8a6d2a54c21d4495aa879088428fad68fb800d60d1e0ed15cd53b3b4cb169ae4f821d20805386d61f370236d0acdd47b81a98787629bb4e4256611d88ecad4a818e8cb8f4652cc6cc5c96a5b5679635f04388c3db19c550b560096426d84d32bb5dc36401c5c2dbe21658b12c83a8f4202d8f2d5694d17120ede487b892c60216f3d0e096a0899118ce189a0becc42fa9cfe98f77cc56c6029ee2e6989c0504bb183db2cd45b450abb74cd9075077fad31d2c815a3e0c15ce1247c6119a4db350fbaea18e6b48bd17e9d076306cab29e48d9f98660e42568be1fa42dcf1fa187109411b4773a12a24777d2aae37120177506cd191150254a952ba24488ca99fea1a3f3343e630979963d16aa25ab709c4b99672cbc319b8ed8ad5f10127bcca25f01ca6aa22ecba2c978de6e00ac979768619913786f1c4210d74b4a861d175d0c2c10ea59b454f34536c5778b1dcc5ec7e8c4f299f30f0eaa6706005455edbc4aec0ac3b93c3c4552d391dbe86e35b735ff005996610028169a75a976ae6aaa7f4dcb57b45e4a9aac4caccd5d9df57f70c4ec87781782a12a78163e65a514b46580d2e385a014d8961fd5d4a477201028ac83d83b3996dcddb004c685d44c2c0e25c85df6b4a1655c14500dabbb6f44b018d80d56c07bf7266f2ef57a69a590590a1145614a3158b806f642322cae5a9962dbcdb64bf57160cb59e672c30840d35c88fa4a956a6f9988274c73776178e854d27452a5606162352e0db32bea1a625152cbd44c1020ae6a30077dfd1d0427d94ccdb96608f55393c05c41e41e62587aa83eb708b89aa295eb83025920cde18fed652b8be20ac4ee198ec5469dd953a9ee53188f946f0f9860e8fe0c16ae8a58f46f313bc7ab87b5c6cd7232c0d58f771db585d5d0c4ef29e062f37e982350d1f2655013971494ee54b804a2b23f32aa2895f041d777a262fcb1ac927234c60c6f45fc188ba80e309757717290a1a55c1de17ee9ba983b2e2b5be889a908021a51e277025372cc20a43ee54610b4d8dca3a03025a28b4cd20df7d439965dd97f10f27559975e19783712a5f3d3c73146586cb040af05344a3de985aabf35f9724e17842a64dd4f0cb1095914cdd5ddb2bad7215ee0c74a8bd9523ba84a9512c808462462901952ba574a891fc02ef832a8d9dc254b4235733d1348c877a81589ae860caaf9881d402c184bd7687b1e2c54e740525eab33bc52906b665b6881e6562f12f4b68517983d148e10487e0065cbe8b14aa2c58b18a6e6b7fa4b82bc88fea128f71abf70824141e09dc8300053fa3b4a09d89b9f9a4133cf08d3b3989b9ca84e64b84a18aab92f0df1007551587a69ee9443bc3edb8502694fa1425aab0d3edb58a9956ddbe9461895c9bef60095b35415f046642a5cee00da3bc7c67377587a7e205586351d9864db52d6252a47b6e789b4bbcb9f6fff003a21b19cdacd2c453982c311cbd01597495b1c43cb36dc4b8a21019795ab25dc2ab66f5c93b3bf48151ad14119a37c9517942d20b7d894d99c9c42115d7ff626dd0967863663c8c38dd975799544529e074a7908370a14b20b41fdc3621812c9bbd67104e7ed07b232b64b00b4273929b8c12525df128c5f8acccc0d1e42fd922d0220899118f46240bf28bf508ad1b4be8345dc08a551405622a5c517abd80976e8dbe0a8576544aafa279e98c76e351c8c15690399cef93c43db6e56e299719e495940b703cfa99f452efc7686a365171e6af8635cfd1b4f70ce6de7f8475b417d6a5c1874bbc3ed1c8302f44610910c2495b2034b95cb368bbdc746dcd4608370bb539a487107ce59ea370452bc2afcd74de26842b24b560de118fbd9f7fcac8ff27fd4d18be52dec0402b2be25dc73f749a62511d4f03182d812a24acc6073d51b8742544952a54495044e94d46a7dabf584b46f318830b3994d162e351ca53138b2bba5af6260db1b9463640e05f94b0292e7394f2b068d87cc32909ca7f989cade16e5a2c08522ea6d6650be117cdafe1183a074060ce7fc0b32465cb8ba73ff00d44898f996108ad0b70fe98360bb235d8f025980b1ed5f9e2665f405d2c1443399fd26a09c6c342356c6494a97954a19e22e456782921ab2144b8e3690fea2ce435f700c9b53e8899272d3751b53ae0a9876b9791566e204526ad8df5ad5e33641a94a84cf94789713376ee14e3306582e37635e8d47707092c04688839e857a344bbccd9777c4d31c45d0a882150b58dc903a444c511c0452147bfcc195ac264a2d1559892ea40420c31534f92328a687ea0212d5d251e8dc6d6e153865aa3776c530a7922162071545c8b3963021f88236b366955cbb36f01bf965a5ec59fea264650bc1298ba181b44237df51ba70a6686a5c30ec685b5878d71ab08f3728fa6aa6c794435cbb3501e5d4ef491b4c3a11c0ea2446700b4144125d4cd44594f36c5894f5e7cad24c4346ac9c0f1f31e28928a31831c2434a1636563b131816e210dc5a16dbcfc22e1052a354077be63ecff16e2c8b67c12e1bef25d40b0533b785e5899146cd2f6408fb57d0f9773230828c0432212ea81ad59c98f0fc94711b0b5f35a5d55a129b757b07967185350e85b99dc5d3518d34cb2831eac811db55afb8b4682380f04c230322ec15fa1716ddd2a3e781349f2973dce85d7521a3b4bb3ecbdda6840ae84c9bc74a8f4acca95d2ba54a95d6ba39950410cd4e789afdb996a4686b983cb1619cc21a7689ef32a1c09dc4a1ff00906b8b96e4bfdc3caa530ecde76fd40680cd3fd34b21459aa65f240f0e965b030dd12aafc5f6c7a0183330e970d7e368c58a3cc7a332c350c3d53ef118dd4c2eb1bf197e9918d858bb01a7878658b4bf73025d99c3af3c48751b9c1fc9419c954968e1dc55773db5e297430030ed58df8630abd41f8875e4c696ed1f1547c65b195cb721b0a8b16ae9bb22cb5611348e9aa8d473b4e3e156b89af8855ab8992fbccd8760219a8231d1936c5a30712bb58ef729b11ec812e5b9cea172950ae8061a990d4036b8e8eca9483f784a731db381330e433f352b2154d868d70acb51bde7b0a913a3d5128a400d25d129e352ad4d6edfa62abcb08b7a952c05d1a220209796afe098ac1edde1952a8c08838cf51310212d1edec873c4a51c08f0ce26d08a543707f03046474f00fe236ec2394dae825690cd622461c5a525908d8ac4e96a71fcf5828485b1bb0fa8f45968a5978d00984b75c27950dd7cb0240007b5ca685d4253c05f682d504e0de90455a28b931bd03ccec71454211d917c83ba94a15748783c435779e555304436b25384a2552b64517631da7627cbcc6e5840b4f246254bbee47634001cad4b24bcc3cba17200aa801cac280b33f17b267e5a3e2f604731676e55d5b18ac320a59c0a4d9742d2db5e6350d00bf6cb12f314c3bc652dbab8816c38ff00e59105a870ae18d7c0b15d531c41831dcbb8815b07494fd92873ea3d31809e925cc838fb64ab276952a54f251eb5d582074aeb52a24a951224624194be92954385e9420da7099c422f020263fb88cda21358740814405a6cae62335b4bd019108bfee51eda2b1a7bb39824292595f623a0e61e5e672bc4f83a108421d097d6e5cb8c588baa422e5ea233b37ee1573033ea1504e3282be561250e42fb12e8e56a52c810546c7e8b9441137b1a7ee366c96edb1efdd332dcdd00697c4360f681c11458e103a5590e98071d012563ee8394e07acd9cedbbb6e5a1627c84a07e18b29b889bdc71a4bcce23b2a3497865e0311e5ac42a14609845db28e65eb32a98dc100dc6aa90ea10772d65c5ab5694686558a62a0c151ed480c708b62bc2162b7f6c6631e8ec96de8f70546777a9854a61dc0442885d44dd6cf72b9b25d6e26c7d133680b0c424c80618dd494d9ec84b4604051c653885948a0ed965cbf8208f200f87623b40bfb3b46d0e0d8b82bb5730c55b14c50aff004fef30ca945762bc097165a6291cdcbd08e35cb1e6351e6393a2dc221fce9c5b2aa50b29dc9ccbcb6b6c2db8054e5d22a657e216ab8a9640eaaf2cabfb7ca88280acdfbd3c7551bf4553227630cb0c320331c354bd1b8db2d4d779a33c0ec99956b2bd8f0c6603a557e0be08f12badb1c229745ac572e8dc23652701aa39bcbc728aec1a475aa9528600c5a2cada9636316f3497714b793ff561d8c41bc06f0ec3cc290d5b068f72fcee8d44b200a55b951a1b826f3052999cf71c31a8684788f3397473153550254a87773bafef31287e607448fd3b3ad4a9cf4485cac4a951ed2a378036ad1165038b3fa94a0fe515c7d22c3219e528f6b1b45bb1ae89a8b683ff008144a5175fc986bde82e082dca56a091666cd472c470db0a70cb5e1898e397e65f0de52cfea38def08b6e59687802bf52b273fe8086002b92ffd45c542e9e3513311326f77182a57e0020c212ce87e371c60810e8ec73e0a6c7ef5abbc1a095eea15e68222eecec52fb798362e18513955372a9a05e4c9b8f9f28706c62aa0565e610d2575d06cb465621d04b45067a12e2aa1450d54d1f647001816ff005c5188d8595b32eb2803bc4b8159620451b4b067211da764214bee4177368058bd32941e8157807dc7bbd0c4a560b86d2ed223b05510b05d8e60896648bf6308b3b2560c1d67dd986bc31775bb27020ad11f489d4d95084387752fbd8cb542da97100b3445f1dd024a360a49728b4533793700d4be34c5404cdce0a311c3c545397f48448410a62fedc2295576b7dce2ea9fa255f7928b335321e3863d49a4f292e2577ecdd915b6ac1224a8aaaa370a04df99afada82b4061ca05db71a40c4e214dfb0911b3038238a86d7b19592893514171c523b6595ca6d5668094da559e5bf24b7ce3f56354402e3d590fd038b56ef1d1a2fbd316daf3cce3bc0296e8c47359cc1b2bed2ee2c462151a16781dd814e8c15afc1c44a9a3992715fc986013e7c0d8018a04a1776e1514417ec32d467e45b7d9a9851ea93e8c5b87c9644268a3837ecb0bd9e0a942bc539547cbb6369be5873e8cbb99ee19d75965b93a2ea02be0272037d1503885d81bf69f081e8919676df8d8e26e1d2c0cb5292feca1ee7101ef25f404473d7d8220f70d1f420583445352ce4e6240c17a651f504124c129d0f58a7d6de229c500e14f4c22b529f0313c28e2ca43222a1773020b60046a5740d2ad73621c06e535bf808aa5c207eb07826626d705546c066d43219af530592ac6e7e8610810843707a92fa5c58a3b7ab04acc3550181053309a294ef3343110282ceecfec810cc0cf282c51373544caaf24a65aac7b923100c24c9a9571009a44be82c6616d8014473d4a1c59e499535aee92e6d6a25c3ab57a841b2a5dcc00d8e2e1d01414b8635152b0b6170b45642b164aa0ca47ace573105ddeba487c953984178960295528336c30034b68257fa82e81d53992ca8221e860f41f8bb3748691397363b11fe5929e18750c399436df15ef2ead7d8a3863a102df11d445c1e8723a330e8db2242bb731036cb57b60129ae4f116d451c070110ec732d1ccc453b1f308e1402f9d92beae8e74f11d945554abc5a15232d72a58e56072f0cecc31042a163072d9a4d8ac54ba02daef82c8b8b6ba9a57e3ce71e05864c15df15a7118b031559332d80d41fda763b8c06def18641e33194828baba5962e94a3bf0453b285ddbd16d1f2ca3e188e06e711caff2b06334bd5ae406a929265cbdbf030448caae5eecb65aa518162e86e770aefee288177632fdb564e44487a4d6cc6f6c48e865b98e8047021d55c587acbdcc21248ef71682f30747006628255f3040be3ed74a9b128ee03f733ef49f50e8cfbd5f9351858971965439298803ac6816e05513224b4ba8a8db572ae563f2945e73d318cb165a246569976ca489545bb1983fb5453e1ac9151d5585367c31545d22b5006561c314e614dd4486d95bb5842bde20cdcac15b9974beef102325c0632f40d55232e28bd4598796af1128ee0621a9a8a17ea100810dfe372e5ce7a31e23d0e612a1c432c7d1324c67bc54a948332a008e8006255917379a2082be82cf17320836321f4442c809ecced5322858e79182572cb30a85dca5c4cc06e15050b2e1000951a27a92c0f662f926c2a371a60e65085534072b1aef1588a17074075d244b2081a7cc47580f7706b7041055b110b7170565354e18e482d2391e0950e60ad10e15a135ce0bcb62f169fb6e61524774b00c56ac414edf809decd020fd721833be631cd97822ab9608a425cea72b709f22e11a329293e2049b5b6b81ae83e6145200a52967300c3ccc85b8818ca6c5c0b416d87d11672b55907c8de04d5cff000899b042e662a36008a61b19661829955b19a807c07065c6b76f77704752997422fa6ee207bc0f6865d78ae70d882d647a263756f4f32ae58a684cf658a2eb89384a23dac6a1664a515cf7b88b657765b4a1bbe65d42e5f7a05578a8f4db54eefcc19496543420be5841c85ac16fa205bbde452a10b914ab5cb08b630b202d123128d9dd77be65414230b4a14f44a9e7712c6d4a5ed5c11ad1f29d9d27942bd23965a2fa2420c96bcc425ba90e8417784bf38899b7f4cf43d28ef3f8f4a8f466e245c205ab80239173abe6cc5e11e0b6e1acb4458d541adc1de21ae278329964036475b64169019b84942997000658c17dea3911a2f5b655a4468bc798088198169123624cf98602e79b2969bf508d79a84bed3f8ffd20ee4c5963ee336b792d5fe59763e12b8cd16e6e140e698445aa810407601f5021f8543a92ff000d26118ea5f42d4a27cd42a5ff00c41fd23158c074cdf921b458855c7e072ccdbad5b0181b16b370c0175969e01d07b8d4a687728e0b5e594cd046cc57c83fccb84565df4219c5ca2a56731a18b87ed3266d8b6cf08a77d2d14239ef5c55e221c13359956ca128737705c57eb2c8a2bbea2bb2bd735865a7ec238317b932a91ed7f4425caa03e07fb9069f85ff00dc683e321fc42b0e773fa021cc2791fe64fd507697aba5605e72c38cd52730203186b1920b821592af765fa22d26155638b50ae08d351d2375928abae2153f04ff00ccdd61e9e3be7eabfc45f340be5d1197f75bdaa52d40c04678d8611bc0dc1dc87d91dc200c29254a6037ee1e33da609eae558a06dc08fee712de2108f231ef79c4c5a83e98e784b958a7c443e68a82f4242edae9401c65b89b03d1b4788ab665ab4af9b8cc7de450a6af0e215a9da92cce00ec8a6289306a3a82b5aab2d4545ab2de12d5259b255307e7082602eb2dc6dc836f9f70b2b3b0d0824aa30703d86e28ba774cc363b0d33d5507f6c373674c469c5b79a2b29ea5b1f09f97ba01a2bdc076c68954f607cdc1f6334375eae0238d562c8f3751140e28529ae00cf1bc0b0e435333979a408d570527198b471ce071085d17b789717152d0ed9705a9ed08266c22c9134e607ccc4a7115d04a2aa0055dfae3df525e74ad3de99afe53d0be9632e5decfb9cc7f0aac42618568ad7cc63efee54cbc458b70b4d9205cc5a82b033995edda5a28982b89649732b302b18e76d712d4df116161898c4b1ca12bb62e1859a95981ed368306200ab3d544056182763dee5d9545de1857aed533458788a98206b9b82a6c13c240c587be1954f6354bb0c17c3e8cec65418170be82d038e970e1162baae8630610c306aba573d86624bba5ea4b18de0995260ca150ca434d18ba8120ec345102ee8db4d656db970126b6a3ee133acb49e12c30ac37894c4e529265282f2400b28d8c7bee86116ef5274fb348b382f61fdc45d5f70705fc8ffa21653df2fe420774bd1fee6c34be87fb6653d2ff00e20285fcd0973ea3f7baa2f7ef5fdc1f23ff005cdcb96c77ff004436ea834a40fa2a227fcc1c45d7dfb2abf5f00ffcf3cc717d2eff004317abff00df8102dfb81ff7347ea0bfc9887fc3de230a09e2fe213e969fe867fc1b9dd808016b546e054a1a2cc731f34a7a0f5303f620e2ac55048e5ea96c5c50621f923c7313f40313db5f63d0b477fbaa014c1800d34c641384eec8ab16e2f99c9324b0ae77544add22c62b448eaf57132a6ef6a19b8119bb2d1db4c704b62a8f29003749bff7017a9002ca3bcaf1d1e25b16ac03f647a11532d18793780e58c3a6e429b4040ad699cc4cee2a2201525e43ed987842d0225068a8d6de29810ede761f102c9ba1fa61ba232c9400b32540691d4a2955038f295443c01058b5d4008372c73ceae0a08b5d5fc5c90b82d2796574280b66e88309a70b9622c351b2a16a180e083cd5b0d5a6fc73139ebae32ffb603e481c07602f2c5285f0fa3604de068d851dc261055366acf1033c2ef3a98569f328e4cc28d737d029e73b609aa201d5f6770a9793344d45600b0d1d4810843a7d2c7ff6486199d7462b77c3a3d6ae6cf302512e73d38d0ddda698b749149962530b2510a7b97d182d6f70d0dc00577326c84ee2b99e929532b21e330b89c9502c8f42531b7a27162311670a4c47d4755c3b2162c23d40836e3dc4941f48a842f1170c3c631bba8bff00ea4ab18eec2be0208b20df6b72c4095009897cb31b2cd0adb28620f7a83b3e4862b3a389f108480e62e345314e194ce96af90b11f038bfb657b03a6c20802b825b1668d9f7c92b07649a972ff1148c919b181e44bde1ad78b816ca02c0462ca7458480e467a5dd91000cb9834f61dadb08c3e6f7c2bc4c44e61a5aba58644420395c21a308f3fe2467f18bf812e9ff003bdc47fefebfca9695fec3fa610aff0084ea3499c67fe90bf7ebde5c2a782dfcb05297c443ebbc5201b4f91fc4b7e46d4a25fb4ac3fdf680e87e84a838fc672a2de00e80d0f109a208a8bb7edb97eec5778aeb72fa5c58888166dd847f556ae6aa2390e489033d2084b906e58b9b3f2cca94f551c8f1dff30b8420552f20ecc708a29a61ff002db566ab966281687f4d05a072d4be9b05bd894b80824b2a15780448a76d3b8549ce663513419630ca08e2e6cb5dca14ccf3e172c6c1898ab3c933523d701f894545b155195d2af6032b08175307cd5dd8bda1810f922328c92e61b46a8b97f4268999741d00051d8942cde32a4342b7845c3530189569d2c96f718e56d45f6cb569644e1fec29038182da757b940d9437c21a0466ed6d8644d792f1e6c8989bd52144f5059e1a0a567443c6780dc305f015666014d5d6372ce2a88e2e19b2b5151e62312a5c0bc3c4d7d6282f8e6fb1198ba0da95a2dc08a2efcd5afaf118d0b6c691a815866d2fbcb9356f6bfed1239a2597b3c4b3c411cac5eb442ac3804189687a015921592d8a5dda648b824372d479a7a92e6ecb32ecbbf0cc54f3d046c1ec8c5618fe1af7974c6252ed7771d94820409a2191c996e7895ab2582ae6a04364152e18910d37a8d82c2d0e05663bb9996a2c36aaa11486751e0fa96422062432701962d5dc6bd12fc10f70a7984da38f70406f8216b738e07fa604f9abb5ee2c42952a3a916d5a85cb19f15ca030d415e91fdcd2779bc8cdfc4bd84b25ca6e253701216402de106cb7b5af7e19ab1553b66c1c2426ba49d0c30f406e370c3aa6694d2184d6fcfc300a90aa06a312eeed2abe1d5e4ce635952e2c1fa58517217bc17028c92164bbe0313bf26cdcdbec66305f0940b009e116523e502aa12c3e533958e10bae2a5e65d31c58cc363ee0c02860f603f621ca7782e65f125300904298f0c285d5f21fec857e317fc5cc8138025c02ed2bb199ae1e71810f0c494ed7c2ff00314102c038f1245a5a7958e59c4d32e707422a82cd2987b328a25073e122a174c3cca5b63257ce2581f2fea6637f20dfe496e37d25363332cec48563aac0d7bb8b83bad0b8f10621ab6144816e53de31bab63822a4a046b26b3059b977d9f6c1250e02e56a575ce8ac0470b869a65229d717cc8c9b593f89038f8c012a09f400b36873571e04128efb8b06b860e2a3881f80abc129d799e88e0657236949c77282b897e5298038a3895256850bf645fd0605a7b8a340d1f32c167b850521858155c68212422b807f0ccf7d5fd8c4577228fbb442167211eea04afd960f07930b1b5ed2dce05a3fcfcc56edb94b993069977de6db5222e88ac161e585dc0e18a785b801e0f020da21c353a58f11bfb0ba2db5e5b82d6b2cce11ee511daded49899e8f912995cc7bb31653da62ad49434c336b1778432801848f354f027999019c10ccae9ed8bf50928d23e043e0ba1870cf2618f4bebc351902001e0858e65cb2d2ed940779414e6660416394585659c3005ac4c9c026028727d102d453da02592196ac8e2868a3dc1e0db154fec96359753391a8d06d5a0371562d4286e97bd4bb1803dace20799ce220a62cdd95bc5c41b32ccd622866c5315133938b57eee25466563453a1731e4989ad5a32d36fb2bc4a89601035005a28ec40698626497851997b1c90d577c110ca3ade9d9c238885d5fcde8b39cf297e7a414429f12fc6a2cbcab888d845abf12ba19ccd017fa4a2aad382111a2f905ae8e1595817ea59aea87b05fb254ab5694961305f44264c0329cd4a330a884a37d73a4a4601960c493141540c297bbfdcb58e9a9499882f25c1f111db0a9ee05665d17c562c5d7b6adfe62b797dc8d8df643f999347cc508bf2e27dc9a05bd7f2ea3d996e2acd3b37d04119925c38d4f497974943b6580e07da18f935ee6125252da6c42966d379c87c2844b7901c6bd11b85b78516ac26c2796171001f8366fee534013860427334d75ee2182c416f13bfd23cbb1319d0c4648d010d3b40b43dbcc6004b46abe58c75ae7fdd098eb2ba8716dc98b21a46319222698dd86df1528f6a0e55ee242539eda20aec68a849a5bb0f900c60d0996a9fa84657caa84afda315deec3a92a5526d1f5981f2cb4378ca0436c05b2b84a4ce32dbb952ad6711dfb244bd308521055bccb051841d8ccbb3b32fa5e25f98306306fb1825dca5dcb10de61d99587d1d868858c9b330187425c0961ede6543546040a095236ac43fccdc915ff10d8c21a95798f19ab513084180cbc33b78208be625e84aef6b80f3bb96d58246f4b58420b661281752d0030eb7a83d57ea0ed2c7ed15c1fc9aef7fb50311dc612aa295938b97d5372eac9c82a42d95887eb933ee1c11dd3c4552a62303f6311c349755e208d9b11195a8af04a645b62cf456ca080f146af51a0157b5371bdfbd254d00fc31330dea3255b5dbfee5e6d9eea582276b665c6c14d90c015995821be58a7a5c3d403ee0cb6831040b4c6502ce6016520c4a60b66269d6d88cba05b2f34a96e00e8a163c3144681196a03d4c5d58e0c14a6d8cabd16bd1c3128e46653b32fa380c4b95015bd0686df130d35e97a94eb0bfa6cc1f72f4795f52a8076edae5f2c7b01d9732db71e1806a106422dca9b57cc57ef4b41cc29b992ef24c9142a523e5062cdac21864ed6658f331c4719c3506559513b86fd5436830d2785fd590a96dfd8cff00a63b5f0014c8c456228ab6f2aa09c02a2085e14b6ba01e62a0097f0de5f5aa5a7ec0b1a959bcd66bcd12d9432f17b708be20f6e3c3213e4620edbc17c79a82cfca4134c2ef140e7f481be5ee0fb63c0cab995d57abf918b196372dcdaa143b2f98e9e9701470d92f36cc6dcc5ae831bb50d778e06ec97af12e96785da2e6552055e086d6cc1af7cc5e434ad02a29f4d056f304203612adaa6c7e4045e97cac2793d414e20ddc38a2088d61880b9937639b65e8a0dcb72329df34fb4edde8edaebac8d6795c33d7a0948b63cdfe96e25c282c52e895994118a6a58114c0d394d9ccc806ed9691f7beb04a8dd5d531296059ee232b999ccc2f882691c2532adac50dd6bc6a3e292f92f2ea81e61852354d3d480c4104b855708d722ff44a52ef0c512af1a80c7fbd60e8c177baf0472edf3241488d8be061f888612eaf51d099ee6a2dc43506346173671282b2fde1363996ddcb4181c24efcd2dd4146cb9b11b8bcddb9fb25dbde2fe51d09ce49fcc3cd9c3c9e653a5c724198569a3f531318cc1d0c31a71ef002fbc34b51a8e520176d130ade08360543c56775283545ba893bc423c311f00d2014023426ed6a6cd1be8c5c6e310bae44da456bbcc58c217ea79f82224762b2cc528dec43885692ff00858cc6b4dc5291259cba1fb4b4fb9d0b62663a6398998ddd8182d267bc624d0bc10f4438d296eb178a7a8c592e52f2c601ab252ed97fd4bbaeb48d9e117b9de68f672e015140b33b71ebc52a3e2478bafe5e711d73369481705b858f4dc2629ee352e0882cfe7d8f92153b387b90e35c663d353728f52c37842a963b5696859fdccae208ce0bea6b214329e26b518a43a056670492e3c3d0255f7fcc4370f84b6701fa700dd07bf9d92bc07a1b198043a23d100cc8a5655d930dd0651e052b9afe10e30d54d59868f7c45a95b6361a053bb57144e2522c53e501798010c7b6349edac726254faa916175f6a8109ef2dde28e632aab5b06f1fe189825cd33c698f072545e4b8b186770782ec788f0a3b55fd10a16fd803f770c432f6ed65af732b1ac96cf3b6f34d10ea657bb17558966d0330e49c28f371a9d533ddee8ca15ce979a981e0d42a2e2811da575ba060c254075222fd6217c67e6321013dcdfc8404042e5fe5830ae3f8e667cdae8a04adf9a614b66e0c36a9bac128ad22ea91306c1969a662316053010b8964811669f235b50fd851a5ff5c61a6571be616862bc6a1c8c17c50f10585cc35e458fa045a7dd05b2d4beabd4bba817f2e1ad386118a5a823e0a04c1dff00962b0b18325ee6b988a83dbdd41bc5d09bd5ab50da6bf9d8117b9702ca44d172a191300f686c699683171065c1e2518b9dc305f306a061b2aa51c8910c54a709d909cce630e580ce7ec1664c77d6f30dc4a5717318f232e3e3688352c5477262dc328a0266abbca24f11885050c153407e09964d251039b2c014002e0a3dcdd911cb399e89600bca245c126e348ce216e1981314059856885f018354b4b016f29dc7352b61ca6ed35a7cccad8ced108d028e842e87d4cea0e6148769697303ace298a1acacfa894c0859c41bb3a08d112b5cca808124dddfb9cdd07ac6a7a8886e59552998818c4472b322eb07432b6653deb7444607c2f9306064d876605c97653d0788aba8bd90d10502b77321a89a94a3da0e09f099e060a4aa5a6c81d9a564c90883831fcc136eca5c456d89e098a146da8d5df40bde7a7798c22c98b5529d17510c4554347b7d2edfd47495dc8116a951e04a61bfdd7f88461bc63598ff006c285fb9f6ff00b425b849474093a196ea12909806cd0d9327b8ec255bc5dec422a58e08b5948a885f569c8998bd18ba4a1fb98773b0451c318334315ee2586a5d0ce47091b1a977589c98a5541175ba8aaaac6717159762b203ae3896998ab8dde8d10f05f6a805a9542abe63035b0f10d732e296d2ea669ad41b1ee8535308c2f05257c5e79a615b7b12fbe7f8b50c1efcef86a0b5de92f56389a99a2c6ade2e5c40ae0d1d97324d20a1d5b0c158711ea2b6c6630450bdde83d0c0141c8c58351cb3f4115f8ac343c412db1c778072368e4d04185450e35ca7312d4205ec60b66f7c023d692df2d6e72ccdcac4fcdac4b5893020b5bb716b559601985557afbe635062c206ce811bce0c49699199095b888d49375d388b0d4b65ea292c382bccf00fd92830d19764be2554ccfbcae9833117a40f403a3166884b933bc11091f32e538852b6f07ccec099826d412532ad2e92c26c5be2248ea84bdcb5bae580e49a4fb8d328aa72c01ef72f96ac1f64ca1298103480252d0c1121a28d401a60cda3dc87cb0e292ae3f55ab5753c742c3eea2c6e5817fdd4ab378b583f712b15bbdf4f31269955764f4c231305f727371b121ac75442bb157917d14121898e63656f8ff52e630822c0ae4b95e605283ce34ace021c46edca6552e5ee3b42b70cb0cbbc47551f46f0a9132f11562a651db87d9189cb02dc924d308511fd918315265ed272778c6d2a88056008684896f46c4ce2960d55cb65a0b8c18b3373310a60a06463f32a8235d93ee0cb5e664ab5f705324ddb7dc104e3e817fa8ad6f93ee1cc885a2909145ef4b1ba01598ad112b2de25e282ed56de863b9a2f36b8b82cc334d52e454bed362c506da278653c5f106d849e1846762536099a016636456362c65bda18800cd5d389c37674210d1a5aec32fa830666414966832808c316a0c12a61e21772de25625650988a8e825447333ae69bcbfc51e1cececf24ee554f61644c1df333142bcc214a75de501a1844aa5ca3df8662eb256dd5537705dcd5b00aca6e329c2caeb1bcb134e6bbc600116e287c00d22530420e199f8312683f78094068f03b2414783f71d827ece0796a50d0656c1d1159ef00505f7761ed195f5374c77b8eabb53e788e80cbac6b5a6a2eb04b3318df11e6a52b569a2962a6aee8af05b2e442e60dd432e92970a84a9c54494042710585461111a3511a7164a1d78f7750b5ae1bd18c20227190953c57c73a7300369fdb256743a0b85b751d4051f96618552460d95aa6688d1019201856167780cc83c7676d43bc8a8737342a8bec22cc56ff00220d76d563f880435eb1fd9183131c38047045b6b1edd119276b9625ee6c228071d392c5fe4d3904301da87fbb8e18062bff003093429cdaafcb2c098554dee9c65e8965256c9b9b23be665e612c6755360c42720516d57173232965357108bbc542b3ed0b4a8b35800e97320434d5756846bff508264b152d3e052dada3531f2a53001af867fa9765532221f0b0a4499338f409619a4b73994c5cc1292da7c26e010d35fa2916dd8b5aeddc89715616551f3ea0713b479b5e58d566e2509825bbcc8cd4ae802509d0a66a48161ea38e931671063a267e42242d816f3edc4a39abea929d87f3412d257cd43b3da277f6d7f5365d0ffd778ecd7d2fee6a862043bb02aa2b322e88b293947d4c4edccaa512bed3179ca5d8fdc32a3a10580e1ae9e9ee8f03fb95dd1886a6ae3eb805c702926061b700be88d5dcbc100e0a85ed46ca8b518b842259399d425cefd3384bf89bca44c47301413c9d11657b44beb49b2756abb461206f61c9fddc45d2616bee776427cea5a08a415cd400f619874da2a104cec5107a155c463eccc329c88d925a2dc021095b6128432ccbfb83794a9690302672c7da2516b3f30f28a21e85645e0c4099e56d94e38b579ae578102cfb2a7cfebda58e583635c4ad998c0f2d5d444aa8680a84f431670de4224cc594e3164dae497e099441c5722f5893dadc5e6cc0df05a06ac571ab78a6279f81a26ce7a158c54dc25f1300b8db8606a53e096a598842a8a8d3c23a6b07ea848170db63c8ca9e48aaa34c55465d8995eeca651d753b835040bb95adcc18762d8c4d233c3e26c8dba9bd60c171e65e58371633da3d3523e20d9282aa2d2c155780b5f0102a12a56665e172c6f347358fd32bf20e7bac79613d6e5d4aa7c4bd86e5818cb15f880edbaed31b8c9842261c8f69c0d9c314e22ac30125f88918c32801432a0ccccef5503b50c0b242e84a1752e840d6dd8023996e713cac13a5f299a29256dc4eb3e29f6a4d5e2eb42657688c6995a1ee810e59255abce94ca705649ce060d8770bb5ed0d52334fee83e9cb82836bfa64b217b6eabb258cc4b7284c05b168128af2c2905a9677832c89ac401fff005ae59a4304d8916abca056ef1642e97f73139e8862295c5318cbcf4730408e636430e83394aa3e25e22ca04290908ca3d74166a5fa2c92d3390b6b1d016cd60190fbd3ebfd1398d56ae65a0dabdae26577642ecd56d8eb0de5bf0c6ecd859f1d22ae4bad71abe49fafe9e2a2f8cffed2811a2ffcf4935b8c331c820fe21b1bd13f98fe107f4182bf617f411e0fbd8f9c7b8280086ca095e8c078d39038332cbab3405031818658306513ab3a57b056055642429084b194c4de6ad548339051064e83f159cc6018d3e7b3ff0063858aa85778e8d9cc0382006af31be0075c832df52a4305ca934b2c7088d44a1a3a8902303016554531b1e033703caa76d889ab5fb8a5f163a60b248958ab0c1547fdbc72f5a8099f7c4ab58141ee2b2abbda62dcdc654021781ab840171873c83d434c5166357ccbda1e229bcbab8276e559b56c3d3dbdb1b714d7c1c7c113cf085976a34931af05a84ab57b126c29f4c3bd4143a5e7a2ba94317044a8f12e8991496056618697f112f138e603bdd64bc33364648ec500830a349056154a1352a3ae168b4da07ad23b6731cd32ada82a18138e90b841186f51c3b09932e42069f0b0ef0c7bb8224db03e32cbcdc202c8b77c26461b50d97077c398ec0aee0c677c8c51ca8104055f6c6f16f35604fb083da369bf0d8a3100727c452d59f2ce429daaa58494193e82592e492ac34d316069c95075402ad1f6c50a20ecef38ae86e5ee1f10112a02517190bb456d5e40663502410d50d4604d000a4609ba56fe6171099bb616f0e639a929e6bbe084b43770be081a9af31b8becb77b811774ae06c8ae020bbd778240857318982d49aba68c9e484cc2393b31b546a06773b223ed1ff9a85c30a2840f6170266d9074ec5a26f52f2ca051328b05df59bd2939f3536e93394ed5fee9294028d71088006370570cb90b403f4c0a0197612e5698897d0fc152e98b04d3175d17315914d57489895c99816acaaece4427c0d2eb62bb4a1170828d1304add2fd7fee5e62b49400b81e20eb2eef6a8542938b92a5aea2abe0f71ac0bcd84341575fc261e9c592c3b1c5793bc49f4c5edec1f576c411b161f98fca27a65c4ab02dccb22cdc1718f33d172e5cb597111e44fb2a03ba607865b3c35d1798314a665c2245c7be9608eea04ac744e2a5da6a1d334256cb7bda24ab0e79cbfdcc6d076dc1fa264331a9442f95e04609b039061505dc91f645909294d7ea1006239b32c14b11b162eec77d19eae4f0081ca2728dcb0feea734a352c4732fe6240c9861c5b0ea0dc17ee208f9a1ea664c4dd45006d44f88370ef0b1ef71d65dd4cd98c8c080b1609c8fea69fc1202d608c02bc2ba85145b96679d05e336e83d4f0bad607b9906610589da982898df1ea3a630209abf49f51650873788649e666b322bb41a19655c3113704a7394a0059c9161acc0cf20386116d9231665e25eceac115d59347a943c352cf045c1547d02184a4332ee01496bc4da1a73311de3a48ad666392bc440ef2c466023cab6cd19bbf6442a5bb3738a873e1115034501a02711f646c6732c388a28010376e61a801b18ded657cabb7306b5f30850654040686144099102c666dab972cd6a1c87f78855b7b95fdca00326985396a70d98dd22873bcc2a57c83070c9eb1a7c8e5aff00510becff00a0cc0e8b9b86348edaf4f962d34db7904a0ab0fd71fcb31451d8f94c793dce6c621fd420783cc6b8a4395d8f61035a3e4f03002cb773255ff6b0dd528e2d43a7574bb2d8d6d8f81aac303d328c86ce1810ba58c0351855294f0cc11da0c583a118e8b5e33077492c57a6643dd41e1a8a1b29f4826a8325b4f762dae545cb20c5719d41843a04624dab95d121aebe69f12976ef0b6280c2bbd569c5c40a2a155c2d79be85fefa3dc8aee3e0b8be2218da587316cac297d192381ae20049458094404bd50015e5a8f06f4c2b4006c5f9ccccfe2fc7f645051d04ad207050cd3d980a979cc06ed3845603bfc915ecb0a873498657cc762056bbd3716ed79acc17099200e213ea40364350dc1cc257e4fe09698d1e4e8623a608c5cc9d2aaa24cec8c4e772fe815371e22bf09fe08f31905ee59528e59416d7696260916d6730345688418473ad1658b1865a2307afb42a3c225029b1ec403035cce6731f881852d2cad39156330f435d1f106a46d3ccb4d8c1968105ad2c555f696830f71ccc9941f6b0265816709337566ec2ac95055d76ed0db8807760fa846e3a851cd351a32cc26447072f78e20405b01c7b81b2158005232ae4190c25d54588ca2d24a659e6d03009c082555e8772306caa3d4b5192fb978dd436b58410b6524711a018952aab2af940ba13d8551118755b1896e193d3461885a836e8704f922764a84c09289c3a9dfb96fb51759a115bd25267b47ee0645d77317e2e2a372e2628dc3111db19691b85381ac0a8e26d523414166589f1318dba0706107a80830a69a611ef081643bb37712c1902d782375daa734a540b880d5960d918ef545b3745b1c28cef50ac47e20f3a5a505853fc45c236f4734a454ea5ea65e51400e1528d55812ee6bd2b37df32fc2152f1d17a82c6bdb1c2e8b7cd85ad647f045c7783b7d4b8f9c6fee21e11ad57b8f600cb2f3a0f6be4947f257f4b303894bba77d1103333431dd6ee412957268ef134babf105c74197883372e66a6efde6177d08feac10705a7bc832e5c59e8a8172a101d04964e632a2461043000fa8b8ce04bd3ca4f397fba50bb93f6c004576030d54798fd05cfc6ffebbc8576c921df9864643b03b4a20dd3142be4061526a328407b3fab286f6ea221d234ace1b8026be61e561d3bc67819d9299c022503b90b58a256baded962594f8b2e500403a3774609bac353fedf6985d3cf054e968cc3845eb714710b650784a82dff09618003561f32ef765d7a1a1bef64c456f021abb4324bc081a4f13204c97981c4e6583d9806e2e26a1596db8a1b8f0f136e7fab96662114bafa94cada5e1eb45c650c0c2bc4441b14c4336c3d9c1996695a942627bd901f198fce8aab382789df9d50d3c4c81ce257d2d8142acb705786b98ab9a15eae5d7897285707bede6fe04291e5107e8b87a667187ee5b8990ab864058a87d0cf9e8f41a58208d3f6b369735dd5d05e68ef16db935ef32b65fb99ac71002b107cad711119b527821601f5c178cacbc470c3fa50cd932da0a9e86126f886402d0b4355353b5c313e246dfbb43ed9a34ef0913942eba68d7a70d0c1440db335bccb386d59d8f6e4a4b164a71fc88618ca0ab1c7633047eb93f64c0fe2e30a5f05bf6c16dbdd5b2b9c4237090d08704f464bd92b8d472bd9e8988f1c7bff42602d18d6adb7ee6b9d93c5dc34ac5735a8f7a5f781883a15a9615989a20f94bbf2da7dc92cbf2abfe24dce195b7d1c47bc4da3f360fb63b6385ec20b417cac6c634856ae732e63a1a288d2d5524278696c167b434132dd5d11766147b782010a0a3ec8a0a002a6054468d7613886eed5b8b0ccb832e8845f46bdf07ec4566d858ba6669bcdf516a32e2c635f804dc5c0ced71a3b845c4b6c173162c389bcac2cab62fe20294604a9647809e465ffc7eb355eabfe99e52fbe4732db398c554cbf0c7d303f68d84bab2250f1622c177cb1958ae50b2ed12ab593a1923a7172286e52a1e3d08ab414f514ed6a2eefb12e3e5646852dff96aed5f314b5717b32fb189d8c60b25ac5860e82aa70efd4c1839948364c61d04d7c4bf32fa15c4d11c6cac1a00f348c81b7fa4aa71e8541bc4381a629f69b035994a22e22eb6cbe66046499a2590de5110ee2db8b48a4ba0929598bc1cc6905ba1e02040241f446fecbb13c5165970a94e8375e997d832920ad6edb7966f9b9695789a237b8d97dd82140336b182614a8ef70a23cfa957c7b79653637457938f98daaa2f18a96da6301cbec45abbe79ef18cc59aa05683848d65ba355508087305d12a44115241d16bfc65da844c2d1fe25c3697019a5d0a42c14fc4212ec4b8d5b2a2d022a9cbf529c44576fd882c4869ac312612157291dea5168b2aac8399756375376c11d046c478d5caa947c3688fea19ae007799fc095ec74f966b86bd20111952073334c29001e463289bafb7fa82012d219781950daf46e2c3cf251fb88944bcac625b245aa042b310ac4e209555ca7f898cf9c1197a2aae650471280ccc196a6b8ecf2877b31deb95c5d31518a80b15a3294e4125bbbcd616f3201bc387fcd8ca4bdcbf92119f2cfb4f75a4b309464017fcc089fbb8f812efc32a12a0b8f26d10d7e17a994538d4f4c198d44a7dc15590aa80b06912246e6bda1cdc5a25c584dc75dafe0443ec8277a8470218b87c723a185229b8306e391368c690da79ca54a3be1696ae225171dd0740aa5378973bd0421694b995790beed0896e87cc0bd67fb41768d14a2c846941e5a8666ba9f50fec3d161b95feede216ef32ff008c2b8aa8f0b2a728a00f4c27d994550c2ee3351fa4d7830fb6624acbd2fd3746499aabacca2960f09771db1a7ccb60161442f81f844636e9b83d0970b5ff002c4c2741364d1d34b50c1be8bb86399a2a12a22a28b5c2d05eadfca2b4095b638539d085b02704bf512f301053b450cdf995338f72d347e042f1f56cc22a846872be63ac65c01162c9e21012e55c8ede532dba080b7b7b42e159c5bbe6312e1cdccb357d31f2b1706da99623ebb778c6e5784a67b27814e528017ced45d72b4bcc70b318576821db8f28ee11ca2fd62cc7455598e857317732fa09694805da05bbcc1709785601f64e5b0c80b8fe30dd8ee1a4abcc983d36414b5d44534c2c674c269c610d32c58c3dd8a60cfdcb2156cef4f3c201cb40282ce7aa52665a5a9c45d0452ad059a430b580a95a9747295926f457a09bd62be217c908eef947351e0cbd3c23ba464a76ad448206fe07e2263570b0a7871a80322c177da1086b0f221dd27771c0941199934f8446c929ae92af5b9baf756bfa25904c100aaadaa82bb21c90cb1950e61b64a67b4571ca0577ea300d0de654a596a76ed952d8cf64bcad051f2c1a4d3570ee12ae6a4a682e8ca8603a5165fab963ff000ee1095a5e28d45f40a2b60154307ab8aea510c36b818c8bb96801cb2c2e95c72116eb38ebbee78d8048e544ab8162c4b25230bcf45e6267e3f8451735f6183f31507b799ae5825769ed1d3049654be237960a52c0596b96606961f30baecb83021294117ac6661175da10e4bda9bfd0ccb3805d037fba87a5f2182be66162339c1fccc6d81f5455d02d77dc543b5e0f463c4a132a57f764b10cf50287d92e9415ed75788a0f4faca8cd515f7397a4aeed0a45fea207298380d4b1f422a911aa87c87307a60ed2f84e82377086932973135e2526e0b2d774d5cd7f3309a9dba2e5cb51dba105a4ef508fb426a8f1324cf2c098b52dac4b11e629439fb483e341bfa62cdaa7a69deaf52acf560b27011498abb54ab645aab15b58287da1fd300dbecff410e65eda271fdeff00b8d0537cc0d4976191da2fdab2f9784fa8f7be8821547c06316eb2a7296752e17180abe1965bbbb9772b04b065d38c4bc2437023983d35c9dcf047f25b0110c7c1f5151176623b6c23a37d9e256eb759e0ec4b1a14c3a3ccb12fa09899f4105d832a042dea0cb5d40398a29340398f65cc9ee2f15831816b8163c72d4afd98250be8255af7c77bf4ca513c4413f98ea6940b2a189e8a6c628b4a1cc716f09cf1ff0030d5d6b58fa25672b7438f960cbfc53f82710de2358301f47eef06d7f693bfe2ff005c02af7d01167e09fd842d46ec51f76942c10a30b654025387efbb0d7d3563c82c4b06dfbdccafa455332d11b341f410f61cd570d67b87b492ebaaa52bb8874a4c240051b0b76eec8429a00e68b044db2b054313543ba85dc0ae057502f9a6d67275abbac7302d13d13906ca3b2f30a0ada2eb9948cda9dc9405608296a8ed1353624458d08a29b4c12f69553e44b214342638ddc24343352f038160f2d07265f2833c7c60e57994a54654e94e7031d101aa1179ba7e589b125ff8a1948a66529a065edd8c4960863919905c4bb059002049b00496160cbb682fd4a499c8593d2330d667b057fec17e10bc171af12b28a3bb0a003662058d15ba80ca257d30096241d407ab8897050ab1eeca7301f7712a295786b88776e556d92fad672de7894d595ac16b9bb042293958dc54103a1c900444a9739e6738c6880c74525d5948362ee47108d00a35ab4bf512286440396d12cc696772e3530a0736a2dd36d9583298e03a4a16eb37dc5554656495751fc3f698bb005a48380a43049619d836bb12ba1a0ff96203bd2977a7f0a97a9caa04a830ca363f2bfa876fe1b4afd85552a9be637df1240ebeff00ea21c97ee7ff007866053f04ab5fc315cbee7b9bee1ed259c7d3a6a732dda966d9772ccf781f30a97ea678afcafe50cafef1fdc6ca996b4fe2b3985f420834117e23a867c2a5f013910a943c780e5ef1cb66594f42030194c22c940708856144690e545dff00a855062fecccdd31a9756d5b2c933c38b2dd818ddf961c545a2c6530b22ac79e60d08191c89c8c710cb2f75165cb8971a22c0d4a14fe22604d4d662000540c339c34b55cb7923567f6821428d044d66ee66018b85c3de4e25d85893212b9655319808d760c0976c6d816d965c4a28c24b6295221cd260ba4ba10d324230a13545ad9d927f305872c3cfb7b9942072fa812c13885562af2c06216cb38877ee1e82963796f1f0602396276efe09876bb1c8434ad6d5c0a7d0105b20a952d65c562ee567dc19aa436acc28083af05cb22230a32b6870a46d4e2e34468e79711d026b3198eb5b4a25c73205c8b98b12f40cb1eea2bd6f302a07d173d078616b8bd5059dc6aab4f4a53a13e9fee02abf0bfde613cb3de51aa425e82a534039acb06aa17741ea5d5a5705abf30770ecaacfbb820d27e1bb81d114196633bf8630d9b86966bee71b0875ab6a4c91407097b415a2f4ea5ec767044374846bbc44ac50f4b885ee83f033186c7fa1838f30188b2e2988dbb8945331349414db51a03d18816bab1a4ed1c5379297db3c1624aeeecff00041ac3e307fb08a6861055bf8c65229f63ecdc681325363fcc77c3a85e5fa10b40ac42c3195d5988abc17a42d8ecd567f299cf9720fe22829755c4fe2a3456595e0be2d8a3040e1f364a39c9a10a2da97fc5bb08f6bcdc7a65b807cebf0751dc75fb436c288f006b52d2bfa50f54ad6d8ab3f89ca70228454a10bf29ec43c8e2bde0acaf313ccae9498ae95d2fa5cbb812e76fd61bf2cb4e2e72d9881ca16bf65061f230ee3e58118b961c7d21ced86167728053e13370fd491903dd23948566ac187a88867945131267962eba369182542ee10a9536474a026404717de65035ca615d91028422840842dc19b5140a7da3dac42b04fe5607843227b1ef3bd9a63357b6b9048b966ba2979ded7425fcc510d2170b1119696c18252c9bd5cae4d339b191134dff00280a376c2d163865988b6fc42149fb8344a0960c989cb38dd96ca48c2fed6651b414682c61f325718f7ea38020e88021d015d90783c089ea97372f4c45baa86e60f729da29897b5ddcc023a6de578189138196c5c74ab24e23832c026dcb47a5177465e524a2dc768a087ad4acbc100001db52ba0850ae332f2058c0289986d89bfb81a4adb2e2933051b881a88bf2a0962589d850207a190fc78fc4cacbbff1630a58e05a46afd40b64b1e072f6ff00d9a5c24f164a012926eddd84c4b0966fcc330c41a3b85cca70cdd5f7ac4a108459d0baf21517d212838510b3ab4da1b353b8c710574dd410c45e817abdb5702fa1075490321bb5b891825ad04f2d11743500a5dd4c35be40ac0baffde6a6906669aa1b52411af23cc307128512f92e3026174e7fa420068ef7935f5396d12b85ff0024a45a5c289f691c85d36d0fe98b7046d07e8419e4caa2761bd5d9fcc58785ff0061979b802011ed18438ce91af314d00ec07f44520adcee52dfd0c141b473612cc1218bc10bc308e1d01c460034e27cc228131aec784c6b14e8e51fcc61af655161dbd03afc2653c0c1570cd4a4b6e6b8b8095d0bf6bf04c478f82587ed37e78057fdd5dafa64c2574060dd663160d22bd58d230015530316ae288310651d1432a4bf421d85f42cd90f50175f3b20ff00da844ffbc13b0fb911a4938b2ff10ee6bb0b324439d9f5728c9ecc5b9544ca306b8c22792686ce34b0644668f351e1c1620bd90ec704556464e4aca184323f83c107a2159e713b2bdaf8896366d433edf02fe8660e5a39099d08b2e66012ae820a3e6730e81f702117c3a1888205ac53f0b826df82225821c2ab36d4e713121be7b4b80d3432b070c0256629e1a89052f2b71fe637a215173d2e2ccc92f10ca38c55266c82b2a0c1287a60ba8514401b70cb00005dc54a9a21a7dcab4038311c09bf6acf0c23e42525856820a9789840b7529a02d0655d88a5b5c18103dc0f1efa5fd4b25db7a20968c0092bbdc78a3ce5243b9740d74db81787d20be90e6ffd62885fc03fb659cbf48fe60de1e7f90a9c98ed54c262010ff2d455b71ddb7cf920955b57b778bb856c058556dbd5cb1639a9b1f1d38a9ac80fd8970b967d9cb3119928047a696168a3571b0f04144343e445af28e364c9d2c0de488ec5e10f9cbee7f0ce2dac1e4cca59d7de248c7c21dcaf72198153995d98c5e5933b8014c341bb81f181f6c482f36a32540df2d5292a9be563d0e4bcfa93090954d3d2c6e0d136df2c32e35af71ad7f2bd7f00c40f9fd54dede912ba1ad0a57dd86c988f20fd4a75caae3fba83cfe12e0c4143765f7887014bddb7fa8d53be237e8b152d7d11fb59590244e92c2fb4ab6cd72c2c02e660c02a84a626374d67dd4a60fa9132f4a1d8c546e0ab64bfb4caff00b5c52e073b66521f48a814d50cc224c3fc4e55ecd7f11a99b7871296c35dc820e1aa2a6aa7dc3bf4398642cc95bf44b3bfcb994e2682196c2186cc4a09c96c29b9718ded5caf25cb18a6fd8e12976518c3f861fce0936fe8a964e04e086b8ffdc4252925d561f04afd607c92aea2009033acb12ba30da99a218f84a9ff007625fe9018f48764da5421777288e0461d37483012e01443b381e513751c2ea3e947920cabc41051615b73b92963e43fee53a4fbff00d329fe787fa94557f6195fe89451c0fa809fe21365fa62dbf85a9b47edcb9bc2e55b7c0853e481f708cac846cc47d56a2984365b4a886d033bb48e54d4bdb8770e214cc1585d5da94959412e05f03e5612dfc07876799c66a3e6bbcc5601d801fa2114a60631dab965c9f038215a0e597096ca294b2a029604a841012c97a547596c9a05c0ae0a8310ead88d5e08625b4836f52c52619bb4c5a4e5838e970b5e87199d7f6601b3f3a8fdbf8d5067a0bff6ca09e5957e70c047b6194717cda943f30c90ac2259383c5aa222c4b390a233904cb6d976d8ba6fc459ff006f683ad57a05f6e848df0e48a18358cf241b175e094c80e189c900c038605b898907a58018b43c25404887344220d8f1f2780dfb8220e9a5cbf69610d2d5efe5ecc42ceae381989786e3dcd847d101047114733410d672547df2fa382382e77a2054bcbf77cb2c9e23a4e718bcb4584f10242cb78ba11442344f50bdbf18e02503cd1da0688c526831394fe84030186d087a3a4ff95c5e3639095f37cc40c3f3d7d53fd45c9c65839ee684a6c65554d4c7c88a7073ff0061d12d397f923587417ee7999da5e6e50396278dc43301f0cb140d42e2e13333493286c96c89b5dc966afc126ab5a83b1a1ae33fd54c79b8d0501636614bb0b5158885f981786216e99585515c9e61c619eba421f128ed3c481158b9ca464bd9b7e99bef13ca16821ef7eda8141c58a47139110bca2fa4c0b366b865da70398a8a5dccdf1fc4ca9b3dfc0ab9188f055f1319bfb20c463057fcd89b75dbea738a50d0c01d96cb5f4a9aa8ca83ece6206518e2f5159a18ce412296b26727d3de14c528b1e121f82e67679ba14ef292a0f1874eb06d2d76cc20006229ccb525e12b0ad115d7bcee174e1ecf10eaa25a5b478d66395dd16bed72e00693663cc620b5d6577ca8be69f6b9dbe59d4a87ba14725f244b651f172932fe420dbbae187867740b7617046b4dae459f2c2a10cbb65cb3c45828be8067131312a44a6600080d433d7d36001b629d402014c58a8355b7723230ccaf0c62ad6580352adc19be97161379630730371919544132c784c50b71ea20f24be944a00d7b97a810bbd0d42bc84329b0c46cee4c370592477fb499ead2ca56bfedb8d13e4e3d407456c75d238033f9f4854b4a29cb196ee3b08b0d4add112215667125b0b6618b83c2a8093399181bca39fa7a479518a7ecb0f38309eb032860f735f62592977422a59b6647aa615e10f64ef0b836316a4720edf887501374e53bc1a8d66fa29d0059ce7984e0ca4d933805cd219661b6eda11889919baf1836534cda8e54bf57cdcb053453c363e0bb631caeb6f315db185b3ebc54cde2f646fdc7e03f96601d96647d0fdd7f7340c4413492bfab62db9914e7fe5ea2ab34624c52fdd4428ddd1f86e66b20f141c3c2e5cb8942008646fc408fed1cf4a9e70cd07f12d1c6687fba297a178974029ca63b882d544b55b4f31045195034eb3065a75dd2898060ba2cb8a2bf9c52f0f8b8377fa170b8015e1b4ba5cbc6d961cacf65458a218ed8ae692bef31ff00631d5a05c72b69dee7514a302119711de5bb4af50383f0170d1c90bd620aac84bc1406eb6f2cfb5c3c83b6e2eb283c9be836bd5d337fa21af74d23a2778ad3fe2a5c784dcf53f66245634ac86056190d910a50fa954012b5fc9166037781e634e85a253681bbd03ebb328ab0366cf72f7d48173c301e204082c2901ae0e937996656ac969e869c90bd86b861d6c0f117209a91f99b4717b5113715cb3cb0ddd749b1176a623e00fc951dc209f0d101831583b3185810ccc80461d4a440ba7697192612a5e083e57025e1ecd060c51c444d47a6512b9344462c24b030fab8e874f1169e9e847a5cd8814108cf0bc4232a35304c62cc04b565876ee8d469ae633a5c21f9b9386342bc50a280fa18838c6e1f64bca2e12e7a625d48e88f9468ba9508aed0d8814225d55996926324c1963a98405962603b32ca4b0ad71154032cb2b610b1fc084a0cb986ad658bc6c0097a17e79acca5b4a86e5fa87f422bf98b280f50fa66868025ae54daddf2e22df7082dfe02fee32ec7c3fdcb9cb3d133c35eedc7cd11e30ed0caa65c7eca94f53d88bbc3195ec4544c1b7db66598560b50f167111891a2c68e7128eef7dffed07b87f160a3949669da1e9070dfb7cbccd4905102d04c7316bdb00c5f156da359c92ea9455174196177696ff8e0a0ece2a564bb53846203f720e25a40aef258482e55c9702b369aa316fddcc1eeca0a750eb0372f5a8439b26675165428db195b3dda96859d8d57b63850394182b08adadebceaa50431cbff00632221b1c9fe08426f50d710bcd824643220a8439e7b5565955937cccfd2b555b8259d8bd5c0a595ac92b5a2f746299678a6691ac42c307cc5aeb5d95a832aa07565fed9a0963576c586c3c552cb8da7b949c918502ee040037f0c5aa1a68acabe232b3960770e21a81f307728f35fee5b720d4470112a2c6b91c0dddf764f811fdc00b0315ce9c8c791517b5e5139bc20ca33508b8ae17674d403c20a4cda312f32d9f379384eccb1f706e49b16f31254b3b7f986a09cd1a5b3fbc35766164e068993fd92b44ba4cd1d9e82a01708f4e807a151e60ab1b011da183691c37d8902e81f40ec90f2abcc5d164b201d2b359e8adcac585d634c5836bee2e64e5e17ee2a219d7ba9976859ea4561138ae8050c1d6a63ab4c554cecaa0dcac0a3128287105c93ec7b8cb6e34bb4999860857af7413e64843dd6545b4da41a2f98ec311c885ca8cb84b101846d48dcbad60a9e69c065bb6c2e6ee6d6712aa236cb8fd0c1cf96b384a88f0ade7cb2f8ab8c025ae6537e9909aa5140b1ee26d04d9c41116d861bdc18542b1ed5c264c02264529f28740978f732cae542a911bdb2fd3a9dc62c5b70a97086beccf21e12be85a4fb0606e9638c3d020250a9979810b6822eb6745640c52c582227638f6cff00aecaaf988cfa72199e5b61bcbb7453dd1522fe8eef694ed79b838736bcdbe894d729936cefc39f0627fc7544ac5255a77c3011763d4156dd476909524def030540628c42630ade061459d2dfa099a7795b8d80794165cdde5dd0820b0e4090d45ee7ba81e13e655fda6e7707ec890166671cbf32af3f306cb07ef2f685c5e224e1e020cc0d55deae384374a0b580b2fd29fe596553690e5185d883161abd0cced2c3bd2fea20500f188ac8abf3006530c5351766a2992fd43b8603c5e98ffefb2db394a8aa6a5d8087949dd677712c37014ddc63a64b5070591086ab0d08545a4414515508583db2b32180a05623e5200bde4a72a171da928f33fa67305e57a2c4f5213cdc7b81610b3174a0083698c2f4e21aae88f03ca28a154f1335d89559dbd3c8998e06b133f750841343bf04ecce1acee7d44d976d1c64e4eccaadde3e7e27fb95e3f300d98afe62a0809469b0063ba8eacbe2bf1708884347dcfa4e284441a8cc533308c0e497062972911cee1fea2975237b0852ac7faaf91ccfd658d778604e38a881954672aea2578c1394dcb218ba7045100e23a0b9a165f9235dae3539a957c980e1eee961f4992a9b233e122c4d4e2a70794690f4618f4b98e8741b88e2e9d4a1e4a09c5da1a1d20903d8d92a652f946736c2b543396cce806df6c55025196eb3287e61c3b94adb2e5e110b3352c59570ccabc41d344a2932412aa44cd94bacd43c0e6a0d4dc08ebef159c1c04adac300c10629d0682b1d68442d52901a11ab77c1e6235922a2e970557f44784068195ec72c2c8fa343c3de1de0da39f665eb2d1bcc6b77ac177fd572c54116de1e0858d478a6869afe839603929e7b5f9e58b1f73f560288b43f96295eeffaa2ee70bfdcaf2df4ec212a4cb2b41ed62d21b7fbf3aa835aacec9962d9ab570f27ee0bfddcaa8b51f5ef68924dd811610d27bb0fb2e3a43b5f728e8f165c11c1da3e47909ac33996524b45d3b7b85eb07620ac1b17ea5ebdff008a06669f981b3010760415e434f7c4e7ab56d99812a420550a01f2b52c1c97d8cc32b51ee4ad447bb36cf431045aff00284286d5d2444e14ab688bc5f054cab461441c05460d1711cbcd432e32262006ea51c1f32cac9517884388db0d501e2638102c7042a0028177712d0a4e01c28aa88429620ad6ac235100facb2faafb597f51c5676f14ff00d88d5e52d9369fd29328f0fd32ab1e47f860ca3607dc1cde3fcb1b359770564f152cb96a7cb0874f76a1031bc32edbb8c45e08f10f9d95f831005c1a97d415c1313f3d061e8d581b121010383a214068d227be187405b67fbffac2ed590a8a296ed0be48e923ad63f51cab3c1055081adbb08fcab86a7cc1cbdc06d50c0dc472bdac79dc616e1572ea2cb972d97516ea5c063c37f4cac5c277ef10b91362ce59342caf85b5ea0c796286a055305eec4c8a23b598a6dcdd4329bb8177cf698de331182c41a87dfe90b180089be5c63e151a6fe0c7603cb965dc3f72d565bda7fa6254a8c6ee0f43d31c9730abc40ad30236f10a16cd58d63b86ec5130481ce8b980b6a34b9c62184014a16a323a2b709aa0d7b2252bb90f566e5f896c60addcc9e9773ca19c962f3a260f74212dea5ed636c5ce07dcb283747302105299561a0a663dc2d7b6e12d80dcb05185b05f3291eabc86310b4ad4b9e04124e626acb17350d1cc4d8dc06777c437ad850c32e3830b156f38ff0043306688a5446ad4ae08430214688ec7f96e5268af13318be71183bea8d2f970a84aa6b40761c04c941a105014e3e61d3a95dacfe889222c5a334e5f1129c068e023d2ee28cf750546ecfc9995d870234654f18337f818945f9cc5485a2cccfe45d8de0ae00889641516abcac71f46437761cf98e96857b1518ec13e98ab5957f6287ccb5a9a65e55ef02a18259f6418604086e9bfed25d3e1c5345b33cd90138fe8665e4e3b2aadb80ab2150c017c375ea22859f7fcc6c5d7c947f11a16a70b123199c6297772f59aab832eabf703567bac6d277e5851294e71427d4d86f3291ac0ef1420d51f4545abe0dc5ad65c10b73f52eeac839bd4b745dd26fc4e12ea552e9ee517447dcb25421452730e2af9662f823c524c802d22b7cc63aa3781ddf10718270c2cb18a26a2b7ff0038556f9afd4465284b3958d58accee82229c228d8d20828652d78aaa23b5ff00b98ca1444ecad1f864fa65a2522f93b438b55e644a81ed149e207e36f7a80979d2766655252433063d0aa705026810dc7edb8bc3613098ab950bfd51781f50461c56a4eda5c17ec7e2377bac10f2c253e254651b8f102c87c771c915130e20b6cd56da4563d2e32fa2f4596cb60e186636b9cd56520dd2aacac1dc8810a0f62d31b5931860102a2538732abb2237acc343b71103e7517c2523718d4cb09702aac88c2e6027128e696a570cc397e273395dc67d425c50f3dc34d4630ef36e84876e0071c42d4035e6e12591c5d149864f8830c3da150a5ccc560ea61055b2e5700a3144031767a45416db317e362b729572dc3ad79b202a0dca56b240174e495d903b4b3ba7519153442966fb06656b16368910990d0811067236414299da5a2ac151008059cca5db39732baf34767d56a36115ab7308abfea0d6ae63614ad54b30e09c463195512acd7cafa8d9d370cedd8e461ad86e6cd0c31080703a0b832c9b957f65085920f04beb097c0662d3e2a8286ad2a36aeeb008e5d4082fae7ea378aae04aeab84e2303225d3ef704673840798ffc230520f56f2aaf3f7e16730c8c1c3b926f50bef08e18bb98ae80be16b95561f50932983b83e36cb225ab0e5c7112444680e3c31c52bccaf44075b3358ad3ea28fcb329b5622d39af77c7a8096afa25ced183dc1d47e9827daf88d2f58c76f7e2b12c2369dd085c099de05ca92c722e2e99cbc51191b1f63133848e2014d16f925bc17deee2282ad9e5998a35c022d8082254a4f610a30658320cdd4600b44767c290a28a9f151d37946dfbb865d1adb06b4d958a22478fb80ef28e2a888557d88c7319730871421ca15ffac2615614632aa97eb3f942e8380455ce460f6e6bb2d55665f3edad5a4c10241455a65878dcb9c2b455a9429c466025276496ab0004615f7ef2d93e8963b154f9a71343a5fc3d2fb92e22983f1148d027d621052717884a4532e31718b117de2ca338a32ba77d24f6397e2503807c397cb1f6e22a6b57056d175ed3703c2bb372b5ff007fb189fd78bf8677113d9a838e97d165fe0ca969c45cf192d9b481001b8d53e6295c5555db85fe62c4b115e3d1e61e9985ba26262525f51966a260cdf98dd2124b54ea3285b38ae1d94c5452e2ed788599b3bcf0fd88fed28fed83ad1d95c9d100becaca1e6f6e6f9f9446288a2319508a13313307a866202c1839202ced1a556f70300a9ef7a4030af3b9052a3503960a47bc13a2029c4a6496b8152c8692e9e18d50b89983bca58d932414612e3dc2df300ad5982dce89b0e2a1b1fa1168eecb1ac9e255620a68919df3306fc983559e298156376c1e06aaae5936ceec4ab06e6e7de7682fb19870c92d78bcc5b00276aa8cd97a18e0f92e895e72f277fe840676f2f62521587fe0745ea5e60097b2015c7d66656d7eb802b5eddfd662963dd09ce33e8ffb2575563d8ff12e3e53f61107de9fa813cf3782551803b9b66da59c2d7ddb33280636f3a711df8ca37420d45aea80e6211b388941685d3a250b49ea1531c3985b0cb8ae77b7f8955501f032de489e2a352d31ec07ab885daf515ce7d94e226f4f9b8dd6af8e2738c20a165bbec47494164794a09b2e53a2e51e20d683128067e235d4566ea14e232d91a1b615c4166a3d5bf51c45d47b2b1b410687f480297716a0ee2f9c424addd52128ba46f7a814972a73246ee3c4b7cec47525eaead22990aaf6e62b0f710406de36096de8551a04bc4d5ea6af5d2f0521077de2b88aaace84dc45b2f925aa01ed9c47690f05c29b03b858a118c7c5f8010c35e3ff00ae9a56b2c060a16c0e3244ddb770c543406ffecee509e416be86483cb51ac1f0c35d183d6e71d6c2106d8ecdb81970a94ffb8468e679fc3b406d895397f6525b1537f61dfbc0355659ae6a591a8168ed2801ff00d4a2b5a838cd44be65d49852c399948fb26c7e108b5ba3bc416ccc8df2a4ae8f845e5e663698b4c082c3c1bdb5c0d911c9133d15b094f10871870c20abbb82b55050963b77064c9ee6e2c60a44203137b090902b03529588621a83c6250b2f9230ad1bbd99956428c63a0a94d38b8bac7ab37300e094432b50ddcc50e225d1332c2b6541e750eecd401694c16229e1800d97b5cb316d28bb874f9f8416400e19407c807c30189b7bc247224395d4843c89e6e0738ca64a511ca972e2cb971182168bbcbc108dcafd42078c67cd12f21cfd4260d76bda0aca4f737038c09e9eb51e3c4a7adb4ab45c047e65c26bf4e58b88bd5465adc4de62c285f17fdac6e12ecf92603b7f3206a4f32dc2d7f5982e0e6c110cd085dd89726166a8f30e52d5c531d22d38e15aeefa2d0965e62b195b8952abd5b17df10cb6cdb8882ad5a8796e61b6c1555f3715da5fd05ae62df3d03286ee58f0c2ea0b77502a519b17158af72897de26a166637b8b4317695af1141578632ec00fb62450f949fb1176920adc5910915fa3376199c100ddc30fbd3887e89bf40abccc40626f5fc4095abdc6e21bc3150843e360fd448597e8e8025d4f0ebb8aa2fb1cb142e881d825d612c65f04670536b96ea52969f6154df14d8858943c33f16c86ba6507461d78ea8b6e3b4702fb5c65e24615668327c8c3c8d0628d0b2bc1751d8dfacade480ec496df98dac66052212c15c41cc1f2c65205f94aa26c89cfc8944b7e8400b98acd7018686578dc7c0ca558a6db0ac82354c13508301c52a0c310ad593d253042ab8774691b43529171a6f88c22dbc425b757009b2e9d54b48106529055840526ba269608bae30950aa88bb22da8aeb9721613f0c220f1283b32a6f76e06da6ec86cc665157430580d0caa552a06402e62c5046cf45008a37f63284197e0976eedbecbe612c0a88a616d4e7eb8194637119766f7fd08d6044f65fb44a77867c0499cf49f48c43c131ba6ac97bdbab4a60f908685856c5eb34dd1afe2222dad9ab5f32610761d55baa4dcafb96fa65359873d02a2149769b6801cdfbd409456e4f4cc55f241b1a37a0809a54be62280ba08b7a125eee5ae27c21dd5be2310d15054daa3095cd91534c42347532732cdb2d79b83ca5f666d0a9a406722647512f51ee67921472c500952328226517de6a122bbc57bcd36c4e4cfd18a9b00162d6d68b5e98450a6986081673dc86ba88c7f4e6f2b90c8bf571c0aaa263cce19bfa75916dea71fea5b536ac5dce26af6c752e819081de8d830acb5847c83a801c7e3254cbd666b00fb65a0431775a23b8b70fbaa8a10b8cbed0c25c712ea2f525b64556a5e0860987065a272afc59015c26064946a0fcc419959a612c69a69357bccd42c01cf61ef98208ac5f291fa19a57bf4dc44e6f896457e50b82e559d8c9489286df7efe6049317383d6e5c9546418212c82611ae9b5432bd25a110fc9c907420ca1c54e5cc04cdb2ef99b1985c06bbcaca18add41b65a1c2005103e08a8d6a66a8431788385ea04e35cb1506d730183880e604a89944f694225c3b815728b0085110230d076c77f5330b5821bfae88f2f105d8d665e6a0671a5ba49614a2316cadc0206e0cfb536e0ea20b2eacc4b389c0f114037b563e3319750afa4628465207279622822e6e2affec62416f2fe9611a70e7cc876b557bd4af4551cf031ac760483c3cf32c2a3eae5da32fd9cfda958f7e8096db23fb54c47918559655efbce2b4abf98ea9e0601978b861b5a57c0c5bb22db73ca2627e101cca425a5df3288d7114854150c66e25cac44a217500e23d830ed09637149d25ef05bdc6cc147789a477b621744f0ccb6c2b1cc141e843963b622a2d0e18e89598782ce704fe4885d8959a58ae58efd33f6588c442f2a864b1af6c4c3349d3a182c18659c5663217322cb3533f4c4aaf64476132e8fe3838b65edc98d6ac4078208732e5e8a97c616258d111d998d14bc53a7232e909f641e998accc0877612fb40739badae838218150ce9ac95065a814f92515dd151dd983883081532abc430b01a30d729118a09501d925cd14286914a453885b6188efa0c7b1c2c622725dc664abdb24d91aac0fa8004928797fa96263eb127686cc39dacd05cddb1a74c7b3bf24b3014c0b44a815dc230fd9ca2a85769ec466ce04e5805861291c0c4573d32b6cbdac54ea661e61087682e1c44b41859ad8c3217b99acd7e600ec7532ca8568d44ddb67dcc10cb1b88b071f718499819948acbd3327798305e66bca8f7097f33394c5c7b30000405aa10375b4788a28ba030ebb6fa19b8125f73863e221697334aace1a82d8411bb0968edbdef54c11a086be5850f52d72f32e70a00d0e5ba1f68a745ca5f7103db0236227d4ae0af32f550f0152d5584b203e35948bd87eba431e7fd636cde125d3de06b52c8783f98a8fbc042592f38a99ef2bcc18ab2e15de2015b959442897cc6d9443d4a5e23716c6220d47ce231ec616c6a5d9b83e634b286a5a387417188e9a9b18c70adc6195316621ba8b308a12c977a82f54ff670c4b63bf9364df2e6259c172d245fb67ef425229c8350f907dacd9d16bf7d1e1856ee1e3e2280fb5d13422195e59c4fd68330e4fc9836cfed5940e60aaac47a629d9824b1d315b84e06943ee914e6d0a6b22c0617033994842c020643082c230d4b01d25f464b84ad971186f3315335b2040c8d70c66195dc5163b60155818b60de586581a26fe30bdc0d4180692ae4017c92a90da37a1e099ba151797142bac2ef198d91cc45f7c403a783990f0479cdf771af8db54a6a1ea1e22f41151bdd0a95340f0022b97d951c9544b977a4a0cc3b2b3ba635ef00ec96ad8895414e504f7886b963cb2a3015d98ac94f72941a8152a0a8681edd089e585506985e06680a95639217f19571cb1128a992a27294b1276e852358583118c64452f0c358bed05c120e5220942ae0e34532d302f3ab393621bc20c041b83283657b474c55042cd5422f88ec42e1b6d6c457d47a90b4dae0e900b427d224030cab68072c112a0c20dbdac88d2d00701d88e2e60bf17ea6e05cd3af92a0aa642fe90c3c36caa94577cc21f89fee4060cbe5532e48b7280f0be927b5d3ee23ed094c590fb104186e3bf7a3fba8e8801884c12f9a8c3d938b512e11a6a28064c5230b83d0c8e12ae30a0422bda67925d136b8c2547ca2eecc81980e92ce26998a02a84be25ca44f0f46e38e82929b88ab1e494b03ddb09b003885f19478fb4d7ee0a0906e5976eed35fe08a535a321572ff001e5eec7920e26cf52ea99855f52a5436acc1e59ab736efdd960c4198afa3842489e12bc076963409859657e588425731a45b62582732ed3bc846f44741b2b5e65f768ddb5954ee4504ad0f30e0cc9229a09514af72b0d9b201f09da1e239d055d7b9a3ca6235db4c013b75d8894218a5c7b51ba63c274d6e7a15f4e79d1cb6e77184dbbf45ee5e5944574898827518d0bc41a2adb6f12c770655dcc59645e4825e6193e082652d05cbf99006a5307e498e69619221621d68429c4051811a94c2e018a97113310eae88ac4c4bc5e3640b9995072cc419e6ea10a9ce961ee9e05c42b79c63ef6c7636217873f3090c66a26c64170b91372d8c05601ecf0c4c451f0242be32a21697f450992f427f370082ff00cd9e0892d8ec0105ecf1c6d71476874655f03510957ba6f14f11b8bd784ed03c01753dd5c14b7625c6f744d5c1510969656ddb7026aa08590b6e58a7ff0002e765334fe760b7f07f3150f23d16f78aef5d97ea3f9896b3c5938574946084497711da0ac5bc4b5c94f888a97418ab15d10516a6e584bf117f13296d4c46b8877b8c133167b4bf30a94398b2e378b32ed9a2362123062fe5be9129637109293ec403337581a7c4ba5b5d531a041c57f341fb7403e199acebf0b46195bf674c1b37095689773e98149ed3e1462a54c43257bb955e65ef4584352ace6d12a12a8628ac72170442a7611b52a8f5a962fbcca2577c6843cb318b4c78a26cd451064c8e8c063ba2ad95132a22c77d629a39a820a207b54c238a61b5d3154192c258f4710252a154e0c3930613148a1d1a1f80cd4ce3a5cb6133fbe853575096ccbd33292977c059dd4fb83645a799e0403025999209506d98eae732f5a1d47246bee004b399db1605b5cdc29873152b95406102e04b8b8bd9537901bc5cb03e48e5d45371883899c4524e088b876a23471ca29dc75a285c65a53b8bed1111a722ed7dbcc701b26a0c1bb2a81e23b56b050570bcd5b687b43015a398f9dea19b3ffc6e15e7a4505bde588df2edf01c097c0e65fbaa76c342d198b11d93f623cb1a7ba1f654717c621061b5b9923883ea28fceccb9c2a2bcca94dab41051a3862a692168252517b2a73dd980dd73982f574f683f17154e8b8a1084d94a9893b3e9c751a9edb63cb3c421d00bc472c4c7784b9b80111710682a262c7383a664ad2012b03048fb4d2ee5bbc1dcc11b105de5e5a5c373697e65e2025cab94796770c518b884a4890305430507c6502c6ab0910292d42a22922ea314a820a4744232b89600e5e445d81e13492a0ed64da5e20fbe02e764a129312d7f0c6180a8a7ee64c56e79231826508781a2a11dcb13680c6966d2c59e97a637370f28e3a68cb46c6590da0cbae85962442d73d62199711771a9eb7101b855db6dcc16661dd655a020a3476c501659ef2e5788ab2bac743bf4612544a10a80ee6a15686586abfe18b6372d4a65f946513bad4341806a5626be234b6e63d93197c12c2f9820a744686d2d6d824d609db457c502be51d92c8ddc694ab8d5abcb16c8a57822c8cc2144437308a8266b5b673b96155a1480998a3ca2a379c23e02580cb5a965e30c6c1430a65db5ed101e32578ad7dcdc286c96add5c410745e51e657c0780ea5901d45d2305598a0c0c48d9c2ad24500a218e9c8114ed3b580381d89aeb083e9085d9ea05088d4a674e05b744715b957bc960713e94b9785f86035704c7f6168fd13682f2e839589cdb755bddf2c32a40a2548c7367e809c55f4ffa8beb96a77905956b7a63cfe6584a718af9b8e51b54546758e4e784405e5502c2107333771b687c04216a86f37145c1829692eb73b51f3e814e25af0c2e4c16441f2cc48af909500ba5621734948518b38263b12ea3d4b79b7e0eddeba368b98af12f68464f72e9eccff6271bd43c1e499434e8585be66727a1672289830a48f9ad8753c89cca36256340c3de00f138631741826e28bf1989a55f30357d06e18e8201e712db012ccadc17514ef312c1ebb16971e971832e58f4388b4cc92e3bb895e578e84de0a61a4e83e6e062c145b8b96175d92d966160e052766182e6d7653fa8e4a51c5ff44cf5939a9a8b67d3413b95ed854b6f94aaafeeb2f50fee36e3e881bdff0004c1a258d352f055cb1589cf388f6b86a2ac34b1c0d2401533b82501d9cb5718e968c4b9668e2a6ce81b9c9062d3243c47bcea15bd998c8bc083b95c12a90378dc47b4c599c75b812032c4d4b9b64bc4fab31180be107bf7561344fb2197f9a567222ae10f030ae4bc982014179ce5060d3bb56c602717336874da47d919e5134db2a3ad3463c9ae1db69b7f24ed100a41e7114f4c69877a7a6400ba57b12a7638b3fab8d894d51081142034202e6efdccb08dbbcd6667abafaa4d98f130a99d70afdb7109f909f0c0b035fc1c1e597ad711781c0865cb9e40ebfda3c25859cc16d7d6c39571d4812b8842aa414bbb4fb65ebc61251abcd4554f0c56b2c0876399fef65e7564fb444470a0f4417c4bcb39ba8f91151b4a2f0cacee155dc4188f1388f98e29c115a9a47bcb440f46d0c2a2c3a620574e51778a45d5f465cb8b0602a22058971425ec8c25a197b2308981a95aebc313d5d750115d4eecace8c4e8c08288d27308342b85ee41830a08ac91a08805235ba85888c7a7ff0079ca02409a4951586bb1f24691a89b13d8cb2182e09193da2f3d4a9644f13d2532deab89d4b632e20cb1110970e2e16a51cf84884624981104ba898156618bbae238317da658a376ed84a039a043b56b949c6c969f53112d171fda98357062aff9a88520f969fdd40d975c3c7dc473441cd90533508691a3369412f47e660727a0610d9862da6f088cc6c0d7789d3f290d207dc720a7c41997fb2398fa2c00514c82b672fe212a5f408bd585aec4caa77cd47e01edb9c28f44da7c789b71ed4b36d2addbd0f0426ae0a3206843c23483588d5b187a1b862c1681b09f1a0c40b4161417af1170ba4421880d25711198ce4638ea3d5c22f161877a324e26672988c375aabfdc1475a4e1077fe84b9567cec516b7617c025c831bc0ba044184bc99045c872238b1fb8df62596a85ed5a2aadb9a7727c7fd1317eeebbdfd04dbccb7e3942c00bde61cb3dd3b4e5dbc3373e659eb605cd4d9384bc0f720056d43dc4bd65479aff6b1d4ae5aff006c4090448087a94ac6e0f2b1a39848cc296cb25a5d08b9ae63334b89cdbce5082c0a816ee2178616ccacc4d2c6c71738666098f04b1d1181861c92af51b89e60622bbc345836e48e1cc0473636c97e84b3301db1a7b94392931d20ca04e74d146c3c9715aa78830c6c25330659237ae84102a853be310595615125a46a5c06f5e9337ffd4b88bd9519b7f410e25ec3fb9b21ed232a97c5a247ca2ca65b330e8be994cbf12a12648330caa944ba943702a9ae87910cf910853688e166e64c1d4050d45116f33b11216c2b18388624a87beeb16655ee18a65e082d976d2bea055458effd611c4f88b6144baf00b7f32d57bd5fe833177bb55fb2c8ead5bc1b4048d0f7fec97c02c4d16be58db2ae563d0fc729849c4f48aa8c9a8c18b06568ad4a95d1500952a54afc5495ae859e4597bb5d065f6f62176327f1fd431b5630a7153d19c32a68c0011046c51130a8f55b2701c92e82c5f2430b300e9d1b04b041414ca75150de63515cb75c945bbb132e5aa380f11b7ee003e7fb664dcbfc71c63d42e52cf43e6a6e5593b44cbaacb3b1c4600c6069c7612aa8bc1c05352fcd9e989dd1cb24cb4ae8a59e250d0434cef1dfae0f2351ee2a1aef3f1c466f0832eef28dbe93ad9662563d4b705198c0acb306147518b89568e50a6c2215c0aa83c6664e22171e28811513cc5f09e35157b96c32651492d8f42ca96426786170e15cb32a0788d57424a0057b11055c7783776cdb20f8fd24b8733dc30c89b0a456dcb1d3f6a9eae1ea31b6574a1edfc0c22fe0a9fcaed1c887b5c2ba8bea05af872025d0ef99397f3c9a8a0516531147e51ec397e8f0257f50023dd4eefdd2fccb972865a2a26e17bc5598ea2ba60e8b654a667a5d71328f6ca25b1cf55849528c36975354cc01056cb8711308853a878a8e1a550d6cf3c4d4d7d0c0432114d1457722ab0db8b2caa6cb36ca3c40281db41f78425ca2d4bf22a52b7dc7fa5c1fee4d945b47b197e48ce09bc53f84e9e2237d0b95f8df4e0fcfcc63a972e5ca77964af4b2c5cb8183ac231ca88e05106f06e8a27170d1fb4394a80589566499bf30649280d40daa1b6399c1c0045390c558315787242a97110b10d8b50d14cb5972c78d339b3fcf4b62f827c5fddc6ea055f6d47952102c927668b87bef085a442f22454267fa63c45dc1e4cfe94235c253f3114d001ab6ea65f87273450c6edd3bcaf817fa6e52a7d21a4dc644ba76194d12c61982ed0b331f82653e1202ff0015153b30e766206b0625dd323b975cc4b867a4228116e288a8aa0b789dd5890144aac769329825bcc15ab9846cc0b9466cdc70c72cbed3885ae06e665ae1e96c0e97d06cab5923611518db98dc0245b44babb25e3ff705917e50b45d94288398359ce65bd0df0569f076f6cadd00a0d030043dd8ef02c6ecfa2e28c10d2ed505503240c6598e92083d0550158fb7b970c034a37b2aa3352b2187dc63d60643342f14c3f8114a14089c724e00bd4017f6a82d0fda34dd7e9801638f212f1e8fe17f8833333d292925b2fb90a624b8462a88b122a2a6d2ec386731ce62ef324bcc2ee2a8a3733170e5ade3684c58f2bfd2903b5763fccd8229f19e61b3cdb95b604e6d99d65416c48d997739fd3715c93ba29f55060cebc95f42118317adf57adfe372e5c62f12fa13d14f94efc8ee7a4f54f3c70d7e0827d0145ad9e2f4bdd46dec3e8635bc127bc2354a307b262d6d7507a814b3dc54f4d32a903ccb64b52959557d9925e527002bcea5fc952ea316e28c57ee63d7e4b6f88fe1477af91b2a3f600dc155104780762a822dcc8c1eefd44650ce5451c8e3ba4b7e640a3d9f7063335e645a2a985141bf1d08ed3264983be48d5cafc845247379278e2352231388da84a96941b8c28bc3d23c6537d0b9865948989663ddc298405afbae231d045378f79973558964b1972f3b8be615752aa55066611b31a98740acd75296ac4c8e225a7a4964a58c14e3cac016c14c4b5a1cbbad3172c6c94760e57c118efdc9879d46a9392d60002f4be5686562975fdc314450dffef501463b4287c92b0184201ec471e1f1f30c4a06b40c55872f110d19419e8ddf62360d5a1575980b35a3741e5623a798bc2f79322f3072b2b022fd10a5f4ab5d0cd085d0b3e6505be1630e67bcac445ec58b2e2fe38964b95d2e5fe254aed2de650cc92e15d33b3298ca4bb23071061d7528be948015a7c304bfc11f72ae96f049cc6f525c204b7ab4b8ed31cb4bfb8fbb541a91cdec3c12baf4e6a80b80e0ea1357e7c78730eb71bcf4b94ef06da0b60704fa20d549e8821881c8e15ebf6439dfbcd3673be7f170b8c1f10282936be902e17e6145e7f728e3f53b020fa110bada55f12887407215d1190d179da56a8be0e6509bc1a30738181aa6a5dad0772bcd0978ca6f12c3d91e4e6ea3517148c85ccc25aa0641bed0d23ea97ecd333229ab3ee0b87b214483064cf96661119de9e584144066525a1d7e39bc7aa88cccccc322d27d84106193c17c4516f77d3a9c363f3396434d1283115774e7b8387a5dab7734605b1b1e4c4a7e26fd08db02c156a30c4c1af983c3a1fc0630f397ef052c8b8e277a7ac0838988cca9dbbff3320650e663ba0d1181b4e824964c12f6c4815bb951df400f13d27c412092e3518304236c6ce8acdd54b4c59508dbe4b96d0e0073705ee7f2ff00e5005118116fe9c108c01044f6c0189ee6390d038e4c033f410c1daad3f947f10f2b600c183c10c9cd7ccbb8f947c4a0bcc128f3cb56b14055802832a570369bf07942388827cd930d2222e3eb1785d8a515886763c532f4aa6e91d6b539589434be118bfe0ccccccb66616ea532d20c66a2dc4e9c100b66a2d63bba1a83159532c7304201063c90116ca6b276607d8c0ef8f35f0dd4e545c2a7d584284eae0d9e82e63063b93851000b2b020076adfd0c4a6a859c222562bf6961e89b1ee154cab64f8870a4f3e06e7d7728e57cb03cd983a0caf5f4139812bc893d53c845a9474fe64c8db2a32995d144aae8a9625ce2610a999e39dd946f649662b825753c5c22c6e201b5cf62e353804aae529b31936f64b8ece63e2be60c2ee12e536c116eed96a424dde2fa221c354d60993c3931a83c4c0f4bcf0107e2ba38fc466463cc2b08e50f718befee9cc65abc65ee5690a060a7d5c54fcb9faa96aff5851751d2f50ca2aab92f2543a3ceff00825d0e2ba0e268fb8ac998c3dc5a6222bb81770ecd43dc27b44454733d988020db388e4681a8cbc1f52c317510ec81b97dcb537284cad731c5b501460cbcc316e624a265ea35711978e82a1ea566305f7459ec8022d14c3032ec6e5adcd66291a002868f24df6efee06040c2e0987f0037f32908f12e2e4034ab70444282d4be3cd92b0a83d5a9095f64f2ae528dfd88c5731af936997d051e120ea4f2e94bed1996a981f5d75af851d1d9c4a5c2a803bc3517d8231180c0ee116d87470911797b63b960fa975dd9c08a3d1e95f85f5a9a972d2d2e59287a0b3a512a0828c1599ab47517a8a5dc1acdcb61a8a623460840e7b0470eed41bd94996827acf80900689dd7eaf532ee7a4feb923d0d78b1bf2e9615829a1ae6af5deb31ceb2fc4c8892a1a6a6e1697109502540823a8d946a02e195e7a6dd16a950cc7413d7a296148a548e8acc30a6a70c80e56894a366e6f8a00269bec542fa9fe098672b1ec5c63b14fa80360994e518b4a20578509452028a590ed56ac5307d51674f68afb7a14cf2d7bc8e92a398daa20b2e816377918260bb9d0c36a9550e994f7ca34c90d5ecf2cf11065c7b096334ca54acde545360d04e41f9098659bdb78e8cd8cc755719e7f5c58b1bdc2ab5015aea5737298f946f28bbdb0b86aa19437128a9a8cd4b6cc1517d84f408017607d11f00e662ae8ef15565d155986b220f74b023c1cc668c4b2d7918a9ca6d652e0aa51f715a999654c352d3d22cb01c370cdd1d469603a0f891c934598bfc80b5b6d1fee314b6cbed2902ef981b0873a49454f6152be654557cc0d7e928c134cad9b412f610fe64eddf308b297c13784dbc449714a31160b1bccdb96630066aaf592e016d678f2f825bdcbcf2e9da021563641c424c89a603f353599bd50f95892998e1aa7f31c333c508cf2054717163d57a666a5f4a952a53d2a51313131f8665c22bcc44831cc3178b0f332d4822d43a11e83e61d0b8def14448dc34d2c0807ea5f44c3f260c4335e8f72ef3771bc6c0826005a933082b98b984096ed08f84ab94251528f10a2e8228b2d2ec14056a5bb41dcd7963141a99c010205ab41de1141c1b04cdb2515bc9dd07843ed8b146e5c7b24f57dfb9457a418c8b7f7497a0673430f622ab528f65c9ea176ca247a7ae094211b11a653b7789f678609202b30390749481845e5a603ccaeb7b5d2cd320f03f4c0182f619832c7ee1d2a6d6dbec99445c5f6836bdc584b585eb1c8d62ebe2321f6cba4401e5e86b14c029865cc097bd4c2b94889399a6eee32ed221b949a9754cba210b70895b664fca1a5314ccf637327f11ca665f71d81134153372f1704bad46e516915e88372ceca223bc12e923db2ba5764b76652d4a1b37833ca414d3d14ea465801b51505d8ba26b66563b265ff9732f20fb4402e08c355921d4232eaa671b19941ecc8c4285548c52e1d76479229629c6591a50303273281a1de965248f36a86d08babbbb8da85b207914886bb84fe41e6554a5c1c12f81dfe8d105585832cb01ba5b1c562719b1f0d4393045f2d5cb8f45952a5c098875be9897d2a626215160d4b2350617c457b227404a65b16d43c91e265b8b90eac741942c465929482514c2f175f72cbdc17f49987cc3107c93b58903bf8c098647a92c9ef1958d4bc4f32dd0929728d040204a399f6e969496d40b2c66f1acb4af5018c456459fd97040acca29fe81c108486b33c8c710a00d12e2c62c23ff00e028cbe7e29fe370d303fad981c6e636e43e3194689661d904551ec89d11a98258078203a1d06311f04f944b1dcbb7b74983eea1171d33ef6749cce4fe96122131c9154b729accb7ddab6015a6e19b41c74db7503023d19d512a0a6621160d14c589a4bca4ab1404d91d5e64b7d6628ba9afcc5667d10c910f4c105a805839b1a83a5240b60962e40a23cc957a945eb10ae6a6170250704b5f105c32d15e196d31c06e08f328dcecab95bca139cbe8b80b3e513000efa8471bb83c1ee4a7a819afd08c4206dc91d1b4390488c41a30906b152c3dc21657cc64bbb22a08e3c0ca8e85896bb3715b5e563d467dc4b57fb8f8c8da40ef7733644bad7267c614879179e0617913c2936c461b497898078fea2d21150b2de8fe372e5bf8540e972fa9d1e84f705265b95d2a99f12865e052913be2262ce8419506aba1d34c158f981b73bcb0115ed2802de23dc13449ee3ed496e975ce7fae8ac4f0c4a87861ba947456373e2540f10e4150ca1155a99421257456623416334055e5161ebcc0c16d5a72af2c04e5414aff00591c565f462c5e9e0aff00b24bc662af8fba54798cd9f065a6e94a668edfcb2ee2c822b8c4625fd27073388e70ab2a0e1144f52e4bc1c6667dc7283ddc01c62c470457151f12ee9f5517c115ed3bb8304270f795c2e0801a61620e8edb8d0ec85c70c1126d857b4f44b51732b517c099c22207312d011034cb0c405d314ed9bd433d88b7011971b6918daa98d44b360e60e19c5b858b9e631715bccbd6f32edb61b293462cf32907a2c376ddd534dc3a0e15589de09595c330f8bcb16de211833bde28fa8b19acbd3f90a8c82ffef233102856c7fa8954fa483f769cd0fa7fdd426118cd87f3292c0f024ba67d2b8a7637b03fc91ab2c066fcd622d7ebe90a7c9710f276984515861ae05c117e0bb2ebe09f346b157dcba1740344aec54375a5c5a84d0f73bcdd875aa8fe245fcaa04b25f45f40e83dc8c57452fa0d4ec45b840523508d5c1ae20c121bcf42518b989514873260356ddc1a325413f0b86626b33ddeba3e6a570d755303116388d33043a041883c439452301ed29edd0186a4f6b57b072c0c9df5c93bbfea7e80c12ba6b94573b6b30c3d2e2c58f4f355dfa12ef54a296ec7dd24238c1f6ea08382691c1ca4553008a60e6389a8596c3570d1d187361148f00b5d519a71082b9c465c34678885515e609cc71b65e3b09b526d895a8dc94cbf89a22d7b2cc440cad3fd93b8a25dd838bcbdf41015329f48057e5516dda824a6037b98a3313d42af88e18977c44975329633322e5bbdc300960d470ccab607c4b21be58189623259de202540a2d895570d9b982ea2516b107515c90a2ce95094479609d42cea0bc0d4adbf8469a62147797d2a356c9631645874bfb25c784e658de1a6e70aa57be86510890350732f567870c395ed994c6eaa20b60f3509057dcb40fc8bff00242ad0e503f8b97590611fe290285d6e83f5644804761bfb9629d5a8a7e99449cbb17f612a5bd57eca5dc582c28245ec42c14d779da0fa03876098195d0dc63d6a63fc55f95c62d97062c3a574160e3cf510cb0f0c0cca9a9919a4975c22d2c4398640fee1825366398b84564219b99087f4c14d1e4e48840c7680056cd8c2316f885148a2c2555b44487761ce13ae0c06e0421014e21e03a041e1824ab6815baa8791f753c942602bc68780e2308a3f42cc10a22c65f4b9717a83cc49f224b3d32eff0084532b2ebf4172a798b944c22cb410ceea732c97cb2fe9f8114afe214d7fddd32c49f348fd92c489de9fa63912ca3c0a9b386fdaa97ec81e669de7660396e27c420f5158eccb9f8f4ee6217a5d073ee2c7e63e2667343a297acce3e92b5f65af868866368f6c74443b91fabb8c1ab8b11d4561818dcc460232a630e0897c4a411c4b22b588ddc545b2aa701fcb343323a4a1ee4b1a4ddcb773784b533d150b5637a9492b1096e9cccb9ccb5cbccf6803cc04ddd60f31b805970ba1e6203b5ec97d0038e44b317da37ef83c41c83be8ceb6e9c24551acc04ad83766fdc7913c246002c22195c988aa1bc69fca2b76aef5feaa090997841fcc3252fc49987e100fb8b3e442afca97eab80f0ca45aac1558e811ff00f363f12530e804b48f42925530b5956c1c4d7240d843691530798105da575e80b952ebca30c80e2166095e44340c7a0b884a5bac7685a4ee648d84d618d4ac7f4cd9edba18fd11d8a933553da1836e9607fb7368c7d03d12fa0c70c5add04b101b5febcbccc270b6bb5775e594a819652197c4bbe88b1e8c58b1665801ceb691748d01dbcf98c4d90f8b7a6ea0390fda761723e15412c44207751d86a3d42bdc2d2cda7df299c96f8b492c955cabc0caaca69fb964b2cb8618d19733eea5e488bf8c51e610521f095163c9f114bbe108c904caabed2ce0157a0978e07f44b9c1a3cbb975d4652da85c52eb705e099e8f781801728657bcaa7d412701a99139cc5565fd572e2a1d2ea605095a2cc64b5b3b4a70cb8ddcc06e2225c4606352da95aed0edb2972410972a28adc5259de584a56a0dea06bae339885c1d144c9a65628a12c8e3a18751ba10f11edcede5962786076424d23886711d73018a11379d788bc805f00f7194c115ddda5b560f84819e4f312029eee0a1fcea57e78ff1e3f0bfc4b58f550c44480b6f111195652f99c8829773998b0ebb2c6bf3823bc50dfb31aa14ce6e3429c0195dabb9dd4b561282e0c0d7ec8691473dc89aa1b3319ddcc6c8966e088d795a61cc74f6242ecfd483e5c3ddf31e35ef246166def320541c549a0d9d8445a76c73e59fc4056680c101a14b12387c4b18c6a3162c58c0ad54685ae3f9f52ce0a09cc66de06f407a922af9c476f87a7db802f10f92e563120805ac8381e619e4cefbc510b7a9ab376802de2b5e182ed008f713842fe68dc15b96ee2b2c42e9977ccc118b1d8a8b0d79aa54c448b3f506a1a1ddc68b999e210fe703d73185285b7d88ecd416debc4af7986a08e88a84509668c7474d4e600e635b0812e896570c62a5ef69a14c531bb9b33a28e8bdb104f21052b48be661e78981c30198253116f8475a41763ea5c5e155b65b5b62ce20178ade08a5554dc09646351963d919dafb84cecc9f3d2a5ecc2de100883504bc90a38827688b212b0351b62a0b552ba894d45b88d10b711778eac15dc5de81592bbb90b030466f0e6e57e57fe5bff115f93d00df45d5cdaee1694c11b84c2cccecc43975969dc9740acc12703a7b44d5577711895840024ae4802614b1086a5cb1349afe208895128620f6610a764030650291e4650eed6df92e3b65e52b83b0e0977ccc3cae4a323f7c98bd58c5971602c681b0b0e53bf8225d5470462dbb941ddbeec98b2e6624028a053d672fd781f7874bc425b9aabb964163534254215c8c0318ca432dce207cd511ae5280fa81d16c8c7708ccbb877ee8f318897b9944dd8ea5cb30d96a4a6a648eaac525f0c7ca931f2c0a46c0a3cd4b0bb351422af11b854b85c42d80b91088d331de31676316629da77e2561d199333cc8adee58e605cc46c85a2282ae566ba74b0004e7712960096cb80dc0db2aba09502a52ee34df45542d95d2ae0055c5e6623d91457253d0b97aad71c470b43edf98d4912eeec4dc99d5e489dc41e9f303ccac42cb94d6a6654a1e62089e13bc455d44b029a0810e9182102c2fea543f17ad7f8ebf1a9535f913152a76835047332a950194eb9b8c34ec8a2d2aa610a3c2b12329c25840a187b36a59cd63e5dc402cd817e209164148ed097439890086c937f7212c335625e205a6172bc74c8633da473474d300689fb314e60688b7d1d462c631655c6c9f83fdc55a0132c5c5c6a7a5bea1318b2d9f06fe8656399445f41339012c33b089366e660ece8ebb9fbe2edfc44de1558dbd16d952b080ae23028476fdc62cb7d6edc311482de1369769b0454be66d072475ba6fdc5e03079596b5196055335cc118c5a5a5ba1df459b7a513705d4aa9701114317899a5983fb80a580955117a851ccb224d6ae3b18d8b0736c72811466538992b12ef32e36f30d6666e62e30892a24710a8fc3006b83510866fa5f371e1c5a72450a3e0c437124eea36055b2f620dbba544922c805ae65c007f11e4b23f849c22b5840e21492bea32e5c37b5f092fcb11298a857ee639cfda92dff7314afe489acd9de1444acebf2aff0029fe12305f43ae59c32a0b6054ba623060a061b25d66e2ba82b986364a08782c84640a4e6aa8586d1b72cc0000704a3e0bda612515c3e18a9000dcbb77762344aa144110addd8318463d4e4b3e4fd0398c6318b163296039f4216b0684dee3fce74f3ffe82e7bccbce6799c7e826ebfd895010acbac608896ff99dca03b11216bb8c76b799780cb55c3fbf1255cb538653bca7518751a1060c6573bc70c363f7304b8bd99728e9bcc58b1801b4bed98f959f7cccf07109de072c0ad45aa97131b8077815a842712e5ca599b8266039a85f3163d05aa9744629e10a46392258b1716481697374712e23566a3692d51d665dc5b80d47974cf108933d18c7a738849b20750142cc35e7004c62007d32942bb03b44025c853982c8aa30e90ece1db90db59571fa80bc186751e14b65e78bb82639ef0e6b9635a7fc87e67e610aea0cbe84e59a212f10c328ef2a09654a79814ea5a8788a1ab7c430d3146b2253d15cb952d657d4681e087a5818851295467288cd677a867f7900c86898a7057f23d58b17a01075dfb65cb8c523111db1616818998056ddc693df479f68b05fe63e15124786ba08df23e90499b68fe2658e207965d0db51f935830a1d06e1e0c523f9863ee9f5084ec2b411223260e5dbd11094468d12f1d111d98b27c4e7a36a2f8176a7e600120d32f0a6e661e1ecd45502d4cb021d0448145ce2508a17d19708a6899e58dd0dcb59954ef8ef9968eabda3520311ccc1dc458b384b8f4a1d0ea03508ae20e63877d118c25ac18b2e6e5546e1612c57391023d5c1d48a25d2b22237196d89ef03c3b9d026f8e7989543d6035491b7499f481f08f6b1d50f7a05cce28f9253c44faa9317fc47e2bfe437d2ba0468e9c420302f5d34aed118bcc638652e9d40a3789842bdb1642268bea98c5fa5d54b4b87a55dbdc7b2069629960ce82196d004696573daafc4331bbefd11d594e0989b6f6de8b2e2c7abb84410cb52dda92a280c59eaca1f245cc747dcf00efa856671f603e4332fdefd898040305d4b1ea8028605f302822ce4c1a9485f657b3f043b42b5d78f37f6cab5be81a752d7318699910c805c59fa957d03d8066ab874c19e05298b86f86f8e977a632ea784bf2c4af3743c0f246e5aae94ae61738ea10cc67d017a2ee09729bbeab8ab31d0a80443bc0dcaf043330113230d61d88c5ef99959908bc8ca4281375cca352dba824e991d88bdc97cb729cac40662a59da592f317d4b457896f78ab9b94cb5a423356caa97565e7a30592055a50e020e3a5e1203a8edc2d376b0dfaa9e79e688e63d844654738aef96eee97bc547b444f247ca53bbd0285c397463fe13fc37d4fc331e9cc6554b880f4386397414b652462cb2351d918527a943a1e4bfb94ab2155d398a0658cb715b177c416d3932aca2dfa66db8a414890370bb22ef4a200ecd3b8610280a096cb866043301cb19cbfdef4cc7718b1d4631b88116858b71e3dcb8b3f5a2dd305185e02e3e17d13ff00b37136fad7c10c034438e6694058c102e5f260ee8016b2f1b05f2f7f94af561c1e537668a225b666e69062acd11475dbc945b09799031d08d93b933f68cb25a3753822bf44dad8c1756b14b8c0be611612ee205c9d0b60b8090e8ca8b1a88ba890c2edd9f71f322594930665ac254b6bcb67c4add5dcbe170caee250c447681880161977218b83b4311836c017a0282e03ae833112567a2a04d3d1331820df4350fc338ed53577a961d2085035e6c49e663dc679a3de96ef2fde5fbcf697e58db98f947a8bcb76968cadff0080fc0fc9fc8fc0c75b951df4567a1da7329a945d31de18d1c6a2e4692086a2bcf45c6a215ab9ab328e620e65be26d98228706700c7ee12aa0ac5956a1eed80b5d6210e831fdf0ed517b103551151ae25c824cb20d8c90fbe971254a8f84c15714ac751c67b560825190788c58636e65cc83c247f54b95a6d0f6542505cc663360b392f40b78b1ca616b04b5074ecbc7fa83db2fd559bb04b99550b1cac19ff00a30712a3619fbe866551a8bf282ea59ab2e731028681214575e88e9fcf46d32281dd1a8afd533044a11a15752ce596b40cb8d303a8e528a980eec4541e6961ea50ca43b043d12d9789a4cb38960495474307d4cae54ace144452c284c8d47ad4136237065860cacee0dcb4552984d46a31096ccc063d143332842e73d48da660c8c6e82744ea660db1403996f796f799efd1abb919a4af491da61289922dea2d3c3d2a655e18698ed82bf15fc5fcb98c3a71fe2ac4230c3d2bc4c8c777d3719752c598371398854bc554f0983b8dcd336ed1006254460cf055313715e2e155292e02511e701603172d97f8209da344215dcd2c99727d4af2c3b73304ff008f9313582ef3cb0bab65c19a96aa592c052ea89605835cb72ed14add50c7481e5b60c8b3e344630cfed32d997ffe8f99e8a463ccb288b162c7c2f43dfdc3f4a4a26f24086cd4bec988360874c6f49d8090de912aecf960db6f95dabcb0e261981abd81ddff00b6302d873e678257a8f496ed2dd17bb11c9e23af7cda1331f28c6670d530a73158b2c58da4129d2fa59d4c2a65a8745cb847c12e086798e79880103304c44f68aee61fbb3bfb4a8084b4391b960843ab9454a8584b8d92981dc8972b1257410ed334625cbc6a23474d11dce197b8ac9781487859ef2fc1c4ca303308678f43ad4be9012b08b196f4188d4c442315bccd33114ff31f8f10e87e2eba710ab6102fa93a2a8d3ae8648301a30c32ae52ea5539332a495f835115acd20b39b44f9d88de08b84cc22550d40132d80e239a5e935a70fd11f90c9ced8c659288aa7c72cd6a46a31b95042eebfd106e4e7fd8f9952c2da7a0b0712e2c5af6e8541d9bf4ca203495b66ffc8c1fb984e936c1ed820ea3f1031e2b2fe616cef3000e1e5d9da1b8d849f7fa2112a8b977582bb2474beab3d25b1c2a95a89a112c1e1e8b01a8d5c4cb53b7b1c08b836c5045b25d4330b8b1b840a12d2e5590b1832e5c599314ed28dc364bc4a950aa71297ffdad984a3b740e5a85bcca732cb49406352e2d1e26012f10d4d938e8913a54a2e05c4225cae6a56673490a9443cf5a8ba5ee5415b9a23a82a5fe335d6ba5930cae972e01a679a65060b70732c8d4bcb266a7ff00dc10dc0cf432b0e8530c33150814f4b49dce8592c8512a5380e87a1058ccd08c1b2e67142539a10c6b932ad4838f6d28976bf0164a3b75d393117931b8db3ccbcf431f71e95cc6b949776ddaed970347c20368eed88efe502576f98a2cbdcb8b150fa8c0365583e9306f0d417c92d95697f72dad60b4f4668c5e58f1da71167ad6a8387b7d9dd97753d4ceded80a6028340851f70010a95de638800b6331311d1980947d11869886c3cca3b305b2d9e6f48e22adc1d8e09611ec88a57a2ea0e68e61e885b4a1f51cca6e59814c41cc60b99be85a232e5c6f72bccb3454b57468258ec9879a98d5a66110797e9d288b352398b1365ccfc472470b6296606662aa611196ce20d41e82cb9932a66fc4433d3f0dcccc00bebaba059119b8857e15d5951212a9953592589f85d4aac448253f873fe22731e84273f81d7643f011dcac3985dcc3995820cbb2a3ae9ee699e957173370c4cbf8424090518efe284070a2d3b30cb31ddc47c0c4bc7d44e98b4ab9904e19757918b2a349680e6328d37225e0c782897c7da1076b1e303e88b2de8ad92a8eba566d17165d2f32b2e8ad213c58bf731a54c780226fe60fa2330ee57416283c9e7c12c50943407fa221b58cd1f3cf777e8ed16515b2ee2264465b2d62dfe18a4388afd719748ca03ce64840200e7bf43fdb07507705bd19e682e870fb8b4aad5b7a0b12115f8a67476b60821360e54bc4bf1053ba35c4311626aaf7083d09881acca969cf406982ad49591eec345e17eea178b9786e21b6a0e7a16e7022e2ae35714ad4b231e97199a9440bc2cd43dc4f101ed0cc4bf73d23c04b5540f426c8ee184630f45d2b4586d6572b32a5447ad417454a95d2cf12dd021e7143ba352aa6b50665fe47e4f43f0223f81f832ba1d3b46710e9f129b9ad4185f4ad4256f24a3b2718401138ac2d82d32e55431ee284119191254576adb11e62f472cb9840a5b8d7997f6dd8cbbf2576cbdc67854895a57bb99670cbf89e082468a0155a10e8cd841eade4b4d47e582866ea8e51c91861d3f744b856ad37715a0582bd4c6444b01584689f37c0e279004f423ac18b5ec4d95c4eef7f6c463817ef7fcb8f775fbbde2c3d2bd620c8c2cb55a831df377c5c1946ceec53aecd2552c7e25dc09732f5c62a731131de845ee9dfb8c74a10a3b11a0863f960a724751f305850d89c4450114b56c524276bccb54b16566171e0326d5bb87405dcb84a94d4a6532960312657290353095c4a88681fbcca62397a34698ddd30ef1a9eb02d1b3b9ed3831f31f994386155b42bb42d1ab944af04a2e377518066589720ae2f721c9e875166d5246241e7a07cd1ee47b3aa55ca1654a657454ae854abd0a664e952a1d09534c4113f33a73d58ff008cea66308d4230e9c27e463c211ded0746b572c04411984f6438b0b6ae2310b945a443294328941e94309454cd0918313b2e265710a1c4a3f7145c5234dbf8820e9b8f30a076221462d3a54404e7a27e46655ccc0bafe88ea2ad58943d90077547d90144399da019fe91060b5fb7955ccab32b71a0a0a0c04d9ea0e2116ed0c442bf12a206b9e8f515a4adb02de15a83831633926e13f6fa2bf512d66d577004503154b2c56d2f350cb1b19da017c22e6baf96010cc30476cd8c161b48239862cb020a5dc080584caaa18a0c70470a160b82b92c3dc176b79803d988413ccbb6258710331c9d2a615ee653961b84dac284d0d455f4ed0d148ed96d2c2bbccb65668dd8b689e7a892f2c03cb2ad861a884a3a5574e2512a0c0b89a950dcae8c37d0b6881739cdba1d0fc09cf5e7f13f85ce25621b2711e9c4d41cf4ee9a44946611df470114e6734301373dcb8b5e67ffd9, 596337, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-28 12:23:17', NULL, NULL, '2024-07-11 09:09:27', '2024-08-28 12:23:17', 30);
INSERT INTO `orders` (`id`, `user_id`, `vendor_id`, `product_id`, `order_number`, `payment_id`, `product_name`, `slug`, `image`, `qty`, `price`, `attribute`, `variation`, `variations_sku`, `tax`, `coupon_name`, `discount_amount`, `shipping_cost`, `order_total`, `order_notes`, `payment_type`, `full_name`, `email`, `mobile`, `landmark`, `street_address`, `pincode`, `status`, `return_reason`, `return_number`, `comment`, `vendor_comment`, `reselling_order_flag`, `resell_margin`, `desired_date`, `desired_time`, `order_status`, `questions`, `emp_onsite_image`, `otp`, `is_otp_verified`, `confirmed_at`, `shipped_at`, `delivered_at`, `cancelled_at`, `returned_at`, `accepted_at`, `started_at`, `completed_at`, `rejected_at`, `created_at`, `updated_at`, `assigned_to`) VALUES
(181, 101, 6, 769, '10002', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '7752', NULL, 'intense, 2 BHK', NULL, '152', NULL, NULL, '0', '7904', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '09745275325', 'tmh', 'thennattu house, vellila p/o , mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-11', '17:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-11 10:03:05', '2024-08-14 17:38:05', 30),
(182, 98, 6, 761, '10003', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '7548', NULL, 'AMC, 2 BHK', NULL, '148', NULL, NULL, '0', '7696', NULL, 1, 'test test', 'test@gmail.com', '9745275325', '', 'J P Nagar 1st Main Rd J P Nagar Surappattu', '600066', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-07-17', '18:30', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-17 11:08:57', '2024-08-14 15:07:40', 30),
(183, 62, 6, 770, '10004', NULL, 'Home Cleaning Service', NULL, 'product-66714508f14e0.jpg', 1, '450.0', NULL, '2 BHK', NULL, '1', NULL, NULL, '0', '3001.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '9179518784', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-15', '04:00 PM', 2, NULL, NULL, 832965, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-10 08:38:40', '2024-08-10 08:38:40', 30),
(184, 98, 6, 761, '10005', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '5508', NULL, 'AMC, 1 BHK', NULL, '108', NULL, NULL, '0', '5815', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-21', '09:00 AM', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-20 08:40:09', '2024-08-20 08:40:09', NULL),
(185, 98, 6, 759, '10005', NULL, 'AC Repair', NULL, 'product-665f08919d9a5.jpg', 1, '199', NULL, '', NULL, '0', NULL, NULL, '0', '5815', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-21', '09:00 AM', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-20 08:40:10', '2024-08-20 08:40:10', NULL),
(190, 98, 6, 761, '10007', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '7548', NULL, 'AMC, 2 BHK', NULL, '148', NULL, NULL, '0', '7696', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-23', '09:00 AM', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-21 06:29:33', '2024-08-21 06:29:33', NULL),
(193, 98, 6, 761, '10007', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '7548', NULL, 'AMC, 2 BHK', NULL, '148', NULL, NULL, '0', '7696', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-23', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-21 07:08:23', '2024-08-21 07:08:23', NULL),
(194, 98, 6, 765, '10008', NULL, 'Honey bee removals', NULL, 'product-665f53c10b326.png', 1, '763.98', NULL, '', NULL, '14.98', NULL, NULL, '0', '778.96', NULL, 1, 'test test', 'test@gmail.com', '9745275325', '', 'J P Nagar 1st Main Rd J P Nagar Surappattu', '600066', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-22', '17:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-21 07:17:18', '2024-08-21 07:17:18', NULL),
(195, 98, 6, 765, '10009', NULL, 'Honey bee removals', NULL, 'product-665f53c10b326.png', 1, '763.98', NULL, '', NULL, '14.98', NULL, NULL, '0', '778.96', NULL, 1, 'test test', 'test@gmail.com', '9745275325', '', 'J P Nagar 1st Main Rd J P Nagar Surappattu', '600066', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-22', '17:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-21 07:20:46', '2024-08-21 07:20:46', NULL),
(201, NULL, 6, 769, '10010', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 2, '1500', NULL, 'One Time,1 BHK', NULL, '2', NULL, NULL, NULL, '3060.00', NULL, 1, 'krishna', 'krishna@gmail.com', '9985951017', 'test', 'test', '885522', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-21', '15:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-21 15:57:28', '2024-08-21 15:57:28', NULL),
(202, NULL, 6, 763, '10011', NULL, 'Flat Cleaning', NULL, 'product-665f10b0a9ce8.jpg', 4, '2499', NULL, 'One Time,1 BHK', NULL, '3', NULL, NULL, NULL, '10295.88', NULL, 1, 'fghfghf', 'gngf@hfg.fgghfg', '9985951017', 'jhgb', 'hjb', '517554', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-22', '16:21', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-21 16:17:45', '2024-08-21 16:17:45', NULL),
(203, NULL, 6, 759, '10012', NULL, 'AC Repair', NULL, 'product-665f08919d9a5.jpg', 6, '199', NULL, 'One Time,1 BHK', NULL, '0', NULL, NULL, NULL, '1194.00', NULL, 1, 'sdfsdf', 'sdfs@dfg.g', '9985951017', 'hjb', 'hjb', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-22', '16:26', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-21 16:23:23', '2024-08-21 16:23:23', NULL),
(204, NULL, 6, 761, '10013', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 6, '2499', NULL, 'AMC,1 BHK', NULL, '299.88', NULL, NULL, NULL, '15293.88', NULL, 1, 'Krish', 'krish@gmail.com', '9985951017', 'test', 'test', '542112', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-22', '17:47', 3, NULL, 0x746573742e706e67, 749140, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 12:14:57', NULL, NULL, '2024-08-21 17:44:06', '2024-08-22 12:14:57', 20),
(205, NULL, 6, 761, '10014', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 3, '2499', NULL, '2800,2800', NULL, '336.00', NULL, NULL, NULL, '17136.00', NULL, 1, 'venkata krishna', 'test@gmail.com', '9985951017', 'test', 'test', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-23', '01:23', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 01:20:05', '2024-08-22 01:20:05', NULL),
(206, NULL, 6, 761, '10015', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2499', NULL, '2800,2800', NULL, '224.00', NULL, NULL, NULL, '11424.00', NULL, 1, 'krishna', 'kris@gmail.com', '9985951017', 'test', 'test', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-23', '09:17', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 09:15:12', '2024-08-22 09:15:12', NULL),
(207, NULL, 6, 761, '10016', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2499', NULL, ',', NULL, '0.00', NULL, NULL, NULL, '2.00', NULL, 1, 'Krishna Krishna1', 'krish@gmail.com1', '9985951016', 'testt', 'tetstt', '517552', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-23', '12:25', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 12:22:17', '2024-08-22 13:48:09', NULL),
(208, NULL, 6, 761, '10017', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2499', NULL, ',', NULL, '304.00', NULL, NULL, NULL, '15504.00', NULL, 1, 'gf', 'gfdgd@gfd.hgf', '9985951017', 'hjgj', 'hfds', '517554', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-23', '13:53', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 13:49:18', '2024-08-22 13:49:29', NULL),
(209, NULL, 6, 761, '10018', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 3, '2499', NULL, 'OneTime,1 BHK', NULL, '336.00', NULL, NULL, NULL, '17136.00', NULL, 1, 'fdgdf', 'gbf@gf.hgf', '9985956525', 'gfs', 'hgf', '512111', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-23', '16:51', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 13:51:26', '2024-08-22 14:08:11', NULL),
(210, NULL, 6, 761, '10019', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2499', NULL, 'OneTime,1 BHK', NULL, '112.00', NULL, NULL, NULL, '0', NULL, 1, 'hgfh', 'hgfg@hgf.hgf', '9985951017', 'hgf', 'hgf', '517552', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-23', '14:50', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 14:48:09', '2024-08-22 14:49:38', NULL),
(211, 62, 6, 761, '10020', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, 'OneTime', NULL, '1', NULL, NULL, '0.00', '2100.0', '0', 1, 'vishal rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'pin', '57, 6th Main Rd, opp. ICICI Bank, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050, India', '560050', 3, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-27', '17:00', 1, NULL, NULL, NULL, 2, NULL, '2024-08-23 06:58:54', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-22 19:11:01', '2024-08-23 06:58:54', NULL),
(212, 62, 6, 761, '10021', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, 'AMC', NULL, '1', NULL, NULL, '0.00', '2800.0', '0', 1, 'vishal rathaur', 'vishalrathaurpc@gmail.com', '7000473898', 'Char Sahar ka naka  Gwalior Madhaya Pradesh', 'Bheekam nagar Sharma Farm road', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-27', '17:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-23 05:18:01', '2024-08-23 05:18:01', NULL),
(213, 62, 6, 761, '10022', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, '1 BHK', NULL, '1', NULL, NULL, '0.00', '2300.0', '0', 1, 'vishal rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'pin', '57, 6th Main Rd, opp. ICICI Bank, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050, India', '560050', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-25', '16:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-23 05:21:12', '2024-08-23 05:21:12', 30),
(214, 62, 6, 761, '10023', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, 'AMC', NULL, '1', NULL, NULL, '0.00', '2100.0', '0', 1, 'Vishal Rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'Hazira', 'Gwalior Madhya Pradesh', '474003', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-26', '17:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-23 05:22:52', '2024-08-23 05:22:52', 30),
(215, 98, 6, 764, '10024', NULL, 'Termite Treatment', NULL, 'product-666eda718e3c7.png', 1, '916.98', NULL, '', NULL, '17.98', NULL, NULL, '0', '934.96', NULL, 3, 'test test', 'test@gmail.com', '7845878542', 'medical shop', 'Jay Prakash Nagar Rd No-3 Unnat Nagar Jay Prakash Nagar', '400063', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-26', '11:00', 4, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-23 06:05:44', '2024-08-23 06:05:44', 30),
(216, NULL, 6, 761, '10025', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2499', NULL, 'OneTime,2 BHK', NULL, '304.00', NULL, NULL, NULL, '15504.00', NULL, 1, 'krishna', 'test@gmail.com', '9985951017', 'test', 'test', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-24', '12:36', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-23 12:34:11', '2024-08-23 12:34:11', NULL),
(217, 62, 6, 761, '10026', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, 'AMC', NULL, '1', NULL, NULL, '0.00', '8800.0', '0', 1, 'vishal rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'pin', '57, 6th Main Rd, opp. ICICI Bank, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050, India', '560050', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-31', '17:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-26 11:05:43', '2024-08-26 11:05:43', NULL),
(218, 62, 6, 761, '10026', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, '1 BHK', NULL, '1', NULL, NULL, '0.00', '8800.0', '0', 1, 'vishal rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'pin', '57, 6th Main Rd, opp. ICICI Bank, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050, India', '560050', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-31', '17:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-26 11:05:44', '2024-08-26 19:04:33', 30),
(219, 62, 6, 761, '10026', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, 'OneTime', NULL, '1', NULL, NULL, '0.00', '8800.0', '0', 1, 'vishal rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'pin', '57, 6th Main Rd, opp. ICICI Bank, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050, India', '560050', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-31', '17:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-26 11:05:44', '2024-08-27 12:05:08', 29),
(220, 11, 6, 765, '10027', NULL, 'Honey bee removals', NULL, 'product-665f53c10b326.png', 1, '0.0', NULL, '', NULL, '1', NULL, NULL, '0.00', '4910.0', '0', 1, 'Lokesh R', 'Lokesh2star@gmail.com', '9742935402', 'Kothanur dinne', '#91, S Square infrastructure apartment', '560078', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-31', '14:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-27 23:33:00', '2024-08-27 23:33:00', NULL),
(221, 11, 6, 761, '10027', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, 'OneTime', NULL, '1', NULL, NULL, '0.00', '4910.0', '0', 1, 'Lokesh R', 'Lokesh2star@gmail.com', '9742935402', 'Kothanur dinne', '#91, S Square infrastructure apartment', '560078', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-31', '14:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-27 23:33:00', '2024-08-28 11:19:18', 10),
(222, 11, 6, 768, '10027', NULL, 'BedBug Controller', NULL, 'product-665ff37357e3a.png', 1, '2500.00', NULL, 'S', NULL, '9', NULL, NULL, '0.00', '4910.0', '0', 1, 'Lokesh R', 'Lokesh2star@gmail.com', '9742935402', 'Kothanur dinne', '#91, S Square infrastructure apartment', '560078', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-08-31', '14:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-27 23:33:00', '2024-08-27 23:33:00', NULL),
(223, 98, 6, 761, '10028', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '7548', NULL, ' 2 BHK', NULL, '148', NULL, NULL, '0', '7696', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-31', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-29 11:08:36', '2024-08-29 11:08:36', NULL),
(224, 98, 6, 761, '10029', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '7548', NULL, 'AMC, 2 BHK', NULL, '148', NULL, NULL, '0', '7696', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-30', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-29 11:21:19', '2024-08-29 11:21:19', NULL),
(225, 98, 6, 769, '10030', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '1530', NULL, '', NULL, '30', NULL, NULL, '0', '12780', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-30', '09:00', 6, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-29 15:51:45', '2024-08-30 19:37:21', NULL),
(226, 98, 6, 761, '10030', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '5600', NULL, 'OneTime', NULL, '112', NULL, NULL, '0', '12780', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-30', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-29 15:51:46', '2024-08-29 15:51:46', NULL),
(227, 98, 6, 761, '10030', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1800', NULL, 'AMC, 1 BHK', NULL, '108', NULL, NULL, '0', '12780', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-30', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-29 15:51:46', '2024-08-29 15:51:46', NULL),
(228, 98, 6, 761, '10030', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1800', NULL, 'AMC, 1 BHK', NULL, '108', NULL, NULL, '0', '12780', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-29', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-29 15:51:47', '2024-08-29 15:51:47', NULL),
(229, 98, 6, 761, '10030', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1800', NULL, 'AMC, 1 BHK', NULL, '108', NULL, NULL, '0', '12780', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-10-30', '13:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-29 15:51:47', '2024-08-29 18:16:38', NULL),
(230, 62, 6, 761, '10031', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '4999.0', NULL, '2 BHK', NULL, '1', NULL, NULL, '0.00', '11000.0', '0', 3, 'vishal rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'pin', '57, 6th Main Rd, opp. ICICI Bank, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050, India', '560050', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-09-04', '14:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 06:58:29', '2024-08-30 06:58:29', NULL),
(231, 62, 6, 761, '10031', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2999.0', NULL, 'OneTime', NULL, '1', NULL, NULL, '0.00', '11000.0', '0', 3, 'vishal rathaur', 'vishalrathaur56@gmail.com', '9179518784', 'pin', '57, 6th Main Rd, opp. ICICI Bank, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050, India', '560050', 1, NULL, NULL, NULL, NULL, 'no', NULL, ' 2024-09-04', '14:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 06:58:29', '2024-08-30 06:58:29', NULL),
(232, 98, 6, 761, '10032', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '7600', NULL, 'OneTime', NULL, '152', NULL, NULL, '0', '19176', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-31', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 07:07:32', '2024-08-30 07:07:32', NULL),
(233, 98, 6, 761, '10032', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '5600', NULL, 'OneTime', NULL, '224', NULL, NULL, '0', '19176', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-31', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 07:07:32', '2024-08-30 16:58:20', 32),
(234, NULL, 6, 761, '10033', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2499', NULL, 'AMC,1 BHK', NULL, '216.00', NULL, NULL, NULL, '11016.00', NULL, 1, 'test', 'test@gmail.com', '9985951017', 'test', 'test', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-08-30', '17:04', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 17:06:26', '2024-08-30 17:06:26', NULL),
(235, 98, 6, 761, '10034', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2466.6666666666665', NULL, 'AMC, 2 BHK', NULL, '49.333333333333336', NULL, NULL, '0', '7548', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-02', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 18:51:29', '2024-08-30 18:51:29', NULL),
(236, 98, 6, 761, '10034', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2466.6666666666665', NULL, 'AMC, 2 BHK', NULL, '49.333333333333336', NULL, NULL, '0', '7548', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-10-02', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 18:51:30', '2024-08-30 18:51:30', NULL),
(237, 98, 6, 761, '10034', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2466.6666666666665', NULL, 'AMC, 2 BHK', NULL, '49.333333333333336', NULL, NULL, '0', '7548', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-11-01', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 18:51:30', '2024-08-30 18:51:30', NULL),
(238, 98, 6, 769, '10035', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '1500', NULL, '', NULL, '30', NULL, NULL, '0', '1530', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-01', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 20:10:23', '2024-08-30 20:10:23', NULL),
(239, 98, 6, 769, '10035', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '1500', NULL, '', NULL, '30', NULL, NULL, '0', '1530', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-01', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-30 20:10:23', '2024-08-30 20:10:23', NULL),
(240, 98, 6, 761, '10036', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2499', NULL, 'OneTime,1 BHK', NULL, '224.00', NULL, NULL, '0', '11424.00', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-01', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-31 06:16:30', '2024-09-03 10:08:25', NULL),
(241, 98, 6, 761, '10036', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2466.6666666666665', NULL, 'AMC, 2 BHK', NULL, '49.333333333333336', NULL, NULL, '0', '7548', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-10-01', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-31 06:16:30', '2024-08-31 06:16:30', NULL),
(242, 98, 6, 761, '10036', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2466.6666666666665', NULL, 'AMC, 2 BHK', NULL, '49.333333333333336', NULL, NULL, '0', '7548', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-10-31', '09:00', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-31 06:16:30', '2024-08-31 06:16:30', NULL),
(243, 98, 6, 769, '10037', NULL, 'Bathroom Cleaner', NULL, 'product-666ed6111400a.png', 1, '1500', NULL, '', NULL, '30', NULL, NULL, '0', '1530', NULL, 1, 'Mohammed Aslam', 'azlamazl.aa@gmail.com', '9745275325', 'tmh', 'mankada via, Malappuram district', '679324', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-02', '13:00', 6, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-31 06:20:18', '2024-08-31 07:04:15', NULL),
(244, NULL, 6, 761, '10038', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2499', NULL, 'OneTime,1 BHK', NULL, '224.00', NULL, NULL, NULL, '11424.00', NULL, 1, 'Test in New', 'krish@gmail.co', '9985951017', 'test', 'test', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-04', '19:46', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:13:14', '2024-09-03 10:13:14', NULL),
(245, NULL, 6, 761, '10039', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '2499', NULL, 'AMC,1 BHK', NULL, '216.00', NULL, NULL, NULL, '11016.00', NULL, 1, 'ghfhf', 'hgf@ghggh.gfc', '9985951017', 'hgfhf', 'hgfhf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-12', '15:53', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:21:17', '2024-09-03 10:21:17', NULL),
(246, NULL, 6, 761, '10040', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 4, '2499', NULL, 'AMC,1 BHK', NULL, '432.00', NULL, NULL, NULL, '22032.00', NULL, 1, 'sdfsdf', 'sdfs@gfds.gdsfg', '9985951017', 'jhghg', 'jhgg', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-06', '15:58', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:26:03', '2024-09-03 10:26:03', NULL),
(247, NULL, 6, 761, '10041', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '5032', NULL, 'AMC,2 BHK', NULL, '98.666666666667', NULL, NULL, NULL, '5032', NULL, 1, 'hgh', 'hgfg@sdfg.fg', '9985951017', 'hgyfhf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-04', '16:03', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:31:23', '2024-09-03 10:31:23', NULL),
(248, NULL, 6, 761, '10042', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '5032', NULL, 'AMC,2 BHK', NULL, '98.666666666667', NULL, NULL, NULL, '5032', NULL, 1, 'hgh', 'hgfg@sdfg.fg', '9985951017', 'hgyfhf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-10-04', '16:03', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:31:23', '2024-09-03 10:31:23', NULL),
(249, NULL, 6, 761, '10043', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '5032', NULL, 'AMC,2 BHK', NULL, '98.666666666667', NULL, NULL, NULL, '5032', NULL, 1, 'hgh', 'hgfg@sdfg.fg', '9985951017', 'hgyfhf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-11-03', '16:03', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:31:23', '2024-09-03 10:31:23', NULL),
(250, NULL, 6, 761, '10044', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1836', NULL, 'AMC,1 BHK', NULL, '36', NULL, NULL, NULL, '1836', NULL, 1, 'jhggJH', 'jhgg@dfg.dgf', '9985951017', 'jhj', 'jhgjg', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-12', '16:05', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:32:48', '2024-09-03 10:32:48', NULL),
(251, NULL, 6, 761, '10045', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1836', NULL, 'AMC,1 BHK', NULL, '36', NULL, NULL, NULL, '1836', NULL, 1, 'jhggJH', 'jhgg@dfg.dgf', '9985951017', 'jhj', 'jhgjg', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-10-12', '16:05', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:32:48', '2024-09-03 10:32:48', NULL),
(252, NULL, 6, 761, '10046', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1836', NULL, 'AMC,1 BHK', NULL, '36', NULL, NULL, NULL, '1836', NULL, 1, 'jhggJH', 'jhgg@dfg.dgf', '9985951017', 'jhj', 'jhgjg', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-11-11', '16:05', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:32:48', '2024-09-03 10:32:48', NULL),
(253, NULL, 6, 761, '10047', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '3672', NULL, 'AMC,1 BHK', NULL, '72', NULL, NULL, NULL, '3672', NULL, 1, 'hgfhgf', 'hff@dfg.fdg', '9985951017', 'hgf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-12', '16:07', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:33:57', '2024-09-03 10:33:57', NULL),
(254, NULL, 6, 761, '10047', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '3672', NULL, 'AMC,1 BHK', NULL, '72', NULL, NULL, NULL, '3672', NULL, 1, 'hgfhgf', 'hff@dfg.fdg', '9985951017', 'hgf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-10-12', '16:07', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:33:57', '2024-09-03 10:33:57', NULL),
(255, NULL, 6, 761, '10047', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 2, '3672', NULL, 'AMC,1 BHK', NULL, '72', NULL, NULL, NULL, '3672', NULL, 1, 'hgfhgf', 'hff@dfg.fdg', '9985951017', 'hgf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-11-11', '16:07', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:33:57', '2024-09-03 10:33:57', NULL),
(256, NULL, 6, 761, '10048', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '2499', NULL, 'OneTime,1 BHK', NULL, '112.00', NULL, NULL, NULL, '5712.00', NULL, 1, 'OneTime Order', 'test@gmdf.hytgf', '9985951017', 'hgfhgf', 'hgfhf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-04', '16:08', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:36:59', '2024-09-03 10:36:59', NULL),
(257, NULL, 6, 761, '10049', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1836', NULL, 'AMC,1 BHK', NULL, '36', NULL, NULL, NULL, '1836', NULL, 1, 'AMC Order Order', 'jhgjg@dsf.sfdg', '9985951017', 'hgf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-09-03', '16:10', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:38:44', '2024-09-03 10:38:44', NULL),
(258, NULL, 6, 761, '10049', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1836', NULL, 'AMC,1 BHK', NULL, '36', NULL, NULL, NULL, '1836', NULL, 1, 'AMC Order Order', 'jhgjg@dsf.sfdg', '9985951017', 'hgf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-10-03', '16:10', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:38:44', '2024-09-03 10:38:44', NULL),
(259, NULL, 6, 761, '10049', NULL, 'cockroach control services', NULL, 'product-666ed7b326dfc.png', 1, '1836', NULL, 'AMC,1 BHK', NULL, '36', NULL, NULL, NULL, '1836', NULL, 1, 'AMC Order Order', 'jhgjg@dsf.sfdg', '9985951017', 'hgf', 'hgf', '517551', 1, NULL, NULL, NULL, NULL, 'no', NULL, '2024-11-02', '16:10', 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-03 10:38:44', '2024-09-03 10:38:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_assign_history`
--

CREATE TABLE `order_assign_history` (
  `id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `order_name` varchar(255) NOT NULL,
  `assigned_to` varchar(100) NOT NULL,
  `assigned_at` varchar(50) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partnerforms`
--

CREATE TABLE `partnerforms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `partnerforms`
--

INSERT INTO `partnerforms` (`id`, `name`, `mobile`, `message`, `created_at`, `updated_at`) VALUES
(1, 'User', '9874589674', 'test try', '2024-08-11 06:44:07', '2024-08-11 06:44:07'),
(2, 'test part', '785984575', 'test note', '2024-08-25 17:14:53', '2024-08-25 17:14:53');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payment_name` varchar(255) NOT NULL,
  `test_public_key` text DEFAULT NULL,
  `test_secret_key` text DEFAULT NULL,
  `live_public_key` text DEFAULT NULL,
  `live_secret_key` text DEFAULT NULL,
  `encryption_key` text DEFAULT NULL,
  `environment` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `payment_name`, `test_public_key`, `test_secret_key`, `live_public_key`, `live_secret_key`, `encryption_key`, `environment`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Cash on delivery', NULL, NULL, NULL, NULL, NULL, 0, 1, '2021-09-04 04:36:58', '2022-08-23 09:49:28'),
(2, 'Wallet', NULL, NULL, NULL, NULL, NULL, 1, 2, '2021-09-04 04:36:58', '2024-07-10 12:26:24'),
(3, 'Online', 'rzp_test_4r8y0wDMkrUDFn', 'nEDuJlpL3x2BqHxYlQBYtrto', NULL, NULL, NULL, 1, 1, '2021-09-04 04:36:58', '2022-06-09 18:21:58'),
(4, 'Stripe', 'pk_test_51IjNgIJwZppK21ZQa6e7ZVOImwJ2auI54TD6xHici94u7DD5mhGf1oaBiDyL9mX7PbN5nt6Weap4tmGWLRIrslCu00d8QgQ3nI', 'sk_test_51IjNgIJwZppK21ZQK85uLARMdhtuuhA81PB24VDfiqSW8SXQZKrZzvbpIkigEb27zZPBMF4UEG7PK9587Xresuc000x8CdE22A', NULL, NULL, NULL, 1, 2, '2021-09-04 04:36:58', '2022-06-02 11:46:28'),
(5, 'Flutterwave', 'FLWPUBK_TEST-61c94068c4a44548a771cc7cf9548d05-X', 'FLWSECK_TEST-1140781769b7bd5cfd6b3fb6d5704017-X', NULL, NULL, 'FLWSECK_TEST863a39eb1475', 1, 2, '2021-10-22 21:58:05', '2022-06-02 11:46:32'),
(6, 'PayTab', NULL, NULL, NULL, NULL, NULL, 0, 2, '2021-10-22 21:58:12', '2022-08-23 09:49:07');

-- --------------------------------------------------------

--
-- Table structure for table `payouts`
--

CREATE TABLE `payouts` (
  `id` int(11) NOT NULL,
  `request_id` varchar(255) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `commission_pr` float DEFAULT NULL,
  `commission` float DEFAULT NULL,
  `paid_amount` float DEFAULT NULL,
  `status` int(11) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `paid_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `payouts`
--

INSERT INTO `payouts` (`id`, `request_id`, `vendor_id`, `amount`, `commission_pr`, `commission`, `paid_amount`, `status`, `payment_method`, `paid_at`, `created_at`, `updated_at`) VALUES
(1, 'CF15AIF2O8', 6, 54.4, 1, 0.544, 53.856, 1, NULL, '0000-00-00 00:00:00', '2023-04-28 09:51:17', '2023-04-28 09:51:17'),
(2, 'WB29IFXQLD', 6, 54.4, 1, 0.544, 53.856, 1, NULL, '0000-00-00 00:00:00', '2024-06-01 12:20:05', '2024-06-01 12:20:05'),
(3, 'ZULC6SOX2M', 6, 54.4, 1, 0.544, 53.856, 1, NULL, '0000-00-00 00:00:00', '2024-06-10 05:35:21', '2024-06-10 05:35:21'),
(4, 'JTNB2HVVD6', 6, 54.4, 1, 0.544, 53.856, 1, NULL, '0000-00-00 00:00:00', '2024-06-10 07:21:17', '2024-06-10 07:21:17'),
(5, 'DON2XVJ1HT', 6, 54.4, 1, 0.544, 53.856, 1, NULL, '0000-00-00 00:00:00', '2024-06-10 07:21:24', '2024-06-10 07:21:24'),
(6, 'CALT9V65FP', 6, 54.4, 1, 0.544, 53.856, 1, NULL, '0000-00-00 00:00:00', '2024-06-10 10:20:50', '2024-06-10 10:20:50'),
(7, 'P1F9U6N77L', 6, 54.4, 1, 0.544, 53.856, 1, NULL, '0000-00-00 00:00:00', '2024-06-11 14:40:18', '2024-06-11 14:40:18');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `title`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'user_management_access', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(2, 'permission_create', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(3, 'permission_edit', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(4, 'permission_show', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(5, 'permission_delete', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(6, 'permission_access', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(7, 'role_create', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(8, 'role_edit', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(9, 'role_show', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(10, 'role_delete', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(11, 'role_access', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(12, 'user_create', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(13, 'user_edit', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(14, 'user_show', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(15, 'user_delete', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(16, 'user_access', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(17, 'product_create', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(18, 'product_edit', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(19, 'product_show', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(20, 'product_delete', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(21, 'product_access', '2019-04-15 13:44:42', '2019-04-15 13:44:42', NULL),
(22, 'test', '2024-06-24 08:24:02', '2024-06-24 08:24:02', NULL),
(23, 'question_create', '2024-07-30 04:00:57', '2024-07-30 04:00:57', NULL),
(24, 'question_create', '2024-07-30 04:00:58', '2024-07-30 04:01:27', '2024-07-30 04:01:27'),
(25, 'question_create', '2024-07-30 04:00:58', '2024-07-30 04:01:27', '2024-07-30 04:01:27'),
(26, 'question_create', '2024-07-30 04:00:59', '2024-07-30 04:01:27', '2024-07-30 04:01:27'),
(27, 'question_access', '2024-07-30 04:02:25', '2024-07-30 04:02:25', NULL),
(28, 'question_edit', '2024-07-30 07:59:17', '2024-07-30 07:59:17', NULL),
(29, 'question_show', '2024-07-30 07:59:24', '2024-07-30 07:59:24', NULL),
(30, 'question_delete', '2024-07-30 07:59:32', '2024-07-30 07:59:32', NULL),
(31, 'about_access', '2024-09-02 05:27:46', '2024-09-02 05:27:46', NULL),
(32, 'attendance_access', NULL, NULL, NULL),
(33, 'attribute_access', NULL, NULL, NULL),
(34, 'brand_access', NULL, NULL, NULL),
(35, 'category_access', NULL, NULL, NULL),
(36, 'coupon_access', NULL, NULL, NULL),
(37, 'customer_access', NULL, NULL, NULL),
(38, 'employee_access', NULL, NULL, NULL),
(39, 'gantt_access', NULL, NULL, NULL),
(40, 'help_access', NULL, NULL, NULL),
(41, 'home_access', NULL, NULL, NULL),
(42, 'innersubcategory_access', NULL, NULL, NULL),
(43, 'inventory_access', NULL, NULL, NULL),
(44, 'location_access', NULL, NULL, NULL),
(45, 'order_access', NULL, NULL, NULL),
(46, 'payment_access', NULL, NULL, NULL),
(47, 'privacypolicy_access', NULL, NULL, NULL),
(48, 'purchaseorder_access', NULL, NULL, NULL),
(49, 'quotation_access', NULL, NULL, NULL),
(50, 'settings_access', NULL, NULL, NULL),
(51, 'slider_access', NULL, NULL, NULL),
(52, 'subcategory_access', NULL, NULL, NULL),
(53, 'termsconditions_access', NULL, NULL, NULL),
(54, 'testimonial_access', NULL, NULL, NULL),
(55, 'timeslot_access', '2024-09-02 05:27:46', NULL, NULL),
(56, 'cms_main_menu_access', '2024-09-02 06:49:17', '2024-09-02 06:49:17', NULL),
(57, 'view_inventory_access', '2024-09-02 06:49:52', '2024-09-02 06:49:52', NULL),
(58, 'assigned_inventory_access', '2024-09-02 06:50:06', '2024-09-02 06:50:06', NULL),
(59, 'all_history_inventory_access', '2024-09-02 06:50:23', '2024-09-02 06:50:23', NULL),
(60, 'manualorderassign_access', '2024-09-02 06:50:48', '2024-09-02 06:50:48', NULL),
(61, 'category_main_menu_access', '2024-09-02 06:51:04', '2024-09-02 06:51:04', NULL),
(62, 'attendance_login_history_access', '2024-09-02 06:51:30', '2024-09-02 06:51:30', NULL),
(63, 'verified_attendance_access', '2024-09-02 06:51:46', '2024-09-02 06:51:46', NULL),
(64, 'home_page_settings_access', '2024-09-02 06:58:12', '2024-09-02 06:58:12', NULL),
(65, 'product_management_access', NULL, NULL, NULL),
(66, 'product_add_access', NULL, NULL, NULL),
(67, 'question_management_access', NULL, NULL, NULL),
(68, 'question_add_access', NULL, NULL, NULL),
(69, 'employee_management_access', NULL, NULL, NULL),
(70, 'employee_add_access', NULL, NULL, NULL),
(71, 'timeslot_management_access', NULL, NULL, NULL),
(72, 'timeslot_add_access', NULL, NULL, NULL),
(73, 'testimonial_management_access', NULL, NULL, NULL),
(74, 'testimonial_add_access', NULL, NULL, NULL),
(75, 'location_management_access', NULL, NULL, NULL),
(76, 'location_add_access', NULL, NULL, NULL),
(77, 'quotation_management_access', NULL, NULL, NULL),
(78, 'quotation_add_access', NULL, NULL, NULL),
(79, 'purchaseorder_management_access', NULL, NULL, NULL),
(80, 'purchaseorder_add_access', NULL, NULL, NULL),
(81, 'customer_management_access', NULL, NULL, NULL),
(82, 'customer_bulk_upload_access', NULL, NULL, NULL),
(83, 'inventory_management_access', NULL, NULL, NULL),
(84, 'inventory_add_access', NULL, NULL, NULL),
(85, 'attendance_management_access', NULL, NULL, NULL),
(86, 'category_add_access', NULL, NULL, NULL),
(87, 'subcategory_add_access', NULL, NULL, NULL),
(88, 'innersubcategory_add_access', NULL, NULL, NULL),
(89, 'slider_management_access', NULL, NULL, NULL),
(90, 'slider_add_access', NULL, NULL, NULL),
(91, 'banner_management_access', NULL, NULL, NULL),
(92, 'banner_add_access', NULL, NULL, NULL),
(93, 'attribute_management_access', NULL, NULL, NULL),
(94, 'attribute_add_access', NULL, NULL, NULL),
(95, 'order_management_access', NULL, NULL, NULL),
(96, 'order_add_access', NULL, NULL, NULL),
(97, 'coupon_management_access', NULL, NULL, NULL),
(98, 'coupon_add_access', NULL, NULL, NULL),
(99, 'banner_access', '2024-09-04 18:07:38', '2024-09-04 18:07:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(2, 17),
(2, 18),
(2, 19),
(2, 20),
(2, 21),
(1, 22),
(1, 23),
(1, 27),
(1, 28),
(1, 29),
(1, 30),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 40),
(1, 41),
(1, 42),
(1, 43),
(1, 44),
(1, 45),
(1, 46),
(1, 47),
(1, 48),
(1, 49),
(1, 50),
(1, 51),
(1, 52),
(1, 53),
(1, 54),
(1, 55),
(3, 37),
(3, 40),
(3, 41),
(1, 56),
(1, 57),
(1, 58),
(1, 59),
(1, 60),
(1, 61),
(1, 62),
(1, 63),
(1, 64),
(1, 65),
(1, 66),
(1, 67),
(1, 68),
(1, 69),
(1, 70),
(1, 71),
(1, 72),
(1, 73),
(1, 74),
(1, 75),
(1, 76),
(1, 77),
(1, 78),
(1, 79),
(1, 80),
(1, 81),
(1, 82),
(1, 83),
(1, 84),
(1, 85),
(1, 86),
(1, 87),
(1, 88),
(1, 89),
(1, 90),
(1, 91),
(1, 92),
(1, 93),
(1, 94),
(1, 95),
(1, 96),
(1, 97),
(1, 98),
(1, 99),
(3, 38),
(3, 69);

-- --------------------------------------------------------

--
-- Table structure for table `po_vendors`
--

CREATE TABLE `po_vendors` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `gst` varchar(50) NOT NULL,
  `pan` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `po_vendors`
--

INSERT INTO `po_vendors` (`id`, `name`, `email`, `mobile`, `gst`, `pan`, `status`, `created_at`, `updated_at`) VALUES
(1, 'hghjg', 'jg@dfg.dfg', '9985951017', 'vhgfh', 'hgh', 1, '2024-08-23 09:59:48', '2024-08-23 09:59:48'),
(2, 'vendor added from new dashboard', 'test@gmail.com', '9985951017', 'hgfhfg', 'fghfhgfhf', 1, '2024-08-31 10:29:13', '2024-08-31 10:29:13');

-- --------------------------------------------------------

--
-- Table structure for table `privacy_policies`
--

CREATE TABLE `privacy_policies` (
  `id` int(11) NOT NULL,
  `privacypolicy_content` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `privacy_policies`
--

INSERT INTO `privacy_policies` (`id`, `privacypolicy_content`, `created_at`, `updated_at`) VALUES
(1, '<p>At Hommlie, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website, services, and any other platforms we operate.</p><p><strong>1. Information We Collect</strong></p><p>We may collect the following types of information:</p><ul><li><strong>Personal Information:</strong> Name, email address, phone number, home address, and other contact details when you sign up for our services, make inquiries, or subscribe to our newsletters.</li><li><strong>Service Information:</strong> Details related to the services you request or use, such as pest control treatments, cleaning schedules, and feedback.</li><li><strong>Payment Information:</strong> Credit/debit card details, billing address, and payment history when you make transactions through our platform.</li><li><strong>Technical Information:</strong> IP address, browser type, device information, and usage data collected through cookies and similar technologies when you visit our website.</li></ul><p><strong>2. How We Use Your Information</strong></p><p>We use your information for the following purposes:</p><ul><li><strong>Service Delivery:</strong> To provide, manage, and improve our services, including scheduling appointments, processing payments, and responding to your inquiries.</li><li><strong>Customer Support:</strong> To communicate with you, provide customer support, and handle any issues related to our services.</li><li><strong>Marketing:</strong> To send you promotional materials, special offers, and updates about our services, if you have opted in to receive such communications.</li><li><strong>Improvement and Analysis:</strong> To analyze usage patterns and improve our website, services, and user experience.</li><li><strong>Legal Compliance:</strong> To comply with legal obligations, prevent fraud, and enforce our terms and conditions.</li></ul><p><strong>3. Sharing Your Information</strong></p><p>We do not sell or rent your personal information to third parties. However, we may share your information with:</p><ul><li><strong>Service Providers:</strong> Trusted third-party service providers who assist us in delivering our services, such as payment processors, IT support, and marketing agencies. These providers are bound by confidentiality agreements.</li><li><strong>Legal Authorities:</strong> Government authorities or legal entities if required by law, legal processes, or to protect our rights and property.</li></ul><p><strong>4. Data Security</strong></p><p>We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or misuse. However, please note that no method of transmission over the internet or electronic storage is completely secure.</p><p><strong>5. Your Rights</strong></p><p>You have the right to:</p><ul><li><strong>Access Your Information:</strong> Request access to the personal information we hold about you.</li><li><strong>Update Your Information:</strong> Correct or update your personal information if it is inaccurate or incomplete.</li><li><strong>Delete Your Information:</strong> Request the deletion of your personal information, subject to certain legal obligations.</li><li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time by following the unsubscribe link in our emails or contacting us directly.</li></ul><p><strong>6. Cookies and Tracking Technologies</strong></p><p>Our website uses cookies and similar technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how you use our website and improve our services. You can manage your cookie preferences through your browser settings.</p><p><strong>7. Changes to This Privacy Policy</strong></p><p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website and indicating the effective date.</p><p><strong>8. Contact Us</strong></p><p>If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:</p><p><strong>Hommlie</strong></p><p><strong>hommlieofficial@gmail.com</strong></p>', '2021-11-29 11:12:00', '2024-09-01 06:43:34');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `subcat_id` int(11) DEFAULT NULL,
  `innersubcat_id` int(11) DEFAULT NULL,
  `product_name` varchar(191) NOT NULL,
  `brand` varchar(191) DEFAULT NULL,
  `description` longtext NOT NULL,
  `tags` text DEFAULT NULL,
  `product_price` float DEFAULT NULL,
  `discounted_price` varchar(191) DEFAULT NULL,
  `product_qty` int(11) NOT NULL,
  `slug` text DEFAULT NULL,
  `is_variation` int(11) NOT NULL,
  `attribute` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT '1',
  `is_hot` int(11) NOT NULL DEFAULT 2 COMMENT '1 = yes, 2 = no',
  `free_shipping` int(11) DEFAULT NULL,
  `flat_rate` int(11) DEFAULT NULL,
  `shipping_cost` varchar(191) DEFAULT NULL,
  `is_return` int(11) DEFAULT NULL,
  `return_days` varchar(255) DEFAULT NULL,
  `is_featured` int(11) DEFAULT NULL,
  `available_stock` varchar(191) DEFAULT NULL,
  `est_shipping_days` varchar(191) DEFAULT NULL,
  `sku` text DEFAULT NULL,
  `tax` varchar(191) DEFAULT NULL,
  `tax_type` varchar(191) DEFAULT NULL,
  `video` varchar(100) DEFAULT NULL,
  `video_thumbnail` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `vendor_id`, `cat_id`, `subcat_id`, `innersubcat_id`, `product_name`, `brand`, `description`, `tags`, `product_price`, `discounted_price`, `product_qty`, `slug`, `is_variation`, `attribute`, `status`, `is_hot`, `free_shipping`, `flat_rate`, `shipping_cost`, `is_return`, `return_days`, `is_featured`, `available_stock`, `est_shipping_days`, `sku`, `tax`, `tax_type`, `video`, `video_thumbnail`, `created_at`, `updated_at`, `deleted_at`) VALUES
(759, 6, 19, 47, 70, 'AC Repair', '2', 'Keep your cool with our reliable AC repair service. Our certified technicians provide fast, efficient repairs to get your air conditioner running smoothly. We offer 24/7 emergency support and guarantee satisfaction with every service. Don’t let the heat get you down—call us today!', '#acrepair', 299, '199', 2, 'ac-repair', 1, '2,1', '1', 2, 2, 2, '0', 2, '0', 2, '0', '0', 'MN-001', '0', 'amount', NULL, NULL, '2024-06-04 12:29:05', '2024-06-04 12:29:05', NULL),
(761, 6, 18, 42, 70, 'cockroach control services', '4', 'Say goodbye to unwanted pests with our comprehensive cockroach control service. Our expert technicians use safe and effective methods to eliminate cockroaches from your home or business. We offer thorough inspections, targeted treatments, and ongoing prevention plans. Protect your space and enjoy a pest-free environment—contact us today for a consultation!', '#pestcontrol', 2999, '2499', 2, 'cockroach-control-services', 0, NULL, '1', 2, 1, 2, '0', 2, '0', 1, '0', '0', 'DN-005', '2', 'percent', NULL, NULL, '2024-06-04 12:47:56', '2024-07-19 15:43:06', NULL),
(762, 6, 19, 51, 70, 'cockroach control services1', '2', 'Revitalize your furniture with our professional sofa cleaning service. Our skilled technicians use eco-friendly products and advanced techniques to remove dirt, stains, and allergens, leaving your sofa fresh and hygienic. Whether it\'s fabric or leather, we handle all types of upholstery with care. Schedule your cleaning today and bring new life to your sofa!', '#sofacleaning', 999, '899', 2, 'cockroach-control-services1', 0, NULL, '1', 2, 1, 2, '0', 2, '0', 1, '0', '0', 'MN-006', '2', 'percent', NULL, NULL, '2024-06-04 12:55:45', '2024-07-19 15:43:08', NULL),
(763, 6, 19, 48, 70, 'Flat Cleaning', '6', 'Keep your home spotless with our professional flat cleaning service. Our experienced cleaners provide thorough and efficient cleaning tailored to your needs, ensuring every corner of your flat is sparkling clean. From regular maintenance to deep cleaning sessions, we use eco-friendly products for a safe and healthy living environment. Book your flat cleaning today and enjoy a pristine home effortlessly!', '#homecleaning', 2999, '2499', 2, 'flat-cleaning', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, '1', '40mins', 'SP-007', '3', 'percent', NULL, NULL, '2024-06-04 13:03:44', '2024-07-19 15:43:11', NULL),
(764, 6, 18, 44, 70, 'Termite Treatment', '6', 'Protect your property with our expert termite treatment service. Our certified professionals offer comprehensive inspections and customized treatment plans to effectively eliminate termites and prevent future infestations. Using advanced, eco-friendly solutions, we ensure the safety of your home and family. Don’t let termites cause costly damage—schedule your termite treatment today and secure your home!', '', 999, '899', 2, 'termite-treatment', 0, NULL, '1', 2, 1, 2, '0', 2, '0', 1, '5', '0', 'SP-008', '2', 'percent', NULL, NULL, '2024-06-04 13:16:57', '2024-07-19 15:43:14', NULL),
(765, 6, 18, 45, 70, 'Honey bee removals', '2', 'Ensure safety with our professional honey bee removal service. Our skilled technicians humanely relocate bees to protect both your property and the environment. We provide thorough inspections, safe removal techniques, and preventive measures to prevent future infestations. Keep your home and family safe while preserving these vital pollinators—contact us today for expert honey bee removal!', '#honeybee', 799, '749', 2, 'honey-bee-removals', 0, NULL, '1', 2, 1, 2, '0', 2, '0', 1, '0', '1 day', 'MN-009', '2', 'percent', NULL, NULL, '2024-06-04 17:49:53', '2024-07-19 15:43:17', NULL),
(766, 6, 19, 50, 70, 'Kitchen cleaners', '4', 'Transform your kitchen with our professional kitchen cleaning service. Our experienced team provides a deep, thorough clean, tackling grease, grime, and stains on all surfaces, appliances, and fixtures. Using safe and effective cleaning products, we ensure your kitchen is sparkling clean and hygienic. Book our service today and enjoy a pristine, spotless kitchen effortlessly!', '#kitchenclean', 3999, '3499', 2, 'kitchen-cleaners', 0, NULL, '1', 1, 1, 2, '0', 2, '0', 2, '6', '1 day', 'AB-010', '2', 'percent', NULL, NULL, '2024-06-04 18:00:18', '2024-07-19 15:43:22', NULL),
(767, 6, 18, 46, 71, 'Mosquito controller', '3', 'Enjoy a mosquito-free environment with our professional mosquito control service. Our expert technicians use safe, effective treatments to target and eliminate mosquitoes at all stages of their lifecycle. We offer comprehensive inspections, customized treatment plans, and preventative solutions to keep your home or business protected. Reclaim your outdoor spaces and safeguard your health—schedule your mosquito control service today!', '#mosquito', 2000, '1500', 0, 'mosquito-controller', 1, '5', '2', 2, 2, 2, '0', 2, '0', 1, '0', '9', 'PQ-011', '3', 'percent', NULL, NULL, '2024-06-04 18:07:18', '2024-08-15 15:01:18', NULL),
(768, 6, 18, 43, 70, 'BedBug Controller', '4', 'Sleep peacefully with our professional bedbug control service. Our certified experts use advanced techniques and safe treatments to effectively eliminate bedbugs from your home. We provide thorough inspections, targeted treatments, and follow-up plans to ensure complete eradication and prevent future infestations. Don\'t let bedbugs disrupt your life—contact us today for reliable and efficient bedbug control!', '#bedbugcontroller', 2500, '2200', 0, 'bedbug-controller', 1, '7', '1', 1, 2, 2, '0', 2, '0', 2, '5', '60', 'AB-011', '9', 'amount', NULL, NULL, '2024-06-05 05:11:15', '2024-08-15 14:56:51', NULL),
(769, 6, 19, 49, 70, 'Bathroom Cleaner', '2', 'Experience a sparkling clean bathroom with our professional bathroom cleaning service. Our skilled team tackles tough stains, soap scum, and grime, leaving your bathroom spotless and hygienic. We clean and sanitize all surfaces, fixtures, and tiles using eco-friendly products. Book our service today and enjoy a fresh, pristine bathroom effortlessly!', '#bathroomcleaner', 2000, '1500', 0, 'bathroom-cleaner', 1, '5', '1', 2, 1, 2, '0', 2, '0', 1, '6', '50mins', 'MN-012', '2', 'percent', NULL, NULL, '2024-06-05 05:16:58', '2024-08-15 14:55:45', NULL),
(771, 6, 19, 49, NULL, 'ascd', 'dcvs', 'fsdsf', '$tags', 500, '100', 0, '$request->product_name', 0, '$request->attribute', '1', 0, 0, 0, '$shipping_cost', 0, '$return_days', 0, '$request->available_stock', '$request->est_shipping_days', '$request->sku', '$request->tax', '$request->tax_type', NULL, NULL, '2024-08-27 19:51:59', '2024-08-27 19:51:59', NULL),
(772, 6, 19, 49, NULL, 'ascd', 'dcvs', 'fsdsf', '$tags', 500, '100', 0, '$request->product_name', 0, '$request->attribute', '1', 0, 0, 0, '$shipping_cost', 0, '$return_days', 0, '$request->available_stock', '$request->est_shipping_days', '$request->sku', '$request->tax', '$request->tax_type', NULL, NULL, '2024-08-27 19:52:54', '2024-08-27 19:52:54', NULL),
(773, 6, 19, 49, NULL, 'ascd', 'dcvs', 'fsdsf', '$tags', 500, '100', 0, '$request->product_name', 0, '$request->attribute', '1', 0, 0, 0, '$shipping_cost', 0, '$return_days', 0, '$request->available_stock', '$request->est_shipping_days', '$request->sku', '$request->tax', '$request->tax_type', NULL, NULL, '2024-08-27 19:56:46', '2024-08-27 19:56:46', NULL),
(774, 6, 19, 49, NULL, 'ascd', 'dcvs', 'fsdsf', '$tags', 500, '100', 0, '$request->product_name', 0, '$request->attribute', '1', 0, 0, 0, '$shipping_cost', 0, '$return_days', 0, '$request->available_stock', '$request->est_shipping_days', '$request->sku', '$request->tax', '$request->tax_type', NULL, NULL, '2024-08-27 20:17:47', '2024-08-27 20:17:47', NULL),
(775, 6, 18, 42, NULL, 'fdgdfg', NULL, 'hgfhfv', 'na', 500, '250', 2, 'fdgdfg', 1, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'dfgd', '0', 'amount', NULL, NULL, '2024-08-27 20:25:52', '2024-08-27 20:25:52', NULL),
(776, 6, 18, 42, NULL, 'cock cntrl', NULL, 'wedfcw', 'na', 2500, '520', 2, 'cock-cntrl', 1, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'test', '0', 'amount', NULL, NULL, '2024-08-27 20:31:21', '2024-08-27 20:31:21', NULL),
(777, 6, 38, 63, NULL, 'Rentokil Product', NULL, 'RentoKill', 'na', 200, '100', 2, 'rentokil-product', 1, NULL, '1', 1, 2, 2, '0', 2, '0', 1, NULL, '10', 'test', '10', 'percent', NULL, NULL, '2024-08-30 20:57:56', '2024-08-30 20:57:56', NULL),
(778, 6, 38, 63, NULL, 'Pest Spray', NULL, 'sPRAY', 'na', 500, '400', 2, 'pest-spray', 1, NULL, '1', 2, 2, 2, '0', 2, '0', 1, NULL, '0', 'Spray', '0', 'amount', NULL, NULL, '2024-08-30 21:00:25', '2024-08-30 21:00:25', NULL),
(779, 6, 38, 63, NULL, 'Premise', NULL, 'Premise', 'na', 500, '450.00', 2, 'premise', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'Premise', '0', 'amount', NULL, NULL, '2024-08-30 21:01:02', '2024-08-30 21:01:02', NULL),
(780, 6, 18, 42, NULL, 'Standard Cockroach', NULL, 'test', 'na', 4500, '2160.00', 2, 'standard-cockroach', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 1, NULL, '0', 'Standard', '0', 'amount', NULL, NULL, '2024-08-30 23:16:09', '2024-08-30 23:16:09', NULL),
(781, 6, 18, 43, NULL, 'Standard Bedbug', NULL, 'Standard BedbugStandard BedbugStandard BedbugStandard Bedbug', 'na', 50000, '40000.00', 2, 'standard-bedbug', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'Standard Bedbug', '0', 'amount', NULL, NULL, '2024-08-30 23:53:07', '2024-08-30 23:53:07', NULL),
(782, 1, 18, 42, NULL, 'Bed Bug Controller', NULL, 'Bed Bug Controller', 'na', 5000, '2500', 2, 'bed-bug-controller', 1, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'Bed Bug Controller', '0', 'amount', NULL, NULL, '2024-09-01 07:13:24', '2024-09-01 07:13:24', NULL),
(783, 1, 18, 42, NULL, 'Bed Bug Controller', NULL, 'Bed Bug Controller', 'na', 5000, '2500', 2, 'bed-bug-controller', 1, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'Bed Bug Controller', '0', 'amount', NULL, NULL, '2024-09-01 07:16:05', '2024-09-01 07:16:05', NULL),
(784, 1, 19, 47, NULL, 'Washroom cleaning', NULL, 'Washroom cleaning', 'na', 500, '275.00', 2, 'washroom-cleaning', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'Washroom cleaning', '0', 'amount', NULL, NULL, '2024-09-01 07:18:40', '2024-09-01 07:18:40', NULL),
(786, 6, 18, 42, NULL, 'New Product in new Dash', NULL, '<p>New Product in new <strong>Dash hg jhhj</strong>j jhg jhg hjghjg jhgtyrtre hgf    jygyu    uytut</p>', '', 5000, '2500.00', 20, 'new-product-in-new-dash', 1, '[\"5\",\"4\",\"5\"]', '2', 1, 2, 2, '0', 2, '0', 1, NULL, '0', NULL, '20', 'percent', NULL, NULL, '2024-09-03 10:45:39', '2024-09-04 13:28:21', NULL),
(787, 7, 18, 42, NULL, 'dfgdfg', NULL, '<p>kjhjh kjh <strong>kjhk&nbsp;</strong></p>', 'na', 5, '500', 2, 'dfgdfg', 1, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '20', 'NA', '0', 'amount', NULL, NULL, '2024-09-03 12:22:55', '2024-09-03 12:22:55', NULL),
(788, 7, 18, 42, NULL, 'frgtaczac', NULL, '<p>jnbjhgb</p>', 'na', 500, '400.00', 2, 'frgtaczac', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'NA', '0', 'amount', 'video-66d700955936a.mp4', NULL, '2024-09-03 12:27:01', '2024-09-03 12:27:01', NULL),
(789, 7, 18, 42, NULL, 'dsfsdf', NULL, '<p>jhg juhh kujuh kiuyjh</p>', 'na', 5000, '4000.00', 2, 'dsfsdf', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'NA', '0', 'amount', 'video-66d701083b74a.mp4', 'video-66d7010885b77.jpg', '2024-09-03 12:28:56', '2024-09-03 12:28:56', NULL),
(790, 7, 18, 42, NULL, 'dfgvfg', NULL, '<p>dfbdfbfdx</p>', 'na', 500, '400.00', 2, 'dfgvfg', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '020', 'NA', '0', 'amount', 'NA', 'NA', '2024-09-03 13:22:10', '2024-09-03 13:22:10', NULL),
(791, 7, 18, 42, NULL, 'asdferf', NULL, '<p>jhgjg</p>', 'na', 50, '45.00', 2, 'asdferf', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'NA', '0', 'amount', 'NA', 'NA', '2024-09-06 07:02:47', '2024-09-06 07:02:47', NULL),
(792, 7, 18, NULL, NULL, 'hgfhfhf', NULL, '<p>bjhgvhj</p>', 'na', 500, '400.00', 2, 'hgfhfhf', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'NA', '0', 'amount', 'NA', 'NA', '2024-09-06 07:08:43', '2024-09-06 07:08:43', NULL),
(793, 7, 29, NULL, NULL, 'Mosquito control', NULL, '<p>hbhjg</p>', 'na', 3000, '2400.00', 2, 'mosquito-control', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'NA', '0', 'amount', 'NA', 'NA', '2024-09-06 07:18:11', '2024-09-06 07:18:11', NULL),
(794, 7, 28, NULL, NULL, 'Bird netting prod', NULL, '<p>ngvhf <strong>jhgjg</strong></p>', 'na', 500, '400.00', 2, 'bird-netting-prod', 0, NULL, '1', 2, 2, 2, '0', 2, '0', 2, NULL, '0', 'NA', '0', 'amount', 'NA', 'NA', '2024-09-06 07:20:10', '2024-09-06 07:20:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products_old`
--

CREATE TABLE `products_old` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` varchar(191) NOT NULL,
  `media` enum('Image','Video') NOT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`, `media`, `thumbnail`, `created_at`, `updated_at`) VALUES
(3553, 744, 'product-6607bd09ce81c.jpg', 'Image', NULL, '2022-08-26 22:04:51', '2024-03-30 07:19:37'),
(3554, 745, 'product-6607bf4f1bb89.jpeg', 'Image', NULL, '2022-08-26 22:28:51', '2024-03-30 07:29:19'),
(3556, 746, 'product-6607bf0444cfa.jpg', 'Image', NULL, '2022-08-26 23:52:26', '2024-03-30 07:28:04'),
(3558, 745, 'item-63095d0e43bad.jpeg', 'Image', NULL, '2022-08-26 23:53:50', '2022-08-26 23:53:50'),
(3559, 745, 'item-63095d0e440c5.jpeg', 'Image', NULL, '2022-08-26 23:53:50', '2022-08-26 23:53:50'),
(3560, 747, 'product-6607be73eca87.jpeg', 'Image', NULL, '2022-08-26 23:56:50', '2024-03-30 07:25:39'),
(3561, 748, 'product-6607bf898a266.jpeg', 'Image', NULL, '2022-08-27 00:00:32', '2024-03-30 07:30:17'),
(3562, 749, 'product-6607bce10fc07.jpg', 'Image', NULL, '2022-08-27 00:02:40', '2024-03-30 07:18:57'),
(3563, 750, 'product-6607bdbed804c.jpeg', 'Image', NULL, '2022-08-27 00:03:20', '2024-03-30 07:22:38'),
(3564, 751, 'product-6607bcc1c11b6.jpeg', 'Image', NULL, '2022-08-27 00:04:01', '2024-03-30 07:18:25'),
(3565, 752, 'product-6607bd88efaf2.jpeg', 'Image', NULL, '2022-08-27 00:22:55', '2024-03-30 07:21:44'),
(3566, 753, 'product-6607bd58c2337.jpeg', 'Image', NULL, '2022-08-27 00:23:36', '2024-03-30 07:20:56'),
(3567, 754, 'product-6607bd3bea545.jpeg', 'Image', NULL, '2022-08-27 00:24:16', '2024-03-30 07:20:27'),
(3568, 755, 'product-63b9be7ae23fe.jpg', 'Image', NULL, '2022-08-27 00:24:59', '2023-01-07 18:48:26'),
(3569, 754, 'item-63ba4f4a90321.jpg', 'Image', NULL, '2023-01-08 05:06:18', '2023-01-08 05:06:18'),
(3570, 754, 'item-63ba4f4a90742.jpg', 'Image', NULL, '2023-01-08 05:06:18', '2023-01-08 05:06:18'),
(3571, 756, 'product-6607e7d941a98.jpg', 'Image', NULL, '2024-03-30 10:22:17', '2024-03-30 10:22:17'),
(3572, 757, 'product-6607e8502c2ba.jpeg', 'Image', NULL, '2024-03-30 10:24:16', '2024-03-30 10:24:16'),
(3573, 758, 'product-665f082eb5d60.jpg', 'Image', NULL, '2024-06-04 12:27:26', '2024-06-04 12:27:26'),
(3574, 759, 'product-665f08919d9a5.jpg', 'Image', NULL, '2024-06-04 12:29:05', '2024-06-04 12:29:05'),
(3575, 761, 'product-666ed7b326dfc.png', 'Image', NULL, '2024-06-04 12:47:56', '2024-06-16 12:16:51'),
(3576, 762, 'product-666ed916d1001.png', 'Image', NULL, '2024-06-04 12:55:45', '2024-06-16 12:22:46'),
(3577, 763, 'product-665f10b0a9ce8.jpg', 'Image', NULL, '2024-06-04 13:03:44', '2024-06-04 13:03:44'),
(3578, 764, 'product-666eda718e3c7.png', 'Image', NULL, '2024-06-04 13:16:57', '2024-06-16 12:28:33'),
(3579, 765, 'product-665f53c10b326.png', 'Image', NULL, '2024-06-04 17:49:53', '2024-06-04 17:49:53'),
(3580, 766, 'product-665f5632d9c12.png', 'Image', NULL, '2024-06-04 18:00:18', '2024-06-04 18:00:18'),
(3581, 767, 'product-666ed9993b530.png', 'Image', NULL, '2024-06-04 18:07:18', '2024-06-16 12:24:57'),
(3582, 768, 'product-665ff37357e3a.png', 'Image', NULL, '2024-06-05 05:11:15', '2024-06-05 05:11:15'),
(3583, 769, 'product-666ed6111400a.png', 'Image', NULL, '2024-06-05 05:17:00', '2024-06-16 12:09:53'),
(3584, 770, 'product-66714508f14e0.jpg', 'Image', NULL, '2024-06-18 08:27:53', '2024-06-18 08:27:53'),
(3586, 769, '602e3fd3c11fc.mp4', 'Video', NULL, NULL, NULL),
(3588, 766, 'item-66cd7863a525f.jpeg', 'Image', NULL, '2024-08-27 12:25:31', '2024-08-27 12:25:31'),
(3589, 786, 'item-66d6eab8b0478.JPG', 'Image', NULL, '2024-09-03 10:53:44', '2024-09-03 10:53:44'),
(3590, 786, 'item-66d6ecb820385.jpeg', 'Image', NULL, '2024-09-03 11:02:16', '2024-09-03 11:02:16'),
(3591, 787, 'product-66d6ff9fd8308.jpg', 'Image', NULL, '2024-09-03 12:22:55', '2024-09-03 12:22:55'),
(3592, 788, 'product-66d70095a17aa.jpg', 'Image', NULL, '2024-09-03 12:27:01', '2024-09-03 12:27:01'),
(3593, 789, 'product-66d7010896447.jpg', 'Image', NULL, '2024-09-03 12:28:56', '2024-09-03 12:28:56'),
(3594, 790, 'product-66d70d821275d.jpg', 'Image', NULL, '2024-09-03 13:22:10', '2024-09-03 13:22:10'),
(3596, 791, 'product-66daa917a2eec.jpeg', 'Image', NULL, '2024-09-06 07:02:47', '2024-09-06 07:02:47'),
(3597, 791, 'video-66daa917a35ec.mp4', 'Video', 'thumbnail-66daa917a3aad.jpeg', '2024-09-06 07:02:47', '2024-09-06 07:02:47'),
(3598, 792, 'product-66daaa7b600f3.jpeg', 'Image', NULL, '2024-09-06 07:08:43', '2024-09-06 07:08:43'),
(3599, 792, 'video-66daaa7b603c7.jpeg', 'Video', 'thumbnail-66daaa7b604a5.jpg', '2024-09-06 07:08:43', '2024-09-06 07:08:43'),
(3600, 793, 'product-66daacb3bdddd.jpeg', 'Image', NULL, '2024-09-06 07:18:11', '2024-09-06 07:18:11'),
(3601, 793, 'video-66daacb3be459.mp4', 'Video', 'thumbnail-66daacb3be820.jpeg', '2024-09-06 07:18:11', '2024-09-06 07:18:11'),
(3602, 794, 'product-66daad2acf6e1.jpeg', 'Image', NULL, '2024-09-06 07:20:10', '2024-09-06 07:20:10'),
(3603, 794, 'video-66daad2acf9a3.mp4', 'Video', 'thumbnail-66daad2acfd99.jpeg', '2024-09-06 07:20:10', '2024-09-06 07:20:10');

-- --------------------------------------------------------

--
-- Table structure for table `purchaseorder`
--

CREATE TABLE `purchaseorder` (
  `id` int(11) NOT NULL,
  `vendor` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `heading` varchar(200) NOT NULL,
  `body` longtext DEFAULT NULL,
  `attachment` longtext DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `purchaseorder`
--

INSERT INTO `purchaseorder` (`id`, `vendor`, `email`, `heading`, `body`, `attachment`, `status`, `created_at`, `updated_at`) VALUES
(6, '1', 'test@gmail.com', 'test', '<p>test</p>', '', 1, '2024-08-23 10:08:27', '2024-08-23 10:13:34');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `options` varchar(255) DEFAULT NULL,
  `required` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `label`, `type`, `options`, `required`, `status`, `created_at`, `updated_at`) VALUES
(1, 'How Many Bedbug you found', 'text', NULL, 0, 1, '2024-07-08 16:12:29', '2024-07-09 07:22:49'),
(2, 'How much time required', 'text', NULL, 1, 1, '2024-07-08 16:18:48', '2024-07-09 07:23:01'),
(3, 'Image Of Current Conditon', 'file', NULL, 0, 1, '2024-07-08 16:18:56', '2024-07-10 15:36:22'),
(4, 'What is current Conditon', 'radio', 'Low, Medium, High,Too High', 1, 1, '2024-07-08 16:19:06', '2024-07-10 14:47:30'),
(5, 'Insect Found', 'checkbox', '50 , 100 , 150 , 500+', 1, 1, '2024-07-08 16:19:42', '2024-07-10 14:48:34'),
(8, 'test quest', 'text', NULL, 1, 1, '2024-07-10 14:32:41', '2024-07-10 14:32:41'),
(9, 'How many times You used BedBug Control?', 'checkbox', '1,2,3,4,5', 1, 1, '2024-07-10 15:11:10', '2024-07-10 15:11:10'),
(10, 'How Many BedBugs you seen?', 'radio', '10,20,30,40', 1, 1, '2024-07-10 15:11:42', '2024-07-10 15:11:42'),
(11, 'how much time required?', 'checkbox', '1hr,2hrs', 1, 1, '2024-07-11 15:19:21', '2024-09-06 05:05:54'),
(12, 'vhv1', 'checkbox', 'gh,gh,ghgh', 0, 1, '2024-07-17 18:02:56', '2024-09-03 11:27:40'),
(13, 'fdg', 'text', NULL, 1, 1, '2024-09-03 11:33:36', '2024-09-03 11:33:36');

-- --------------------------------------------------------

--
-- Table structure for table `question_answers`
--

CREATE TABLE `question_answers` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `stage` varchar(50) NOT NULL,
  `answers` longtext DEFAULT NULL,
  `emp_id` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `question_answers`
--

INSERT INTO `question_answers` (`id`, `order_id`, `stage`, `answers`, `emp_id`, `updated_at`, `created_at`) VALUES
(1, 1, '1', '1', 1, '2024-07-10 17:48:21', '2024-07-10 17:48:21'),
(2, 1, '1', '1', 1, '2024-07-10 19:37:29', '2024-07-10 19:37:29'),
(3, 118, '3', NULL, 23, '2024-07-10 20:08:26', '2024-07-10 20:08:26'),
(4, 118, '3', NULL, 23, '2024-07-10 20:15:51', '2024-07-10 20:15:51'),
(5, 118, '3', NULL, 23, '2024-07-10 20:20:23', '2024-07-10 20:20:23'),
(6, 118, '3', NULL, 23, '2024-07-10 20:20:25', '2024-07-10 20:20:25'),
(7, 118, '4', NULL, 23, '2024-07-10 21:02:30', '2024-07-10 21:02:30'),
(8, 118, '4', NULL, 23, '2024-07-10 21:02:37', '2024-07-10 21:02:37'),
(9, 166, '3', '[{\"answer\":\"20\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"2\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"yes i have seen\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 100 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"2 hour\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"more than 50\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 23, '2024-07-10 21:07:34', '2024-07-10 21:07:34'),
(10, 166, '3', '[{\"answer\":\"30\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"3,4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"ihave seen\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 150 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" High\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"2 hour\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"rt yus\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 23, '2024-07-10 21:08:22', '2024-07-10 21:08:22'),
(11, 166, '3', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"2,3,4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"ihave seen\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 150 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" High\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"1 hour\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"ghj\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 23, '2024-07-10 21:12:19', '2024-07-10 21:12:19'),
(12, 166, '3', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"1,3\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"gh jk\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 100 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"dg hj\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"tjjj\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 23, '2024-07-10 21:17:26', '2024-07-10 21:17:26'),
(13, 166, '4', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"3\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"fg jk\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 150 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"ghj\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"ty hh\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 23, '2024-07-10 21:21:46', '2024-07-10 21:21:46'),
(14, 170, '3', '[{\"answer\":\"4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 25, '2024-07-11 01:01:06', '2024-07-11 01:01:06'),
(15, 170, '4', '[{\"answer\":\"ok\",\"id\":8,\"question\":\"test quest\"}]', 25, '2024-07-11 01:02:17', '2024-07-11 01:02:17'),
(16, 172, '3', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"3\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"fjijb  bh\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 100 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"dy\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"tyu\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 25, '2024-07-11 01:23:08', '2024-07-11 01:23:08'),
(17, 172, '4', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"dg jj\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 150 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"fg hj\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"ry\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 25, '2024-07-11 01:28:02', '2024-07-11 01:28:02'),
(18, 173, '3', NULL, 25, '2024-07-11 01:37:43', '2024-07-11 01:37:43'),
(19, 173, '4', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"fh\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 100 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"yhj\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"yo\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 25, '2024-07-11 01:38:49', '2024-07-11 01:38:49'),
(20, 174, '3', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"1,2,3,4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"vn\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\"50 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"gh iu\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"fu u\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 25, '2024-07-11 01:57:25', '2024-07-11 01:57:25'),
(21, 174, '4', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"xv j\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\"50 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\"Low\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"xv hj j\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"fk jh\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 25, '2024-07-11 02:02:16', '2024-07-11 02:02:16'),
(22, 175, '3', '[{\"answer\":\"4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 25, '2024-07-11 10:37:13', '2024-07-11 10:37:13'),
(23, 175, '3', '[{\"answer\":\"3\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 25, '2024-07-11 10:45:54', '2024-07-11 10:45:54'),
(24, 175, '4', '[{\"answer\":\"ok\",\"id\":8,\"question\":\"test quest\"}]', 25, '2024-07-11 10:46:30', '2024-07-11 10:46:30'),
(25, 175, '3', '[{\"answer\":\"3\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 25, '2024-07-11 10:48:17', '2024-07-11 10:48:17'),
(26, 175, '4', '[{\"answer\":\"ini\",\"id\":8,\"question\":\"test quest\"}]', 25, '2024-07-11 10:48:29', '2024-07-11 10:48:29'),
(27, 174, '3', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"fg uo\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 100 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"dh u\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"et y\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 25, '2024-07-11 10:56:31', '2024-07-11 10:56:31'),
(28, 174, '4', '[{\"answer\":\"40\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"gu j\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 100 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" High\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"fy u\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"ru i\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 25, '2024-07-11 11:02:58', '2024-07-11 11:02:58'),
(29, 178, '3', '[{\"answer\":\"20\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"1,4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"fhhf\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 150 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"gh\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"ggh\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 27, '2024-07-11 14:01:45', '2024-07-11 14:01:45'),
(30, 178, '4', '[{\"answer\":\"30\",\"id\":10,\"question\":\"How Many BedBugs you seen?\"},{\"answer\":\"3\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"},{\"answer\":\"cbfg\",\"id\":8,\"question\":\"test quest\"},{\"answer\":\" 150 \",\"id\":5,\"question\":\"Insect Found\"},{\"answer\":\" Medium\",\"id\":4,\"question\":\"What is current Conditon\"},{\"answer\":\"\",\"id\":3,\"question\":\"Image Of Current Conditon\"},{\"answer\":\"fhh\",\"id\":2,\"question\":\"How much time required\"},{\"answer\":\"hff\",\"id\":1,\"question\":\"How Many Bedbug you found\"}]', 27, '2024-07-11 14:03:35', '2024-07-11 14:03:35'),
(31, 181, '3', '[{\"answer\":\"1\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 25, '2024-07-11 15:44:23', '2024-07-11 15:44:23'),
(32, 181, '4', '[{\"answer\":\"bugs issue in bed \",\"id\":8,\"question\":\"test quest\"}]', 25, '2024-07-11 15:45:35', '2024-07-11 15:45:35'),
(33, 182, '3', '[{\"answer\":\"1\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 30, '2024-07-17 17:48:03', '2024-07-17 17:48:03'),
(34, 182, '4', '[{\"answer\":\"hhh\",\"id\":8,\"question\":\"test quest\"}]', 30, '2024-07-17 17:48:40', '2024-07-17 17:48:40'),
(35, 176, '3', '[{\"answer\":\"1,2,3\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 30, '2024-08-13 15:51:59', '2024-08-13 15:51:59'),
(36, 176, '4', '[{\"answer\":\"hddf\",\"id\":8,\"question\":\"test quest\"}]', 30, '2024-08-13 15:52:21', '2024-08-13 15:52:21'),
(37, 181, '3', '[{\"answer\":\"4\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 30, '2024-08-14 15:03:40', '2024-08-14 15:03:40'),
(38, 182, '3', '[{\"answer\":\"3\",\"id\":9,\"question\":\"How many times You used BedBug Control?\"}]', 30, '2024-08-14 15:07:40', '2024-08-14 15:07:40'),
(39, 181, '4', '[{\"answer\":\"ok \",\"id\":8,\"question\":\"test quest\"}]', 30, '2024-08-14 17:38:05', '2024-08-14 17:38:05');

-- --------------------------------------------------------

--
-- Table structure for table `quotations`
--

CREATE TABLE `quotations` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `heading` varchar(200) NOT NULL,
  `body` longtext DEFAULT NULL,
  `attachment` longtext DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `quotations`
--

INSERT INTO `quotations` (`id`, `email`, `heading`, `body`, `attachment`, `status`, `created_at`, `updated_at`) VALUES
(1, '', 'test', '<p>test</p>', 'quotation66c7198dc3b70.pdf', 1, '2024-08-22 16:27:18', '2024-08-22 17:18:26'),
(2, '', 'sdfgsdfg', '<p>Dear <strong>jhg</strong></p><p>gghdfg</p><p>dfg</p><p>&nbsp;</p><p>dfg</p><p>dfg</p><p>dfg</p><p>dfg</p>', '', 1, '2024-08-22 16:35:50', '2024-08-22 16:35:50'),
(3, '', 'test Quotation', '<p>Dear <strong>Test</strong></p><p>This is test Quote</p>', '', 1, '2024-08-22 17:05:15', '2024-08-22 17:05:15'),
(4, 'krishnavenkat153@gmail.com', 'test', '<p>test</p>', '', 0, '2024-08-22 22:11:27', '2024-09-06 04:46:03'),
(5, 'krishnavenkat153@gmail.com', 'ok', '<p>ok</p>', 'quotation66c76b3292540.jpeg', 1, '2024-08-22 22:15:38', '2024-08-22 22:15:38'),
(6, 'krishnavenkat153@gmail.com', 'Service booked Confirmation', '<p>Dear <strong>Krishna</strong>,</p><p>Thank you for choosing our cockroach control service at <strong>Hommlie</strong>. We are pleased to confirm that your order has been successfully booked. Our team is scheduled to visit your premises on Tomorrow</p><p>We assure you of our best service to ensure a pest-free environment in your home.</p><p>If you have any questions or need to reschedule, please feel free to contact us.</p><p>Best regards,<br><strong>Hommlie</strong></p>', '', 1, '2024-08-23 09:40:31', '2024-08-23 09:40:31'),
(7, 'krishnavenkat153@gmail.com', 'Test subject', '<p>test</p>', '', 1, '2024-08-30 16:55:19', '2024-08-30 16:55:19');

-- --------------------------------------------------------

--
-- Table structure for table `rattings`
--

CREATE TABLE `rattings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `ratting` varchar(191) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rattings`
--

INSERT INTO `rattings` (`id`, `user_id`, `vendor_id`, `product_id`, `ratting`, `comment`, `created_at`, `updated_at`) VALUES
(1, 8, 6, 2, '4', 'good', '2022-06-05 13:32:43', '2022-06-05 13:32:43'),
(2, 98, 6, 761, '4', 'nice service', '2024-07-10 15:09:00', '2024-07-10 15:09:00'),
(3, 101, 6, 770, '4', 'nice service they provided', '2024-07-12 07:21:01', '2024-07-12 07:21:01');

-- --------------------------------------------------------

--
-- Table structure for table `return_conditions`
--

CREATE TABLE `return_conditions` (
  `id` int(11) NOT NULL,
  `return_conditions` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `return_conditions`
--

INSERT INTO `return_conditions` (`id`, `return_conditions`, `created_at`, `updated_at`) VALUES
(1, 'WITH IN 10 DAYS', '2022-06-02 11:52:20', '2022-06-02 11:52:20');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `title`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', '2019-04-15 13:43:32', '2019-04-15 13:43:32', NULL),
(2, 'User', '2019-04-15 13:43:32', '2024-07-30 00:36:27', '2024-07-30 00:36:27'),
(3, 'call center', '2024-09-02 06:37:43', '2024-09-02 06:37:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `service_completion`
--

CREATE TABLE `service_completion` (
  `id` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `OrderId` varchar(100) NOT NULL,
  `otp` varchar(50) NOT NULL,
  `is_otp_verified` int(11) NOT NULL DEFAULT 2 COMMENT '1=verified,2=unverified',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `service_completion`
--

INSERT INTO `service_completion` (`id`, `empId`, `OrderId`, `otp`, `is_otp_verified`, `status`, `created_at`, `updated_at`) VALUES
(1, 30, '10', '914248', 2, 1, '2024-08-21 07:18:47', '2024-08-21 07:18:47'),
(2, 30, '10005', '376580', 2, 1, '2024-08-21 07:27:01', '2024-08-21 07:27:01'),
(3, 30, '10005', '890405', 2, 1, '2024-08-21 12:00:06', '2024-08-21 12:00:06'),
(4, 30, '183', '455963', 2, 1, '2024-08-21 12:04:38', '2024-08-21 12:04:38'),
(5, 30, '177', '138019', 2, 1, '2024-08-21 12:15:09', '2024-08-21 12:15:09'),
(6, 30, '10001', '440794', 2, 1, '2024-08-21 12:16:20', '2024-08-21 12:16:20'),
(7, 30, 'C1CI7H5OB6', '672599', 2, 1, '2024-08-21 12:16:41', '2024-08-21 12:16:41'),
(8, 30, '10003', '476017', 2, 1, '2024-08-21 12:21:50', '2024-08-21 12:21:50'),
(9, 30, 'C1CI7H5OB6', '983302', 2, 1, '2024-08-21 13:36:48', '2024-08-21 13:36:48'),
(10, 30, 'C1CI7H5OB6', '552969', 2, 1, '2024-08-21 14:37:18', '2024-08-21 14:37:18'),
(11, 30, 'C1CI7H5OB6', '583888', 2, 1, '2024-08-21 14:37:44', '2024-08-21 14:37:44'),
(12, 30, 'C1CI7H5OB6', '380763', 2, 1, '2024-08-21 14:37:51', '2024-08-21 14:37:51'),
(13, 30, 'C1CI7H5OB6', '536548', 2, 1, '2024-08-21 14:38:27', '2024-08-21 14:38:27'),
(14, 30, 'C1CI7H5OB6', '638500', 2, 1, '2024-08-21 14:38:28', '2024-08-21 14:38:28'),
(15, 30, 'C1CI7H5OB6', '899473', 2, 1, '2024-08-21 14:38:31', '2024-08-21 14:38:31'),
(16, 30, 'C1CI7H5OB6', '193335', 2, 1, '2024-08-21 14:38:46', '2024-08-21 14:38:46'),
(17, 30, 'C1CI7H5OB6', '793912', 2, 1, '2024-08-21 14:56:45', '2024-08-21 14:56:45'),
(18, 30, 'C1CI7H5OB6', '139005', 2, 1, '2024-08-21 14:56:45', '2024-08-21 14:56:45'),
(19, 30, 'C1CI7H5OB6', '680624', 2, 1, '2024-08-21 14:56:50', '2024-08-21 14:56:50'),
(20, 30, '170', '956104', 2, 1, '2024-08-21 16:38:00', '2024-08-21 19:19:09'),
(21, 30, 'C1CI7H5OB6', '185456', 2, 1, '2024-08-21 16:38:10', '2024-08-21 16:38:10'),
(22, 30, 'sdkjfh', '337611', 2, 1, '2024-08-21 16:38:30', '2024-08-21 16:38:30'),
(23, 30, '10001', '851776', 2, 1, '2024-08-21 17:01:27', '2024-08-21 17:01:27'),
(24, 30, '10001', '341237', 2, 1, '2024-08-21 17:01:58', '2024-08-21 17:01:58'),
(25, 30, '10001', '817452', 2, 1, '2024-08-21 17:03:16', '2024-08-21 17:03:16'),
(26, 30, '10001', '290454', 2, 1, '2024-08-21 17:04:47', '2024-08-21 17:04:47'),
(27, 30, '10001', '521810', 2, 1, '2024-08-21 17:06:28', '2024-08-21 17:06:28'),
(28, 30, '10001', '592364', 2, 1, '2024-08-21 17:16:25', '2024-08-21 17:16:25'),
(29, 30, 'C1CI7H5OB6', '159729', 2, 1, '2024-08-21 17:17:19', '2024-08-21 17:17:19'),
(30, 30, 'C1CI7H5OB6', '929268', 2, 1, '2024-08-21 17:20:38', '2024-08-21 17:20:38'),
(31, 30, 'C1CI7H5OB6', '134102', 2, 1, '2024-08-21 18:38:15', '2024-08-21 18:38:15'),
(32, 30, 'C1CI7H5OB6', '689483', 2, 1, '2024-08-21 18:39:01', '2024-08-21 18:39:01'),
(33, 30, '10001', '873806', 2, 1, '2024-08-21 18:40:05', '2024-08-21 18:40:05'),
(34, 12, '170', '800716', 2, 1, '2024-08-21 23:49:15', '2024-08-21 18:20:55'),
(35, 12, '204', '977469', 2, 1, '2024-08-22 00:13:24', '2024-08-21 18:46:23'),
(36, 20, '204', '188632', 2, 1, '2024-08-22 00:35:01', '2024-08-22 00:35:01');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firebase_key` text DEFAULT NULL,
  `currency` varchar(191) DEFAULT NULL,
  `currency_position` varchar(191) NOT NULL,
  `logo` varchar(191) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `min_balance` float NOT NULL,
  `admin_commission` float NOT NULL,
  `timezone` longtext DEFAULT NULL,
  `copyright` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `site_title` text DEFAULT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `og_image` varchar(191) DEFAULT NULL,
  `facebook` text DEFAULT NULL,
  `twitter` text DEFAULT NULL,
  `instagram` text DEFAULT NULL,
  `linkedin` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `firebase_key`, `currency`, `currency_position`, `logo`, `favicon`, `min_balance`, `admin_commission`, `timezone`, `copyright`, `address`, `contact`, `email`, `site_title`, `meta_title`, `meta_description`, `og_image`, `facebook`, `twitter`, `instagram`, `linkedin`, `created_at`, `updated_at`) VALUES
(1, 'AAAA30HlV94:APA91bE6oGJHBT1DdwKnI9S236RfHo78sFSQe-sU4Mna_dGCEW6zzU57Cav_nULPUdGZrP8hjGn3d42BxqBzzq1wL-bP37Mx77NebOKFJNmxcFAFR8Fd_5osg1ac_W7AQ-monMNYeQkr', '₹', 'left', 'logo-668e59307ed92.png', 'favicon-6639c693a9c91.png', 50, 1, 'Asia/Kolkata', '©2024 Hommlie id proudly developed by ADML Technoservices Pvt. Ltd.', 'Bangalore', '+91-9131044631', 'reach@hommlie.com', 'Hommlie', 'Hommlie', 'Hommlie', 'og_image-649093d55d7f1.png', 'https://www.facebook.com/', 'https://twitter.com/', 'https://www.instagram.com/', 'https://www.linkedin.com/', NULL, '2024-09-06 05:08:02');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(191) NOT NULL,
  `link` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `image`, `link`, `status`, `created_at`, `updated_at`) VALUES
(43, 'slider-666dea3991700.png', 'https://techmonkshub.com', '1', '2024-06-15 19:23:37', '2024-09-03 11:04:36'),
(44, 'slider-666df4bd33433.png', 'https://techmonkshub.com', '1', '2024-06-15 19:57:11', '2024-09-03 11:04:40'),
(45, 'slider-66a402520d255.png', 'https://techmonkshub.com', '1', '2024-07-27 01:31:50', '2024-07-27 01:38:50'),
(46, 'slider-66d4c608036c2.jpg', 'https://techmonkshub.com', '2', '2024-09-01 19:52:40', '2024-09-04 20:58:04');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cat_id` int(11) NOT NULL,
  `subcategory_name` varchar(191) NOT NULL,
  `icon` varchar(111) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT '1',
  `slug` varchar(191) NOT NULL,
  `question` longtext DEFAULT NULL COMMENT 'question Required',
  `video` varchar(250) DEFAULT NULL,
  `thumbnail` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `cat_id`, `subcategory_name`, `icon`, `status`, `slug`, `question`, `video`, `thumbnail`, `created_at`, `updated_at`) VALUES
(42, 18, 'Cockroach Control', 'subcategory-665d77b262165.jpg', '1', 'pest-control-cockroach-control', '[{\"title\":\"Onsite\",\"question\":\"9\"},{\"title\":\"OnCompleted\",\"question\":\"8\"}]', NULL, NULL, '2024-06-01 12:05:47', '2024-06-03 07:58:42'),
(43, 18, 'Bedbug Control', 'subcategory-665d77a7371ee.jpg', '1', 'pest-control-bedbug-control', '[{\"title\":\"Onsite\",\"question\":\"9\"},{\"title\":\"OnCompleted\",\"question\":\"8\"}]', NULL, NULL, '2024-06-01 12:06:13', '2024-06-03 07:58:31'),
(44, 18, 'Termite Treatment', 'subcategory-665d779e918c0.jpg', '1', 'pest-control-termite-treatment', '[{\"title\":\"Onsite\",\"question\":\"9\"},{\"title\":\"OnCompleted\",\"question\":\"8\"}]', NULL, NULL, '2024-06-01 12:06:44', '2024-06-03 07:58:22'),
(45, 18, 'Honey Bee Removal', 'subcategory-665d778dde333.jpg', '1', 'pest-control-honey-bee-removal', '[{\"title\":\"Onsite\",\"question\":\"9\"},{\"title\":\"OnCompleted\",\"question\":\"8\"}]', NULL, NULL, '2024-06-01 12:07:03', '2024-06-03 07:58:05'),
(46, 18, 'Mosquito Control', 'subcategory-665d777d35ab9.jpg', '2', 'pest-control-mosquito-control', '[{\"title\":\"Onsite\",\"question\":\"9\"},{\"title\":\"OnCompleted\",\"question\":\"8\"}]', NULL, NULL, '2024-06-01 12:07:24', '2024-08-16 10:31:15'),
(47, 19, 'Home Deep Cleaning', 'subcategory-66bf03a4d8c6c.jpg', '1', 'home-deep-cleaning', '[{\"title\":\"Onsite\",\"question\":\"10,9,8,5,4,3,2,1\"},{\"title\":\"OnCompleted\",\"question\":\"10,9,8,5,4,3,2,1\"}]', NULL, NULL, '2024-06-01 12:16:03', '2024-08-16 13:15:40'),
(48, 19, 'Vacant Flat Cleaning', 'subcategory-66bf03be9a20c.jpg', '1', 'vacant-flat-cleaning', '[{\"title\":\"Onsite\",\"question\":\"9\"},{\"title\":\"OnCompleted\",\"question\":\"8\"}]', NULL, NULL, '2024-06-01 12:16:34', '2024-08-16 13:16:06'),
(49, 19, 'Bathroom Cleaning', 'subcategory-66bf03d1efe95.jpg', '1', 'bathroom-cleaning', '[{\"title\":\"Onsite\",\"question\":\"9\"},{\"title\":\"OnCompleted\",\"question\":\"8\"}]', NULL, NULL, '2024-06-01 12:17:07', '2024-08-16 13:16:25'),
(50, 19, 'Kitchen Cleaning', 'subcategory-66bf03e15d361.jpg', '1', 'kitchen-cleaning', '[{\"title\":\"Onsite\",\"question\":\"11,10,9,8\"},{\"title\":\"OnCompleted\",\"question\":\"10,9,8\"}]', NULL, NULL, '2024-06-01 12:17:27', '2024-08-16 13:16:41'),
(51, 19, 'Sofa Cleaning', 'subcategory-665d77378a907.jpg', '1', 'home-cleaning-sofa-cleaning', '[{\"title\":\"Onsite\",\"question\":\"12,11,10,9,8\"},{\"title\":\"OnCompleted\",\"question\":\"11,10,9,8\"}]', NULL, NULL, '2024-06-01 12:17:51', '2024-07-17 18:22:30'),
(53, 18, 'Rodent Control', 'subcategory-66bee0524e22e.png', '1', 'pest-control-rodent-control', '', NULL, NULL, '2024-08-16 10:39:37', '2024-08-16 10:44:58'),
(54, 18, 'Wood Borer', 'subcategory-66bee05a61926.png', '1', 'wood-borer', '', NULL, NULL, '2024-08-16 10:40:08', '2024-08-16 10:45:06'),
(55, 18, 'Mosquito Mesh', 'subcategory-66bee111847d8.png', '1', 'pest-control-mosquito-mesh', '', NULL, NULL, '2024-08-16 10:48:00', '2024-08-16 10:48:09'),
(56, 18, 'Weed Management', 'subcategory-66beee0d5863f.png', '1', 'pest-control-weed-management', '', NULL, NULL, '2024-08-16 10:49:13', '2024-08-16 11:43:33'),
(57, 18, 'Flies Management', 'subcategory-66beee8711012.png', '1', 'pest-control-flies-management', '', NULL, NULL, '2024-08-16 11:45:25', '2024-08-16 11:45:35'),
(58, 19, 'Window Cleaning', 'subcategory-66befa9436d6d.jpg', '1', 'home-cleaning-window-cleaning', '', NULL, NULL, '2024-08-16 12:36:49', '2024-08-16 12:37:00'),
(59, 19, 'Interior Project Completion', 'sub_category-66befbd504852.jpg', '1', 'interior-project-completion', '', NULL, NULL, '2024-08-16 12:42:21', '2024-08-16 12:42:21'),
(60, 19, 'Exterior Cleaning', 'sub_category-66befcb03d716.jpg', '1', 'exterior-cleaning', '', NULL, NULL, '2024-08-16 12:46:00', '2024-08-16 12:46:00'),
(63, 38, 'Shop Now', 'sub_category-66d1e4580454c.jpeg', '1', 'shop-now', '[{\"title\":\"Onsite\",\"question\":\"12,11,10\"},{\"title\":\"OnCompleted\",\"question\":\"11,10,9\"}]', 'sub_category-66d1e45804872.mp4', 'sub_category-66d1e4580476c.jpeg', '2024-08-30 20:55:12', '2024-09-06 10:21:39'),
(64, 18, 'wedfsdf', 'sub_category-66daef8da1e6d.jpeg', '1', 'wedfsdf', NULL, 'NA', 'NA', '2024-09-06 12:03:25', '2024-09-06 12:03:25');

-- --------------------------------------------------------

--
-- Table structure for table `subscribes`
--

CREATE TABLE `subscribes` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subscribes`
--

INSERT INTO `subscribes` (`id`, `email`, `created_at`, `updated_at`) VALUES
(1, 'shoaib.fmp@gmail.com', '2022-06-05 13:33:50', '2022-06-05 13:33:50'),
(2, 'akbarali@gmail.com', '2022-08-09 18:26:11', '2022-08-09 18:26:11'),
(3, 'akbarali@gmail.com', '2022-08-09 18:26:23', '2022-08-09 18:26:23'),
(4, 'shameer.shibu@gmail.com', '2022-08-11 09:56:36', '2022-08-11 09:56:36'),
(5, 'Test at the rate test.com', '2022-08-15 04:20:13', '2022-08-15 04:20:13'),
(6, 'Test 2 yadu', '2022-08-15 04:20:38', '2022-08-15 04:20:38'),
(7, 'kundan.fmp@gmail.com', '2022-08-21 20:08:03', '2022-08-21 20:08:03'),
(8, 'akbarali@gmail.com', '2022-08-25 10:23:34', '2022-08-25 10:23:34'),
(9, 'akbarali@gmail.com', '2022-08-25 10:23:34', '2022-08-25 10:23:34'),
(10, 'akbarali@gmail.com', '2022-08-25 10:23:34', '2022-08-25 10:23:34'),
(11, 'akbarali@gmail.com', '2022-08-25 10:23:35', '2022-08-25 10:23:35'),
(12, 'akbarali@gmail.com', '2022-08-25 10:23:35', '2022-08-25 10:23:35');

-- --------------------------------------------------------

--
-- Table structure for table `terms_conditions`
--

CREATE TABLE `terms_conditions` (
  `id` int(11) NOT NULL,
  `terms_conditions` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `terms_conditions`
--

INSERT INTO `terms_conditions` (`id`, `terms_conditions`, `created_at`, `updated_at`) VALUES
(1, '<p>Welcome to Hommlie! These Terms and Conditions govern your use of our website, services, and any related platforms operated by Hommlie. By accessing or using our services, you agree to comply with these terms. Please read them carefully.</p><p><strong>1. Acceptance of Terms</strong></p><p>By using our services, you agree to these Terms and Conditions and any other policies referenced herein. If you do not agree to these terms, please do not use our services.</p><p><strong>2. Services Provided</strong></p><p>Hommlie offers various home maintenance services, including but not limited to pest control, cleaning services, cockroach control, bird control, and mosquito meshing. The details of each service, including pricing, scope, and duration, will be provided at the time of booking.</p><p><strong>3. User Responsibilities</strong></p><p>When using our services, you agree to:</p><ul><li>Provide accurate and complete information during the booking process.</li><li>Ensure that the service area is accessible and safe for our technicians.</li><li>Follow any specific instructions provided by our team before, during, and after the service.</li><li>Use our services for lawful purposes only.</li></ul><p><strong>4. Booking and Payments</strong></p><ul><li><strong>Booking:</strong> All service bookings must be made through our website, app, or by contacting us directly. Confirmation of booking will be provided via email or SMS.</li><li><strong>Payments:</strong> Payments must be made as per the agreed terms at the time of booking. We accept various payment methods, including credit/debit cards, online transfers, and other methods specified on our website.</li><li><strong>Cancellations:</strong> You may cancel or reschedule a service by providing notice at least 24 hours in advance. Cancellations made less than 24 hours before the scheduled service may incur a cancellation fee.</li></ul><p><strong>5. Service Guarantee</strong></p><p>We strive to provide the highest quality of service. If you are not satisfied with our service, please contact us within 24 hours, and we will make reasonable efforts to address your concerns. However, we do not guarantee that all pests will be eliminated with a single treatment, and follow-up treatments may be required.</p><p><strong>6. Limitations of Liability</strong></p><ul><li><strong>No Warranty:</strong> Hommlie provides services on an \"as-is\" and \"as-available\" basis. We do not warrant that our services will be uninterrupted, error-free, or meet your specific requirements.</li><li><strong>Liability:</strong> To the maximum extent permitted by law, Hommlie is not liable for any indirect, incidental, special, or consequential damages arising out of or related to the use of our services.</li><li><strong>Force Majeure:</strong> Hommlie is not responsible for any delays or failures in service due to events beyond our control, including but not limited to natural disasters, strikes, or technical failures.</li></ul><p><strong>7. Intellectual Property</strong></p><p>All content on the Hommlie website, including text, graphics, logos, and images, is the property of Hommlie and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission.</p><p><strong>8. Privacy</strong></p><p>Your use of our services is subject to our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please review our Privacy Policy for more details.</p><p><strong>9. Changes to Terms</strong></p><p>We may update these Terms and Conditions from time to time. Any changes will be posted on our website with the updated effective date. Your continued use of our services after such changes constitutes your acceptance of the new terms.</p><p><strong>10. Governing Law</strong></p><p>These Terms and Conditions are governed by and construed in accordance with the laws of [Insert Jurisdiction], without regard to its conflict of laws principles. Any disputes arising from these terms shall be resolved in the courts of [Insert Jurisdiction].</p><p><strong>11. Contact Information</strong></p><p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p><p><strong>Hommlie</strong></p><p><strong>hommlieofficial@gmail.com</strong></p>', '2021-11-29 11:12:00', '2024-09-01 06:48:37');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `image` varchar(250) DEFAULT 'profile.png',
  `name` varchar(250) NOT NULL,
  `location` varchar(100) NOT NULL,
  `feedback` longtext NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `image`, `name`, `location`, `feedback`, `status`, `created_at`, `updated_at`) VALUES
(1, 'image66cda1688731a.jpeg', 'test', 'test', 'test', 0, '2024-08-27 15:20:32', '2024-08-30 22:30:31'),
(2, 'image66cda18657103.jpeg', 'test1', 'test1', 'test1', 0, '2024-08-27 15:21:02', '2024-08-30 22:30:29'),
(3, 'image66cda2e8028e8.jpeg', 'Krishna', 'Bangalore', 'Hommlie Services are Really Hygienic and Affordable Prices', 0, '2024-08-27 15:26:56', '2024-08-30 22:30:16'),
(4, '', 'jbhjhb', 'jhgjhg', 'jghhjg', 0, '2024-08-27 15:27:52', '2024-08-30 22:30:08'),
(5, 'profile.png', 'jhbjhb', 'jhjhj', 'jhg', 0, '2024-08-27 15:28:45', '2024-08-30 22:30:25'),
(6, 'profile.png', 'Krishna', 'Gaurav Nagar, Bangalore', 'Hommlie\'s pest control service exceeded my expectations! They were prompt, professional, and eliminated our cockroach problem completely. I highly recommend them for any pest control needs', 1, '2024-08-30 22:32:42', '2024-08-30 22:32:42'),
(7, 'profile.png', 'Aslam', 'BTM Layout, Bangalore', 'I\'ve been using Hommlie\'s cleaning services for months now, and they never disappoint. The team is thorough, friendly, and leaves my home sparkling clean every time', 1, '2024-08-30 22:33:17', '2024-08-30 22:33:17'),
(8, 'profile.png', 'Vishal', 'Kormangala,Bangalore', 'Birds were constantly causing a mess on our property, but thanks to Hommlie\'s bird control service, we haven\'t had any issues since. Their solutions are effective and humane. Highly satisfied!', 1, '2024-08-30 22:33:52', '2024-08-30 22:33:52'),
(9, 'profile.png', 'Pallavi', 'Banshankari, Bangalore', 'Hommlie\'s mosquito meshing service was a game-changer for us. The installation was quick, and the quality is top-notch. Now we can enjoy our evenings without worrying about mosquito bites!', 1, '2024-08-30 22:34:30', '2024-08-30 22:34:30'),
(10, 'profile.png', 'Archana', 'Navodaya Nagar, Bangalore', 'Hommlie did an outstanding job with cockroach control in our kitchen. Their team was knowledgeable, and we haven\'t seen a single cockroach since the treatment. Highly recommend their services!', 1, '2024-08-30 22:35:17', '2024-08-30 22:35:17'),
(11, 'profile.png', 'Archanaa', 'Navodaya Nagar, Bangalore', 'Hommlie did an outstanding job with cockroach control in our kitchen. Their team was knowledgeable, and we haven\'t seen a single cockroach since the treatment. Highly recommend their services!', 1, '2024-08-31 09:52:10', '2024-08-31 09:52:10'),
(12, 'profile.png', 'Bipasha', 'Bangalore', 'Hommlie Services are really affordable and hommlie partners too prompt', 1, '2024-08-31 09:52:53', '2024-08-31 09:52:53');

-- --------------------------------------------------------

--
-- Table structure for table `timeslots`
--

CREATE TABLE `timeslots` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `starttime` varchar(50) NOT NULL,
  `endtime` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `timeslots`
--

INSERT INTO `timeslots` (`id`, `name`, `starttime`, `endtime`, `status`, `created_at`, `updated_at`) VALUES
(3, '', '12:33', '12:34', 0, '2024-06-14 07:03:24', '2024-08-27 15:27:01'),
(4, '', '14:33', '12:36', 0, '2024-06-14 07:03:52', '2024-06-14 07:18:16'),
(5, '', '15:36', '18:36', 1, '2024-06-14 07:06:25', '2024-06-14 07:18:07'),
(6, '', '15:56', '14:56', 1, '2024-06-14 10:29:52', '2024-06-14 10:29:52'),
(7, '', '09:10', '09:12', 1, '2024-06-20 05:39:26', '2024-07-09 12:41:56'),
(8, '', '16:46', '23:49', 1, '2024-06-25 10:14:37', '2024-06-25 10:15:06'),
(9, '', '09:01', '19:00', 1, '2024-06-26 06:24:46', '2024-06-26 06:24:46'),
(10, 'test', '16:57', '18:57', 1, '2024-07-01 11:25:12', '2024-07-01 11:25:12'),
(11, 'Fullday', '09:00', '23:50', 1, '2024-07-08 15:21:50', '2024-07-10 17:12:03'),
(12, 'Full Time', '00:00', '23:00', 1, '2024-07-11 01:06:45', '2024-07-11 01:06:45'),
(13, 'day', '16:02', '20:02', 1, '2024-07-17 18:00:24', '2024-07-17 18:00:24'),
(14, 'sdasa1121', '17:41', '19:42', 1, '2024-08-31 09:08:37', '2024-08-31 09:12:01'),
(15, 'dfsafsdv1', '03:23', '18:24', 1, '2024-08-31 09:51:15', '2024-08-31 09:51:57');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `order_number` varchar(191) DEFAULT NULL,
  `wallet` varchar(191) NOT NULL,
  `payment_id` text DEFAULT NULL,
  `transaction_type` int(11) DEFAULT NULL COMMENT '1 = Cancelled Order, 2 = Order Confirmed, 3 = Referral, 4 = Add Money, 5 = Order return',
  `username` text DEFAULT NULL,
  `type` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `order_id`, `order_number`, `wallet`, `payment_id`, `transaction_type`, `username`, `type`, `created_at`, `updated_at`) VALUES
(1, 7, NULL, NULL, '122', 'pay_JcNTIF67KG6V5O', 4, 'Kundan', '3', '2022-06-01 21:24:00', '2022-06-01 21:24:00'),
(2, 8, NULL, NULL, '15806', 'pay_JchXJf7JN7wNWh', 4, 'Azeem', '3', '2022-06-02 17:01:36', '2022-06-02 17:01:36'),
(3, 8, 11, 'VGGZLNTYJS', '1206', NULL, 2, NULL, '', '2022-06-02 17:15:07', '2022-06-02 17:15:07'),
(4, 8, 21, 'YFSEJOAOZD', '1806', NULL, 2, NULL, '', '2022-06-04 16:36:06', '2022-06-04 16:36:06'),
(5, 8, 26, 'X45VCR1D7S', '1600', NULL, 2, NULL, '', '2022-06-06 21:56:37', '2022-06-06 21:56:37'),
(6, 8, 27, 'WYOMH7L6Q8', '600', NULL, 2, NULL, '', '2022-06-08 23:27:49', '2022-06-08 23:27:49'),
(7, 8, 28, 'SHCRS8YQE2', '600', NULL, 2, NULL, '', '2022-06-09 15:13:53', '2022-06-09 15:13:53'),
(8, 8, 29, 'GDCQ36QGXT', '8116.15', NULL, 2, NULL, '', '2022-06-09 16:16:08', '2022-06-09 16:16:08'),
(9, 8, 29, 'GDCQ36QGXT', '8116.15', NULL, 1, NULL, '', '2022-06-09 10:46:29', '2022-06-09 10:46:29'),
(10, 8, 29, 'GDCQ36QGXT', '8116.15', NULL, 1, NULL, '', '2022-06-09 10:46:37', '2022-06-09 10:46:37'),
(11, 8, 39, 'EBOG3OHSRT', '169', NULL, 5, NULL, '', '2022-06-18 14:05:38', '2022-06-18 14:05:38'),
(12, 31, 59, 'D5NM38ENG4', '217.35', NULL, 5, NULL, '', '2022-08-06 16:15:44', '2022-08-06 16:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', 'admin@admin.com', NULL, '$2y$10$imU.Hdz7VauIT3LIMCMbsOXvaaTQg6luVqkhfkBcsUd.SJW2XSRKO', 'JPtRIu8lOqwz48hJrqMClN7iNAqxAZiRVIM0LqpEVRkPKAHJV8IUQqG6OpVs', '2019-04-15 13:43:32', '2019-04-15 13:43:32', NULL),
(2, 'vendor', 'vendor@vendor.com', NULL, '$2y$10$E7yS4eDZaS1dz14HtOXAIumLFmju0Lb8l0o.A3.TXx0iiTWWoLcWW', NULL, '2024-07-30 00:31:45', '2024-07-30 00:32:05', NULL),
(3, 'support', 'support@hommlie.com', NULL, '$2y$10$GtN./fsJJVOIFBV7g8Iom.EY3coaNqBMTVq4V3Mr6ri5geTZ8olmq', '6KXgXNgjKHsfY3UPMcWDYaAqnOfkstLqHMvOQ2Rsd2TdJhg65VckGpdwV85W', '2024-09-02 06:38:28', '2024-09-02 06:38:28', NULL),
(4, 'test', 'test@test.com', NULL, '$2y$10$KBB.vJm6DNDXjwte0QoPvuxMK.EM1xJrV2vZi6URmexQBhx4bz5C.', NULL, '2024-09-06 10:28:32', '2024-09-06 10:28:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `variations`
--

CREATE TABLE `variations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `attribute_id` int(11) DEFAULT NULL,
  `sku_id` varchar(20) DEFAULT NULL,
  `price` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discounted_variation_price` varchar(191) DEFAULT NULL,
  `variation` varchar(191) DEFAULT NULL,
  `variation_interval` varchar(50) DEFAULT NULL,
  `variation_times` int(11) DEFAULT NULL,
  `qty` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `variations`
--

INSERT INTO `variations` (`id`, `product_id`, `attribute_id`, `sku_id`, `price`, `description`, `discounted_variation_price`, `variation`, `variation_interval`, `variation_times`, `qty`, `created_at`, `updated_at`) VALUES
(1, 2, NULL, '', '1200', NULL, '59', 'Red', NULL, NULL, '59', '2022-05-30 16:44:43', '2022-05-31 07:08:06'),
(2, 2, NULL, '', '1200', NULL, '50', 'Black', NULL, NULL, '40', '2022-05-30 16:46:14', '2022-05-31 07:08:06'),
(3, 2, NULL, '', '1200', NULL, '50', 'Green', NULL, NULL, '50', '2022-05-30 16:49:11', '2022-05-31 07:08:06'),
(7, 2, NULL, '', '1200', NULL, '50', 'Yellow', NULL, NULL, '50', '2022-05-30 16:50:44', '2022-05-31 07:08:06'),
(8, 6, NULL, '', '7663', NULL, '200', 'S', NULL, NULL, '10', '2022-06-02 12:03:52', '2022-06-02 12:03:52'),
(9, 6, NULL, '', '7663', NULL, '200', 'M', NULL, NULL, '10', '2022-06-02 12:03:52', '2022-06-02 12:03:52'),
(10, 6, NULL, '', '7663', NULL, '200', 'L', NULL, NULL, '10', '2022-06-02 12:03:52', '2022-06-02 12:03:52'),
(13, 9, NULL, '', '167', NULL, '269', '52', NULL, NULL, '4', '2022-06-11 09:53:22', '2022-06-11 18:06:33'),
(14, 9, NULL, '', '167', NULL, '269', '54', NULL, NULL, '4', '2022-06-11 09:53:22', '2022-06-11 18:06:33'),
(15, 9, NULL, '', '167', NULL, '269', '56', NULL, NULL, '4', '2022-06-11 09:53:22', '2022-06-11 18:06:33'),
(17, 9, NULL, '', '167', NULL, '269', '58', NULL, NULL, '4', '2022-06-11 09:53:22', '2022-06-11 18:06:33'),
(18, 9, NULL, '', '167', NULL, '269', '60', NULL, NULL, '4', '2022-06-11 09:53:22', '2022-06-11 18:06:33'),
(19, 10, NULL, '', '160', NULL, '279', '52', NULL, NULL, '4', '2022-06-11 14:23:25', '2022-06-11 18:10:16'),
(20, 10, NULL, '', '160', NULL, '279', '54', NULL, NULL, '4', '2022-06-11 14:23:25', '2022-06-11 18:10:16'),
(21, 10, NULL, '', '160', NULL, '279', '56', NULL, NULL, '4', '2022-06-11 14:23:25', '2022-06-11 18:10:16'),
(22, 10, NULL, '', '160', NULL, '279', '58', NULL, NULL, '4', '2022-06-11 14:23:25', '2022-06-11 18:10:16'),
(23, 10, NULL, '', '160', NULL, '279', '60', NULL, NULL, '4', '2022-06-11 14:23:25', '2022-06-11 18:10:16'),
(24, 11, NULL, '', '169', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 15:12:40', '2022-06-21 16:55:13'),
(25, 11, NULL, '', '169', NULL, '299', '54', NULL, NULL, '4', '2022-06-11 15:12:40', '2022-06-21 16:55:13'),
(26, 11, NULL, '', '169', NULL, '299', '56', NULL, NULL, '4', '2022-06-11 15:12:40', '2022-06-21 16:55:13'),
(27, 11, NULL, '', '169', NULL, '299', '58', NULL, NULL, '4', '2022-06-11 15:12:40', '2022-06-21 16:55:13'),
(28, 11, NULL, '', '169', NULL, '299', '60', NULL, NULL, '4', '2022-06-11 15:12:40', '2022-06-21 16:55:13'),
(29, 12, NULL, '', '169', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 15:47:15', '2022-06-21 16:52:53'),
(30, 12, NULL, '', '169', NULL, '299', '54', NULL, NULL, '4', '2022-06-11 15:47:15', '2022-06-21 16:52:53'),
(31, 12, NULL, '', '169', NULL, '299', '56', NULL, NULL, '4', '2022-06-11 15:47:15', '2022-06-21 16:52:53'),
(32, 12, NULL, '', '169', NULL, '299', '58', NULL, NULL, '4', '2022-06-11 15:47:15', '2022-06-21 16:52:53'),
(33, 12, NULL, '', '169', NULL, '299', '60', NULL, NULL, '4', '2022-06-11 15:47:15', '2022-06-21 16:52:53'),
(34, 13, NULL, '', '169', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 16:37:48', '2022-06-21 16:49:15'),
(35, 13, NULL, '', '169', NULL, '299', '54', NULL, NULL, '4', '2022-06-11 16:37:48', '2022-06-21 16:49:15'),
(36, 13, NULL, '', '169', NULL, '299', '56', NULL, NULL, '4', '2022-06-11 16:37:48', '2022-06-21 16:49:15'),
(37, 13, NULL, '', '169', NULL, '299', '58', NULL, NULL, '4', '2022-06-11 16:37:48', '2022-06-21 16:49:15'),
(38, 13, NULL, '', '169', NULL, '299', '60', NULL, NULL, '4', '2022-06-11 16:37:48', '2022-06-21 16:49:15'),
(39, 14, NULL, '', '169', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 16:42:20', '2022-06-21 16:46:29'),
(40, 14, NULL, '', '169', NULL, '299', '54', NULL, NULL, '4', '2022-06-11 16:42:20', '2022-06-21 16:46:29'),
(41, 14, NULL, '', '169', NULL, '299', '56', NULL, NULL, '4', '2022-06-11 16:42:20', '2022-06-21 16:46:29'),
(42, 14, NULL, '', '169', NULL, '299', '58', NULL, NULL, '4', '2022-06-11 16:42:20', '2022-06-21 16:46:29'),
(43, 14, NULL, '', '169', NULL, '299', '60', NULL, NULL, '4', '2022-06-11 16:42:20', '2022-06-21 16:46:29'),
(44, 15, NULL, '', '169', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 16:46:53', '2022-06-21 15:48:35'),
(45, 15, NULL, '', '169', NULL, '299', '54', NULL, NULL, '4', '2022-06-11 16:46:53', '2022-06-21 15:48:35'),
(46, 15, NULL, '', '169', NULL, '299', '56', NULL, NULL, '4', '2022-06-11 16:46:53', '2022-06-21 15:48:35'),
(47, 15, NULL, '', '169', NULL, '299', '58', NULL, NULL, '4', '2022-06-11 16:46:53', '2022-06-21 15:48:35'),
(48, 15, NULL, '', '169', NULL, '299', '60', NULL, NULL, '4', '2022-06-11 16:46:53', '2022-06-21 15:48:35'),
(49, 16, NULL, '', '299', NULL, '169', '52', NULL, NULL, '4', '2022-06-11 16:47:02', '2022-06-21 15:45:14'),
(50, 16, NULL, '', '299', NULL, '169', '54', NULL, NULL, '4', '2022-06-11 16:47:02', '2022-06-21 15:45:14'),
(51, 16, NULL, '', '299', NULL, '169', '56', NULL, NULL, '4', '2022-06-11 16:47:02', '2022-06-21 15:45:14'),
(52, 16, NULL, '', '299', NULL, '169', '58', NULL, NULL, '4', '2022-06-11 16:47:02', '2022-06-21 15:45:14'),
(53, 16, NULL, '', '299', NULL, '169', '60', NULL, NULL, '4', '2022-06-11 16:47:02', '2022-06-21 15:45:14'),
(54, 17, NULL, '', '169', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 16:53:35', '2022-06-11 17:58:32'),
(55, 17, NULL, '', '169', NULL, '299', '54', NULL, NULL, '4', '2022-06-11 16:53:35', '2022-06-11 17:58:32'),
(56, 17, NULL, '', '169', NULL, '299', '56', NULL, NULL, '4', '2022-06-11 16:53:35', '2022-06-11 17:58:32'),
(57, 17, NULL, '', '169', NULL, '299', '58', NULL, NULL, '4', '2022-06-11 16:53:35', '2022-06-11 17:58:32'),
(58, 17, NULL, '', '169', NULL, '299', '60', NULL, NULL, '4', '2022-06-11 16:53:35', '2022-06-11 17:58:32'),
(59, 18, NULL, '', '179', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 16:59:08', '2022-06-11 17:57:44'),
(60, 18, NULL, '', '179', NULL, '299', '54', NULL, NULL, '4', '2022-06-11 16:59:08', '2022-06-11 17:57:44'),
(61, 18, NULL, '', '179', NULL, '299', '56', NULL, NULL, '4', '2022-06-11 16:59:08', '2022-06-11 17:57:44'),
(62, 18, NULL, '', '179', NULL, '299', '58', NULL, NULL, '4', '2022-06-11 16:59:08', '2022-06-11 17:57:44'),
(63, 18, NULL, '', '179', NULL, '299', '60', NULL, NULL, '4', '2022-06-11 16:59:08', '2022-06-11 17:57:44'),
(64, 19, NULL, '', '169', NULL, '279', '52', NULL, NULL, '4', '2022-06-11 17:02:06', '2022-06-11 17:56:54'),
(65, 19, NULL, '', '169', NULL, '279', '54', NULL, NULL, '4', '2022-06-11 17:02:06', '2022-06-11 17:56:54'),
(66, 19, NULL, '', '169', NULL, '279', '56', NULL, NULL, '4', '2022-06-11 17:02:06', '2022-06-11 17:56:54'),
(67, 19, NULL, '', '169', NULL, '279', '58', NULL, NULL, '4', '2022-06-11 17:02:06', '2022-06-11 17:56:54'),
(68, 19, NULL, '', '169', NULL, '279', '60', NULL, NULL, '4', '2022-06-11 17:02:06', '2022-06-11 17:56:54'),
(69, 20, NULL, '', '169', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 17:10:06', '2022-06-11 17:53:26'),
(70, 20, NULL, '', '169', NULL, '299', '54', NULL, NULL, '4', '2022-06-11 17:10:06', '2022-06-11 17:53:26'),
(71, 20, NULL, '', '169', NULL, '299', '56', NULL, NULL, '4', '2022-06-11 17:10:06', '2022-06-11 17:53:26'),
(72, 20, NULL, '', '169', NULL, '299', '58', NULL, NULL, '4', '2022-06-11 17:10:06', '2022-06-11 17:53:26'),
(73, 20, NULL, '', '169', NULL, '299', '60', NULL, NULL, '4', '2022-06-11 17:10:06', '2022-06-11 17:53:26'),
(74, 21, NULL, '', '399', NULL, '650', '52', NULL, NULL, '4', '2022-06-11 17:13:39', '2022-06-20 18:13:17'),
(75, 21, NULL, '', '399', NULL, '650', '54', NULL, NULL, '4', '2022-06-11 17:13:39', '2022-06-20 18:13:17'),
(76, 21, NULL, '', '399', NULL, '650', '56', NULL, NULL, '4', '2022-06-11 17:13:39', '2022-06-20 18:13:17'),
(77, 21, NULL, '', '399', NULL, '650', '58', NULL, NULL, '4', '2022-06-11 17:13:39', '2022-06-20 18:13:17'),
(78, 21, NULL, '', '399', NULL, '650', '60', NULL, NULL, '4', '2022-06-11 17:13:39', '2022-06-20 18:13:17'),
(79, 22, NULL, '', '179', NULL, '299', '52', NULL, NULL, '4', '2022-06-11 17:36:49', '2022-06-11 17:52:03'),
(80, 22, NULL, '', '299', NULL, '179', '54', NULL, NULL, '4', '2022-06-11 17:36:49', '2022-06-11 17:52:03'),
(81, 22, NULL, '', '299', NULL, '179', '56', NULL, NULL, '4', '2022-06-11 17:36:49', '2022-06-11 17:52:03'),
(82, 22, NULL, '', '299', NULL, '179', '58', NULL, NULL, '4', '2022-06-11 17:36:49', '2022-06-11 17:52:03'),
(83, 22, NULL, '', '299', NULL, '179', '60', NULL, NULL, '4', '2022-06-11 17:36:49', '2022-06-11 17:52:03'),
(84, 27, NULL, '', '399', NULL, '550', '52', NULL, NULL, '1', '2022-06-21 18:18:09', '2022-06-21 18:22:16'),
(85, 28, NULL, '', '449', NULL, '650', '52', NULL, NULL, '1', '2022-06-22 15:37:19', '2022-06-22 15:42:31'),
(86, 29, NULL, '', '429', NULL, '599', '52', NULL, NULL, '1', '2022-06-22 15:48:07', '2022-06-27 02:14:55'),
(94, 30, NULL, '15692', '1400', NULL, '1200', '56', NULL, NULL, '10', '2022-06-27 20:11:42', '2022-06-27 20:14:28'),
(95, 30, NULL, '15694', '1300', NULL, '1100', '57', NULL, NULL, '20', '2022-06-27 20:11:42', '2022-06-27 20:14:28'),
(96, 30, NULL, '15696', '1200', NULL, '1000', '58', NULL, NULL, '30', '2022-06-27 20:13:45', '2022-06-27 20:14:28'),
(97, 31, NULL, '15693', '800', NULL, '700', '20', NULL, NULL, '10', '2022-06-27 20:19:48', '2022-06-27 20:21:27'),
(98, 31, NULL, '15694', '800', NULL, '600', '30', NULL, NULL, '10', '2022-06-27 20:19:48', '2022-06-27 20:21:27'),
(99, 32, NULL, '15693', '1400', NULL, '1200', '56', NULL, NULL, '10', '2022-06-27 20:31:16', '2022-06-27 20:31:42'),
(100, 32, NULL, '15694', '800', NULL, '700', '20', NULL, NULL, '10', '2022-06-27 20:31:16', '2022-06-27 20:31:42'),
(101, 33, NULL, '15692', '1400', NULL, '1200', '56', NULL, NULL, '10', '2022-06-27 20:41:11', '2022-06-27 20:42:30'),
(102, 33, NULL, '15694', '800', NULL, '700', '20', NULL, NULL, '20', '2022-06-27 20:41:11', '2022-06-27 20:42:30'),
(103, 34, NULL, '', '1400', NULL, '1200', '56', NULL, NULL, '10', '2022-06-28 10:57:27', '2022-06-28 10:57:27'),
(104, 34, NULL, '', '800', NULL, '700', '57', NULL, NULL, '10', '2022-06-28 10:57:27', '2022-06-28 10:57:27'),
(105, 35, NULL, '15692', '1400', NULL, '1200', '56', NULL, NULL, '10', '2022-06-28 10:59:22', '2022-06-28 10:59:22'),
(106, 35, NULL, '15693', '800', NULL, '700', '57', NULL, NULL, '10', '2022-06-28 10:59:22', '2022-06-28 10:59:22'),
(107, 36, NULL, '14301', '379', NULL, '180', '52', NULL, NULL, '2', '2022-07-03 09:33:55', '2022-07-03 09:33:55'),
(108, 36, NULL, '14302', '379', NULL, '180', '54', NULL, NULL, '2', '2022-07-03 09:33:55', '2022-07-03 09:33:55'),
(109, 36, NULL, '14303', '379', NULL, '180', '56', NULL, NULL, '1', '2022-07-03 09:33:55', '2022-07-03 09:33:55'),
(110, 36, NULL, '14304', '379', NULL, '180', '58', NULL, NULL, '1', '2022-07-03 09:33:55', '2022-07-03 09:33:55'),
(111, 36, NULL, '14305', '379', NULL, '180', '60', NULL, NULL, '2', '2022-07-03 09:33:55', '2022-07-03 09:33:55'),
(112, 38, NULL, '14301', '189', NULL, '379', '52', NULL, NULL, '2', '2022-07-07 11:05:12', '2022-07-07 11:59:24'),
(113, 38, NULL, '14302', '189', NULL, '379', '54', NULL, NULL, '1', '2022-07-07 11:05:12', '2022-07-07 11:59:24'),
(114, 38, NULL, '14303', '189', NULL, '379', '56', NULL, NULL, '1', '2022-07-07 11:05:12', '2022-07-07 11:59:24'),
(115, 38, NULL, '14304', '189', NULL, '379', '58', NULL, NULL, '1', '2022-07-07 11:05:12', '2022-07-07 11:59:24'),
(116, 38, NULL, '14305', '189', NULL, '379', '60', NULL, NULL, '1', '2022-07-07 11:05:13', '2022-07-07 11:59:24'),
(117, 39, NULL, '14306', '179', NULL, '379', '52', NULL, NULL, '1', '2022-07-07 11:25:53', '2022-08-24 18:00:57'),
(118, 39, NULL, '14308', '179', NULL, '379', '56', NULL, NULL, '2', '2022-07-07 11:25:53', '2022-08-24 18:00:57'),
(119, 39, NULL, '14309', '179', NULL, '379', '58', NULL, NULL, '1', '2022-07-07 11:25:53', '2022-08-24 18:00:57'),
(120, 39, NULL, '14310', '179', NULL, '379', '60', NULL, NULL, '1', '2022-07-07 11:25:53', '2022-08-24 18:00:57'),
(121, 40, NULL, '14311', '179', NULL, '379', '52', NULL, NULL, '2', '2022-07-07 11:30:57', '2022-08-24 18:00:41'),
(122, 40, NULL, '14312', '179', NULL, '379', '54', NULL, NULL, '2', '2022-07-07 11:30:57', '2022-08-24 18:00:41'),
(124, 41, NULL, '14328', '179', NULL, '279', '54', NULL, NULL, '3', '2022-07-07 11:37:06', '2022-08-24 18:31:09'),
(125, 41, NULL, '14329', '179', NULL, '279', '56', NULL, NULL, '3', '2022-07-07 11:37:06', '2022-08-24 18:31:09'),
(127, 41, NULL, '14331', '179', NULL, '279', '60', NULL, NULL, '2', '2022-07-07 11:37:06', '2022-08-24 18:31:09'),
(130, 42, NULL, '14339', '179', NULL, '279', '56', NULL, NULL, '2', '2022-07-07 11:45:40', '2022-08-24 18:30:54'),
(133, 43, NULL, '14377', '189', NULL, '329', '52', NULL, NULL, '2', '2022-07-07 11:57:53', '2022-08-24 18:20:45'),
(134, 43, NULL, '14378', '189', NULL, '329', '54', NULL, NULL, '2', '2022-07-07 11:57:53', '2022-08-24 18:20:45'),
(135, 43, NULL, '14379', '189', NULL, '329', '56', NULL, NULL, '2', '2022-07-07 11:57:53', '2022-08-24 18:20:45'),
(136, 43, NULL, '14380', '189', NULL, '329', '58', NULL, NULL, '2', '2022-07-07 11:57:54', '2022-08-24 18:20:45'),
(137, 43, NULL, '14381', '189', NULL, '329', '60', NULL, NULL, '2', '2022-07-07 11:57:54', '2022-08-24 18:20:45'),
(138, 44, NULL, '14388', '189', NULL, '379', '54', NULL, NULL, '1', '2022-07-07 12:09:21', '2022-08-24 18:20:28'),
(139, 45, NULL, '14393', '179', NULL, '379', '54', NULL, NULL, '2', '2022-07-07 12:14:12', '2022-08-24 18:20:14'),
(140, 46, NULL, '14407', '179', NULL, '379', '52', NULL, NULL, '1', '2022-07-07 12:47:30', '2022-08-24 18:34:44'),
(141, 46, NULL, '14408', '179', NULL, '379', '54', NULL, NULL, '3', '2022-07-07 12:47:30', '2022-08-24 18:34:44'),
(142, 46, NULL, '14409', '179', NULL, '379', '58', NULL, NULL, '1', '2022-07-07 12:47:30', '2022-08-24 18:34:44'),
(143, 47, NULL, '14412', '179', NULL, '379', '52', NULL, NULL, '1', '2022-07-07 12:56:01', '2022-08-24 18:25:23'),
(144, 47, NULL, '14413', '179', NULL, '379', '54', NULL, NULL, '3', '2022-07-07 12:56:01', '2022-08-24 18:25:23'),
(145, 47, NULL, '14414', '179', NULL, '379', '56', NULL, NULL, '3', '2022-07-07 12:56:01', '2022-08-24 18:25:23'),
(146, 47, NULL, '14415', '179', NULL, '379', '58', NULL, NULL, '2', '2022-07-07 12:56:01', '2022-08-24 18:25:23'),
(147, 47, NULL, '14416', '179', NULL, '379', '60', NULL, NULL, '3', '2022-07-07 12:56:01', '2022-08-24 18:25:23'),
(148, 48, NULL, '14417', '179', NULL, '379', '52', NULL, NULL, '2', '2022-07-07 13:02:14', '2022-08-24 18:06:14'),
(149, 48, NULL, '14418', '179', NULL, '379', '54', NULL, NULL, '2', '2022-07-07 13:02:14', '2022-08-24 18:06:14'),
(150, 48, NULL, '14419', '179', NULL, '379', '56', NULL, NULL, '2', '2022-07-07 13:02:14', '2022-08-24 18:06:14'),
(151, 48, NULL, '14420', '179', NULL, '379', '58', NULL, NULL, '2', '2022-07-07 13:02:14', '2022-08-24 18:06:14'),
(152, 49, NULL, '14422', '189', NULL, '379', '52', NULL, NULL, '1', '2022-07-07 13:09:14', '2022-07-07 13:11:34'),
(153, 49, NULL, '14424', '189', NULL, '379', '56', NULL, NULL, '2', '2022-07-07 13:09:14', '2022-07-07 13:11:34'),
(154, 49, NULL, '14425', '189', NULL, '379', '58', NULL, NULL, '2', '2022-07-07 13:09:14', '2022-07-07 13:11:34'),
(155, 49, NULL, '14426', '189', NULL, '379', '60', NULL, NULL, '1', '2022-07-07 13:09:14', '2022-07-07 13:11:34'),
(156, 50, NULL, '14427', '179', NULL, '379', '52', NULL, NULL, '2', '2022-07-07 13:17:53', '2022-08-24 18:06:03'),
(157, 51, NULL, '14432', '169', NULL, '279', '52', NULL, NULL, '1', '2022-07-07 13:24:21', '2022-08-24 18:07:06'),
(158, 51, NULL, '14433', '169', NULL, '279', '54', NULL, NULL, '2', '2022-07-07 13:24:21', '2022-08-24 18:07:06'),
(159, 51, NULL, '14434', '169', NULL, '279', '56', NULL, NULL, '2', '2022-07-07 13:24:21', '2022-08-24 18:07:06'),
(160, 51, NULL, '14435', '169', NULL, '279', '58', NULL, NULL, '1', '2022-07-07 13:24:21', '2022-08-24 18:07:06'),
(161, 52, NULL, '14432', '169', NULL, '279', '52', NULL, NULL, '2', '2022-07-13 08:17:48', '2022-08-24 18:06:52'),
(162, 52, NULL, '14433', '169', NULL, '279', '54', NULL, NULL, '1', '2022-07-13 08:17:48', '2022-08-24 18:06:52'),
(163, 52, NULL, '14434', '169', NULL, '279', '56', NULL, NULL, '1', '2022-07-13 08:17:48', '2022-08-24 18:06:52'),
(164, 52, NULL, '14435', '169', NULL, '279', '58', NULL, NULL, '1', '2022-07-13 08:17:48', '2022-08-24 18:06:52'),
(165, 53, NULL, '14442', '169', NULL, '279', '52', NULL, NULL, '1', '2022-07-13 08:25:21', '2022-08-24 18:06:38'),
(166, 53, NULL, '14443', '169', NULL, '279', '54', NULL, NULL, '2', '2022-07-13 08:25:21', '2022-08-24 18:06:38'),
(167, 53, NULL, '14444', '169', NULL, '279', '56', NULL, NULL, '2', '2022-07-13 08:25:21', '2022-08-24 18:06:38'),
(168, 54, NULL, '14447', '199', NULL, '399', '52', NULL, NULL, '2', '2022-07-13 08:35:46', '2022-08-24 18:19:51'),
(169, 54, NULL, '14448', '199', NULL, '399', '54', NULL, NULL, '2', '2022-07-13 08:35:46', '2022-08-24 18:19:51'),
(170, 54, NULL, '14449', '199', NULL, '399', '56', NULL, NULL, '2', '2022-07-13 08:35:46', '2022-08-24 18:19:51'),
(171, 54, NULL, '14450', '199', NULL, '399', '58', NULL, NULL, '2', '2022-07-13 08:35:46', '2022-08-24 18:19:51'),
(172, 55, NULL, '14452', '199', NULL, '399', '52', NULL, NULL, '1', '2022-07-13 08:41:14', '2022-08-24 18:19:38'),
(173, 55, NULL, '14453', '199', NULL, '399', '54', NULL, NULL, '2', '2022-07-13 08:41:14', '2022-08-24 18:19:38'),
(174, 55, NULL, '14454', '199', NULL, '399', '56', NULL, NULL, '2', '2022-07-13 08:41:14', '2022-08-24 18:19:38'),
(175, 55, NULL, '14455', '199', NULL, '399', '58', NULL, NULL, '1', '2022-07-13 08:41:14', '2022-08-24 18:19:38'),
(176, 55, NULL, '14456', '199', NULL, '399', '60', NULL, NULL, '1', '2022-07-13 08:41:14', '2022-08-24 18:19:38'),
(177, 56, NULL, '14457', '199', NULL, '399', '52', NULL, NULL, '1', '2022-07-13 08:46:31', '2022-08-24 18:19:27'),
(178, 56, NULL, '14458', '199', NULL, '399', '54', NULL, NULL, '2', '2022-07-13 08:46:31', '2022-08-24 18:19:27'),
(179, 56, NULL, '14459', '199', NULL, '399', '56', NULL, NULL, '2', '2022-07-13 08:46:31', '2022-08-24 18:19:27'),
(180, 56, NULL, '14460', '199', NULL, '399', '58', NULL, NULL, '2', '2022-07-13 08:46:31', '2022-08-24 18:19:27'),
(181, 56, NULL, '14461', '199', NULL, '399', '60', NULL, NULL, '1', '2022-07-13 08:46:31', '2022-08-24 18:19:27'),
(182, 57, NULL, '14462', '189', NULL, '329', '52', NULL, NULL, '1', '2022-07-13 08:53:41', '2022-08-24 18:12:57'),
(183, 57, NULL, '14463', '189', NULL, '329', '54', NULL, NULL, '1', '2022-07-13 08:53:41', '2022-08-24 18:12:57'),
(184, 57, NULL, '14464', '189', NULL, '329', '56', NULL, NULL, '1', '2022-07-13 08:53:41', '2022-08-24 18:12:57'),
(185, 57, NULL, '14465', '189', NULL, '329', '58', NULL, NULL, '1', '2022-07-13 08:53:41', '2022-08-24 18:12:57'),
(186, 57, NULL, '14466', '189', NULL, '329', '60', NULL, NULL, '1', '2022-07-13 08:53:41', '2022-08-24 18:12:57'),
(187, 58, NULL, '14477', '189', NULL, '329', '52', NULL, NULL, '1', '2022-07-13 08:57:43', '2022-08-24 18:09:51'),
(188, 58, NULL, '14478', '189', NULL, '329', '54', NULL, NULL, '1', '2022-07-13 08:57:43', '2022-08-24 18:09:51'),
(189, 58, NULL, '14479', '189', NULL, '329', '56', NULL, NULL, '1', '2022-07-13 08:57:43', '2022-08-24 18:09:51'),
(190, 58, NULL, '14480', '189', NULL, '329', '58', NULL, NULL, '1', '2022-07-13 08:57:43', '2022-08-24 18:09:51'),
(191, 59, NULL, '14472', '189', NULL, '329', '52', NULL, NULL, '1', '2022-07-13 09:02:27', '2022-08-24 18:09:37'),
(192, 59, NULL, '14473', '189', NULL, '329', '54', NULL, NULL, '1', '2022-07-13 09:02:27', '2022-08-24 18:09:37'),
(193, 59, NULL, '14474', '189', NULL, '329', '56', NULL, NULL, '1', '2022-07-13 09:02:27', '2022-08-24 18:09:37'),
(194, 59, NULL, '14475', '189', NULL, '329', '58', NULL, NULL, '1', '2022-07-13 09:02:27', '2022-08-24 18:09:37'),
(195, 59, NULL, '14476', '189', NULL, '329', '60', NULL, NULL, '1', '2022-07-13 09:02:27', '2022-08-24 18:09:37'),
(196, 60, NULL, '14482', '179', NULL, '389', '52', NULL, NULL, '2', '2022-07-13 09:09:33', '2022-08-24 18:19:12'),
(197, 60, NULL, '14483', '179', NULL, '389', '54', NULL, NULL, '2', '2022-07-13 09:09:33', '2022-08-24 18:19:12'),
(198, 60, NULL, '14484', '179', NULL, '389', '56', NULL, NULL, '2', '2022-07-13 09:09:33', '2022-08-24 18:19:12'),
(199, 60, NULL, '14485', '179', NULL, '389', '58', NULL, NULL, '2', '2022-07-13 09:09:33', '2022-08-24 18:19:12'),
(200, 61, NULL, '14487', '199', NULL, '399', '52', NULL, NULL, '2', '2022-07-13 09:15:50', '2022-08-24 18:18:59'),
(201, 61, NULL, '14488', '199', NULL, '399', '54', NULL, NULL, '2', '2022-07-13 09:15:50', '2022-08-24 18:18:59'),
(202, 61, NULL, '14489', '199', NULL, '399', '56', NULL, NULL, '2', '2022-07-13 09:15:50', '2022-08-24 18:18:59'),
(203, 61, NULL, '14490', '199', NULL, '399', '58', NULL, NULL, '2', '2022-07-13 09:15:50', '2022-08-24 18:18:59'),
(204, 62, NULL, '14502', '189', NULL, '329', '52', NULL, NULL, '1', '2022-07-13 09:20:13', '2022-08-24 18:24:04'),
(205, 62, NULL, '14503', '189', NULL, '329', '54', NULL, NULL, '1', '2022-07-13 09:20:13', '2022-08-24 18:24:04'),
(206, 62, NULL, '14504', '189', NULL, '329', '56', NULL, NULL, '1', '2022-07-13 09:20:13', '2022-08-24 18:24:04'),
(207, 62, NULL, '14505', '189', NULL, '329', '58', NULL, NULL, '1', '2022-07-13 09:20:13', '2022-08-24 18:24:04'),
(208, 62, NULL, '14506', '189', NULL, '329', '60', NULL, NULL, '1', '2022-07-13 09:20:13', '2022-08-24 18:24:04'),
(209, 63, NULL, '14508', '189', NULL, '329', '52', NULL, NULL, '2', '2022-07-13 09:28:25', '2022-08-24 18:23:51'),
(210, 63, NULL, '14509', '189', NULL, '329', '54', NULL, NULL, '2', '2022-07-13 09:28:25', '2022-08-24 18:23:51'),
(211, 63, NULL, '14510', '189', NULL, '329', '56', NULL, NULL, '2', '2022-07-13 09:28:25', '2022-08-24 18:23:51'),
(212, 63, NULL, '14511', '189', NULL, '329', '58', NULL, NULL, '2', '2022-07-13 09:28:25', '2022-08-24 18:23:51'),
(213, 64, NULL, '14524', '199', NULL, '479', '56', NULL, NULL, '1', '2022-07-13 09:38:01', '2022-08-24 18:18:38'),
(214, 64, NULL, '14525', '199', NULL, '479', '58', NULL, NULL, '1', '2022-07-13 09:38:01', '2022-08-24 18:18:38'),
(215, 65, NULL, '14532', '199', NULL, '479', '52', NULL, NULL, '1', '2022-07-13 09:50:21', '2022-08-24 18:18:27'),
(216, 65, NULL, '14533', '199', NULL, '479', '54', NULL, NULL, '2', '2022-07-13 09:50:21', '2022-08-24 18:18:27'),
(217, 65, NULL, '14534', '199', NULL, '479', '56', NULL, NULL, '2', '2022-07-13 09:50:21', '2022-08-24 18:18:27'),
(218, 65, NULL, '14535', '199', NULL, '479', '58', NULL, NULL, '1', '2022-07-13 09:50:21', '2022-08-24 18:18:27'),
(219, 65, NULL, '14536', '199', NULL, '479', '60', NULL, NULL, '1', '2022-07-13 09:50:21', '2022-08-24 18:18:27'),
(220, 66, NULL, '14547', '179', NULL, '349', '52', NULL, NULL, '2', '2022-07-13 10:11:25', '2022-08-24 18:00:27'),
(221, 66, NULL, '14548', '179', NULL, '349', '54', NULL, NULL, '2', '2022-07-13 10:11:26', '2022-08-24 18:00:27'),
(222, 66, NULL, '14549', '179', NULL, '349', '56', NULL, NULL, '2', '2022-07-13 10:11:26', '2022-08-24 18:00:27'),
(223, 67, NULL, '14552', '169', NULL, '279', '52', NULL, NULL, '2', '2022-07-13 10:16:29', '2022-08-24 18:25:56'),
(224, 67, NULL, '14553', '169', NULL, '279', '54', NULL, NULL, '2', '2022-07-13 10:16:29', '2022-08-24 18:25:56'),
(225, 67, NULL, '14554', '169', NULL, '279', '56', NULL, NULL, '2', '2022-07-13 10:16:29', '2022-08-24 18:25:56'),
(226, 68, NULL, '14557', '169', NULL, '279', '52', NULL, NULL, '2', '2022-07-13 10:19:53', '2022-08-24 18:25:44'),
(227, 68, NULL, '14558', '169', NULL, '279', '54', NULL, NULL, '2', '2022-07-13 10:19:53', '2022-08-24 18:25:44'),
(228, 68, NULL, '14559', '169', NULL, '279', '56', NULL, NULL, '2', '2022-07-13 10:19:53', '2022-08-24 18:25:44'),
(229, 68, NULL, '14560', '169', NULL, '279', '58', NULL, NULL, '2', '2022-07-13 10:19:53', '2022-08-24 18:25:44'),
(230, 68, NULL, '14561', '169', NULL, '279', '60', NULL, NULL, '2', '2022-07-13 10:19:53', '2022-08-24 18:25:44'),
(231, 69, NULL, '14562', '179', NULL, '399', '52', NULL, NULL, '2', '2022-07-13 10:28:18', '2022-08-24 18:00:12'),
(232, 69, NULL, '14563', '179', NULL, '399', '54', NULL, NULL, '2', '2022-07-13 10:28:18', '2022-08-24 18:00:12'),
(233, 69, NULL, '14564', '179', NULL, '399', '56', NULL, NULL, '2', '2022-07-13 10:28:18', '2022-08-24 18:00:12'),
(234, 70, NULL, '14567', '179', NULL, '399', '52', NULL, NULL, '2', '2022-07-13 10:36:32', '2022-08-24 18:35:01'),
(235, 70, NULL, '14568', '179', NULL, '399', '54', NULL, NULL, '2', '2022-07-13 10:36:32', '2022-08-24 18:35:01'),
(236, 70, NULL, '14569', '179', NULL, '399', '56', NULL, NULL, '2', '2022-07-13 10:36:32', '2022-08-24 18:35:01'),
(237, 70, NULL, '14570', '179', NULL, '399', '58', NULL, NULL, '1', '2022-07-13 10:36:32', '2022-08-24 18:35:01'),
(238, 70, NULL, '14571', '179', NULL, '399', '60', NULL, NULL, '2', '2022-07-13 10:36:32', '2022-08-24 18:35:01'),
(239, 71, NULL, '14572', '189', NULL, '329', '52', NULL, NULL, '2', '2022-07-13 10:46:34', '2022-08-24 18:35:22'),
(240, 71, NULL, '14573', '189', NULL, '329', '54', NULL, NULL, '2', '2022-07-13 10:46:34', '2022-08-24 18:35:22'),
(241, 72, NULL, '14577', '169', NULL, '329', '52', NULL, NULL, '2', '2022-07-13 10:55:55', '2022-08-24 18:18:12'),
(242, 72, NULL, '14578', '169', NULL, '329', '54', NULL, NULL, '2', '2022-07-13 10:55:55', '2022-08-24 18:18:12'),
(243, 72, NULL, '14579', '169', NULL, '329', '56', NULL, NULL, '2', '2022-07-13 10:55:55', '2022-08-24 18:18:12'),
(244, 72, NULL, '14580', '169', NULL, '329', '58', NULL, NULL, '2', '2022-07-13 10:55:55', '2022-08-24 18:18:12'),
(245, 73, NULL, '14582', '179', NULL, '379', '52', NULL, NULL, '1', '2022-07-13 13:43:43', '2022-08-24 18:05:51'),
(246, 73, NULL, '14583', '179', NULL, '379', '54', NULL, NULL, '3', '2022-07-13 13:43:43', '2022-08-24 18:05:51'),
(247, 73, NULL, '14584', '179', NULL, '379', '56', NULL, NULL, '3', '2022-07-13 13:43:43', '2022-08-24 18:05:51'),
(248, 73, NULL, '14585', '179', NULL, '379', '58', NULL, NULL, '2', '2022-07-13 13:43:43', '2022-08-24 18:05:51'),
(249, 73, NULL, '14586', '179', NULL, '379', '60', NULL, NULL, '1', '2022-07-13 13:43:43', '2022-08-24 18:05:51'),
(250, 74, NULL, '14587', '199', NULL, '499', '52', NULL, NULL, '1', '2022-07-13 14:10:20', '2022-08-24 18:17:52'),
(251, 74, NULL, '14588', '199', NULL, '499', '54', NULL, NULL, '1', '2022-07-13 14:10:20', '2022-08-24 18:17:52'),
(252, 74, NULL, '14589', '199', NULL, '499', '56', NULL, NULL, '1', '2022-07-13 14:10:20', '2022-08-24 18:17:52'),
(253, 74, NULL, '14590', '199', NULL, '499', '58', NULL, NULL, '1', '2022-07-13 14:10:20', '2022-08-24 18:17:52'),
(254, 74, NULL, '14591', '199', NULL, '499', '60', NULL, NULL, '1', '2022-07-13 14:10:20', '2022-08-24 18:17:52'),
(255, 75, NULL, '14592', '179', NULL, '329', '52', NULL, NULL, '2', '2022-07-13 14:18:42', '2022-08-24 18:17:35'),
(256, 75, NULL, '14593', '179', NULL, '329', '54', NULL, NULL, '2', '2022-07-13 14:18:42', '2022-08-24 18:17:35'),
(257, 75, NULL, '14594', '179', NULL, '329', '56', NULL, NULL, '2', '2022-07-13 14:18:42', '2022-08-24 18:17:35'),
(258, 75, NULL, '14595', '179', NULL, '329', '58', NULL, NULL, '2', '2022-07-13 14:18:42', '2022-08-24 18:17:35'),
(259, 75, NULL, '14596', '179', NULL, '329', '60', NULL, NULL, '1', '2022-07-13 14:18:42', '2022-08-24 18:17:35'),
(260, 76, NULL, '14597', '179', NULL, '329', '52', NULL, NULL, '2', '2022-07-13 14:25:38', '2022-08-24 18:17:20'),
(261, 76, NULL, '14598', '179', NULL, '329', '54', NULL, NULL, '2', '2022-07-13 14:25:38', '2022-08-24 18:17:20'),
(262, 77, NULL, '14604', '189', NULL, '379', '56', NULL, NULL, '1', '2022-07-13 14:38:06', '2022-08-24 18:17:06'),
(263, 77, NULL, '14605', '189', NULL, '379', '58', NULL, NULL, '1', '2022-07-13 14:38:06', '2022-08-24 18:17:06'),
(264, 77, NULL, '14606', '189', NULL, '379', '60', NULL, NULL, '1', '2022-07-13 14:38:06', '2022-08-24 18:17:06'),
(265, 78, NULL, '14607', '189', NULL, '329', '52', NULL, NULL, '2', '2022-07-13 14:46:17', '2022-08-24 18:26:19'),
(266, 78, NULL, '14608', '189', NULL, '329', '54', NULL, NULL, '2', '2022-07-13 14:46:17', '2022-08-24 18:26:19'),
(267, 79, NULL, '14612', '179', NULL, '449', '52', NULL, NULL, '2', '2022-07-13 15:00:44', '2022-08-24 18:25:09'),
(268, 79, NULL, '14613', '179', NULL, '449', '54', NULL, NULL, '2', '2022-07-13 15:00:44', '2022-08-24 18:25:09'),
(269, 79, NULL, '14614', '179', NULL, '449', '56', NULL, NULL, '2', '2022-07-13 15:00:44', '2022-08-24 18:25:09'),
(270, 79, NULL, '14615', '179', NULL, '449', '58', NULL, NULL, '2', '2022-07-13 15:00:44', '2022-08-24 18:25:09'),
(271, 79, NULL, '14616', '179', NULL, '449', '60', NULL, NULL, '2', '2022-07-13 15:00:44', '2022-08-24 18:25:09'),
(272, 80, NULL, '14629', '229', NULL, '350', '56', NULL, NULL, '3', '2022-07-13 15:12:28', '2022-08-24 17:59:58'),
(273, 80, NULL, '14630', '229', NULL, '350', '58', NULL, NULL, '2', '2022-07-13 15:12:28', '2022-08-24 17:59:58'),
(274, 80, NULL, '14631', '229', NULL, '350', '60', NULL, NULL, '1', '2022-07-13 15:12:28', '2022-08-24 17:59:58'),
(275, 81, NULL, '14633', '287', NULL, '479', '54', NULL, NULL, '1', '2022-07-13 15:26:15', '2022-08-11 14:16:09'),
(276, 81, NULL, '14634', '287', NULL, '479', '56', NULL, NULL, '1', '2022-07-13 15:26:15', '2022-08-11 14:16:09'),
(277, 82, NULL, '14639', '299', NULL, '499', '56', NULL, NULL, '3', '2022-07-13 15:45:37', '2022-08-24 18:16:50'),
(278, 82, NULL, '14640', '299', NULL, '499', '58', NULL, NULL, '1', '2022-07-13 15:45:37', '2022-08-24 18:16:50'),
(279, 82, NULL, '14641', '299', NULL, '499', '60', NULL, NULL, '1', '2022-07-13 15:45:37', '2022-08-24 18:16:50'),
(280, 83, NULL, '14643', '269', NULL, '550', '54', NULL, NULL, '2', '2022-07-13 16:43:11', '2022-08-24 18:16:37'),
(281, 83, NULL, '14644', '269', NULL, '550', '56', NULL, NULL, '2', '2022-07-13 16:43:11', '2022-08-24 18:16:37'),
(282, 83, NULL, '14645', '269', NULL, '550', '58', NULL, NULL, '2', '2022-07-13 16:43:11', '2022-08-24 18:16:37'),
(283, 83, NULL, '14646', '269', NULL, '550', '60', NULL, NULL, '2', '2022-07-13 16:43:11', '2022-08-24 18:16:37'),
(284, 84, NULL, '14648', '249', NULL, '499', '54', NULL, NULL, '1', '2022-07-13 16:49:15', '2022-08-24 18:16:22'),
(285, 84, NULL, '14649', '249', NULL, '499', '56', NULL, NULL, '1', '2022-07-13 16:49:15', '2022-08-24 18:16:22'),
(286, 84, NULL, '14650', '249', NULL, '499', '58', NULL, NULL, '1', '2022-07-13 16:49:15', '2022-08-24 18:16:22'),
(287, 84, NULL, '14651', '249', NULL, '499', '60', NULL, NULL, '1', '2022-07-13 16:49:15', '2022-08-24 18:16:22'),
(288, 85, NULL, '14653', '299', NULL, '495', '54', NULL, NULL, '1', '2022-07-13 17:01:48', '2022-07-13 17:01:48'),
(289, 85, NULL, '14656', '299', NULL, '495', '60', NULL, NULL, '1', '2022-07-13 17:01:48', '2022-07-13 17:01:48'),
(290, 86, NULL, '14663', '269', NULL, '550', '54', NULL, NULL, '2', '2022-07-13 17:09:46', '2022-08-24 17:59:40'),
(291, 86, NULL, '14664', '269', NULL, '550', '56', NULL, NULL, '2', '2022-07-13 17:09:46', '2022-08-24 17:59:40'),
(292, 86, NULL, '14665', '269', NULL, '550', '58', NULL, NULL, '2', '2022-07-13 17:09:46', '2022-08-24 17:59:40'),
(293, 86, NULL, '14666', '269', NULL, '550', '60', NULL, NULL, '2', '2022-07-13 17:09:46', '2022-08-24 17:59:40'),
(294, 87, NULL, '14667', '229', NULL, '450', '52', NULL, NULL, '2', '2022-07-13 17:15:46', '2022-08-24 17:59:19'),
(295, 87, NULL, '14668', '229', NULL, '450', '54', NULL, NULL, '2', '2022-07-13 17:15:46', '2022-08-24 17:59:19'),
(299, 89, NULL, '14677', '275', NULL, '550', '52', NULL, NULL, '1', '2022-07-13 17:45:57', '2022-07-13 17:45:57'),
(300, 89, NULL, '14678', '275', NULL, '550', '54', NULL, NULL, '1', '2022-07-13 17:45:57', '2022-07-13 17:45:57'),
(301, 89, NULL, '14679', '275', NULL, '550', '56', NULL, NULL, '1', '2022-07-13 17:45:57', '2022-07-13 17:45:57'),
(302, 89, NULL, '14680', '275', NULL, '550', '58', NULL, NULL, '1', '2022-07-13 17:45:57', '2022-07-13 17:45:57'),
(303, 89, NULL, '14681', '275', NULL, '550', '60', NULL, NULL, '1', '2022-07-13 17:45:57', '2022-07-13 17:45:57'),
(304, 90, NULL, '14687', '159', NULL, '329', '52', NULL, NULL, '2', '2022-07-13 17:56:27', '2022-08-24 18:15:55'),
(305, 90, NULL, '14688', '159', NULL, '329', '54', NULL, NULL, '2', '2022-07-13 17:56:27', '2022-08-24 18:15:55'),
(306, 90, NULL, '14689', '159', NULL, '329', '56', NULL, NULL, '2', '2022-07-13 17:56:27', '2022-08-24 18:15:55'),
(307, 91, NULL, '14809', '169', NULL, '329', '52', NULL, NULL, '2', '2022-07-13 18:08:27', '2022-08-24 18:05:10'),
(308, 91, NULL, '14810', '169', NULL, '329', '54', NULL, NULL, '2', '2022-07-13 18:08:27', '2022-08-24 18:05:10'),
(309, 91, NULL, '14811', '169', NULL, '329', '56', NULL, NULL, '2', '2022-07-13 18:08:27', '2022-08-24 18:05:10'),
(310, 91, NULL, '14812', '169', NULL, '329', '58', NULL, NULL, '2', '2022-07-13 18:08:28', '2022-08-24 18:05:10'),
(311, 91, NULL, '14813', '169', NULL, '329', '60', NULL, NULL, '2', '2022-07-13 18:08:28', '2022-08-24 18:05:10'),
(314, 93, NULL, '14697', '199', NULL, '550', '52', NULL, NULL, '1', '2022-07-14 07:02:47', '2022-08-24 18:15:20'),
(315, 93, NULL, '14698', '199', NULL, '550', '54', NULL, NULL, '2', '2022-07-14 07:02:47', '2022-08-24 18:15:20'),
(316, 93, NULL, '14699', '199', NULL, '550', '56', NULL, NULL, '2', '2022-07-14 07:02:47', '2022-08-24 18:15:20'),
(317, 93, NULL, '14700', '199', NULL, '550', '58', NULL, NULL, '1', '2022-07-14 07:02:47', '2022-08-24 18:15:20'),
(321, 95, NULL, '14707', '189', NULL, '399', '56', NULL, NULL, '2', '2022-07-14 07:13:56', '2022-08-24 18:24:40'),
(322, 95, NULL, '14708', '189', NULL, '399', '58', NULL, NULL, '2', '2022-07-14 07:13:56', '2022-08-24 18:24:40'),
(323, 95, NULL, '14709', '189', NULL, '399', '60', NULL, NULL, '2', '2022-07-14 07:13:56', '2022-08-24 18:24:40'),
(330, 98, NULL, '14729', '179', NULL, '329', '52', NULL, NULL, '2', '2022-07-14 07:40:07', '2022-08-24 18:31:56'),
(331, 98, NULL, '14730', '179', NULL, '329', '54', NULL, NULL, '2', '2022-07-14 07:40:07', '2022-08-24 18:31:56'),
(332, 98, NULL, '14731', '179', NULL, '329', '56', NULL, NULL, '2', '2022-07-14 07:40:07', '2022-08-24 18:31:56'),
(333, 99, NULL, '14897', '179', NULL, '279', '52', NULL, NULL, '2', '2022-07-14 07:46:41', '2022-08-24 18:34:07'),
(334, 99, NULL, '14898', '179', NULL, '279', '54', NULL, NULL, '2', '2022-07-14 07:46:41', '2022-08-24 18:34:07'),
(335, 99, NULL, '14899', '179', NULL, '279', '56', NULL, NULL, '2', '2022-07-14 07:46:41', '2022-08-24 18:34:07'),
(336, 99, NULL, '14900', '179', NULL, '279', '58', NULL, NULL, '2', '2022-07-14 07:46:41', '2022-08-24 18:34:07'),
(337, 99, NULL, '14901', '179', NULL, '279', '60', NULL, NULL, '2', '2022-07-14 07:46:41', '2022-08-24 18:34:07'),
(338, 100, NULL, '14902', '179', NULL, '279', '52', NULL, NULL, '1', '2022-07-14 07:49:29', '2022-08-24 18:33:55'),
(339, 100, NULL, '14903', '179', NULL, '279', '54', NULL, NULL, '1', '2022-07-14 07:49:29', '2022-08-24 18:33:55'),
(340, 100, NULL, '14904', '179', NULL, '279', '56', NULL, NULL, '1', '2022-07-14 07:49:29', '2022-08-24 18:33:55'),
(341, 100, NULL, '14905', '179', NULL, '279', '58', NULL, NULL, '1', '2022-07-14 07:49:29', '2022-08-24 18:33:55'),
(342, 100, NULL, '14906', '179', NULL, '279', '60', NULL, NULL, '1', '2022-07-14 07:49:29', '2022-08-24 18:33:55'),
(343, 101, NULL, '14907', '179', NULL, '279', '52', NULL, NULL, '1', '2022-07-14 07:53:20', '2022-08-24 18:33:41'),
(344, 101, NULL, '14908', '179', NULL, '279', '54', NULL, NULL, '1', '2022-07-14 07:53:20', '2022-08-24 18:33:41'),
(345, 101, NULL, '14909', '179', NULL, '279', '56', NULL, NULL, '1', '2022-07-14 07:53:20', '2022-08-24 18:33:41'),
(346, 101, NULL, '14910', '179', NULL, '279', '58', NULL, NULL, '1', '2022-07-14 07:53:20', '2022-08-24 18:33:41'),
(347, 101, NULL, '14911', '179', NULL, '279', '60', NULL, NULL, '1', '2022-07-14 07:53:20', '2022-08-24 18:33:41'),
(348, 102, NULL, '15014', '179', NULL, '399', '52', NULL, NULL, '2', '2022-07-14 08:48:07', '2022-08-24 18:33:23'),
(349, 102, NULL, '15015', '179', NULL, '399', '54', NULL, NULL, '2', '2022-07-14 08:48:07', '2022-08-24 18:33:23'),
(350, 102, NULL, '15016', '179', NULL, '399', '56', NULL, NULL, '2', '2022-07-14 08:48:07', '2022-08-24 18:33:23'),
(351, 102, NULL, '15017', '179', NULL, '399', '58', NULL, NULL, '2', '2022-07-14 08:48:07', '2022-08-24 18:33:23'),
(352, 102, NULL, '15018', '179', NULL, '399', '60', NULL, NULL, '2', '2022-07-14 08:48:07', '2022-08-24 18:33:23'),
(353, 103, NULL, '14891', '209', NULL, '499', '52', NULL, NULL, '1', '2022-07-14 08:56:33', '2022-08-24 18:05:35'),
(354, 103, NULL, '14892', '209', NULL, '499', '54', NULL, NULL, '1', '2022-07-14 08:56:33', '2022-08-24 18:05:35'),
(355, 103, NULL, '14893', '209', NULL, '499', '56', NULL, NULL, '1', '2022-07-14 08:56:33', '2022-08-24 18:05:35'),
(356, 103, NULL, '14894', '209', NULL, '499', '58', NULL, NULL, '1', '2022-07-14 08:56:33', '2022-08-24 18:05:35'),
(357, 103, NULL, '14895', '209', NULL, '499', '60', NULL, NULL, '1', '2022-07-14 08:56:33', '2022-08-24 18:05:35'),
(358, 104, NULL, '14886', '199', NULL, '550', '52', NULL, NULL, '1', '2022-07-14 09:03:14', '2022-08-24 17:58:58'),
(359, 104, NULL, '14887', '199', NULL, '550', '54', NULL, NULL, '1', '2022-07-14 09:03:14', '2022-08-24 17:58:58'),
(360, 104, NULL, '14888', '199', NULL, '550', '56', NULL, NULL, '1', '2022-07-14 09:03:14', '2022-08-24 17:58:58'),
(361, 104, NULL, '14889', '199', NULL, '550', '58', NULL, NULL, '1', '2022-07-14 09:03:14', '2022-08-24 17:58:58'),
(362, 104, NULL, '14890', '199', NULL, '550', '60', NULL, NULL, '1', '2022-07-14 09:03:14', '2022-08-24 17:58:58'),
(363, 105, NULL, '14745', '179', NULL, '329', '56', NULL, NULL, '1', '2022-07-14 09:16:36', '2022-08-24 18:33:05'),
(364, 105, NULL, '14746', '179', NULL, '329', '58', NULL, NULL, '1', '2022-07-14 09:16:36', '2022-08-24 18:33:05'),
(365, 105, NULL, '14885', '179', NULL, '329', '60', NULL, NULL, '1', '2022-07-14 09:16:36', '2022-08-24 18:33:05'),
(366, 106, NULL, '14880', '199', NULL, '420', '52', NULL, NULL, '1', '2022-07-14 09:27:28', '2022-08-24 18:14:28'),
(367, 106, NULL, '14881', '199', NULL, '420', '54', NULL, NULL, '1', '2022-07-14 09:27:28', '2022-08-24 18:14:28'),
(368, 106, NULL, '14882', '199', NULL, '420', '56', NULL, NULL, '1', '2022-07-14 09:27:28', '2022-08-24 18:14:28'),
(369, 106, NULL, '14883', '199', NULL, '420', '58', NULL, NULL, '1', '2022-07-14 09:27:28', '2022-08-24 18:14:28'),
(370, 106, NULL, '14884', '199', NULL, '420', '60', NULL, NULL, '1', '2022-07-14 09:27:28', '2022-08-24 18:14:28'),
(371, 107, NULL, '14877', '189', NULL, '420', '56', NULL, NULL, '1', '2022-07-14 09:54:49', '2022-08-24 18:24:26'),
(372, 107, NULL, '14878', '189', NULL, '420', '58', NULL, NULL, '1', '2022-07-14 09:54:49', '2022-08-24 18:24:26'),
(373, 107, NULL, '14879', '189', NULL, '420', '60', NULL, NULL, '1', '2022-07-14 09:54:49', '2022-08-24 18:24:26'),
(374, 108, NULL, '14826', '179', NULL, '329', '52', NULL, NULL, '1', '2022-07-14 10:05:25', '2022-08-24 18:32:48'),
(375, 108, NULL, '14827', '179', NULL, '329', '54', NULL, NULL, '1', '2022-07-14 10:05:25', '2022-08-24 18:32:48'),
(376, 108, NULL, '14828', '179', NULL, '329', '56', NULL, NULL, '1', '2022-07-14 10:05:25', '2022-08-24 18:32:48'),
(377, 108, NULL, '14829', '179', NULL, '329', '58', NULL, NULL, '1', '2022-07-14 10:05:25', '2022-08-24 18:32:48'),
(378, 108, NULL, '14830', '179', NULL, '329', '60', NULL, NULL, '1', '2022-07-14 10:05:25', '2022-08-24 18:32:48'),
(379, 109, NULL, '14866', '179', NULL, '329', '52', NULL, NULL, '1', '2022-07-14 10:16:15', '2022-08-24 18:32:32'),
(380, 109, NULL, '14867', '179', NULL, '329', '54', NULL, NULL, '1', '2022-07-14 10:16:15', '2022-08-24 18:32:32'),
(381, 109, NULL, '14868', '179', NULL, '329', '56', NULL, NULL, '1', '2022-07-14 10:16:15', '2022-08-24 18:32:32'),
(382, 109, NULL, '14869', '179', NULL, '329', '58', NULL, NULL, '1', '2022-07-14 10:16:15', '2022-08-24 18:32:32'),
(383, 109, NULL, '14870', '179', NULL, '329', '60', NULL, NULL, '1', '2022-07-14 10:16:15', '2022-08-24 18:32:32'),
(384, 110, NULL, '14861', '179', NULL, '380', '52', NULL, NULL, '1', '2022-07-14 10:26:47', '2022-08-24 18:32:17'),
(385, 110, NULL, '14862', '179', NULL, '380', '54', NULL, NULL, '1', '2022-07-14 10:26:47', '2022-08-24 18:32:17'),
(386, 110, NULL, '14863', '179', NULL, '380', '56', NULL, NULL, '1', '2022-07-14 10:26:47', '2022-08-24 18:32:17'),
(387, 110, NULL, '14864', '179', NULL, '380', '58', NULL, NULL, '1', '2022-07-14 10:26:47', '2022-08-24 18:32:17'),
(388, 110, NULL, '14865', '179', NULL, '380', '60', NULL, NULL, '1', '2022-07-14 10:26:47', '2022-08-24 18:32:17'),
(389, 111, NULL, '14851', '227', NULL, '450', '52', NULL, NULL, '1', '2022-07-14 10:33:29', '2022-07-14 10:33:29'),
(390, 111, NULL, '14852', '227', NULL, '450', '54', NULL, NULL, '1', '2022-07-14 10:33:29', '2022-07-14 10:33:29'),
(391, 111, NULL, '14853', '227', NULL, '450', '56', NULL, NULL, '1', '2022-07-14 10:33:29', '2022-07-14 10:33:29'),
(392, 111, NULL, '14854', '227', NULL, '450', '58', NULL, NULL, '1', '2022-07-14 10:33:29', '2022-07-14 10:33:29'),
(393, 111, NULL, '14855', '227', NULL, '450', '60', NULL, NULL, '1', '2022-07-14 10:33:30', '2022-07-14 10:33:30'),
(394, 112, NULL, '14856', '227', NULL, '450', '52', NULL, NULL, '1', '2022-07-14 10:37:41', '2022-08-09 09:41:16'),
(395, 112, NULL, '14857', '227', NULL, '450', '54', NULL, NULL, '1', '2022-07-14 10:37:41', '2022-08-09 09:41:16'),
(396, 112, NULL, '14858', '227', NULL, '450', '56', NULL, NULL, '1', '2022-07-14 10:37:41', '2022-08-09 09:41:16'),
(397, 112, NULL, '14859', '227', NULL, '450', '58', NULL, NULL, '1', '2022-07-14 10:37:41', '2022-08-09 09:41:16'),
(398, 112, NULL, '14860', '227', NULL, '450', '60', NULL, NULL, '1', '2022-07-14 10:37:41', '2022-08-09 09:41:16'),
(399, 113, NULL, '14836', '199', NULL, '550', '52', NULL, NULL, '2', '2022-07-14 13:47:10', '2022-08-24 18:14:06'),
(400, 113, NULL, '14837', '199', NULL, '550', '54', NULL, NULL, '2', '2022-07-14 13:47:10', '2022-08-24 18:14:06'),
(401, 113, NULL, '14838', '199', NULL, '550', '56', NULL, NULL, '2', '2022-07-14 13:47:10', '2022-08-24 18:14:06'),
(402, 113, NULL, '14839', '199', NULL, '550', '58', NULL, NULL, '2', '2022-07-14 13:47:10', '2022-08-24 18:14:06'),
(403, 113, NULL, '14840', '199', NULL, '550', '60', NULL, NULL, '2', '2022-07-14 13:47:10', '2022-08-24 18:14:06'),
(404, 114, NULL, '14841', '199', NULL, '550', '52', NULL, NULL, '2', '2022-07-14 13:50:51', '2022-08-24 18:13:55'),
(405, 114, NULL, '14842', '199', NULL, '550', '54', NULL, NULL, '2', '2022-07-14 13:50:51', '2022-08-24 18:13:55'),
(406, 114, NULL, '14843', '199', NULL, '550', '56', NULL, NULL, '2', '2022-07-14 13:50:51', '2022-08-24 18:13:55'),
(407, 114, NULL, '14844', '199', NULL, '550', '58', NULL, NULL, '2', '2022-07-14 13:50:51', '2022-08-24 18:13:55'),
(408, 114, NULL, '14845', '199', NULL, '550', '60', NULL, NULL, '2', '2022-07-14 13:50:51', '2022-08-24 18:13:55'),
(409, 115, NULL, '14846', '199', NULL, '550', '52', NULL, NULL, '2', '2022-07-14 13:54:52', '2022-08-24 18:13:42'),
(410, 115, NULL, '14847', '199', NULL, '550', '54', NULL, NULL, '2', '2022-07-14 13:54:52', '2022-08-24 18:13:42'),
(411, 115, NULL, '14848', '199', NULL, '550', '56', NULL, NULL, '2', '2022-07-14 13:54:52', '2022-08-24 18:13:42'),
(412, 115, NULL, '14849', '199', NULL, '550', '58', NULL, NULL, '2', '2022-07-14 13:54:52', '2022-08-24 18:13:42'),
(413, 115, NULL, '14850', '199', NULL, '550', '60', NULL, NULL, '2', '2022-07-14 13:54:52', '2022-08-24 18:13:42'),
(414, 116, NULL, '14831', '159', NULL, '329', '52', NULL, NULL, '1', '2022-07-14 14:09:29', '2022-08-24 18:13:19'),
(415, 116, NULL, '14832', '159', NULL, '329', '54', NULL, NULL, '1', '2022-07-14 14:09:29', '2022-08-24 18:13:19'),
(416, 116, NULL, '14833', '159', NULL, '329', '56', NULL, NULL, '1', '2022-07-14 14:09:29', '2022-08-24 18:13:19'),
(417, 116, NULL, '14834', '159', NULL, '329', '58', NULL, NULL, '1', '2022-07-14 14:09:29', '2022-08-24 18:13:19'),
(418, 116, NULL, '14835', '159', NULL, '329', '60', NULL, NULL, '1', '2022-07-14 14:09:29', '2022-08-24 18:13:19'),
(419, 117, NULL, '14804', '169', NULL, '329', '52', NULL, NULL, '2', '2022-07-14 14:21:12', '2022-08-24 18:04:56'),
(420, 117, NULL, '14805', '169', NULL, '329', '54', NULL, NULL, '2', '2022-07-14 14:21:12', '2022-08-24 18:04:56'),
(421, 117, NULL, '14806', '169', NULL, '329', '56', NULL, NULL, '2', '2022-07-14 14:21:12', '2022-08-24 18:04:56'),
(422, 117, NULL, '14807', '169', NULL, '329', '58', NULL, NULL, '2', '2022-07-14 14:21:12', '2022-08-24 18:04:56'),
(423, 117, NULL, '14808', '169', NULL, '329', '60', NULL, NULL, '2', '2022-07-14 14:21:12', '2022-08-24 18:04:56'),
(424, 118, NULL, '14799', '169', NULL, '329', '52', NULL, NULL, '2', '2022-07-14 14:28:47', '2022-08-24 18:04:41'),
(425, 118, NULL, '14800', '169', NULL, '329', '54', NULL, NULL, '2', '2022-07-14 14:28:47', '2022-08-24 18:04:41'),
(426, 118, NULL, '14801', '169', NULL, '329', '56', NULL, NULL, '2', '2022-07-14 14:28:47', '2022-08-24 18:04:41'),
(427, 118, NULL, '14802', '169', NULL, '329', '58', NULL, NULL, '2', '2022-07-14 14:28:47', '2022-08-24 18:04:41'),
(428, 118, NULL, '14803', '169', NULL, '329', '60', NULL, NULL, '2', '2022-07-14 14:28:47', '2022-08-24 18:04:41'),
(429, 119, NULL, '14788', '199', NULL, '450', '52', NULL, NULL, '1', '2022-07-14 14:36:23', '2022-07-14 14:36:23'),
(430, 119, NULL, '14789', '199', NULL, '450', '54', NULL, NULL, '1', '2022-07-14 14:36:23', '2022-07-14 14:36:23'),
(431, 119, NULL, '14790', '199', NULL, '450', '56', NULL, NULL, '1', '2022-07-14 14:36:23', '2022-07-14 14:36:23'),
(432, 119, NULL, '14791', '199', NULL, '450', '58', NULL, NULL, '1', '2022-07-14 14:36:23', '2022-07-14 14:36:23'),
(433, 119, NULL, '14792', '199', NULL, '450', '60', NULL, NULL, '1', '2022-07-14 14:36:23', '2022-07-14 14:36:23'),
(434, 120, NULL, '14782', '169', NULL, '329', '52', NULL, NULL, '1', '2022-07-14 14:42:47', '2022-08-24 18:31:45'),
(435, 120, NULL, '14783', '169', NULL, '329', '54', NULL, NULL, '1', '2022-07-14 14:42:47', '2022-08-24 18:31:45'),
(436, 120, NULL, '14784', '169', NULL, '329', '56', NULL, NULL, '1', '2022-07-14 14:42:47', '2022-08-24 18:31:45'),
(437, 120, NULL, '14785', '169', NULL, '329', '58', NULL, NULL, '1', '2022-07-14 14:42:47', '2022-08-24 18:31:45'),
(438, 120, NULL, '14786', '169', NULL, '329', '60', NULL, NULL, '1', '2022-07-14 14:42:47', '2022-08-24 18:31:45'),
(439, 121, NULL, '14682', '275', NULL, '550', '52', NULL, NULL, '1', '2022-07-14 14:49:06', '2022-08-24 18:03:51'),
(440, 121, NULL, '14683', '275', NULL, '550', '54', NULL, NULL, '1', '2022-07-14 14:49:06', '2022-08-24 18:03:51'),
(441, 121, NULL, '14684', '275', NULL, '550', '56', NULL, NULL, '1', '2022-07-14 14:49:06', '2022-08-24 18:03:51'),
(442, 121, NULL, '14685', '275', NULL, '550', '58', NULL, NULL, '1', '2022-07-14 14:49:06', '2022-08-24 18:03:51'),
(443, 121, NULL, '14686', '275', NULL, '550', '60', NULL, NULL, '1', '2022-07-14 14:49:06', '2022-08-24 18:03:51'),
(444, 122, NULL, '14617', '219', NULL, '449', '52', NULL, NULL, '1', '2022-07-14 15:24:09', '2022-08-24 18:24:58'),
(445, 122, NULL, '14618', '219', NULL, '449', '54', NULL, NULL, '1', '2022-07-14 15:24:09', '2022-08-24 18:24:58'),
(446, 122, NULL, '14619', '219', NULL, '449', '56', NULL, NULL, '1', '2022-07-14 15:24:09', '2022-08-24 18:24:58'),
(447, 122, NULL, '14620', '219', NULL, '449', '58', NULL, NULL, '1', '2022-07-14 15:24:09', '2022-08-24 18:24:58'),
(448, 122, NULL, '14621', '219', NULL, '449', '60', NULL, NULL, '1', '2022-07-14 15:24:09', '2022-08-24 18:24:58'),
(449, 123, NULL, '14517', '189', NULL, '329', '52', NULL, NULL, '1', '2022-07-14 16:21:04', '2022-08-24 18:23:38'),
(450, 123, NULL, '14518', '189', NULL, '329', '54', NULL, NULL, '1', '2022-07-14 16:21:04', '2022-08-24 18:23:38'),
(451, 123, NULL, '14519', '189', NULL, '329', '56', NULL, NULL, '1', '2022-07-14 16:21:04', '2022-08-24 18:23:38'),
(452, 123, NULL, '14520', '189', NULL, '329', '58', NULL, NULL, '1', '2022-07-14 16:21:04', '2022-08-24 18:23:38'),
(453, 123, NULL, '14521', '189', NULL, '329', '30', NULL, NULL, '1', '2022-07-14 16:21:04', '2022-08-24 18:23:38'),
(454, 124, NULL, '14467', '189', NULL, '329', '52', NULL, NULL, '1', '2022-07-14 16:31:44', '2022-08-24 18:08:37'),
(455, 124, NULL, '14468', '189', NULL, '329', '54', NULL, NULL, '1', '2022-07-14 16:31:44', '2022-08-24 18:08:37'),
(456, 124, NULL, '14469', '189', NULL, '329', '56', NULL, NULL, '1', '2022-07-14 16:31:44', '2022-08-24 18:08:37'),
(457, 124, NULL, '14470', '189', NULL, '329', '58', NULL, NULL, '1', '2022-07-14 16:31:44', '2022-08-24 18:08:37'),
(458, 124, NULL, '14471', '189', NULL, '329', '60', NULL, NULL, '1', '2022-07-14 16:31:44', '2022-08-24 18:08:37'),
(459, 125, NULL, '14402', '189', NULL, '379', '52', NULL, NULL, '1', '2022-07-14 16:45:25', '2022-08-24 18:34:28'),
(460, 125, NULL, '14403', '189', NULL, '379', '54', NULL, NULL, '1', '2022-07-14 16:45:25', '2022-08-24 18:34:28'),
(461, 125, NULL, '14404', '189', NULL, '379', '56', NULL, NULL, '1', '2022-07-14 16:45:25', '2022-08-24 18:34:28'),
(462, 125, NULL, '14405', '189', NULL, '379', '58', NULL, NULL, '1', '2022-07-14 16:45:25', '2022-08-24 18:34:28'),
(463, 125, NULL, '14406', '189', NULL, '379', '60', NULL, NULL, '1', '2022-07-14 16:45:25', '2022-08-24 18:34:28'),
(464, 126, NULL, '14316', '179', NULL, '389', '52', NULL, NULL, '1', '2022-07-14 16:58:58', '2022-08-24 17:58:26'),
(465, 126, NULL, '14317', '179', NULL, '389', '54', NULL, NULL, '1', '2022-07-14 16:58:58', '2022-08-24 17:58:26'),
(466, 126, NULL, '14318', '179', NULL, '389', '56', NULL, NULL, '1', '2022-07-14 16:58:58', '2022-08-24 17:58:26'),
(467, 126, NULL, '14319', '179', NULL, '389', '58', NULL, NULL, '1', '2022-07-14 16:58:58', '2022-08-24 17:58:26'),
(468, 126, NULL, '14320', '179', NULL, '389', '60', NULL, NULL, '1', '2022-07-14 16:58:58', '2022-08-24 17:58:26'),
(469, 127, NULL, '14321', '179', NULL, '329', '52', NULL, NULL, '1', '2022-07-14 17:05:01', '2022-08-24 18:23:20'),
(470, 127, NULL, '14322', '179', NULL, '329', '54', NULL, NULL, '1', '2022-07-14 17:05:01', '2022-08-24 18:23:20'),
(471, 127, NULL, '14323', '179', NULL, '329', '56', NULL, NULL, '1', '2022-07-14 17:05:01', '2022-08-24 18:23:20'),
(472, 127, NULL, '14324', '179', NULL, '329', '58', NULL, NULL, '1', '2022-07-14 17:05:01', '2022-08-24 18:23:20'),
(473, 127, NULL, '14325', '179', NULL, '329', '60', NULL, NULL, '1', '2022-07-14 17:05:01', '2022-08-24 18:23:20'),
(474, 128, NULL, '14357', '179', NULL, '350', '52', NULL, NULL, '2', '2022-07-14 17:15:08', '2022-08-24 18:30:39'),
(475, 128, NULL, '14358', '179', NULL, '350', '54', NULL, NULL, '2', '2022-07-14 17:15:08', '2022-08-24 18:30:39'),
(476, 128, NULL, '14359', '179', NULL, '350', '56', NULL, NULL, '2', '2022-07-14 17:15:08', '2022-08-24 18:30:39');
INSERT INTO `variations` (`id`, `product_id`, `attribute_id`, `sku_id`, `price`, `description`, `discounted_variation_price`, `variation`, `variation_interval`, `variation_times`, `qty`, `created_at`, `updated_at`) VALUES
(477, 128, NULL, '14360', '179', NULL, '350', '58', NULL, NULL, '2', '2022-07-14 17:15:08', '2022-08-24 18:30:39'),
(478, 128, NULL, '14361', '179', NULL, '350', '60', NULL, NULL, '2', '2022-07-14 17:15:08', '2022-08-24 18:30:39'),
(479, 129, NULL, '10051', '149', NULL, '249', 'S', NULL, NULL, '2', '2022-07-16 07:37:03', '2022-08-24 23:55:40'),
(480, 129, NULL, '10052', '149', NULL, '249', 'M', NULL, NULL, '2', '2022-07-16 07:37:03', '2022-08-24 23:55:40'),
(481, 129, NULL, '10053', '149', NULL, '249', 'L', NULL, NULL, '2', '2022-07-16 07:37:03', '2022-08-24 23:55:40'),
(482, 129, NULL, '10054', '149', NULL, '249', 'XL', NULL, NULL, '2', '2022-07-16 07:37:03', '2022-08-24 23:55:40'),
(483, 129, NULL, '10055', '149', NULL, '249', 'XXL', NULL, NULL, '2', '2022-07-16 07:37:03', '2022-08-24 23:55:40'),
(484, 130, NULL, '10056', '149', NULL, '249', 'S', NULL, NULL, '2', '2022-07-16 07:43:46', '2022-08-24 23:53:01'),
(485, 130, NULL, '10057', '149', NULL, '249', 'M', NULL, NULL, '2', '2022-07-16 07:43:46', '2022-08-24 23:53:01'),
(486, 130, NULL, '10058', '149', NULL, '249', 'L', NULL, NULL, '2', '2022-07-16 07:43:46', '2022-08-24 23:53:01'),
(487, 130, NULL, '10059', '149', NULL, '249', 'XL', NULL, NULL, '2', '2022-07-16 07:43:46', '2022-08-24 23:53:01'),
(488, 130, NULL, '10060', '149', NULL, '249', 'XXL', NULL, NULL, '2', '2022-07-16 07:43:46', '2022-08-24 23:53:01'),
(489, 131, NULL, '10061', '149', NULL, '249', 'S', NULL, NULL, '2', '2022-07-16 07:51:40', '2022-08-24 23:52:40'),
(490, 131, NULL, '10062', '149', NULL, '249', 'M', NULL, NULL, '2', '2022-07-16 07:51:40', '2022-08-24 23:52:40'),
(491, 131, NULL, '10063', '149', NULL, '249', 'L', NULL, NULL, '2', '2022-07-16 07:51:40', '2022-08-24 23:52:40'),
(492, 131, NULL, '10064', '149', NULL, '249', 'XL', NULL, NULL, '2', '2022-07-16 07:51:40', '2022-08-24 23:52:40'),
(493, 131, NULL, '10065', '149', NULL, '249', 'XXL', NULL, NULL, '2', '2022-07-16 07:51:40', '2022-08-24 23:52:40'),
(494, 132, NULL, '10096', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 08:24:02', '2022-08-24 23:52:22'),
(495, 132, NULL, '10097', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 08:24:02', '2022-08-24 23:52:22'),
(496, 132, NULL, '10098', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 08:24:02', '2022-08-24 23:52:22'),
(497, 132, NULL, '10099', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 08:24:02', '2022-08-24 23:52:22'),
(498, 132, NULL, '10100', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 08:24:02', '2022-08-24 23:52:22'),
(499, 133, NULL, '10101', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 08:30:51', '2022-08-24 23:52:06'),
(500, 133, NULL, '10102', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 08:30:51', '2022-08-24 23:52:06'),
(501, 133, NULL, '10103', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 08:30:51', '2022-08-24 23:52:06'),
(502, 133, NULL, '10104', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 08:30:51', '2022-08-24 23:52:06'),
(503, 133, NULL, '10105', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 08:30:51', '2022-08-24 23:52:06'),
(504, 134, NULL, '10106', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 08:35:40', '2022-08-24 23:51:46'),
(505, 134, NULL, '10107', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 08:35:40', '2022-08-24 23:51:46'),
(506, 134, NULL, '10108', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 08:35:40', '2022-08-24 23:51:46'),
(507, 134, NULL, '10109', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 08:35:40', '2022-08-24 23:51:46'),
(508, 134, NULL, '10110', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 08:35:40', '2022-08-24 23:51:46'),
(509, 135, NULL, '10111', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 08:40:08', '2022-08-24 23:51:30'),
(510, 135, NULL, '10112', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 08:40:08', '2022-08-24 23:51:30'),
(511, 135, NULL, '10113', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 08:40:08', '2022-08-24 23:51:30'),
(512, 135, NULL, '10114', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 08:40:08', '2022-08-24 23:51:30'),
(513, 135, NULL, '10115', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 08:40:08', '2022-08-24 23:51:30'),
(514, 136, NULL, '10116', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 09:29:48', '2022-08-24 23:51:07'),
(515, 136, NULL, '10117', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 09:29:48', '2022-08-24 23:51:07'),
(516, 136, NULL, '10118', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 09:29:48', '2022-08-24 23:51:07'),
(517, 136, NULL, '10119', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 09:29:48', '2022-08-24 23:51:07'),
(518, 136, NULL, '10120', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 09:29:48', '2022-08-24 23:51:07'),
(519, 137, NULL, '10126', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 09:35:42', '2022-08-24 23:50:53'),
(520, 137, NULL, '10127', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 09:35:42', '2022-08-24 23:50:53'),
(521, 137, NULL, '10128', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 09:35:42', '2022-08-24 23:50:53'),
(522, 137, NULL, '10129', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 09:35:42', '2022-08-24 23:50:53'),
(523, 137, NULL, '10130', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 09:35:42', '2022-08-24 23:50:53'),
(524, 138, NULL, '10131', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 09:39:55', '2022-08-24 23:50:39'),
(525, 138, NULL, '10132', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 09:39:55', '2022-08-24 23:50:39'),
(526, 138, NULL, '10133', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 09:39:55', '2022-08-24 23:50:39'),
(527, 138, NULL, '10134', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 09:39:55', '2022-08-24 23:50:39'),
(528, 138, NULL, '10135', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 09:39:55', '2022-08-24 23:50:39'),
(529, 139, NULL, '10141', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 09:45:08', '2022-08-24 23:50:24'),
(530, 139, NULL, '10142', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 09:45:08', '2022-08-24 23:50:24'),
(531, 139, NULL, '10143', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 09:45:08', '2022-08-24 23:50:24'),
(532, 139, NULL, '10144', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 09:45:08', '2022-08-24 23:50:24'),
(533, 139, NULL, '10145', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 09:45:08', '2022-08-24 23:50:24'),
(534, 140, NULL, '10136', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 09:54:45', '2022-08-24 23:50:07'),
(535, 140, NULL, '10137', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 09:54:45', '2022-08-24 23:50:07'),
(536, 140, NULL, '10138', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 09:54:45', '2022-08-24 23:50:07'),
(537, 140, NULL, '10139', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 09:54:45', '2022-08-24 23:50:07'),
(538, 140, NULL, '10136', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 09:54:45', '2022-08-24 23:50:07'),
(539, 141, NULL, '10146', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 10:09:11', '2022-08-24 23:49:19'),
(540, 141, NULL, '10147', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 10:09:11', '2022-08-24 23:49:19'),
(541, 141, NULL, '10148', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 10:09:11', '2022-08-24 23:49:19'),
(542, 141, NULL, '10149', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 10:09:11', '2022-08-24 23:49:19'),
(543, 141, NULL, '10150', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 10:09:11', '2022-08-24 23:49:19'),
(544, 142, NULL, '10151', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 10:16:33', '2022-08-24 23:49:06'),
(545, 142, NULL, '10152', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 10:16:33', '2022-08-24 23:49:06'),
(546, 142, NULL, '10153', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 10:16:33', '2022-08-24 23:49:06'),
(547, 142, NULL, '10154', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 10:16:33', '2022-08-24 23:49:06'),
(548, 142, NULL, '10155', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 10:16:33', '2022-08-24 23:49:06'),
(549, 143, NULL, '10156', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 10:19:40', '2022-08-24 23:48:51'),
(550, 143, NULL, '10157', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 10:19:40', '2022-08-24 23:48:51'),
(551, 143, NULL, '10158', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 10:19:40', '2022-08-24 23:48:51'),
(552, 143, NULL, '10159', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 10:19:40', '2022-08-24 23:48:51'),
(553, 143, NULL, '10160', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 10:19:40', '2022-08-24 23:48:51'),
(554, 144, NULL, 'test', '100', NULL, '100', 'S', NULL, NULL, '1', '2022-07-16 10:53:38', '2022-07-16 10:53:38'),
(555, 145, NULL, '10186', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-07-16 13:40:30', '2022-08-24 23:48:30'),
(556, 145, NULL, '10187', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-07-16 13:40:30', '2022-08-24 23:48:30'),
(557, 145, NULL, '10188', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-07-16 13:40:30', '2022-08-24 23:48:30'),
(558, 145, NULL, '10189', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-07-16 13:40:30', '2022-08-24 23:48:30'),
(559, 145, NULL, '10190', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-07-16 13:40:30', '2022-08-24 23:48:30'),
(560, 146, NULL, '10191', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-07-16 13:52:04', '2022-08-24 23:48:14'),
(561, 146, NULL, '10192', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-07-16 13:52:04', '2022-08-24 23:48:14'),
(562, 146, NULL, '10193', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-07-16 13:52:04', '2022-08-24 23:48:14'),
(563, 146, NULL, '10194', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-07-16 13:52:04', '2022-08-24 23:48:14'),
(564, 146, NULL, '10195', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-07-16 13:52:04', '2022-08-24 23:48:14'),
(565, 147, NULL, '10196', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-07-16 13:59:14', '2022-08-24 23:47:56'),
(566, 147, NULL, '10197', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-07-16 13:59:14', '2022-08-24 23:47:56'),
(567, 147, NULL, '10198', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-07-16 13:59:14', '2022-08-24 23:47:56'),
(568, 147, NULL, '10199', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-07-16 13:59:14', '2022-08-24 23:47:56'),
(569, 147, NULL, '10200', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-07-16 13:59:14', '2022-08-24 23:47:56'),
(570, 148, NULL, '10201', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-07-16 14:08:38', '2022-08-24 23:47:41'),
(571, 148, NULL, '10202', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-07-16 14:08:38', '2022-08-24 23:47:41'),
(572, 148, NULL, '10203', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-07-16 14:08:38', '2022-08-24 23:47:41'),
(573, 148, NULL, '10204', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-07-16 14:08:38', '2022-08-24 23:47:41'),
(574, 148, NULL, '10205', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-07-16 14:08:38', '2022-08-24 23:47:41'),
(575, 149, NULL, '10206', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-07-16 14:13:42', '2022-08-24 23:47:26'),
(576, 149, NULL, '10207', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-07-16 14:13:42', '2022-08-24 23:47:26'),
(577, 149, NULL, '10208', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-07-16 14:13:42', '2022-08-24 23:47:26'),
(578, 149, NULL, '10209', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-07-16 14:13:42', '2022-08-24 23:47:26'),
(579, 149, NULL, '10210', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-07-16 14:13:42', '2022-08-24 23:47:26'),
(580, 150, NULL, '10211', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-07-16 14:22:27', '2022-08-24 23:47:05'),
(581, 150, NULL, '10212', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-07-16 14:22:27', '2022-08-24 23:47:05'),
(582, 150, NULL, '10213', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-07-16 14:22:27', '2022-08-24 23:47:05'),
(583, 150, NULL, '10214', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-07-16 14:22:27', '2022-08-24 23:47:05'),
(584, 150, NULL, '10214', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-07-16 14:22:27', '2022-08-24 23:47:05'),
(585, 151, NULL, '10216', '149', NULL, '249', 'S', NULL, NULL, '6', '2022-07-16 14:42:35', '2022-08-24 23:46:49'),
(586, 151, NULL, '10217', '149', NULL, '249', 'M', NULL, NULL, '6', '2022-07-16 14:42:35', '2022-08-24 23:46:49'),
(587, 151, NULL, '10218', '149', NULL, '249', 'L', NULL, NULL, '6', '2022-07-16 14:42:35', '2022-08-24 23:46:49'),
(588, 151, NULL, '10219', '149', NULL, '249', 'XL', NULL, NULL, '6', '2022-07-16 14:42:35', '2022-08-24 23:46:49'),
(589, 151, NULL, '10220', '149', NULL, '249', 'XXL', NULL, NULL, '6', '2022-07-16 14:42:35', '2022-08-24 23:46:49'),
(590, 152, NULL, '10221', '149', NULL, '249', 'S', NULL, NULL, '6', '2022-07-16 14:52:03', '2022-08-24 23:46:33'),
(591, 152, NULL, '10222', '149', NULL, '249', 'M', NULL, NULL, '6', '2022-07-16 14:52:03', '2022-08-24 23:46:33'),
(592, 152, NULL, '10223', '149', NULL, '249', 'L', NULL, NULL, '6', '2022-07-16 14:52:03', '2022-08-24 23:46:33'),
(593, 152, NULL, '10224', '149', NULL, '249', 'XL', NULL, NULL, '6', '2022-07-16 14:52:03', '2022-08-24 23:46:33'),
(594, 152, NULL, '10225', '149', NULL, '249', 'XXL', NULL, NULL, '6', '2022-07-16 14:52:03', '2022-08-24 23:46:33'),
(595, 153, NULL, '10226', '149', NULL, '249', 'S', NULL, NULL, '6', '2022-07-16 15:12:07', '2022-08-24 23:46:14'),
(596, 153, NULL, '10227', '149', NULL, '249', 'M', NULL, NULL, '6', '2022-07-16 15:12:07', '2022-08-24 23:46:14'),
(597, 153, NULL, '10228', '149', NULL, '249', 'L', NULL, NULL, '6', '2022-07-16 15:12:07', '2022-08-24 23:46:14'),
(598, 153, NULL, '10229', '149', NULL, '249', 'XL', NULL, NULL, '6', '2022-07-16 15:12:07', '2022-08-24 23:46:14'),
(599, 153, NULL, '10230', '149', NULL, '249', 'XXL', NULL, NULL, '6', '2022-07-16 15:12:07', '2022-08-24 23:46:14'),
(600, 154, NULL, '10273', '149', NULL, '239', 'S', NULL, NULL, '1', '2022-07-16 15:39:26', '2022-08-24 23:45:58'),
(601, 154, NULL, '10274', '149', NULL, '239', 'M', NULL, NULL, '1', '2022-07-16 15:39:26', '2022-08-24 23:45:58'),
(602, 154, NULL, '10275', '149', NULL, '239', 'L', NULL, NULL, '1', '2022-07-16 15:39:26', '2022-08-24 23:45:58'),
(603, 154, NULL, '10276', '149', NULL, '239', 'XL', NULL, NULL, '1', '2022-07-16 15:39:26', '2022-08-24 23:45:58'),
(604, 154, NULL, '10277', '149', NULL, '239', 'XXL', NULL, NULL, '1', '2022-07-16 15:39:26', '2022-08-24 23:45:58'),
(605, 155, NULL, '10278', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 16:19:57', '2022-08-24 23:45:39'),
(606, 155, NULL, '10279', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 16:19:57', '2022-08-24 23:45:39'),
(607, 155, NULL, '10280', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 16:19:57', '2022-08-24 23:45:39'),
(608, 155, NULL, '10281', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 16:19:57', '2022-08-24 23:45:39'),
(609, 155, NULL, '10282', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 16:19:57', '2022-08-24 23:45:39'),
(610, 156, NULL, '10288', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 16:25:50', '2022-08-24 23:45:22'),
(611, 156, NULL, '10289', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 16:25:50', '2022-08-24 23:45:22'),
(612, 156, NULL, '10290', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 16:25:50', '2022-08-24 23:45:22'),
(613, 156, NULL, '10291', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 16:25:50', '2022-08-24 23:45:22'),
(614, 156, NULL, '10292', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 16:25:50', '2022-08-24 23:45:22'),
(615, 157, NULL, '10293', '149', NULL, '239', 'S', NULL, NULL, '2', '2022-07-16 16:35:11', '2022-08-24 23:45:06'),
(616, 157, NULL, '10294', '149', NULL, '239', 'M', NULL, NULL, '2', '2022-07-16 16:35:11', '2022-08-24 23:45:06'),
(617, 157, NULL, '10295', '149', NULL, '239', 'L', NULL, NULL, '2', '2022-07-16 16:35:11', '2022-08-24 23:45:06'),
(618, 157, NULL, '10296', '149', NULL, '239', 'XL', NULL, NULL, '2', '2022-07-16 16:35:11', '2022-08-24 23:45:06'),
(619, 157, NULL, '10297', '149', NULL, '239', 'XXL', NULL, NULL, '2', '2022-07-16 16:35:11', '2022-08-24 23:45:06'),
(620, 158, NULL, '10298', '89', NULL, '129', 'M', NULL, NULL, '2', '2022-07-16 16:54:47', '2022-08-24 23:44:50'),
(621, 158, NULL, '10299', '89', NULL, '129', 'L', NULL, NULL, '2', '2022-07-16 16:54:47', '2022-08-24 23:44:50'),
(622, 158, NULL, '10300', '89', NULL, '129', 'XL', NULL, NULL, '2', '2022-07-16 16:54:47', '2022-08-24 23:44:50'),
(623, 158, NULL, '10301', '89', NULL, '129', 'XXL', NULL, NULL, '2', '2022-07-16 16:54:47', '2022-08-24 23:44:50'),
(624, 159, NULL, '10302', '89', NULL, '129', 'M', NULL, NULL, '2', '2022-07-16 16:58:22', '2022-08-24 23:44:29'),
(625, 159, NULL, '10303', '89', NULL, '129', 'L', NULL, NULL, '2', '2022-07-16 16:58:22', '2022-08-24 23:44:29'),
(626, 159, NULL, '10304', '89', NULL, '129', 'XL', NULL, NULL, '2', '2022-07-16 16:58:22', '2022-08-24 23:44:29'),
(627, 159, NULL, '10305', '89', NULL, '129', 'XXL', NULL, NULL, '2', '2022-07-16 16:58:22', '2022-08-24 23:44:29'),
(628, 160, NULL, '10306', '89', NULL, '129', 'M', NULL, NULL, '1', '2022-07-16 17:07:42', '2022-08-24 23:44:06'),
(629, 160, NULL, '10307', '89', NULL, '129', 'L', NULL, NULL, '2', '2022-07-16 17:07:42', '2022-08-24 23:44:06'),
(630, 160, NULL, '10309', '89', NULL, '129', 'XXL', NULL, NULL, '1', '2022-07-16 17:07:42', '2022-08-24 23:44:06'),
(631, 161, NULL, '10310', '89', NULL, '129', 'M', NULL, NULL, '2', '2022-07-16 17:11:16', '2022-08-24 23:43:48'),
(632, 161, NULL, '10311', '89', NULL, '129', 'L', NULL, NULL, '2', '2022-07-16 17:11:16', '2022-08-24 23:43:48'),
(633, 161, NULL, '10312', '89', NULL, '129', 'XL', NULL, NULL, '2', '2022-07-16 17:11:16', '2022-08-24 23:43:48'),
(634, 161, NULL, '10313', '89', NULL, '129', 'XXL', NULL, NULL, '2', '2022-07-16 17:11:16', '2022-08-24 23:43:48'),
(635, 162, NULL, '10314', '89', NULL, '129', 'M', NULL, NULL, '2', '2022-07-16 18:34:31', '2022-08-24 23:43:28'),
(636, 162, NULL, '10315', '89', NULL, '129', 'L', NULL, NULL, '2', '2022-07-16 18:34:31', '2022-08-24 23:43:28'),
(637, 162, NULL, '10316', '89', NULL, '129', 'XL', NULL, NULL, '2', '2022-07-16 18:34:31', '2022-08-24 23:43:28'),
(638, 162, NULL, '10317', '89', NULL, '129', 'XXL', NULL, NULL, '2', '2022-07-16 18:34:31', '2022-08-24 23:43:28'),
(639, 163, NULL, '10318', '89', NULL, '129', 'M', NULL, NULL, '2', '2022-07-16 18:37:35', '2022-08-24 23:43:08'),
(640, 163, NULL, '10319', '89', NULL, '129', 'L', NULL, NULL, '2', '2022-07-16 18:37:35', '2022-08-24 23:43:08'),
(641, 163, NULL, '10320', '89', NULL, '129', 'XL', NULL, NULL, '2', '2022-07-16 18:37:35', '2022-08-24 23:43:08'),
(642, 163, NULL, '10321', '89', NULL, '129', 'XXL', NULL, NULL, '2', '2022-07-16 18:37:35', '2022-08-24 23:43:08'),
(643, 164, NULL, '10322', '89', NULL, '129', 'M', NULL, NULL, '2', '2022-07-17 07:05:29', '2022-08-24 23:42:34'),
(644, 164, NULL, '10323', '89', NULL, '129', 'L', NULL, NULL, '2', '2022-07-17 07:05:29', '2022-08-24 23:42:34'),
(645, 164, NULL, '10324', '89', NULL, '129', 'XL', NULL, NULL, '2', '2022-07-17 07:05:29', '2022-08-24 23:42:34'),
(646, 164, NULL, '10325', '89', NULL, '129', 'XXL', NULL, NULL, '2', '2022-07-17 07:05:29', '2022-08-24 23:42:34'),
(647, 165, NULL, '10341', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-07-20 18:20:22', '2022-08-24 23:42:02'),
(648, 165, NULL, '10342', '149', NULL, '249', 'M', NULL, NULL, '3', '2022-07-20 18:20:22', '2022-08-24 23:42:02'),
(649, 165, NULL, '10343', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-07-20 18:20:22', '2022-08-24 23:42:02'),
(650, 165, NULL, '10344', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-07-20 18:20:22', '2022-08-24 23:42:02'),
(651, 165, NULL, '10345', '149', NULL, '249', 'XXL', NULL, NULL, '4', '2022-07-20 18:20:22', '2022-08-24 23:42:02'),
(652, 166, NULL, '11088', '179', NULL, '229', 'S', NULL, NULL, '4', '2022-07-24 16:52:45', '2022-08-09 09:30:59'),
(653, 166, NULL, '11089', '179', NULL, '229', 'M', NULL, NULL, '4', '2022-07-24 16:52:45', '2022-08-09 09:30:59'),
(654, 166, NULL, '11090', '179', NULL, '229', 'L', NULL, NULL, '4', '2022-07-24 16:52:45', '2022-08-09 09:30:59'),
(655, 166, NULL, '11091', '179', NULL, '229', 'XL', NULL, NULL, '4', '2022-07-24 16:52:45', '2022-08-09 09:30:59'),
(656, 166, NULL, '11092', '179', NULL, '229', 'XXL', NULL, NULL, '2', '2022-07-24 16:52:45', '2022-08-09 09:30:59'),
(657, 167, NULL, '10346', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-07-28 09:05:45', '2022-08-24 23:40:39'),
(658, 167, NULL, '10347', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-07-28 09:05:45', '2022-08-24 23:40:39'),
(659, 167, NULL, '10348', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-07-28 09:05:45', '2022-08-24 23:40:39'),
(660, 167, NULL, '10349', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-07-28 09:05:45', '2022-08-24 23:40:39'),
(661, 167, NULL, '10350', '149', NULL, '249', 'XXL', NULL, NULL, '4', '2022-07-28 09:05:45', '2022-08-24 23:40:39'),
(662, 168, NULL, '10351', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-07-28 09:32:28', '2022-08-24 23:40:17'),
(663, 168, NULL, '10352', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-07-28 09:32:28', '2022-08-24 23:40:17'),
(664, 168, NULL, '10353', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-07-28 09:32:28', '2022-08-24 23:40:17'),
(665, 168, NULL, '10354', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-07-28 09:32:28', '2022-08-24 23:40:17'),
(666, 168, NULL, '10355', '149', NULL, '249', 'XXL', NULL, NULL, '4', '2022-07-28 09:32:28', '2022-08-24 23:40:17'),
(667, 169, NULL, '123', '123', NULL, '222', 'S', NULL, NULL, '1', '2022-07-28 10:14:47', '2022-07-28 10:14:47'),
(668, 170, NULL, '10356', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-07-30 17:09:12', '2022-08-24 23:39:59'),
(669, 170, NULL, '10357', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-07-30 17:09:12', '2022-08-24 23:39:59'),
(670, 170, NULL, '10358', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-07-30 17:09:12', '2022-08-24 23:39:59'),
(671, 170, NULL, '10359', '149', NULL, '249', 'XL', NULL, NULL, '3', '2022-07-30 17:09:12', '2022-08-24 23:39:59'),
(672, 170, NULL, '10360', '149', NULL, '249', 'XXL', NULL, NULL, '4', '2022-07-30 17:09:12', '2022-08-24 23:39:59'),
(673, 171, NULL, '10361', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-07-30 17:44:22', '2022-08-24 23:39:41'),
(674, 171, NULL, '10362', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-07-30 17:44:22', '2022-08-24 23:39:41'),
(675, 171, NULL, '10363', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-07-30 17:44:22', '2022-08-24 23:39:41'),
(676, 171, NULL, '10364', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-07-30 17:44:22', '2022-08-24 23:39:41'),
(677, 171, NULL, '10365', '149', NULL, '249', 'XXL', NULL, NULL, '2', '2022-07-30 17:44:22', '2022-08-24 23:39:41'),
(678, 172, NULL, '10351', '199', NULL, '249', 'S', NULL, NULL, '4', '2022-07-31 19:10:36', '2022-07-31 19:10:36'),
(679, 172, NULL, '10352', '199', NULL, '249', 'M', NULL, NULL, '4', '2022-07-31 19:10:36', '2022-07-31 19:10:36'),
(680, 172, NULL, '10353', '199', NULL, '249', 'L', NULL, NULL, '4', '2022-07-31 19:10:36', '2022-07-31 19:10:36'),
(681, 172, NULL, '10354', '199', NULL, '249', 'XL', NULL, NULL, '4', '2022-07-31 19:10:36', '2022-07-31 19:10:36'),
(682, 172, NULL, '10355', '199', NULL, '249', 'XXL', NULL, NULL, '4', '2022-07-31 19:10:36', '2022-07-31 19:10:36'),
(683, 173, NULL, '1234', '155', NULL, '200', 'S', NULL, NULL, '3', '2022-07-31 19:16:43', '2022-07-31 19:16:43'),
(684, 174, NULL, '123', '155', NULL, '200', 'S', NULL, NULL, '2', '2022-07-31 19:21:02', '2022-07-31 19:21:02'),
(685, 175, NULL, '10366', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-08-02 08:01:41', '2022-08-24 23:39:19'),
(686, 175, NULL, '10367', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-08-02 08:01:41', '2022-08-24 23:39:19'),
(687, 175, NULL, '10368', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-08-02 08:01:41', '2022-08-24 23:39:19'),
(688, 175, NULL, '10369', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-02 08:01:41', '2022-08-24 23:39:19'),
(689, 175, NULL, '10370', '149', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-02 08:01:41', '2022-08-24 23:39:19'),
(690, 176, NULL, '10371', '149', NULL, '229', 'S', NULL, NULL, '1', '2022-08-02 15:39:36', '2022-08-24 23:38:54'),
(691, 176, NULL, '10373', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-02 15:39:36', '2022-08-24 23:38:54'),
(692, 176, NULL, '10374', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-02 15:39:36', '2022-08-24 23:38:54'),
(693, 176, NULL, '10375', '149', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-02 15:39:36', '2022-08-24 23:38:54'),
(694, 177, NULL, '10376', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-02 16:33:23', '2022-08-24 23:38:19'),
(695, 177, NULL, '10377', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-02 16:33:23', '2022-08-24 23:38:19'),
(696, 177, NULL, '10378', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-02 16:33:23', '2022-08-24 23:38:19'),
(697, 177, NULL, '10379', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-02 16:33:23', '2022-08-24 23:38:19'),
(698, 177, NULL, '10380', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-02 16:33:23', '2022-08-24 23:38:19'),
(699, 178, NULL, '10381', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-02 16:54:48', '2022-08-24 23:37:51'),
(700, 178, NULL, '10382', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-02 16:54:48', '2022-08-24 23:37:51'),
(701, 178, NULL, '10383', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-02 16:54:48', '2022-08-24 23:37:51'),
(702, 178, NULL, '10384', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-02 16:54:48', '2022-08-24 23:37:51'),
(703, 178, NULL, '10385', '149', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-02 16:54:48', '2022-08-24 23:37:51'),
(704, 179, NULL, '10386', '149', NULL, '229', 'S', NULL, NULL, '1', '2022-08-02 17:14:57', '2022-08-24 23:37:35'),
(705, 179, NULL, '10387', '149', NULL, '229', 'M', NULL, NULL, '1', '2022-08-02 17:14:57', '2022-08-24 23:37:35'),
(706, 179, NULL, '10388', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-02 17:14:57', '2022-08-24 23:37:35'),
(707, 179, NULL, '10390', '149', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-02 17:14:57', '2022-08-24 23:37:35'),
(708, 180, NULL, '2342', '120', NULL, '200', 'Yellow', NULL, NULL, '5', '2022-08-04 12:45:37', '2022-08-04 12:45:37'),
(709, 181, NULL, '10411', '189', NULL, '239', 'S', NULL, NULL, '2', '2022-08-04 14:02:54', '2022-08-24 23:37:12'),
(710, 181, NULL, '10412', '189', NULL, '239', 'M', NULL, NULL, '2', '2022-08-04 14:02:54', '2022-08-24 23:37:12'),
(711, 181, NULL, '10413', '189', NULL, '239', 'L', NULL, NULL, '2', '2022-08-04 14:02:54', '2022-08-24 23:37:12'),
(712, 181, NULL, '10414', '189', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-04 14:02:54', '2022-08-24 23:37:12'),
(713, 181, NULL, '10415', '189', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-04 14:02:54', '2022-08-24 23:37:12'),
(714, 182, NULL, '10421', '135', NULL, '169', 'S', NULL, NULL, '1', '2022-08-04 14:51:16', '2022-08-24 23:36:50'),
(715, 182, NULL, '10422', '135', NULL, '169', 'M', NULL, NULL, '2', '2022-08-04 14:51:16', '2022-08-24 23:36:50'),
(716, 182, NULL, '10423', '135', NULL, '169', 'L', NULL, NULL, '1', '2022-08-04 14:51:16', '2022-08-24 23:36:50'),
(717, 182, NULL, '10424', '135', NULL, '169', 'XL', NULL, NULL, '1', '2022-08-04 14:51:16', '2022-08-24 23:36:50'),
(718, 182, NULL, '10425', '135', NULL, '169', 'XXL', NULL, NULL, '1', '2022-08-04 14:51:16', '2022-08-24 23:36:50'),
(719, 183, NULL, '10426', '135', NULL, '169', 'S', NULL, NULL, '1', '2022-08-04 15:06:42', '2022-08-24 23:36:26'),
(720, 183, NULL, '10428', '135', NULL, '169', 'L', NULL, NULL, '1', '2022-08-04 15:06:42', '2022-08-24 23:36:26'),
(721, 183, NULL, '10429', '135', NULL, '169', 'XL', NULL, NULL, '1', '2022-08-04 15:06:42', '2022-08-24 23:36:26'),
(722, 183, NULL, '10430', '135', NULL, '169', 'XXL', NULL, NULL, '1', '2022-08-04 15:06:42', '2022-08-24 23:36:26'),
(723, 184, NULL, '10431', '135', NULL, '169', 'S', NULL, NULL, '2', '2022-08-04 15:18:07', '2022-08-24 23:36:03'),
(724, 184, NULL, '10434', '135', NULL, '169', 'XL', NULL, NULL, '1', '2022-08-04 15:18:07', '2022-08-24 23:36:03'),
(725, 184, NULL, '10435', '135', NULL, '169', 'XXL;', NULL, NULL, '2', '2022-08-04 15:18:07', '2022-08-24 23:36:03'),
(726, 185, NULL, '10436', '199', NULL, '249', 'S', NULL, NULL, '3', '2022-08-04 15:31:05', '2022-08-24 23:35:31'),
(727, 185, NULL, '10437', '199', NULL, '249', 'M', NULL, NULL, '3', '2022-08-04 15:31:05', '2022-08-24 23:35:31'),
(728, 185, NULL, '10438', '199', NULL, '249', 'L', NULL, NULL, '3', '2022-08-04 15:31:05', '2022-08-24 23:35:31'),
(729, 185, NULL, '10439', '199', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-04 15:31:05', '2022-08-24 23:35:31'),
(730, 185, NULL, '10440', '199', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-04 15:31:05', '2022-08-24 23:35:31'),
(731, 186, NULL, '10441', '199', NULL, '249', 'S', NULL, NULL, '4', '2022-08-04 15:36:21', '2022-08-24 23:35:11'),
(732, 186, NULL, '10442', '199', NULL, '249', 'M', NULL, NULL, '4', '2022-08-04 15:36:21', '2022-08-24 23:35:11'),
(733, 186, NULL, '10441', '199', NULL, '249', 'L', NULL, NULL, '3', '2022-08-04 15:36:21', '2022-08-24 23:35:11'),
(734, 186, NULL, '10441', '199', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-04 15:36:21', '2022-08-24 23:35:11'),
(735, 186, NULL, '10441', '199', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-04 15:36:21', '2022-08-24 23:35:11'),
(736, 187, NULL, '10451', '199', NULL, '249', 'S', NULL, NULL, '4', '2022-08-04 16:44:43', '2022-08-24 23:34:43'),
(737, 187, NULL, '10452', '199', NULL, '249', 'M', NULL, NULL, '4', '2022-08-04 16:44:43', '2022-08-24 23:34:43'),
(738, 187, NULL, '10453', '199', NULL, '249', 'L', NULL, NULL, '3', '2022-08-04 16:44:43', '2022-08-24 23:34:43'),
(739, 187, NULL, '10454', '199', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-04 16:44:43', '2022-08-24 23:34:43'),
(740, 187, NULL, '10455', '199', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-04 16:44:43', '2022-08-24 23:34:43'),
(741, 188, NULL, '10456', '199', NULL, '249', 'S', NULL, NULL, '3', '2022-08-04 16:54:55', '2022-08-24 23:34:14'),
(742, 188, NULL, '10457', '199', NULL, '249', 'M', NULL, NULL, '3', '2022-08-04 16:54:55', '2022-08-24 23:34:14'),
(743, 188, NULL, '10458', '199', NULL, '249', 'L', NULL, NULL, '3', '2022-08-04 16:54:55', '2022-08-24 23:34:14'),
(744, 188, NULL, '10459', '199', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-04 16:54:55', '2022-08-24 23:34:14'),
(745, 188, NULL, '10460', '199', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-04 16:54:55', '2022-08-24 23:34:14'),
(746, 189, NULL, '10461', '199', NULL, '249', 'S', NULL, NULL, '4', '2022-08-04 17:12:42', '2022-08-24 23:33:43'),
(747, 189, NULL, '10462', '199', NULL, '249', 'M', NULL, NULL, '4', '2022-08-04 17:12:42', '2022-08-24 23:33:43'),
(748, 189, NULL, '10463', '199', NULL, '249', 'L', NULL, NULL, '4', '2022-08-04 17:12:42', '2022-08-24 23:33:43'),
(749, 189, NULL, '10464', '199', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-04 17:12:42', '2022-08-24 23:33:43'),
(750, 189, NULL, '10465', '199', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-04 17:12:42', '2022-08-24 23:33:43'),
(751, 190, NULL, '10496', '99', NULL, '129', 'S', NULL, NULL, '4', '2022-08-06 07:41:28', '2022-08-24 23:33:05'),
(752, 190, NULL, '10497', '99', NULL, '129', 'M', NULL, NULL, '2', '2022-08-06 07:41:28', '2022-08-24 23:33:05'),
(753, 190, NULL, '10498', '99', NULL, '129', 'L', NULL, NULL, '1', '2022-08-06 07:41:28', '2022-08-24 23:33:05'),
(754, 190, NULL, '10500', '99', NULL, '129', 'XXL', NULL, NULL, '3', '2022-08-06 07:41:28', '2022-08-24 23:33:05'),
(755, 191, NULL, '10506', '99', NULL, '129', 'S', NULL, NULL, '4', '2022-08-06 09:47:33', '2022-08-24 23:32:31'),
(757, 191, NULL, '10473', '179', NULL, '229', 'L', NULL, NULL, '2', '2022-08-06 09:47:33', '2022-08-24 23:32:31'),
(759, 191, NULL, '10508', '99', NULL, '129', 'L', NULL, NULL, '1', '2022-08-06 09:47:33', '2022-08-24 23:32:31'),
(760, 192, NULL, '10501', '99', NULL, '129', 'S', NULL, NULL, '4', '2022-08-06 14:03:36', '2022-08-24 23:32:07'),
(761, 192, NULL, '10502', '99', NULL, '129', 'M', NULL, NULL, '3', '2022-08-06 14:03:36', '2022-08-24 23:32:07'),
(762, 192, NULL, '10503', '99', NULL, '129', 'L', NULL, NULL, '3', '2022-08-06 14:03:36', '2022-08-24 23:32:07'),
(763, 192, NULL, '10504', '99', NULL, '129', 'XL', NULL, NULL, '3', '2022-08-06 14:03:36', '2022-08-24 23:32:07'),
(764, 192, NULL, '10505', '99', NULL, '129', 'XXL', NULL, NULL, '4', '2022-08-06 14:03:36', '2022-08-24 23:32:07'),
(765, 191, NULL, '10510', '99', NULL, '129', 'XXL', NULL, NULL, '2', '2022-08-06 14:13:53', '2022-08-24 23:32:31'),
(766, 193, NULL, '10466', '179', NULL, '229', 'S', NULL, NULL, '2', '2022-08-06 14:22:45', '2022-08-24 23:31:24'),
(767, 193, NULL, '10468', '179', NULL, '229', 'L', NULL, NULL, '1', '2022-08-06 14:22:45', '2022-08-24 23:31:24'),
(768, 193, NULL, '10469', '179', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-06 14:22:45', '2022-08-24 23:31:24'),
(769, 193, NULL, '10470', '179', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-06 14:22:45', '2022-08-24 23:31:24'),
(770, 194, NULL, '10471', '179', NULL, '229', 'S', NULL, NULL, '3', '2022-08-06 14:28:29', '2022-08-24 23:31:00'),
(771, 194, NULL, '10472', '179', NULL, '229', 'M', NULL, NULL, '2', '2022-08-06 14:28:29', '2022-08-24 23:31:00'),
(772, 194, NULL, '10473', '179', NULL, '229', 'L', NULL, NULL, '2', '2022-08-06 14:28:29', '2022-08-24 23:31:00'),
(773, 194, NULL, '10474', '179', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-06 14:28:29', '2022-08-24 23:31:00'),
(774, 194, NULL, '10475', '179', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-06 14:28:29', '2022-08-24 23:31:00'),
(775, 195, NULL, '10476', '179', NULL, '229', 'S', NULL, NULL, '1', '2022-08-06 14:35:19', '2022-08-24 23:30:26'),
(776, 195, NULL, '10477', '179', NULL, '229', 'M', NULL, NULL, '1', '2022-08-06 14:35:19', '2022-08-24 23:30:26'),
(777, 195, NULL, '10478', '179', NULL, '229', 'L', NULL, NULL, '1', '2022-08-06 14:35:19', '2022-08-24 23:30:26'),
(778, 195, NULL, '10479', '179', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-06 14:35:19', '2022-08-24 23:30:26'),
(779, 195, NULL, '10480', '179', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-06 14:35:19', '2022-08-24 23:30:26'),
(780, 196, NULL, '10481', '179', NULL, '229', 'S', NULL, NULL, '2', '2022-08-06 14:42:38', '2022-08-24 23:29:34'),
(781, 197, NULL, '10486', '179', NULL, '229', 'S', NULL, NULL, '2', '2022-08-06 14:42:46', '2022-08-24 23:29:12'),
(782, 197, NULL, '10487', '179', NULL, '229', 'M', NULL, NULL, '1', '2022-08-06 15:00:58', '2022-08-24 23:29:12'),
(783, 197, NULL, '10489', '179', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-06 15:00:58', '2022-08-24 23:29:12'),
(784, 197, NULL, '10490', '179', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-06 15:00:58', '2022-08-24 23:29:12'),
(785, 198, NULL, '10491', '179', NULL, '229', 'S', NULL, NULL, '2', '2022-08-06 15:23:32', '2022-08-24 23:28:42'),
(786, 198, NULL, '10492', '179', NULL, '229', 'M', NULL, NULL, '2', '2022-08-06 15:23:32', '2022-08-24 23:28:42'),
(787, 198, NULL, '10493', '179', NULL, '229', 'L', NULL, NULL, '2', '2022-08-06 15:23:32', '2022-08-24 23:28:42'),
(788, 198, NULL, '10494', '179', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-06 15:23:32', '2022-08-24 23:28:42'),
(789, 198, NULL, '10495', '179', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-06 15:23:32', '2022-08-24 23:28:42'),
(790, 199, NULL, '10515', '99', NULL, '129', 'S', NULL, NULL, '2', '2022-08-06 16:22:01', '2022-08-24 23:28:12'),
(791, 199, NULL, '10517', '99', NULL, '129', 'XL', NULL, NULL, '2', '2022-08-06 16:22:01', '2022-08-24 23:28:12'),
(792, 200, NULL, '10519', '99', NULL, '129', 'M', NULL, NULL, '2', '2022-08-06 17:07:12', '2022-08-24 23:27:35'),
(793, 200, NULL, '10520', '99', NULL, '129', 'L', NULL, NULL, '2', '2022-08-06 17:07:12', '2022-08-24 23:27:35'),
(794, 200, NULL, '10521', '99', NULL, '129', 'XL', NULL, NULL, '1', '2022-08-06 17:07:12', '2022-08-24 23:27:35'),
(795, 200, NULL, '10522', '99', NULL, '129', 'XXL', NULL, NULL, '1', '2022-08-06 17:07:12', '2022-08-24 23:27:35'),
(796, 201, NULL, '10527', '99', NULL, '129', 'M', NULL, NULL, '1', '2022-08-06 17:45:02', '2022-08-24 23:27:05'),
(797, 201, NULL, '10528', '99', NULL, '129', 'L', NULL, NULL, '1', '2022-08-06 17:45:02', '2022-08-24 23:27:05'),
(798, 201, NULL, '10530', '99', NULL, '129', 'XXL', NULL, NULL, '3', '2022-08-06 17:45:02', '2022-08-24 23:27:05'),
(799, 202, NULL, '10531', '99', NULL, '129', 'M', NULL, NULL, '3', '2022-08-06 17:49:42', '2022-08-24 23:25:34'),
(800, 202, NULL, '10533', '99', NULL, '129', 'XL', NULL, NULL, '1', '2022-08-06 17:49:42', '2022-08-24 23:25:34'),
(801, 202, NULL, '10534', '99', NULL, '129', 'XXL', NULL, NULL, '1', '2022-08-06 17:49:42', '2022-08-24 23:25:34'),
(802, 203, NULL, '10538', '99', NULL, '129', 'XXL', NULL, NULL, '1', '2022-08-07 07:23:58', '2022-08-24 23:25:11'),
(803, 204, NULL, '10558', '139', NULL, '169', 'S', NULL, NULL, '2', '2022-08-07 08:18:15', '2022-08-24 23:24:42'),
(804, 204, NULL, '10560', '139', NULL, '169', 'L', NULL, NULL, '1', '2022-08-07 08:18:15', '2022-08-24 23:24:42'),
(805, 204, NULL, '10561', '139', NULL, '169', 'XL', NULL, NULL, '1', '2022-08-07 08:18:15', '2022-08-24 23:24:42'),
(806, 204, NULL, '10562', '139', NULL, '169', 'XXL', NULL, NULL, '2', '2022-08-07 08:18:15', '2022-08-24 23:24:42'),
(807, 205, NULL, '10563', '139', NULL, '169', 'S', NULL, NULL, '2', '2022-08-07 08:34:54', '2022-08-24 23:17:13'),
(808, 205, NULL, '10564', '139', NULL, '169', 'M', NULL, NULL, '2', '2022-08-07 08:34:54', '2022-08-24 23:17:13'),
(809, 205, NULL, '10565', '139', NULL, '169', 'L', NULL, NULL, '1', '2022-08-07 08:34:54', '2022-08-24 23:17:13'),
(810, 205, NULL, '10566', '139', NULL, '169', 'XL', NULL, NULL, '1', '2022-08-07 08:34:54', '2022-08-24 23:17:13'),
(811, 205, NULL, '10567', '139', NULL, '169', 'XXL', NULL, NULL, '1', '2022-08-07 08:34:54', '2022-08-24 23:17:13'),
(812, 206, NULL, '10568', '139', NULL, '169', 'S', NULL, NULL, '1', '2022-08-08 12:30:16', '2022-08-24 23:17:29'),
(813, 206, NULL, '10572', '139', NULL, '169', 'XXL', NULL, NULL, '1', '2022-08-08 12:30:16', '2022-08-24 23:17:29'),
(814, 207, NULL, '10573', '179', NULL, '229', 'S', NULL, NULL, '4', '2022-08-08 12:35:53', '2022-08-24 23:13:56'),
(815, 207, NULL, '10574', '179', NULL, '229', 'M', NULL, NULL, '4', '2022-08-08 12:35:53', '2022-08-24 23:13:56'),
(816, 207, NULL, '10575', '179', NULL, '229', 'L', NULL, NULL, '4', '2022-08-08 12:35:53', '2022-08-24 23:13:56'),
(817, 207, NULL, '10576', '179', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-08 12:35:53', '2022-08-24 23:13:56'),
(818, 207, NULL, '10577', '179', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-08 12:35:53', '2022-08-24 23:13:56'),
(819, 208, NULL, '10578', '179', NULL, '229', 'S', NULL, NULL, '3', '2022-08-08 13:13:44', '2022-08-24 23:13:36'),
(820, 208, NULL, '10579', '179', NULL, '229', 'M', NULL, NULL, '3', '2022-08-08 13:13:44', '2022-08-24 23:13:36'),
(821, 208, NULL, '10580', '179', NULL, '229', 'L', NULL, NULL, '3', '2022-08-08 13:13:44', '2022-08-24 23:13:36'),
(822, 208, NULL, '10581', '179', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-08 13:13:44', '2022-08-24 23:13:36'),
(823, 208, NULL, '10582', '179', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-08 13:13:44', '2022-08-24 23:13:36'),
(824, 209, NULL, '10583', '179', NULL, '229', 'S', NULL, NULL, '4', '2022-08-08 13:20:30', '2022-08-24 23:13:18'),
(825, 209, NULL, '10584', '179', NULL, '229', 'M', NULL, NULL, '3', '2022-08-08 13:20:30', '2022-08-24 23:13:18'),
(826, 209, NULL, '10585', '179', NULL, '229', 'L', NULL, NULL, '4', '2022-08-08 13:20:30', '2022-08-24 23:13:18'),
(827, 209, NULL, '10586', '179', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-08 13:20:30', '2022-08-24 23:13:18'),
(828, 209, NULL, '10587', '179', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-08 13:20:30', '2022-08-24 23:13:18'),
(829, 210, NULL, '10588', '179', NULL, '229', 'S', NULL, NULL, '3', '2022-08-08 13:25:13', '2022-08-24 23:12:49'),
(830, 210, NULL, '10589', '179', NULL, '229', 'M', NULL, NULL, '4', '2022-08-08 13:25:13', '2022-08-24 23:12:49'),
(831, 210, NULL, '10590', '179', NULL, '229', 'L', NULL, NULL, '3', '2022-08-08 13:25:13', '2022-08-24 23:12:49'),
(832, 210, NULL, '10591', '179', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-08 13:25:13', '2022-08-24 23:12:49'),
(833, 210, NULL, '10592', '179', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-08 13:25:13', '2022-08-24 23:12:49'),
(834, 211, NULL, '10593', '179', NULL, '229', 'S', NULL, NULL, '3', '2022-08-08 13:30:13', '2022-08-24 23:12:21'),
(835, 211, NULL, '10594', '179', NULL, '229', 'M', NULL, NULL, '3', '2022-08-08 13:30:13', '2022-08-24 23:12:21'),
(836, 211, NULL, '10595', '179', NULL, '229', 'L', NULL, NULL, '3', '2022-08-08 13:30:13', '2022-08-24 23:12:21'),
(837, 211, NULL, '10596', '179', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-08 13:30:13', '2022-08-24 23:12:21'),
(838, 211, NULL, '10597', '179', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-08 13:30:13', '2022-08-24 23:12:21'),
(839, 212, NULL, '10598', '179', NULL, '229', 'S', NULL, NULL, '4', '2022-08-08 13:40:43', '2022-08-24 23:11:41'),
(840, 212, NULL, '10599', '179', NULL, '229', 'M', NULL, NULL, '4', '2022-08-08 13:40:43', '2022-08-24 23:11:41'),
(841, 212, NULL, '10600', '179', NULL, '229', 'L', NULL, NULL, '4', '2022-08-08 13:40:43', '2022-08-24 23:11:41'),
(842, 212, NULL, '10601', '179', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-08 13:40:43', '2022-08-24 23:11:41'),
(843, 212, NULL, '10602', '179', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-08 13:40:43', '2022-08-24 23:11:41'),
(844, 213, NULL, '10603', '199', NULL, '249', 'S', NULL, NULL, '4', '2022-08-09 14:10:22', '2022-08-09 14:14:24'),
(845, 213, NULL, '10604', '199', NULL, '249', 'M', NULL, NULL, '4', '2022-08-09 14:10:22', '2022-08-09 14:14:24'),
(846, 213, NULL, '10605', '199', NULL, '249', 'L', NULL, NULL, '4', '2022-08-09 14:10:22', '2022-08-09 14:14:24'),
(847, 213, NULL, '10606', '199', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-09 14:10:22', '2022-08-09 14:14:24'),
(848, 213, NULL, '10607', '199', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-09 14:10:22', '2022-08-09 14:14:24'),
(849, 214, NULL, '10603', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-08-09 18:18:22', '2022-08-24 23:11:14'),
(850, 214, NULL, '10604', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-08-09 18:18:22', '2022-08-24 23:11:14'),
(851, 214, NULL, '10605', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-08-09 18:18:22', '2022-08-24 23:11:14'),
(852, 214, NULL, '10606', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-09 18:18:22', '2022-08-24 23:11:14'),
(853, 214, NULL, '10607', '149', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-09 18:18:22', '2022-08-24 23:11:14'),
(854, 215, NULL, '10608', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-08-10 07:39:14', '2022-08-24 23:10:52'),
(855, 215, NULL, '10609', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-08-10 07:39:14', '2022-08-24 23:10:52'),
(856, 215, NULL, '10610', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-08-10 07:39:14', '2022-08-24 23:10:52'),
(857, 215, NULL, '10611', '149', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-10 07:39:14', '2022-08-24 23:10:52'),
(858, 215, NULL, '10612', '149', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-10 07:39:14', '2022-08-24 23:10:52'),
(859, 216, NULL, '10613', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-08-10 07:54:46', '2022-08-24 23:10:28'),
(860, 216, NULL, '10614', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-08-10 07:54:46', '2022-08-24 23:10:28'),
(861, 216, NULL, '10615', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-08-10 07:54:46', '2022-08-24 23:10:28'),
(862, 216, NULL, '10616', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-10 07:54:46', '2022-08-24 23:10:28'),
(863, 216, NULL, '10617', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-10 07:54:46', '2022-08-24 23:10:28'),
(864, 217, NULL, '10618', '129', NULL, '169', 'S', NULL, NULL, '3', '2022-08-10 08:11:43', '2022-08-24 23:21:13'),
(865, 217, NULL, '10619', '129', NULL, '169', 'M', NULL, NULL, '3', '2022-08-10 08:11:43', '2022-08-24 23:21:13'),
(866, 217, NULL, '10620', '129', NULL, '169', 'L', NULL, NULL, '3', '2022-08-10 08:11:43', '2022-08-24 23:21:13'),
(867, 217, NULL, '10621', '129', NULL, '169', 'XL', NULL, NULL, '3', '2022-08-10 08:11:43', '2022-08-24 23:21:13'),
(868, 217, NULL, '10622', '129', NULL, '169', 'XXL', NULL, NULL, '3', '2022-08-10 08:11:43', '2022-08-24 23:21:13'),
(869, 218, NULL, '10623', '129', NULL, '169', 'S', NULL, NULL, '2', '2022-08-10 08:26:03', '2022-08-24 23:19:25'),
(870, 218, NULL, '10624', '129', NULL, '169', 'M', NULL, NULL, '3', '2022-08-10 08:26:03', '2022-08-24 23:19:25'),
(871, 218, NULL, '10625', '129', NULL, '169', 'L', NULL, NULL, '3', '2022-08-10 08:26:03', '2022-08-24 23:19:25'),
(872, 218, NULL, '10626', '129', NULL, '169', 'XL', NULL, NULL, '3', '2022-08-10 08:26:03', '2022-08-24 23:19:26'),
(873, 218, NULL, '10627', '129', NULL, '169', 'XXL', NULL, NULL, '3', '2022-08-10 08:26:03', '2022-08-24 23:19:26'),
(874, 219, NULL, '10628', '129', NULL, '169', 'S', NULL, NULL, '3', '2022-08-10 08:44:11', '2022-08-24 23:20:25'),
(875, 219, NULL, '10629', '129', NULL, '169', 'M', NULL, NULL, '3', '2022-08-10 08:44:11', '2022-08-24 23:20:25'),
(876, 219, NULL, '10630', '129', NULL, '169', 'L', NULL, NULL, '1', '2022-08-10 08:44:11', '2022-08-24 23:20:25'),
(877, 219, NULL, '10631', '129', NULL, '169', 'XL', NULL, NULL, '3', '2022-08-10 08:44:11', '2022-08-24 23:20:25'),
(878, 219, NULL, '10632', '129', NULL, '169', 'XXL', NULL, NULL, '3', '2022-08-10 08:44:11', '2022-08-24 23:20:25'),
(879, 220, NULL, '10633', '159', NULL, '229', 'S', NULL, NULL, '3', '2022-08-10 08:59:43', '2022-08-24 23:08:15'),
(880, 220, NULL, '10634', '159', NULL, '229', 'M', NULL, NULL, '4', '2022-08-10 08:59:43', '2022-08-24 23:08:15'),
(881, 220, NULL, '10635', '159', NULL, '229', 'L', NULL, NULL, '4', '2022-08-10 08:59:43', '2022-08-24 23:08:15'),
(882, 220, NULL, '10636', '159', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-10 08:59:43', '2022-08-24 23:08:15'),
(883, 220, NULL, '10637', '159', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-10 08:59:43', '2022-08-24 23:08:15'),
(884, 221, NULL, '10633', '159', NULL, '229', 'S', NULL, NULL, '3', '2022-08-10 09:37:07', '2022-08-24 23:08:29'),
(885, 221, NULL, '10634', '159', NULL, '229', 'M', NULL, NULL, '4', '2022-08-10 09:37:07', '2022-08-24 23:08:29'),
(886, 221, NULL, '10635', '159', NULL, '229', 'L', NULL, NULL, '3', '2022-08-10 09:37:07', '2022-08-24 23:08:29'),
(887, 221, NULL, '10636', '159', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-10 09:37:07', '2022-08-24 23:08:29'),
(888, 221, NULL, '10637', '159', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-10 09:37:07', '2022-08-24 23:08:29'),
(889, 222, NULL, '10643', '159', NULL, '229', 'S', NULL, NULL, '3', '2022-08-10 09:48:59', '2022-08-24 23:07:35'),
(890, 222, NULL, '10644', '159', NULL, '229', 'M', NULL, NULL, '3', '2022-08-10 09:48:59', '2022-08-24 23:07:35'),
(891, 222, NULL, '10645', '159', NULL, '229', 'L', NULL, NULL, '3', '2022-08-10 09:48:59', '2022-08-24 23:07:35'),
(892, 222, NULL, '10646', '159', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-10 09:48:59', '2022-08-24 23:07:35'),
(893, 222, NULL, '10647', '159', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-10 09:48:59', '2022-08-24 23:07:35'),
(894, 223, NULL, '10648', '169', NULL, '279', 'S', NULL, NULL, '4', '2022-08-10 10:09:13', '2022-08-24 23:07:15'),
(895, 223, NULL, '10649', '169', NULL, '279', 'M', NULL, NULL, '3', '2022-08-10 10:09:13', '2022-08-24 23:07:15'),
(896, 223, NULL, '10650', '169', NULL, '279', 'L', NULL, NULL, '4', '2022-08-10 10:09:13', '2022-08-24 23:07:15'),
(897, 223, NULL, '10651', '169', NULL, '279', 'XL', NULL, NULL, '4', '2022-08-10 10:09:13', '2022-08-24 23:07:15'),
(898, 223, NULL, '10652', '169', NULL, '279', 'XXL', NULL, NULL, '4', '2022-08-10 10:09:13', '2022-08-24 23:07:15'),
(899, 224, NULL, '10653', '169', NULL, '269', 'S', NULL, NULL, '4', '2022-08-10 10:14:00', '2022-08-24 23:07:00'),
(900, 224, NULL, '10654', '169', NULL, '269', 'M', NULL, NULL, '4', '2022-08-10 10:14:00', '2022-08-24 23:07:00'),
(901, 224, NULL, '10655', '169', NULL, '269', 'L', NULL, NULL, '4', '2022-08-10 10:14:00', '2022-08-24 23:07:00'),
(902, 224, NULL, '10656', '169', NULL, '269', 'XL', NULL, NULL, '4', '2022-08-10 10:14:00', '2022-08-24 23:07:00'),
(903, 224, NULL, '10657', '169', NULL, '269', 'XXL', NULL, NULL, '4', '2022-08-10 10:14:00', '2022-08-24 23:07:00'),
(904, 225, NULL, '10658', '159', NULL, '269', 'S', NULL, NULL, '4', '2022-08-10 13:38:29', '2022-08-24 23:22:35'),
(905, 225, NULL, '10659', '159', NULL, '269', 'M', NULL, NULL, '2', '2022-08-10 13:38:29', '2022-08-24 23:22:35'),
(906, 225, NULL, '10660', '159', NULL, '269', 'L', NULL, NULL, '3', '2022-08-10 13:38:29', '2022-08-24 23:22:35'),
(907, 225, NULL, '10661', '159', NULL, '269', 'XL', NULL, NULL, '1', '2022-08-10 13:38:29', '2022-08-24 23:22:35'),
(908, 225, NULL, '10662', '159', NULL, '269', 'XXL', NULL, NULL, '2', '2022-08-10 13:38:29', '2022-08-24 23:22:35'),
(909, 226, NULL, '10663', '159', NULL, '269', 'S', NULL, NULL, '4', '2022-08-10 13:45:50', '2022-08-24 23:23:29'),
(910, 226, NULL, '10664', '159', NULL, '269', 'M', NULL, NULL, '4', '2022-08-10 13:45:50', '2022-08-24 23:23:29'),
(911, 226, NULL, '10665', '159', NULL, '269', 'L', NULL, NULL, '2', '2022-08-10 13:45:50', '2022-08-24 23:23:29'),
(912, 226, NULL, '10666', '159', NULL, '269', 'XL', NULL, NULL, '4', '2022-08-10 13:45:50', '2022-08-24 23:23:29'),
(913, 226, NULL, '10667', '159', NULL, '269', 'XXL', NULL, NULL, '4', '2022-08-10 13:45:50', '2022-08-24 23:23:29'),
(914, 227, NULL, '10668', '159', NULL, '269', 'S', NULL, NULL, '4', '2022-08-10 13:51:12', '2022-08-24 23:22:52'),
(915, 227, NULL, '10669', '159', NULL, '269', 'M', NULL, NULL, '4', '2022-08-10 13:51:12', '2022-08-24 23:22:52'),
(916, 227, NULL, '10670', '159', NULL, '269', 'L', NULL, NULL, '4', '2022-08-10 13:51:12', '2022-08-24 23:22:52');
INSERT INTO `variations` (`id`, `product_id`, `attribute_id`, `sku_id`, `price`, `description`, `discounted_variation_price`, `variation`, `variation_interval`, `variation_times`, `qty`, `created_at`, `updated_at`) VALUES
(917, 227, NULL, '10671', '159', NULL, '269', 'XL', NULL, NULL, '4', '2022-08-10 13:51:12', '2022-08-24 23:22:52'),
(918, 227, NULL, '10672', '159', NULL, '269', 'XXL', NULL, NULL, '4', '2022-08-10 13:51:12', '2022-08-24 23:22:52'),
(919, 228, NULL, '10673', '159', NULL, '229', 'S', NULL, NULL, '9', '2022-08-10 14:11:46', '2022-08-24 23:05:32'),
(920, 228, NULL, '10674', '159', NULL, '229', 'M', NULL, NULL, '2', '2022-08-10 14:11:46', '2022-08-24 23:05:32'),
(921, 228, NULL, '10675', '159', NULL, '229', 'L', NULL, NULL, '1', '2022-08-10 14:11:46', '2022-08-24 23:05:32'),
(922, 228, NULL, '10676', '159', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-10 14:11:46', '2022-08-24 23:05:32'),
(923, 228, NULL, '10677', '159', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-10 14:11:46', '2022-08-24 23:05:32'),
(924, 229, NULL, '10678', '159', NULL, '229', 'S', NULL, NULL, '4', '2022-08-10 14:18:47', '2022-08-24 23:05:10'),
(925, 229, NULL, '10679', '159', NULL, '229', 'M', NULL, NULL, '4', '2022-08-10 14:18:47', '2022-08-24 23:05:10'),
(926, 229, NULL, '10680', '159', NULL, '229', 'L', NULL, NULL, '3', '2022-08-10 14:18:47', '2022-08-24 23:05:10'),
(927, 229, NULL, '10681', '159', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-10 14:18:47', '2022-08-24 23:05:10'),
(928, 229, NULL, '10682', '159', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-10 14:18:47', '2022-08-24 23:05:10'),
(929, 230, NULL, '10683', '179', NULL, '299', 'S', NULL, NULL, '6', '2022-08-10 14:30:21', '2022-08-24 23:04:55'),
(930, 230, NULL, '10684', '179', NULL, '299', 'M', NULL, NULL, '5', '2022-08-10 14:30:21', '2022-08-24 23:04:55'),
(931, 230, NULL, '10685', '179', NULL, '299', 'L', NULL, NULL, '4', '2022-08-10 14:30:21', '2022-08-24 23:04:55'),
(932, 230, NULL, '10686', '179', NULL, '299', 'XL', NULL, NULL, '2', '2022-08-10 14:30:21', '2022-08-24 23:04:55'),
(933, 230, NULL, '10687', '179', NULL, '299', 'XXL', NULL, NULL, '6', '2022-08-10 14:30:21', '2022-08-24 23:04:55'),
(934, 231, NULL, '10688', '179', NULL, '299', 'S', NULL, NULL, '6', '2022-08-10 14:43:08', '2022-08-24 23:04:37'),
(935, 231, NULL, '10689', '179', NULL, '299', 'M', NULL, NULL, '5', '2022-08-10 14:43:08', '2022-08-24 23:04:37'),
(936, 231, NULL, '10690', '179', NULL, '299', 'L', NULL, NULL, '6', '2022-08-10 14:43:08', '2022-08-24 23:04:37'),
(937, 231, NULL, '10691', '179', NULL, '299', 'XL', NULL, NULL, '4', '2022-08-10 14:43:08', '2022-08-24 23:04:37'),
(938, 231, NULL, '10692', '179', NULL, '299', 'XXL', NULL, NULL, '4', '2022-08-10 14:43:08', '2022-08-24 23:04:37'),
(939, 232, NULL, '10693', '159', NULL, '239', 'S', NULL, NULL, '6', '2022-08-10 15:00:57', '2022-08-24 23:03:35'),
(940, 232, NULL, '10694', '159', NULL, '239', 'M', NULL, NULL, '5', '2022-08-10 15:00:57', '2022-08-24 23:03:35'),
(941, 232, NULL, '10695', '159', NULL, '239', 'L', NULL, NULL, '6', '2022-08-10 15:00:57', '2022-08-24 23:03:35'),
(942, 232, NULL, '10696', '159', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-10 15:00:57', '2022-08-24 23:03:35'),
(943, 232, NULL, '10697', '159', NULL, '239', 'XXL', NULL, NULL, '6', '2022-08-10 15:00:57', '2022-08-24 23:03:35'),
(944, 233, NULL, '10698', '159', NULL, '239', 'S', NULL, NULL, '5', '2022-08-10 15:07:39', '2022-08-24 23:03:14'),
(945, 233, NULL, '10699', '159', NULL, '239', 'M', NULL, NULL, '6', '2022-08-10 15:07:39', '2022-08-24 23:03:14'),
(946, 233, NULL, '10700', '159', NULL, '239', 'L', NULL, NULL, '6', '2022-08-10 15:07:39', '2022-08-24 23:03:14'),
(947, 233, NULL, '10701', '159', NULL, '239', 'XL', NULL, NULL, '6', '2022-08-10 15:07:39', '2022-08-24 23:03:14'),
(948, 233, NULL, '10702', '159', NULL, '239', 'XXL', NULL, NULL, '5', '2022-08-10 15:07:39', '2022-08-24 23:03:14'),
(949, 234, NULL, '14747', '169', NULL, '229', 'M', NULL, NULL, '3', '2022-08-10 16:57:47', '2022-08-24 23:02:36'),
(950, 234, NULL, '14748', '169', NULL, '229', 'L', NULL, NULL, '2', '2022-08-10 16:57:47', '2022-08-24 23:02:36'),
(951, 234, NULL, '14749', '169', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-10 16:57:47', '2022-08-24 23:02:36'),
(952, 234, NULL, '14750', '169', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-10 16:57:47', '2022-08-24 23:02:36'),
(953, 235, NULL, '10733', '169', NULL, '229', 'S', NULL, NULL, '3', '2022-08-11 07:01:43', '2022-08-24 23:02:23'),
(954, 235, NULL, '10734', '169', NULL, '229', 'M', NULL, NULL, '3', '2022-08-11 07:01:43', '2022-08-24 23:02:23'),
(955, 235, NULL, '10735', '169', NULL, '229', 'L', NULL, NULL, '3', '2022-08-11 07:01:43', '2022-08-24 23:02:23'),
(956, 235, NULL, '10736', '169', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-11 07:01:43', '2022-08-24 23:02:23'),
(957, 235, NULL, '10737', '169', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-11 07:01:43', '2022-08-24 23:02:23'),
(958, 236, NULL, '10738', '179', NULL, '299', 'S', NULL, NULL, '3', '2022-08-11 07:42:42', '2022-08-24 23:01:59'),
(959, 236, NULL, '10739', '179', NULL, '299', 'M', NULL, NULL, '3', '2022-08-11 07:42:42', '2022-08-24 23:01:59'),
(960, 236, NULL, '10740', '179', NULL, '299', 'L', NULL, NULL, '3', '2022-08-11 07:42:42', '2022-08-24 23:01:59'),
(961, 236, NULL, '10741', '179', NULL, '299', 'XL', NULL, NULL, '3', '2022-08-11 07:42:42', '2022-08-24 23:01:59'),
(962, 236, NULL, '10742', '179', NULL, '299', 'XXL', NULL, NULL, '2', '2022-08-11 07:42:42', '2022-08-24 23:01:59'),
(963, 237, NULL, '10743', '179', NULL, '299', 'S', NULL, NULL, '4', '2022-08-11 07:49:40', '2022-08-24 23:01:43'),
(964, 237, NULL, '10744', '179', NULL, '299', 'M', NULL, NULL, '3', '2022-08-11 07:49:40', '2022-08-24 23:01:43'),
(965, 237, NULL, '10745', '179', NULL, '299', 'L', NULL, NULL, '2', '2022-08-11 07:49:40', '2022-08-24 23:01:43'),
(966, 237, NULL, '10746', '179', NULL, '299', 'XL', NULL, NULL, '3', '2022-08-11 07:49:40', '2022-08-24 23:01:43'),
(967, 237, NULL, '10747', '179', NULL, '299', 'XXL', NULL, NULL, '3', '2022-08-11 07:49:40', '2022-08-24 23:01:43'),
(968, 238, NULL, '10748', '169', NULL, '279', 'S', NULL, NULL, '2', '2022-08-11 07:58:58', '2022-08-24 23:01:22'),
(969, 238, NULL, '10749', '169', NULL, '279', 'M', NULL, NULL, '2', '2022-08-11 07:58:58', '2022-08-24 23:01:22'),
(970, 238, NULL, '10750', '169', NULL, '279', 'L', NULL, NULL, '2', '2022-08-11 07:58:58', '2022-08-24 23:01:22'),
(971, 238, NULL, '10751', '169', NULL, '279', 'XL', NULL, NULL, '2', '2022-08-11 07:58:58', '2022-08-24 23:01:22'),
(972, 238, NULL, '10752', '169', NULL, '279', 'XXL', NULL, NULL, '2', '2022-08-11 07:58:58', '2022-08-24 23:01:22'),
(973, 239, NULL, '10753', '169', NULL, '279', 'S', NULL, NULL, '1', '2022-08-11 08:04:05', '2022-08-24 23:01:08'),
(974, 239, NULL, '10754', '169', NULL, '279', 'M', NULL, NULL, '1', '2022-08-11 08:04:05', '2022-08-24 23:01:08'),
(975, 239, NULL, '10755', '169', NULL, '279', 'L', NULL, NULL, '1', '2022-08-11 08:04:05', '2022-08-24 23:01:08'),
(976, 239, NULL, '10756', '169', NULL, '279', 'XL', NULL, NULL, '1', '2022-08-11 08:04:05', '2022-08-24 23:01:08'),
(977, 239, NULL, '10756', '169', NULL, '279', 'XXL', NULL, NULL, '1', '2022-08-11 08:04:05', '2022-08-24 23:01:08'),
(978, 240, NULL, '10758', '169', NULL, '279', 'S', NULL, NULL, '2', '2022-08-11 08:09:51', '2022-08-24 23:00:53'),
(979, 240, NULL, '10759', '169', NULL, '279', 'M', NULL, NULL, '2', '2022-08-11 08:09:51', '2022-08-24 23:00:53'),
(980, 240, NULL, '10760', '169', NULL, '279', 'L', NULL, NULL, '2', '2022-08-11 08:09:51', '2022-08-24 23:00:53'),
(981, 240, NULL, '10761', '169', NULL, '279', 'XL', NULL, NULL, '2', '2022-08-11 08:09:51', '2022-08-24 23:00:53'),
(982, 240, NULL, '10762', '169', NULL, '279', 'XXL', NULL, NULL, '2', '2022-08-11 08:09:51', '2022-08-24 23:00:53'),
(983, 241, NULL, '10763', '169', NULL, '289', 'S', NULL, NULL, '9', '2022-08-11 08:21:23', '2022-08-24 23:00:38'),
(984, 241, NULL, '10764', '169', NULL, '289', 'M', NULL, NULL, '8', '2022-08-11 08:21:23', '2022-08-24 23:00:38'),
(985, 241, NULL, '10765', '169', NULL, '289', 'L', NULL, NULL, '9', '2022-08-11 08:21:23', '2022-08-24 23:00:38'),
(986, 241, NULL, '10766', '169', NULL, '289', 'XL', NULL, NULL, '9', '2022-08-11 08:21:23', '2022-08-24 23:00:38'),
(987, 241, NULL, '10767', '169', NULL, '289', 'XXL', NULL, NULL, '9', '2022-08-11 08:21:23', '2022-08-24 23:00:38'),
(988, 242, NULL, '10788', '179', NULL, '239', 'S', NULL, NULL, '4', '2022-08-11 08:42:06', '2022-08-24 23:00:09'),
(989, 242, NULL, '10789', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-11 08:42:06', '2022-08-24 23:00:09'),
(990, 242, NULL, '10790', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-11 08:42:06', '2022-08-24 23:00:09'),
(991, 242, NULL, '10791', '179', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-11 08:42:06', '2022-08-24 23:00:09'),
(992, 242, NULL, '10792', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-11 08:42:06', '2022-08-24 23:00:09'),
(993, 243, NULL, '10793', '179', NULL, '239', 'S', NULL, NULL, '3', '2022-08-11 08:48:30', '2022-08-24 22:59:45'),
(994, 243, NULL, '10794', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-11 08:48:30', '2022-08-24 22:59:45'),
(995, 243, NULL, '10795', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-11 08:48:30', '2022-08-24 22:59:45'),
(996, 243, NULL, '10796', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-11 08:48:30', '2022-08-24 22:59:45'),
(997, 243, NULL, '10797', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-11 08:48:30', '2022-08-24 22:59:45'),
(998, 244, NULL, '10798', '159', NULL, '229', 'S', NULL, NULL, '2', '2022-08-11 13:57:27', '2022-08-24 22:59:15'),
(999, 244, NULL, '10799', '159', NULL, '229', 'M', NULL, NULL, '2', '2022-08-11 13:57:27', '2022-08-24 22:59:15'),
(1000, 244, NULL, '10800', '159', NULL, '229', 'L', NULL, NULL, '2', '2022-08-11 13:57:27', '2022-08-24 22:59:15'),
(1001, 244, NULL, '10801', '159', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-11 13:57:27', '2022-08-24 22:59:15'),
(1002, 244, NULL, '10802', '159', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-11 13:57:27', '2022-08-24 22:59:15'),
(1003, 245, NULL, '10803', '159', NULL, '229', 'S', NULL, NULL, '2', '2022-08-11 14:13:08', '2022-08-24 22:58:46'),
(1004, 245, NULL, '10804', '159', NULL, '229', 'M', NULL, NULL, '2', '2022-08-11 14:13:08', '2022-08-24 22:58:46'),
(1005, 245, NULL, '10805', '159', NULL, '229', 'L', NULL, NULL, '2', '2022-08-11 14:13:08', '2022-08-24 22:58:46'),
(1006, 245, NULL, '10806', '159', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-11 14:13:08', '2022-08-24 22:58:46'),
(1007, 245, NULL, '10807', '159', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-11 14:13:08', '2022-08-24 22:58:46'),
(1008, 246, NULL, '10808', '159', NULL, '229', 'S', NULL, NULL, '2', '2022-08-11 14:20:20', '2022-08-24 22:58:29'),
(1009, 246, NULL, '10809', '159', NULL, '229', 'M', NULL, NULL, '2', '2022-08-11 14:20:20', '2022-08-24 22:58:29'),
(1010, 246, NULL, '10810', '159', NULL, '229', 'L', NULL, NULL, '2', '2022-08-11 14:20:20', '2022-08-24 22:58:29'),
(1011, 246, NULL, '10811', '159', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-11 14:20:21', '2022-08-24 22:58:29'),
(1012, 246, NULL, '10812', '159', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-11 14:20:21', '2022-08-24 22:58:29'),
(1013, 247, NULL, '10813', '159', NULL, '229', 'S', NULL, NULL, '2', '2022-08-11 14:31:28', '2022-08-24 22:58:12'),
(1014, 247, NULL, '10814', '159', NULL, '229', 'M', NULL, NULL, '2', '2022-08-11 14:31:28', '2022-08-24 22:58:12'),
(1015, 247, NULL, '10815', '159', NULL, '229', 'L', NULL, NULL, '2', '2022-08-11 14:31:28', '2022-08-24 22:58:12'),
(1016, 247, NULL, '10816', '159', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-11 14:31:28', '2022-08-24 22:58:12'),
(1017, 247, NULL, '10817', '159', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-11 14:31:28', '2022-08-24 22:58:12'),
(1018, 248, NULL, '10818', '159', NULL, '229', 'S', NULL, NULL, '2', '2022-08-11 14:42:39', '2022-08-24 22:57:49'),
(1019, 248, NULL, '10819', '159', NULL, '229', 'M', NULL, NULL, '2', '2022-08-11 14:42:39', '2022-08-24 22:57:49'),
(1020, 248, NULL, '10820', '159', NULL, '229', 'L', NULL, NULL, '2', '2022-08-11 14:42:39', '2022-08-24 22:57:49'),
(1021, 248, NULL, '10821', '159', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-11 14:42:39', '2022-08-24 22:57:49'),
(1022, 248, NULL, '10822', '159', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-11 14:42:39', '2022-08-24 22:57:49'),
(1023, 249, NULL, '10823', '159', NULL, '229', 'S', NULL, NULL, '2', '2022-08-11 15:00:21', '2022-08-24 22:57:23'),
(1024, 249, NULL, '10824', '159', NULL, '229', 'M', NULL, NULL, '2', '2022-08-11 15:00:21', '2022-08-24 22:57:23'),
(1025, 249, NULL, '10825', '159', NULL, '229', 'L', NULL, NULL, '2', '2022-08-11 15:00:21', '2022-08-24 22:57:23'),
(1026, 249, NULL, '10826', '159', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-11 15:00:21', '2022-08-24 22:57:23'),
(1027, 249, NULL, '10827', '159', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-11 15:00:21', '2022-08-24 22:57:23'),
(1028, 250, NULL, '10768', '159', NULL, '299', 'S', NULL, NULL, '3', '2022-08-11 15:24:44', '2022-08-24 22:57:04'),
(1029, 250, NULL, '10769', '159', NULL, '299', 'M', NULL, NULL, '3', '2022-08-11 15:24:44', '2022-08-24 22:57:04'),
(1030, 250, NULL, '10770', '159', NULL, '299', 'L', NULL, NULL, '1', '2022-08-11 15:24:44', '2022-08-24 22:57:04'),
(1031, 250, NULL, '10771', '159', NULL, '299', 'XL', NULL, NULL, '1', '2022-08-11 15:24:44', '2022-08-24 22:57:04'),
(1032, 250, NULL, '10772', '159', NULL, '299', 'XXL', NULL, NULL, '1', '2022-08-11 15:24:44', '2022-08-24 22:57:04'),
(1033, 251, NULL, '10773', '159', NULL, '299', 'S', NULL, NULL, '3', '2022-08-11 15:30:03', '2022-08-24 22:56:51'),
(1034, 251, NULL, '10774', '159', NULL, '299', 'M', NULL, NULL, '2', '2022-08-11 15:30:03', '2022-08-24 22:56:51'),
(1035, 251, NULL, '10775', '159', NULL, '299', 'L', NULL, NULL, '3', '2022-08-11 15:30:03', '2022-08-24 22:56:51'),
(1036, 251, NULL, '10776', '159', NULL, '299', 'XL', NULL, NULL, '3', '2022-08-11 15:30:03', '2022-08-24 22:56:51'),
(1037, 251, NULL, '10777', '159', NULL, '299', 'XXL', NULL, NULL, '3', '2022-08-11 15:30:03', '2022-08-24 22:56:51'),
(1038, 252, NULL, '10778', '159', NULL, '299', 'S', NULL, NULL, '2', '2022-08-11 15:36:28', '2022-08-24 22:56:30'),
(1039, 252, NULL, '10779', '159', NULL, '299', 'M', NULL, NULL, '2', '2022-08-11 15:36:28', '2022-08-24 22:56:30'),
(1040, 252, NULL, '10780', '159', NULL, '299', 'L', NULL, NULL, '2', '2022-08-11 15:36:28', '2022-08-24 22:56:30'),
(1041, 252, NULL, '10781', '159', NULL, '299', 'XL', NULL, NULL, '2', '2022-08-11 15:36:28', '2022-08-24 22:56:30'),
(1042, 252, NULL, '10782', '159', NULL, '299', 'XXL', NULL, NULL, '2', '2022-08-11 15:36:28', '2022-08-24 22:56:30'),
(1043, 253, NULL, '10783', '159', NULL, '299', 'S', NULL, NULL, '2', '2022-08-11 15:56:38', '2022-08-24 22:56:09'),
(1044, 253, NULL, '10784', '159', NULL, '299', 'M', NULL, NULL, '2', '2022-08-11 15:56:38', '2022-08-24 22:56:09'),
(1045, 253, NULL, '10785', '159', NULL, '299', 'L', NULL, NULL, '2', '2022-08-11 15:56:38', '2022-08-24 22:56:09'),
(1046, 253, NULL, '10786', '159', NULL, '299', 'XL', NULL, NULL, '2', '2022-08-11 15:56:38', '2022-08-24 22:56:09'),
(1047, 253, NULL, '10787', '159', NULL, '299', 'XXL', NULL, NULL, '2', '2022-08-11 15:56:38', '2022-08-24 22:56:09'),
(1048, 254, NULL, '10828', '169', NULL, '289', 'S', NULL, NULL, '2', '2022-08-11 16:14:44', '2022-08-24 22:55:42'),
(1049, 254, NULL, '10829', '169', NULL, '289', 'M', NULL, NULL, '2', '2022-08-11 16:14:44', '2022-08-24 22:55:42'),
(1050, 254, NULL, '10830', '169', NULL, '289', 'L', NULL, NULL, '2', '2022-08-11 16:14:44', '2022-08-24 22:55:42'),
(1051, 254, NULL, '10831', '169', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-11 16:14:44', '2022-08-24 22:55:42'),
(1052, 254, NULL, '10832', '169', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-11 16:14:44', '2022-08-24 22:55:42'),
(1053, 255, NULL, '10833', '169', NULL, '289', 'S', NULL, NULL, '2', '2022-08-11 16:26:24', '2022-08-24 22:55:20'),
(1054, 255, NULL, '10834', '169', NULL, '289', 'M', NULL, NULL, '1', '2022-08-11 16:26:24', '2022-08-24 22:55:20'),
(1055, 255, NULL, '10835', '169', NULL, '289', 'L', NULL, NULL, '2', '2022-08-11 16:26:24', '2022-08-24 22:55:20'),
(1056, 255, NULL, '10836', '169', NULL, '289', 'XL', NULL, NULL, '1', '2022-08-11 16:26:24', '2022-08-24 22:55:20'),
(1057, 255, NULL, '10837', '169', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-11 16:26:24', '2022-08-24 22:55:20'),
(1058, 256, NULL, '10838', '169', NULL, '289', 'S', NULL, NULL, '2', '2022-08-11 16:33:47', '2022-08-24 22:54:18'),
(1059, 256, NULL, '10839', '169', NULL, '289', 'M', NULL, NULL, '2', '2022-08-11 16:33:47', '2022-08-24 22:54:18'),
(1060, 256, NULL, '10840', '169', NULL, '289', 'L', NULL, NULL, '2', '2022-08-11 16:33:47', '2022-08-24 22:54:18'),
(1061, 256, NULL, '10841', '169', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-11 16:33:47', '2022-08-24 22:54:18'),
(1062, 256, NULL, '10842', '169', NULL, '289', 'XXL', NULL, NULL, '1', '2022-08-11 16:33:47', '2022-08-24 22:54:18'),
(1063, 257, NULL, '10838', '249', NULL, '289', 'S', NULL, NULL, '2', '2022-08-11 16:33:49', '2022-08-11 16:35:09'),
(1064, 257, NULL, '10839', '249', NULL, '289', 'M', NULL, NULL, '2', '2022-08-11 16:33:49', '2022-08-11 16:35:09'),
(1065, 257, NULL, '10840', '249', NULL, '289', 'L', NULL, NULL, '2', '2022-08-11 16:33:49', '2022-08-11 16:35:09'),
(1066, 257, NULL, '10841', '249', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-11 16:33:49', '2022-08-11 16:35:09'),
(1067, 257, NULL, '10842', '249', NULL, '289', 'XXL', NULL, NULL, '1', '2022-08-11 16:33:49', '2022-08-11 16:35:09'),
(1068, 258, NULL, '14818', '179', NULL, '299', '52', NULL, NULL, '4', '2022-08-11 16:42:59', '2022-08-24 18:30:18'),
(1069, 258, NULL, '14819', '179', NULL, '299', '54', NULL, NULL, '4', '2022-08-11 16:42:59', '2022-08-24 18:30:18'),
(1070, 258, NULL, '14820', '179', NULL, '299', '56', NULL, NULL, '4', '2022-08-11 16:42:59', '2022-08-24 18:30:18'),
(1071, 258, NULL, '14821', '179', NULL, '299', '58', NULL, NULL, '4', '2022-08-11 16:42:59', '2022-08-24 18:30:18'),
(1072, 258, NULL, '14822', '179', NULL, '299', '60', NULL, NULL, '4', '2022-08-11 16:42:59', '2022-08-24 18:30:18'),
(1073, 259, NULL, '10858', '159', NULL, '279', 'S', NULL, NULL, '2', '2022-08-11 17:50:14', '2022-08-24 22:53:58'),
(1074, 259, NULL, '10859', '159', NULL, '279', 'M', NULL, NULL, '2', '2022-08-11 17:50:14', '2022-08-24 22:53:58'),
(1075, 259, NULL, '10860', '159', NULL, '279', 'L', NULL, NULL, '2', '2022-08-11 17:50:14', '2022-08-24 22:53:58'),
(1076, 259, NULL, '10861', '159', NULL, '279', 'XL', NULL, NULL, '2', '2022-08-11 17:50:14', '2022-08-24 22:53:58'),
(1077, 259, NULL, '10862', '159', NULL, '279', 'XXL', NULL, NULL, '2', '2022-08-11 17:50:14', '2022-08-24 22:53:58'),
(1078, 260, NULL, '10863', '159', NULL, '279', 'S', NULL, NULL, '2', '2022-08-11 18:00:49', '2022-08-24 22:53:36'),
(1079, 260, NULL, '10864', '159', NULL, '279', 'M', NULL, NULL, '2', '2022-08-11 18:00:49', '2022-08-24 22:53:36'),
(1080, 260, NULL, '10865', '159', NULL, '279', 'L', NULL, NULL, '2', '2022-08-11 18:00:49', '2022-08-24 22:53:36'),
(1081, 260, NULL, '10866', '159', NULL, '279', 'XL', NULL, NULL, '2', '2022-08-11 18:00:49', '2022-08-24 22:53:36'),
(1082, 260, NULL, '10867', '159', NULL, '279', 'XXL', NULL, NULL, '2', '2022-08-11 18:00:49', '2022-08-24 22:53:36'),
(1083, 261, NULL, '10868', '159', NULL, '279', 'S', NULL, NULL, '2', '2022-08-11 18:07:12', '2022-08-24 22:53:19'),
(1084, 261, NULL, '10869', '159', NULL, '279', 'M', NULL, NULL, '2', '2022-08-11 18:07:12', '2022-08-24 22:53:19'),
(1085, 261, NULL, '10870', '159', NULL, '279', 'L', NULL, NULL, '2', '2022-08-11 18:07:12', '2022-08-24 22:53:19'),
(1086, 261, NULL, '10871', '159', NULL, '279', 'XL', NULL, NULL, '2', '2022-08-11 18:07:12', '2022-08-24 22:53:19'),
(1087, 261, NULL, '10872', '159', NULL, '279', 'XXL', NULL, NULL, '2', '2022-08-11 18:07:12', '2022-08-24 22:53:19'),
(1088, 262, NULL, '10873', '169', NULL, '219', 'S', NULL, NULL, '2', '2022-08-13 07:28:00', '2022-08-24 22:53:00'),
(1089, 262, NULL, '10874', '169', NULL, '219', 'M', NULL, NULL, '2', '2022-08-13 07:28:00', '2022-08-24 22:53:00'),
(1090, 262, NULL, '10875', '169', NULL, '219', 'L', NULL, NULL, '1', '2022-08-13 07:28:00', '2022-08-24 22:53:00'),
(1091, 262, NULL, '10876', '169', NULL, '219', 'XL', NULL, NULL, '2', '2022-08-13 07:28:00', '2022-08-24 22:53:00'),
(1092, 262, NULL, '10877', '169', NULL, '219', 'XXL', NULL, NULL, '2', '2022-08-13 07:28:00', '2022-08-24 22:53:00'),
(1093, 263, NULL, '10878', '169', NULL, '219', 'S', NULL, NULL, '2', '2022-08-13 07:33:33', '2022-08-24 22:52:34'),
(1094, 263, NULL, '10879', '169', NULL, '219', 'M', NULL, NULL, '2', '2022-08-13 07:33:34', '2022-08-24 22:52:34'),
(1095, 263, NULL, '10880', '169', NULL, '219', 'L', NULL, NULL, '2', '2022-08-13 07:33:34', '2022-08-24 22:52:34'),
(1096, 263, NULL, '10881', '169', NULL, '219', 'XL', NULL, NULL, '2', '2022-08-13 07:33:34', '2022-08-24 22:52:34'),
(1097, 263, NULL, '10882', '169', NULL, '219', 'XXL', NULL, NULL, '2', '2022-08-13 07:33:34', '2022-08-24 22:52:34'),
(1098, 264, NULL, '10888', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-13 07:54:34', '2022-08-24 22:52:13'),
(1099, 264, NULL, '10889', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-13 07:54:34', '2022-08-24 22:52:13'),
(1100, 264, NULL, '10890', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-13 07:54:34', '2022-08-24 22:52:13'),
(1101, 264, NULL, '10891', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-13 07:54:34', '2022-08-24 22:52:13'),
(1102, 264, NULL, '10892', '149', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-13 07:54:34', '2022-08-24 22:52:13'),
(1103, 265, NULL, '10893', '149', NULL, '229', 'S', NULL, NULL, '5', '2022-08-13 07:59:10', '2022-08-24 22:51:50'),
(1104, 265, NULL, '10894', '169149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-13 07:59:10', '2022-08-24 22:51:50'),
(1105, 265, NULL, '10895', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-13 07:59:10', '2022-08-24 22:51:50'),
(1106, 265, NULL, '10896', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-13 07:59:10', '2022-08-24 22:51:50'),
(1107, 266, NULL, '10898', '149', NULL, '229', 'S', NULL, NULL, '5', '2022-08-13 08:03:26', '2022-08-24 22:51:30'),
(1108, 266, NULL, '10899', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-13 08:03:26', '2022-08-24 22:51:30'),
(1109, 266, NULL, '10900', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-13 08:03:26', '2022-08-24 22:51:30'),
(1110, 266, NULL, '10901', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-13 08:03:26', '2022-08-24 22:51:30'),
(1111, 266, NULL, '10902', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-13 08:03:26', '2022-08-24 22:51:30'),
(1112, 267, NULL, '10903', '149', NULL, '219', 'S', NULL, NULL, '1', '2022-08-13 08:20:30', '2022-08-24 22:51:13'),
(1113, 267, NULL, '10904', '149', NULL, '219', 'M', NULL, NULL, '2', '2022-08-13 08:20:30', '2022-08-24 22:51:13'),
(1114, 267, NULL, '10905', '149', NULL, '219', 'L', NULL, NULL, '1', '2022-08-13 08:20:30', '2022-08-24 22:51:13'),
(1115, 267, NULL, '10907', '149', NULL, '219', 'XXL', NULL, NULL, '1', '2022-08-13 08:20:30', '2022-08-24 22:51:13'),
(1116, 268, NULL, '10908', '149', NULL, '219', 'S', NULL, NULL, '1', '2022-08-13 08:28:40', '2022-08-24 22:50:52'),
(1117, 268, NULL, '10909', '149', NULL, '219', 'M', NULL, NULL, '2', '2022-08-13 08:28:40', '2022-08-24 22:50:52'),
(1118, 268, NULL, '10910', '149', NULL, '219', 'L', NULL, NULL, '2', '2022-08-13 08:28:40', '2022-08-24 22:50:52'),
(1119, 268, NULL, '10911', '149', NULL, '219', 'XL', NULL, NULL, '1', '2022-08-13 08:28:40', '2022-08-24 22:50:52'),
(1120, 268, NULL, '10912', '149', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-13 08:28:40', '2022-08-24 22:50:52'),
(1121, 269, NULL, '10913', '149', NULL, '219', 'S', NULL, NULL, '2', '2022-08-13 08:37:32', '2022-08-24 22:50:34'),
(1122, 269, NULL, '10914', '149', NULL, '219', 'M', NULL, NULL, '2', '2022-08-13 08:37:32', '2022-08-24 22:50:34'),
(1123, 269, NULL, '10915', '149', NULL, '219', 'L', NULL, NULL, '2', '2022-08-13 08:37:32', '2022-08-24 22:50:34'),
(1124, 269, NULL, '10916', '149', NULL, '219', 'XL', NULL, NULL, '2', '2022-08-13 08:37:32', '2022-08-24 22:50:34'),
(1125, 269, NULL, '10917', '149', NULL, '219', 'XXL', NULL, NULL, '2', '2022-08-13 08:37:32', '2022-08-24 22:50:34'),
(1126, 270, NULL, '10918', '159', NULL, '289', 'S', NULL, NULL, '1', '2022-08-13 09:01:19', '2022-08-24 22:50:15'),
(1127, 270, NULL, '10919', '159', NULL, '289', 'M', NULL, NULL, '1', '2022-08-13 09:01:19', '2022-08-24 22:50:15'),
(1128, 270, NULL, '10920', '159', NULL, '289', 'L', NULL, NULL, '1', '2022-08-13 09:01:19', '2022-08-24 22:50:15'),
(1129, 270, NULL, '10921', '159', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-13 09:01:19', '2022-08-24 22:50:15'),
(1130, 270, NULL, '10922', '159', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-13 09:01:19', '2022-08-24 22:50:15'),
(1131, 271, NULL, '10923', '159', NULL, '289', 'S', NULL, NULL, '1', '2022-08-13 09:33:59', '2022-08-24 22:49:51'),
(1132, 271, NULL, '10924', '159', NULL, '289', 'M', NULL, NULL, '2', '2022-08-13 09:33:59', '2022-08-24 22:49:51'),
(1133, 271, NULL, '10925', '159', NULL, '289', 'L', NULL, NULL, '2', '2022-08-13 09:33:59', '2022-08-24 22:49:51'),
(1134, 271, NULL, '10926', '159', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-13 09:33:59', '2022-08-24 22:49:51'),
(1135, 271, NULL, '10927', '159', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-13 09:33:59', '2022-08-24 22:49:51'),
(1136, 272, NULL, '10928', '159', NULL, '289', 'S', NULL, NULL, '1', '2022-08-13 09:43:14', '2022-08-24 22:49:33'),
(1137, 272, NULL, '10929', '159', NULL, '289', 'M', NULL, NULL, '1', '2022-08-13 09:43:14', '2022-08-24 22:49:33'),
(1138, 272, NULL, '10930', '159', NULL, '289', 'L', NULL, NULL, '1', '2022-08-13 09:43:14', '2022-08-24 22:49:33'),
(1139, 272, NULL, '10931', '159', NULL, '289', 'XL', NULL, NULL, '1', '2022-08-13 09:43:14', '2022-08-24 22:49:33'),
(1140, 272, NULL, '10932', '159', NULL, '289', 'XXL', NULL, NULL, '1', '2022-08-13 09:43:14', '2022-08-24 22:49:33'),
(1141, 273, NULL, '10933', '159', NULL, '289', 'S', NULL, NULL, '2', '2022-08-13 09:54:05', '2022-08-24 22:49:10'),
(1142, 273, NULL, '10934', '159', NULL, '289', 'M', NULL, NULL, '2', '2022-08-13 09:54:05', '2022-08-24 22:49:10'),
(1143, 273, NULL, '10935', '159', NULL, '289', 'L', NULL, NULL, '2', '2022-08-13 09:54:05', '2022-08-24 22:49:10'),
(1144, 273, NULL, '10936', '159', NULL, '289', 'XL', NULL, NULL, '1', '2022-08-13 09:54:05', '2022-08-24 22:49:10'),
(1145, 273, NULL, '10937', '159', NULL, '289', 'XXL', NULL, NULL, '1', '2022-08-13 09:54:05', '2022-08-24 22:49:10'),
(1146, 274, NULL, '10938', '159', NULL, '289', 'S', NULL, NULL, '2', '2022-08-13 09:59:32', '2022-08-24 22:48:51'),
(1147, 274, NULL, '10939', '159', NULL, '289', 'M', NULL, NULL, '3', '2022-08-13 09:59:32', '2022-08-24 22:48:51'),
(1148, 274, NULL, '10940', '159', NULL, '289', 'L', NULL, NULL, '2', '2022-08-13 09:59:32', '2022-08-24 22:48:51'),
(1149, 274, NULL, '10941', '159', NULL, '289', 'XL', NULL, NULL, '4', '2022-08-13 09:59:32', '2022-08-24 22:48:51'),
(1150, 274, NULL, '10942', '159', NULL, '289', 'XXL', NULL, NULL, '3', '2022-08-13 09:59:32', '2022-08-24 22:48:51'),
(1151, 275, NULL, '10953', '229', NULL, '299', 'S', NULL, NULL, '2', '2022-08-13 13:45:44', '2022-08-24 19:09:47'),
(1152, 275, NULL, '10954', '229', NULL, '299', 'M', NULL, NULL, '1', '2022-08-13 13:45:44', '2022-08-24 19:09:47'),
(1153, 275, NULL, '10955', '229', NULL, '299', 'L', NULL, NULL, '2', '2022-08-13 13:45:44', '2022-08-24 19:09:47'),
(1154, 275, NULL, '10956', '229', NULL, '299', 'XL', NULL, NULL, '2', '2022-08-13 13:45:44', '2022-08-24 19:09:47'),
(1155, 275, NULL, '10957', '229', NULL, '299', 'XXL', NULL, NULL, '2', '2022-08-13 13:45:44', '2022-08-24 19:09:47'),
(1156, 276, NULL, '10958', '229', NULL, '299', 'S', NULL, NULL, '3', '2022-08-13 13:53:33', '2022-08-24 19:09:32'),
(1157, 276, NULL, '10959', '229', NULL, '299', 'M', NULL, NULL, '2', '2022-08-13 13:53:33', '2022-08-24 19:09:32'),
(1158, 276, NULL, '10960', '229', NULL, '299', 'L', NULL, NULL, '2', '2022-08-13 13:53:33', '2022-08-24 19:09:32'),
(1159, 276, NULL, '10961', '229', NULL, '299', 'XL', NULL, NULL, '2', '2022-08-13 13:53:33', '2022-08-24 19:09:32'),
(1160, 276, NULL, '10962', '229', NULL, '299', 'XXL', NULL, NULL, '3', '2022-08-13 13:53:33', '2022-08-24 19:09:32'),
(1161, 277, NULL, '10968', '229', NULL, '299', 'S', NULL, NULL, '2', '2022-08-13 13:57:56', '2022-08-24 19:09:16'),
(1162, 277, NULL, '10969', '229', NULL, '299', 'M', NULL, NULL, '1', '2022-08-13 13:57:56', '2022-08-24 19:09:16'),
(1163, 277, NULL, '10970', '229', NULL, '299', 'L', NULL, NULL, '1', '2022-08-13 13:57:56', '2022-08-24 19:09:16'),
(1164, 277, NULL, '10972', '229', NULL, '299', 'XXL', NULL, NULL, '1', '2022-08-13 13:57:56', '2022-08-24 19:09:16'),
(1165, 278, NULL, '10988', '139', NULL, '219', 'S', NULL, NULL, '3', '2022-08-13 14:21:19', '2022-08-24 22:48:28'),
(1166, 278, NULL, '10989', '139', NULL, '219', 'M', NULL, NULL, '3', '2022-08-13 14:21:19', '2022-08-24 22:48:28'),
(1167, 278, NULL, '10990', '139', NULL, '219', 'L', NULL, NULL, '3', '2022-08-13 14:21:19', '2022-08-24 22:48:28'),
(1168, 278, NULL, '10991', '139', NULL, '219', 'XL', NULL, NULL, '3', '2022-08-13 14:21:19', '2022-08-24 22:48:28'),
(1169, 278, NULL, '10992', '139', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-13 14:21:19', '2022-08-24 22:48:28'),
(1170, 279, NULL, '10993', '139', NULL, '219', 'S', NULL, NULL, '3', '2022-08-13 14:27:54', '2022-08-24 22:48:12'),
(1171, 279, NULL, '10994', '139', NULL, '219', 'M', NULL, NULL, '3', '2022-08-13 14:27:54', '2022-08-24 22:48:12'),
(1172, 279, NULL, '10995', '139', NULL, '219', 'L', NULL, NULL, '3', '2022-08-13 14:27:54', '2022-08-24 22:48:12'),
(1173, 279, NULL, '10996', '139', NULL, '219', 'XL', NULL, NULL, '3', '2022-08-13 14:27:54', '2022-08-24 22:48:12'),
(1174, 279, NULL, '10997', '139', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-13 14:27:54', '2022-08-24 22:48:12'),
(1175, 280, NULL, '10998', '139', NULL, '219', 'S', NULL, NULL, '4', '2022-08-13 14:34:22', '2022-08-24 22:47:53'),
(1176, 280, NULL, '10999', '139', NULL, '219', 'M', NULL, NULL, '2', '2022-08-13 14:34:22', '2022-08-24 22:47:53'),
(1177, 280, NULL, '11000', '139', NULL, '219', 'L', NULL, NULL, '1', '2022-08-13 14:34:22', '2022-08-24 22:47:53'),
(1178, 280, NULL, '11002', '139', NULL, '219', 'XXL', NULL, NULL, '2', '2022-08-13 14:34:22', '2022-08-24 22:47:53'),
(1179, 281, NULL, '10978', '149', NULL, '219', 'S', NULL, NULL, '5', '2022-08-13 14:51:30', '2022-08-24 22:47:40'),
(1180, 281, NULL, '10979', '149', NULL, '219', 'M', NULL, NULL, '4', '2022-08-13 14:51:30', '2022-08-24 22:47:40'),
(1181, 281, NULL, '10980', '149', NULL, '219', 'L', NULL, NULL, '3', '2022-08-13 14:51:30', '2022-08-24 22:47:40'),
(1182, 281, NULL, '10981', '149', NULL, '219', 'XL', NULL, NULL, '4', '2022-08-13 14:51:30', '2022-08-24 22:47:40'),
(1183, 281, NULL, '10982', '149', NULL, '219', 'XXL', NULL, NULL, '4', '2022-08-13 14:51:30', '2022-08-24 22:47:40'),
(1184, 282, NULL, '10983', '149', NULL, '219', 'S', NULL, NULL, '4', '2022-08-13 14:59:23', '2022-08-24 22:47:22'),
(1185, 282, NULL, '10984', '149', NULL, '219', 'M', NULL, NULL, '2', '2022-08-13 14:59:23', '2022-08-24 22:47:22'),
(1186, 282, NULL, '10985', '149', NULL, '219', 'L', NULL, NULL, '2', '2022-08-13 14:59:23', '2022-08-24 22:47:22'),
(1187, 282, NULL, '10986', '149', NULL, '219', 'XL', NULL, NULL, '3', '2022-08-13 14:59:23', '2022-08-24 22:47:22'),
(1188, 282, NULL, '10987', '149', NULL, '219', 'XXL', NULL, NULL, '2', '2022-08-13 14:59:23', '2022-08-24 22:47:22'),
(1189, 283, NULL, '11008', '149', NULL, '229', 'S', NULL, NULL, '6', '2022-08-13 16:19:39', '2022-08-24 22:46:46'),
(1190, 283, NULL, '11009', '149', NULL, '229', 'M', NULL, NULL, '5', '2022-08-13 16:19:39', '2022-08-24 22:46:46'),
(1191, 283, NULL, '11010', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-13 16:19:39', '2022-08-24 22:46:46'),
(1192, 283, NULL, '11011', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-13 16:19:39', '2022-08-24 22:46:46'),
(1193, 283, NULL, '11012', '149', NULL, '229', 'XXL', NULL, NULL, '5', '2022-08-13 16:19:39', '2022-08-24 22:46:46'),
(1194, 284, NULL, '11013', '149', NULL, '229', 'S', NULL, NULL, '6', '2022-08-13 16:24:30', '2022-08-24 22:46:22'),
(1195, 284, NULL, '11015', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-13 16:24:30', '2022-08-24 22:46:22'),
(1196, 284, NULL, '11016', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-13 16:24:30', '2022-08-24 22:46:22'),
(1197, 284, NULL, '11017', '149', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-13 16:24:30', '2022-08-24 22:46:22'),
(1198, 285, NULL, '11018', '149', NULL, '229', 'S', NULL, NULL, '6', '2022-08-13 16:29:05', '2022-08-24 22:43:49'),
(1199, 285, NULL, '11019', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-13 16:29:05', '2022-08-24 22:43:49'),
(1200, 285, NULL, '11020', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-13 16:29:05', '2022-08-24 22:43:49'),
(1201, 285, NULL, '11021', '149', NULL, '229', 'XL', NULL, NULL, '5', '2022-08-13 16:29:05', '2022-08-24 22:43:49'),
(1202, 285, NULL, '11022', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-13 16:29:05', '2022-08-24 22:43:49'),
(1203, 286, NULL, '11023', '149', NULL, '219', 'S', NULL, NULL, '5', '2022-08-13 16:49:16', '2022-08-24 22:43:22'),
(1204, 286, NULL, '11024', '149', NULL, '219', 'M', NULL, NULL, '4', '2022-08-13 16:49:16', '2022-08-24 22:43:22'),
(1205, 286, NULL, '11025', '149', NULL, '219', 'L', NULL, NULL, '5', '2022-08-13 16:49:16', '2022-08-24 22:43:22'),
(1206, 286, NULL, '11026', '149', NULL, '219', 'XL', NULL, NULL, '4', '2022-08-13 16:49:16', '2022-08-24 22:43:22'),
(1207, 286, NULL, '11027', '149', NULL, '219', 'XXL', NULL, NULL, '4', '2022-08-13 16:49:16', '2022-08-24 22:43:22'),
(1208, 287, NULL, '11028', '149', NULL, '219', 'S', NULL, NULL, '4', '2022-08-13 16:54:11', '2022-08-24 22:43:02'),
(1209, 287, NULL, '11029', '149', NULL, '219', 'M', NULL, NULL, '4', '2022-08-13 16:54:11', '2022-08-24 22:43:02'),
(1210, 287, NULL, '11030', '149', NULL, '219', 'L', NULL, NULL, '4', '2022-08-13 16:54:11', '2022-08-24 22:43:02'),
(1211, 287, NULL, '11031', '149', NULL, '219', 'XL', NULL, NULL, '4', '2022-08-13 16:54:11', '2022-08-24 22:43:02'),
(1212, 287, NULL, '11032', '149', NULL, '219', 'XXL', NULL, NULL, '4', '2022-08-13 16:54:11', '2022-08-24 22:43:02'),
(1213, 288, NULL, '11033', '149', NULL, '219', 'S', NULL, NULL, '4', '2022-08-13 16:58:54', '2022-08-24 22:42:40'),
(1214, 288, NULL, '11034', '149', NULL, '219', 'M', NULL, NULL, '3', '2022-08-13 16:58:54', '2022-08-24 22:42:40'),
(1215, 288, NULL, '11035', '149', NULL, '219', 'L', NULL, NULL, '4', '2022-08-13 16:58:54', '2022-08-24 22:42:40'),
(1216, 288, NULL, '11036', '149', NULL, '219', 'XL', NULL, NULL, '4', '2022-08-13 16:58:54', '2022-08-24 22:42:40'),
(1217, 288, NULL, '11037', '149', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-13 16:58:54', '2022-08-24 22:42:40'),
(1218, 289, NULL, '11038', '149', NULL, '219', 'S', NULL, NULL, '1', '2022-08-13 17:29:46', '2022-08-24 22:42:14'),
(1219, 289, NULL, '11039', '149', NULL, '219', 'M', NULL, NULL, '1', '2022-08-13 17:29:46', '2022-08-24 22:42:14'),
(1220, 290, NULL, '11043', '149', NULL, '219', 'S', NULL, NULL, '1', '2022-08-13 17:34:09', '2022-08-24 22:41:52'),
(1221, 290, NULL, '11046', '149', NULL, '219', 'XL', NULL, NULL, '1', '2022-08-13 17:34:09', '2022-08-24 22:41:52'),
(1222, 290, NULL, '11047', '149', NULL, '219', 'XXL', NULL, NULL, '1', '2022-08-13 17:34:09', '2022-08-24 22:41:52'),
(1223, 291, NULL, '11048', '149', NULL, '219', 'S', NULL, NULL, '1', '2022-08-13 17:41:43', '2022-08-24 22:41:16'),
(1224, 291, NULL, '11049', '149', NULL, '219', 'M', NULL, NULL, '1', '2022-08-13 17:41:43', '2022-08-24 22:41:16'),
(1225, 291, NULL, '11050', '149', NULL, '219', 'L', NULL, NULL, '1', '2022-08-13 17:41:43', '2022-08-24 22:41:16'),
(1226, 291, NULL, '11051', '149', NULL, '219', 'XL', NULL, NULL, '1', '2022-08-13 17:41:43', '2022-08-24 22:41:16'),
(1227, 291, NULL, '11052', '149', NULL, '219', 'XXL', NULL, NULL, '1', '2022-08-13 17:41:43', '2022-08-24 22:41:16'),
(1228, 292, NULL, '11053', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-08-14 07:19:01', '2022-08-24 22:40:50'),
(1229, 292, NULL, '11054', '149', NULL, '249', 'M', NULL, NULL, '4', '2022-08-14 07:19:01', '2022-08-24 22:40:50'),
(1230, 292, NULL, '11055', '149', NULL, '249', 'L', NULL, NULL, '4', '2022-08-14 07:19:01', '2022-08-24 22:40:50'),
(1231, 292, NULL, '11056', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-14 07:19:01', '2022-08-24 22:40:50'),
(1232, 292, NULL, '11057', '149', NULL, '249', 'XXL', NULL, NULL, '5', '2022-08-14 07:19:01', '2022-08-24 22:40:50'),
(1233, 293, NULL, '11058', '149', NULL, '249', 'S', NULL, NULL, '3', '2022-08-14 07:23:39', '2022-08-24 22:39:32'),
(1234, 293, NULL, '11059', '149', NULL, '249', 'M', NULL, NULL, '3', '2022-08-14 07:23:39', '2022-08-24 22:39:32'),
(1235, 293, NULL, '11060', '149', NULL, '249', 'L', NULL, NULL, '3', '2022-08-14 07:23:39', '2022-08-24 22:39:32'),
(1236, 293, NULL, '11061', '149', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-14 07:23:39', '2022-08-24 22:39:32'),
(1237, 293, NULL, '11062', '149', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-14 07:23:39', '2022-08-24 22:39:32'),
(1238, 294, NULL, '11063', '149', NULL, '249', 'S', NULL, NULL, '3', '2022-08-14 07:27:51', '2022-08-24 22:39:02'),
(1239, 294, NULL, '11064', '149', NULL, '249', 'M', NULL, NULL, '3', '2022-08-14 07:27:51', '2022-08-24 22:39:02'),
(1240, 294, NULL, '11065', '149', NULL, '249', 'L', NULL, NULL, '3', '2022-08-14 07:27:51', '2022-08-24 22:39:02'),
(1241, 294, NULL, '11066', '149', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-14 07:27:51', '2022-08-24 22:39:02'),
(1242, 294, NULL, '11067', '149', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-14 07:27:51', '2022-08-24 22:39:02'),
(1243, 295, NULL, '11068', '149', NULL, '249', 'S', NULL, NULL, '3', '2022-08-14 07:32:57', '2022-08-24 22:38:36'),
(1244, 295, NULL, '11069', '149', NULL, '249', 'M', NULL, NULL, '2', '2022-08-14 07:32:57', '2022-08-24 22:38:36'),
(1245, 295, NULL, '11070', '149', NULL, '249', 'L', NULL, NULL, '1', '2022-08-14 07:32:57', '2022-08-24 22:38:36'),
(1246, 295, NULL, '11071', '149', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-14 07:32:57', '2022-08-24 22:38:36'),
(1247, 295, NULL, '11072', '149', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-14 07:32:57', '2022-08-24 22:38:36'),
(1248, 296, NULL, '11073', '169', NULL, '299', 'S', NULL, NULL, '3', '2022-08-14 07:51:35', '2022-08-24 22:38:19'),
(1249, 296, NULL, '11074', '169', NULL, '299', 'M', NULL, NULL, '2', '2022-08-14 07:51:35', '2022-08-24 22:38:19'),
(1250, 296, NULL, '11075', '169', NULL, '299', 'L', NULL, NULL, '3', '2022-08-14 07:51:35', '2022-08-24 22:38:19'),
(1251, 296, NULL, '11076', '169', NULL, '299', 'XL', NULL, NULL, '3', '2022-08-14 07:51:35', '2022-08-24 22:38:19'),
(1252, 296, NULL, '11077', '169', NULL, '299', 'XXL', NULL, NULL, '3', '2022-08-14 07:51:35', '2022-08-24 22:38:19'),
(1253, 297, NULL, '11078', '169', NULL, '299', 'S', NULL, NULL, '4', '2022-08-14 07:55:33', '2022-08-24 22:38:01'),
(1254, 297, NULL, '11079', '169', NULL, '299', 'M', NULL, NULL, '2', '2022-08-14 07:55:33', '2022-08-24 22:38:01'),
(1255, 297, NULL, '11080', '169', NULL, '299', 'L', NULL, NULL, '1', '2022-08-14 07:55:33', '2022-08-24 22:38:01'),
(1256, 297, NULL, '11081', '169', NULL, '299', 'XL', NULL, NULL, '2', '2022-08-14 07:55:33', '2022-08-24 22:38:01'),
(1257, 297, NULL, '11082', '169', NULL, '299', 'XXL', NULL, NULL, '1', '2022-08-14 07:55:33', '2022-08-24 22:38:01'),
(1258, 298, NULL, '11083', '169', NULL, '299', 'S', NULL, NULL, '3', '2022-08-14 07:59:11', '2022-08-24 22:37:44'),
(1259, 298, NULL, '11084', '169', NULL, '299', 'M', NULL, NULL, '3', '2022-08-14 07:59:11', '2022-08-24 22:37:44'),
(1260, 298, NULL, '11085', '169', NULL, '299', 'L', NULL, NULL, '3', '2022-08-14 07:59:11', '2022-08-24 22:37:44'),
(1261, 298, NULL, '11086', '169', NULL, '299', 'XL', NULL, NULL, '3', '2022-08-14 07:59:11', '2022-08-24 22:37:44'),
(1262, 298, NULL, '11087', '169', NULL, '299', 'XXL', NULL, NULL, '2', '2022-08-14 07:59:11', '2022-08-24 22:37:44'),
(1263, 299, NULL, '11088', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-14 08:11:47', '2022-08-24 22:37:17'),
(1264, 299, NULL, '11089', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-14 08:11:47', '2022-08-24 22:37:17'),
(1265, 299, NULL, '11090', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-14 08:11:47', '2022-08-24 22:37:17'),
(1266, 299, NULL, '11091', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-14 08:11:47', '2022-08-24 22:37:17'),
(1267, 299, NULL, '11092', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-14 08:11:47', '2022-08-24 22:37:17'),
(1268, 300, NULL, '11093', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-14 08:15:24', '2022-08-24 22:36:57'),
(1269, 300, NULL, '11094', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-14 08:15:24', '2022-08-24 22:36:57'),
(1270, 300, NULL, '11095', '149', NULL, '229', 'L', NULL, NULL, '5', '2022-08-14 08:15:24', '2022-08-24 22:36:57'),
(1271, 300, NULL, '11096', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-14 08:15:24', '2022-08-24 22:36:57'),
(1272, 300, NULL, '11097', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-14 08:15:24', '2022-08-24 22:36:57'),
(1273, 301, NULL, '11098', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-14 08:20:40', '2022-08-24 22:36:20'),
(1274, 301, NULL, '11099', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-14 08:20:40', '2022-08-24 22:36:20'),
(1275, 301, NULL, '11100', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-14 08:20:40', '2022-08-24 22:36:20'),
(1276, 301, NULL, '11101', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-14 08:20:40', '2022-08-24 22:36:20'),
(1277, 301, NULL, '11102', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-14 08:20:40', '2022-08-24 22:36:20'),
(1278, 302, NULL, '11103', '169', NULL, '279', 'S', NULL, NULL, '1', '2022-08-14 08:35:42', '2022-08-24 22:36:00'),
(1279, 302, NULL, '11104', '169', NULL, '279', 'M', NULL, NULL, '2', '2022-08-14 08:35:42', '2022-08-24 22:36:00'),
(1280, 302, NULL, '11105', '169', NULL, '279', 'L', NULL, NULL, '2', '2022-08-14 08:35:42', '2022-08-24 22:36:00'),
(1281, 302, NULL, '11106', '169', NULL, '279', 'XL', NULL, NULL, '2', '2022-08-14 08:35:42', '2022-08-24 22:36:00'),
(1282, 302, NULL, '11107', '169', NULL, '279', 'XXL', NULL, NULL, '2', '2022-08-14 08:35:42', '2022-08-24 22:36:00'),
(1283, 303, NULL, '11108', '169', NULL, '279', 'S', NULL, NULL, '3', '2022-08-14 08:41:54', '2022-08-24 22:35:22'),
(1284, 303, NULL, '11109', '169', NULL, '279', 'M', NULL, NULL, '3', '2022-08-14 08:41:54', '2022-08-24 22:35:22'),
(1285, 303, NULL, '11110', '169', NULL, '279', 'L', NULL, NULL, '3', '2022-08-14 08:41:54', '2022-08-24 22:35:22'),
(1286, 303, NULL, '11111', '169', NULL, '279', 'XL', NULL, NULL, '3', '2022-08-14 08:41:54', '2022-08-24 22:35:22'),
(1287, 303, NULL, '11112', '169', NULL, '279', 'XXL', NULL, NULL, '3', '2022-08-14 08:41:54', '2022-08-24 22:35:22'),
(1288, 304, NULL, '11113', '169', NULL, '279', 'S', NULL, NULL, '3', '2022-08-14 08:48:12', '2022-08-24 22:34:52'),
(1289, 304, NULL, '11114', '169', NULL, '279', 'M', NULL, NULL, '3', '2022-08-14 08:48:12', '2022-08-24 22:34:52'),
(1290, 304, NULL, '11115', '169', NULL, '279', 'L', NULL, NULL, '3', '2022-08-14 08:48:12', '2022-08-24 22:34:52'),
(1291, 304, NULL, '11116', '169', NULL, '279', 'XL', NULL, NULL, '3', '2022-08-14 08:48:12', '2022-08-24 22:34:52'),
(1292, 304, NULL, '11117', '169', NULL, '279', 'XXL', NULL, NULL, '3', '2022-08-14 08:48:12', '2022-08-24 22:34:52'),
(1293, 305, NULL, '11118', '169', NULL, '279', 'S', NULL, NULL, '3', '2022-08-14 08:53:23', '2022-08-24 22:34:11'),
(1294, 305, NULL, '11120', '169', NULL, '279', 'L', NULL, NULL, '3', '2022-08-14 08:53:23', '2022-08-24 22:34:11'),
(1295, 305, NULL, '11121', '169', NULL, '279', 'XL', NULL, NULL, '2', '2022-08-14 08:53:23', '2022-08-24 22:34:11'),
(1296, 305, NULL, '11122', '169', NULL, '279', 'XXL', NULL, NULL, '3', '2022-08-14 08:53:23', '2022-08-24 22:34:11'),
(1297, 306, NULL, '11123', '179', NULL, '289', 'S', NULL, NULL, '3', '2022-08-14 09:40:59', '2022-08-24 22:33:43'),
(1298, 306, NULL, '11124', '179', NULL, '289', 'M', NULL, NULL, '2', '2022-08-14 09:40:59', '2022-08-24 22:33:43'),
(1299, 306, NULL, '11125', '179', NULL, '289', 'L', NULL, NULL, '3', '2022-08-14 09:40:59', '2022-08-24 22:33:43'),
(1300, 306, NULL, '11126', '179', NULL, '289', 'XL', NULL, NULL, '3', '2022-08-14 09:40:59', '2022-08-24 22:33:43'),
(1301, 306, NULL, '11127', '179', NULL, '289', 'XXL', NULL, NULL, '3', '2022-08-14 09:40:59', '2022-08-24 22:33:43'),
(1302, 307, NULL, '11128', '179', NULL, '289', 'S', NULL, NULL, '3', '2022-08-14 09:45:59', '2022-08-24 22:33:15'),
(1303, 307, NULL, '11129', '179', NULL, '289', 'M', NULL, NULL, '3', '2022-08-14 09:45:59', '2022-08-24 22:33:15'),
(1304, 307, NULL, '11130', '179', NULL, '289', 'L', NULL, NULL, '3', '2022-08-14 09:45:59', '2022-08-24 22:33:15'),
(1305, 307, NULL, '11131', '179', NULL, '289', 'XL', NULL, NULL, '3', '2022-08-14 09:45:59', '2022-08-24 22:33:15'),
(1306, 307, NULL, '11132', '179', NULL, '289', 'XXL', NULL, NULL, '3', '2022-08-14 09:45:59', '2022-08-24 22:33:15'),
(1307, 308, NULL, '11133', '139', NULL, '269', 'S', NULL, NULL, '3', '2022-08-14 13:29:48', '2022-08-24 22:32:44'),
(1308, 308, NULL, '11134', '139', NULL, '269', 'M', NULL, NULL, '3', '2022-08-14 13:29:48', '2022-08-24 22:32:44'),
(1309, 308, NULL, '11135', '139', NULL, '269', 'L', NULL, NULL, '3', '2022-08-14 13:29:48', '2022-08-24 22:32:44'),
(1310, 308, NULL, '11136', '139', NULL, '269', 'XL', NULL, NULL, '3', '2022-08-14 13:29:48', '2022-08-24 22:32:44'),
(1311, 308, NULL, '11137', '139', NULL, '269', 'XXL', NULL, NULL, '3', '2022-08-14 13:29:48', '2022-08-24 22:32:44'),
(1312, 309, NULL, '11143', '139', NULL, '269', 'S', NULL, NULL, '3', '2022-08-14 13:37:33', '2022-08-24 22:32:11'),
(1313, 309, NULL, '11144', '139', NULL, '269', 'M', NULL, NULL, '3', '2022-08-14 13:37:33', '2022-08-24 22:32:11'),
(1314, 309, NULL, '11145', '139', NULL, '269', 'L', NULL, NULL, '3', '2022-08-14 13:37:33', '2022-08-24 22:32:11'),
(1315, 309, NULL, '11146', '139', NULL, '269', 'XL', NULL, NULL, '2', '2022-08-14 13:37:33', '2022-08-24 22:32:11'),
(1316, 309, NULL, '11147', '139', NULL, '269', 'XXL', NULL, NULL, '3', '2022-08-14 13:37:33', '2022-08-24 22:32:11'),
(1317, 310, NULL, '11148', '139', NULL, '269', 'S', NULL, NULL, '3', '2022-08-14 13:41:45', '2022-08-24 22:31:30'),
(1318, 310, NULL, '11149', '139', NULL, '269', 'M', NULL, NULL, '3', '2022-08-14 13:41:45', '2022-08-24 22:31:30'),
(1319, 310, NULL, '11150', '139', NULL, '269', 'L', NULL, NULL, '3', '2022-08-14 13:41:45', '2022-08-24 22:31:30'),
(1320, 310, NULL, '11151', '139', NULL, '269', 'XL', NULL, NULL, '3', '2022-08-14 13:41:45', '2022-08-24 22:31:30'),
(1321, 310, NULL, '11152', '139', NULL, '269', 'XXL', NULL, NULL, '3', '2022-08-14 13:41:45', '2022-08-24 22:31:31'),
(1322, 311, NULL, '11153', '179', NULL, '249', 'S', NULL, NULL, '3', '2022-08-14 13:55:02', '2022-08-24 22:29:16'),
(1323, 311, NULL, '11154', '179', NULL, '249', 'M', NULL, NULL, '3', '2022-08-14 13:55:02', '2022-08-24 22:29:16'),
(1324, 311, NULL, '11155', '179', NULL, '249', 'L', NULL, NULL, '3', '2022-08-14 13:55:02', '2022-08-24 22:29:16'),
(1325, 311, NULL, '11156', '179', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-14 13:55:02', '2022-08-24 22:29:16'),
(1326, 311, NULL, '11157', '179', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-14 13:55:02', '2022-08-24 22:29:16'),
(1327, 312, NULL, '11158', '179', NULL, '249', 'S', NULL, NULL, '3', '2022-08-14 14:01:19', '2022-08-24 22:28:56'),
(1328, 312, NULL, '11159', '179', NULL, '249', 'M', NULL, NULL, '3', '2022-08-14 14:01:19', '2022-08-24 22:28:56'),
(1329, 312, NULL, '11160', '179', NULL, '249', 'L', NULL, NULL, '3', '2022-08-14 14:01:19', '2022-08-24 22:28:56'),
(1330, 312, NULL, '11161', '179', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-14 14:01:19', '2022-08-24 22:28:56'),
(1331, 312, NULL, '11162', '179', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-14 14:01:19', '2022-08-24 22:28:56'),
(1332, 313, NULL, '11163', '179', NULL, '289', 'S', NULL, NULL, '4', '2022-08-14 16:12:27', '2022-08-24 22:28:34'),
(1333, 313, NULL, '11164', '179', NULL, '289', 'M', NULL, NULL, '4', '2022-08-14 16:12:27', '2022-08-24 22:28:34'),
(1334, 313, NULL, '11165', '179', NULL, '289', 'L', NULL, NULL, '4', '2022-08-14 16:12:27', '2022-08-24 22:28:34'),
(1335, 313, NULL, '11166', '179', NULL, '289', 'XL', NULL, NULL, '3', '2022-08-14 16:12:27', '2022-08-24 22:28:34'),
(1336, 313, NULL, '11167', '179', NULL, '289', 'XXL', NULL, NULL, '3', '2022-08-14 16:12:27', '2022-08-24 22:28:34'),
(1337, 314, NULL, '11166', '179', NULL, '289', 'S', NULL, NULL, '5', '2022-08-14 16:27:31', '2022-08-24 22:28:17'),
(1338, 314, NULL, '11167', '179', NULL, '289', 'M', NULL, NULL, '2', '2022-08-14 16:27:31', '2022-08-24 22:28:17'),
(1339, 314, NULL, '11168', '179', NULL, '289', 'L', NULL, NULL, '3', '2022-08-14 16:27:31', '2022-08-24 22:28:17'),
(1340, 314, NULL, '11169', '179', NULL, '289', 'XL', NULL, NULL, '4', '2022-08-14 16:27:31', '2022-08-24 22:28:17'),
(1341, 314, NULL, '11170', '179', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-14 16:27:31', '2022-08-24 22:28:17'),
(1342, 315, NULL, '11173', '139', NULL, '229', 'S', NULL, NULL, '3', '2022-08-14 16:59:11', '2022-08-24 22:28:01'),
(1343, 315, NULL, '11174', '139', NULL, '229', 'M', NULL, NULL, '3', '2022-08-14 16:59:11', '2022-08-24 22:28:01'),
(1344, 315, NULL, '11175', '139', NULL, '229', 'L', NULL, NULL, '3', '2022-08-14 16:59:11', '2022-08-24 22:28:01'),
(1345, 315, NULL, '11176', '139', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-14 16:59:11', '2022-08-24 22:28:01'),
(1346, 315, NULL, '11177', '139', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-14 16:59:11', '2022-08-24 22:28:01'),
(1347, 316, NULL, '11178', '139', NULL, '229', 'S', NULL, NULL, '3', '2022-08-14 17:30:58', '2022-08-24 22:27:46'),
(1348, 316, NULL, '11179', '139', NULL, '229', 'M', NULL, NULL, '3', '2022-08-14 17:30:58', '2022-08-24 22:27:46'),
(1349, 316, NULL, '11180', '139', NULL, '229', 'L', NULL, NULL, '3', '2022-08-14 17:30:58', '2022-08-24 22:27:46'),
(1350, 316, NULL, '11181', '139', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-14 17:30:58', '2022-08-24 22:27:46'),
(1351, 316, NULL, '11182', '139', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-14 17:30:58', '2022-08-24 22:27:46');
INSERT INTO `variations` (`id`, `product_id`, `attribute_id`, `sku_id`, `price`, `description`, `discounted_variation_price`, `variation`, `variation_interval`, `variation_times`, `qty`, `created_at`, `updated_at`) VALUES
(1352, 317, NULL, '11184', '139', NULL, '229', 'S', NULL, NULL, '3', '2022-08-14 17:37:15', '2022-08-24 22:27:26'),
(1353, 317, NULL, '11185', '139', NULL, '229', 'M', NULL, NULL, '3', '2022-08-14 17:37:15', '2022-08-24 22:27:26'),
(1354, 317, NULL, '11186', '139', NULL, '229', 'L', NULL, NULL, '3', '2022-08-14 17:37:15', '2022-08-24 22:27:26'),
(1355, 317, NULL, '11187', '139', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-14 17:37:15', '2022-08-24 22:27:26'),
(1356, 317, NULL, '11188', '139', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-14 17:37:15', '2022-08-24 22:27:26'),
(1357, 318, NULL, '11188', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-14 17:49:52', '2022-08-24 22:27:07'),
(1358, 318, NULL, '11189', '149', NULL, '229', 'M', NULL, NULL, '1', '2022-08-14 17:49:52', '2022-08-24 22:27:07'),
(1359, 318, NULL, '11191', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-14 17:49:52', '2022-08-24 22:27:07'),
(1360, 318, NULL, '11192', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-14 17:49:52', '2022-08-24 22:27:07'),
(1361, 319, NULL, '11193', '149', NULL, '229', 's', NULL, NULL, '2', '2022-08-14 17:53:50', '2022-08-24 22:26:51'),
(1362, 319, NULL, '11194', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-14 17:53:50', '2022-08-24 22:26:51'),
(1363, 320, NULL, '11198', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-14 18:01:20', '2022-08-24 22:26:30'),
(1364, 320, NULL, '11199', '149', NULL, '169', 'M', NULL, NULL, '1', '2022-08-14 18:01:20', '2022-08-24 22:26:30'),
(1365, 320, NULL, '11200', '149', NULL, '169', 'L', NULL, NULL, '2', '2022-08-14 18:01:20', '2022-08-24 22:26:30'),
(1366, 320, NULL, '11201', '149', NULL, '169', 'XL', NULL, NULL, '1', '2022-08-14 18:01:20', '2022-08-24 22:26:30'),
(1367, 320, NULL, '11202', '149', NULL, '169', 'XXL', NULL, NULL, '2', '2022-08-14 18:01:20', '2022-08-24 22:26:30'),
(1368, 321, NULL, '11203', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-14 18:11:51', '2022-08-24 22:26:14'),
(1369, 321, NULL, '11204', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-14 18:11:51', '2022-08-24 22:26:14'),
(1370, 321, NULL, '11205', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-14 18:11:51', '2022-08-24 22:26:14'),
(1371, 321, NULL, '11206', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-14 18:11:51', '2022-08-24 22:26:14'),
(1372, 321, NULL, '11207', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-14 18:11:51', '2022-08-24 22:26:14'),
(1373, 322, NULL, '11208', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-15 07:11:03', '2022-08-24 22:26:00'),
(1374, 322, NULL, '11209', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-15 07:11:03', '2022-08-24 22:26:00'),
(1375, 322, NULL, '11210', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-15 07:11:03', '2022-08-24 22:26:00'),
(1376, 322, NULL, '11211', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-15 07:11:03', '2022-08-24 22:26:00'),
(1377, 322, NULL, '11211', '149', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-15 07:11:03', '2022-08-24 22:26:00'),
(1378, 323, NULL, '11213', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-15 07:19:45', '2022-08-24 22:25:35'),
(1379, 323, NULL, '11214', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-15 07:19:45', '2022-08-24 22:25:35'),
(1380, 323, NULL, '11215', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-15 07:19:45', '2022-08-24 22:25:35'),
(1381, 323, NULL, '11216', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-15 07:19:45', '2022-08-24 22:25:35'),
(1382, 323, NULL, '11217', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-15 07:19:45', '2022-08-24 22:25:35'),
(1383, 324, NULL, '11218', '169', NULL, '269', 'S', NULL, NULL, '3', '2022-08-15 08:11:44', '2022-08-24 22:25:05'),
(1384, 324, NULL, '11219', '169', NULL, '269', 'M', NULL, NULL, '2', '2022-08-15 08:11:44', '2022-08-24 22:25:05'),
(1385, 324, NULL, '11220', '169', NULL, '269', 'L', NULL, NULL, '2', '2022-08-15 08:11:44', '2022-08-24 22:25:05'),
(1386, 324, NULL, '11221', '169', NULL, '269', 'XL', NULL, NULL, '3', '2022-08-15 08:11:44', '2022-08-24 22:25:05'),
(1387, 324, NULL, '11222', '169', NULL, '269', 'XXL', NULL, NULL, '3', '2022-08-15 08:11:44', '2022-08-24 22:25:05'),
(1388, 325, NULL, '11223', '169', NULL, '269', 'S', NULL, NULL, '2', '2022-08-15 08:18:24', '2022-08-24 22:24:41'),
(1389, 325, NULL, '11224', '209', NULL, '269', 'M', NULL, NULL, '3', '2022-08-15 08:18:24', '2022-08-24 22:24:41'),
(1390, 325, NULL, '11225', '209', NULL, '269', 'L', NULL, NULL, '3', '2022-08-15 08:18:24', '2022-08-24 22:24:41'),
(1391, 325, NULL, '11226', '209', NULL, '269', 'XL', NULL, NULL, '3', '2022-08-15 08:18:24', '2022-08-24 22:24:41'),
(1392, 325, NULL, '11227', '209', NULL, '269', 'XXL', NULL, NULL, '3', '2022-08-15 08:18:24', '2022-08-24 22:24:41'),
(1393, 326, NULL, '11228', '139', NULL, '249', 'S', NULL, NULL, '2', '2022-08-15 08:26:46', '2022-08-24 22:24:22'),
(1394, 326, NULL, '11229', '139', NULL, '249', 'M', NULL, NULL, '2', '2022-08-15 08:26:46', '2022-08-24 22:24:22'),
(1395, 326, NULL, '11230', '139', NULL, '249', 'L', NULL, NULL, '2', '2022-08-15 08:26:46', '2022-08-24 22:24:22'),
(1396, 326, NULL, '11231', '139', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-15 08:26:46', '2022-08-24 22:24:22'),
(1397, 326, NULL, '11232', '139', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-15 08:26:46', '2022-08-24 22:24:22'),
(1398, 327, NULL, '11233', '139', NULL, '249', 'S', NULL, NULL, '2', '2022-08-15 08:32:47', '2022-08-24 22:22:58'),
(1399, 327, NULL, '11234', '139', NULL, '249', 'M', NULL, NULL, '2', '2022-08-15 08:32:47', '2022-08-24 22:22:58'),
(1400, 327, NULL, '11235', '139', NULL, '249', 'L', NULL, NULL, '2', '2022-08-15 08:32:47', '2022-08-24 22:22:58'),
(1401, 327, NULL, '11236', '139', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-15 08:32:47', '2022-08-24 22:22:58'),
(1402, 327, NULL, '11237', '139', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-15 08:32:47', '2022-08-24 22:22:58'),
(1403, 328, NULL, '11238', '139', NULL, '249', 'S', NULL, NULL, '2', '2022-08-15 08:41:47', '2022-08-24 22:22:36'),
(1404, 328, NULL, '11239', '139', NULL, '249', 'M', NULL, NULL, '2', '2022-08-15 08:41:47', '2022-08-24 22:22:36'),
(1405, 328, NULL, '11240', '139', NULL, '249', 'L', NULL, NULL, '2', '2022-08-15 08:41:47', '2022-08-24 22:22:36'),
(1406, 328, NULL, '11241', '139', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-15 08:41:47', '2022-08-24 22:22:36'),
(1407, 328, NULL, '11242', '139', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-15 08:41:47', '2022-08-24 22:22:36'),
(1408, 329, NULL, '11243', '169', NULL, '239', 'S', NULL, NULL, '4', '2022-08-15 09:32:10', '2022-08-24 22:22:16'),
(1409, 329, NULL, '11244', '169', NULL, '239', 'M', NULL, NULL, '4', '2022-08-15 09:32:10', '2022-08-24 22:22:16'),
(1410, 329, NULL, '11245', '169', NULL, '239', 'L', NULL, NULL, '4', '2022-08-15 09:32:10', '2022-08-24 22:22:16'),
(1411, 329, NULL, '11246', '169', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-15 09:32:10', '2022-08-24 22:22:16'),
(1412, 329, NULL, '11247', '169', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-15 09:32:10', '2022-08-24 22:22:16'),
(1413, 330, NULL, '11248', '169', NULL, '239', 'S', NULL, NULL, '5', '2022-08-15 09:36:31', '2022-08-24 22:21:59'),
(1414, 330, NULL, '11249', '169', NULL, '239', 'M', NULL, NULL, '2', '2022-08-15 09:36:31', '2022-08-24 22:21:59'),
(1415, 330, NULL, '11250', '169', NULL, '239', 'L', NULL, NULL, '4', '2022-08-15 09:36:31', '2022-08-24 22:21:59'),
(1416, 330, NULL, '11251', '169', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-15 09:36:31', '2022-08-24 22:21:59'),
(1417, 330, NULL, '11252', '169', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-15 09:36:31', '2022-08-24 22:21:59'),
(1418, 331, NULL, '11253', '169', NULL, '269', 'S', NULL, NULL, '2', '2022-08-15 10:01:25', '2022-08-24 22:21:44'),
(1419, 331, NULL, '11254', '169', NULL, '269', 'M', NULL, NULL, '1', '2022-08-15 10:01:25', '2022-08-24 22:21:44'),
(1420, 331, NULL, '11255', '169', NULL, '269', 'L', NULL, NULL, '2', '2022-08-15 10:01:25', '2022-08-24 22:21:44'),
(1421, 331, NULL, '11256', '169', NULL, '269', 'XL', NULL, NULL, '2', '2022-08-15 10:01:25', '2022-08-24 22:21:44'),
(1422, 331, NULL, '11257', '169', NULL, '269', 'XXL', NULL, NULL, '2', '2022-08-15 10:01:25', '2022-08-24 22:21:44'),
(1423, 332, NULL, '11258', '169', NULL, '269', 'S', NULL, NULL, '2', '2022-08-15 10:07:48', '2022-08-24 22:21:23'),
(1424, 332, NULL, '11259', '169', NULL, '269', 'M', NULL, NULL, '1', '2022-08-15 10:07:48', '2022-08-24 22:21:23'),
(1425, 332, NULL, '11260', '169', NULL, '269', 'L', NULL, NULL, '2', '2022-08-15 10:07:48', '2022-08-24 22:21:23'),
(1426, 332, NULL, '11261', '169', NULL, '269', 'XL', NULL, NULL, '2', '2022-08-15 10:07:48', '2022-08-24 22:21:23'),
(1427, 332, NULL, '11262', '169', NULL, '269', 'XXL', NULL, NULL, '2', '2022-08-15 10:07:48', '2022-08-24 22:21:23'),
(1428, 333, NULL, '15084', '169', NULL, '269', 'S', NULL, NULL, '1', '2022-08-15 10:13:04', '2022-08-24 22:20:58'),
(1429, 333, NULL, '15085', '169', NULL, '269', 'M', NULL, NULL, '1', '2022-08-15 10:13:04', '2022-08-24 22:20:58'),
(1430, 333, NULL, '15086', '169', NULL, '269', 'L', NULL, NULL, '1', '2022-08-15 10:13:04', '2022-08-24 22:20:58'),
(1431, 333, NULL, '15087', '169', NULL, '269', 'XL', NULL, NULL, '1', '2022-08-15 10:13:04', '2022-08-24 22:20:58'),
(1432, 333, NULL, '15088', '169', NULL, '269', 'XXL', NULL, NULL, '1', '2022-08-15 10:13:04', '2022-08-24 22:20:58'),
(1433, 334, NULL, '11263', '129', NULL, '169', 'S', NULL, NULL, '4', '2022-08-15 13:44:01', '2022-08-24 22:20:31'),
(1434, 334, NULL, '11264', '129', NULL, '169', 'M', NULL, NULL, '4', '2022-08-15 13:44:01', '2022-08-24 22:20:31'),
(1435, 334, NULL, '11265', '129', NULL, '169', 'L', NULL, NULL, '4', '2022-08-15 13:44:01', '2022-08-24 22:20:31'),
(1436, 334, NULL, '11266', '129', NULL, '169', 'XL', NULL, NULL, '3', '2022-08-15 13:44:01', '2022-08-24 22:20:31'),
(1437, 334, NULL, '11267', '129', NULL, '169', 'XXL', NULL, NULL, '1', '2022-08-15 13:44:01', '2022-08-24 22:20:31'),
(1438, 335, NULL, '11268', '129', NULL, '169', 'S', NULL, NULL, '6', '2022-08-15 13:49:04', '2022-08-24 22:20:03'),
(1439, 335, NULL, '11269', '129', NULL, '169', 'M', NULL, NULL, '4', '2022-08-15 13:49:04', '2022-08-24 22:20:03'),
(1440, 335, NULL, '11270', '129', NULL, '169', 'L', NULL, NULL, '1', '2022-08-15 13:49:04', '2022-08-24 22:20:03'),
(1441, 335, NULL, '11271', '129', NULL, '169', 'XL', NULL, NULL, '1', '2022-08-15 13:49:04', '2022-08-24 22:20:03'),
(1442, 335, NULL, '11272', '129', NULL, '169', 'XXL', NULL, NULL, '4', '2022-08-15 13:49:04', '2022-08-24 22:20:03'),
(1443, 336, NULL, '11273', '129', NULL, '169', 'S', NULL, NULL, '4', '2022-08-15 13:52:38', '2022-08-24 22:19:44'),
(1444, 336, NULL, '11274', '129', NULL, '169', 'M', NULL, NULL, '5', '2022-08-15 13:52:38', '2022-08-24 22:19:44'),
(1445, 336, NULL, '11275', '129', NULL, '169', 'L', NULL, NULL, '1', '2022-08-15 13:52:38', '2022-08-24 22:19:44'),
(1446, 336, NULL, '11276', '129', NULL, '169', 'XL', NULL, NULL, '4', '2022-08-15 13:52:38', '2022-08-24 22:19:44'),
(1447, 336, NULL, '11277', '129', NULL, '169', 'XXL', NULL, NULL, '2', '2022-08-15 13:52:38', '2022-08-24 22:19:44'),
(1448, 337, NULL, '15089', '169', NULL, '269', 'S', NULL, NULL, '3', '2022-08-15 14:08:37', '2022-08-24 22:19:06'),
(1449, 337, NULL, '15090', '169', NULL, '269', 'M', NULL, NULL, '4', '2022-08-15 14:08:37', '2022-08-24 22:19:06'),
(1450, 337, NULL, '15091', '169', NULL, '269', 'L', NULL, NULL, '1', '2022-08-15 14:08:37', '2022-08-24 22:19:06'),
(1451, 337, NULL, '15092', '169', NULL, '269', 'XL', NULL, NULL, '2', '2022-08-15 14:08:37', '2022-08-24 22:19:06'),
(1452, 337, NULL, '15093', '169', NULL, '269', 'XXL', NULL, NULL, '3', '2022-08-15 14:08:37', '2022-08-24 22:19:06'),
(1453, 338, NULL, '11278', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-15 14:22:58', '2022-08-24 22:18:37'),
(1454, 338, NULL, '11279', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-15 14:22:58', '2022-08-24 22:18:37'),
(1455, 338, NULL, '11280', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-15 14:22:58', '2022-08-24 22:18:37'),
(1456, 338, NULL, '11281', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-15 14:22:58', '2022-08-24 22:18:37'),
(1457, 338, NULL, '11282', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-15 14:22:58', '2022-08-24 22:18:37'),
(1458, 339, NULL, '11283', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-15 14:30:54', '2022-08-24 22:18:10'),
(1459, 339, NULL, '11284', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-15 14:30:54', '2022-08-24 22:18:10'),
(1460, 339, NULL, '11285', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-15 14:30:54', '2022-08-24 22:18:10'),
(1461, 339, NULL, '11286', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-15 14:30:54', '2022-08-24 22:18:10'),
(1462, 339, NULL, '11287', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-15 14:30:54', '2022-08-24 22:18:10'),
(1463, 340, NULL, '11288', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-15 14:35:52', '2022-08-24 22:17:52'),
(1464, 340, NULL, '11289', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-15 14:35:52', '2022-08-24 22:17:52'),
(1465, 340, NULL, '11290', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-15 14:35:52', '2022-08-24 22:17:52'),
(1466, 340, NULL, '11290', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-15 14:35:52', '2022-08-24 22:17:52'),
(1467, 340, NULL, '11290', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-15 14:35:52', '2022-08-24 22:17:52'),
(1468, 341, NULL, '11293', '129', NULL, '229', 'S', NULL, NULL, '4', '2022-08-15 14:50:02', '2022-08-24 22:17:02'),
(1469, 341, NULL, '11294', '129', NULL, '229', 'M', NULL, NULL, '5', '2022-08-15 14:50:02', '2022-08-24 22:17:02'),
(1470, 341, NULL, '11295', '129', NULL, '229', 'L', NULL, NULL, '6', '2022-08-15 14:50:02', '2022-08-24 22:17:02'),
(1471, 341, NULL, '11296', '129', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-15 14:50:02', '2022-08-24 22:17:02'),
(1472, 341, NULL, '11297', '129', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-15 14:50:02', '2022-08-24 22:17:02'),
(1473, 342, NULL, '11298', '129', NULL, '229', 'S', NULL, NULL, '4', '2022-08-15 14:56:03', '2022-08-24 22:16:32'),
(1474, 342, NULL, '11299', '129', NULL, '229', 'M', NULL, NULL, '3', '2022-08-15 14:56:03', '2022-08-24 22:16:32'),
(1475, 342, NULL, '11300', '129', NULL, '229', 'L', NULL, NULL, '4', '2022-08-15 14:56:03', '2022-08-24 22:16:32'),
(1476, 342, NULL, '11301', '129', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-15 14:56:03', '2022-08-24 22:16:32'),
(1477, 342, NULL, '11301', '129', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-15 14:56:03', '2022-08-24 22:16:32'),
(1478, 343, NULL, '11303', '129', NULL, '229', 'S', NULL, NULL, '4', '2022-08-15 15:07:28', '2022-08-24 22:15:28'),
(1479, 343, NULL, '11304', '129', NULL, '229', 'M', NULL, NULL, '4', '2022-08-15 15:07:28', '2022-08-24 22:15:28'),
(1480, 343, NULL, '11305', '129', NULL, '229', 'L', NULL, NULL, '4', '2022-08-15 15:07:28', '2022-08-24 22:15:28'),
(1481, 343, NULL, '11306', '129', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-15 15:07:28', '2022-08-24 22:15:28'),
(1482, 343, NULL, '11307', '129', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-15 15:07:28', '2022-08-24 22:15:28'),
(1483, 344, NULL, '11308', '129', NULL, '229', 'S', NULL, NULL, '3', '2022-08-15 15:12:07', '2022-08-24 22:14:47'),
(1484, 344, NULL, '11309', '129', NULL, '229', 'M', NULL, NULL, '3', '2022-08-15 15:12:07', '2022-08-24 22:14:47'),
(1485, 344, NULL, '11310', '129', NULL, '229', 'L', NULL, NULL, '3', '2022-08-15 15:12:07', '2022-08-24 22:14:47'),
(1486, 344, NULL, '11311', '129', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-15 15:12:07', '2022-08-24 22:14:47'),
(1487, 344, NULL, '11312', '129', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-15 15:12:07', '2022-08-24 22:14:47'),
(1488, 345, NULL, '11313', '149', NULL, '269', 'S', NULL, NULL, '3', '2022-08-15 16:08:15', '2022-08-24 22:13:58'),
(1489, 345, NULL, '11314', '149', NULL, '269', 'M', NULL, NULL, '3', '2022-08-15 16:08:15', '2022-08-24 22:13:59'),
(1490, 345, NULL, '11315', '149', NULL, '269', 'L', NULL, NULL, '3', '2022-08-15 16:08:15', '2022-08-24 22:13:59'),
(1491, 345, NULL, '11316', '149', NULL, '269', 'XL', NULL, NULL, '2', '2022-08-15 16:08:15', '2022-08-24 22:13:59'),
(1492, 345, NULL, '11317', '149', NULL, '269', 'XXL', NULL, NULL, '3', '2022-08-15 16:08:15', '2022-08-24 22:13:59'),
(1493, 346, NULL, '11318', '149', NULL, '269', 'S', NULL, NULL, '2', '2022-08-15 16:14:34', '2022-08-24 22:13:14'),
(1494, 346, NULL, '11319', '149', NULL, '269', 'M', NULL, NULL, '2', '2022-08-15 16:14:34', '2022-08-24 22:13:15'),
(1495, 346, NULL, '11320', '149', NULL, '269', 'L', NULL, NULL, '2', '2022-08-15 16:14:34', '2022-08-24 22:13:15'),
(1496, 346, NULL, '11321', '149', NULL, '269', 'XL', NULL, NULL, '2', '2022-08-15 16:14:34', '2022-08-24 22:13:15'),
(1497, 346, NULL, '11322', '149', NULL, '269', 'XXL', NULL, NULL, '2', '2022-08-15 16:14:34', '2022-08-24 22:13:15'),
(1498, 347, NULL, '11323', '149', NULL, '269', 'S', NULL, NULL, '2', '2022-08-15 16:20:46', '2022-08-24 22:12:23'),
(1499, 347, NULL, '11324', '149', NULL, '269', 'M', NULL, NULL, '2', '2022-08-15 16:20:46', '2022-08-24 22:12:23'),
(1500, 347, NULL, '11326', '149', NULL, '269', 'L', NULL, NULL, '2', '2022-08-15 16:20:46', '2022-08-24 22:12:23'),
(1501, 347, NULL, '11327', '149', NULL, '269', 'XL', NULL, NULL, '2', '2022-08-15 16:20:46', '2022-08-24 22:12:23'),
(1502, 347, NULL, '11328', '149', NULL, '269', 'XXL', NULL, NULL, '2', '2022-08-15 16:20:46', '2022-08-24 22:12:23'),
(1503, 348, NULL, '11328', '149', NULL, '219', 'S', NULL, NULL, '4', '2022-08-15 16:32:33', '2022-08-24 22:11:33'),
(1504, 348, NULL, '11329', '149', NULL, '219', 'M', NULL, NULL, '3', '2022-08-15 16:32:33', '2022-08-24 22:11:33'),
(1505, 348, NULL, '11330', '149', NULL, '219', 'L', NULL, NULL, '4', '2022-08-15 16:32:33', '2022-08-24 22:11:33'),
(1506, 348, NULL, '11331', '149', NULL, '219', 'XL', NULL, NULL, '4', '2022-08-15 16:32:33', '2022-08-24 22:11:33'),
(1507, 348, NULL, '11332', '149', NULL, '219', 'XXL', NULL, NULL, '1', '2022-08-15 16:32:33', '2022-08-24 22:11:33'),
(1508, 349, NULL, '11333', '149', NULL, '219', 'S', NULL, NULL, '3', '2022-08-15 16:38:30', '2022-08-24 22:10:30'),
(1509, 349, NULL, '11334', '149', NULL, '219', 'M', NULL, NULL, '3', '2022-08-15 16:38:30', '2022-08-24 22:10:30'),
(1510, 349, NULL, '11335', '149', NULL, '219', 'L', NULL, NULL, '3', '2022-08-15 16:38:30', '2022-08-24 22:10:30'),
(1511, 349, NULL, '11336', '149', NULL, '219', 'XL', NULL, NULL, '3', '2022-08-15 16:38:30', '2022-08-24 22:10:30'),
(1512, 349, NULL, '11337', '149', NULL, '219', 'XXL', NULL, NULL, '2', '2022-08-15 16:38:30', '2022-08-24 22:10:30'),
(1513, 350, NULL, '11338', '149', NULL, '219', 'S', NULL, NULL, '3', '2022-08-15 16:57:20', '2022-08-24 22:10:02'),
(1514, 350, NULL, '11339', '149', NULL, '219', 'M', NULL, NULL, '3', '2022-08-15 16:57:20', '2022-08-24 22:10:03'),
(1515, 350, NULL, '11340', '149', NULL, '219', 'L', NULL, NULL, '3', '2022-08-15 16:57:20', '2022-08-24 22:10:03'),
(1516, 350, NULL, '11341', '149', NULL, '219', 'XL', NULL, NULL, '3', '2022-08-15 16:57:20', '2022-08-24 22:10:03'),
(1517, 350, NULL, '11342', '149', NULL, '219', 'XXL', NULL, NULL, '1', '2022-08-15 16:57:20', '2022-08-24 22:10:03'),
(1518, 351, NULL, '11358', '149', NULL, '229', 'S', NULL, NULL, '5', '2022-08-15 17:32:20', '2022-08-24 22:09:37'),
(1519, 351, NULL, '11359', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-15 17:32:20', '2022-08-24 22:09:37'),
(1520, 351, NULL, '11360', '149', NULL, '229', 'L', NULL, NULL, '5', '2022-08-15 17:32:20', '2022-08-24 22:09:37'),
(1521, 351, NULL, '11361', '149', NULL, '229', 'XL', NULL, NULL, '6', '2022-08-15 17:32:20', '2022-08-24 22:09:37'),
(1522, 351, NULL, '11362', '149', NULL, '229', 'XXL', NULL, NULL, '6', '2022-08-15 17:32:20', '2022-08-24 22:09:37'),
(1523, 352, NULL, '11363', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-15 17:36:31', '2022-08-24 22:08:32'),
(1524, 352, NULL, '11364', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-15 17:36:32', '2022-08-24 22:08:32'),
(1525, 352, NULL, '11365', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-15 17:36:32', '2022-08-24 22:08:32'),
(1526, 352, NULL, '11366', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-15 17:36:32', '2022-08-24 22:08:32'),
(1527, 352, NULL, '11367', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-15 17:36:32', '2022-08-24 22:08:32'),
(1528, 353, NULL, '11368', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-15 17:47:29', '2022-08-24 19:08:13'),
(1529, 353, NULL, '11369', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-15 17:47:29', '2022-08-24 19:08:13'),
(1530, 353, NULL, '11370', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-15 17:47:29', '2022-08-24 19:08:13'),
(1531, 353, NULL, '11371', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-15 17:47:29', '2022-08-24 19:08:13'),
(1532, 353, NULL, '11372', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-15 17:47:29', '2022-08-24 19:08:13'),
(1533, 354, NULL, '11373', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-15 17:52:40', '2022-08-24 19:08:00'),
(1534, 354, NULL, '11374', '149', NULL, '229', 'M', NULL, NULL, '1', '2022-08-15 17:52:40', '2022-08-24 19:08:00'),
(1535, 354, NULL, '11375', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-15 17:52:40', '2022-08-24 19:08:00'),
(1536, 354, NULL, '11376', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-15 17:52:40', '2022-08-24 19:08:00'),
(1537, 354, NULL, '11377', '149', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-15 17:52:40', '2022-08-24 19:08:00'),
(1538, 355, NULL, '11383', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-16 07:39:18', '2022-08-24 22:00:27'),
(1539, 355, NULL, '11384', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-16 07:39:18', '2022-08-24 22:00:27'),
(1540, 355, NULL, '11385', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-16 07:39:18', '2022-08-24 22:00:27'),
(1541, 355, NULL, '11387', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-16 07:39:18', '2022-08-24 22:00:27'),
(1542, 356, NULL, '11388', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-16 07:43:54', '2022-08-24 21:59:52'),
(1543, 356, NULL, '11389', '149', NULL, '229', 'M', NULL, NULL, '1', '2022-08-16 07:43:54', '2022-08-24 21:59:52'),
(1544, 356, NULL, '11390', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-16 07:43:54', '2022-08-24 21:59:52'),
(1545, 356, NULL, '11391', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-16 07:43:54', '2022-08-24 21:59:52'),
(1546, 356, NULL, '11392', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-16 07:43:54', '2022-08-24 21:59:52'),
(1547, 357, NULL, '11393', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-16 07:48:24', '2022-08-24 21:59:24'),
(1548, 357, NULL, '11394', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-16 07:48:24', '2022-08-24 21:59:24'),
(1549, 357, NULL, '11395', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-16 07:48:24', '2022-08-24 21:59:24'),
(1550, 357, NULL, '11396', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-16 07:48:24', '2022-08-24 21:59:25'),
(1551, 357, NULL, '11397', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-16 07:48:24', '2022-08-24 21:59:25'),
(1552, 358, NULL, '11398', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-16 07:56:09', '2022-08-24 21:59:00'),
(1553, 358, NULL, '11399', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-16 07:56:09', '2022-08-24 21:59:00'),
(1554, 358, NULL, '11400', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-16 07:56:09', '2022-08-24 21:59:00'),
(1555, 358, NULL, '11401', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-16 07:56:09', '2022-08-24 21:59:00'),
(1556, 358, NULL, '11402', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-16 07:56:09', '2022-08-24 21:59:00'),
(1557, 359, NULL, '11403', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-16 08:02:07', '2022-08-24 21:58:17'),
(1558, 359, NULL, '11404', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-16 08:02:07', '2022-08-24 21:58:17'),
(1559, 359, NULL, '11405', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-16 08:02:07', '2022-08-24 21:58:17'),
(1560, 359, NULL, '11406', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-16 08:02:07', '2022-08-24 21:58:17'),
(1561, 359, NULL, '11407', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-16 08:02:07', '2022-08-24 21:58:17'),
(1562, 360, NULL, '11408', '169', NULL, '249', 'S', NULL, NULL, '5', '2022-08-16 08:15:15', '2022-08-24 21:58:02'),
(1563, 360, NULL, '11409', '169', NULL, '249', 'M', NULL, NULL, '4', '2022-08-16 08:15:15', '2022-08-24 21:58:02'),
(1564, 360, NULL, '11410', '169', NULL, '249', 'L', NULL, NULL, '2', '2022-08-16 08:15:15', '2022-08-24 21:58:02'),
(1565, 360, NULL, '11411', '169', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-16 08:15:15', '2022-08-24 21:58:02'),
(1566, 360, NULL, '11412', '169', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-16 08:15:15', '2022-08-24 21:58:02'),
(1567, 361, NULL, '11413', '169', NULL, '249', 'S', NULL, NULL, '2', '2022-08-16 08:19:40', '2022-08-24 21:57:29'),
(1568, 361, NULL, '11414', '169', NULL, '249', 'M', NULL, NULL, '4', '2022-08-16 08:19:40', '2022-08-24 21:57:29'),
(1569, 361, NULL, '11415', '169', NULL, '249', 'L', NULL, NULL, '1', '2022-08-16 08:19:40', '2022-08-24 21:57:29'),
(1570, 361, NULL, '11416', '169', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-16 08:19:40', '2022-08-24 21:57:29'),
(1571, 361, NULL, '11417', '169', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-16 08:19:40', '2022-08-24 21:57:29'),
(1572, 362, NULL, '11418', '169', NULL, '269', 'S', NULL, NULL, '2', '2022-08-16 08:37:02', '2022-08-24 21:57:03'),
(1573, 362, NULL, '11419', '169', NULL, '269', 'M', NULL, NULL, '2', '2022-08-16 08:37:02', '2022-08-24 21:57:03'),
(1574, 362, NULL, '11420', '169', NULL, '269', 'L', NULL, NULL, '2', '2022-08-16 08:37:02', '2022-08-24 21:57:03'),
(1575, 362, NULL, '11421', '169', NULL, '269', 'XL', NULL, NULL, '2', '2022-08-16 08:37:02', '2022-08-24 21:57:03'),
(1576, 362, NULL, '11422', '169', NULL, '269', 'XXL', NULL, NULL, '2', '2022-08-16 08:37:02', '2022-08-24 21:57:03'),
(1577, 363, NULL, '11428', '169', NULL, '269', 'S', NULL, NULL, '2', '2022-08-16 08:41:51', '2022-08-24 21:56:30'),
(1578, 363, NULL, '11429', '169', NULL, '269', 'M', NULL, NULL, '2', '2022-08-16 08:41:51', '2022-08-24 21:56:30'),
(1579, 363, NULL, '11430', '169', NULL, '269', 'L', NULL, NULL, '2', '2022-08-16 08:41:51', '2022-08-24 21:56:30'),
(1580, 363, NULL, '11432', '169', NULL, '269', 'XXL', NULL, NULL, '2', '2022-08-16 08:41:51', '2022-08-24 21:56:30'),
(1581, 364, NULL, '11433', '169', NULL, '289', 'S', NULL, NULL, '2', '2022-08-16 09:33:42', '2022-08-24 21:56:08'),
(1582, 364, NULL, '11434', '169', NULL, '289', 'M', NULL, NULL, '2', '2022-08-16 09:33:42', '2022-08-24 21:56:08'),
(1583, 364, NULL, '11435', '169', NULL, '289', 'L', NULL, NULL, '2', '2022-08-16 09:33:42', '2022-08-24 21:56:08'),
(1584, 364, NULL, '11436', '169', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-16 09:33:42', '2022-08-24 21:56:08'),
(1585, 364, NULL, '11437', '169', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-16 09:33:43', '2022-08-24 21:56:08'),
(1586, 365, NULL, '11438', '169', NULL, '289', 'S', NULL, NULL, '1', '2022-08-16 09:38:49', '2022-08-24 21:55:51'),
(1587, 365, NULL, '11439', '169', NULL, '289', 'M', NULL, NULL, '1', '2022-08-16 09:38:49', '2022-08-24 21:55:51'),
(1588, 365, NULL, '11440', '169', NULL, '289', 'L', NULL, NULL, '1', '2022-08-16 09:38:49', '2022-08-24 21:55:51'),
(1589, 365, NULL, '11442', '169', NULL, '289', 'XXL', NULL, NULL, '1', '2022-08-16 09:38:49', '2022-08-24 21:55:51'),
(1590, 366, NULL, '11443', '169', NULL, '289', 'S', NULL, NULL, '2', '2022-08-16 09:53:10', '2022-08-24 21:55:09'),
(1591, 366, NULL, '11444', '169', NULL, '289', 'M', NULL, NULL, '2', '2022-08-16 09:53:10', '2022-08-24 21:55:09'),
(1592, 366, NULL, '11445', '169', NULL, '289', 'L', NULL, NULL, '2', '2022-08-16 09:53:10', '2022-08-24 21:55:09'),
(1593, 366, NULL, '11446', '169', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-16 09:53:10', '2022-08-24 21:55:09'),
(1594, 366, NULL, '11447', '169', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-16 09:53:10', '2022-08-24 21:55:09'),
(1595, 367, NULL, '11448', '169', NULL, '289', 'S', NULL, NULL, '1', '2022-08-16 09:58:40', '2022-08-24 21:54:46'),
(1596, 367, NULL, '11449', '169', NULL, '289', 'M', NULL, NULL, '1', '2022-08-16 09:58:40', '2022-08-24 21:54:46'),
(1597, 367, NULL, '11450', '169', NULL, '289', 'L', NULL, NULL, '1', '2022-08-16 09:58:40', '2022-08-24 21:54:46'),
(1598, 367, NULL, '11451', '169', NULL, '289', 'XL', NULL, NULL, '1', '2022-08-16 09:58:40', '2022-08-24 21:54:46'),
(1599, 367, NULL, '11452', '169', NULL, '289', 'XXL', NULL, NULL, '1', '2022-08-16 09:58:40', '2022-08-24 21:54:46'),
(1600, 368, NULL, '11453', '149', NULL, '289', 'S', NULL, NULL, '3', '2022-08-16 13:32:51', '2022-08-24 21:54:07'),
(1601, 368, NULL, '11454', '149', NULL, '289', 'M', NULL, NULL, '2', '2022-08-16 13:32:52', '2022-08-24 21:54:07'),
(1602, 368, NULL, '11455', '149', NULL, '289', 'L', NULL, NULL, '2', '2022-08-16 13:32:52', '2022-08-24 21:54:07'),
(1603, 368, NULL, '11456', '149', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-16 13:32:52', '2022-08-24 21:54:07'),
(1604, 368, NULL, '11457', '149', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-16 13:32:52', '2022-08-24 21:54:07'),
(1605, 369, NULL, '11458', '149', NULL, '289', 'S', NULL, NULL, '2', '2022-08-16 13:37:04', '2022-08-24 21:53:37'),
(1606, 369, NULL, '11459', '149', NULL, '289', 'M', NULL, NULL, '2', '2022-08-16 13:37:04', '2022-08-24 21:53:37'),
(1607, 369, NULL, '11460', '149', NULL, '289', 'L', NULL, NULL, '2', '2022-08-16 13:37:04', '2022-08-24 21:53:37'),
(1608, 369, NULL, '11461', '149', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-16 13:37:04', '2022-08-24 21:53:37'),
(1609, 369, NULL, '11462', '149', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-16 13:37:04', '2022-08-24 21:53:37'),
(1610, 370, NULL, '11463', '149', NULL, '289', 'S', NULL, NULL, '3', '2022-08-16 13:40:49', '2022-08-24 21:53:20'),
(1611, 370, NULL, '11464', '149', NULL, '289', 'M', NULL, NULL, '2', '2022-08-16 13:40:49', '2022-08-24 21:53:21'),
(1612, 370, NULL, '11465', '149', NULL, '289', 'L', NULL, NULL, '2', '2022-08-16 13:40:49', '2022-08-24 21:53:21'),
(1613, 370, NULL, '11466', '149', NULL, '289', 'XL', NULL, NULL, '2', '2022-08-16 13:40:49', '2022-08-24 21:53:21'),
(1614, 370, NULL, '11467', '149', NULL, '289', 'XXL', NULL, NULL, '2', '2022-08-16 13:40:49', '2022-08-24 21:53:21'),
(1615, 371, NULL, '11468', '149', NULL, '229', 'S', NULL, NULL, '10', '2022-08-16 13:54:34', '2022-08-24 21:53:03'),
(1616, 371, NULL, '11469', '149', NULL, '229', 'M', NULL, NULL, '10', '2022-08-16 13:54:34', '2022-08-24 21:53:03'),
(1617, 371, NULL, '11470', '149', NULL, '229', 'L', NULL, NULL, '7', '2022-08-16 13:54:34', '2022-08-24 21:53:03'),
(1618, 371, NULL, '11471', '149', NULL, '229', 'XL', NULL, NULL, '10', '2022-08-16 13:54:34', '2022-08-24 21:53:03'),
(1619, 371, NULL, '11472', '149', NULL, '229', 'XXL', NULL, NULL, '10', '2022-08-16 13:54:34', '2022-08-24 21:53:03'),
(1620, 372, NULL, '11473', '169', NULL, '239', 'S', NULL, NULL, '1', '2022-08-16 14:24:16', '2022-08-24 21:52:39'),
(1621, 372, NULL, '11475', '169', NULL, '239', 'L', NULL, NULL, '2', '2022-08-16 14:24:16', '2022-08-24 21:52:39'),
(1622, 372, NULL, '11476', '169', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-16 14:24:16', '2022-08-24 21:52:39'),
(1623, 372, NULL, '11477', '169', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-16 14:24:16', '2022-08-24 21:52:39'),
(1624, 373, NULL, '11478', '169', NULL, '239', 'S', NULL, NULL, '1', '2022-08-16 14:32:35', '2022-08-24 21:52:04'),
(1625, 373, NULL, '11479', '169', NULL, '239', 'M', NULL, NULL, '2', '2022-08-16 14:32:35', '2022-08-24 21:52:04'),
(1626, 373, NULL, '11480', '169', NULL, '239', 'L', NULL, NULL, '2', '2022-08-16 14:32:35', '2022-08-24 21:52:04'),
(1627, 373, NULL, '11481', '169', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-16 14:32:35', '2022-08-24 21:52:04'),
(1628, 373, NULL, '11482', '169', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-16 14:32:35', '2022-08-24 21:52:04'),
(1629, 374, NULL, '11483', '169', NULL, '239', 'S', NULL, NULL, '2', '2022-08-16 14:46:15', '2022-08-24 21:51:37'),
(1630, 374, NULL, '11484', '169', NULL, '239', 'M', NULL, NULL, '2', '2022-08-16 14:46:15', '2022-08-24 21:51:37'),
(1631, 374, NULL, '11485', '169', NULL, '239', 'L', NULL, NULL, '2', '2022-08-16 14:46:15', '2022-08-24 21:51:37'),
(1632, 374, NULL, '11486', '169', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-16 14:46:15', '2022-08-24 21:51:37'),
(1633, 374, NULL, '11487', '169', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-16 14:46:15', '2022-08-24 21:51:37'),
(1634, 375, NULL, '11488', '169', NULL, '239', 'S', NULL, NULL, '1', '2022-08-16 14:51:30', '2022-08-24 21:51:12'),
(1635, 375, NULL, '11489', '169', NULL, '239', 'M', NULL, NULL, '1', '2022-08-16 14:51:30', '2022-08-24 21:51:13'),
(1636, 375, NULL, '11490', '169', NULL, '239', 'L', NULL, NULL, '1', '2022-08-16 14:51:30', '2022-08-24 21:51:13'),
(1637, 375, NULL, '11491', '169', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-16 14:51:30', '2022-08-24 21:51:13'),
(1638, 375, NULL, '11492', '169', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-16 14:51:30', '2022-08-24 21:51:13'),
(1639, 376, NULL, '11493', '169', NULL, '239', 'S', NULL, NULL, '1', '2022-08-16 14:56:01', '2022-08-24 21:50:55'),
(1640, 376, NULL, '11494', '169', NULL, '239', 'M', NULL, NULL, '2', '2022-08-16 14:56:01', '2022-08-24 21:50:55'),
(1641, 376, NULL, '11495', '169', NULL, '239', 'L', NULL, NULL, '2', '2022-08-16 14:56:01', '2022-08-24 21:50:55'),
(1642, 376, NULL, '11496', '169', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-16 14:56:01', '2022-08-24 21:50:55'),
(1643, 376, NULL, '11497', '169', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-16 14:56:01', '2022-08-24 21:50:55'),
(1644, 377, NULL, '11498', '169', NULL, '239', 'S', NULL, NULL, '1', '2022-08-16 14:59:43', '2022-08-24 21:50:36'),
(1645, 377, NULL, '11499', '169', NULL, '239', 'M', NULL, NULL, '2', '2022-08-16 14:59:43', '2022-08-24 21:50:36'),
(1646, 377, NULL, '11500', '169', NULL, '239', 'L', NULL, NULL, '2', '2022-08-16 14:59:43', '2022-08-24 21:50:36'),
(1647, 377, NULL, '11501', '169', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-16 14:59:43', '2022-08-24 21:50:36'),
(1648, 377, NULL, '11502', '169', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-16 14:59:43', '2022-08-24 21:50:36'),
(1649, 378, NULL, '11503', '169', NULL, '239', 'S', NULL, NULL, '2', '2022-08-16 15:03:08', '2022-08-24 21:49:56'),
(1650, 378, NULL, '11504', '169', NULL, '239', 'M', NULL, NULL, '2', '2022-08-16 15:03:08', '2022-08-24 21:49:56'),
(1651, 378, NULL, '11505', '169', NULL, '239', 'L', NULL, NULL, '2', '2022-08-16 15:03:08', '2022-08-24 21:49:56'),
(1652, 378, NULL, '11506', '169', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-16 15:03:08', '2022-08-24 21:49:56'),
(1653, 378, NULL, '11507', '169', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-16 15:03:08', '2022-08-24 21:49:56'),
(1654, 379, NULL, '11514', '159', NULL, '239', 'M', NULL, NULL, '1', '2022-08-16 16:01:28', '2022-08-24 21:49:32'),
(1655, 379, NULL, '11515', '159', NULL, '239', 'L', NULL, NULL, '2', '2022-08-16 16:01:28', '2022-08-24 21:49:32'),
(1656, 379, NULL, '11516', '159', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-16 16:01:28', '2022-08-24 21:49:32'),
(1657, 379, NULL, '11517', '159', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-16 16:01:28', '2022-08-24 21:49:32'),
(1658, 380, NULL, '11518', '159', NULL, '239', 'S', NULL, NULL, '1', '2022-08-16 16:06:09', '2022-08-24 21:49:14'),
(1659, 380, NULL, '11519', '159', NULL, '239', 'M', NULL, NULL, '2', '2022-08-16 16:06:09', '2022-08-24 21:49:14'),
(1660, 380, NULL, '11520', '159', NULL, '239', 'L', NULL, NULL, '3', '2022-08-16 16:06:09', '2022-08-24 21:49:14'),
(1661, 380, NULL, '11521', '159', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-16 16:06:09', '2022-08-24 21:49:14'),
(1662, 380, NULL, '11522', '159', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-16 16:06:09', '2022-08-24 21:49:14'),
(1663, 381, NULL, '11523', '159', NULL, '239', 'S', NULL, NULL, '1', '2022-08-16 16:08:45', '2022-08-24 21:48:56'),
(1664, 382, NULL, '11528', '169', NULL, '249', 'S', NULL, NULL, '3', '2022-08-16 16:33:03', '2022-08-24 21:48:38'),
(1665, 382, NULL, '11529', '169', NULL, '249', 'M', NULL, NULL, '1', '2022-08-16 16:33:03', '2022-08-24 21:48:38'),
(1666, 382, NULL, '11530', '169', NULL, '249', 'L', NULL, NULL, '3', '2022-08-16 16:33:03', '2022-08-24 21:48:38'),
(1667, 382, NULL, '11531', '169', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-16 16:33:03', '2022-08-24 21:48:38'),
(1668, 382, NULL, '11532', '169', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-16 16:33:03', '2022-08-24 21:48:38'),
(1669, 383, NULL, '11533', '169', NULL, '249', 'S', NULL, NULL, '3', '2022-08-16 16:36:31', '2022-08-24 21:47:58'),
(1670, 383, NULL, '11534', '169', NULL, '249', 'M', NULL, NULL, '1', '2022-08-16 16:36:31', '2022-08-24 21:47:58'),
(1671, 383, NULL, '11535', '169', NULL, '249', 'L', NULL, NULL, '2', '2022-08-16 16:36:31', '2022-08-24 21:47:58'),
(1672, 383, NULL, '11536', '169', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-16 16:36:31', '2022-08-24 21:47:58'),
(1673, 383, NULL, '11537', '169', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-16 16:36:31', '2022-08-24 21:47:58'),
(1674, 384, NULL, '11538', '169', NULL, '249', 'S', NULL, NULL, '3', '2022-08-16 16:45:25', '2022-08-24 21:47:32'),
(1675, 384, NULL, '11539', '169', NULL, '249', 'M', NULL, NULL, '3', '2022-08-16 16:45:25', '2022-08-24 21:47:32'),
(1676, 384, NULL, '11540', '169', NULL, '249', 'L', NULL, NULL, '3', '2022-08-16 16:45:25', '2022-08-24 21:47:32'),
(1677, 384, NULL, '11541', '169', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-16 16:45:25', '2022-08-24 21:47:32'),
(1678, 384, NULL, '11542', '169', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-16 16:45:25', '2022-08-24 21:47:32'),
(1679, 385, NULL, '11543', '199', NULL, '269', 'S', NULL, NULL, '4', '2022-08-16 16:57:12', '2022-08-24 21:47:06'),
(1680, 385, NULL, '11544', '199', NULL, '269', 'M', NULL, NULL, '5', '2022-08-16 16:57:12', '2022-08-24 21:47:07'),
(1681, 385, NULL, '11545', '199', NULL, '269', 'L', NULL, NULL, '5', '2022-08-16 16:57:12', '2022-08-24 21:47:07'),
(1682, 385, NULL, '11546', '199', NULL, '269', 'XL', NULL, NULL, '4', '2022-08-16 16:57:12', '2022-08-24 21:47:07'),
(1683, 385, NULL, '11547', '199', NULL, '269', 'XXL', NULL, NULL, '5', '2022-08-16 16:57:12', '2022-08-24 21:47:07'),
(1684, 386, NULL, '11548', '199', NULL, '269', 'S', NULL, NULL, '4', '2022-08-16 17:31:40', '2022-08-24 21:46:21'),
(1685, 386, NULL, '11549', '199', NULL, '269', 'M', NULL, NULL, '4', '2022-08-16 17:31:40', '2022-08-24 21:46:21'),
(1686, 386, NULL, '11550', '199', NULL, '269', 'L', NULL, NULL, '4', '2022-08-16 17:31:40', '2022-08-24 21:46:21'),
(1687, 386, NULL, '11551', '199', NULL, '269', 'XL', NULL, NULL, '3', '2022-08-16 17:31:40', '2022-08-24 21:46:21'),
(1688, 386, NULL, '11552', '199', NULL, '269', 'XXL', NULL, NULL, '4', '2022-08-16 17:31:41', '2022-08-24 21:46:21'),
(1689, 387, NULL, '11554', '399', NULL, '699', 'M', NULL, NULL, '2', '2022-08-16 18:07:37', '2022-08-24 19:24:25'),
(1690, 387, NULL, '11555', '399', NULL, '699', 'L', NULL, NULL, '2', '2022-08-16 18:07:37', '2022-08-24 19:24:25'),
(1691, 387, NULL, '11557', '399', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-16 18:07:37', '2022-08-24 19:24:25'),
(1692, 388, NULL, '11559', '399', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 07:13:41', '2022-08-24 19:24:15'),
(1693, 388, NULL, '11560', '399', NULL, '699', 'L', NULL, NULL, '2', '2022-08-17 07:13:41', '2022-08-24 19:24:15'),
(1694, 388, NULL, '11561', '399', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 07:13:41', '2022-08-24 19:24:15'),
(1695, 388, NULL, '11562', '399', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 07:13:41', '2022-08-24 19:24:15'),
(1696, 389, NULL, '11563', '399', NULL, '699', 'S', NULL, NULL, '2', '2022-08-17 07:24:31', '2022-08-24 19:24:03'),
(1697, 389, NULL, '11564', '399', NULL, '699', 'M', NULL, NULL, '2', '2022-08-17 07:24:31', '2022-08-24 19:24:03'),
(1698, 389, NULL, '11565', '399', NULL, '699', 'L', NULL, NULL, '2', '2022-08-17 07:24:31', '2022-08-24 19:24:03'),
(1699, 389, NULL, '11566', '399', NULL, '699', 'XL', NULL, NULL, '2', '2022-08-17 07:24:31', '2022-08-24 19:24:03'),
(1700, 389, NULL, '11567', '399', NULL, '699', 'XXL', NULL, NULL, '2', '2022-08-17 07:24:31', '2022-08-24 19:24:03'),
(1701, 390, NULL, '11568', '399', NULL, '699', 'S', NULL, NULL, '2', '2022-08-17 07:28:13', '2022-08-24 19:23:51'),
(1702, 390, NULL, '11569', '399', NULL, '699', 'M', NULL, NULL, '2', '2022-08-17 07:28:13', '2022-08-24 19:23:51'),
(1703, 390, NULL, '11570', '399', NULL, '699', 'L', NULL, NULL, '2', '2022-08-17 07:28:13', '2022-08-24 19:23:51'),
(1704, 390, NULL, '11571', '399', NULL, '699', 'XL', NULL, NULL, '2', '2022-08-17 07:28:13', '2022-08-24 19:23:51'),
(1705, 390, NULL, '11572', '399', NULL, '699', 'XXL', NULL, NULL, '2', '2022-08-17 07:28:13', '2022-08-24 19:23:51'),
(1706, 391, NULL, '11589', '459', NULL, '799', 'S', NULL, NULL, '3', '2022-08-17 08:03:54', '2022-08-24 19:23:25'),
(1707, 391, NULL, '11590', '459', NULL, '799', 'M', NULL, NULL, '1', '2022-08-17 08:03:54', '2022-08-24 19:23:25'),
(1708, 391, NULL, '11591', '459', NULL, '799', 'L', NULL, NULL, '2', '2022-08-17 08:03:54', '2022-08-24 19:23:25'),
(1709, 391, NULL, '11592', '459', NULL, '799', 'XL', NULL, NULL, '2', '2022-08-17 08:03:54', '2022-08-24 19:23:25'),
(1710, 391, NULL, '11593', '459', NULL, '799', 'XXL', NULL, NULL, '2', '2022-08-17 08:03:54', '2022-08-24 19:23:25'),
(1711, 392, NULL, '11594', '459', NULL, '799', 'S', NULL, NULL, '2', '2022-08-17 08:13:05', '2022-08-24 19:23:10'),
(1712, 392, NULL, '11595', '459', NULL, '799', 'M', NULL, NULL, '2', '2022-08-17 08:13:05', '2022-08-24 19:23:10'),
(1713, 392, NULL, '11596', '459', NULL, '799', 'L', NULL, NULL, '2', '2022-08-17 08:13:05', '2022-08-24 19:23:10'),
(1714, 392, NULL, '11597', '459', NULL, '799', 'XL', NULL, NULL, '2', '2022-08-17 08:13:05', '2022-08-24 19:23:10'),
(1715, 392, NULL, '11598', '459', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-17 08:13:05', '2022-08-24 19:23:10'),
(1716, 393, NULL, '11599', '459', NULL, '799', 'S', NULL, NULL, '2', '2022-08-17 08:18:08', '2022-08-24 19:22:50'),
(1717, 393, NULL, '11600', '459', NULL, '799', 'M', NULL, NULL, '2', '2022-08-17 08:18:08', '2022-08-24 19:22:50'),
(1718, 393, NULL, '11601', '459', NULL, '799', 'L', NULL, NULL, '2', '2022-08-17 08:18:08', '2022-08-24 19:22:50'),
(1719, 393, NULL, '11602', '459', NULL, '799', 'XL', NULL, NULL, '2', '2022-08-17 08:18:08', '2022-08-24 19:22:50'),
(1720, 393, NULL, '11603', '459', NULL, '799', 'XXL', NULL, NULL, '2', '2022-08-17 08:18:08', '2022-08-24 19:22:50'),
(1721, 394, NULL, '11606', '459', NULL, '799', 'M', NULL, NULL, '3', '2022-08-17 08:24:19', '2022-08-24 19:22:38'),
(1722, 394, NULL, '11607', '459', NULL, '799', 'L', NULL, NULL, '3', '2022-08-17 08:24:19', '2022-08-24 19:22:38'),
(1723, 394, NULL, '11608', '459', NULL, '799', 'XL', NULL, NULL, '2', '2022-08-17 08:24:19', '2022-08-24 19:22:38'),
(1724, 395, NULL, '8893', '449', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 08:56:18', '2022-08-24 19:22:18'),
(1725, 395, NULL, '8895', '449', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 08:56:18', '2022-08-24 19:22:18'),
(1726, 396, NULL, '11613', '449', NULL, '749', 'M', NULL, NULL, '2', '2022-08-17 09:33:50', '2022-08-24 19:22:07'),
(1727, 396, NULL, '11614', '449', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 09:33:50', '2022-08-24 19:22:07'),
(1728, 396, NULL, '11615', '449', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 09:33:50', '2022-08-24 19:22:07'),
(1729, 396, NULL, '11616', '449', NULL, '749', 'XXL', NULL, NULL, '2', '2022-08-17 09:33:50', '2022-08-24 19:22:07'),
(1730, 397, NULL, '11617', '449', NULL, '749', 'M', NULL, NULL, '2', '2022-08-17 09:37:43', '2022-08-24 19:21:56'),
(1731, 397, NULL, '11618', '449', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 09:37:43', '2022-08-24 19:21:56'),
(1732, 397, NULL, '11619', '449', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 09:37:43', '2022-08-24 19:21:56'),
(1733, 397, NULL, '11620', '449', NULL, '749', 'XXL', NULL, NULL, '2', '2022-08-17 09:37:43', '2022-08-24 19:21:56'),
(1734, 398, NULL, '11637', '449', NULL, '799', 'M', NULL, NULL, '2', '2022-08-17 09:49:20', '2022-08-24 19:21:23'),
(1735, 398, NULL, '11638', '449', NULL, '799', 'L', NULL, NULL, '2', '2022-08-17 09:49:20', '2022-08-24 19:21:23'),
(1736, 398, NULL, '11639', '449', NULL, '799', 'XL', NULL, NULL, '2', '2022-08-17 09:49:20', '2022-08-24 19:21:23'),
(1737, 398, NULL, '11640', '449', NULL, '799', 'XXL', NULL, NULL, '2', '2022-08-17 09:49:20', '2022-08-24 19:21:23'),
(1738, 399, NULL, '11641', '449', NULL, '799', 'M', NULL, NULL, '2', '2022-08-17 09:55:37', '2022-08-24 19:21:11'),
(1739, 399, NULL, '11642', '449', NULL, '799', 'L', NULL, NULL, '2', '2022-08-17 09:55:37', '2022-08-24 19:21:11'),
(1740, 399, NULL, '11643', '449', NULL, '799', 'XL', NULL, NULL, '2', '2022-08-17 09:55:37', '2022-08-24 19:21:11'),
(1741, 399, NULL, '11644', '449', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-17 09:55:37', '2022-08-24 19:21:11'),
(1742, 400, NULL, '11645', '449', NULL, '799', 'M', NULL, NULL, '2', '2022-08-17 10:00:24', '2022-08-24 19:20:59'),
(1743, 400, NULL, '11646', '449', NULL, '799', 'L', NULL, NULL, '1', '2022-08-17 10:00:24', '2022-08-24 19:20:59'),
(1744, 400, NULL, '11647', '449', NULL, '799', 'XL', NULL, NULL, '2', '2022-08-17 10:00:24', '2022-08-24 19:20:59'),
(1745, 400, NULL, '11648', '449', NULL, '799', 'XXL', NULL, NULL, '2', '2022-08-17 10:00:24', '2022-08-24 19:20:59'),
(1746, 401, NULL, '11649', '449', NULL, '799', 'M', NULL, NULL, '2', '2022-08-17 10:03:41', '2022-08-24 19:20:47'),
(1747, 401, NULL, '11650', '449', NULL, '799', 'L', NULL, NULL, '2', '2022-08-17 10:03:41', '2022-08-24 19:20:47'),
(1748, 401, NULL, '11651', '449', NULL, '799', 'XL', NULL, NULL, '2', '2022-08-17 10:03:41', '2022-08-24 19:20:47'),
(1749, 401, NULL, '11652', '449', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-17 10:03:41', '2022-08-24 19:20:47'),
(1750, 402, NULL, '11653', '459', NULL, '749', 'M', NULL, NULL, '2', '2022-08-17 13:47:26', '2022-08-24 19:20:25'),
(1751, 402, NULL, '11654', '459', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 13:47:26', '2022-08-24 19:20:25'),
(1752, 402, NULL, '11655', '459', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 13:47:26', '2022-08-24 19:20:25'),
(1753, 402, NULL, '11656', '459', NULL, '749', 'XXL', NULL, NULL, '2', '2022-08-17 13:47:26', '2022-08-24 19:20:25'),
(1754, 403, NULL, '11657', '459', NULL, '749', 'M', NULL, NULL, '2', '2022-08-17 13:52:43', '2022-08-24 19:20:10'),
(1755, 403, NULL, '11658', '459', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 13:52:43', '2022-08-24 19:20:10'),
(1756, 403, NULL, '11659', '459', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 13:52:43', '2022-08-24 19:20:10'),
(1757, 403, NULL, '11660', '459', NULL, '749', 'XXL', NULL, NULL, '2', '2022-08-17 13:52:43', '2022-08-24 19:20:10'),
(1758, 404, NULL, '11661', '459', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 13:58:33', '2022-08-24 19:19:56'),
(1759, 404, NULL, '11662', '459', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 13:58:33', '2022-08-24 19:19:56'),
(1760, 404, NULL, '11663', '459', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 13:58:33', '2022-08-24 19:19:56'),
(1761, 404, NULL, '11664', '459', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 13:58:33', '2022-08-24 19:19:56'),
(1762, 405, NULL, '11681', '449', NULL, '749', 'S', NULL, NULL, '1', '2022-08-17 14:11:11', '2022-08-24 19:19:34'),
(1763, 405, NULL, '11682', '449', NULL, '749', 'M', NULL, NULL, '2', '2022-08-17 14:11:11', '2022-08-24 19:19:34'),
(1764, 405, NULL, '11683', '449', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 14:11:11', '2022-08-24 19:19:34'),
(1765, 405, NULL, '11684', '449', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 14:11:11', '2022-08-24 19:19:34'),
(1766, 405, NULL, '11685', '449', NULL, '749', 'XXL', NULL, NULL, '2', '2022-08-17 14:11:11', '2022-08-24 19:19:34'),
(1767, 406, NULL, '11687', '449', NULL, '749', 'M', NULL, NULL, '2', '2022-08-17 14:16:12', '2022-08-24 19:19:20'),
(1768, 406, NULL, '11688', '449', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 14:16:12', '2022-08-24 19:19:20'),
(1769, 406, NULL, '11689', '449', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 14:16:12', '2022-08-24 19:19:20'),
(1770, 406, NULL, '11690', '449', NULL, '749', 'XXL', NULL, NULL, '2', '2022-08-17 14:16:12', '2022-08-24 19:19:20'),
(1771, 407, NULL, '11691', '449', NULL, '749', 'S', NULL, NULL, '2', '2022-08-17 14:21:33', '2022-08-24 19:19:06'),
(1772, 407, NULL, '11692', '449', NULL, '749', 'M', NULL, NULL, '2', '2022-08-17 14:21:33', '2022-08-24 19:19:06'),
(1773, 407, NULL, '11693', '449', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 14:21:33', '2022-08-24 19:19:06'),
(1774, 407, NULL, '11694', '449', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 14:21:33', '2022-08-24 19:19:06'),
(1775, 408, NULL, '11696', '449', NULL, '749', 'S', NULL, NULL, '2', '2022-08-17 14:28:15', '2022-08-24 19:18:54'),
(1776, 408, NULL, '11697', '449', NULL, '749', 'M', NULL, NULL, '2', '2022-08-17 14:28:15', '2022-08-24 19:18:54'),
(1777, 408, NULL, '11698', '449', NULL, '749', 'L', NULL, NULL, '2', '2022-08-17 14:28:15', '2022-08-24 19:18:54'),
(1778, 408, NULL, '11699', '449', NULL, '749', 'XL', NULL, NULL, '2', '2022-08-17 14:28:15', '2022-08-24 19:18:54'),
(1779, 408, NULL, '11700', '449', NULL, '749', 'XXL', NULL, NULL, '2', '2022-08-17 14:28:15', '2022-08-24 19:18:54'),
(1780, 409, NULL, '11573', '449', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 15:00:48', '2022-08-24 19:18:31'),
(1781, 409, NULL, '11574', '449', NULL, '699', 'L', NULL, NULL, '1', '2022-08-17 15:00:48', '2022-08-24 19:18:31'),
(1782, 409, NULL, '11575', '449', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 15:00:48', '2022-08-24 19:18:31'),
(1783, 409, NULL, '11576', '449', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 15:00:48', '2022-08-24 19:18:31'),
(1784, 410, NULL, '11577', '449', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 15:07:11', '2022-08-24 19:18:17'),
(1785, 410, NULL, '11578', '449', NULL, '699', 'L', NULL, NULL, '1', '2022-08-17 15:07:11', '2022-08-24 19:18:17');
INSERT INTO `variations` (`id`, `product_id`, `attribute_id`, `sku_id`, `price`, `description`, `discounted_variation_price`, `variation`, `variation_interval`, `variation_times`, `qty`, `created_at`, `updated_at`) VALUES
(1786, 410, NULL, '11579', '449', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 15:07:11', '2022-08-24 19:18:17'),
(1787, 410, NULL, '11580', '449', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 15:07:11', '2022-08-24 19:18:17'),
(1788, 411, NULL, '11581', '449', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 15:14:32', '2022-08-24 19:17:59'),
(1789, 411, NULL, '11582', '449', NULL, '699', 'L', NULL, NULL, '1', '2022-08-17 15:14:32', '2022-08-24 19:17:59'),
(1790, 411, NULL, '11583', '449', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 15:14:32', '2022-08-24 19:17:59'),
(1791, 411, NULL, '11584', '449', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 15:14:32', '2022-08-24 19:17:59'),
(1792, 412, NULL, '11585', '449', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 15:22:30', '2022-08-24 19:17:47'),
(1793, 412, NULL, '11586', '449', NULL, '699', 'L', NULL, NULL, '1', '2022-08-17 15:22:30', '2022-08-24 19:17:47'),
(1794, 412, NULL, '11587', '449', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 15:22:30', '2022-08-24 19:17:47'),
(1795, 412, NULL, '11588', '449', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 15:22:30', '2022-08-24 19:17:47'),
(1796, 413, NULL, '11621', '449', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 16:01:24', '2022-08-24 19:17:17'),
(1797, 413, NULL, '11622', '449', NULL, '749', 'L', NULL, NULL, '1', '2022-08-17 16:01:24', '2022-08-24 19:17:17'),
(1798, 413, NULL, '11623', '449', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 16:01:24', '2022-08-24 19:17:17'),
(1799, 413, NULL, '11624', '449', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 16:01:24', '2022-08-24 19:17:17'),
(1800, 414, NULL, '11625', '449', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 16:07:23', '2022-08-24 19:17:02'),
(1801, 414, NULL, '11626', '449', NULL, '749', 'L', NULL, NULL, '1', '2022-08-17 16:07:23', '2022-08-24 19:17:02'),
(1802, 414, NULL, '11627', '449', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 16:07:23', '2022-08-24 19:17:02'),
(1803, 414, NULL, '11628', '449', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 16:07:23', '2022-08-24 19:17:02'),
(1804, 415, NULL, '11629', '449', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 16:10:40', '2022-08-24 19:16:51'),
(1805, 415, NULL, '11630', '449', NULL, '749', 'L', NULL, NULL, '1', '2022-08-17 16:10:40', '2022-08-24 19:16:51'),
(1806, 415, NULL, '11631', '449', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 16:10:40', '2022-08-24 19:16:51'),
(1807, 415, NULL, '11632', '449', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 16:10:40', '2022-08-24 19:16:51'),
(1808, 416, NULL, '11633', '449', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 16:16:24', '2022-08-24 19:16:36'),
(1809, 416, NULL, '11634', '449', NULL, '749', 'L', NULL, NULL, '1', '2022-08-17 16:16:24', '2022-08-24 19:16:36'),
(1810, 416, NULL, '11635', '449', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 16:16:24', '2022-08-24 19:16:36'),
(1811, 416, NULL, '11636', '449', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 16:16:24', '2022-08-24 19:16:36'),
(1812, 417, NULL, '11665', '459', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 16:29:19', '2022-08-24 19:16:15'),
(1813, 417, NULL, '11666', '459', NULL, '749', 'L', NULL, NULL, '1', '2022-08-17 16:29:19', '2022-08-24 19:16:15'),
(1814, 417, NULL, '11667', '459', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 16:29:19', '2022-08-24 19:16:15'),
(1815, 417, NULL, '11668', '459', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 16:29:19', '2022-08-24 19:16:15'),
(1816, 418, NULL, '11669', '459', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 16:33:19', '2022-08-24 19:16:02'),
(1817, 418, NULL, '11670', '459', NULL, '749', 'L', NULL, NULL, '1', '2022-08-17 16:33:19', '2022-08-24 19:16:02'),
(1818, 418, NULL, '11671', '459', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 16:33:19', '2022-08-24 19:16:02'),
(1819, 418, NULL, '11672', '459', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 16:33:19', '2022-08-24 19:16:02'),
(1820, 419, NULL, '11673', '459', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 16:38:50', '2022-08-24 19:15:49'),
(1821, 419, NULL, '11674', '459', NULL, '749', 'L', NULL, NULL, '1', '2022-08-17 16:38:50', '2022-08-24 19:15:49'),
(1822, 419, NULL, '11675', '459', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 16:38:50', '2022-08-24 19:15:49'),
(1823, 419, NULL, '11676', '459', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 16:38:50', '2022-08-24 19:15:49'),
(1824, 420, NULL, '11677', '459', NULL, '749', 'M', NULL, NULL, '1', '2022-08-17 16:44:49', '2022-08-24 19:15:37'),
(1825, 420, NULL, '11678', '459', NULL, '749', 'L', NULL, NULL, '1', '2022-08-17 16:44:49', '2022-08-24 19:15:37'),
(1826, 420, NULL, '11679', '459', NULL, '749', 'XL', NULL, NULL, '1', '2022-08-17 16:44:49', '2022-08-24 19:15:37'),
(1827, 420, NULL, '11680', '459', NULL, '749', 'XXL', NULL, NULL, '1', '2022-08-17 16:44:49', '2022-08-24 19:15:37'),
(1828, 421, NULL, '11701', '449', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 17:32:50', '2022-08-24 19:15:10'),
(1829, 421, NULL, '11702', '449', NULL, '699', 'L', NULL, NULL, '1', '2022-08-17 17:32:50', '2022-08-24 19:15:10'),
(1830, 421, NULL, '11703', '449', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 17:32:50', '2022-08-24 19:15:10'),
(1831, 421, NULL, '11704', '449', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 17:32:50', '2022-08-24 19:15:10'),
(1832, 422, NULL, '11705', '449', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 17:36:32', '2022-08-24 19:14:58'),
(1833, 422, NULL, '11706', '449', NULL, '699', 'L', NULL, NULL, '1', '2022-08-17 17:36:32', '2022-08-24 19:14:58'),
(1834, 422, NULL, '11707', '449', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 17:36:32', '2022-08-24 19:14:58'),
(1835, 422, NULL, '11708', '449', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 17:36:32', '2022-08-24 19:14:58'),
(1836, 423, NULL, '11709', '449', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 17:39:57', '2022-08-24 19:14:45'),
(1837, 423, NULL, '11710', '449', NULL, '699', 'L', NULL, NULL, '1', '2022-08-17 17:39:57', '2022-08-24 19:14:45'),
(1838, 423, NULL, '11711', '449', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 17:39:57', '2022-08-24 19:14:45'),
(1839, 423, NULL, '11712', '449', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 17:39:57', '2022-08-24 19:14:45'),
(1840, 424, NULL, '11713', '449', NULL, '699', 'M', NULL, NULL, '1', '2022-08-17 17:42:51', '2022-08-24 19:14:32'),
(1841, 424, NULL, '11714', '449', NULL, '699', 'L', NULL, NULL, '1', '2022-08-17 17:42:51', '2022-08-24 19:14:32'),
(1842, 424, NULL, '11715', '449', NULL, '699', 'XL', NULL, NULL, '1', '2022-08-17 17:42:51', '2022-08-24 19:14:32'),
(1843, 424, NULL, '11716', '449', NULL, '699', 'XXL', NULL, NULL, '1', '2022-08-17 17:42:51', '2022-08-24 19:14:32'),
(1844, 425, NULL, '11717', '459', NULL, '799', 'M', NULL, NULL, '1', '2022-08-17 17:48:13', '2022-08-24 19:14:02'),
(1845, 425, NULL, '11718', '459', NULL, '799', 'L', NULL, NULL, '1', '2022-08-17 17:48:13', '2022-08-24 19:14:02'),
(1846, 425, NULL, '11719', '459', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-17 17:48:13', '2022-08-24 19:14:02'),
(1847, 425, NULL, '11720', '459', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-17 17:48:13', '2022-08-24 19:14:02'),
(1848, 426, NULL, '11721', '459', NULL, '799', 'M', NULL, NULL, '1', '2022-08-17 17:51:24', '2022-08-24 19:13:49'),
(1849, 426, NULL, '11722', '459', NULL, '799', 'L', NULL, NULL, '1', '2022-08-17 17:51:24', '2022-08-24 19:13:49'),
(1850, 426, NULL, '11723', '459', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-17 17:51:24', '2022-08-24 19:13:49'),
(1851, 426, NULL, '11724', '459', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-17 17:51:24', '2022-08-24 19:13:49'),
(1852, 427, NULL, '11725', '459', NULL, '799', 'M', NULL, NULL, '1', '2022-08-17 17:54:56', '2022-08-24 19:13:38'),
(1853, 427, NULL, '11726', '459', NULL, '799', 'L', NULL, NULL, '1', '2022-08-17 17:54:56', '2022-08-24 19:13:38'),
(1854, 427, NULL, '11727', '459', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-17 17:54:56', '2022-08-24 19:13:38'),
(1855, 427, NULL, '11728', '459', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-17 17:54:56', '2022-08-24 19:13:38'),
(1856, 428, NULL, '11729', '459', NULL, '799', 'M', NULL, NULL, '1', '2022-08-17 18:00:31', '2022-08-24 19:13:25'),
(1857, 428, NULL, '11730', '459', NULL, '799', 'L', NULL, NULL, '1', '2022-08-17 18:00:31', '2022-08-24 19:13:25'),
(1858, 428, NULL, '11731', '459', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-17 18:00:31', '2022-08-24 19:13:25'),
(1859, 428, NULL, '11732', '459', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-17 18:00:31', '2022-08-24 19:13:25'),
(1860, 429, NULL, '11733', '479', NULL, '799', 'S', NULL, NULL, '1', '2022-08-18 07:05:50', '2022-08-24 19:13:05'),
(1861, 429, NULL, '11734', '479', NULL, '799', 'M', NULL, NULL, '1', '2022-08-18 07:05:50', '2022-08-24 19:13:05'),
(1862, 429, NULL, '11735', '479', NULL, '799', 'L', NULL, NULL, '1', '2022-08-18 07:05:50', '2022-08-24 19:13:05'),
(1863, 429, NULL, '11736', '479', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-18 07:05:50', '2022-08-24 19:13:05'),
(1864, 429, NULL, '11737', '479', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-18 07:05:50', '2022-08-24 19:13:05'),
(1865, 430, NULL, '11738', '479', NULL, '799', 'S', NULL, NULL, '1', '2022-08-18 07:09:09', '2022-08-24 19:12:51'),
(1866, 430, NULL, '11739', '479', NULL, '799', 'M', NULL, NULL, '1', '2022-08-18 07:09:09', '2022-08-24 19:12:51'),
(1867, 430, NULL, '11740', '479', NULL, '799', 'L', NULL, NULL, '1', '2022-08-18 07:09:09', '2022-08-24 19:12:51'),
(1868, 430, NULL, '11741', '479', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-18 07:09:09', '2022-08-24 19:12:51'),
(1869, 430, NULL, '11742', '479', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-18 07:09:09', '2022-08-24 19:12:51'),
(1870, 431, NULL, '11743', '479', NULL, '799', 'S', NULL, NULL, '1', '2022-08-18 07:13:20', '2022-08-24 19:12:40'),
(1871, 431, NULL, '11745', '479', NULL, '799', 'M', NULL, NULL, '1', '2022-08-18 07:13:20', '2022-08-24 19:12:40'),
(1872, 431, NULL, '11746', '479', NULL, '799', 'L', NULL, NULL, '1', '2022-08-18 07:13:20', '2022-08-24 19:12:40'),
(1873, 431, NULL, '11747', '479', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-18 07:13:20', '2022-08-24 19:12:40'),
(1874, 431, NULL, '11748', '479', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-18 07:13:20', '2022-08-24 19:12:40'),
(1875, 432, NULL, '11748', '479', NULL, '799', 'S', NULL, NULL, '1', '2022-08-18 07:16:08', '2022-08-24 19:12:27'),
(1876, 432, NULL, '11749', '479', NULL, '799', 'M', NULL, NULL, '1', '2022-08-18 07:16:08', '2022-08-24 19:12:27'),
(1877, 432, NULL, '11750', '479', NULL, '799', 'L', NULL, NULL, '1', '2022-08-18 07:16:08', '2022-08-24 19:12:27'),
(1878, 432, NULL, '11751', '479', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-18 07:16:08', '2022-08-24 19:12:27'),
(1879, 432, NULL, '11752', '479', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-18 07:16:08', '2022-08-24 19:12:27'),
(1880, 433, NULL, '11753', '449', NULL, '799', 'S', NULL, NULL, '1', '2022-08-18 07:32:39', '2022-08-24 19:11:47'),
(1881, 433, NULL, '11754', '449', NULL, '799', 'M', NULL, NULL, '1', '2022-08-18 07:32:39', '2022-08-24 19:11:47'),
(1882, 433, NULL, '11755', '449', NULL, '799', 'L', NULL, NULL, '1', '2022-08-18 07:32:39', '2022-08-24 19:11:47'),
(1883, 433, NULL, '11756', '449', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-18 07:32:39', '2022-08-24 19:11:47'),
(1884, 433, NULL, '11757', '449', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-18 07:32:39', '2022-08-24 19:11:47'),
(1885, 434, NULL, '11758', '449', NULL, '799', 'S', NULL, NULL, '1', '2022-08-18 07:36:00', '2022-08-24 19:11:34'),
(1886, 434, NULL, '11759', '449', NULL, '799', 'M', NULL, NULL, '1', '2022-08-18 07:36:00', '2022-08-24 19:11:34'),
(1887, 434, NULL, '11760', '449', NULL, '799', 'L', NULL, NULL, '1', '2022-08-18 07:36:00', '2022-08-24 19:11:34'),
(1888, 434, NULL, '11760', '449', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-18 07:36:00', '2022-08-24 19:11:34'),
(1889, 434, NULL, '11760', '449', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-18 07:36:00', '2022-08-24 19:11:34'),
(1890, 435, NULL, '11763', '449', NULL, '799', 'S', NULL, NULL, '1', '2022-08-18 07:46:11', '2022-08-24 19:11:20'),
(1891, 435, NULL, '11764', '449', NULL, '799', 'M', NULL, NULL, '1', '2022-08-18 07:46:11', '2022-08-24 19:11:20'),
(1892, 435, NULL, '11765', '449', NULL, '799', 'L', NULL, NULL, '1', '2022-08-18 07:46:11', '2022-08-24 19:11:20'),
(1893, 435, NULL, '11766', '449', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-18 07:46:11', '2022-08-24 19:11:20'),
(1894, 435, NULL, '11767', '449', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-18 07:46:11', '2022-08-24 19:11:20'),
(1895, 436, NULL, '11768', '449', NULL, '799', 'S', NULL, NULL, '1', '2022-08-18 07:52:20', '2022-08-24 19:11:08'),
(1896, 436, NULL, '11769', '449', NULL, '799', 'M', NULL, NULL, '1', '2022-08-18 07:52:20', '2022-08-24 19:11:08'),
(1897, 436, NULL, '11770', '449', NULL, '799', 'L', NULL, NULL, '1', '2022-08-18 07:52:20', '2022-08-24 19:11:08'),
(1898, 436, NULL, '11770', '449', NULL, '799', 'XL', NULL, NULL, '1', '2022-08-18 07:52:20', '2022-08-24 19:11:08'),
(1899, 436, NULL, '11770', '449', NULL, '799', 'XXL', NULL, NULL, '1', '2022-08-18 07:52:20', '2022-08-24 19:11:08'),
(1900, 437, NULL, '11773', '159', NULL, '246', 'M', NULL, NULL, '1', '2022-08-18 08:11:22', '2022-08-25 10:28:06'),
(1901, 437, NULL, '11774', '159', NULL, '246', 'L', NULL, NULL, '2', '2022-08-18 08:11:22', '2022-08-25 10:28:06'),
(1902, 437, NULL, '11775', '159', NULL, '246', 'XL', NULL, NULL, '1', '2022-08-18 08:11:22', '2022-08-25 10:28:06'),
(1903, 437, NULL, '11776', '159', NULL, '246', 'XXL', NULL, NULL, '1', '2022-08-18 08:11:22', '2022-08-25 10:28:06'),
(1904, 438, NULL, '11777', '159', NULL, '249', 'M', NULL, NULL, '2', '2022-08-18 08:15:34', '2022-08-25 10:27:46'),
(1905, 438, NULL, '11778', '159', NULL, '249', 'L', NULL, NULL, '2', '2022-08-18 08:15:34', '2022-08-25 10:27:46'),
(1906, 438, NULL, '11779', '159', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-18 08:15:34', '2022-08-25 10:27:46'),
(1907, 439, NULL, '11785', '159', NULL, '249', 'M', NULL, NULL, '2', '2022-08-18 08:20:22', '2022-08-25 10:27:26'),
(1908, 439, NULL, '11786', '159', NULL, '249', 'L', NULL, NULL, '2', '2022-08-18 08:20:22', '2022-08-25 10:27:26'),
(1909, 439, NULL, '11787', '159', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-18 08:20:22', '2022-08-25 10:27:26'),
(1910, 439, NULL, '11788', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-18 08:20:22', '2022-08-25 10:27:26'),
(1911, 440, NULL, '11797', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 08:51:09', '2022-08-24 21:41:23'),
(1912, 440, NULL, '11798', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-18 08:51:09', '2022-08-24 21:41:23'),
(1913, 440, NULL, '11799', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-18 08:51:09', '2022-08-24 21:41:23'),
(1914, 440, NULL, '11800', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 08:51:09', '2022-08-24 21:41:23'),
(1915, 441, NULL, '11801', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 08:55:00', '2022-08-24 21:40:56'),
(1916, 441, NULL, '11802', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-18 08:55:00', '2022-08-24 21:40:56'),
(1917, 441, NULL, '11803', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-18 08:55:00', '2022-08-24 21:40:56'),
(1918, 441, NULL, '11804', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 08:55:00', '2022-08-24 21:40:56'),
(1919, 442, NULL, '11805', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 08:58:49', '2022-08-24 21:40:33'),
(1920, 442, NULL, '11806', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-18 08:58:49', '2022-08-24 21:40:33'),
(1921, 442, NULL, '11807', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-18 08:58:49', '2022-08-24 21:40:33'),
(1922, 443, NULL, '11809', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 09:30:32', '2022-08-24 21:39:47'),
(1923, 443, NULL, '11810', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-18 09:30:32', '2022-08-24 21:39:47'),
(1924, 443, NULL, '11811', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-18 09:30:32', '2022-08-24 21:39:47'),
(1925, 443, NULL, '11812', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 09:30:32', '2022-08-24 21:39:47'),
(1926, 444, NULL, '11813', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-18 09:34:17', '2022-08-24 21:39:18'),
(1927, 444, NULL, '11814', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-18 09:34:17', '2022-08-24 21:39:18'),
(1928, 444, NULL, '11815', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 09:34:17', '2022-08-24 21:39:18'),
(1929, 445, NULL, '11819', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 09:38:18', '2022-08-24 21:38:53'),
(1930, 445, NULL, '11820', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-18 09:38:18', '2022-08-24 21:38:53'),
(1931, 446, NULL, '11837', '159', NULL, '219', 'M', NULL, NULL, '3', '2022-08-18 09:55:11', '2022-08-24 21:38:28'),
(1932, 446, NULL, '11838', '159', NULL, '219', 'L', NULL, NULL, '3', '2022-08-18 09:55:11', '2022-08-24 21:38:28'),
(1933, 446, NULL, '11839', '159', NULL, '219', 'XL', NULL, NULL, '2', '2022-08-18 09:55:11', '2022-08-24 21:38:28'),
(1934, 446, NULL, '11840', '159', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-18 09:55:11', '2022-08-24 21:38:28'),
(1935, 447, NULL, '11841', '159', NULL, '219', 'M', NULL, NULL, '2', '2022-08-18 09:59:25', '2022-08-24 21:37:47'),
(1936, 447, NULL, '11842', '159', NULL, '219', 'L', NULL, NULL, '2', '2022-08-18 09:59:25', '2022-08-24 21:37:47'),
(1937, 447, NULL, '11843', '159', NULL, '219', 'XL', NULL, NULL, '1', '2022-08-18 09:59:25', '2022-08-24 21:37:47'),
(1938, 447, NULL, '11844', '159', NULL, '219', 'XXL', NULL, NULL, '2', '2022-08-18 09:59:25', '2022-08-24 21:37:47'),
(1939, 448, NULL, '11845', '159', NULL, '219', 'M', NULL, NULL, '3', '2022-08-18 10:03:41', '2022-08-24 21:36:42'),
(1940, 448, NULL, '11846', '159', NULL, '219', 'L', NULL, NULL, '3', '2022-08-18 10:03:41', '2022-08-24 21:36:42'),
(1941, 448, NULL, '11847', '159', NULL, '219', 'XL', NULL, NULL, '2', '2022-08-18 10:03:41', '2022-08-24 21:36:42'),
(1942, 448, NULL, '11848', '159', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-18 10:03:41', '2022-08-24 21:36:42'),
(1943, 98, NULL, '14770', '179', NULL, '329', '58', NULL, NULL, '2', '2022-08-18 10:15:00', '2022-08-24 18:31:56'),
(1944, 98, NULL, '15095', '179', NULL, '329', '60', NULL, NULL, '2', '2022-08-18 10:15:00', '2022-08-24 18:31:56'),
(1945, 97, NULL, '14896', '179', NULL, '299', '52', NULL, NULL, '2', '2022-08-18 10:23:13', '2022-08-24 18:29:52'),
(1946, 97, NULL, '14720', '179', NULL, '299', '54', NULL, NULL, '2', '2022-08-18 10:23:13', '2022-08-24 18:29:52'),
(1947, 97, NULL, '14773', '179', NULL, '299', '56', NULL, NULL, '2', '2022-08-18 10:23:13', '2022-08-24 18:29:52'),
(1948, 97, NULL, '14721', '179', NULL, '299', '58', NULL, NULL, '2', '2022-08-18 10:23:13', '2022-08-24 18:29:52'),
(1949, 97, NULL, '14722', '179', NULL, '299', '60', NULL, NULL, '2', '2022-08-18 10:23:13', '2022-08-24 18:29:52'),
(1951, 96, NULL, '14710', '189', NULL, '399', '52', NULL, NULL, '2', '2022-08-18 10:28:44', '2022-08-24 18:14:58'),
(1952, 96, NULL, '14711', '189', NULL, '399', '54', NULL, NULL, '2', '2022-08-18 10:28:44', '2022-08-24 18:14:58'),
(1953, 96, NULL, '14712', '189', NULL, '399', '56', NULL, NULL, '2', '2022-08-18 10:28:44', '2022-08-24 18:14:58'),
(1954, 96, NULL, '14713', '189', NULL, '399', '58', NULL, NULL, '2', '2022-08-18 10:28:44', '2022-08-24 18:14:58'),
(1955, 96, NULL, '14714', '189', NULL, '399', '60', NULL, NULL, '2', '2022-08-18 10:28:44', '2022-08-24 18:14:58'),
(1956, 94, NULL, '14702', '189', NULL, '399', '52', NULL, NULL, '2', '2022-08-18 10:36:47', '2022-08-24 18:35:37'),
(1957, 94, NULL, '14703', '189', NULL, '399', '54', NULL, NULL, '2', '2022-08-18 10:36:47', '2022-08-24 18:35:37'),
(1958, 94, NULL, '14704', '189', NULL, '399', '56', NULL, NULL, '2', '2022-08-18 10:36:47', '2022-08-24 18:35:37'),
(1959, 94, NULL, '14705', '189', NULL, '399', '58', NULL, NULL, '2', '2022-08-18 10:36:48', '2022-08-24 18:35:37'),
(1960, 94, NULL, '14706', '189', NULL, '399', '60', NULL, NULL, '2', '2022-08-18 10:36:48', '2022-08-24 18:35:37'),
(1961, 449, NULL, '11821', '179', NULL, '239', 'M', NULL, NULL, '6', '2022-08-18 13:47:07', '2022-08-24 21:36:07'),
(1962, 449, NULL, '11822', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-18 13:47:07', '2022-08-24 21:36:07'),
(1963, 449, NULL, '11823', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 13:47:07', '2022-08-24 21:36:07'),
(1964, 450, NULL, '11825', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-18 13:51:02', '2022-08-24 21:35:41'),
(1965, 450, NULL, '11828', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-18 13:51:02', '2022-08-24 21:35:41'),
(1966, 451, NULL, '11829', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-18 13:54:16', '2022-08-24 21:34:55'),
(1967, 451, NULL, '11830', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-18 13:54:16', '2022-08-24 21:34:55'),
(1968, 451, NULL, '11831', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 13:54:16', '2022-08-24 21:34:55'),
(1969, 451, NULL, '11832', '179', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-18 13:54:16', '2022-08-24 21:34:55'),
(1970, 452, NULL, '11833', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-18 13:57:35', '2022-08-24 21:35:11'),
(1971, 452, NULL, '11834', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-18 13:57:35', '2022-08-24 21:35:11'),
(1972, 452, NULL, '11835', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 13:57:35', '2022-08-24 21:35:11'),
(1973, 452, NULL, '11836', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-18 13:57:35', '2022-08-24 21:35:11'),
(1974, 453, NULL, '11861', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-18 14:16:26', '2022-08-24 21:33:41'),
(1975, 453, NULL, '11862', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-18 14:16:26', '2022-08-24 21:33:41'),
(1976, 453, NULL, '11863', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 14:16:26', '2022-08-24 21:33:41'),
(1977, 453, NULL, '11864', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-18 14:16:26', '2022-08-24 21:33:41'),
(1978, 454, NULL, '11865', '179', NULL, '235', 'M', NULL, NULL, '2', '2022-08-18 14:21:28', '2022-08-24 21:33:16'),
(1979, 454, NULL, '11866', '179', NULL, '235', 'L', NULL, NULL, '2', '2022-08-18 14:21:28', '2022-08-24 21:33:16'),
(1980, 454, NULL, '11867', '179', NULL, '235', 'XL', NULL, NULL, '2', '2022-08-18 14:21:28', '2022-08-24 21:33:16'),
(1981, 454, NULL, '11868', '179', NULL, '235', 'XXL', NULL, NULL, '2', '2022-08-18 14:21:28', '2022-08-24 21:33:16'),
(1982, 455, NULL, '11873', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 14:25:03', '2022-08-24 21:32:50'),
(1983, 455, NULL, '11874', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-18 14:25:03', '2022-08-24 21:32:50'),
(1984, 455, NULL, '11875', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 14:25:03', '2022-08-24 21:32:50'),
(1985, 455, NULL, '11875', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-18 14:25:03', '2022-08-24 21:32:51'),
(1986, 456, NULL, '11901', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 14:46:04', '2022-08-24 19:08:59'),
(1987, 456, NULL, '11902', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-18 14:46:04', '2022-08-24 19:08:59'),
(1988, 456, NULL, '11903', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-18 14:46:04', '2022-08-24 19:08:59'),
(1989, 457, NULL, '11905', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-18 14:59:50', '2022-08-24 19:08:45'),
(1990, 457, NULL, '11906', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-18 14:59:50', '2022-08-24 19:08:45'),
(1991, 457, NULL, '11907', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 14:59:50', '2022-08-24 19:08:45'),
(1992, 457, NULL, '11908', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-18 14:59:50', '2022-08-24 19:08:45'),
(1993, 458, NULL, '11909', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-18 15:05:12', '2022-08-24 19:08:35'),
(1994, 458, NULL, '11910', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-18 15:05:12', '2022-08-24 19:08:35'),
(1995, 458, NULL, '11911', '179', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-18 15:05:12', '2022-08-24 19:08:35'),
(1996, 458, NULL, '11912', '179', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-18 15:05:12', '2022-08-24 19:08:35'),
(1997, 459, NULL, '11913', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 15:55:42', '2022-08-24 21:32:13'),
(1998, 459, NULL, '11914', '179', NULL, '179', 'L', NULL, NULL, '2', '2022-08-18 15:55:42', '2022-08-24 21:32:13'),
(1999, 459, NULL, '11916', '179', NULL, '179', 'XXL', NULL, NULL, '1', '2022-08-18 15:55:42', '2022-08-24 21:32:13'),
(2000, 460, NULL, '11917', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-18 16:00:22', '2022-08-24 21:25:35'),
(2001, 460, NULL, '11918', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-18 16:00:22', '2022-08-24 21:25:35'),
(2002, 460, NULL, '11919', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 16:00:22', '2022-08-24 21:25:35'),
(2003, 460, NULL, '11920', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-18 16:00:22', '2022-08-24 21:25:35'),
(2004, 461, NULL, '11921', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-18 16:03:32', '2022-08-24 21:25:13'),
(2005, 461, NULL, '11922', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-18 16:03:32', '2022-08-24 21:25:13'),
(2006, 461, NULL, '11923', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 16:03:32', '2022-08-24 21:25:13'),
(2007, 461, NULL, '11924', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 16:03:32', '2022-08-24 21:25:13'),
(2008, 462, NULL, '11937', '179', NULL, '239', 'M', NULL, NULL, '5', '2022-08-18 16:20:20', '2022-08-24 21:24:33'),
(2009, 462, NULL, '11938', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-18 16:20:20', '2022-08-24 21:24:33'),
(2010, 462, NULL, '11939', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 16:20:20', '2022-08-24 21:24:33'),
(2011, 462, NULL, '11940', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-18 16:20:20', '2022-08-24 21:24:33'),
(2012, 463, NULL, '11941', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-18 16:25:17', '2022-08-24 21:23:38'),
(2013, 463, NULL, '11942', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-18 16:25:17', '2022-08-24 21:23:38'),
(2014, 463, NULL, '11943', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-18 16:25:17', '2022-08-24 21:23:38'),
(2015, 463, NULL, '11944', '179', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-18 16:25:17', '2022-08-24 21:23:38'),
(2016, 464, NULL, '11946', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-18 16:30:43', '2022-08-24 21:23:10'),
(2017, 464, NULL, '11947', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-18 16:30:43', '2022-08-24 21:23:10'),
(2018, 464, NULL, '11948', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-18 16:30:43', '2022-08-24 21:23:10'),
(2019, 464, NULL, '11949', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-18 16:30:43', '2022-08-24 21:23:10'),
(2020, 465, NULL, '11953', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-18 16:42:34', '2022-08-24 21:22:27'),
(2021, 465, NULL, '11954', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-18 16:42:34', '2022-08-24 21:22:27'),
(2022, 465, NULL, '11955', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 16:42:34', '2022-08-24 21:22:27'),
(2023, 465, NULL, '11956', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 16:42:34', '2022-08-24 21:22:27'),
(2024, 466, NULL, '11957', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-18 16:46:41', '2022-08-24 21:21:40'),
(2025, 466, NULL, '11958', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-18 16:46:41', '2022-08-24 21:21:40'),
(2026, 466, NULL, '11959', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 16:46:41', '2022-08-24 21:21:40'),
(2027, 466, NULL, '11960', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 16:46:41', '2022-08-24 21:21:40'),
(2028, 467, NULL, '11963', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 16:49:22', '2022-08-24 21:20:49'),
(2029, 467, NULL, '11964', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-18 16:49:22', '2022-08-24 21:20:49'),
(2030, 468, NULL, '11965', '189', NULL, '249', 'M', NULL, NULL, '1', '2022-08-18 16:56:07', '2022-08-24 21:19:57'),
(2031, 468, NULL, '11966', '189', NULL, '249', 'L', NULL, NULL, '1', '2022-08-18 16:56:07', '2022-08-24 21:19:57'),
(2032, 468, NULL, '11967', '189', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-18 16:56:07', '2022-08-24 21:19:57'),
(2033, 468, NULL, '11968', '189', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-18 16:56:07', '2022-08-24 21:19:57'),
(2034, 469, NULL, '11969', '189', NULL, '249', 'M', NULL, NULL, '1', '2022-08-18 17:24:17', '2022-08-24 21:19:28'),
(2035, 469, NULL, '11970', '189', NULL, '249', 'L', NULL, NULL, '1', '2022-08-18 17:24:17', '2022-08-24 21:19:28'),
(2036, 469, NULL, '11971', '189', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-18 17:24:17', '2022-08-24 21:19:28'),
(2037, 469, NULL, '11972', '189', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-18 17:24:17', '2022-08-24 21:19:28'),
(2038, 470, NULL, '11973', '189', NULL, '249', 'M', NULL, NULL, '1', '2022-08-18 17:27:36', '2022-08-24 21:19:04'),
(2039, 470, NULL, '11974', '189', NULL, '249', 'L', NULL, NULL, '1', '2022-08-18 17:27:36', '2022-08-24 21:19:04'),
(2040, 470, NULL, '11975', '189', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-18 17:27:36', '2022-08-24 21:19:04'),
(2041, 470, NULL, '11976', '189', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-18 17:27:36', '2022-08-24 21:19:04'),
(2042, 471, NULL, '11977', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-18 17:36:31', '2022-08-24 21:18:30'),
(2043, 471, NULL, '11978', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-18 17:36:31', '2022-08-24 21:18:30'),
(2044, 471, NULL, '11979', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-18 17:36:31', '2022-08-24 21:18:30'),
(2045, 471, NULL, '11980', '179', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-18 17:36:31', '2022-08-24 21:18:30'),
(2046, 472, NULL, '11981', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-18 17:40:34', '2022-08-24 21:17:54'),
(2047, 472, NULL, '11983', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 17:40:34', '2022-08-24 21:17:54'),
(2048, 473, NULL, '11985', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-18 17:46:58', '2022-08-24 21:17:12'),
(2049, 473, NULL, '11986', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-18 17:46:58', '2022-08-24 21:17:12'),
(2050, 473, NULL, '11987', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-18 17:46:58', '2022-08-24 21:17:12'),
(2051, 473, NULL, '11988', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-18 17:46:58', '2022-08-24 21:17:12'),
(2052, 474, NULL, '11989', '159', NULL, '179', 'M', NULL, NULL, '5', '2022-08-18 17:54:55', '2022-08-24 21:16:10'),
(2053, 474, NULL, '11990', '159', NULL, '179', 'L', NULL, NULL, '2', '2022-08-18 17:54:55', '2022-08-24 21:16:10'),
(2054, 474, NULL, '11991', '159', NULL, '179', 'XL', NULL, NULL, '5', '2022-08-18 17:54:55', '2022-08-24 21:16:10'),
(2055, 475, NULL, '11993', '159', NULL, '179', 'M', NULL, NULL, '8', '2022-08-18 17:58:17', '2022-08-24 21:15:41'),
(2056, 475, NULL, '11994', '159', NULL, '179', 'L', NULL, NULL, '5', '2022-08-18 17:58:17', '2022-08-24 21:15:41'),
(2057, 475, NULL, '11995', '159', NULL, '179', 'XL', NULL, NULL, '5', '2022-08-18 17:58:17', '2022-08-24 21:15:41'),
(2058, 475, NULL, '11996', '159', NULL, '179', 'XXL', NULL, NULL, '4', '2022-08-18 17:58:17', '2022-08-24 21:15:41'),
(2059, 92, NULL, '14692', '199', NULL, '399', '52', NULL, NULL, '2', '2022-08-18 17:59:04', '2022-08-24 18:15:38'),
(2060, 92, NULL, '14693', '199', NULL, '399', '54', NULL, NULL, '2', '2022-08-18 17:59:04', '2022-08-24 18:15:38'),
(2061, 92, NULL, '14694', '199', NULL, '399', '56', NULL, NULL, '2', '2022-08-18 17:59:04', '2022-08-24 18:15:38'),
(2062, 92, NULL, '14695', '199', NULL, '399', '58', NULL, NULL, '2', '2022-08-18 17:59:04', '2022-08-24 18:15:38'),
(2063, 92, NULL, '14696', '199', NULL, '399', '60', NULL, NULL, '2', '2022-08-18 17:59:04', '2022-08-24 18:15:38'),
(2064, 476, NULL, '11997', '159', NULL, '179', 'M', NULL, NULL, '7', '2022-08-18 18:01:35', '2022-08-24 21:15:16'),
(2065, 476, NULL, '11998', '159', NULL, '179', 'L', NULL, NULL, '4', '2022-08-18 18:01:35', '2022-08-24 21:15:16'),
(2066, 476, NULL, '11999', '159', NULL, '179', 'XL', NULL, NULL, '2', '2022-08-18 18:01:35', '2022-08-24 21:15:16'),
(2067, 476, NULL, '12000', '159', NULL, '179', 'XXL', NULL, NULL, '3', '2022-08-18 18:01:35', '2022-08-24 21:15:16'),
(2068, 90, NULL, '14690', '159', NULL, '329', '58', NULL, NULL, '2', '2022-08-18 18:12:34', '2022-08-24 18:15:55'),
(2069, 90, NULL, '14691', '159', NULL, '329', '60', NULL, NULL, '2', '2022-08-18 18:12:34', '2022-08-24 18:15:55'),
(2070, 477, NULL, '12001', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 18:12:44', '2022-08-24 21:14:46'),
(2071, 477, NULL, '12002', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-18 18:12:44', '2022-08-24 21:14:46'),
(2072, 477, NULL, '12003', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-18 18:12:44', '2022-08-24 21:14:46'),
(2073, 477, NULL, '12004', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 18:12:44', '2022-08-24 21:14:46'),
(2074, 478, NULL, '12005', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-18 18:16:09', '2022-08-24 21:14:14'),
(2075, 478, NULL, '12006', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-18 18:16:09', '2022-08-24 21:14:14'),
(2076, 478, NULL, '12008', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 18:16:09', '2022-08-24 21:14:14'),
(2077, 479, NULL, '12011', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-18 18:19:53', '2022-08-24 21:13:40'),
(2078, 479, NULL, '12012', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-18 18:19:53', '2022-08-24 21:13:40'),
(2079, 88, NULL, '14672', '199', NULL, '550', '52', NULL, NULL, '2', '2022-08-18 18:24:04', '2022-08-24 18:16:10'),
(2080, 88, NULL, '14673', '199', NULL, '550', '54', NULL, NULL, '2', '2022-08-18 18:24:04', '2022-08-24 18:16:10'),
(2081, 88, NULL, '14674', '199', NULL, '550', '56', NULL, NULL, '2', '2022-08-18 18:24:04', '2022-08-24 18:16:10'),
(2082, 88, NULL, '14675', '199', NULL, '550', '58', NULL, NULL, '2', '2022-08-18 18:24:04', '2022-08-24 18:16:10'),
(2083, 88, NULL, '14676', '199', NULL, '550', '60', NULL, NULL, '2', '2022-08-18 18:24:04', '2022-08-24 18:16:10'),
(2084, 87, NULL, '14669', '229', NULL, '450', '56', NULL, NULL, '2', '2022-08-18 18:27:19', '2022-08-24 17:59:19'),
(2085, 87, NULL, '14670', '229', NULL, '450', '58', NULL, NULL, '2', '2022-08-18 18:27:19', '2022-08-24 17:59:19'),
(2086, 87, NULL, '14671', '229', NULL, '450', '60', NULL, NULL, '2', '2022-08-18 18:27:19', '2022-08-24 17:59:19'),
(2087, 480, NULL, '12013', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 06:47:04', '2022-08-24 21:13:09'),
(2088, 480, NULL, '12014', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 06:47:04', '2022-08-24 21:13:09'),
(2089, 480, NULL, '12015', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-20 06:47:04', '2022-08-24 21:13:09'),
(2090, 481, NULL, '12017', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 06:51:14', '2022-08-24 21:12:39'),
(2091, 481, NULL, '12018', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 06:51:14', '2022-08-24 21:12:39'),
(2092, 481, NULL, '12019', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 06:51:14', '2022-08-24 21:12:39'),
(2093, 481, NULL, '12020', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 06:51:14', '2022-08-24 21:12:39'),
(2094, 482, NULL, '12021', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 06:56:12', '2022-08-24 20:57:39'),
(2095, 482, NULL, '12024', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 06:56:12', '2022-08-24 20:57:39'),
(2096, 483, NULL, '12045', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 07:15:30', '2022-08-24 20:53:59'),
(2097, 483, NULL, '12046', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 07:15:30', '2022-08-24 20:53:59'),
(2098, 483, NULL, '12047', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 07:15:30', '2022-08-24 20:53:59'),
(2099, 483, NULL, '12048', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 07:15:30', '2022-08-24 20:53:59'),
(2100, 484, NULL, '12049', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 07:20:21', '2022-08-24 20:53:44'),
(2101, 484, NULL, '12051', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 07:20:21', '2022-08-24 20:53:44'),
(2102, 484, NULL, '12052', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 07:20:21', '2022-08-24 20:53:44'),
(2103, 485, NULL, '12053', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 07:23:47', '2022-08-24 20:50:59'),
(2104, 485, NULL, '12054', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 07:23:47', '2022-08-24 20:50:59'),
(2105, 485, NULL, '12055', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 07:23:47', '2022-08-24 20:50:59'),
(2106, 485, NULL, '12056', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 07:23:47', '2022-08-24 20:50:59'),
(2107, 486, NULL, '12057', '189', NULL, '249', 'M', NULL, NULL, '2', '2022-08-20 07:37:43', '2022-08-24 20:50:46'),
(2108, 486, NULL, '12058', '189', NULL, '249', 'L', NULL, NULL, '1', '2022-08-20 07:37:43', '2022-08-24 20:50:46'),
(2109, 486, NULL, '12059', '189', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-20 07:37:43', '2022-08-24 20:50:46'),
(2110, 486, NULL, '12060', '189', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-20 07:37:43', '2022-08-24 20:50:46'),
(2111, 487, NULL, '12062', '189', NULL, '249', 'L', NULL, NULL, '3', '2022-08-20 07:41:14', '2022-08-24 20:50:33'),
(2112, 487, NULL, '12062', '189', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-20 07:41:14', '2022-08-24 20:50:33'),
(2113, 487, NULL, '12062', '189', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-20 07:41:14', '2022-08-24 20:50:33'),
(2114, 488, NULL, '12065', '189', NULL, '249', 'M', NULL, NULL, '2', '2022-08-20 07:45:30', '2022-08-24 20:50:17'),
(2115, 488, NULL, '12066', '189', NULL, '249', 'L', NULL, NULL, '2', '2022-08-20 07:45:30', '2022-08-24 20:50:17'),
(2116, 488, NULL, '12067', '189', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-20 07:45:30', '2022-08-24 20:50:17'),
(2117, 488, NULL, '12068', '189', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-20 07:45:30', '2022-08-24 20:50:17'),
(2118, 489, NULL, '12069', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 08:19:27', '2022-08-24 20:50:04'),
(2119, 489, NULL, '12070', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 08:19:27', '2022-08-24 20:50:04'),
(2120, 489, NULL, '12071', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 08:19:27', '2022-08-24 20:50:04'),
(2121, 489, NULL, '12072', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 08:19:27', '2022-08-24 20:50:04'),
(2122, 490, NULL, '12073', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 08:22:35', '2022-08-24 20:49:47'),
(2123, 490, NULL, '12074', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 08:22:35', '2022-08-24 20:49:47'),
(2124, 490, NULL, '12075', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 08:22:35', '2022-08-24 20:49:47'),
(2125, 491, NULL, '12077', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 08:26:09', '2022-08-24 20:49:31'),
(2126, 491, NULL, '12078', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 08:26:09', '2022-08-24 20:49:31'),
(2127, 491, NULL, '12079', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 08:26:09', '2022-08-24 20:49:31'),
(2128, 491, NULL, '12080', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 08:26:09', '2022-08-24 20:49:31'),
(2129, 492, NULL, '12097', '169', NULL, '239', 'S', NULL, NULL, '1', '2022-08-20 08:47:57', '2022-08-24 20:49:18'),
(2130, 492, NULL, '12100', '169', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 08:47:57', '2022-08-24 20:49:18'),
(2131, 492, NULL, '12101', '169', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-20 08:47:57', '2022-08-24 20:49:18'),
(2132, 493, NULL, '12107', '169', NULL, '239', 'S', NULL, NULL, '4', '2022-08-20 09:10:31', '2022-08-24 20:48:53'),
(2133, 493, NULL, '12108', '169', NULL, '239', 'M', NULL, NULL, '3', '2022-08-20 09:10:31', '2022-08-24 20:48:53'),
(2134, 493, NULL, '12109', '169', NULL, '239', 'L', NULL, NULL, '4', '2022-08-20 09:10:31', '2022-08-24 20:48:53'),
(2135, 493, NULL, '12110', '169', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 09:10:31', '2022-08-24 20:48:53'),
(2136, 493, NULL, '12111', '169', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-20 09:10:31', '2022-08-24 20:48:53'),
(2137, 494, NULL, '12112', '169', NULL, '239', 'S', NULL, NULL, '3', '2022-08-20 09:28:41', '2022-08-24 20:48:35'),
(2138, 494, NULL, '12113', '169', NULL, '239', 'M', NULL, NULL, '3', '2022-08-20 09:28:41', '2022-08-24 20:48:35'),
(2139, 494, NULL, '12114', '169', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 09:28:41', '2022-08-24 20:48:35'),
(2140, 494, NULL, '12115', '169', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-20 09:28:41', '2022-08-24 20:48:35'),
(2141, 495, NULL, '12117', '169', NULL, '239', 'S', NULL, NULL, '2', '2022-08-20 09:34:07', '2022-08-24 20:48:22'),
(2142, 495, NULL, '12118', '169', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 09:34:07', '2022-08-24 20:48:22'),
(2143, 495, NULL, '12119', '169', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 09:34:07', '2022-08-24 20:48:22'),
(2144, 495, NULL, '12120', '169', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-20 09:34:07', '2022-08-24 20:48:22'),
(2145, 495, NULL, '12121', '169', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 09:34:07', '2022-08-24 20:48:22'),
(2146, 496, NULL, '12122', '169', NULL, '239', 'S', NULL, NULL, '2', '2022-08-20 09:38:41', '2022-08-20 09:38:41'),
(2147, 497, NULL, '12122', '169', NULL, '239', 'S', NULL, NULL, '2', '2022-08-20 09:38:42', '2022-08-24 20:48:01'),
(2148, 498, NULL, '12139', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 09:47:48', '2022-08-24 19:07:47'),
(2149, 498, NULL, '12140', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 09:47:48', '2022-08-24 19:07:47'),
(2150, 498, NULL, '12141', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 09:47:48', '2022-08-24 19:07:47'),
(2151, 498, NULL, '12142', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 09:47:48', '2022-08-24 19:07:47'),
(2152, 499, NULL, '12143', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 09:51:00', '2022-08-24 19:07:24'),
(2153, 499, NULL, '12144', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 09:51:00', '2022-08-24 19:07:24'),
(2154, 499, NULL, '12145', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-20 09:51:00', '2022-08-24 19:07:24'),
(2155, 499, NULL, '12146', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 09:51:00', '2022-08-24 19:07:24'),
(2156, 500, NULL, '12147', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 09:55:47', '2022-08-24 19:07:14'),
(2157, 500, NULL, '12148', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 09:55:47', '2022-08-24 19:07:14'),
(2158, 500, NULL, '12149', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-20 09:55:47', '2022-08-24 19:07:14'),
(2159, 500, NULL, '12150', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 09:55:47', '2022-08-24 19:07:14'),
(2160, 501, NULL, '12151', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 09:59:29', '2022-08-24 19:07:03'),
(2161, 501, NULL, '12152', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 09:59:30', '2022-08-24 19:07:03'),
(2162, 501, NULL, '12153', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-20 09:59:30', '2022-08-24 19:07:03'),
(2163, 501, NULL, '12154', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 09:59:30', '2022-08-24 19:07:03'),
(2164, 502, NULL, '12167', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-20 13:32:02', '2022-08-24 19:06:34'),
(2165, 502, NULL, '12168', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 13:32:02', '2022-08-24 19:06:34'),
(2166, 502, NULL, '12169', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 13:32:02', '2022-08-24 19:06:34'),
(2167, 502, NULL, '12170', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 13:32:02', '2022-08-24 19:06:34'),
(2168, 503, NULL, '12172', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 13:36:37', '2022-08-24 19:06:10'),
(2169, 503, NULL, '12172', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 13:36:37', '2022-08-24 19:06:10'),
(2170, 504, NULL, '14261', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 13:42:03', '2022-08-24 19:06:00'),
(2171, 505, NULL, '12156', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 13:56:52', '2022-08-24 19:05:26'),
(2172, 506, NULL, '12163', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 14:00:06', '2022-08-24 19:05:14'),
(2173, 506, NULL, '12166', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 14:00:06', '2022-08-24 19:05:14'),
(2174, 507, NULL, '14751', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 14:04:20', '2022-08-24 19:05:03'),
(2175, 507, NULL, '14752', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-20 14:04:20', '2022-08-24 19:05:03'),
(2176, 508, NULL, '12179', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 14:15:18', '2022-08-24 19:04:46'),
(2177, 508, NULL, '12180', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 14:15:18', '2022-08-24 19:04:46'),
(2178, 508, NULL, '12181', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 14:15:18', '2022-08-24 19:04:46'),
(2179, 508, NULL, '12182', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 14:15:18', '2022-08-24 19:04:46'),
(2180, 509, NULL, '12183', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 14:19:22', '2022-08-24 19:04:36'),
(2181, 509, NULL, '12184', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 14:19:22', '2022-08-24 19:04:36'),
(2182, 509, NULL, '12186', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 14:19:22', '2022-08-24 19:04:36'),
(2183, 510, NULL, '12187', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 14:40:08', '2022-08-24 19:04:25'),
(2184, 510, NULL, '12188', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 14:40:08', '2022-08-24 19:04:25'),
(2185, 510, NULL, '12189', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 14:40:08', '2022-08-24 19:04:25'),
(2186, 510, NULL, '12190', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 14:40:08', '2022-08-24 19:04:25'),
(2187, 511, NULL, '12191', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-20 14:52:02', '2022-08-24 19:04:02'),
(2188, 511, NULL, '12192', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-20 14:52:02', '2022-08-24 19:04:02'),
(2189, 511, NULL, '12193', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-20 14:52:02', '2022-08-24 19:04:02'),
(2190, 511, NULL, '12194', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-20 14:52:02', '2022-08-24 19:04:02'),
(2191, 512, NULL, '12195', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-20 14:57:02', '2022-08-24 19:03:50'),
(2192, 512, NULL, '12196', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-20 14:57:02', '2022-08-24 19:03:50'),
(2193, 512, NULL, '12197', '179', NULL, '239', 'XL', NULL, NULL, '5', '2022-08-20 14:57:02', '2022-08-24 19:03:50'),
(2194, 512, NULL, '12198', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 14:57:02', '2022-08-24 19:03:50'),
(2195, 513, NULL, '12199', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 15:01:24', '2022-08-24 19:03:22'),
(2196, 513, NULL, '12200', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 15:01:24', '2022-08-24 19:03:22'),
(2197, 513, NULL, '12202', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 15:01:24', '2022-08-24 19:03:22'),
(2198, 514, NULL, '14768', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-20 15:03:46', '2022-08-24 19:03:12'),
(2199, 515, NULL, '12203', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-20 15:51:51', '2022-08-24 19:02:57'),
(2200, 515, NULL, '12204', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-20 15:51:51', '2022-08-24 19:02:57'),
(2201, 515, NULL, '12205', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-20 15:51:51', '2022-08-24 19:02:57'),
(2202, 515, NULL, '12206', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-20 15:51:51', '2022-08-24 19:02:57'),
(2203, 516, NULL, '12207', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-20 15:54:57', '2022-08-24 19:02:46'),
(2204, 516, NULL, '12208', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-20 15:54:57', '2022-08-24 19:02:46'),
(2205, 516, NULL, '12209', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-20 15:54:57', '2022-08-24 19:02:46'),
(2206, 516, NULL, '12210', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-20 15:54:57', '2022-08-24 19:02:46'),
(2207, 517, NULL, '12211', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-20 15:58:04', '2022-08-24 19:02:32'),
(2208, 517, NULL, '12212', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-20 15:58:04', '2022-08-24 19:02:32'),
(2209, 517, NULL, '12213', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 15:58:04', '2022-08-24 19:02:32'),
(2210, 517, NULL, '12214', '179', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-20 15:58:04', '2022-08-24 19:02:32'),
(2211, 518, NULL, '12215', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 16:08:19', '2022-08-24 19:02:09'),
(2212, 518, NULL, '12216', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 16:08:19', '2022-08-24 19:02:09'),
(2213, 518, NULL, '12218', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 16:08:19', '2022-08-24 19:02:09'),
(2214, 519, NULL, '12219', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 16:12:30', '2022-08-24 19:01:55'),
(2215, 519, NULL, '12220', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 16:12:30', '2022-08-24 19:01:55'),
(2216, 519, NULL, '12221', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 16:12:30', '2022-08-24 19:01:55'),
(2217, 519, NULL, '12222', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 16:12:30', '2022-08-24 19:01:55'),
(2218, 520, NULL, '12223', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 16:16:48', '2022-08-24 19:01:36'),
(2219, 520, NULL, '12224', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 16:16:48', '2022-08-24 19:01:36'),
(2220, 520, NULL, '12225', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 16:16:48', '2022-08-24 19:01:36');
INSERT INTO `variations` (`id`, `product_id`, `attribute_id`, `sku_id`, `price`, `description`, `discounted_variation_price`, `variation`, `variation_interval`, `variation_times`, `qty`, `created_at`, `updated_at`) VALUES
(2221, 520, NULL, '12226', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 16:16:48', '2022-08-24 19:01:36'),
(2222, 521, NULL, '12228', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-20 16:27:53', '2022-08-24 19:01:12'),
(2223, 521, NULL, '12229', '179', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-20 16:27:53', '2022-08-24 19:01:12'),
(2224, 521, NULL, '12230', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 16:27:53', '2022-08-24 19:01:12'),
(2225, 78, NULL, '14609', '189', NULL, '329', '56', NULL, NULL, '2', '2022-08-20 16:31:47', '2022-08-24 18:26:19'),
(2226, 78, NULL, '14610', '189', NULL, '329', '58', NULL, NULL, '2', '2022-08-20 16:31:47', '2022-08-24 18:26:19'),
(2227, 78, NULL, '14611', '189', NULL, '329', '60', NULL, NULL, '2', '2022-08-20 16:31:47', '2022-08-24 18:26:19'),
(2228, 522, NULL, '12231', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-20 16:32:24', '2022-08-24 19:01:00'),
(2229, 522, NULL, '12232', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-20 16:32:24', '2022-08-24 19:01:00'),
(2230, 522, NULL, '12233', '179', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-20 16:32:24', '2022-08-24 19:01:00'),
(2231, 522, NULL, '12234', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 16:32:24', '2022-08-24 19:01:00'),
(2232, 523, NULL, '12235', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-20 16:35:42', '2022-08-24 19:00:48'),
(2233, 523, NULL, '12236', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-20 16:35:42', '2022-08-24 19:00:48'),
(2234, 523, NULL, '12237', '179', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-20 16:35:42', '2022-08-24 19:00:48'),
(2235, 523, NULL, '12238', '179', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-20 16:35:42', '2022-08-24 19:00:48'),
(2236, 76, NULL, '14599', '179', NULL, '329', '56', NULL, NULL, '2', '2022-08-20 16:37:03', '2022-08-24 18:17:20'),
(2237, 76, NULL, '14600', '179', NULL, '329', '58', NULL, NULL, '2', '2022-08-20 16:37:03', '2022-08-24 18:17:20'),
(2238, 76, NULL, '14601', '179', NULL, '329', '60', NULL, NULL, '2', '2022-08-20 16:37:03', '2022-08-24 18:17:20'),
(2239, 524, NULL, '12239', '189', NULL, '249', 'M', NULL, NULL, '1', '2022-08-20 16:42:40', '2022-08-24 19:00:28'),
(2240, 524, NULL, '12240', '189', NULL, '249', 'L', NULL, NULL, '1', '2022-08-20 16:42:40', '2022-08-24 19:00:28'),
(2241, 524, NULL, '12241', '189', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-20 16:42:40', '2022-08-24 19:00:28'),
(2242, 524, NULL, '12242', '189', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-20 16:42:40', '2022-08-24 19:00:28'),
(2243, 525, NULL, '12243', '189', NULL, '249', 'M', NULL, NULL, '1', '2022-08-20 16:46:47', '2022-08-24 19:00:15'),
(2244, 525, NULL, '12244', '189', NULL, '249', 'L', NULL, NULL, '1', '2022-08-20 16:46:47', '2022-08-24 19:00:15'),
(2245, 525, NULL, '12245', '189', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-20 16:46:47', '2022-08-24 19:00:15'),
(2246, 525, NULL, '12246', '189', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-20 16:46:47', '2022-08-24 19:00:15'),
(2247, 526, NULL, '12251', '189', NULL, '249', 'M', NULL, NULL, '1', '2022-08-20 16:52:48', '2022-08-24 19:00:03'),
(2248, 526, NULL, '12252', '189', NULL, '249', 'L', NULL, NULL, '1', '2022-08-20 16:52:48', '2022-08-24 19:00:03'),
(2249, 526, NULL, '12253', '189', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-20 16:52:48', '2022-08-24 19:00:03'),
(2250, 526, NULL, '12254', '189', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-20 16:52:48', '2022-08-24 19:00:03'),
(2251, 50, NULL, '14428', '179', NULL, '379', '54', NULL, NULL, '2', '2022-08-20 16:53:54', '2022-08-24 18:06:03'),
(2252, 50, NULL, '14429', '179', NULL, '379', '56', NULL, NULL, '2', '2022-08-20 16:53:54', '2022-08-24 18:06:03'),
(2253, 50, NULL, '14430', '179', NULL, '379', '58', NULL, NULL, '2', '2022-08-20 16:53:54', '2022-08-24 18:06:03'),
(2254, 50, NULL, '14431', '179', NULL, '379', '60', NULL, NULL, '2', '2022-08-20 16:53:54', '2022-08-24 18:06:03'),
(2255, 48, NULL, '14421', '179', NULL, '379', '60', NULL, NULL, '2', '2022-08-20 16:56:19', '2022-08-24 18:06:14'),
(2256, 72, NULL, '14580', '169', NULL, '329', '60', NULL, NULL, '2', '2022-08-20 16:59:09', '2022-08-24 18:18:12'),
(2257, 71, NULL, '14574', '189', NULL, '329', '56', NULL, NULL, '2', '2022-08-20 17:01:53', '2022-08-24 18:35:22'),
(2258, 71, NULL, '14575', '189', NULL, '329', '58', NULL, NULL, '2', '2022-08-20 17:01:53', '2022-08-24 18:35:22'),
(2259, 71, NULL, '14576', '189', NULL, '329', '60', NULL, NULL, '2', '2022-08-20 17:01:53', '2022-08-24 18:35:22'),
(2260, 527, NULL, '12267', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 17:22:39', '2022-08-24 18:59:43'),
(2261, 527, NULL, '12268', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 17:22:39', '2022-08-24 18:59:43'),
(2262, 527, NULL, '12269', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 17:22:39', '2022-08-24 18:59:43'),
(2263, 527, NULL, '12270', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 17:22:39', '2022-08-24 18:59:43'),
(2264, 528, NULL, '12271', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 17:26:10', '2022-08-24 18:59:26'),
(2265, 528, NULL, '12272', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 17:26:10', '2022-08-24 18:59:26'),
(2266, 528, NULL, '12273', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 17:26:10', '2022-08-24 18:59:26'),
(2267, 528, NULL, '12274', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 17:26:10', '2022-08-24 18:59:26'),
(2268, 529, NULL, '12275', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 17:29:47', '2022-08-24 18:59:09'),
(2269, 529, NULL, '12276', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 17:29:47', '2022-08-24 18:59:09'),
(2270, 529, NULL, '12277', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 17:29:47', '2022-08-24 18:59:09'),
(2271, 529, NULL, '12278', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 17:29:47', '2022-08-24 18:59:09'),
(2272, 69, NULL, '14565', '179', NULL, '399', '58', NULL, NULL, '2', '2022-08-20 17:34:03', '2022-08-24 18:00:12'),
(2273, 69, NULL, '14566', '179', NULL, '399', '60', NULL, NULL, '2', '2022-08-20 17:34:03', '2022-08-24 18:00:12'),
(2274, 67, NULL, '14555', '169', NULL, '279', '58', NULL, NULL, '2', '2022-08-20 17:38:17', '2022-08-24 18:25:56'),
(2275, 67, NULL, '14556', '169', NULL, '279', '60', NULL, NULL, '2', '2022-08-20 17:38:17', '2022-08-24 18:25:56'),
(2276, 66, NULL, '14550', '179', NULL, '349', '58', NULL, NULL, '2', '2022-08-20 17:40:45', '2022-08-24 18:00:27'),
(2277, 66, NULL, '14551', '179', NULL, '349', '60', NULL, NULL, '2', '2022-08-20 17:40:45', '2022-08-24 18:00:27'),
(2278, 530, NULL, '12292', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 17:43:31', '2022-08-24 18:58:49'),
(2279, 530, NULL, '12293', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 17:43:31', '2022-08-24 18:58:49'),
(2280, 530, NULL, '12294', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-20 17:43:31', '2022-08-24 18:58:49'),
(2281, 531, NULL, '12295', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-20 17:47:18', '2022-08-24 18:58:33'),
(2282, 531, NULL, '12296', '179', NULL, '179', 'L', NULL, NULL, '2', '2022-08-20 17:47:18', '2022-08-24 18:58:33'),
(2283, 531, NULL, '12297', '179', NULL, '179', 'XL', NULL, NULL, '2', '2022-08-20 17:47:18', '2022-08-24 18:58:33'),
(2284, 531, NULL, '12298', '179', NULL, '179', 'XXL', NULL, NULL, '2', '2022-08-20 17:47:18', '2022-08-24 18:58:33'),
(2285, 532, NULL, '12299', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-20 17:51:17', '2022-08-24 18:58:13'),
(2286, 532, NULL, '12300', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-20 17:51:17', '2022-08-24 18:58:13'),
(2287, 532, NULL, '12301', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-20 17:51:17', '2022-08-24 18:58:13'),
(2288, 532, NULL, '12302', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-20 17:51:17', '2022-08-24 18:58:13'),
(2289, 533, NULL, '12315', '159', NULL, '219', 'M', NULL, NULL, '6', '2022-08-21 07:02:39', '2022-08-24 20:47:37'),
(2290, 533, NULL, '12316', '159', NULL, '219', 'L', NULL, NULL, '3', '2022-08-21 07:05:34', '2022-08-24 20:47:37'),
(2291, 533, NULL, '12318', '159', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-21 07:05:34', '2022-08-24 20:47:37'),
(2292, 534, NULL, '12319', '159', NULL, '219', 'M', NULL, NULL, '5', '2022-08-21 07:13:50', '2022-08-24 20:47:17'),
(2293, 534, NULL, '12320', '159', NULL, '219', 'L', NULL, NULL, '4', '2022-08-21 07:13:50', '2022-08-24 20:47:17'),
(2294, 534, NULL, '12321', '159', NULL, '219', 'XL', NULL, NULL, '4', '2022-08-21 07:13:50', '2022-08-24 20:47:17'),
(2295, 534, NULL, '12322', '159', NULL, '219', 'XXL', NULL, NULL, '5', '2022-08-21 07:13:50', '2022-08-24 20:47:17'),
(2296, 535, NULL, '12323', '159', NULL, '219', 'M', NULL, NULL, '5', '2022-08-21 07:17:03', '2022-08-24 20:47:02'),
(2297, 535, NULL, '12324', '159', NULL, '219', 'L', NULL, NULL, '5', '2022-08-21 07:17:03', '2022-08-24 20:47:02'),
(2298, 535, NULL, '12325', '159', NULL, '219', 'XL', NULL, NULL, '4', '2022-08-21 07:17:03', '2022-08-24 20:47:02'),
(2299, 535, NULL, '12326', '159', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-21 07:17:03', '2022-08-24 20:47:02'),
(2300, 536, NULL, '12327', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-21 07:22:32', '2022-08-24 20:46:47'),
(2301, 536, NULL, '12328', '179', NULL, '239', 'L', NULL, NULL, '1', '2022-08-21 07:22:32', '2022-08-24 20:46:47'),
(2302, 536, NULL, '12329', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-21 07:22:32', '2022-08-24 20:46:47'),
(2303, 536, NULL, '12330', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-21 07:22:32', '2022-08-24 20:46:47'),
(2304, 537, NULL, '12331', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-21 07:25:20', '2022-08-24 20:46:24'),
(2305, 537, NULL, '12332', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-21 07:25:20', '2022-08-24 20:46:24'),
(2306, 537, NULL, '12333', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-21 07:25:20', '2022-08-24 20:46:24'),
(2307, 537, NULL, '12334', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-21 07:25:20', '2022-08-24 20:46:24'),
(2308, 538, NULL, '12339', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-21 07:33:51', '2022-08-24 18:57:31'),
(2309, 538, NULL, '12340', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-21 07:33:51', '2022-08-24 18:57:31'),
(2310, 538, NULL, '12341', '179', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-21 07:33:51', '2022-08-24 18:57:31'),
(2311, 538, NULL, '12342', '179', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-21 07:33:51', '2022-08-24 18:57:31'),
(2312, 539, NULL, '12343', '179', NULL, '239', 'M', NULL, NULL, '5', '2022-08-21 07:37:39', '2022-08-24 18:57:15'),
(2313, 539, NULL, '12344', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-21 07:37:39', '2022-08-24 18:57:15'),
(2314, 539, NULL, '12345', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-21 07:37:39', '2022-08-24 18:57:15'),
(2315, 539, NULL, '12346', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-21 07:37:39', '2022-08-24 18:57:15'),
(2316, 540, NULL, '12352', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-21 07:42:35', '2022-08-24 18:57:01'),
(2317, 541, NULL, '12359', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-21 07:53:14', '2022-08-24 20:46:09'),
(2318, 541, NULL, '12360', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-21 07:53:14', '2022-08-24 20:46:09'),
(2319, 541, NULL, '12361', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-21 07:53:14', '2022-08-24 20:46:09'),
(2320, 541, NULL, '12362', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-21 07:53:14', '2022-08-24 20:46:09'),
(2321, 542, NULL, '12363', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-21 07:56:53', '2022-08-24 20:45:43'),
(2322, 542, NULL, '12364', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-21 07:56:53', '2022-08-24 20:45:43'),
(2323, 542, NULL, '12365', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-21 07:56:53', '2022-08-24 20:45:43'),
(2324, 542, NULL, '12366', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-21 07:56:53', '2022-08-24 20:45:43'),
(2325, 543, NULL, '12367', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-21 08:05:39', '2022-08-24 20:45:23'),
(2326, 543, NULL, '12368', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-21 08:05:39', '2022-08-24 20:45:23'),
(2327, 543, NULL, '12369', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-21 08:05:39', '2022-08-24 20:45:23'),
(2328, 543, NULL, '12370', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-21 08:05:39', '2022-08-24 20:45:23'),
(2329, 544, NULL, '12371', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-21 08:18:34', '2022-08-24 20:41:50'),
(2330, 544, NULL, '12372', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-21 08:18:34', '2022-08-24 20:41:50'),
(2331, 544, NULL, '12373', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-21 08:18:34', '2022-08-24 20:41:50'),
(2332, 544, NULL, '12374', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-21 08:18:34', '2022-08-24 20:41:50'),
(2333, 544, NULL, '12375', '179', NULL, '239', 'S', NULL, NULL, '3', '2022-08-21 08:21:44', '2022-08-24 20:41:50'),
(2334, 545, NULL, '12376', '179', NULL, '239', 'S', NULL, NULL, '4', '2022-08-21 08:25:12', '2022-08-24 20:41:25'),
(2335, 545, NULL, '12377', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-21 08:25:12', '2022-08-24 20:41:25'),
(2336, 545, NULL, '12378', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-21 08:25:12', '2022-08-24 20:41:25'),
(2337, 545, NULL, '12379', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-21 08:25:12', '2022-08-24 20:41:25'),
(2338, 545, NULL, '12380', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-21 08:25:12', '2022-08-24 20:41:25'),
(2339, 546, NULL, '12381', '179', NULL, '239', 'S', NULL, NULL, '1', '2022-08-21 08:30:13', '2022-08-24 20:41:04'),
(2340, 546, NULL, '12382', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-21 08:30:13', '2022-08-24 20:41:04'),
(2341, 546, NULL, '12383', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-21 08:30:13', '2022-08-24 20:41:04'),
(2342, 546, NULL, '12384', '179', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-21 08:30:13', '2022-08-24 20:41:04'),
(2343, 546, NULL, '12385', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-21 08:30:13', '2022-08-24 20:41:04'),
(2344, 547, NULL, '12386', '139', NULL, '189', 'M', NULL, NULL, '4', '2022-08-21 08:37:09', '2022-08-24 20:40:16'),
(2345, 547, NULL, '12387', '139', NULL, '189', 'L', NULL, NULL, '4', '2022-08-21 08:37:09', '2022-08-24 20:40:16'),
(2346, 547, NULL, '12388', '139', NULL, '189', 'XL', NULL, NULL, '4', '2022-08-21 08:37:09', '2022-08-24 20:40:16'),
(2347, 547, NULL, '12389', '139', NULL, '189', 'XXL', NULL, NULL, '4', '2022-08-21 08:37:09', '2022-08-24 20:40:16'),
(2348, 548, NULL, '12390', '139', NULL, '189', 'M', NULL, NULL, '1', '2022-08-21 08:40:25', '2022-08-24 20:40:04'),
(2349, 548, NULL, '12391', '139', NULL, '189', 'L', NULL, NULL, '4', '2022-08-21 08:40:25', '2022-08-24 20:40:04'),
(2350, 548, NULL, '12392', '139', NULL, '189', 'XL', NULL, NULL, '3', '2022-08-21 08:40:25', '2022-08-24 20:40:04'),
(2351, 548, NULL, '12393', '139', NULL, '189', 'XXL', NULL, NULL, '3', '2022-08-21 08:40:25', '2022-08-24 20:40:04'),
(2352, 549, NULL, '12394', '139', NULL, '189', 'M', NULL, NULL, '4', '2022-08-21 08:43:37', '2022-08-24 20:39:51'),
(2353, 549, NULL, '12395', '139', NULL, '189', 'L', NULL, NULL, '4', '2022-08-21 08:43:37', '2022-08-24 20:39:51'),
(2354, 549, NULL, '12396', '139', NULL, '189', 'XL', NULL, NULL, '5', '2022-08-21 08:43:37', '2022-08-24 20:39:51'),
(2355, 549, NULL, '12397', '139', NULL, '189', 'XXL', NULL, NULL, '3', '2022-08-21 08:43:37', '2022-08-24 20:39:51'),
(2356, 550, NULL, '12398', '139', NULL, '189', 'M', NULL, NULL, '4', '2022-08-21 08:53:10', '2022-08-24 20:39:39'),
(2357, 550, NULL, '12399', '139', NULL, '189', 'L', NULL, NULL, '4', '2022-08-21 08:53:10', '2022-08-24 20:39:39'),
(2358, 550, NULL, '12400', '139', NULL, '189', 'XL', NULL, NULL, '3', '2022-08-21 08:53:10', '2022-08-24 20:39:39'),
(2359, 550, NULL, '12401', '139', NULL, '189', 'XXL', NULL, NULL, '4', '2022-08-21 08:53:10', '2022-08-24 20:39:39'),
(2360, 551, NULL, '12402', '159', NULL, '219', 'S', NULL, NULL, '3', '2022-08-21 09:48:05', '2022-08-24 20:39:26'),
(2361, 551, NULL, '12403', '159', NULL, '219', 'M', NULL, NULL, '2', '2022-08-21 09:48:05', '2022-08-24 20:39:26'),
(2362, 551, NULL, '12404', '159', NULL, '219', 'L', NULL, NULL, '3', '2022-08-21 09:48:05', '2022-08-24 20:39:26'),
(2363, 551, NULL, '12405', '159', NULL, '219', 'XL', NULL, NULL, '3', '2022-08-21 09:48:05', '2022-08-24 20:39:26'),
(2364, 551, NULL, '12406', '159', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-21 09:48:05', '2022-08-24 20:39:26'),
(2365, 552, NULL, '12407', '159', NULL, '219', 'S', NULL, NULL, '3', '2022-08-21 09:57:18', '2022-08-24 20:39:07'),
(2366, 552, NULL, '12408', '159', NULL, '219', 'M', NULL, NULL, '2', '2022-08-21 09:57:18', '2022-08-24 20:39:07'),
(2367, 552, NULL, '12409', '159', NULL, '219', 'L', NULL, NULL, '2', '2022-08-21 09:57:18', '2022-08-24 20:39:07'),
(2368, 552, NULL, '12410', '159', NULL, '219', 'XL', NULL, NULL, '1', '2022-08-21 09:57:18', '2022-08-24 20:39:07'),
(2369, 552, NULL, '12411', '159', NULL, '219', 'XXL', NULL, NULL, '3', '2022-08-21 09:57:18', '2022-08-24 20:39:07'),
(2370, 553, NULL, '12412', '159', NULL, '219', 'S', NULL, NULL, '5', '2022-08-21 10:03:46', '2022-08-24 20:38:52'),
(2371, 553, NULL, '12413', '159', NULL, '219', 'M', NULL, NULL, '5', '2022-08-21 10:03:46', '2022-08-24 20:38:52'),
(2372, 553, NULL, '12414', '159', NULL, '219', 'L', NULL, NULL, '4', '2022-08-21 10:03:46', '2022-08-24 20:38:52'),
(2373, 553, NULL, '12415', '159', NULL, '219', 'XL', NULL, NULL, '1', '2022-08-21 10:03:46', '2022-08-24 20:38:52'),
(2374, 553, NULL, '12415', '159', NULL, '219', 'XXL', NULL, NULL, '5', '2022-08-21 10:03:46', '2022-08-24 20:38:52'),
(2375, 61, NULL, '14491', '199', NULL, '399', '60', NULL, NULL, '2', '2022-08-21 10:19:24', '2022-08-24 18:18:59'),
(2376, 60, NULL, '14486', '179', NULL, '389', '60', NULL, NULL, '2', '2022-08-21 10:21:32', '2022-08-24 18:19:12'),
(2377, 554, NULL, '12417', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-21 13:32:30', '2022-08-24 20:38:31'),
(2378, 554, NULL, '12418', '169', NULL, '229', 'M', NULL, NULL, '4', '2022-08-21 13:32:30', '2022-08-24 20:38:31'),
(2379, 554, NULL, '12419', '169', NULL, '229', 'L', NULL, NULL, '3', '2022-08-21 13:32:30', '2022-08-24 20:38:31'),
(2380, 554, NULL, '12420', '169', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-21 13:32:30', '2022-08-24 20:38:31'),
(2381, 555, NULL, '12422', '169', NULL, '229', 'S', NULL, NULL, '2', '2022-08-21 13:37:10', '2022-08-24 20:37:13'),
(2382, 555, NULL, '12423', '169', NULL, '229', 'M', NULL, NULL, '2', '2022-08-21 13:37:10', '2022-08-24 20:37:13'),
(2383, 555, NULL, '12424', '169', NULL, '229', 'L', NULL, NULL, '1', '2022-08-21 13:37:10', '2022-08-24 20:37:13'),
(2384, 555, NULL, '12425', '169', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-21 13:37:10', '2022-08-24 20:37:13'),
(2385, 556, NULL, '12432', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-21 13:48:19', '2022-08-24 20:29:49'),
(2386, 556, NULL, '12433', '169', NULL, '229', 'M', NULL, NULL, '4', '2022-08-21 13:48:19', '2022-08-24 20:29:49'),
(2387, 556, NULL, '12434', '169', NULL, '229', 'L', NULL, NULL, '4', '2022-08-21 13:48:19', '2022-08-24 20:29:49'),
(2388, 556, NULL, '12435', '169', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-21 13:48:19', '2022-08-24 20:29:49'),
(2389, 556, NULL, '12436', '169', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-21 13:48:19', '2022-08-24 20:29:49'),
(2390, 557, NULL, '12437', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-21 13:52:00', '2022-08-24 20:29:13'),
(2391, 557, NULL, '12438', '169', NULL, '229', 'M', NULL, NULL, '3', '2022-08-21 13:52:00', '2022-08-24 20:29:13'),
(2392, 557, NULL, '12439', '169', NULL, '229', 'L', NULL, NULL, '3', '2022-08-21 13:52:00', '2022-08-24 20:29:13'),
(2393, 557, NULL, '12440', '169', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-21 13:52:00', '2022-08-24 20:29:13'),
(2394, 557, NULL, '12441', '169', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-21 13:52:00', '2022-08-24 20:29:13'),
(2395, 558, NULL, '12442', '169', NULL, '229', 'S', NULL, NULL, '3', '2022-08-21 13:55:00', '2022-08-24 20:28:41'),
(2396, 558, NULL, '12443', '169', NULL, '229', 'M', NULL, NULL, '4', '2022-08-21 13:55:00', '2022-08-24 20:28:41'),
(2397, 558, NULL, '12444', '169', NULL, '229', 'L', NULL, NULL, '4', '2022-08-21 13:55:00', '2022-08-24 20:28:41'),
(2398, 558, NULL, '12445', '169', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-21 13:55:00', '2022-08-24 20:28:41'),
(2399, 558, NULL, '12446', '169', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-21 13:55:00', '2022-08-24 20:28:41'),
(2400, 559, NULL, '12447', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-21 14:11:48', '2022-08-24 20:26:53'),
(2401, 559, NULL, '12448', '179', NULL, '179', 'L', NULL, NULL, '2', '2022-08-21 14:11:48', '2022-08-24 20:26:53'),
(2402, 559, NULL, '12449', '179', NULL, '179', 'XL', NULL, NULL, '2', '2022-08-21 14:11:48', '2022-08-24 20:26:53'),
(2403, 559, NULL, '12450', '179', NULL, '179', 'XXL', NULL, NULL, '3', '2022-08-21 14:11:48', '2022-08-24 20:26:53'),
(2404, 560, NULL, '12451', '179', NULL, '239', 'M', NULL, NULL, '1', '2022-08-21 14:14:23', '2022-08-24 20:26:24'),
(2405, 560, NULL, '12452', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-21 14:14:23', '2022-08-24 20:26:24'),
(2406, 560, NULL, '12453', '179', NULL, '239', 'XL', NULL, NULL, '1', '2022-08-21 14:14:23', '2022-08-24 20:26:24'),
(2407, 560, NULL, '12454', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-21 14:14:23', '2022-08-24 20:26:24'),
(2408, 561, NULL, '12455', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-21 14:17:24', '2022-08-24 20:25:55'),
(2409, 561, NULL, '12456', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-21 14:17:24', '2022-08-24 20:25:55'),
(2410, 561, NULL, '12457', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-21 14:17:24', '2022-08-24 20:25:55'),
(2411, 561, NULL, '12458', '179', NULL, '239', 'XXL', NULL, NULL, '3', '2022-08-21 14:17:24', '2022-08-24 20:25:55'),
(2412, 562, NULL, '12459', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-21 14:20:10', '2022-08-24 20:25:38'),
(2413, 562, NULL, '12460', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-21 14:20:10', '2022-08-24 20:25:38'),
(2414, 562, NULL, '12461', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-21 14:20:10', '2022-08-24 20:25:38'),
(2415, 562, NULL, '12462', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-21 14:20:10', '2022-08-24 20:25:38'),
(2416, 563, NULL, '12463', '179', NULL, '239', 'M', NULL, NULL, '3', '2022-08-21 14:23:05', '2022-08-24 20:25:11'),
(2417, 563, NULL, '12464', '179', NULL, '239', 'L', NULL, NULL, '3', '2022-08-21 14:23:05', '2022-08-24 20:25:11'),
(2418, 563, NULL, '12465', '179', NULL, '239', 'XL', NULL, NULL, '3', '2022-08-21 14:23:05', '2022-08-24 20:25:11'),
(2419, 563, NULL, '12466', '179', NULL, '239', 'XXL', NULL, NULL, '2', '2022-08-21 14:23:05', '2022-08-24 20:25:11'),
(2420, 564, NULL, '12467', '179', NULL, '239', 'M', NULL, NULL, '4', '2022-08-21 14:26:38', '2022-08-24 20:24:41'),
(2421, 564, NULL, '12468', '179', NULL, '239', 'L', NULL, NULL, '4', '2022-08-21 14:26:38', '2022-08-24 20:24:41'),
(2422, 564, NULL, '12469', '179', NULL, '239', 'XL', NULL, NULL, '4', '2022-08-21 14:26:38', '2022-08-24 20:24:41'),
(2423, 564, NULL, '12470', '179', NULL, '239', 'XXL', NULL, NULL, '4', '2022-08-21 14:26:38', '2022-08-24 20:24:41'),
(2424, 565, NULL, '12471', '179', NULL, '239', 'M', NULL, NULL, '2', '2022-08-21 14:29:44', '2022-08-24 20:24:20'),
(2425, 565, NULL, '12472', '179', NULL, '239', 'L', NULL, NULL, '2', '2022-08-21 14:29:44', '2022-08-24 20:24:20'),
(2426, 565, NULL, '12473', '179', NULL, '239', 'XL', NULL, NULL, '2', '2022-08-21 14:29:44', '2022-08-24 20:24:20'),
(2427, 565, NULL, '12474', '179', NULL, '239', 'XXL', NULL, NULL, '1', '2022-08-21 14:29:44', '2022-08-24 20:24:20'),
(2428, 566, NULL, '12487', '149', NULL, '199', 'S', NULL, NULL, '3', '2022-08-21 15:11:10', '2022-08-24 20:23:55'),
(2429, 566, NULL, '12488', '149', NULL, '199', 'M', NULL, NULL, '3', '2022-08-21 15:11:10', '2022-08-24 20:23:55'),
(2430, 566, NULL, '12490', '149', NULL, '199', 'XL', NULL, NULL, '3', '2022-08-21 15:11:10', '2022-08-24 20:23:55'),
(2431, 567, NULL, '12492', '149', NULL, '199', 'S', NULL, NULL, '4', '2022-08-21 15:14:21', '2022-08-24 20:23:22'),
(2432, 567, NULL, '12493', '149', NULL, '199', 'M', NULL, NULL, '3', '2022-08-21 15:14:21', '2022-08-24 20:23:22'),
(2433, 567, NULL, '12494', '149', NULL, '199', 'L', NULL, NULL, '3', '2022-08-21 15:14:21', '2022-08-24 20:23:22'),
(2434, 567, NULL, '12495', '149', NULL, '199', 'XL', NULL, NULL, '3', '2022-08-21 15:14:21', '2022-08-24 20:23:22'),
(2435, 567, NULL, '12496', '149', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-21 15:14:21', '2022-08-24 20:23:22'),
(2436, 568, NULL, '12497', '149', NULL, '199', 'S', NULL, NULL, '2', '2022-08-21 15:17:50', '2022-08-24 20:22:47'),
(2437, 568, NULL, '12498', '149', NULL, '199', 'M', NULL, NULL, '2', '2022-08-21 15:17:50', '2022-08-24 20:22:47'),
(2438, 568, NULL, '12499', '149', NULL, '199', 'L', NULL, NULL, '2', '2022-08-21 15:17:50', '2022-08-24 20:22:47'),
(2439, 568, NULL, '12500', '149', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-21 15:17:50', '2022-08-24 20:22:47'),
(2440, 568, NULL, '12501', '149', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-21 15:17:50', '2022-08-24 20:22:47'),
(2441, 569, NULL, '12507', '149', NULL, '199', 'S', NULL, NULL, '3', '2022-08-21 15:21:17', '2022-08-24 20:22:20'),
(2442, 569, NULL, '12508', '149', NULL, '199', 'M', NULL, NULL, '2', '2022-08-21 15:21:17', '2022-08-24 20:22:20'),
(2443, 569, NULL, '12509', '149', NULL, '199', 'L', NULL, NULL, '2', '2022-08-21 15:21:17', '2022-08-24 20:22:20'),
(2444, 569, NULL, '12510', '149', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-21 15:21:17', '2022-08-24 20:22:20'),
(2445, 570, NULL, '12512', '149', NULL, '199', 'S', NULL, NULL, '3', '2022-08-21 15:24:13', '2022-08-24 20:21:01'),
(2446, 570, NULL, '12513', '149', NULL, '199', 'M', NULL, NULL, '3', '2022-08-21 15:24:13', '2022-08-24 20:21:01'),
(2447, 570, NULL, '12514', '149', NULL, '199', 'L', NULL, NULL, '4', '2022-08-21 15:24:13', '2022-08-24 20:21:01'),
(2448, 570, NULL, '12515', '149', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-21 15:24:13', '2022-08-24 20:21:01'),
(2449, 570, NULL, '12516', '149', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-21 15:24:13', '2022-08-24 20:21:01'),
(2450, 571, NULL, '12547', '169', NULL, '209', 'M', NULL, NULL, '3', '2022-08-21 16:16:29', '2022-08-24 20:17:39'),
(2451, 571, NULL, '12548', '169', NULL, '209', 'L', NULL, NULL, '6', '2022-08-21 16:16:29', '2022-08-24 20:17:39'),
(2452, 571, NULL, '12549', '169', NULL, '209', 'XL', NULL, NULL, '4', '2022-08-21 16:16:29', '2022-08-24 20:17:39'),
(2453, 571, NULL, '12550', '169', NULL, '209', 'XXL', NULL, NULL, '5', '2022-08-21 16:16:29', '2022-08-24 20:17:39'),
(2454, 572, NULL, '12551', '169', NULL, '209', 'M', NULL, NULL, '4', '2022-08-21 16:19:03', '2022-08-24 20:17:24'),
(2455, 572, NULL, '12552', '169', NULL, '209', 'L', NULL, NULL, '3', '2022-08-21 16:19:03', '2022-08-24 20:17:24'),
(2456, 572, NULL, '12553', '169', NULL, '209', 'XL', NULL, NULL, '3', '2022-08-21 16:19:03', '2022-08-24 20:17:24'),
(2457, 572, NULL, '12554', '169', NULL, '209', 'XXL', NULL, NULL, '3', '2022-08-21 16:19:03', '2022-08-24 20:17:24'),
(2458, 573, NULL, '14262', '169', NULL, '209', 'M', NULL, NULL, '1', '2022-08-21 16:21:25', '2022-08-24 20:17:02'),
(2459, 573, NULL, '14264', '169', NULL, '209', 'XL', NULL, NULL, '1', '2022-08-21 16:21:25', '2022-08-24 20:17:02'),
(2460, 574, NULL, '12555', '139', NULL, '199', 'M', NULL, NULL, '4', '2022-08-21 16:32:55', '2022-08-24 20:15:43'),
(2461, 574, NULL, '12556', '139', NULL, '199', 'L', NULL, NULL, '3', '2022-08-21 16:32:55', '2022-08-24 20:15:43'),
(2462, 574, NULL, '12557', '139', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-21 16:32:55', '2022-08-24 20:15:43'),
(2463, 574, NULL, '12558', '139', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-21 16:32:55', '2022-08-24 20:15:43'),
(2464, 575, NULL, '12559', '139', NULL, '199', 'M', NULL, NULL, '2', '2022-08-21 16:36:35', '2022-08-24 20:15:01'),
(2465, 575, NULL, '12560', '139', NULL, '199', 'L', NULL, NULL, '4', '2022-08-21 16:36:35', '2022-08-24 20:15:01'),
(2466, 575, NULL, '12561', '139', NULL, '199', 'XL', NULL, NULL, '5', '2022-08-21 16:36:35', '2022-08-24 20:15:01'),
(2467, 575, NULL, '12562', '139', NULL, '199', 'XXL', NULL, NULL, '3', '2022-08-21 16:36:35', '2022-08-24 20:15:01'),
(2468, 576, NULL, '12563', '139', NULL, '199', 'M', NULL, NULL, '1', '2022-08-21 16:43:37', '2022-08-24 20:14:44'),
(2469, 576, NULL, '12564', '139', NULL, '199', 'L', NULL, NULL, '2', '2022-08-21 16:43:37', '2022-08-24 20:14:44'),
(2470, 576, NULL, '12565', '139', NULL, '199', 'XL', NULL, NULL, '2', '2022-08-21 16:43:37', '2022-08-24 20:14:44'),
(2471, 576, NULL, '12566', '139', NULL, '199', 'XXL', NULL, NULL, '1', '2022-08-21 16:43:37', '2022-08-24 20:14:44'),
(2472, 577, NULL, '12567', '169', NULL, '199', 'M', NULL, NULL, '2', '2022-08-21 17:15:07', '2022-08-24 20:14:25'),
(2473, 577, NULL, '12568', '169', NULL, '199', 'L', NULL, NULL, '3', '2022-08-21 17:15:07', '2022-08-24 20:14:25'),
(2474, 577, NULL, '12569', '169', NULL, '199', 'XL', NULL, NULL, '1', '2022-08-21 17:15:07', '2022-08-24 20:14:25'),
(2475, 577, NULL, '12570', '169', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-21 17:15:07', '2022-08-24 20:14:25'),
(2476, 578, NULL, '12571', '169', NULL, '199', 'M', NULL, NULL, '1', '2022-08-21 17:18:13', '2022-08-24 20:13:43'),
(2477, 578, NULL, '12572', '169', NULL, '199', 'L', NULL, NULL, '1', '2022-08-21 17:18:13', '2022-08-24 20:13:43'),
(2478, 578, NULL, '12573', '169', NULL, '199', 'XL', NULL, NULL, '2', '2022-08-21 17:18:13', '2022-08-24 20:13:43'),
(2479, 578, NULL, '12574', '169', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-21 17:18:13', '2022-08-24 20:13:43'),
(2480, 579, NULL, '12575', '169', NULL, '199', 'M', NULL, NULL, '2', '2022-08-21 17:21:02', '2022-08-24 20:13:27'),
(2481, 579, NULL, '12576', '169', NULL, '199', 'L', NULL, NULL, '2', '2022-08-21 17:21:02', '2022-08-24 20:13:27'),
(2482, 579, NULL, '12577', '169', NULL, '199', 'XL', NULL, NULL, '1', '2022-08-21 17:21:02', '2022-08-24 20:13:27'),
(2483, 579, NULL, '12578', '169', NULL, '199', 'XXL', NULL, NULL, '1', '2022-08-21 17:21:02', '2022-08-24 20:13:27'),
(2484, 580, NULL, '12579', '169', NULL, '199', 'M', NULL, NULL, '4', '2022-08-21 17:26:44', '2022-08-24 20:10:43'),
(2485, 580, NULL, '12580', '169', NULL, '199', 'L', NULL, NULL, '3', '2022-08-21 17:26:44', '2022-08-24 20:10:43'),
(2486, 580, NULL, '12581', '169', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-21 17:26:44', '2022-08-24 20:10:43'),
(2487, 580, NULL, '12582', '169', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-21 17:26:44', '2022-08-24 20:10:43'),
(2488, 581, NULL, '12583', '159', NULL, '199', 'M', NULL, NULL, '1', '2022-08-21 17:40:58', '2022-08-24 20:09:03'),
(2489, 581, NULL, '12585', '159', NULL, '199', 'XL', NULL, NULL, '1', '2022-08-21 17:40:58', '2022-08-24 20:09:03'),
(2490, 581, NULL, '12586', '159', NULL, '199', 'XXL', NULL, NULL, '1', '2022-08-21 17:40:58', '2022-08-24 20:09:03'),
(2491, 582, NULL, '12587', '159', NULL, '199', 'M', NULL, NULL, '3', '2022-08-21 17:46:16', '2022-08-24 20:08:51'),
(2492, 582, NULL, '12588', '159', NULL, '199', 'L', NULL, NULL, '3', '2022-08-21 17:46:16', '2022-08-24 20:08:51'),
(2493, 582, NULL, '12589', '159', NULL, '199', 'XL', NULL, NULL, '3', '2022-08-21 17:46:16', '2022-08-24 20:08:51'),
(2494, 582, NULL, '12590', '159', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-21 17:46:16', '2022-08-24 20:08:51'),
(2495, 583, NULL, '12591', '159', NULL, '199', 'M', NULL, NULL, '1', '2022-08-21 17:49:15', '2022-08-24 20:08:38'),
(2496, 583, NULL, '12592', '159', NULL, '199', 'L', NULL, NULL, '2', '2022-08-21 17:49:15', '2022-08-24 20:08:38'),
(2497, 584, NULL, '12596', '169', NULL, '199', 'L', NULL, NULL, '1', '2022-08-22 07:22:52', '2022-08-24 20:08:22'),
(2498, 584, NULL, '12597', '169', NULL, '199', 'XL', NULL, NULL, '1', '2022-08-22 07:22:52', '2022-08-24 20:08:22'),
(2499, 584, NULL, '12598', '169', NULL, '199', 'XXL', NULL, NULL, '3', '2022-08-22 07:22:52', '2022-08-24 20:08:22'),
(2500, 585, NULL, '12599', '169', NULL, '199', 'M', NULL, NULL, '1', '2022-08-22 07:28:45', '2022-08-24 20:08:10'),
(2501, 585, NULL, '12602', '169', NULL, '199', 'XXL', NULL, NULL, '1', '2022-08-22 07:28:45', '2022-08-24 20:08:10'),
(2502, 586, NULL, '12603', '169', NULL, '199', 'M', NULL, NULL, '1', '2022-08-22 13:19:06', '2022-08-24 20:07:49'),
(2503, 586, NULL, '12604', '169', NULL, '199', 'L', NULL, NULL, '2', '2022-08-22 13:19:06', '2022-08-24 20:07:49'),
(2504, 586, NULL, '12605', '169', NULL, '199', 'XL', NULL, NULL, '3', '2022-08-22 13:19:06', '2022-08-24 20:07:49'),
(2505, 586, NULL, '12606', '169', NULL, '199', 'XXL', NULL, NULL, '3', '2022-08-22 13:19:06', '2022-08-24 20:07:49'),
(2506, 587, NULL, '12607', '169', NULL, '199', 'M', NULL, NULL, '3', '2022-08-22 13:24:31', '2022-08-24 20:07:30'),
(2507, 587, NULL, '12608', '169', NULL, '199', 'L', NULL, NULL, '3', '2022-08-22 13:24:31', '2022-08-24 20:07:30'),
(2508, 587, NULL, '12609', '169', NULL, '199', 'XL', NULL, NULL, '1', '2022-08-22 13:24:31', '2022-08-24 20:07:30'),
(2509, 587, NULL, '12610', '169', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-22 13:24:31', '2022-08-24 20:07:30'),
(2510, 588, NULL, '12658', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 13:36:11', '2022-08-25 16:42:12'),
(2511, 588, NULL, '12659', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 13:36:11', '2022-08-25 16:42:12'),
(2512, 588, NULL, '12660', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 13:36:11', '2022-08-25 16:42:12'),
(2513, 588, NULL, '12661', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 13:36:11', '2022-08-25 16:42:12'),
(2514, 588, NULL, '12662', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 13:36:11', '2022-08-25 16:42:12'),
(2515, 589, NULL, '12663', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 13:39:03', '2022-08-25 16:41:57'),
(2516, 589, NULL, '12664', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 13:39:03', '2022-08-25 16:41:57'),
(2517, 589, NULL, '12665', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 13:39:03', '2022-08-25 16:41:57'),
(2518, 589, NULL, '12666', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 13:39:03', '2022-08-25 16:41:57'),
(2519, 589, NULL, '12667', '149', NULL, '229', 'XXL', NULL, NULL, '1', '2022-08-22 13:39:03', '2022-08-25 16:41:57'),
(2520, 590, NULL, '12668', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 13:43:38', '2022-08-25 16:41:07'),
(2521, 590, NULL, '12669', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 13:43:38', '2022-08-25 16:41:07'),
(2522, 590, NULL, '12670', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 13:43:38', '2022-08-25 16:41:07'),
(2523, 590, NULL, '12671', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 13:43:38', '2022-08-25 16:41:07'),
(2524, 590, NULL, '12672', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 13:43:38', '2022-08-25 16:41:07'),
(2525, 591, NULL, '12768', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 13:47:30', '2022-08-25 16:39:18'),
(2526, 591, NULL, '12769', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 13:47:30', '2022-08-25 16:39:18'),
(2527, 591, NULL, '12770', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 13:47:30', '2022-08-25 16:39:18'),
(2528, 591, NULL, '12771', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 13:47:30', '2022-08-25 16:39:18'),
(2529, 591, NULL, '12772', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 13:47:30', '2022-08-25 16:39:18'),
(2530, 592, NULL, '12773', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 13:51:50', '2022-08-25 16:38:56'),
(2531, 592, NULL, '12774', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 13:51:50', '2022-08-25 16:38:56'),
(2532, 592, NULL, '12775', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 13:51:50', '2022-08-25 16:38:56'),
(2533, 592, NULL, '12776', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 13:51:50', '2022-08-25 16:38:56'),
(2534, 592, NULL, '12777', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 13:51:50', '2022-08-25 16:38:56'),
(2535, 593, NULL, '12778', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 13:54:48', '2022-08-25 16:38:30'),
(2536, 593, NULL, '12779', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 13:54:48', '2022-08-25 16:38:30'),
(2537, 593, NULL, '12780', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 13:54:48', '2022-08-25 16:38:30'),
(2538, 593, NULL, '12781', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 13:54:48', '2022-08-25 16:38:30'),
(2539, 593, NULL, '12782', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 13:54:48', '2022-08-25 16:38:30'),
(2540, 594, NULL, '12712', '159', NULL, '199', 'M', NULL, NULL, '4', '2022-08-22 14:01:36', '2022-08-24 20:05:47'),
(2541, 594, NULL, '12713', '159', NULL, '199', 'L', NULL, NULL, '3', '2022-08-22 14:01:36', '2022-08-24 20:05:47'),
(2542, 594, NULL, '12714', '159', NULL, '199', 'XL', NULL, NULL, '3', '2022-08-22 14:01:36', '2022-08-24 20:05:47'),
(2543, 594, NULL, '12715', '159', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-22 14:01:36', '2022-08-24 20:05:47'),
(2544, 595, NULL, '12716', '159', NULL, '199', 'M', NULL, NULL, '3', '2022-08-22 14:04:17', '2022-08-24 20:05:35'),
(2545, 595, NULL, '12717', '159', NULL, '199', 'L', NULL, NULL, '1', '2022-08-22 14:04:17', '2022-08-24 20:05:35'),
(2546, 595, NULL, '12718', '159', NULL, '199', 'XL', NULL, NULL, '2', '2022-08-22 14:04:17', '2022-08-24 20:05:35'),
(2547, 595, NULL, '12719', '159', NULL, '199', 'XXL', NULL, NULL, '3', '2022-08-22 14:04:17', '2022-08-24 20:05:35'),
(2548, 596, NULL, '12720', '159', NULL, '199', 'M', NULL, NULL, '3', '2022-08-22 14:06:39', '2022-08-24 20:05:23'),
(2549, 596, NULL, '12722', '159', NULL, '199', 'XL', NULL, NULL, '1', '2022-08-22 14:06:39', '2022-08-24 20:05:23'),
(2550, 596, NULL, '12723', '159', NULL, '199', 'XXL', NULL, NULL, '1', '2022-08-22 14:06:39', '2022-08-24 20:05:23'),
(2551, 597, NULL, '12724', '159', NULL, '199', 'M', NULL, NULL, '4', '2022-08-22 14:09:52', '2022-08-24 20:05:11'),
(2552, 597, NULL, '12725', '159', NULL, '199', 'L', NULL, NULL, '4', '2022-08-22 14:09:52', '2022-08-24 20:05:11'),
(2553, 597, NULL, '12726', '159', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-22 14:09:52', '2022-08-24 20:05:11'),
(2554, 597, NULL, '12727', '159', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-22 14:09:52', '2022-08-24 20:05:11'),
(2555, 598, NULL, '12744', '129', NULL, '229', 'M', NULL, NULL, '2', '2022-08-22 14:17:28', '2022-08-24 20:04:54'),
(2556, 598, NULL, '12745', '129', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 14:17:28', '2022-08-24 20:04:54'),
(2557, 598, NULL, '12746', '129', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-22 14:17:28', '2022-08-24 20:04:54'),
(2558, 598, NULL, '12747', '129', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 14:17:28', '2022-08-24 20:04:54'),
(2559, 599, NULL, '12748', '129', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 14:20:25', '2022-08-24 20:04:40'),
(2560, 600, NULL, '12752', '139', NULL, '249', 'M', NULL, NULL, '4', '2022-08-22 14:25:20', '2022-08-25 16:30:19'),
(2561, 600, NULL, '12753', '139', NULL, '249', 'L', NULL, NULL, '3', '2022-08-22 14:25:20', '2022-08-25 16:30:19'),
(2562, 600, NULL, '12754', '139', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-22 14:25:20', '2022-08-25 16:30:19'),
(2563, 600, NULL, '12755', '139', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-22 14:25:20', '2022-08-25 16:30:19'),
(2564, 601, NULL, '12756', '139', NULL, '249', 'M', NULL, NULL, '4', '2022-08-22 14:28:02', '2022-08-25 16:29:52'),
(2565, 601, NULL, '12757', '139', NULL, '249', 'L', NULL, NULL, '2', '2022-08-22 14:28:02', '2022-08-25 16:29:52'),
(2566, 601, NULL, '12758', '139', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-22 14:28:02', '2022-08-25 16:29:52'),
(2567, 601, NULL, '12759', '139', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-22 14:28:02', '2022-08-25 16:29:52'),
(2568, 602, NULL, '12760', '139', NULL, '249', 'M', NULL, NULL, '4', '2022-08-22 14:30:41', '2022-08-25 16:27:13'),
(2569, 602, NULL, '12761', '139', NULL, '249', 'L', NULL, NULL, '1', '2022-08-22 14:30:41', '2022-08-25 16:27:13'),
(2570, 602, NULL, '12763', '139', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-22 14:30:41', '2022-08-25 16:27:13'),
(2571, 603, NULL, '12765', '139', NULL, '249', 'L', NULL, NULL, '1', '2022-08-22 14:34:02', '2022-08-25 16:26:35'),
(2572, 603, NULL, '12766', '139', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-22 14:34:02', '2022-08-25 16:26:35'),
(2573, 603, NULL, '12767', '139', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-22 14:34:02', '2022-08-25 16:26:35'),
(2574, 604, NULL, '12783', '159', NULL, '199', 'M', NULL, NULL, '4', '2022-08-22 14:40:56', '2022-08-24 19:26:58'),
(2575, 604, NULL, '12784', '159', NULL, '199', 'L', NULL, NULL, '3', '2022-08-22 14:40:56', '2022-08-24 19:26:58'),
(2576, 604, NULL, '12785', '159', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-22 14:40:56', '2022-08-24 19:26:58'),
(2577, 604, NULL, '12786', '159', NULL, '199', 'XXL', NULL, NULL, '3', '2022-08-22 14:40:56', '2022-08-24 19:26:58'),
(2578, 605, NULL, '12787', '159', NULL, '199', 'M', NULL, NULL, '4', '2022-08-22 14:44:05', '2022-08-24 19:26:47'),
(2579, 605, NULL, '12788', '159', NULL, '199', 'L', NULL, NULL, '3', '2022-08-22 14:44:05', '2022-08-24 19:26:47'),
(2580, 605, NULL, '12789', '159', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-22 14:44:05', '2022-08-24 19:26:47'),
(2581, 605, NULL, '12790', '159', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-22 14:44:05', '2022-08-24 19:26:47'),
(2582, 606, NULL, '12791', '159', NULL, '199', 'M', NULL, NULL, '4', '2022-08-22 14:47:18', '2022-08-24 19:26:35'),
(2583, 606, NULL, '12792', '159', NULL, '199', 'L', NULL, NULL, '4', '2022-08-22 14:47:18', '2022-08-24 19:26:35'),
(2584, 606, NULL, '12793', '159', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-22 14:47:18', '2022-08-24 19:26:35'),
(2585, 606, NULL, '12794', '159', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-22 14:47:18', '2022-08-24 19:26:35'),
(2586, 607, NULL, '12795', '159', NULL, '199', 'M', NULL, NULL, '3', '2022-08-22 14:52:24', '2022-08-24 19:26:23'),
(2587, 607, NULL, '12796', '159', NULL, '199', 'L', NULL, NULL, '4', '2022-08-22 14:52:24', '2022-08-24 19:26:23'),
(2588, 607, NULL, '12797', '159', NULL, '199', 'XL', NULL, NULL, '1', '2022-08-22 14:52:24', '2022-08-24 19:26:23'),
(2589, 607, NULL, '12798', '159', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-22 14:52:24', '2022-08-24 19:26:23'),
(2590, 608, NULL, '12799', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 15:18:07', '2022-08-25 16:23:09'),
(2591, 608, NULL, '12800', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 15:18:07', '2022-08-25 16:23:09'),
(2592, 608, NULL, '12801', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 15:18:07', '2022-08-25 16:23:09'),
(2593, 608, NULL, '12802', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 15:18:07', '2022-08-25 16:23:09'),
(2594, 608, NULL, '12803', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 15:18:07', '2022-08-25 16:23:09'),
(2595, 609, NULL, '12804', '149', NULL, '229', 'S', NULL, NULL, '5', '2022-08-22 15:48:35', '2022-08-25 16:22:37'),
(2596, 609, NULL, '12805', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 15:48:35', '2022-08-25 16:22:37'),
(2597, 609, NULL, '12806', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 15:48:35', '2022-08-25 16:22:37'),
(2598, 609, NULL, '12807', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 15:48:35', '2022-08-25 16:22:37'),
(2599, 609, NULL, '12808', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 15:48:35', '2022-08-25 16:22:37'),
(2600, 40, NULL, '14313', '179', NULL, '379', '56', NULL, NULL, '2', '2022-08-22 15:55:23', '2022-08-24 18:00:41'),
(2601, 40, NULL, '14314', '179', NULL, '379', '58', NULL, NULL, '2', '2022-08-22 15:55:23', '2022-08-24 18:00:41'),
(2602, 40, NULL, '14315', '179', NULL, '379', '60', NULL, NULL, '2', '2022-08-22 15:55:23', '2022-08-24 18:00:41'),
(2603, 610, NULL, '12809', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 16:03:10', '2022-08-25 16:21:58'),
(2604, 610, NULL, '12810', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 16:03:10', '2022-08-25 16:21:58'),
(2605, 610, NULL, '12811', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 16:03:10', '2022-08-25 16:21:58'),
(2606, 610, NULL, '12812', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 16:03:10', '2022-08-25 16:21:58'),
(2607, 610, NULL, '12813', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 16:03:10', '2022-08-25 16:21:58'),
(2608, 611, NULL, '12814', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-22 16:06:16', '2022-08-25 16:21:42'),
(2609, 611, NULL, '12815', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 16:06:16', '2022-08-25 16:21:42'),
(2610, 611, NULL, '12816', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 16:06:16', '2022-08-25 16:21:42'),
(2611, 611, NULL, '12817', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 16:06:16', '2022-08-25 16:21:42'),
(2612, 611, NULL, '12818', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 16:06:16', '2022-08-25 16:21:42'),
(2613, 612, NULL, '12819', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-22 16:09:31', '2022-08-25 16:21:10'),
(2614, 612, NULL, '12820', '149', NULL, '229', 'M', NULL, NULL, '2', '2022-08-22 16:09:31', '2022-08-25 16:21:10'),
(2615, 612, NULL, '12821', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 16:09:31', '2022-08-25 16:21:10'),
(2616, 612, NULL, '12822', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 16:09:31', '2022-08-25 16:21:10'),
(2617, 612, NULL, '12823', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 16:09:31', '2022-08-25 16:21:10'),
(2618, 613, NULL, '14869', '179', NULL, '299', '52', NULL, NULL, '2', '2022-08-22 16:10:12', '2022-08-24 18:29:39'),
(2619, 613, NULL, '14723', '179', NULL, '299', '54', NULL, NULL, '2', '2022-08-22 16:10:12', '2022-08-24 18:29:39'),
(2620, 613, NULL, '14775', '179', NULL, '299', '56', NULL, NULL, '2', '2022-08-22 16:10:12', '2022-08-24 18:29:39'),
(2621, 613, NULL, '14793', '179', NULL, '299', '58', NULL, NULL, '2', '2022-08-22 16:10:12', '2022-08-24 18:29:39'),
(2622, 613, NULL, '14870', '179', NULL, '299', '60', NULL, NULL, '2', '2022-08-22 16:10:12', '2022-08-24 18:29:39'),
(2623, 614, NULL, '12824', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 16:14:45', '2022-08-25 16:20:54'),
(2624, 614, NULL, '12825', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 16:14:45', '2022-08-25 16:20:54'),
(2625, 614, NULL, '12826', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 16:14:45', '2022-08-25 16:20:54'),
(2626, 614, NULL, '12827', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 16:14:45', '2022-08-25 16:20:54'),
(2627, 614, NULL, '12828', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 16:14:45', '2022-08-25 16:20:54'),
(2628, 615, NULL, '15094', '179', NULL, '299', '52', NULL, NULL, '2', '2022-08-22 16:18:12', '2022-08-24 18:29:25'),
(2629, 615, NULL, '14952', '179', NULL, '299', '54', NULL, NULL, '2', '2022-08-22 16:18:12', '2022-08-24 18:29:25'),
(2630, 615, NULL, '14726', '179', NULL, '299', '56', NULL, NULL, '2', '2022-08-22 16:18:12', '2022-08-24 18:29:25'),
(2631, 615, NULL, '14824', '179', NULL, '299', '58', NULL, NULL, '2', '2022-08-22 16:18:12', '2022-08-24 18:29:25'),
(2632, 615, NULL, '14774', '179', NULL, '299', '60', NULL, NULL, '2', '2022-08-22 16:18:12', '2022-08-24 18:29:25'),
(2633, 616, NULL, '12859', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 16:32:52', '2022-08-24 20:01:54'),
(2634, 616, NULL, '12860', '169', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 16:32:52', '2022-08-24 20:01:54'),
(2635, 616, NULL, '12861', '169', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 16:32:52', '2022-08-24 20:01:54'),
(2636, 616, NULL, '12862', '169', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 16:32:52', '2022-08-24 20:01:54'),
(2637, 616, NULL, '12863', '169', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 16:32:52', '2022-08-24 20:01:54'),
(2638, 617, NULL, '12864', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 16:36:42', '2022-08-24 20:01:42'),
(2639, 617, NULL, '12865', '169', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 16:36:43', '2022-08-24 20:01:42'),
(2640, 617, NULL, '12866', '169', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 16:36:43', '2022-08-24 20:01:42'),
(2641, 617, NULL, '12867', '169', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 16:36:43', '2022-08-24 20:01:42'),
(2642, 617, NULL, '12868', '169', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 16:36:43', '2022-08-24 20:01:42'),
(2643, 618, NULL, '12869', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 16:39:38', '2022-08-24 20:01:23'),
(2644, 618, NULL, '12870', '169', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 16:39:38', '2022-08-24 20:01:23'),
(2645, 618, NULL, '12871', '169', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 16:39:38', '2022-08-24 20:01:23'),
(2646, 618, NULL, '12872', '169', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 16:39:38', '2022-08-24 20:01:23'),
(2647, 618, NULL, '12873', '169', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 16:39:38', '2022-08-24 20:01:23'),
(2648, 619, NULL, '12874', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 16:46:01', '2022-08-24 20:01:07'),
(2649, 619, NULL, '12875', '169', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 16:46:01', '2022-08-24 20:01:07'),
(2650, 619, NULL, '12876', '169', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 16:46:01', '2022-08-24 20:01:08'),
(2651, 619, NULL, '12877', '169', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 16:46:01', '2022-08-24 20:01:08'),
(2652, 619, NULL, '12878', '169', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 16:46:01', '2022-08-24 20:01:08'),
(2653, 620, NULL, '12879', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 16:49:56', '2022-08-24 20:00:55'),
(2654, 620, NULL, '12880', '169', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 16:49:56', '2022-08-24 20:00:55');
INSERT INTO `variations` (`id`, `product_id`, `attribute_id`, `sku_id`, `price`, `description`, `discounted_variation_price`, `variation`, `variation_interval`, `variation_times`, `qty`, `created_at`, `updated_at`) VALUES
(2655, 620, NULL, '12881', '169', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 16:49:56', '2022-08-24 20:00:55'),
(2656, 620, NULL, '12882', '169', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 16:49:56', '2022-08-24 20:00:55'),
(2657, 620, NULL, '12883', '169', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 16:49:56', '2022-08-24 20:00:55'),
(2658, 621, NULL, '12884', '169', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 16:53:58', '2022-08-24 20:00:41'),
(2659, 621, NULL, '12885', '169', NULL, '229', 'M', NULL, NULL, '4', '2022-08-22 16:53:58', '2022-08-24 20:00:41'),
(2660, 621, NULL, '12886', '169', NULL, '229', 'L', NULL, NULL, '4', '2022-08-22 16:53:58', '2022-08-24 20:00:41'),
(2661, 621, NULL, '12887', '169', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 16:53:58', '2022-08-24 20:00:41'),
(2662, 621, NULL, '12888', '169', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-22 16:53:58', '2022-08-24 20:00:41'),
(2663, 622, NULL, '12889', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 17:23:47', '2022-08-25 16:12:07'),
(2664, 622, NULL, '12890', '149', NULL, '169', 'M', NULL, NULL, '3', '2022-08-22 17:23:47', '2022-08-25 16:12:07'),
(2665, 622, NULL, '12891', '149', NULL, '169', 'L', NULL, NULL, '3', '2022-08-22 17:23:47', '2022-08-25 16:12:07'),
(2666, 622, NULL, '12892', '149', NULL, '169', 'XL', NULL, NULL, '1', '2022-08-22 17:23:47', '2022-08-25 16:12:07'),
(2667, 622, NULL, '12893', '149', NULL, '169', 'XXL', NULL, NULL, '2', '2022-08-22 17:23:47', '2022-08-25 16:12:07'),
(2668, 623, NULL, '12894', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-22 17:33:30', '2022-08-25 16:11:42'),
(2669, 623, NULL, '12895', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 17:33:30', '2022-08-25 16:11:42'),
(2670, 623, NULL, '12896', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 17:33:30', '2022-08-25 16:11:42'),
(2671, 623, NULL, '12897', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 17:33:30', '2022-08-25 16:11:42'),
(2672, 623, NULL, '12898', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 17:33:30', '2022-08-25 16:11:42'),
(2673, 624, NULL, '12899', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-22 17:40:41', '2022-08-25 16:11:06'),
(2674, 624, NULL, '12900', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 17:40:41', '2022-08-25 16:11:06'),
(2675, 624, NULL, '12901', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 17:40:41', '2022-08-25 16:11:06'),
(2676, 624, NULL, '12902', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 17:40:41', '2022-08-25 16:11:06'),
(2677, 624, NULL, '12903', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 17:40:41', '2022-08-25 16:11:06'),
(2678, 625, NULL, '12904', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 17:45:53', '2022-08-25 16:10:46'),
(2679, 625, NULL, '12905', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 17:45:53', '2022-08-25 16:10:46'),
(2680, 625, NULL, '12906', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 17:45:53', '2022-08-25 16:10:46'),
(2681, 625, NULL, '12907', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-22 17:45:53', '2022-08-25 16:10:46'),
(2682, 319, NULL, '11195', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-22 17:51:20', '2022-08-24 22:26:51'),
(2683, 319, NULL, '11196', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-22 17:51:20', '2022-08-24 22:26:51'),
(2684, 319, NULL, '11197', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-22 17:51:20', '2022-08-24 22:26:51'),
(2685, 626, NULL, '12909', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-22 17:54:30', '2022-08-25 16:10:15'),
(2686, 626, NULL, '12910', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 17:54:30', '2022-08-25 16:10:15'),
(2687, 626, NULL, '12911', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-22 17:54:30', '2022-08-25 16:10:15'),
(2688, 626, NULL, '12912', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 17:54:30', '2022-08-25 16:10:15'),
(2689, 626, NULL, '12913', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 17:54:30', '2022-08-25 16:10:15'),
(2690, 627, NULL, '12914', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-22 18:02:27', '2022-08-25 16:09:54'),
(2691, 627, NULL, '12915', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-22 18:02:27', '2022-08-25 16:09:54'),
(2692, 627, NULL, '12916', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-22 18:02:27', '2022-08-25 16:09:54'),
(2693, 627, NULL, '12917', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-22 18:02:27', '2022-08-25 16:09:54'),
(2694, 627, NULL, '12918', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-22 18:02:27', '2022-08-25 16:09:54'),
(2695, 628, NULL, '12919', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 07:16:51', '2022-08-25 16:05:00'),
(2696, 628, NULL, '12920', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 07:16:51', '2022-08-25 16:05:00'),
(2697, 628, NULL, '12921', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 07:16:51', '2022-08-25 16:05:00'),
(2698, 628, NULL, '12922', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 07:16:51', '2022-08-25 16:05:00'),
(2699, 628, NULL, '12923', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 07:16:51', '2022-08-25 16:05:00'),
(2700, 629, NULL, '12924', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 07:24:02', '2022-08-25 16:04:36'),
(2701, 629, NULL, '12925', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 07:24:02', '2022-08-25 16:04:36'),
(2702, 629, NULL, '12926', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 07:24:02', '2022-08-25 16:04:36'),
(2703, 629, NULL, '12927', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 07:24:02', '2022-08-25 16:04:36'),
(2704, 629, NULL, '12928', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 07:24:02', '2022-08-25 16:04:36'),
(2705, 630, NULL, '12929', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 07:28:14', '2022-08-25 16:01:27'),
(2706, 630, NULL, '12930', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 07:28:14', '2022-08-25 16:01:27'),
(2707, 630, NULL, '12931', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 07:28:14', '2022-08-25 16:01:27'),
(2708, 630, NULL, '12932', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 07:28:14', '2022-08-25 16:01:27'),
(2709, 630, NULL, '12933', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 07:28:14', '2022-08-25 16:01:27'),
(2710, 631, NULL, '12934', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 07:32:58', '2022-08-25 16:00:37'),
(2711, 631, NULL, '12935', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 07:32:58', '2022-08-25 16:00:37'),
(2712, 631, NULL, '12936', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 07:32:58', '2022-08-25 16:00:37'),
(2713, 631, NULL, '12937', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 07:32:58', '2022-08-25 16:00:37'),
(2714, 631, NULL, '12938', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 07:32:58', '2022-08-25 16:00:37'),
(2715, 632, NULL, '12939', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 07:40:42', '2022-08-25 16:00:16'),
(2716, 632, NULL, '12940', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 07:40:42', '2022-08-25 16:00:16'),
(2717, 632, NULL, '12941', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 07:40:42', '2022-08-25 16:00:16'),
(2718, 632, NULL, '12942', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 07:40:42', '2022-08-25 16:00:16'),
(2719, 632, NULL, '12943', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 07:40:42', '2022-08-25 16:00:16'),
(2720, 633, NULL, '12949', '119', NULL, '189', 'M', NULL, NULL, '4', '2022-08-23 07:56:13', '2022-08-24 19:58:02'),
(2721, 633, NULL, '12950', '119', NULL, '189', 'L', NULL, NULL, '4', '2022-08-23 07:56:13', '2022-08-24 19:58:02'),
(2722, 633, NULL, '12951', '119', NULL, '189', 'XL', NULL, NULL, '4', '2022-08-23 07:56:13', '2022-08-24 19:58:02'),
(2723, 633, NULL, '12952', '119', NULL, '189', 'XXL', NULL, NULL, '4', '2022-08-23 07:56:13', '2022-08-24 19:58:02'),
(2724, 634, NULL, '12953', '119', NULL, '189', 'M', NULL, NULL, '4', '2022-08-23 08:00:43', '2022-08-24 19:57:45'),
(2725, 634, NULL, '12954', '119', NULL, '189', 'L', NULL, NULL, '4', '2022-08-23 08:00:43', '2022-08-24 19:57:45'),
(2726, 634, NULL, '12955', '119', NULL, '189', 'XL', NULL, NULL, '4', '2022-08-23 08:00:43', '2022-08-24 19:57:45'),
(2727, 634, NULL, '12956', '119', NULL, '189', 'XXL', NULL, NULL, '4', '2022-08-23 08:00:43', '2022-08-24 19:57:45'),
(2728, 635, NULL, '12958', '119', NULL, '189', 'L', NULL, NULL, '4', '2022-08-23 08:05:40', '2022-08-24 19:57:34'),
(2729, 635, NULL, '12959', '119', NULL, '189', 'XL', NULL, NULL, '3', '2022-08-23 08:05:40', '2022-08-24 19:57:34'),
(2730, 635, NULL, '12960', '119', NULL, '189', 'XXL', NULL, NULL, '4', '2022-08-23 08:05:40', '2022-08-24 19:57:34'),
(2731, 636, NULL, '12961', '119', NULL, '189', 'M', NULL, NULL, '3', '2022-08-23 08:14:49', '2022-08-24 19:57:22'),
(2732, 636, NULL, '12962', '119', NULL, '189', 'L', NULL, NULL, '4', '2022-08-23 08:14:49', '2022-08-24 19:57:22'),
(2733, 636, NULL, '12963', '119', NULL, '189', 'XL', NULL, NULL, '4', '2022-08-23 08:14:49', '2022-08-24 19:57:22'),
(2734, 636, NULL, '12964', '119', NULL, '189', 'XXL', NULL, NULL, '4', '2022-08-23 08:14:49', '2022-08-24 19:57:22'),
(2735, 637, NULL, '12965', '139', NULL, '249', 'S', NULL, NULL, '3', '2022-08-23 08:24:51', '2022-08-24 19:57:12'),
(2736, 637, NULL, '12966', '139', NULL, '249', 'M', NULL, NULL, '4', '2022-08-23 08:24:51', '2022-08-24 19:57:12'),
(2737, 637, NULL, '12967', '139', NULL, '249', 'L', NULL, NULL, '2', '2022-08-23 08:24:51', '2022-08-24 19:57:12'),
(2738, 637, NULL, '12968', '139', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-23 08:24:51', '2022-08-24 19:57:12'),
(2739, 637, NULL, '12969', '139', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-23 08:24:51', '2022-08-24 19:57:12'),
(2740, 638, NULL, '12970', '129', NULL, '249', 'S', NULL, NULL, '3', '2022-08-23 08:28:37', '2022-08-24 19:56:58'),
(2741, 638, NULL, '12971', '129', NULL, '249', 'M', NULL, NULL, '4', '2022-08-23 08:28:37', '2022-08-24 19:56:58'),
(2742, 638, NULL, '12973', '129', NULL, '249', 'L', NULL, NULL, '4', '2022-08-23 08:28:37', '2022-08-24 19:56:58'),
(2743, 638, NULL, '12974', '129', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-23 08:28:37', '2022-08-24 19:56:58'),
(2744, 638, NULL, '12975', '129', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-23 08:28:37', '2022-08-24 19:56:58'),
(2745, 639, NULL, '12975', '129', NULL, '249', 'S', NULL, NULL, '2', '2022-08-23 08:34:06', '2022-08-24 19:56:45'),
(2746, 639, NULL, '12976', '129', NULL, '249', 'M', NULL, NULL, '3', '2022-08-23 08:34:06', '2022-08-24 19:56:45'),
(2747, 639, NULL, '12977', '129', NULL, '249', 'L', NULL, NULL, '3', '2022-08-23 08:34:06', '2022-08-24 19:56:45'),
(2748, 639, NULL, '12978', '129', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-23 08:34:06', '2022-08-24 19:56:45'),
(2749, 639, NULL, '12979', '129', NULL, '249', 'XXL', NULL, NULL, '3', '2022-08-23 08:34:06', '2022-08-24 19:56:45'),
(2750, 640, NULL, '12980', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 13:42:33', '2022-08-24 19:56:33'),
(2751, 640, NULL, '12981', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 13:42:33', '2022-08-24 19:56:33'),
(2752, 640, NULL, '12982', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-23 13:42:33', '2022-08-24 19:56:33'),
(2753, 640, NULL, '12983', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 13:42:33', '2022-08-24 19:56:33'),
(2754, 640, NULL, '12984', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-23 13:42:33', '2022-08-24 19:56:33'),
(2755, 641, NULL, '12985', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 13:47:26', '2022-08-24 19:56:09'),
(2756, 641, NULL, '12986', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 13:47:26', '2022-08-24 19:56:09'),
(2757, 641, NULL, '12987', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 13:47:26', '2022-08-24 19:56:09'),
(2758, 641, NULL, '12988', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 13:47:26', '2022-08-24 19:56:09'),
(2759, 641, NULL, '12989', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-23 13:47:26', '2022-08-24 19:56:09'),
(2760, 642, NULL, '13000', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 13:54:18', '2022-08-24 19:55:58'),
(2761, 642, NULL, '13001', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 13:54:18', '2022-08-24 19:55:58'),
(2762, 642, NULL, '13002', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 13:54:18', '2022-08-24 19:55:58'),
(2763, 642, NULL, '13003', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 13:54:18', '2022-08-24 19:55:58'),
(2764, 642, NULL, '13004', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 13:54:18', '2022-08-24 19:55:58'),
(2765, 643, NULL, '13010', '129', NULL, '179', 'S', NULL, NULL, '4', '2022-08-23 14:05:47', '2022-08-24 19:55:45'),
(2766, 643, NULL, '13011', '129', NULL, '179', 'M', NULL, NULL, '4', '2022-08-23 14:05:47', '2022-08-24 19:55:45'),
(2767, 643, NULL, '13012', '129', NULL, '179', 'L', NULL, NULL, '4', '2022-08-23 14:05:47', '2022-08-24 19:55:45'),
(2768, 643, NULL, '13013', '129', NULL, '179', 'XL', NULL, NULL, '4', '2022-08-23 14:05:47', '2022-08-24 19:55:45'),
(2769, 643, NULL, '13014', '129', NULL, '179', 'XXL', NULL, NULL, '4', '2022-08-23 14:05:47', '2022-08-24 19:55:45'),
(2770, 644, NULL, '13015', '129', NULL, '179', 'S', NULL, NULL, '4', '2022-08-23 14:11:06', '2022-08-24 19:55:27'),
(2771, 644, NULL, '13016', '129', NULL, '179', 'M', NULL, NULL, '3', '2022-08-23 14:11:06', '2022-08-24 19:55:27'),
(2772, 644, NULL, '13017', '129', NULL, '179', 'L', NULL, NULL, '3', '2022-08-23 14:11:06', '2022-08-24 19:55:27'),
(2773, 644, NULL, '13018', '129', NULL, '179', 'XL', NULL, NULL, '4', '2022-08-23 14:11:06', '2022-08-24 19:55:27'),
(2774, 644, NULL, '13019', '129', NULL, '179', 'XXL', NULL, NULL, '3', '2022-08-23 14:11:06', '2022-08-24 19:55:27'),
(2775, 645, NULL, '13020', '129', NULL, '179', 'S', NULL, NULL, '1', '2022-08-23 14:14:12', '2022-08-24 19:55:10'),
(2776, 645, NULL, '13021', '129', NULL, '179', 'M', NULL, NULL, '2', '2022-08-23 14:14:12', '2022-08-24 19:55:10'),
(2777, 645, NULL, '13022', '129', NULL, '179', 'L', NULL, NULL, '1', '2022-08-23 14:14:12', '2022-08-24 19:55:10'),
(2778, 645, NULL, '13024', '129', NULL, '179', 'XXL', NULL, NULL, '1', '2022-08-23 14:14:12', '2022-08-24 19:55:10'),
(2779, 646, NULL, '13025', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-23 14:21:46', '2022-08-24 19:54:51'),
(2780, 646, NULL, '13026', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-23 14:21:46', '2022-08-24 19:54:51'),
(2781, 647, NULL, '13030', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-23 14:25:10', '2022-08-24 19:54:39'),
(2782, 647, NULL, '13031', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 14:25:10', '2022-08-24 19:54:39'),
(2783, 647, NULL, '13032', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-23 14:25:10', '2022-08-24 19:54:39'),
(2784, 647, NULL, '13033', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 14:25:10', '2022-08-24 19:54:39'),
(2785, 647, NULL, '13034', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 14:25:10', '2022-08-24 19:54:39'),
(2786, 648, NULL, '13035', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 14:35:55', '2022-08-24 19:54:27'),
(2787, 648, NULL, '13036', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 14:35:55', '2022-08-24 19:54:27'),
(2788, 648, NULL, '13037', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 14:35:55', '2022-08-24 19:54:27'),
(2789, 648, NULL, '13038', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 14:35:55', '2022-08-24 19:54:27'),
(2790, 648, NULL, '13039', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 14:35:55', '2022-08-24 19:54:27'),
(2791, 649, NULL, '13040', '149', NULL, '229', 'S', NULL, NULL, '2', '2022-08-23 14:41:10', '2022-08-24 19:54:14'),
(2792, 649, NULL, '13041', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 14:41:10', '2022-08-24 19:54:14'),
(2793, 649, NULL, '13042', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 14:41:10', '2022-08-24 19:54:14'),
(2794, 649, NULL, '13043', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 14:41:10', '2022-08-24 19:54:14'),
(2795, 649, NULL, '13044', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 14:41:10', '2022-08-24 19:54:14'),
(2796, 650, NULL, '13045', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 14:44:19', '2022-08-24 19:54:02'),
(2797, 650, NULL, '13046', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 14:44:19', '2022-08-24 19:54:02'),
(2798, 650, NULL, '13047', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 14:44:19', '2022-08-24 19:54:02'),
(2799, 650, NULL, '13048', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 14:44:19', '2022-08-24 19:54:02'),
(2800, 650, NULL, '13049', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 14:44:19', '2022-08-24 19:54:02'),
(2801, 651, NULL, '13050', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 14:47:30', '2022-08-24 19:53:50'),
(2802, 651, NULL, '13051', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 14:47:30', '2022-08-24 19:53:50'),
(2803, 651, NULL, '13052', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 14:47:30', '2022-08-24 19:53:50'),
(2804, 651, NULL, '13053', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 14:47:30', '2022-08-24 19:53:50'),
(2805, 651, NULL, '13054', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 14:47:30', '2022-08-24 19:53:50'),
(2806, 652, NULL, '13055', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 14:51:11', '2022-08-24 19:53:38'),
(2807, 652, NULL, '13056', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 14:51:11', '2022-08-24 19:53:38'),
(2808, 652, NULL, '13057', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 14:51:11', '2022-08-24 19:53:38'),
(2809, 652, NULL, '13058', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 14:51:11', '2022-08-24 19:53:38'),
(2810, 652, NULL, '13059', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-23 14:51:11', '2022-08-24 19:53:38'),
(2811, 653, NULL, '13060', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 14:55:57', '2022-08-24 19:53:25'),
(2812, 653, NULL, '13061', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 14:55:57', '2022-08-24 19:53:25'),
(2813, 653, NULL, '13062', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 14:55:57', '2022-08-24 19:53:25'),
(2814, 653, NULL, '13063', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 14:55:57', '2022-08-24 19:53:25'),
(2815, 653, NULL, '13064', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 14:55:57', '2022-08-24 19:53:25'),
(2816, 654, NULL, '13089', '149', NULL, '229', 'S', NULL, NULL, '5', '2022-08-23 15:55:14', '2022-08-24 19:53:06'),
(2817, 654, NULL, '13090', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 15:55:14', '2022-08-24 19:53:06'),
(2818, 654, NULL, '13091', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-23 15:55:14', '2022-08-24 19:53:06'),
(2819, 654, NULL, '13092', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-23 15:55:14', '2022-08-24 19:53:06'),
(2820, 655, NULL, '13094', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 16:00:04', '2022-08-24 19:52:50'),
(2821, 655, NULL, '13095', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 16:00:04', '2022-08-24 19:52:50'),
(2822, 655, NULL, '13096', '149', NULL, '229', 'L', NULL, NULL, '2', '2022-08-23 16:00:04', '2022-08-24 19:52:50'),
(2823, 655, NULL, '13097', '149', NULL, '229', 'XL', NULL, NULL, '5', '2022-08-23 16:00:04', '2022-08-24 19:52:50'),
(2824, 655, NULL, '13098', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-23 16:00:04', '2022-08-24 19:52:50'),
(2825, 656, NULL, '13099', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 16:03:49', '2022-08-24 19:52:36'),
(2826, 656, NULL, '13100', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 16:03:49', '2022-08-24 19:52:36'),
(2827, 656, NULL, '13102', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-23 16:03:49', '2022-08-24 19:52:36'),
(2828, 657, NULL, '13104', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 16:07:30', '2022-08-24 19:52:18'),
(2829, 657, NULL, '13105', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 16:07:30', '2022-08-24 19:52:18'),
(2830, 657, NULL, '13106', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-23 16:07:30', '2022-08-24 19:52:18'),
(2831, 657, NULL, '13107', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-23 16:07:30', '2022-08-24 19:52:18'),
(2832, 657, NULL, '13108', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 16:07:30', '2022-08-24 19:52:18'),
(2833, 658, NULL, '13109', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-23 16:11:04', '2022-08-24 19:52:05'),
(2834, 658, NULL, '13110', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 16:11:04', '2022-08-24 19:52:05'),
(2835, 658, NULL, '13111', '149', NULL, '229', 'L', NULL, NULL, '1', '2022-08-23 16:11:04', '2022-08-24 19:52:05'),
(2836, 658, NULL, '13112', '149', NULL, '229', 'XXL', NULL, NULL, '5', '2022-08-23 16:11:04', '2022-08-24 19:52:05'),
(2837, 659, NULL, '13114', '149', NULL, '229', 'S', NULL, NULL, '5', '2022-08-23 16:14:21', '2022-08-24 19:51:52'),
(2838, 659, NULL, '13115', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 16:14:21', '2022-08-24 19:51:52'),
(2839, 659, NULL, '13118', '149', NULL, '229', 'XL', NULL, NULL, '1', '2022-08-23 16:14:21', '2022-08-24 19:51:52'),
(2840, 660, NULL, '13119', '119', NULL, '139', 'M', NULL, NULL, '1', '2022-08-23 16:24:13', '2022-08-24 19:51:38'),
(2841, 660, NULL, '13120', '119', NULL, '139', 'L', NULL, NULL, '1', '2022-08-23 16:24:14', '2022-08-24 19:51:38'),
(2842, 660, NULL, '13121', '119', NULL, '139', 'XL', NULL, NULL, '2', '2022-08-23 16:24:14', '2022-08-24 19:51:38'),
(2843, 661, NULL, '13123', '119', NULL, '139', 'M', NULL, NULL, '5', '2022-08-23 16:27:59', '2022-08-24 19:51:24'),
(2844, 661, NULL, '13124', '119', NULL, '139', 'L', NULL, NULL, '4', '2022-08-23 16:27:59', '2022-08-24 19:51:24'),
(2845, 661, NULL, '13125', '119', NULL, '139', 'XL', NULL, NULL, '3', '2022-08-23 16:27:59', '2022-08-24 19:51:24'),
(2846, 661, NULL, '13126', '119', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-23 16:27:59', '2022-08-24 19:51:24'),
(2847, 662, NULL, '13127', '119', NULL, '139', 'M', NULL, NULL, '0', '2022-08-23 16:31:22', '2022-08-24 19:50:51'),
(2848, 662, NULL, '13128', '119', NULL, '139', 'L', NULL, NULL, '3', '2022-08-23 16:31:22', '2022-08-24 19:50:51'),
(2849, 662, NULL, '13129', '119', NULL, '139', 'XL', NULL, NULL, '1', '2022-08-23 16:31:22', '2022-08-24 19:50:51'),
(2850, 662, NULL, '13130', '119', NULL, '139', 'XXL', NULL, NULL, '1', '2022-08-23 16:31:22', '2022-08-24 19:50:51'),
(2851, 663, NULL, '13131', '119', NULL, '139', 'M', NULL, NULL, '3', '2022-08-23 16:35:28', '2022-08-24 19:51:07'),
(2852, 663, NULL, '13132', '119', NULL, '139', 'L', NULL, NULL, '4', '2022-08-23 16:35:28', '2022-08-24 19:51:07'),
(2853, 663, NULL, '13133', '119', NULL, '139', 'XL', NULL, NULL, '3', '2022-08-23 16:35:28', '2022-08-24 19:51:07'),
(2854, 663, NULL, '13134', '119', NULL, '139', 'XXL', NULL, NULL, '1', '2022-08-23 16:35:28', '2022-08-24 19:51:07'),
(2855, 664, NULL, '13135', '129', NULL, '199', 'M', NULL, NULL, '5', '2022-08-23 16:43:16', '2022-08-24 19:49:40'),
(2856, 664, NULL, '13136', '129', NULL, '199', 'L', NULL, NULL, '3', '2022-08-23 16:43:16', '2022-08-24 19:49:40'),
(2857, 664, NULL, '13137', '129', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-23 16:43:16', '2022-08-24 19:49:40'),
(2858, 664, NULL, '13138', '129', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-23 16:43:16', '2022-08-24 19:49:40'),
(2859, 665, NULL, '13139', '129', NULL, '199', 'M', NULL, NULL, '4', '2022-08-23 16:48:24', '2022-08-24 19:49:22'),
(2860, 665, NULL, '13140', '129', NULL, '199', 'L', NULL, NULL, '4', '2022-08-23 16:48:24', '2022-08-24 19:49:22'),
(2861, 665, NULL, '13141', '129', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-23 16:48:24', '2022-08-24 19:49:22'),
(2862, 665, NULL, '13142', '129', NULL, '199', 'XXL', NULL, NULL, '3', '2022-08-23 16:48:24', '2022-08-24 19:49:22'),
(2863, 666, NULL, '13143', '129', NULL, '199', 'M', NULL, NULL, '4', '2022-08-23 16:52:35', '2022-08-24 19:49:11'),
(2864, 666, NULL, '13144', '129', NULL, '199', 'L', NULL, NULL, '2', '2022-08-23 16:52:35', '2022-08-24 19:49:11'),
(2865, 666, NULL, '13145', '129', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-23 16:52:35', '2022-08-24 19:49:11'),
(2866, 666, NULL, '13146', '129', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-23 16:52:35', '2022-08-24 19:49:11'),
(2867, 667, NULL, '13147', '129', NULL, '199', 'M', NULL, NULL, '5', '2022-08-23 17:20:52', '2022-08-24 19:48:59'),
(2868, 667, NULL, '13148', '129', NULL, '199', 'L', NULL, NULL, '4', '2022-08-23 17:20:52', '2022-08-24 19:48:59'),
(2869, 667, NULL, '13149', '129', NULL, '199', 'XL', NULL, NULL, '4', '2022-08-23 17:20:52', '2022-08-24 19:48:59'),
(2870, 667, NULL, '13150', '129', NULL, '199', 'XXL', NULL, NULL, '4', '2022-08-23 17:20:52', '2022-08-24 19:48:59'),
(2871, 668, NULL, '13159', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-24 19:48:46'),
(2872, 668, NULL, '13160', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-24 19:48:46'),
(2873, 668, NULL, '13161', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-24 19:48:46'),
(2874, 668, NULL, '13162', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-24 19:48:46'),
(2875, 668, NULL, '13163', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-24 19:48:46'),
(2876, 669, NULL, '13159', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-23 17:30:31'),
(2877, 669, NULL, '13160', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-23 17:30:31'),
(2878, 669, NULL, '13161', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-23 17:30:31'),
(2879, 669, NULL, '13162', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-23 17:30:31'),
(2880, 669, NULL, '13163', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-23 17:30:31', '2022-08-23 17:30:31'),
(2881, 670, NULL, '13164', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 17:36:40', '2022-08-24 19:48:33'),
(2882, 670, NULL, '13165', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 17:36:40', '2022-08-24 19:48:33'),
(2883, 670, NULL, '13166', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 17:36:40', '2022-08-24 19:48:33'),
(2884, 670, NULL, '13167', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-23 17:36:40', '2022-08-24 19:48:33'),
(2885, 670, NULL, '13168', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 17:36:40', '2022-08-24 19:48:33'),
(2886, 671, NULL, '13169', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 17:40:43', '2022-08-24 19:48:20'),
(2887, 671, NULL, '13170', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 17:40:43', '2022-08-24 19:48:20'),
(2888, 671, NULL, '13171', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 17:40:43', '2022-08-24 19:48:20'),
(2889, 671, NULL, '13172', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 17:40:43', '2022-08-24 19:48:20'),
(2890, 671, NULL, '13173', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-23 17:40:43', '2022-08-24 19:48:20'),
(2891, 672, NULL, '13174', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-23 17:47:11', '2022-08-24 19:48:09'),
(2892, 672, NULL, '13175', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 17:47:11', '2022-08-24 19:48:09'),
(2893, 672, NULL, '13176', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-23 17:47:11', '2022-08-24 19:48:09'),
(2894, 672, NULL, '13177', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-23 17:47:11', '2022-08-24 19:48:09'),
(2895, 672, NULL, '13178', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-23 17:47:11', '2022-08-24 19:48:09'),
(2896, 673, NULL, '13179', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-23 17:51:27', '2022-08-24 19:47:57'),
(2897, 673, NULL, '13180', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-23 17:51:27', '2022-08-24 19:47:57'),
(2898, 673, NULL, '13181', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-23 17:51:27', '2022-08-24 19:47:57'),
(2899, 673, NULL, '13182', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-23 17:51:27', '2022-08-24 19:47:57'),
(2900, 673, NULL, '13183', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-23 17:51:27', '2022-08-24 19:47:57'),
(2901, 674, NULL, '13184', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-23 18:01:57', '2022-08-24 19:47:46'),
(2902, 674, NULL, '13185', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-23 18:01:57', '2022-08-24 19:47:46'),
(2903, 674, NULL, '13186', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-23 18:01:57', '2022-08-24 19:47:46'),
(2904, 674, NULL, '13187', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-23 18:01:57', '2022-08-24 19:47:46'),
(2905, 674, NULL, '13188', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-23 18:01:57', '2022-08-24 19:47:46'),
(2906, 675, NULL, '13189', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-24 07:17:32', '2022-08-24 19:47:25'),
(2907, 675, NULL, '13190', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-24 07:17:32', '2022-08-24 19:47:25'),
(2908, 675, NULL, '13191', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-24 07:17:32', '2022-08-24 19:47:25'),
(2909, 675, NULL, '13192', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-24 07:17:32', '2022-08-24 19:47:25'),
(2910, 675, NULL, '13193', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-24 07:17:32', '2022-08-24 19:47:25'),
(2911, 676, NULL, '13194', '149', NULL, '229', 'S', NULL, NULL, '3', '2022-08-24 07:20:47', '2022-08-24 19:47:06'),
(2912, 676, NULL, '13195', '149', NULL, '229', 'M', NULL, NULL, '3', '2022-08-24 07:20:47', '2022-08-24 19:47:06'),
(2913, 676, NULL, '13196', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-24 07:20:47', '2022-08-24 19:47:06'),
(2914, 676, NULL, '13197', '149', NULL, '229', 'XL', NULL, NULL, '3', '2022-08-24 07:20:47', '2022-08-24 19:47:06'),
(2915, 676, NULL, '13198', '149', NULL, '229', 'XXL', NULL, NULL, '3', '2022-08-24 07:20:47', '2022-08-24 19:47:06'),
(2916, 677, NULL, '13199', '149', NULL, '229', 'S', NULL, NULL, '4', '2022-08-24 07:25:09', '2022-08-24 19:32:49'),
(2917, 677, NULL, '13200', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-24 07:25:09', '2022-08-24 19:32:49'),
(2918, 677, NULL, '13201', '149', NULL, '229', 'L', NULL, NULL, '4', '2022-08-24 07:25:09', '2022-08-24 19:32:49'),
(2919, 677, NULL, '13202', '149', NULL, '229', 'XL', NULL, NULL, '4', '2022-08-24 07:25:09', '2022-08-24 19:32:49'),
(2920, 677, NULL, '13203', '149', NULL, '229', 'XXL', NULL, NULL, '4', '2022-08-24 07:25:09', '2022-08-24 19:32:49'),
(2921, 678, NULL, '14677', '229', NULL, '550', '52', NULL, NULL, '2', '2022-08-24 07:38:43', '2022-08-24 18:04:22'),
(2922, 678, NULL, '14678', '229', NULL, '550', '54', NULL, NULL, '2', '2022-08-24 07:38:43', '2022-08-24 18:04:22'),
(2923, 678, NULL, '14679', '229', NULL, '550', '56', NULL, NULL, '2', '2022-08-24 07:38:43', '2022-08-24 18:04:22'),
(2924, 678, NULL, '14680', '229', NULL, '550', '58', NULL, NULL, '2', '2022-08-24 07:38:43', '2022-08-24 18:04:22'),
(2925, 678, NULL, '14681', '229', NULL, '550', '60', NULL, NULL, '2', '2022-08-24 07:38:43', '2022-08-24 18:04:22'),
(2926, 679, NULL, '13244', '159', NULL, '249', 'M', NULL, NULL, '1', '2022-08-24 07:39:22', '2022-08-24 18:56:24'),
(2927, 679, NULL, '13245', '159', NULL, '249', 'L', NULL, NULL, '1', '2022-08-24 07:39:22', '2022-08-24 18:56:24'),
(2928, 679, NULL, '13246', '159', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-24 07:39:22', '2022-08-24 18:56:24'),
(2929, 680, NULL, '13247', '159', NULL, '249', 'M', NULL, NULL, '3', '2022-08-24 07:43:27', '2022-08-24 18:52:00'),
(2930, 680, NULL, '13248', '159', NULL, '249', 'L', NULL, NULL, '3', '2022-08-24 07:43:27', '2022-08-24 18:52:00'),
(2931, 680, NULL, '13249', '159', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-24 07:43:27', '2022-08-24 18:52:00'),
(2932, 680, NULL, '13250', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-24 07:43:27', '2022-08-24 18:52:00'),
(2933, 681, NULL, '13251', '159', NULL, '249', 'M', NULL, NULL, '1', '2022-08-24 07:47:12', '2022-08-24 18:51:47'),
(2934, 681, NULL, '13252', '159', NULL, '249', 'L', NULL, NULL, '2', '2022-08-24 07:47:12', '2022-08-24 18:51:48'),
(2935, 681, NULL, '13253', '159', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-24 07:47:12', '2022-08-24 18:51:48'),
(2936, 681, NULL, '13254', '159', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-24 07:47:12', '2022-08-24 18:51:48'),
(2937, 682, NULL, '13255', '159', NULL, '249', 'M', NULL, NULL, '3', '2022-08-24 07:50:39', '2022-08-24 18:51:33'),
(2938, 682, NULL, '13258', '159', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-24 07:50:39', '2022-08-24 18:51:33'),
(2939, 683, NULL, '14542', '199', NULL, '379', '52', NULL, NULL, '2', '2022-08-24 07:57:36', '2022-08-24 18:23:03'),
(2940, 683, NULL, '14543', '199', NULL, '379', '54', NULL, NULL, '2', '2022-08-24 07:57:36', '2022-08-24 18:23:03'),
(2941, 683, NULL, '14544', '199', NULL, '379', '56', NULL, NULL, '2', '2022-08-24 07:57:36', '2022-08-24 18:23:03'),
(2942, 683, NULL, '14545', '199', NULL, '379', '58', NULL, NULL, '2', '2022-08-24 07:57:36', '2022-08-24 18:23:03'),
(2943, 683, NULL, '14546', '199', NULL, '379', '60', NULL, NULL, '2', '2022-08-24 07:57:36', '2022-08-24 18:23:03'),
(2944, 684, NULL, '13271', '99', NULL, '135', 'M', NULL, NULL, '5', '2022-08-24 13:46:46', '2022-08-24 19:32:34'),
(2945, 684, NULL, '13272', '99', NULL, '135', 'L', NULL, NULL, '6', '2022-08-24 13:46:46', '2022-08-24 19:32:35'),
(2946, 684, NULL, '13273', '99', NULL, '135', 'XL', NULL, NULL, '5', '2022-08-24 13:46:46', '2022-08-24 19:32:35'),
(2947, 684, NULL, '13274', '99', NULL, '135', 'XXL', NULL, NULL, '6', '2022-08-24 13:46:46', '2022-08-24 19:32:35'),
(2948, 685, NULL, '13275', '99', NULL, '135', 'M', NULL, NULL, '3', '2022-08-24 13:50:29', '2022-08-24 19:32:12'),
(2949, 685, NULL, '13276', '99', NULL, '135', 'L', NULL, NULL, '1', '2022-08-24 13:50:29', '2022-08-24 19:32:12'),
(2950, 685, NULL, '13277', '99', NULL, '135', 'XL', NULL, NULL, '3', '2022-08-24 13:50:29', '2022-08-24 19:32:12'),
(2951, 685, NULL, '13278', '99', NULL, '135', 'XXL', NULL, NULL, '4', '2022-08-24 13:50:29', '2022-08-24 19:32:12'),
(2952, 686, NULL, '13283', '99', NULL, '135', 'M', NULL, NULL, '4', '2022-08-24 13:56:05', '2022-08-24 19:31:57'),
(2953, 686, NULL, '13284', '99', NULL, '135', 'L', NULL, NULL, '4', '2022-08-24 13:56:05', '2022-08-24 19:31:57'),
(2954, 686, NULL, '13285', '99', NULL, '135', 'XL', NULL, NULL, '4', '2022-08-24 13:56:05', '2022-08-24 19:31:57'),
(2955, 687, NULL, '13287', '99', NULL, '135', 'M', NULL, NULL, '2', '2022-08-24 13:59:18', '2022-08-24 19:31:43'),
(2956, 687, NULL, '13288', '99', NULL, '135', 'L', NULL, NULL, '4', '2022-08-24 13:59:18', '2022-08-24 19:31:43'),
(2957, 687, NULL, '13289', '99', NULL, '135', 'XL', NULL, NULL, '3', '2022-08-24 13:59:18', '2022-08-24 19:31:43'),
(2958, 687, NULL, '13290', '99', NULL, '135', 'XXL', NULL, NULL, '3', '2022-08-24 13:59:18', '2022-08-24 19:31:43'),
(2959, 688, NULL, '13291', '99', NULL, '135', 'M', NULL, NULL, '2', '2022-08-24 14:02:30', '2022-08-24 19:31:31'),
(2960, 688, NULL, '13292', '99', NULL, '135', 'L', NULL, NULL, '4', '2022-08-24 14:02:30', '2022-08-24 19:31:31'),
(2961, 688, NULL, '13293', '99', NULL, '135', 'XL', NULL, NULL, '4', '2022-08-24 14:02:30', '2022-08-24 19:31:31'),
(2962, 688, NULL, '13294', '99', NULL, '135', 'XXL', NULL, NULL, '4', '2022-08-24 14:02:30', '2022-08-24 19:31:31'),
(2963, 689, NULL, '13295', '99', NULL, '135', 'S', NULL, NULL, '4', '2022-08-24 14:21:38', '2022-08-24 19:31:16'),
(2964, 689, NULL, '13296', '99', NULL, '135', 'M', NULL, NULL, '3', '2022-08-24 14:21:38', '2022-08-24 19:31:16'),
(2965, 689, NULL, '13297', '99', NULL, '135', 'L', NULL, NULL, '3', '2022-08-24 14:21:38', '2022-08-24 19:31:16'),
(2966, 689, NULL, '13298', '99', NULL, '135', 'XL', NULL, NULL, '3', '2022-08-24 14:21:38', '2022-08-24 19:31:16'),
(2967, 689, NULL, '13299', '99', NULL, '135', 'XXL', NULL, NULL, '3', '2022-08-24 14:21:38', '2022-08-24 19:31:16'),
(2968, 690, NULL, '13305', '99', NULL, '135', 'S', NULL, NULL, '4', '2022-08-24 14:26:38', '2022-08-24 19:31:01'),
(2969, 690, NULL, '13306', '99', NULL, '135', 'M', NULL, NULL, '4', '2022-08-24 14:26:38', '2022-08-24 19:31:01'),
(2970, 690, NULL, '13307', '99', NULL, '135', 'L', NULL, NULL, '4', '2022-08-24 14:26:38', '2022-08-24 19:31:01'),
(2971, 690, NULL, '13308', '99', NULL, '135', 'XL', NULL, NULL, '4', '2022-08-24 14:26:38', '2022-08-24 19:31:01'),
(2972, 690, NULL, '13309', '99', NULL, '135', 'XXL', NULL, NULL, '4', '2022-08-24 14:26:38', '2022-08-24 19:31:01'),
(2973, 691, NULL, '13310', '99', NULL, '135', 'S', NULL, NULL, '4', '2022-08-24 14:33:50', '2022-08-24 19:30:45'),
(2974, 691, NULL, '13311', '99', NULL, '135', 'M', NULL, NULL, '4', '2022-08-24 14:33:50', '2022-08-24 19:30:45'),
(2975, 691, NULL, '13312', '99', NULL, '135', 'L', NULL, NULL, '4', '2022-08-24 14:33:50', '2022-08-24 19:30:45'),
(2976, 691, NULL, '13313', '99', NULL, '135', 'XL', NULL, NULL, '4', '2022-08-24 14:33:50', '2022-08-24 19:30:45'),
(2977, 691, NULL, '13314', '99', NULL, '135', 'XXL', NULL, NULL, '4', '2022-08-24 14:33:50', '2022-08-24 19:30:45'),
(2978, 692, NULL, '13315', '99', NULL, '135', 'S', NULL, NULL, '4', '2022-08-24 14:37:11', '2022-08-24 19:30:30'),
(2979, 692, NULL, '13316', '99', NULL, '135', 'M', NULL, NULL, '3', '2022-08-24 14:37:11', '2022-08-24 19:30:30'),
(2980, 692, NULL, '13317', '99', NULL, '135', 'L', NULL, NULL, '4', '2022-08-24 14:37:11', '2022-08-24 19:30:30'),
(2981, 692, NULL, '13318', '99', NULL, '135', 'XL', NULL, NULL, '4', '2022-08-24 14:37:11', '2022-08-24 19:30:30'),
(2982, 692, NULL, '13319', '99', NULL, '135', 'XXL', NULL, NULL, '4', '2022-08-24 14:37:11', '2022-08-24 19:30:30'),
(2983, 693, NULL, '13320', '99', NULL, '135', 'S', NULL, NULL, '4', '2022-08-24 14:41:36', '2022-08-24 19:30:04'),
(2984, 693, NULL, '13321', '99', NULL, '135', 'M', NULL, NULL, '4', '2022-08-24 14:41:36', '2022-08-24 19:30:04'),
(2985, 693, NULL, '13322', '99', NULL, '135', 'L', NULL, NULL, '3', '2022-08-24 14:41:36', '2022-08-24 19:30:04'),
(2986, 693, NULL, '13323', '99', NULL, '135', 'XL', NULL, NULL, '4', '2022-08-24 14:41:36', '2022-08-24 19:30:04'),
(2987, 693, NULL, '13324', '99', NULL, '135', 'XXL', NULL, NULL, '4', '2022-08-24 14:41:36', '2022-08-24 19:30:04'),
(2988, 694, NULL, '13325', '159', NULL, '179', 'M', NULL, NULL, '2', '2022-08-24 14:50:05', '2022-08-24 18:49:52'),
(2989, 694, NULL, '13326', '159', NULL, '179', 'L', NULL, NULL, '2', '2022-08-24 14:50:05', '2022-08-24 18:49:52'),
(2990, 694, NULL, '13328', '159', NULL, '179', 'XXL', NULL, NULL, '2', '2022-08-24 14:50:05', '2022-08-24 18:49:52'),
(2991, 695, NULL, '13329', '159', NULL, '179', 'M', NULL, NULL, '2', '2022-08-24 14:53:07', '2022-08-24 18:49:21'),
(2992, 695, NULL, '13330', '159', NULL, '179', 'L', NULL, NULL, '1', '2022-08-24 14:53:07', '2022-08-24 18:49:21'),
(2993, 695, NULL, '13331', '159', NULL, '179', 'XL', NULL, NULL, '2', '2022-08-24 14:53:07', '2022-08-24 18:49:21'),
(2994, 695, NULL, '13332', '159', NULL, '179', 'XXL', NULL, NULL, '2', '2022-08-24 14:53:07', '2022-08-24 18:49:21'),
(2995, 696, NULL, '13333', '159', NULL, '179', 'M', NULL, NULL, '1', '2022-08-24 14:55:47', '2022-08-24 18:48:49'),
(2996, 696, NULL, '13334', '159', NULL, '179', 'L', NULL, NULL, '2', '2022-08-24 14:55:47', '2022-08-24 18:48:49'),
(2997, 696, NULL, '13335', '159', NULL, '179', 'XL', NULL, NULL, '2', '2022-08-24 14:55:47', '2022-08-24 18:48:49'),
(2998, 696, NULL, '13336', '159', NULL, '179', 'XXL', NULL, NULL, '2', '2022-08-24 14:55:47', '2022-08-24 18:48:49'),
(2999, 697, NULL, '13337', '159', NULL, '249', 'M', NULL, NULL, '4', '2022-08-24 15:08:18', '2022-08-24 18:48:27'),
(3000, 697, NULL, '13338', '159', NULL, '249', 'L', NULL, NULL, '4', '2022-08-24 15:08:18', '2022-08-24 18:48:27'),
(3001, 697, NULL, '13339', '159', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-24 15:08:18', '2022-08-24 18:48:27'),
(3002, 697, NULL, '13340', '159', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-24 15:08:18', '2022-08-24 18:48:27'),
(3003, 698, NULL, '13341', '159', NULL, '249', 'M', NULL, NULL, '4', '2022-08-24 15:10:57', '2022-08-24 18:48:08'),
(3004, 698, NULL, '13342', '159', NULL, '249', 'L', NULL, NULL, '2', '2022-08-24 15:10:57', '2022-08-24 18:48:08'),
(3005, 698, NULL, '13343', '159', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-24 15:10:57', '2022-08-24 18:48:08'),
(3006, 698, NULL, '13344', '159', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-24 15:10:57', '2022-08-24 18:48:08'),
(3007, 699, NULL, '13346', '159', NULL, '249', 'L', NULL, NULL, '2', '2022-08-24 15:13:32', '2022-08-24 18:47:51'),
(3008, 699, NULL, '13348', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-24 15:13:32', '2022-08-24 18:47:51'),
(3009, 700, NULL, '13349', '159', NULL, '249', 'M', NULL, NULL, '2', '2022-08-24 16:12:23', '2022-08-24 18:47:27'),
(3010, 700, NULL, '13350', '159', NULL, '249', 'L', NULL, NULL, '1', '2022-08-24 16:12:23', '2022-08-24 18:47:27'),
(3011, 700, NULL, '13351', '159', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-24 16:12:23', '2022-08-24 18:47:27'),
(3012, 700, NULL, '13352', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-24 16:12:23', '2022-08-24 18:47:27'),
(3013, 701, NULL, '13357', '159', NULL, '249', 'M', NULL, NULL, '2', '2022-08-24 16:16:56', '2022-08-24 18:46:50'),
(3014, 701, NULL, '13358', '159', NULL, '249', 'L', NULL, NULL, '2', '2022-08-24 16:16:56', '2022-08-24 18:46:50'),
(3015, 701, NULL, '13359', '159', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-24 16:16:56', '2022-08-24 18:46:50'),
(3016, 701, NULL, '13360', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-24 16:16:56', '2022-08-24 18:46:50'),
(3017, 702, NULL, '13361', '159', NULL, '249', 'M', NULL, NULL, '3', '2022-08-24 16:24:20', '2022-08-24 18:46:27'),
(3018, 702, NULL, '13362', '159', NULL, '249', 'L', NULL, NULL, '4', '2022-08-24 16:24:20', '2022-08-24 18:46:27'),
(3019, 702, NULL, '13363', '159', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-24 16:24:20', '2022-08-24 18:46:27'),
(3020, 702, NULL, '13364', '159', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-24 16:24:20', '2022-08-24 18:46:27'),
(3021, 703, NULL, '13365', '159', NULL, '249', 'M', NULL, NULL, '1', '2022-08-24 16:28:09', '2022-08-24 18:46:11'),
(3022, 703, NULL, '13366', '159', NULL, '249', 'L', NULL, NULL, '2', '2022-08-24 16:28:09', '2022-08-24 18:46:11'),
(3023, 704, NULL, '13369', '159', NULL, '249', 'M', NULL, NULL, '4', '2022-08-24 16:37:45', '2022-08-24 18:45:36'),
(3024, 704, NULL, '13370', '159', NULL, '249', 'L', NULL, NULL, '1', '2022-08-24 16:37:45', '2022-08-24 18:45:36'),
(3025, 705, NULL, '13373', '159', NULL, '199', 'M', NULL, NULL, '2', '2022-08-24 16:47:50', '2022-08-24 18:45:10'),
(3026, 705, NULL, '13374', '159', NULL, '199', 'L', NULL, NULL, '2', '2022-08-24 16:47:50', '2022-08-24 18:45:10'),
(3027, 705, NULL, '13375', '159', NULL, '199', 'XL', NULL, NULL, '2', '2022-08-24 16:47:50', '2022-08-24 18:45:10'),
(3028, 705, NULL, '13376', '159', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-24 16:47:50', '2022-08-24 18:45:10'),
(3029, 706, NULL, '13377', '159', NULL, '199', 'M', NULL, NULL, '2', '2022-08-24 16:51:05', '2022-08-24 18:44:40'),
(3030, 706, NULL, '13378', '159', NULL, '199', 'L', NULL, NULL, '2', '2022-08-24 16:51:05', '2022-08-24 18:44:40'),
(3031, 706, NULL, '13379', '159', NULL, '199', 'XL', NULL, NULL, '2', '2022-08-24 16:51:05', '2022-08-24 18:44:40'),
(3032, 706, NULL, '13380', '159', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-24 16:51:05', '2022-08-24 18:44:40'),
(3033, 707, NULL, '13381', '159', NULL, '199', 'M', NULL, NULL, '2', '2022-08-24 16:54:19', '2022-08-24 18:43:53'),
(3034, 707, NULL, '13382', '159', NULL, '199', 'L', NULL, NULL, '2', '2022-08-24 16:54:19', '2022-08-24 18:43:53'),
(3035, 707, NULL, '13383', '159', NULL, '199', 'XL', NULL, NULL, '2', '2022-08-24 16:54:19', '2022-08-24 18:43:53'),
(3036, 707, NULL, '13384', '159', NULL, '199', 'XXL', NULL, NULL, '2', '2022-08-24 16:54:19', '2022-08-24 18:43:53'),
(3037, 708, NULL, '13385', '159', NULL, '249', 'M', NULL, NULL, '1', '2022-08-24 17:28:25', '2022-08-24 18:43:20'),
(3038, 709, NULL, '13389', '159', NULL, '249', 'M', NULL, NULL, '4', '2022-08-24 17:32:23', '2022-08-24 18:43:03'),
(3039, 709, NULL, '13390', '159', NULL, '249', 'L', NULL, NULL, '4', '2022-08-24 17:32:23', '2022-08-24 18:43:03'),
(3040, 710, NULL, '13393', '159', NULL, '249', 'M', NULL, NULL, '1', '2022-08-24 17:42:12', '2022-08-24 18:42:43'),
(3041, 710, NULL, '13394', '159', NULL, '249', 'L', NULL, NULL, '4', '2022-08-24 17:42:12', '2022-08-24 18:42:43'),
(3042, 710, NULL, '13395', '159', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-24 17:42:12', '2022-08-24 18:42:43'),
(3043, 710, NULL, '13396', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-24 17:42:12', '2022-08-24 18:42:43'),
(3044, 711, NULL, '13397', '99', NULL, '149', 'S', NULL, NULL, '4', '2022-08-24 17:50:30', '2022-08-24 19:29:22'),
(3045, 711, NULL, '13398', '99', NULL, '149', 'M', NULL, NULL, '3', '2022-08-24 17:50:30', '2022-08-24 19:29:22'),
(3046, 711, NULL, '13399', '99', NULL, '149', 'L', NULL, NULL, '4', '2022-08-24 17:50:30', '2022-08-24 19:29:22'),
(3047, 711, NULL, '13400', '99', NULL, '149', 'XL', NULL, NULL, '2', '2022-08-24 17:50:30', '2022-08-24 19:29:22'),
(3048, 711, NULL, '13401', '99', NULL, '149', 'XXL', NULL, NULL, '3', '2022-08-24 17:50:30', '2022-08-24 19:29:22'),
(3049, 712, NULL, '13402', '99', NULL, '149', 'S', NULL, NULL, '4', '2022-08-24 17:57:05', '2022-08-24 19:29:12'),
(3050, 712, NULL, '13403', '99', NULL, '149', 'M', NULL, NULL, '3', '2022-08-24 17:57:05', '2022-08-24 19:29:12'),
(3051, 712, NULL, '13404', '99', NULL, '149', 'L', NULL, NULL, '1', '2022-08-24 17:57:05', '2022-08-24 19:29:12'),
(3052, 712, NULL, '13405', '99', NULL, '149', 'XL', NULL, NULL, '4', '2022-08-24 17:57:05', '2022-08-24 19:29:12'),
(3053, 712, NULL, '13406', '99', NULL, '149', 'XXL', NULL, NULL, '4', '2022-08-24 17:57:05', '2022-08-24 19:29:12'),
(3054, 713, NULL, '13407', '99', NULL, '149', 'S', NULL, NULL, '4', '2022-08-24 18:02:16', '2022-08-24 19:29:00'),
(3055, 713, NULL, '13408', '99', NULL, '149', 'M', NULL, NULL, '1', '2022-08-24 18:02:16', '2022-08-24 19:29:00'),
(3056, 713, NULL, '13409', '99', NULL, '149', 'L', NULL, NULL, '3', '2022-08-24 18:02:16', '2022-08-24 19:29:00'),
(3057, 713, NULL, '13410', '99', NULL, '149', 'XL', NULL, NULL, '4', '2022-08-24 18:02:16', '2022-08-24 19:29:00'),
(3058, 713, NULL, '13411', '99', NULL, '149', 'XXL', NULL, NULL, '4', '2022-08-24 18:02:16', '2022-08-24 19:29:00'),
(3059, 714, NULL, '13412', '159', NULL, '249', 'M', NULL, NULL, '2', '2022-08-24 18:11:00', '2022-08-24 18:42:10'),
(3060, 714, NULL, '13414', '159', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-24 18:11:00', '2022-08-24 18:42:10'),
(3061, 715, NULL, '13416', '159', NULL, '249', 'M', NULL, NULL, '2', '2022-08-25 06:57:25', '2022-08-25 06:58:03'),
(3062, 715, NULL, '13417', '159', NULL, '249', 'L', NULL, NULL, '2', '2022-08-25 06:57:25', '2022-08-25 06:58:03'),
(3063, 715, NULL, '13418', '159', NULL, '249', 'XL', NULL, NULL, '2', '2022-08-25 06:57:25', '2022-08-25 06:58:03'),
(3064, 715, NULL, '13419', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-25 06:57:25', '2022-08-25 06:58:03'),
(3065, 716, NULL, '13420', '159', NULL, '249', 'M', NULL, NULL, '2', '2022-08-25 07:01:45', '2022-08-25 07:02:26'),
(3066, 716, NULL, '13421', '159', NULL, '249', 'L', NULL, NULL, '1', '2022-08-25 07:01:45', '2022-08-25 07:02:26'),
(3067, 716, NULL, '13422', '159', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-25 07:01:45', '2022-08-25 07:02:26'),
(3068, 716, NULL, '13423', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-25 07:01:45', '2022-08-25 07:02:26'),
(3069, 717, NULL, '13424', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 07:13:30', '2022-08-25 07:14:10'),
(3070, 717, NULL, '13425', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 07:13:30', '2022-08-25 07:14:10'),
(3071, 717, NULL, '13426', '99', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 07:13:30', '2022-08-25 07:14:10'),
(3072, 717, NULL, '13427', '99', NULL, '139', 'XL', NULL, NULL, '3', '2022-08-25 07:13:30', '2022-08-25 07:14:10'),
(3073, 717, NULL, '13428', '99', NULL, '139', 'XXL', NULL, NULL, '5', '2022-08-25 07:13:30', '2022-08-25 07:14:10'),
(3074, 718, NULL, '13429', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 07:17:09', '2022-08-25 07:17:59'),
(3075, 718, NULL, '13430', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 07:17:09', '2022-08-25 07:17:59'),
(3076, 718, NULL, '13431', '99', NULL, '139', 'L', NULL, NULL, '3', '2022-08-25 07:17:09', '2022-08-25 07:17:59'),
(3077, 718, NULL, '13432', '99', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 07:17:09', '2022-08-25 07:17:59'),
(3078, 718, NULL, '13433', '99', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 07:17:09', '2022-08-25 07:17:59'),
(3079, 719, NULL, '13434', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 07:22:18', '2022-08-25 07:22:48'),
(3080, 719, NULL, '13435', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 07:22:18', '2022-08-25 07:22:48'),
(3081, 719, NULL, '13436', '99', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 07:22:18', '2022-08-25 07:22:48'),
(3082, 719, NULL, '13437', '99', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 07:22:18', '2022-08-25 07:22:48'),
(3083, 719, NULL, '13438', '99', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 07:22:18', '2022-08-25 07:22:48'),
(3084, 720, NULL, '13439', '129', NULL, '139', 'S', NULL, NULL, '2', '2022-08-25 07:32:39', '2022-08-25 07:42:36'),
(3085, 720, NULL, '13440', '129', NULL, '139', 'M', NULL, NULL, '5', '2022-08-25 07:32:39', '2022-08-25 07:42:36'),
(3086, 720, NULL, '13441', '129', NULL, '139', 'L', NULL, NULL, '5', '2022-08-25 07:32:39', '2022-08-25 07:42:36'),
(3087, 720, NULL, '13442', '129', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 07:32:39', '2022-08-25 07:42:36'),
(3088, 720, NULL, '13443', '129', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 07:32:39', '2022-08-25 07:42:36');
INSERT INTO `variations` (`id`, `product_id`, `attribute_id`, `sku_id`, `price`, `description`, `discounted_variation_price`, `variation`, `variation_interval`, `variation_times`, `qty`, `created_at`, `updated_at`) VALUES
(3089, 721, NULL, '13444', '129', NULL, '139', 'S', NULL, NULL, '3', '2022-08-25 07:36:30', '2022-08-25 07:37:22'),
(3090, 721, NULL, '13445', '129', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 07:36:30', '2022-08-25 07:37:22'),
(3091, 721, NULL, '13446', '129', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 07:36:30', '2022-08-25 07:37:22'),
(3092, 721, NULL, '13447', '129', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 07:36:30', '2022-08-25 07:37:22'),
(3093, 721, NULL, '13448', '129', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 07:36:30', '2022-08-25 07:37:22'),
(3094, 722, NULL, '13449', '129', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 07:40:49', '2022-08-25 07:41:57'),
(3095, 722, NULL, '13450', '129', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 07:40:49', '2022-08-25 07:41:57'),
(3096, 722, NULL, '13451', '129', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 07:40:49', '2022-08-25 07:41:57'),
(3097, 722, NULL, '13452', '129', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 07:40:49', '2022-08-25 07:41:57'),
(3098, 722, NULL, '13453', '129', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 07:40:49', '2022-08-25 07:41:57'),
(3099, 723, NULL, '15692', '120', NULL, '140', 'S', NULL, NULL, '2', '2022-08-25 11:03:42', '2022-08-25 11:03:42'),
(3100, 724, NULL, '13454', '99', NULL, '139', 'S', NULL, NULL, '3', '2022-08-25 13:58:42', '2022-08-25 14:00:16'),
(3101, 724, NULL, '13455', '99', NULL, '139', 'M', NULL, NULL, '1', '2022-08-25 13:58:42', '2022-08-25 14:00:16'),
(3102, 724, NULL, '13456', '99', NULL, '139', 'L', NULL, NULL, '2', '2022-08-25 13:58:42', '2022-08-25 14:00:16'),
(3103, 724, NULL, '13457', '99', NULL, '139', 'XL', NULL, NULL, '3', '2022-08-25 13:58:42', '2022-08-25 14:00:16'),
(3104, 724, NULL, '13458', '99', NULL, '139', 'XXL', NULL, NULL, '3', '2022-08-25 13:58:42', '2022-08-25 14:00:16'),
(3105, 725, NULL, '13459', '99', NULL, '139', 'S', NULL, NULL, '1', '2022-08-25 14:07:10', '2022-08-25 14:08:29'),
(3106, 725, NULL, '13461', '99', NULL, '139', 'L', NULL, NULL, '1', '2022-08-25 14:07:10', '2022-08-25 14:08:29'),
(3107, 725, NULL, '13462', '99', NULL, '139', 'XL', NULL, NULL, '2', '2022-08-25 14:07:10', '2022-08-25 14:08:29'),
(3108, 725, NULL, '13463', '99', NULL, '139', 'XXL', NULL, NULL, '2', '2022-08-25 14:07:10', '2022-08-25 14:08:29'),
(3109, 726, NULL, '13464', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 14:12:09', '2022-08-25 14:14:51'),
(3110, 726, NULL, '13465', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 14:12:09', '2022-08-25 14:14:51'),
(3111, 726, NULL, '13466', '99', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 14:12:09', '2022-08-25 14:14:51'),
(3112, 726, NULL, '13467', '99', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 14:12:09', '2022-08-25 14:14:51'),
(3113, 726, NULL, '13468', '99', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 14:12:09', '2022-08-25 14:14:51'),
(3114, 727, NULL, '13481', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 14:24:27', '2022-08-25 14:25:20'),
(3115, 727, NULL, '13482', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 14:24:27', '2022-08-25 14:25:20'),
(3116, 727, NULL, '13483', '99', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 14:24:27', '2022-08-25 14:25:20'),
(3117, 727, NULL, '13484', '99', NULL, '139', 'XL', NULL, NULL, '3', '2022-08-25 14:24:27', '2022-08-25 14:25:20'),
(3118, 727, NULL, '13485', '99', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 14:24:27', '2022-08-25 14:25:20'),
(3119, 728, NULL, '13486', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 14:28:57', '2022-08-25 14:30:54'),
(3120, 728, NULL, '13488', '99', NULL, '139', 'L', NULL, NULL, '3', '2022-08-25 14:28:57', '2022-08-25 14:30:54'),
(3121, 728, NULL, '13489', '99', NULL, '139', 'XL', NULL, NULL, '2', '2022-08-25 14:28:57', '2022-08-25 14:30:54'),
(3122, 728, NULL, '13490', '99', NULL, '139', 'XXL', NULL, NULL, '2', '2022-08-25 14:28:57', '2022-08-25 14:30:54'),
(3123, 729, NULL, '13491', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 14:34:13', '2022-08-25 14:35:11'),
(3124, 729, NULL, '13492', '99', NULL, '139', 'M', NULL, NULL, '3', '2022-08-25 14:34:13', '2022-08-25 14:35:11'),
(3125, 729, NULL, '13493', '99', NULL, '139', 'L', NULL, NULL, '3', '2022-08-25 14:34:13', '2022-08-25 14:35:11'),
(3126, 729, NULL, '13494', '99', NULL, '139', 'XL', NULL, NULL, '2', '2022-08-25 14:34:13', '2022-08-25 14:35:11'),
(3127, 729, NULL, '13495', '99', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 14:34:13', '2022-08-25 14:35:11'),
(3128, 730, NULL, '13496', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 14:48:15', '2022-08-25 14:49:45'),
(3129, 730, NULL, '13497', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 14:48:15', '2022-08-25 14:49:45'),
(3130, 730, NULL, '13498', '99', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 14:48:16', '2022-08-25 14:49:45'),
(3131, 730, NULL, '13499', '99', NULL, '139', 'XL', NULL, NULL, '3', '2022-08-25 14:48:16', '2022-08-25 14:49:45'),
(3132, 730, NULL, '13500', '99', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 14:48:16', '2022-08-25 14:49:45'),
(3133, 731, NULL, '13501', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 14:53:08', '2022-08-25 14:53:47'),
(3134, 731, NULL, '13502', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 14:53:08', '2022-08-25 14:53:47'),
(3135, 731, NULL, '13503', '99', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 14:53:08', '2022-08-25 14:53:47'),
(3136, 731, NULL, '13504', '99', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 14:53:08', '2022-08-25 14:53:47'),
(3137, 731, NULL, '13505', '99', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 14:53:08', '2022-08-25 14:53:47'),
(3138, 732, NULL, '13506', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 14:56:58', '2022-08-25 14:57:34'),
(3139, 732, NULL, '13507', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 14:56:58', '2022-08-25 14:57:34'),
(3140, 732, NULL, '13508', '99', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 14:56:58', '2022-08-25 14:57:34'),
(3141, 732, NULL, '13509', '99', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 14:56:58', '2022-08-25 14:57:34'),
(3142, 732, NULL, '13510', '99', NULL, '139', 'XXL', NULL, NULL, '5', '2022-08-25 14:56:58', '2022-08-25 14:57:34'),
(3143, 733, NULL, '13519', '159', NULL, '249', 'M', NULL, NULL, '2', '2022-08-25 15:13:30', '2022-08-25 15:14:12'),
(3144, 733, NULL, '13521', '159', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-25 15:13:30', '2022-08-25 15:14:12'),
(3145, 733, NULL, '13522', '159', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-25 15:13:30', '2022-08-25 15:14:12'),
(3146, 734, NULL, '13511', '159', NULL, '249', 'M', NULL, NULL, '4', '2022-08-25 15:54:01', '2022-08-25 15:54:38'),
(3147, 734, NULL, '13512', '159', NULL, '249', 'L', NULL, NULL, '3', '2022-08-25 15:54:01', '2022-08-25 15:54:38'),
(3148, 734, NULL, '13513', '159', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-25 15:54:01', '2022-08-25 15:54:38'),
(3149, 734, NULL, '13514', '159', NULL, '249', 'XXL', NULL, NULL, '4', '2022-08-25 15:54:01', '2022-08-25 15:54:38'),
(3150, 735, NULL, '13515', '159', NULL, '249', 'M', NULL, NULL, '3', '2022-08-25 15:58:10', '2022-08-25 15:58:51'),
(3151, 735, NULL, '13516', '159', NULL, '249', 'L', NULL, NULL, '4', '2022-08-25 15:58:10', '2022-08-25 15:58:51'),
(3152, 735, NULL, '13517', '159', NULL, '249', 'XL', NULL, NULL, '3', '2022-08-25 15:58:10', '2022-08-25 15:58:51'),
(3153, 735, NULL, '13518', '159', NULL, '249', 'XXL', NULL, NULL, '5', '2022-08-25 15:58:10', '2022-08-25 15:58:51'),
(3154, 736, NULL, '13528', '149', NULL, '229', 'M', NULL, NULL, '4', '2022-08-25 16:19:29', '2022-08-25 16:20:27'),
(3155, 736, NULL, '13529', '149', NULL, '229', 'L', NULL, NULL, '3', '2022-08-25 16:19:29', '2022-08-25 16:20:27'),
(3156, 736, NULL, '13530', '149', NULL, '229', 'XL', NULL, NULL, '2', '2022-08-25 16:19:29', '2022-08-25 16:20:27'),
(3157, 736, NULL, '13531', '149', NULL, '229', 'XXL', NULL, NULL, '2', '2022-08-25 16:19:29', '2022-08-25 16:20:27'),
(3158, 737, NULL, '13536', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 16:28:05', '2022-08-25 16:29:52'),
(3159, 737, NULL, '13537', '99', NULL, '139', 'M', NULL, NULL, '2', '2022-08-25 16:28:05', '2022-08-25 16:29:52'),
(3160, 737, NULL, '13538', '99', NULL, '139', 'L', NULL, NULL, '4', '2022-08-25 16:28:05', '2022-08-25 16:29:52'),
(3161, 737, NULL, '13539', '99', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 16:28:05', '2022-08-25 16:29:52'),
(3162, 737, NULL, '13540', '99', NULL, '139', 'XXL', NULL, NULL, '2', '2022-08-25 16:28:05', '2022-08-25 16:29:52'),
(3163, 738, NULL, '13541', '99', NULL, '139', 'S', NULL, NULL, '3', '2022-08-25 16:34:19', '2022-08-25 16:36:16'),
(3164, 738, NULL, '13544', '99', NULL, '139', 'XL', NULL, NULL, '3', '2022-08-25 16:34:19', '2022-08-25 16:36:16'),
(3165, 738, NULL, '13545', '99', NULL, '139', 'XXL', NULL, NULL, '1', '2022-08-25 16:34:19', '2022-08-25 16:36:16'),
(3166, 739, NULL, '13546', '99', NULL, '139', 'S', NULL, NULL, '4', '2022-08-25 16:41:30', '2022-08-25 16:42:37'),
(3167, 739, NULL, '13547', '99', NULL, '139', 'M', NULL, NULL, '4', '2022-08-25 16:41:30', '2022-08-25 16:42:37'),
(3168, 739, NULL, '13548', '99', NULL, '139', 'L', NULL, NULL, '2', '2022-08-25 16:41:30', '2022-08-25 16:42:37'),
(3169, 739, NULL, '13549', '99', NULL, '139', 'XL', NULL, NULL, '4', '2022-08-25 16:41:30', '2022-08-25 16:42:37'),
(3170, 739, NULL, '13550', '99', NULL, '139', 'XXL', NULL, NULL, '4', '2022-08-25 16:41:30', '2022-08-25 16:42:37'),
(3171, 740, NULL, '13561', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-08-25 17:39:11', '2022-08-25 17:39:44'),
(3172, 740, NULL, '13562', '149', NULL, '249', 'M', NULL, NULL, '3', '2022-08-25 17:39:11', '2022-08-25 17:39:44'),
(3173, 740, NULL, '13563', '149', NULL, '249', 'L', NULL, NULL, '1', '2022-08-25 17:39:11', '2022-08-25 17:39:44'),
(3174, 740, NULL, '13564', '149', NULL, '249', 'XL', NULL, NULL, '4', '2022-08-25 17:39:11', '2022-08-25 17:39:44'),
(3175, 740, NULL, '13565', '149', NULL, '249', 'XXL', NULL, NULL, '1', '2022-08-25 17:39:11', '2022-08-25 17:39:44'),
(3176, 741, NULL, '13566', '149', NULL, '249', 'S', NULL, NULL, '3', '2022-08-25 17:44:15', '2022-08-25 17:45:34'),
(3177, 741, NULL, '13567', '149', NULL, '249', 'M', NULL, NULL, '2', '2022-08-25 17:44:15', '2022-08-25 17:45:34'),
(3178, 742, NULL, '13571', '149', NULL, '249', 'S', NULL, NULL, '4', '2022-08-25 17:54:26', '2022-08-26 21:33:05'),
(3179, 742, NULL, '13572', '149', NULL, '249', 'M', NULL, NULL, '3', '2022-08-25 17:54:26', '2022-08-26 21:33:05'),
(3180, 742, NULL, '13573', '149', NULL, '249', 'L', NULL, NULL, '3', '2022-08-25 17:54:26', '2022-08-26 21:33:05'),
(3181, 742, NULL, '13574', '149', NULL, '249', 'XL', NULL, NULL, '1', '2022-08-25 17:54:26', '2022-08-26 21:33:05'),
(3182, 742, NULL, '13575', '149', NULL, '249', 'XXL', NULL, NULL, '2', '2022-08-25 17:54:26', '2022-08-26 21:33:05'),
(3183, 758, NULL, '', '299', NULL, '199', 'L', NULL, NULL, '4', '2024-06-04 12:27:26', '2024-06-04 12:27:26'),
(3184, 758, NULL, '', '699', NULL, '599', 'XL', NULL, NULL, '3', '2024-06-04 12:27:26', '2024-06-04 12:27:26'),
(3185, 759, NULL, '', '299', NULL, '199', 'L', NULL, NULL, '4', '2024-06-04 12:29:05', '2024-06-04 12:29:05'),
(3186, 770, NULL, '', '250', NULL, '200', '1 BHK', NULL, NULL, '1', '2024-06-18 08:27:53', '2024-06-20 18:22:33'),
(3187, 770, NULL, '', '450', NULL, '400', '2 BHK', NULL, NULL, '1', '2024-06-18 08:27:53', '2024-06-20 18:22:33'),
(3188, 770, NULL, '', '650', NULL, '600', '3 BHK', NULL, NULL, '1', '2024-06-18 08:27:53', '2024-06-20 18:22:33'),
(3189, 770, NULL, '', '1', NULL, '2', 'Add', NULL, NULL, '1', '2024-06-20 18:22:33', '2024-06-20 18:22:33'),
(3190, 761, 2, '', '2999', 'Floor Cleaning, Wet Wiping, Mopping/Scrubbing, Sanitizing bathroom Accesosries', '2800', 'OneTime', NULL, NULL, '1', '2024-06-28 07:17:35', '2024-06-28 07:17:35'),
(3191, 761, 5, '', '2999', NULL, '2800', '1 BHK', NULL, NULL, '1', '2024-06-28 07:17:35', '2024-06-28 07:17:35'),
(3192, 761, 5, '', '4999', NULL, '4800', '2 BHK', NULL, NULL, '1', '2024-06-28 07:17:35', '2024-06-28 07:17:35'),
(3193, 761, 2, '', '2999', 'Floor Cleaning, Wet Wiping, Mopping/Scrubbing, Sanitizing bathroom Accesosries', '2600', 'AMC', '30', 3, '100', '2024-06-28 07:17:35', '2024-06-28 07:17:35'),
(3195, 768, NULL, '', '2500', NULL, '2200', 'S', NULL, NULL, '10', '2024-07-19 16:13:35', '2024-08-15 14:56:51'),
(3196, 769, NULL, '', '2000', NULL, '1500', '1BHK', NULL, NULL, '1', '2024-08-15 14:55:45', '2024-08-15 14:55:45'),
(3197, 768, NULL, '', '200', NULL, '100', 'BHK', NULL, NULL, '1', '2024-08-15 14:56:51', '2024-08-15 14:56:51'),
(3198, 767, NULL, '', '2000', NULL, '1500', '1BHK', NULL, NULL, '1', '2024-08-15 14:57:47', '2024-08-15 14:58:18'),
(3199, 767, NULL, '', '4000', NULL, '2400', '2BHK', NULL, NULL, '2', '2024-08-15 14:58:18', '2024-08-15 14:58:18'),
(3200, 772, NULL, '', '100', NULL, '200', 'AMC', NULL, NULL, '55', '2024-08-27 19:52:54', '2024-08-27 19:52:54'),
(3201, 773, NULL, '', '500', NULL, '200', 'AMC', NULL, NULL, '5', '2024-08-27 19:56:46', '2024-08-27 19:56:46'),
(3202, 773, NULL, '', '50', NULL, '50', 'AMC', NULL, NULL, '5', '2024-08-27 19:56:46', '2024-08-27 19:56:46'),
(3203, 774, 4, '', '5000', NULL, '4500', 'Ontime', NULL, NULL, '5', '2024-08-27 20:17:47', '2024-08-27 20:17:47'),
(3204, 774, 4, '', '3000', NULL, '2500', 'AMC', '90', 5, '4', '2024-08-27 20:17:47', '2024-08-27 20:17:47'),
(3205, 774, 5, '', '1500', NULL, '1000', '1BHK', NULL, NULL, '5', '2024-08-27 20:17:47', '2024-08-27 20:17:47'),
(3206, 775, 4, '', '500', NULL, '250', 'OneTime', NULL, NULL, '5', '2024-08-27 20:25:52', '2024-08-27 20:25:52'),
(3207, 775, 4, '', '2500', NULL, '1500', 'AMC', '90', 3, '2', '2024-08-27 20:25:53', '2024-08-27 20:25:53'),
(3208, 775, 5, '', '1000', NULL, '800', '1BHK', NULL, NULL, '5', '2024-08-27 20:25:53', '2024-08-27 20:25:53'),
(3209, 775, 5, '', '1500', NULL, '1200', '2BHK', NULL, NULL, '5', '2024-08-27 20:25:53', '2024-08-27 20:25:53'),
(3210, 776, 4, '', '2500', NULL, '520', 'AMC', '50', 5, '5', '2024-08-27 20:31:21', '2024-08-27 20:31:21'),
(3211, 777, 4, '', '200', NULL, '100', 'small', NULL, NULL, '5', '2024-08-30 20:57:56', '2024-08-30 20:57:56'),
(3212, 777, 4, '', '500', NULL, '250', 'Large', NULL, NULL, '10', '2024-08-30 20:57:56', '2024-08-30 20:57:56'),
(3213, 778, 4, '', '500', NULL, '400', 'Combo', NULL, NULL, '5', '2024-08-30 21:00:25', '2024-08-30 21:00:25'),
(3214, 783, 4, NULL, '5000', NULL, '2500', 'AMC', '30', 2, '5', '2024-09-01 07:16:05', '2024-09-01 07:16:05'),
(3215, 783, 4, NULL, '2500', NULL, '2000', 'OneTime', NULL, NULL, '5', '2024-09-01 07:16:05', '2024-09-01 07:16:05'),
(3218, 787, 4, NULL, '5', NULL, '500', 'fghb', '50', 5, '1', '2024-09-03 12:22:55', '2024-09-03 12:22:55'),
(3229, 786, 5, NULL, '20', NULL, '20', '20', '20', 20, '20', '2024-09-04 13:16:50', '2024-09-04 13:28:21'),
(3230, 786, 4, NULL, '20', NULL, '20', '20', '20', 20, '20', '2024-09-04 13:17:20', '2024-09-04 13:28:21'),
(3231, 786, 5, NULL, '20', NULL, '20', '20', '202', 20, '20', '2024-09-04 13:19:23', '2024-09-04 13:28:21');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `product_id`, `user_id`, `created_at`, `updated_at`) VALUES
(4, 2, 6, '2022-05-30 07:23:37', '2022-05-30 07:23:37'),
(21, 4, 8, '2022-06-06 13:32:32', '2022-06-06 13:32:32'),
(25, 5, 8, '2022-06-10 12:15:23', '2022-06-10 12:15:23'),
(26, 9, 6, '2022-06-11 09:55:33', '2022-06-11 09:55:33'),
(29, 11, 13, '2022-06-11 20:33:30', '2022-06-11 20:33:30'),
(30, 12, 13, '2022-06-11 20:33:52', '2022-06-11 20:33:52'),
(31, 10, 13, '2022-06-11 20:34:00', '2022-06-11 20:34:00'),
(32, 21, 13, '2022-06-11 20:34:25', '2022-06-11 20:34:25'),
(33, 9, 13, '2022-06-11 21:08:32', '2022-06-11 21:08:32'),
(34, 11, 11, '2022-06-11 21:16:12', '2022-06-11 21:16:12'),
(37, 13, 8, '2022-06-18 13:57:18', '2022-06-18 13:57:18'),
(38, 10, 6, '2022-06-21 17:41:46', '2022-06-21 17:41:46'),
(39, 27, 6, '2022-06-21 18:21:23', '2022-06-21 18:21:23'),
(40, 21, 17, '2022-06-24 22:55:53', '2022-06-24 22:55:53'),
(42, 9, 17, '2022-06-24 23:23:31', '2022-06-24 23:23:31'),
(43, 20, 17, '2022-06-24 23:28:17', '2022-06-24 23:28:17'),
(44, 18, 17, '2022-06-24 23:32:12', '2022-06-24 23:32:12'),
(46, 47, 20, '2022-07-17 23:08:20', '2022-07-17 23:08:20'),
(47, 86, 6, '2022-07-20 10:03:22', '2022-07-20 10:03:22'),
(48, 122, 20, '2022-07-20 13:25:23', '2022-07-20 13:25:23'),
(49, 169, 6, '2022-07-28 10:15:06', '2022-07-28 10:15:06'),
(50, 218, 6, '2022-08-11 18:23:48', '2022-08-11 18:23:48'),
(51, 213, 6, '2022-08-11 18:28:12', '2022-08-11 18:28:12'),
(53, 255, 6, '2022-08-13 14:33:28', '2022-08-13 14:33:28'),
(54, 244, 6, '2022-08-13 14:35:11', '2022-08-13 14:35:11'),
(55, 260, 46, '2022-08-14 17:14:27', '2022-08-14 17:14:27'),
(56, 98, 6, '2022-08-14 18:29:10', '2022-08-14 18:29:10'),
(58, 390, 6, '2022-08-17 08:22:18', '2022-08-17 08:22:18'),
(59, 394, 6, '2022-08-17 08:47:17', '2022-08-17 08:47:17'),
(62, 441, 6, '2022-08-18 09:03:50', '2022-08-18 09:03:50'),
(65, 131, 6, '2022-08-23 17:00:00', '2022-08-23 17:00:00'),
(66, 679, 6, '2022-08-24 09:57:41', '2022-08-24 09:57:41'),
(68, 745, 6, '2024-03-30 07:34:39', '2024-03-30 07:34:39'),
(69, 767, 56, '2024-06-18 06:09:24', '2024-06-18 06:09:24'),
(70, 74, 62, '2024-06-21 12:00:36', '2024-06-21 12:00:36'),
(71, 763, 62, '2024-06-21 12:01:30', '2024-06-21 12:01:30'),
(72, 761, 62, '2024-06-28 13:45:29', '2024-06-28 13:45:29'),
(73, 759, 62, '2024-06-28 13:45:33', '2024-06-28 13:45:33'),
(74, 770, 62, '2024-07-09 18:13:29', '2024-07-09 18:13:29'),
(76, 74, 73, '2024-07-16 02:28:31', '2024-07-16 02:28:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `allocations`
--
ALTER TABLE `allocations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `emp_timeslots` (`emp_timeslots`),
  ADD KEY `emp_location` (`emp_location`);

--
-- Indexes for table `AssignedInventory`
--
ALTER TABLE `AssignedInventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_mobile_unique` (`mobile`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_login_history`
--
ALTER TABLE `employee_login_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emp_attendence`
--
ALTER TABLE `emp_attendence`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emp_verified_attendence`
--
ALTER TABLE `emp_verified_attendence`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `helps`
--
ALTER TABLE `helps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_data`
--
ALTER TABLE `home_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `innersubcategories`
--
ALTER TABLE `innersubcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inspections`
--
ALTER TABLE `inspections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_category`
--
ALTER TABLE `inventory_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_history`
--
ALTER TABLE `inventory_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_quantity_type`
--
ALTER TABLE `inventory_quantity_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `order_assign_history`
--
ALTER TABLE `order_assign_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partnerforms`
--
ALTER TABLE `partnerforms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payouts`
--
ALTER TABLE `payouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD KEY `permission_role_role_id_foreign` (`role_id`),
  ADD KEY `permission_role_permission_id_foreign` (`permission_id`);

--
-- Indexes for table `po_vendors`
--
ALTER TABLE `po_vendors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privacy_policies`
--
ALTER TABLE `privacy_policies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_old`
--
ALTER TABLE `products_old`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_answers`
--
ALTER TABLE `question_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quotations`
--
ALTER TABLE `quotations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rattings`
--
ALTER TABLE `rattings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `return_conditions`
--
ALTER TABLE `return_conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD KEY `role_user_user_id_foreign` (`user_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `service_completion`
--
ALTER TABLE `service_completion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribes`
--
ALTER TABLE `subscribes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms_conditions`
--
ALTER TABLE `terms_conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeslots`
--
ALTER TABLE `timeslots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `variations`
--
ALTER TABLE `variations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `allocations`
--
ALTER TABLE `allocations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `AssignedInventory`
--
ALTER TABLE `AssignedInventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=433;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `employee_login_history`
--
ALTER TABLE `employee_login_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emp_attendence`
--
ALTER TABLE `emp_attendence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `emp_verified_attendence`
--
ALTER TABLE `emp_verified_attendence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `helps`
--
ALTER TABLE `helps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `home_data`
--
ALTER TABLE `home_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `innersubcategories`
--
ALTER TABLE `innersubcategories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `inspections`
--
ALTER TABLE `inspections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `inventory_category`
--
ALTER TABLE `inventory_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inventory_history`
--
ALTER TABLE `inventory_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `inventory_quantity_type`
--
ALTER TABLE `inventory_quantity_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=260;

--
-- AUTO_INCREMENT for table `order_assign_history`
--
ALTER TABLE `order_assign_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partnerforms`
--
ALTER TABLE `partnerforms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payouts`
--
ALTER TABLE `payouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `po_vendors`
--
ALTER TABLE `po_vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `privacy_policies`
--
ALTER TABLE `privacy_policies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=795;

--
-- AUTO_INCREMENT for table `products_old`
--
ALTER TABLE `products_old`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3604;

--
-- AUTO_INCREMENT for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `question_answers`
--
ALTER TABLE `question_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `quotations`
--
ALTER TABLE `quotations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rattings`
--
ALTER TABLE `rattings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `return_conditions`
--
ALTER TABLE `return_conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `service_completion`
--
ALTER TABLE `service_completion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `subscribes`
--
ALTER TABLE `subscribes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `terms_conditions`
--
ALTER TABLE `terms_conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `timeslots`
--
ALTER TABLE `timeslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `variations`
--
ALTER TABLE `variations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3232;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `allocations`
--
ALTER TABLE `allocations`
  ADD CONSTRAINT `allocations_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `allocations_ibfk_2` FOREIGN KEY (`emp_timeslots`) REFERENCES `timeslots` (`id`),
  ADD CONSTRAINT `allocations_ibfk_3` FOREIGN KEY (`emp_location`) REFERENCES `locations` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `employees` (`id`);

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
