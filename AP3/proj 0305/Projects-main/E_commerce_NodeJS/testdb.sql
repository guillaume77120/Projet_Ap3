-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : jeu. 05 mai 2022 à 10:28
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `testdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `fonds_photos`
--

DROP TABLE IF EXISTS `fonds_photos`;
CREATE TABLE IF NOT EXISTS `fonds_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(50) NOT NULL,
  `libel` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

DROP TABLE IF EXISTS `inscription`;
CREATE TABLE IF NOT EXISTS `inscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(30) NOT NULL,
  `Prenom` varchar(30) NOT NULL,
  `Age` int(30) NOT NULL,
  `Password` varchar(40) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `adresse` varchar(60) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `inscription`
--

INSERT INTO `inscription` (`id`, `Nom`, `Prenom`, `Age`, `Password`, `Email`, `adresse`, `Date`) VALUES
(5, 'piedade', 'alexandre', 24, 'alexandre', 'alexandredasilva.piedade@gmail.com', '6 rue andré et gaston solvet à jouarre', '2022-05-05');

-- --------------------------------------------------------

--
-- Structure de la table `photosproduits`
--

DROP TABLE IF EXISTS `photosproduits`;
CREATE TABLE IF NOT EXISTS `photosproduits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `LienPhoto1` varchar(255) DEFAULT NULL,
  `LienPhoto2` varchar(255) DEFAULT NULL,
  `LienPhoto3` varchar(255) DEFAULT NULL,
  `LienPhoto4` varchar(255) DEFAULT NULL,
  `LienPhoto5` varchar(255) DEFAULT NULL,
  `LienPhoto6` varchar(255) DEFAULT NULL,
  `LienPhoto7` varchar(255) DEFAULT NULL,
  `LienPhoto8` varchar(255) DEFAULT NULL,
  `id_FondImg` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `photosproduits`
--

INSERT INTO `photosproduits` (`id`, `LienPhoto1`, `LienPhoto2`, `LienPhoto3`, `LienPhoto4`, `LienPhoto5`, `LienPhoto6`, `LienPhoto7`, `LienPhoto8`, `id_FondImg`) VALUES
(8, 'produits/product-1.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
(9, 'produits/product-9.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
(10, 'produits/product-10.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
(11, 'produits/product-11.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
(12, 'produits/product-12.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
(13, 'produits/product-13.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
(14, 'produits/product-14.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `id_sous_categ` varchar(255) DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `nbAchat` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `id_photo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `sous_categorie`
--

DROP TABLE IF EXISTS `sous_categorie`;
CREATE TABLE IF NOT EXISTS `sous_categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
