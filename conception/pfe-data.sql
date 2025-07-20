-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 13 juil. 2025 à 16:14
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pfe-data`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) NOT NULL,
  `confirm` bit(1) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `password` varchar(120) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `confirm`, `email`, `image`, `is_active`, `password`, `password_reset_token`, `phone_number`, `username`, `verification_code`) VALUES
(152, b'1', 'admin@gmail.com', 'profil45891.jpg', b'1', '$2a$10$L6pc9S/ozg8WC0cA1uXRTOx1cci1MaGSpN8USKLTqaNosz8iYnVPu', NULL, NULL, 'admin', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `attractions`
--

CREATE TABLE `attractions` (
  `id` bigint(20) NOT NULL,
  `available_lang` varchar(255) DEFAULT NULL,
  `closing_hour` time(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `opening_hour` time(6) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `visitor_numbers` int(11) NOT NULL,
  `cat_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `attractions`
--

INSERT INTO `attractions` (`id`, `available_lang`, `closing_hour`, `description`, `location`, `name`, `opening_hour`, `photo`, `price`, `visitor_numbers`, `cat_id`) VALUES
(11, 'DAR ZARGOUNN', '00:00:00.000000', 'It is a nice place to visit, in the old town of Tozeur, full of stories, quiet, charm. I highly recommend.\', \'Tozeur-Nefta\', \'Dar Zargoun', 'Nefta', 'DAR ZARGOUNN', '00:00:00.000000', NULL, 800, 7000, 11),
(12, 'all', '00:00:00.000000', 'dbhwdxgbQEfhtgj,x', 'Tozeur-Nefta', 'anantara', '00:00:00.000000', NULL, 219, 7000, 7),
(13, 'all', '00:00:00.000000', 'Anantara est le plus bon hotel de monde', 'Tozeur-Nefta', 'anantara', '00:00:00.000000', NULL, 219, 7000, 7),
(14, 'all', '00:00:00.000000', 'erfvetgfvj,h,ùdofgvsdecQOEF?mz', 'Tozeur-Nefta', 'rasilin', '00:00:00.000000', NULL, 219, 7000, 7),
(18, 'french, English ', '00:00:00.000000', 'zrfgvzfeed', 'Tozeur', 'Scooop', '08:00:00.000000', NULL, 219, 7000, 7),
(19, 'french, English ', '00:00:00.000000', 'zrfgvzfeed', 'Tozeur', 'restau', '08:00:00.000000', NULL, 219, 7000, 12),
(20, 'french, English ', '00:00:00.000000', 'zrfgvzfeed', 'Tozeur', 'Scooop', '08:00:00.000000', NULL, 219, 7000, 12),
(21, 'all', '00:00:00.000000', 'hgvkuyhjvkyuk', 'Tozeur', 'dardada', '08:00:00.000000', NULL, 512, 4500, 12);

-- --------------------------------------------------------

--
-- Structure de la table `attraction_photos`
--

