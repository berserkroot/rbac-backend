-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2026 a las 19:08:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_rbac`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_settings`
--

CREATE TABLE `app_settings` (
  `id` int(11) NOT NULL,
  `key` varchar(100) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `app_settings`
--

INSERT INTO `app_settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'app_name', 'Sistema RBAC ', '2026-03-24 12:30:33', '2026-04-02 16:30:48'),
(2, 'logo_url', '/uploads/app/app-logo-1774373229793-116027263.png', '2026-03-24 12:30:33', '2026-04-02 16:30:48'),
(3, 'favicon_url', '/uploads/app/app-favicon-1774373229806-396157086.ico', '2026-03-24 12:30:33', '2026-04-02 16:30:48'),
(4, 'footer_text', '© 2026 Sistema RBAC. Todos los derechos reservados.', '2026-03-24 12:30:33', '2026-04-02 16:30:48'),
(88, 'password_min_length', '9', '2026-03-25 20:53:38', '2026-04-02 16:33:56'),
(89, 'password_require_uppercase', 'true', '2026-03-25 20:53:38', '2026-04-02 16:33:56'),
(90, 'password_require_number', 'true', '2026-03-25 20:53:38', '2026-04-02 16:33:56'),
(91, 'password_require_symbol', 'true', '2026-03-25 20:53:38', '2026-04-02 16:33:57'),
(92, 'password_expiry_days', '90', '2026-03-25 20:53:38', '2026-04-02 16:33:57'),
(93, 'password_history_limit', '20', '2026-03-25 20:53:38', '2026-04-02 16:33:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login_histories`
--

CREATE TABLE `login_histories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `user_agent` text NOT NULL,
  `success` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login_histories`
--

INSERT INTO `login_histories` (`id`, `user_id`, `ip_address`, `user_agent`, `success`, `created_at`) VALUES
(1, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-25 22:01:09'),
(2, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 19:53:09'),
(3, 5, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 19:58:43'),
(4, 5, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 0, '2026-03-26 19:59:12'),
(5, 5, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 0, '2026-03-26 19:59:14'),
(6, 5, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 0, '2026-03-26 19:59:16'),
(7, 5, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 0, '2026-03-26 19:59:16'),
(8, 5, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 0, '2026-03-26 19:59:17'),
(9, 5, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 0, '2026-03-26 19:59:31'),
(10, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 20:00:10'),
(11, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 20:27:47'),
(12, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 20:28:04'),
(13, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 20:28:08'),
(14, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 20:28:11'),
(15, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 20:28:14'),
(16, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 20:28:16'),
(17, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 21:04:44'),
(18, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 21:05:26'),
(19, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 21:05:29'),
(20, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 21:05:31'),
(21, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 21:05:33'),
(22, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 21:05:35'),
(23, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 21:55:39'),
(24, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 22:46:51'),
(25, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 22:47:16'),
(27, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 22:59:27'),
(28, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-26 22:59:55'),
(29, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-27 18:10:35'),
(30, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-27 18:10:59'),
(31, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-27 19:25:16'),
(32, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-27 19:45:13'),
(33, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-27 19:45:26'),
(34, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 1, '2026-03-27 20:20:00'),
(35, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-03-27 21:17:54'),
(36, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 14:23:51'),
(37, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 14:29:14'),
(38, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 14:37:02'),
(39, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 14:42:02'),
(40, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 14:50:17'),
(41, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:00:26'),
(42, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:00:33'),
(43, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:00:46'),
(44, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:00:54'),
(45, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:01:05'),
(46, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:01:27'),
(47, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:01:31'),
(48, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:01:38'),
(49, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:01:47'),
(50, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:01:53'),
(51, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:22:56'),
(52, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:46:11'),
(53, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 15:46:20'),
(54, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 16:23:17'),
(55, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 16:23:52'),
(56, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 16:26:52'),
(57, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 16:41:49'),
(58, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 16:42:15'),
(59, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 16:51:35'),
(60, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 16:52:02'),
(61, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 17:02:13'),
(62, 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', 1, '2026-04-02 17:06:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login_history`
--

CREATE TABLE `login_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `user_agent` text NOT NULL,
  `success` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` enum('info','warning','error') NOT NULL DEFAULT 'info',
  `link` varchar(255) DEFAULT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `type`, `link`, `read`, `created_at`, `updated_at`) VALUES
(1, 5, 'Bienvenido al sistema', 'Hola Nombre, tu cuenta ha sido creada exitosamente.', 'info', '/profile', 1, '2026-03-25 15:18:45', '2026-03-25 15:46:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id`, `nombre`, `codigo`, `created_at`, `updated_at`) VALUES
(1, 'Afganistán', 'AF', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(2, 'Albania', 'AL', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(3, 'Alemania', 'DE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(4, 'Andorra', 'AD', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(5, 'Angola', 'AO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(6, 'Antigua y Barbuda', 'AG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(7, 'Arabia Saudita', 'SA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(8, 'Argelia', 'DZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(9, 'Argentina', 'AR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(10, 'Armenia', 'AM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(11, 'Australia', 'AU', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(12, 'Austria', 'AT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(13, 'Azerbaiyán', 'AZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(14, 'Bahamas', 'BS', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(15, 'Bangladés', 'BD', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(16, 'Barbados', 'BB', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(17, 'Baréin', 'BH', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(18, 'Bélgica', 'BE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(19, 'Belice', 'BZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(20, 'Benín', 'BJ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(21, 'Bielorrusia', 'BY', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(22, 'Birmania', 'MM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(23, 'Bolivia', 'BO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(24, 'Bosnia y Herzegovina', 'BA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(25, 'Botsuana', 'BW', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(26, 'Brasil', 'BR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(27, 'Brunéi', 'BN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(28, 'Bulgaria', 'BG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(29, 'Burkina Faso', 'BF', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(30, 'Burundi', 'BI', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(31, 'Bután', 'BT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(32, 'Cabo Verde', 'CV', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(33, 'Camboya', 'KH', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(34, 'Camerún', 'CM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(35, 'Canadá', 'CA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(36, 'Catar', 'QA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(37, 'Chad', 'TD', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(38, 'Chile', 'CL', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(39, 'China', 'CN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(40, 'Chipre', 'CY', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(41, 'Ciudad del Vaticano', 'VA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(42, 'Colombia', 'CO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(43, 'Comoras', 'KM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(44, 'Corea del Norte', 'KP', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(45, 'Corea del Sur', 'KR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(46, 'Costa de Marfil', 'CI', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(47, 'Costa Rica', 'CR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(48, 'Croacia', 'HR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(49, 'Cuba', 'CU', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(50, 'Dinamarca', 'DK', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(51, 'Dominica', 'DM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(52, 'Ecuador', 'EC', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(53, 'Egipto', 'EG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(54, 'El Salvador', 'SV', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(55, 'Emiratos Árabes Unidos', 'AE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(56, 'Eritrea', 'ER', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(57, 'Eslovaquia', 'SK', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(58, 'Eslovenia', 'SI', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(59, 'España', 'ES', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(60, 'Estados Unidos', 'US', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(61, 'Estonia', 'EE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(62, 'Etiopía', 'ET', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(63, 'Filipinas', 'PH', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(64, 'Finlandia', 'FI', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(65, 'Fiyi', 'FJ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(66, 'Francia', 'FR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(67, 'Gabón', 'GA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(68, 'Gambia', 'GM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(69, 'Georgia', 'GE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(70, 'Ghana', 'GH', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(71, 'Granada', 'GD', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(72, 'Grecia', 'GR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(73, 'Guatemala', 'GT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(74, 'Guyana', 'GY', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(75, 'Guinea', 'GN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(76, 'Guinea Ecuatorial', 'GQ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(77, 'Guinea-Bisáu', 'GW', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(78, 'Haití', 'HT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(79, 'Honduras', 'HN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(80, 'Hungría', 'HU', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(81, 'India', 'IN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(82, 'Indonesia', 'ID', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(83, 'Irak', 'IQ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(84, 'Irán', 'IR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(85, 'Irlanda', 'IE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(86, 'Islandia', 'IS', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(87, 'Islas Marshall', 'MH', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(88, 'Islas Salomón', 'SB', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(89, 'Israel', 'IL', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(90, 'Italia', 'IT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(91, 'Jamaica', 'JM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(92, 'Japón', 'JP', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(93, 'Jordania', 'JO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(94, 'Kazajistán', 'KZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(95, 'Kenia', 'KE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(96, 'Kirguistán', 'KG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(97, 'Kiribati', 'KI', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(98, 'Kuwait', 'KW', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(99, 'Laos', 'LA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(100, 'Lesoto', 'LS', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(101, 'Letonia', 'LV', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(102, 'Líbano', 'LB', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(103, 'Liberia', 'LR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(104, 'Libia', 'LY', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(105, 'Liechtenstein', 'LI', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(106, 'Lituania', 'LT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(107, 'Luxemburgo', 'LU', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(108, 'Madagascar', 'MG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(109, 'Malasia', 'MY', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(110, 'Malaui', 'MW', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(111, 'Maldivas', 'MV', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(112, 'Malí', 'ML', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(113, 'Malta', 'MT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(114, 'Marruecos', 'MA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(115, 'Mauricio', 'MU', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(116, 'Mauritania', 'MR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(117, 'México', 'MX', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(118, 'Micronesia', 'FM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(119, 'Moldavia', 'MD', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(120, 'Mónaco', 'MC', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(121, 'Mongolia', 'MN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(122, 'Montenegro', 'ME', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(123, 'Mozambique', 'MZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(124, 'Namibia', 'NA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(125, 'Nauru', 'NR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(126, 'Nepal', 'NP', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(127, 'Nicaragua', 'NI', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(128, 'Níger', 'NE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(129, 'Nigeria', 'NG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(130, 'Noruega', 'NO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(131, 'Nueva Zelanda', 'NZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(132, 'Omán', 'OM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(133, 'Países Bajos', 'NL', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(134, 'Pakistán', 'PK', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(135, 'Palaos', 'PW', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(136, 'Panamá', 'PA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(137, 'Papúa Nueva Guinea', 'PG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(138, 'Paraguay', 'PY', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(139, 'Perú', 'PE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(140, 'Polonia', 'PL', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(141, 'Portugal', 'PT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(142, 'Reino Unido', 'GB', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(143, 'República Centroafricana', 'CF', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(144, 'República Checa', 'CZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(145, 'República de Macedonia del Norte', 'MK', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(146, 'República del Congo', 'CG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(147, 'República Democrática del Congo', 'CD', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(148, 'República Dominicana', 'DO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(149, 'República Sudafricana', 'ZA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(150, 'Ruanda', 'RW', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(151, 'Rumanía', 'RO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(152, 'Rusia', 'RU', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(153, 'Samoa', 'WS', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(154, 'San Cristóbal y Nieves', 'KN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(155, 'San Marino', 'SM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(156, 'San Vicente y las Granadinas', 'VC', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(157, 'Santa Lucía', 'LC', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(158, 'Santo Tomé y Príncipe', 'ST', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(159, 'Senegal', 'SN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(160, 'Serbia', 'RS', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(161, 'Seychelles', 'SC', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(162, 'Sierra Leona', 'SL', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(163, 'Singapur', 'SG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(164, 'Siria', 'SY', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(165, 'Somalia', 'SO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(166, 'Sri Lanka', 'LK', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(167, 'Suazilandia', 'SZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(168, 'Sudán', 'SD', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(169, 'Sudán del Sur', 'SS', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(170, 'Suecia', 'SE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(171, 'Suiza', 'CH', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(172, 'Surinam', 'SR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(173, 'Tailandia', 'TH', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(174, 'Tanzania', 'TZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(175, 'Tayikistán', 'TJ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(176, 'Timor Oriental', 'TL', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(177, 'Togo', 'TG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(178, 'Tonga', 'TO', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(179, 'Trinidad y Tobago', 'TT', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(180, 'Túnez', 'TN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(181, 'Turkmenistán', 'TM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(182, 'Turquía', 'TR', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(183, 'Tuvalu', 'TV', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(184, 'Ucrania', 'UA', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(185, 'Uganda', 'UG', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(186, 'Uruguay', 'UY', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(187, 'Uzbekistán', 'UZ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(188, 'Vanuatu', 'VU', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(189, 'Venezuela', 'VE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(190, 'Vietnam', 'VN', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(191, 'Yemen', 'YE', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(192, 'Yibuti', 'DJ', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(193, 'Zambia', 'ZM', '2026-03-23 16:23:55', '2026-03-23 16:23:55'),
(194, 'Zimbabue', 'ZW', '2026-03-23 16:23:55', '2026-03-23 16:23:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_histories`
--

CREATE TABLE `password_histories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `password_histories`
--

INSERT INTO `password_histories` (`id`, `user_id`, `password_hash`, `created_at`) VALUES
(1, 1, 'Worksbin@ry27', '2026-03-25 20:54:09'),
(2, 1, 'Worksbin@ry27', '2026-03-25 21:38:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_policies`
--

CREATE TABLE `password_policies` (
  `id` int(11) NOT NULL,
  `min_length` int(11) NOT NULL DEFAULT 8,
  `require_uppercase` tinyint(1) DEFAULT 1,
  `require_lowercase` tinyint(1) DEFAULT 1,
  `require_number` tinyint(1) DEFAULT 1,
  `require_symbol` tinyint(1) DEFAULT 1,
  `expiration_days` int(11) NOT NULL DEFAULT 90,
  `password_history_count` int(11) NOT NULL DEFAULT 20,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `password_policies`
--

INSERT INTO `password_policies` (`id`, `min_length`, `require_uppercase`, `require_lowercase`, `require_number`, `require_symbol`, `expiration_days`, `password_history_count`, `updated_at`) VALUES
(1, 8, 1, 1, 1, 1, 90, 20, '2026-03-25 16:28:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `resource` varchar(50) NOT NULL,
  `action` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `resource`, `action`, `description`, `created_at`, `updated_at`) VALUES
(1, 'users:create', 'users', 'create', 'Crear usuarios', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(2, 'users:read', 'users', 'read', 'Ver usuarios', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(3, 'users:update', 'users', 'update', 'Actualizar usuarios', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(4, 'users:delete', 'users', 'delete', 'Eliminar usuarios', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(5, 'roles:create', 'roles', 'create', 'Crear roles', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(6, 'roles:read', 'roles', 'read', 'Ver roles', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(7, 'roles:update', 'roles', 'update', 'Actualizar roles', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(8, 'roles:delete', 'roles', 'delete', 'Eliminar roles', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(9, 'permissions:create', 'permissions', 'create', 'Crear permisos', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(10, 'permissions:read', 'permissions', 'read', 'Ver permisos', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(11, 'permissions:update', 'permissions', 'update', 'Actualizar permisos', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(12, 'permissions:delete', 'permissions', 'delete', 'Eliminar permisos', '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(13, 'users:manage', 'users', 'manage', 'Gestión completa de usuarios (crear, leer, actualizar, eliminar)', '2026-03-20 13:16:00', '2026-03-20 13:16:00'),
(14, 'roles:manage', 'roles', 'manage', 'Gestión completa de roles (crear, leer, actualizar, eliminar)', '2026-03-20 13:16:00', '2026-03-20 13:16:00'),
(15, 'permissions:manage', 'permissions', 'manage', 'Gestión completa de permisos (crear, leer, actualizar, eliminar)', '2026-03-20 13:16:00', '2026-03-20 13:16:00'),
(16, 'dashboard:create', 'dashboard', 'create', 'Crear dashboards', '2026-03-24 11:09:55', '2026-03-24 11:09:55'),
(17, 'dashboard:read', 'dashboard', 'read', 'Ver dashboards', '2026-03-24 11:09:55', '2026-03-24 11:09:55'),
(18, 'dashboard:update', 'dashboard', 'update', 'Actualizar dashboards', '2026-03-24 11:09:55', '2026-03-24 11:09:55'),
(19, 'dashboard:delete', 'dashboard', 'delete', 'Eliminar dashboards', '2026-03-24 11:09:55', '2026-03-24 11:09:55'),
(20, 'dashboard:manage', 'dashboard', 'manage', 'Gestión completa de dashboards (crear, leer, actualizar, eliminar)', '2026-03-24 11:09:55', '2026-03-24 11:09:55'),
(21, 'settings:read', 'settings', 'read', 'Leer configuración de la aplicación', '2026-03-24 12:30:33', '2026-03-24 12:30:33'),
(22, 'settings:update', 'settings', 'update', 'Actualizar configuración de la aplicación', '2026-03-24 12:30:33', '2026-03-24 12:30:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolepermissions`
--

CREATE TABLE `rolepermissions` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rolepermissions`
--

INSERT INTO `rolepermissions` (`id`, `created_at`, `updated_at`, `role_id`, `permission_id`) VALUES
(1, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 1),
(2, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 2),
(3, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 3),
(4, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 4),
(5, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 5),
(6, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 6),
(7, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 7),
(8, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 8),
(9, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 9),
(10, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 10),
(11, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 11),
(12, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 12),
(13, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 2, 1),
(14, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 2, 2),
(15, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 2, 3),
(16, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 2, 4),
(17, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 2, 5),
(18, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 2, 6),
(19, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 2, 7),
(20, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 2, 8),
(21, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 3, 1),
(22, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 3, 2),
(23, '2026-03-19 18:27:22', '2026-03-19 18:27:22', 3, 3),
(24, '2026-03-20 13:16:00', '2026-03-20 13:16:00', 1, 15),
(25, '2026-03-20 13:16:00', '2026-03-20 13:16:00', 1, 14),
(26, '2026-03-20 13:16:00', '2026-03-20 13:16:00', 1, 13),
(27, '2026-03-20 13:16:00', '2026-03-20 13:16:00', 2, 14),
(28, '2026-03-20 13:16:00', '2026-03-20 13:16:00', 2, 13),
(30, '2026-03-20 13:16:00', '2026-03-20 13:16:00', 3, 13),
(31, '2026-03-24 11:14:06', '2026-03-24 11:14:06', 1, 16),
(32, '2026-03-24 11:14:06', '2026-03-24 11:14:06', 1, 17),
(33, '2026-03-24 11:14:06', '2026-03-24 11:14:06', 1, 18),
(34, '2026-03-24 11:14:06', '2026-03-24 11:14:06', 1, 19),
(35, '2026-03-24 11:14:06', '2026-03-24 11:14:06', 1, 20),
(36, '2026-03-24 11:14:06', '2026-03-24 11:14:06', 2, 20),
(37, '2026-03-24 11:14:06', '2026-03-24 11:14:06', 3, 17),
(38, '2026-03-24 11:14:06', '2026-03-24 11:14:06', 4, 17),
(39, '2026-03-24 12:30:33', '2026-03-24 12:30:33', 1, 21),
(40, '2026-03-24 12:30:33', '2026-03-24 12:30:33', 1, 22),
(41, '2026-03-24 18:16:01', '2026-03-24 18:16:01', 3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `level`, `created_at`, `updated_at`) VALUES
(1, 'root', 'Super administrador', 4, '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(2, 'administrador', 'Administrador del sistema', 3, '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(3, 'gestor', 'Gestor de usuarios', 2, '2026-03-19 18:27:22', '2026-03-19 18:27:22'),
(4, 'usuario', 'Usuario estándar', 1, '2026-03-19 18:27:22', '2026-03-19 18:27:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userroles`
--

CREATE TABLE `userroles` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `userroles`
--

INSERT INTO `userroles` (`created_at`, `updated_at`, `user_id`, `role_id`) VALUES
('2026-03-19 18:27:22', '2026-03-19 18:27:22', 1, 1),
('2026-03-20 19:47:24', '2026-03-20 19:47:24', 2, 2),
('2026-03-20 19:48:28', '2026-03-20 19:48:28', 3, 3),
('2026-03-20 19:49:41', '2026-03-20 19:49:41', 4, 4),
('2026-03-25 15:18:45', '2026-03-25 15:18:45', 5, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `nombres` varchar(100) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `document_type` varchar(20) DEFAULT NULL,
  `document_number` varchar(50) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `entre` varchar(100) DEFAULT NULL,
  `avenida` varchar(100) DEFAULT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `id_pais` int(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `two_factor_enabled` tinyint(1) DEFAULT 0,
  `two_factor_secret` varchar(255) DEFAULT NULL,
  `recovery_key_hash` varchar(255) DEFAULT NULL,
  `recovery_key_created_at` datetime DEFAULT NULL,
  `failed_login_attempts` int(11) NOT NULL DEFAULT 0,
  `locked_until` datetime DEFAULT NULL,
  `password_changed_at` datetime DEFAULT current_timestamp(),
  `token_version` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `nombres`, `apellidos`, `foto`, `document_type`, `document_number`, `calle`, `numero`, `entre`, `avenida`, `localidad`, `municipio`, `provincia`, `id_pais`, `email`, `password`, `is_active`, `last_login`, `created_at`, `updated_at`, `two_factor_enabled`, `two_factor_secret`, `recovery_key_hash`, `recovery_key_created_at`, `failed_login_attempts`, `locked_until`, `password_changed_at`, `token_version`) VALUES
(1, 'Rafael', 'Rafael Jesús', 'Quetglas Pérez', '/uploads/profiles/profile-1774461927757-89717338.png', 'CI', '96082803066', '230', '8907', '89 y 91', '91', 'Bello 26', 'La Lisa ', 'La Habana ', 49, 'worksbinary27@gmail.com', '$2b$10$UF6oDBtC0ZpuB4d6OQS6v.IUXNBrS68SGPE38/J3Z9SkLexHkGVHK', 1, '2026-04-02 17:06:53', '2026-03-19 18:27:22', '2026-04-02 17:06:53', 0, 'GNTHMLTSPBBHSNSQFBSXM6LGHIZC6SKY', '$2b$10$rM5kgoWjdHrf5OOYbZZLS.Ryy2tvnK6S5pZEmKZ3DGTPyzwrA4pFm', '2026-03-26 19:57:56', 0, NULL, '2026-03-25 21:38:54', 6),
(2, 'Administardor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin@sistema.com', '$2b$10$bSVOd5ojmO4i4wmDpr03nO9CF5Gv56fjKWXHiD50jnNa7cUH1/P7G', 1, '2026-03-25 17:35:18', '2026-03-20 19:47:24', '2026-03-25 17:35:18', 0, 'NNIHENZVENBXELSGPBACQYTLLBBHMPCG', NULL, NULL, 0, NULL, '2026-03-25 16:28:37', 0),
(3, 'Gestor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'gestor@sistema.com', '$2b$10$FwbcEWoItXmn4Qirkw.9g.HXQhkXv1w.QWAI.LIseB2scAtTUwYKW', 1, '2026-03-25 17:34:47', '2026-03-20 19:48:28', '2026-03-25 17:34:47', 0, NULL, NULL, NULL, 0, NULL, '2026-03-25 16:28:37', 0),
(4, 'Usuario', 'Usuario1', '', NULL, '', '', '', '', '', '', '', '', '', 19, 'usuario@sistema.com', '$2b$10$I5GXQ1eFLg9hJDYhZ8z2auY0qfV72rlDhZ3saiEtiytne.NFBieSC', 1, '2026-03-24 17:56:27', '2026-03-20 19:49:41', '2026-03-24 17:56:27', 0, NULL, NULL, NULL, 0, NULL, '2026-03-25 16:28:37', 0),
(5, 'Nombre', 'Nombre', 'Nombre', NULL, 'CI', '9608280305', '410', '6978', '', '', '', '', '', 18, 'nombre@sistema.com', '$2b$10$SSp2jeRblG768w92cycb/e9dPoZ58iMb1xDHuqKNUZh4hkWhAmXji', 1, '2026-03-26 19:58:43', '2026-03-25 15:18:45', '2026-03-26 19:59:17', 0, 'NNBD4VBGIZDSYSJMMFIU65CJKB4UC2JM', NULL, NULL, 5, '2026-03-26 20:19:17', '2026-03-25 16:28:37', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `app_settings`
--
ALTER TABLE `app_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indices de la tabla `login_histories`
--
ALTER TABLE `login_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `login_history`
--
ALTER TABLE `login_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `created_at` (`created_at`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_histories`
--
ALTER TABLE `password_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `password_policies`
--
ALTER TABLE `password_policies`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `rolepermissions`
--
ALTER TABLE `rolepermissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `RolePermissions_permissionId_roleId_unique` (`role_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_users_pais` (`id_pais`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `app_settings`
--
ALTER TABLE `app_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT de la tabla `login_histories`
--
ALTER TABLE `login_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `login_history`
--
ALTER TABLE `login_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT de la tabla `password_histories`
--
ALTER TABLE `password_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `password_policies`
--
ALTER TABLE `password_policies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `rolepermissions`
--
ALTER TABLE `rolepermissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `login_histories`
--
ALTER TABLE `login_histories`
  ADD CONSTRAINT `login_histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `login_history`
--
ALTER TABLE `login_history`
  ADD CONSTRAINT `fk_login_history_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `password_histories`
--
ALTER TABLE `password_histories`
  ADD CONSTRAINT `password_histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `rolepermissions`
--
ALTER TABLE `rolepermissions`
  ADD CONSTRAINT `rolepermissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rolepermissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `userroles`
--
ALTER TABLE `userroles`
  ADD CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_pais` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
