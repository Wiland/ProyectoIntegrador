-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2017 a las 00:34:41
-- Versión del servidor: 10.1.26-MariaDB
-- Versión de PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `+vete`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesscode`
--

CREATE TABLE `accesscode` (
  `Randomid` varchar(15) NOT NULL,
  `Pet` int(11) NOT NULL,
  `Veterinary` int(11) NOT NULL,
  `ExpirationDateTime` datetime NOT NULL,
  `UsedDateTime` datetime NOT NULL,
  `RetirementDateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplication`
--

CREATE TABLE `aplication` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `BinaryDate` date NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Extension` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinion`
--

CREATE TABLE `opinion` (
  `Veterinary` int(11) NOT NULL,
  `User` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `OpinionText` text NOT NULL,
  `Qualification` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `passwordrecovery`
--

CREATE TABLE `passwordrecovery` (
  `Randomid` text NOT NULL,
  `User` int(10) NOT NULL,
  `ExpirationDateTime` date NOT NULL,
  `Used` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pet`
--

CREATE TABLE `pet` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Kind` varchar(50) NOT NULL,
  `Breed` varchar(50) NOT NULL,
  `Owner` int(11) NOT NULL,
  `BirthDate` date NOT NULL,
  `AcquisitionDate` date NOT NULL,
  `Photo` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recomendation`
--

CREATE TABLE `recomendation` (
  `id` int(11) NOT NULL,
  `Treatment` text NOT NULL,
  `Desription` text NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `App` int(10) NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedule`
--

CREATE TABLE `schedule` (
  `Id` int(11) NOT NULL,
  `Day` int(11) NOT NULL,
  `OpeningTime` time NOT NULL,
  `ClosingTime` time NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `treatment`
--

CREATE TABLE `treatment` (
  `Id` int(11) NOT NULL,
  `AccesCode` varchar(15) NOT NULL,
  `DateTime` datetime NOT NULL,
  `Name` int(11) NOT NULL,
  `Description` text NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `Nickname` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Role` int(10) NOT NULL,
  `Email` text NOT NULL,
  `Password` varchar(10) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Photo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinary`
--

CREATE TABLE `veterinary` (
  `id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Addres` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `shedule` int(11) NOT NULL,
  `GeographicLocation` varchar(200) NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesscode`
--
ALTER TABLE `accesscode`
  ADD PRIMARY KEY (`Randomid`),
  ADD KEY `Veterinary` (`Veterinary`),
  ADD KEY `Pet` (`Pet`);

--
-- Indices de la tabla `aplication`
--
ALTER TABLE `aplication`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `opinion`
--
ALTER TABLE `opinion`
  ADD PRIMARY KEY (`Veterinary`,`User`,`DateTime`),
  ADD KEY `User` (`User`);

--
-- Indices de la tabla `passwordrecovery`
--
ALTER TABLE `passwordrecovery`
  ADD KEY `User` (`User`);

--
-- Indices de la tabla `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Owner` (`Owner`),
  ADD KEY `Photo` (`Photo`);

--
-- Indices de la tabla `recomendation`
--
ALTER TABLE `recomendation`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `App` (`App`);

--
-- Indices de la tabla `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `AccesCode` (`AccesCode`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Nickname`),
  ADD KEY `Photo` (`Photo`),
  ADD KEY `Role` (`Role`);

--
-- Indices de la tabla `veterinary`
--
ALTER TABLE `veterinary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shedule` (`shedule`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accesscode`
--
ALTER TABLE `accesscode`
  ADD CONSTRAINT `accesscode_ibfk_1` FOREIGN KEY (`Veterinary`) REFERENCES `veterinary` (`id`),
  ADD CONSTRAINT `accesscode_ibfk_2` FOREIGN KEY (`Pet`) REFERENCES `pet` (`Id`),
  ADD CONSTRAINT `accesscode_ibfk_3` FOREIGN KEY (`Randomid`) REFERENCES `treatment` (`AccesCode`);

--
-- Filtros para la tabla `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `opinion_ibfk_1` FOREIGN KEY (`User`) REFERENCES `user` (`Nickname`);

--
-- Filtros para la tabla `pet`
--
ALTER TABLE `pet`
  ADD CONSTRAINT `pet_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `user` (`Nickname`),
  ADD CONSTRAINT `pet_ibfk_2` FOREIGN KEY (`Photo`) REFERENCES `files` (`id`);

--
-- Filtros para la tabla `role`
--
ALTER TABLE `role`
  ADD CONSTRAINT `role_ibfk_1` FOREIGN KEY (`App`) REFERENCES `aplication` (`Id`);

--
-- Filtros para la tabla `treatment`
--
ALTER TABLE `treatment`
  ADD CONSTRAINT `treatment_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `recomendation` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Photo`) REFERENCES `files` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`Nickname`) REFERENCES `passwordrecovery` (`User`),
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`Role`) REFERENCES `role` (`Id`);

--
-- Filtros para la tabla `veterinary`
--
ALTER TABLE `veterinary`
  ADD CONSTRAINT `veterinary_ibfk_1` FOREIGN KEY (`shedule`) REFERENCES `schedule` (`Id`),
  ADD CONSTRAINT `veterinary_ibfk_2` FOREIGN KEY (`id`) REFERENCES `opinion` (`Veterinary`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