CREATE TABLE `attraction_photos` (
  `attraction_id` bigint(20) NOT NULL,
  `photos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `attraction_photos`
--

INSERT INTO `attraction_photos` (`attraction_id`, `photos`) VALUES
(12, 'Anantaraswimming1685386392.jpg'),
(12, 'AnantaraSwimming2796570115.jpg'),
(13, 'AnantaraSwimming2321021707.jpg'),
(13, 'Anantaraswimming1416366511.jpg'),
(13, 'AnantaraSwimming23888486.jpg'),
(13, 'BreakfastAnantara2553662494.webp'),
(13, 'BreakfastAnantara374210188.jpg'),
(14, 'A - Copie390501812.jpg'),
(14, 'A270325405.jpg'),
(14, 'Anantara - Copie - Copie235868732.jpg'),
(18, 'Dar Dada442842749.jpg'),
(18, 'Le minaret128664704.jpg'),
(18, 'Petit Prince381588320.jpg'),
(18, 'Restaurant de la République336180214.jpg'),
(18, 'scoop617579569.jpg'),
(18, 'scoop2444838365.jpg'),
(19, 'Dar Dada205082187.jpg'),
(19, 'Le minaret598999244.jpg'),
(19, 'Petit Prince40032235.jpg'),
(19, 'Restaurant de la République908378278.jpg'),
(19, 'scoop829640534.jpg'),
(19, 'scoop2666265226.jpg'),
(20, 'Dar Dada402952028.jpg'),
(20, 'Le minaret813524225.jpg'),
(20, 'Petit Prince213509198.jpg'),
(20, 'Restaurant de la République922007640.jpg'),
(20, 'scoop56286013.jpg'),
(20, 'scoop2580645532.jpg'),
(21, 'Dar Dada531376061.jpg'),
(21, 'Le minaret834971111.jpg'),
(21, 'Petit Prince637969459.jpg'),
(21, 'scoop503545647.jpg'),
(21, 'scoop2506643248.jpg'),
(11, 'A - Copie2594960783315.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `description`, `name`) VALUES
(7, 'Hotels offer temporary accommodation to travelers, often with a variety of services and amenities such as rooms, restaurants, pools, and meeting rooms.', 'HOTEL'),
(8, 'Cafés are places where customers can relax, socialize, and consume a variety of hot and cold beverages, often accompanied by pastries or light snacks.', 'Café'),
(9, ' Monuments are sites of historical, cultural, or artistic interest, such as buildings, sculptures, or natural sites, which are often visited by tourists for their significance and beauty.\'', 'Monument'),
(10, ' Guesthouses are more intimate accommodation establishments, often managed by individuals, offering a more personalized stay and a home-like atmosphere away from home', 'Café-Restaurant'),
(11, ' Guesthouses are more intimate accommodation establishments, often managed by individuals, offering a more personalized stay and a home-like atmosphere away from home', 'maison d\'hote'),
(12, 'tu,dtgyhqergQERGùrolk;ùqelmr;gq,b !kl,ms;\n¨lgeqùhekqdsùdefrgtyujiklmkjhgf', 'Restaurant'),
(15, 'sefqzefZE', 'compages');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `attraction_id` bigint(20) DEFAULT NULL,
  `avis` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `moyenne` double NOT NULL,
  `tourist_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `attraction_id`, `avis`, `content`, `date`, `moyenne`, `tourist_id`) VALUES
(2, 12, 0, NULL, '2024-05-22 18:32:01.000000', 0, 2),
(6, 13, 0, NULL, '2024-05-22 19:39:08.000000', 0, 2),
(7, 12, 0, NULL, '2024-05-22 19:39:09.000000', 0, 2),
(9, 12, 0, NULL, '2024-05-22 19:39:10.000000', 0, 2),
(10, 11, 2, 'hnlionmpoùp', '2024-05-22 19:50:15.000000', 0, 2),
(17, 12, 5, 'good', '2025-07-10 14:08:13.000000', 0, 2),
(18, 19, 3, 'good services', '2025-07-10 20:08:02.000000', 0, 2),
(19, 11, 5, 'good', '2025-07-10 20:15:54.000000', 0, 2),
(20, 19, 5, 'waaaaaaaaw!!', '2025-07-10 20:19:44.000000', 0, 2),
(21, 11, 5, 'merci pour la confirmation ', '2025-07-10 21:35:38.000000', 0, 2),
(22, 11, 5, 'good I will reserve', '2025-07-10 21:46:42.000000', 0, 2),
(23, 11, 5, 'thank you!!', '2025-07-10 21:50:26.000000', 0, 2),
(24, 11, 5, 'hello', '2025-07-10 21:59:59.000000', 0, 204);

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequences`
--

CREATE TABLE `hibernate_sequences` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hibernate_sequences`
--

INSERT INTO `hibernate_sequences` (`sequence_name`, `next_val`) VALUES
('default', 300);

-- --------------------------------------------------------

