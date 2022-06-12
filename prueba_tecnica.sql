-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2022 a las 02:45:54
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_tecnica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `ID` int(11) NOT NULL,
  `PRIMER_NOMBRE` varchar(80) NOT NULL,
  `PRIMER_APELLIDO` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`ID`, `PRIMER_NOMBRE`, `PRIMER_APELLIDO`) VALUES
(45, 'PEPITO', 'PEREZ'),
(46, 'PEPITO', 'GONZALEZ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas_proyecto`
--

CREATE TABLE `horas_proyecto` (
  `ID` int(11) NOT NULL,
  `EMPLEADO_ID` int(11) NOT NULL,
  `PROYECTO_ID` int(11) NOT NULL,
  `FECHA` datetime NOT NULL,
  `HORAS_TRABAJADAS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horas_proyecto`
--

INSERT INTO `horas_proyecto` (`ID`, `EMPLEADO_ID`, `PROYECTO_ID`, `FECHA`, `HORAS_TRABAJADAS`) VALUES
(12, 45, 12, '2018-06-11 17:14:00', 8),
(13, 46, 12, '2022-05-12 16:13:00', 12),
(14, 45, 13, '2022-06-08 14:12:00', 10),
(15, 46, 13, '2022-06-05 14:12:00', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `ID` int(11) NOT NULL,
  `NOMBRE_PROYECTO` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`ID`, `NOMBRE_PROYECTO`) VALUES
(12, 'IA PARA IDENTIFICACION DE VISUAL DE ROBOS'),
(13, 'SISTEMADE CONTROL DERIEGO DEPARTAMENTAL');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `horas_proyecto`
--
ALTER TABLE `horas_proyecto`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `horas_proyecto_ibfk_3` (`EMPLEADO_ID`),
  ADD KEY `horas_proyecto_ibfk_4` (`PROYECTO_ID`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `horas_proyecto`
--
ALTER TABLE `horas_proyecto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `horas_proyecto`
--
ALTER TABLE `horas_proyecto`
  ADD CONSTRAINT `horas_proyecto_ibfk_3` FOREIGN KEY (`EMPLEADO_ID`) REFERENCES `empleado` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `horas_proyecto_ibfk_4` FOREIGN KEY (`PROYECTO_ID`) REFERENCES `proyecto` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