--
-- Structure de la table `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `id` bigint(20) NOT NULL,
  `expiry_date` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `refreshtoken`
--

INSERT INTO `refreshtoken` (`id`, `expiry_date`, `token`, `user_id`) VALUES
(403, '2024-05-31 19:56:08.000000', 'a9630dd3-ab18-4448-a03c-d2311c3f556d', 102),
(552, '2024-06-04 22:38:30.000000', '2f7de0da-10ee-4cb7-83f7-a537fb769e7b', 1),
(553, '2024-06-04 22:38:59.000000', '4b3f409a-8266-450c-af76-c6ccf572d0ae', 1),
(555, '2024-06-05 00:33:45.000000', 'c1653e86-b61b-4534-bc63-f03eb56f8cea', 1),
(602, '2024-06-05 01:00:37.000000', '4943f91d-5e1c-4d0c-a527-ead7dc8cc0ac', 1),
(603, '2024-06-05 01:01:06.000000', 'a97444f6-22e8-4475-850f-d8e67d9caf55', 1),
(652, '2024-06-05 10:00:53.000000', '5103fef7-9e90-434f-9b5d-5a1ee5f6848a', 1),
(653, '2024-06-05 10:01:28.000000', 'fc37b792-de9a-4c6e-b84d-519229b709b6', 1),
(655, '2024-06-05 12:10:31.000000', 'a2198f1c-e363-4288-9c0f-92c9cda65cae', 52),
(761, '2025-07-10 23:35:16.000000', '0569973a-5d6d-4925-a313-64f61397ee36', 204),
(765, '2025-07-11 00:02:02.000000', '14215661-9b56-48a6-91d8-8ffd65f0a63d', 152);

-- --------------------------------------------------------

--
-- Structure de la table `refreshtoken_seq`
--

CREATE TABLE `refreshtoken_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `refreshtoken_seq`
--

INSERT INTO `refreshtoken_seq` (`next_val`) VALUES
(851);

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) NOT NULL,
  `addition` float NOT NULL,
  `attraction_id` bigint(20) DEFAULT NULL,
  `date_debut` datetime(6) DEFAULT NULL,
  `date_fin` datetime(6) DEFAULT NULL,
  `date_res` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `payment` bit(1) NOT NULL,
  `price` float NOT NULL,
  `status` enum('APPROVED','PENDING','REFUSED') DEFAULT NULL,
  `tourist_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `addition`, `attraction_id`, `date_debut`, `date_fin`, `date_res`, `description`, `name`, `payment`, `price`, `status`, `tourist_id`) VALUES
(9, 0, 11, '2024-05-05 02:00:00.000000', '2024-05-25 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 2),
(11, 0, 13, '2024-05-15 02:00:00.000000', NULL, NULL, NULL, NULL, b'0', 0, 'PENDING', 2),
(12, 0, NULL, '2024-03-01 01:00:00.000000', '2024-03-15 01:00:00.000000', NULL, NULL, 'first Reservation in Diar Bou Habibi ', b'0', 0, 'PENDING', 102),
(13, 0, 12, '2024-04-22 02:00:00.000000', '2024-04-24 02:00:00.000000', '2024-04-22 02:00:00.000000', 'zefegrstqefqzrgryhrstgq', 'reserve dinner in dar dada   ', b'0', 0, 'PENDING', 102),
(14, 0, NULL, '2024-04-22 02:00:00.000000', '2024-04-24 02:00:00.000000', '2024-04-22 02:00:00.000000', 'zefegrstqefqzrgryhrstgq', 'reserve dinner in dar dada   ', b'0', 0, 'PENDING', NULL),
(15, 0, NULL, '2024-04-22 02:00:00.000000', '2024-04-24 02:00:00.000000', '2024-04-22 02:00:00.000000', 'zefegrstqefqzrgryhrstgq', 'reserve dinner in dar dada   ', b'0', 0, 'PENDING', NULL),
(16, 0, NULL, '2024-04-22 02:00:00.000000', '2024-04-24 02:00:00.000000', '2024-04-22 02:00:00.000000', 'zefegrstqefqzrgryhrstgq', 'reserve dinner in dar dada   ', b'0', 0, 'PENDING', 102),
(17, 0, NULL, '2024-04-22 02:00:00.000000', '2024-04-24 02:00:00.000000', '2024-04-22 02:00:00.000000', 'zefegrstqefqzrgryhrstgq', 'reserve dinner in dar dada   ', b'0', 0, 'REFUSED', 102),
(18, 0, 12, '2024-05-09 02:00:00.000000', '2024-05-31 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'APPROVED', NULL),
(19, 0, 12, NULL, NULL, NULL, NULL, NULL, b'0', 0, 'PENDING', NULL),
(20, 0, 12, NULL, NULL, NULL, NULL, NULL, b'0', 0, 'PENDING', NULL),
(21, 0, 12, NULL, NULL, NULL, NULL, NULL, b'0', 0, 'PENDING', NULL),
(22, 0, 12, '2024-04-22 02:00:00.000000', '2024-04-24 02:00:00.000000', '2024-04-22 02:00:00.000000', 'zefegrstqefqzrgryhrstgq', 'reserve dinner in dar dada   ', b'0', 0, 'PENDING', 102),
(23, 0, NULL, '2024-04-22 02:00:00.000000', '2024-04-24 02:00:00.000000', '2024-04-22 02:00:00.000000', 'zefegrstqefqzrgryhrstgq', 'reserve dinner in dar dada   ', b'0', 0, 'PENDING', 102),
(24, 0, NULL, '2024-05-23 02:00:00.000000', '2024-05-23 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(25, 0, 11, '2024-05-31 02:00:00.000000', '2024-06-01 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', NULL),
(26, 0, NULL, '2024-05-31 02:00:00.000000', '2024-06-01 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(27, 0, NULL, '2024-05-31 02:00:00.000000', '2024-06-01 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(28, 0, NULL, '2024-05-31 02:00:00.000000', '2024-06-01 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(29, 0, NULL, '2024-05-31 02:00:00.000000', '2024-06-01 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(30, 0, NULL, '2024-05-31 02:00:00.000000', '2024-06-08 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(31, 0, NULL, '2024-06-07 02:00:00.000000', '2024-05-22 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(32, 0, NULL, '2024-06-01 02:00:00.000000', '2024-06-02 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(33, 0, NULL, '2024-05-31 02:00:00.000000', '2024-05-31 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(34, 0, NULL, '2024-06-01 02:00:00.000000', '2024-06-01 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(35, 0, NULL, NULL, NULL, NULL, NULL, NULL, b'0', 0, 'PENDING', 102),
(36, 0, NULL, NULL, NULL, NULL, NULL, NULL, b'0', 0, 'PENDING', 52),
(37, 0, NULL, NULL, NULL, NULL, NULL, NULL, b'0', 0, 'PENDING', 52),
(38, 0, 11, NULL, NULL, NULL, NULL, NULL, b'0', 0, 'PENDING', 52),
(39, 0, 11, '2024-06-11 02:00:00.000000', '2024-07-05 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 52),
(40, 0, 11, '2024-06-27 02:00:00.000000', '2024-06-27 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 52),
(41, 0, 11, '2024-06-27 02:00:00.000000', '2024-06-27 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 52),
(42, 0, 12, NULL, NULL, NULL, NULL, NULL, b'0', 0, 'REFUSED', 52),
(43, 0, 12, '2024-06-20 02:00:00.000000', '2024-06-13 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'REFUSED', 52),
(44, 0, 11, '2024-06-27 02:00:00.000000', '2024-07-03 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 52),
(45, 0, 11, '2025-07-17 02:00:00.000000', '2025-07-24 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 2),
(46, 0, 11, '2025-07-24 02:00:00.000000', '2025-07-31 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 2),
(47, 0, 11, '2025-07-17 02:00:00.000000', '2025-07-24 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 2),
(48, 0, 11, '2025-07-24 02:00:00.000000', '2025-07-31 02:00:00.000000', NULL, NULL, NULL, b'0', 0, 'PENDING', 204);

-- --------------------------------------------------------

--
-- Structure de la table `reservation_services`
--

CREATE TABLE `reservation_services` (
  `reservation_id` bigint(20) NOT NULL,
  `services` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservation_services`
--

INSERT INTO `reservation_services` (`reservation_id`, `services`) VALUES
(14, 6),
(15, 6),
(15, 7),
(16, 6),
(16, 7),
(20, 7),
(21, 17),
(23, 6),
(23, 7),
(25, 11),
(39, 12),
(43, 6),
(43, 7),
(44, 11),
(44, 12),
(45, 10),
(46, 10),
(47, 10),
(48, 10);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_TOURIST');

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `attraction_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id`, `content`, `logo`, `name`, `price`, `attraction_id`) VALUES
(6, 'service à la demande', 'breakfast331958425.png', 'breakfast', 45, 12),
(7, 'service à la demande', 'breakfast323736536.png', 'breakfast', 45, 12),
(8, 'service à la demande', 'breakfast88781965.png', 'breakfast', 45, 12),
(9, 'service à la demande', 'breakfast230373408.png', 'breakfast', 45, 12),
(10, 'service à la demande', 'breakfast244480143.png', 'breakfast', 45, 11),
(11, 'service à la demande', 'logoParking596732061.png', 'breakfast', 45, 11),
(12, 'service à la demande', 'logoParking705693114.png', 'breakfast', 45, 11),
(13, 'service à la demande', 'logoParking368790915.png', 'parking', 45, 12),
(14, 'service à la demande', 'logoParking590879639.png', 'parking', 45, 12),
(15, 'service à la demande', 'logoParking773362846.png', 'parking', 45, 12),
(16, 'service à la demande', 'logoParking236536277.png', 'parking', 45, 12),
(17, 'service à la demande', 'logoParking295252399.png', 'parking', 45, 12),
(18, 'service à la demande', 'logoParking643839521.png', 'parking', 45, 12);

-- --------------------------------------------------------

--
-- Structure de la table `services_photos`
--

CREATE TABLE `services_photos` (
  `services_id` bigint(20) NOT NULL,
  `photos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `services_photos`
--

INSERT INTO `services_photos` (`services_id`, `photos`) VALUES
(6, 'BreakfastAnantara1418100636.jpg'),
(6, 'BreakfastAnantara2852741622.webp'),
(7, 'BreakfastAnantara182146851.jpg'),
(7, 'BreakfastAnantara2880865637.webp'),
(8, 'BreakfastAnantara1843077077.jpg'),
(8, 'BreakfastAnantara2615557889.webp'),
(9, 'BreakfastAnantara1845089485.jpg'),
(9, 'BreakfastAnantara2511353022.webp'),
(10, 'breakfastAnantara258273957.jpg'),
(10, 'BreakfastAnantara1892322977.jpg'),
(10, 'BreakfastAnantara2827145248.webp'),
(11, 'breakfastAnantara216383461.jpg'),
(11, 'BreakfastAnantara1419246323.jpg'),
(11, 'BreakfastAnantara2644226272.webp'),
(12, 'breakfastAnantara406653645.jpg'),
(12, 'BreakfastAnantara1502738131.jpg'),
(12, 'BreakfastAnantara2724299777.webp'),
(13, 'AnantaraSwimming2912720886.jpg'),
(13, 'ElmouradiSwimming811820490.jpg'),
(14, 'AnantaraSwimming2247226554.jpg'),
(14, 'ElmouradiSwimming656568312.jpg'),
(15, 'AnantaraSwimming2701080273.jpg'),
(15, 'ElmouradiSwimming674243443.jpg'),
(16, 'AnantaraSwimming2364443884.jpg'),
(16, 'ElmouradiSwimming995834047.jpg'),
(17, 'BreakfastAnantara1550463132.jpg'),
(18, 'AnantaraSwimming2192581252.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `tourists`
--

CREATE TABLE `tourists` (
  `id` bigint(20) NOT NULL,
  `confirm` bit(1) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `password` varchar(120) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `addresse` varchar(255) DEFAULT NULL,
  `passport_num` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tourists`
--

INSERT INTO `tourists` (`id`, `confirm`, `email`, `image`, `is_active`, `password`, `password_reset_token`, `phone_number`, `username`, `verification_code`, `addresse`, `passport_num`) VALUES
(2, b'1', 'jana@gmail.com', 'Anantara36782.jpg', b'0', '$2a$10$cvQ92Y5q9yrgq5eiXM1DIOI.p8suk6MxwbmnBdvjm29ruzn5XhgK2', NULL, '98777444', 'jiji', NULL, 'tunis', 0),
(102, b'1', 'isra@gmail.com', '236.jpg', b'0', '$2a$10$6QIrZbtrXAKQctDq7q4tOuHLHjJ4Vlu/pAVkDIlFgifP0cJIt7VlC', NULL, '98777555', 'isra', NULL, 'Istamboule', 0),
(202, b'0', 'aya@gmail.com', 'téléchargement (1)7624843236351.jpg', b'0', '$2a$10$IAuBKuskuyGltix5upKS5./N0buv/EtliT93QobRkR//AmLFibykC', NULL, '56897412', 'aya', NULL, 'tunis', 0),
(204, b'1', 'Aaya@gmail.com', 'ali-and-his-camel-ali-tunisian sahara20918121.jpg', b'0', '$2a$10$Q7Dj643NmdnwBd1gxNvSkOk3roCz0PiE2izgCMhzO46xAFmpzdDhC', NULL, '55555555', 'Aaya', NULL, 'tunis', 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `confirm` bit(1) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `password` varchar(120) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 2),
(102, 2),
(152, 1),
(202, 2),
(204, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `attractions`
--
ALTER TABLE `attractions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdl5kx08bg83po6wj81u3viqk4` (`cat_id`);

--
-- Index pour la table `attraction_photos`
--
ALTER TABLE `attraction_photos`
  ADD KEY `FKn1eh2mgsb4e5uyveixuxtyvlg` (`attraction_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hibernate_sequences`
--
ALTER TABLE `hibernate_sequences`
  ADD PRIMARY KEY (`sequence_name`);

--
-- Index pour la table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_or156wbneyk8noo4jstv55ii3` (`token`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation_services`
--
ALTER TABLE `reservation_services`
  ADD KEY `FKt6smgnpps5u0771p2qyefc25m` (`reservation_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlm6j5ujmc13qr7w8jluj156aj` (`attraction_id`);

--
-- Index pour la table `services_photos`
--
ALTER TABLE `services_photos`
  ADD KEY `FK5rau7seogbvsfqx9bb5jxks6k` (`services_id`);

--
-- Index pour la table `tourists`
--
ALTER TABLE `tourists`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Index pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `attractions`
--
ALTER TABLE `attractions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `attractions`
--
ALTER TABLE `attractions`
  ADD CONSTRAINT `FKdl5kx08bg83po6wj81u3viqk4` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `attraction_photos`
--
ALTER TABLE `attraction_photos`
  ADD CONSTRAINT `FKn1eh2mgsb4e5uyveixuxtyvlg` FOREIGN KEY (`attraction_id`) REFERENCES `attractions` (`id`);

--
-- Contraintes pour la table `reservation_services`
--
ALTER TABLE `reservation_services`
  ADD CONSTRAINT `FKt6smgnpps5u0771p2qyefc25m` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`);

--
-- Contraintes pour la table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `FKlm6j5ujmc13qr7w8jluj156aj` FOREIGN KEY (`attraction_id`) REFERENCES `attractions` (`id`);

--
-- Contraintes pour la table `services_photos`
--
ALTER TABLE `services_photos`
  ADD CONSTRAINT `FK5rau7seogbvsfqx9bb5jxks6k` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`);

--
-- Contraintes pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
