-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 25, 2014 at 02:05 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `writewell`
--

-- --------------------------------------------------------

--
-- Table structure for table `note_table`
--

CREATE TABLE IF NOT EXISTS `note_table` (
  `note_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `project_id` int(11) NOT NULL DEFAULT '0',
  `section_id` int(11) NOT NULL DEFAULT '0',
  `status` enum('Y','N') NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `note_table`
--

INSERT INTO `note_table` (`note_id`, `title`, `description`, `project_id`, `section_id`, `status`) VALUES
(1, 'Note 1', 'note 1', 1, 0, 'Y'),
(2, 'Note 2', 'note 2', 1, 0, 'Y'),
(3, 'ANote 3', 'note 3', 1, 0, 'Y'),
(4, 'Another Note 4', 'note 4', 1, 0, 'Y'),
(5, '1', 'Test Message', 2, 0, 'Y'),
(6, 'sgmail.com', '1215', 1, 0, 'Y'),
(7, 'sgmail.com', '1215', 1, 0, 'Y'),
(8, 'saitest', '123456', 1, 0, 'Y'),
(9, 'asdfaf', 'asdfdsfa', 1, 0, 'Y'),
(10, 'asdfaf', 'asdfdsfa', 1, 0, 'Y'),
(11, 'bkj', 'klhkjh', 1, 0, 'Y'),
(12, 'bkj', 'klhkjh', 1, 0, 'Y'),
(13, 'sadfdnafs', 'dsa,mnafs', 1, 0, 'Y'),
(14, 'sadfdnafs', 'dsa,mnafs', 1, 0, 'Y'),
(15, 'dsflakmfa', 'fdlkjfa', 1, 0, 'Y'),
(16, 'dsflakmfa', 'fdlkjfa', 1, 0, 'Y'),
(17, 'saitest', '123456', 1, 0, 'Y'),
(18, 'saitest', '123456', 1, 0, 'Y'),
(19, 'saitest', '123456', 1, 0, 'Y'),
(20, 'dsaf,madsnf', 'asdf,asnf', 1, 0, 'N'),
(21, 'dsaf,madsnf', 'asdf,asnf', 1, 0, 'Y'),
(22, 'test delete', 'delete', 1, 0, 'Y'),
(23, 'test delete', 'delete', 1, 0, 'N'),
(24, 'test update', 'update1', 1, 0, 'Y'),
(25, 'asdfmnaf', 'update3', 1, 0, 'Y'),
(26, 'aflkmaf', 'asdfmafl', 1, 0, 'Y'),
(27, 'subbs', 'subbu bad', 1, 0, 'Y'),
(28, 'test 23', 'afafag', 1, 0, 'Y'),
(29, 'Note 1', 'note 1', 1, 0, 'Y'),
(30, 'Note 2', 'note 2', 1, 0, 'Y'),
(31, 'ANote 3', 'note 3', 1, 0, 'Y'),
(32, 'Another Note 4', 'note 4', 1, 0, 'Y'),
(33, 'Note 2', 'note 2', 1, 0, 'Y'),
(34, 'Note 1', 'note 1', 1, 0, 'Y'),
(35, 'Another Note 4', 'note 4', 1, 0, 'Y'),
(36, 'ANote 3', 'note 3', 1, 0, 'Y'),
(37, 'Note 1', 'note 1', 1, 0, 'Y'),
(38, 'Note 2', 'note 2', 1, 0, 'Y'),
(39, 'Another Note 4', 'note 4', 1, 0, 'Y'),
(40, 'ANote 3', 'note 3', 1, 0, 'Y'),
(41, 'Note 2', 'note 2', 1, 0, 'Y'),
(42, 'Note 1', 'note 1', 1, 0, 'Y'),
(43, 'ANote 3', 'note 3', 1, 0, 'Y'),
(44, 'Another Note 4', 'note 4', 1, 0, 'Y'),
(45, 'revert note ', 'adflkjaf', 1, 0, 'Y'),
(46, '1234', '113123213fa', 1, 0, 'N'),
(47, '1234', 'afda', 1, 0, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `occupation_table`
--

CREATE TABLE IF NOT EXISTS `occupation_table` (
  `occ_id` int(11) NOT NULL AUTO_INCREMENT,
  `occupation_name` varchar(250) NOT NULL,
  `occupation_value` varchar(250) NOT NULL,
  PRIMARY KEY (`occ_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `occupation_table`
--

INSERT INTO `occupation_table` (`occ_id`, `occupation_name`, `occupation_value`) VALUES
(1, 'Student', 'Student'),
(2, 'Journalist', 'Journalist'),
(3, 'Professor or Teacher', 'Professor or Teacher'),
(4, 'Business User', 'Business User'),
(5, 'Other', 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `project_table`
--

CREATE TABLE IF NOT EXISTS `project_table` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `created` date NOT NULL,
  `updated` date NOT NULL,
  `is_exported` enum('Y','N') NOT NULL,
  `user_id` int(11) NOT NULL,
  `drive_url` varchar(250) NOT NULL,
  `status` enum('Y','N') NOT NULL DEFAULT 'Y',
  `project_templateId` int(11) NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1076 ;

--
-- Dumping data for table `project_table`
--

INSERT INTO `project_table` (`project_id`, `title`, `created`, `updated`, `is_exported`, `user_id`, `drive_url`, `status`, `project_templateId`) VALUES
(988, 'vvhv', '2014-07-21', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1038, 'asdfas', '2014-07-21', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1039, 'test doc', '2014-07-21', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1040, 'test_123', '2014-07-22', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1041, 'test_123', '2014-07-22', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1042, 'test_123', '2014-07-22', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1043, 'test_123', '2014-07-22', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1044, 'test_123', '2014-07-22', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1045, '1234', '2014-07-22', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1046, '123', '2014-07-22', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1048, 'sai', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1049, 'jhbhjb', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1050, 'cmnfga', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1051, 'test sync', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1052, 'testsync', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1053, 'adskjfhkjadf', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1054, 'kjhk', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1055, 'afdbjaf', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1056, '1234', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1057, 'dsafa,mf', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1058, 'dsfasf', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1059, 'gkj', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1060, 'daffa', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1061, 'sairam', '2014-07-24', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1062, 'Test', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1063, 'test1233', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1064, 'sad', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1065, 'Test', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1066, 'test', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1067, 'Abd', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1068, 'abvf', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1069, 'adsfasdf', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1070, 'adfasdf', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1071, 'asdfa', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 0),
(1072, 'sdfa', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 2),
(1073, 'asd', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 1),
(1074, 'asdfasd', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 1),
(1075, 'asdfasdf', '2014-07-25', '0000-00-00', 'Y', 170, '', 'Y', 5);

-- --------------------------------------------------------

--
-- Table structure for table `section_table`
--

CREATE TABLE IF NOT EXISTS `section_table` (
  `section_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(10) DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `description` longtext NOT NULL,
  `project_id` int(11) NOT NULL,
  `status` enum('Y','N') NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`section_id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `section_table`
--

INSERT INTO `section_table` (`section_id`, `order_id`, `title`, `description`, `project_id`, `status`) VALUES
(39, 1, 'one', 'adfa', 988, 'Y'),
(40, 0, 'n', 'n', 1071, 'Y'),
(41, 1, 'one', 'adfa', 988, 'Y'),
(42, 1, 'one', 'adfa', 988, 'Y'),
(43, 1, 'one', 'adfa', 988, 'Y'),
(44, 1, 'one', 'adfa', 988, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `source_table`
--

CREATE TABLE IF NOT EXISTS `source_table` (
  `source_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `project_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL DEFAULT '0',
  `sourcepath` varchar(250) NOT NULL,
  `status` enum('Y','N') NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`source_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `source_table`
--

INSERT INTO `source_table` (`source_id`, `title`, `type`, `project_id`, `section_id`, `sourcepath`, `status`) VALUES
(1, 'sairam', 'movie', 1, 0, 'path', 'Y'),
(2, 'ER Model.png', 'document', 1, 0, 'C:/xampp/htdocs/writewell_production/public/metadata/sources/ER Model.png', 'Y'),
(3, 'final_resume.docx', 'document', 2, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/final_resume.docx', 'Y'),
(4, 'final_resume.docx', 'document', 2, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/final_resume.docx', 'Y'),
(5, 'CAP-GEMINI_SAIRAM.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/CAP-GEMINI_SAIRAM.docx', 'Y'),
(6, 'dinesh.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/dinesh.docx', 'Y'),
(7, 'final_resume.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/final_resume.docx', 'Y'),
(8, 'Accolite_Resume.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/Accolite_Resume.docx', 'Y'),
(9, 'Accolite_Resume.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/Accolite_Resume.docx', 'Y'),
(10, 'Accolite_Resume.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/Accolite_Resume.docx', 'Y'),
(11, 'NALLAM_VENKATA_SAIRAM.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/NALLAM_VENKATA_SAIRAM.docx', 'Y'),
(12, 'Accolite_Resume.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/Accolite_Resume.docx', 'Y'),
(13, 'Accolite_Resume.docx', 'document', 1, 0, 'C:/xampp/htdocs/writewell/public/metadata/sources/Accolite_Resume.docx', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `user_details_table`
--

CREATE TABLE IF NOT EXISTS `user_details_table` (
  `ud_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `occupation` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`ud_id`),
  KEY `user_id` (`user_id`),
  KEY `occupation` (`occupation`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Dumping data for table `user_details_table`
--

INSERT INTO `user_details_table` (`ud_id`, `user_id`, `name`, `gender`, `occupation`, `age`) VALUES
(18, 159, 'hari', 'Male', 2, 45),
(19, 160, 'sarim', 'Male', 2, 75),
(22, 163, 'sra@gmail.com', NULL, 1, 18),
(23, 164, 'sra@gmail.com', 'Male', 1, 18),
(24, 165, 'sairam_testfilght', 'Male', 1, 50),
(25, 166, '1234', 'Male', 1, 31),
(27, 168, 'asdf', 'Male', 2, 13),
(28, 169, 'sra@gmail.com', 'Male', 1, 18),
(29, 170, 'Pavan', 'Male', 2, 13),
(30, 171, 'Sairam', 'Male', 2, 13),
(31, 172, 'saitest', 'Male', 1, 13),
(32, 173, 'dalsfml', 'Male', 1, 36),
(33, 174, 'sadf', 'Male', 2, 43),
(34, 175, 'adithya', 'Male', 1, 36),
(35, 176, 'saitest', 'Male', 1, 13),
(36, 177, 'adfa', 'Male', 1, 45),
(37, 179, 'fda', 'Male', 1, 30),
(38, 180, 'sairamnallam', 'Male', 1, 58),
(39, 181, 'saihari', 'Male', 1, 42),
(40, 182, 'abc', 'Female', 1, 36),
(41, 184, 'asdf', 'Male', 1, 43),
(42, 185, 'kjhjkh', 'Male', 2, 13),
(43, 186, 'Pavan', 'Male', 3, 45);

-- --------------------------------------------------------

--
-- Table structure for table `user_keys`
--

CREATE TABLE IF NOT EXISTS `user_keys` (
  `au_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `auth` varchar(250) NOT NULL,
  `authvalue` varchar(250) NOT NULL,
  `status` enum('Y','N') NOT NULL DEFAULT 'Y',
  `inserted` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_keys`
--

INSERT INTO `user_keys` (`au_id`, `user_id`, `auth`, `authvalue`, `status`, `inserted`) VALUES
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 164, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 166, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 182, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 141, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25'),
(0, 186, '20142061862014-07-25 13:18:58', '3723e6c27819f3d122a22d4194b3458ff7cb40bcb086cce12ab693312006ee3aa3b75b36', 'Y', '2014-07-25');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE IF NOT EXISTS `user_table` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `status` enum('Y','N') NOT NULL,
  `created_date` date NOT NULL,
  `emailkey` varchar(1200) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=187 ;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`user_id`, `email`, `password`, `status`, `created_date`, `emailkey`) VALUES
(159, 'hari123@gmail.com', '$2P3/lU8fzLJk', 'N', '2014-07-17', NULL),
(160, 'saihari123@gmail.com', '$2qaEVj1gpwrU', 'N', '2014-07-17', NULL),
(161, 'sadasdad', '$2qko8u80qI4Q', 'N', '2014-07-20', NULL),
(162, 'sra', '$2qko8u80qI4Q', 'N', '2014-07-20', NULL),
(163, 'srm', '$2qko8u80qI4Q', 'N', '2014-07-20', NULL),
(164, 'abc', '$2qko8u80qI4Q', 'N', '2014-07-20', NULL),
(165, 'sairam_eamiltest', '$2P3/lU8fzLJk', 'N', '2014-07-21', NULL),
(166, '1234', '$2qko8u80qI4Q', 'N', '2014-07-21', NULL),
(167, 'ad@ads.cd', '$2uhKG6ofuZts', 'N', '2014-07-21', NULL),
(168, 'asd@ad.cd', '$2Jyv7oTpN4Ng', 'N', '2014-07-21', NULL),
(169, 'abc12', '$2qko8u80qI4Q', 'N', '2014-07-21', NULL),
(170, 'pmaganti@rapidBizApps.com', '$2P3/lU8fzLJk', 'N', '2014-07-21', NULL),
(171, 'sallam@rapidBizApps.com', '$2naUPy3R0iOg', 'N', '2014-07-21', NULL),
(172, '123456', '$2P3/lU8fzLJk', 'N', '2014-07-21', NULL),
(173, 'sdaflmdafs', '$2ipocQrf8Dxo', 'N', '2014-07-21', NULL),
(174, 'saf', '$2/DHp6f0xSAA', 'N', '2014-07-21', NULL),
(175, 'adithyathacker@gmail.com', '$2P3/lU8fzLJk', 'N', '2014-07-21', NULL),
(176, '12356', '$2P3/lU8fzLJk', 'N', '2014-07-22', NULL),
(177, 'asdfa', '$2XfnqegdvktY', 'N', '2014-07-22', NULL),
(178, 'af', '$2dc.fbiH.xTA', 'N', '2014-07-22', NULL),
(179, 'dsaffa', '$2vBBAIdqm81I', 'N', '2014-07-22', NULL),
(180, 'sar12@gmail.com', '$2P3/lU8fzLJk', 'N', '2014-07-23', NULL),
(181, 'saihari@gmail.com', '69a5b5995110b36a9a347898d97a610e', 'N', '2014-07-24', NULL),
(182, 'abcd@gmail.com', 'e0f3868715b755cb269e7236d295b3cc', 'N', '2014-07-24', NULL),
(183, 'abcd@gmail', 'd1630caced66a6f3f25812711a8ae2ed', 'N', '2014-07-24', NULL),
(184, 'sai@gmail', '0aac4e6a54c170b06e2bd3848d2b735e', 'N', '2014-07-25', NULL),
(185, 'sdf@df.cd', 'bbad4f74afcd7cb396170dd971c5bc06', 'N', '2014-07-25', NULL),
(186, 'pmaganti+1@rapidbizapps.com', '99ca4a7416679bac50d69abd9ea413e8', 'N', '2014-07-25', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project_table`
--
ALTER TABLE `project_table`
  ADD CONSTRAINT `project_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`);

--
-- Constraints for table `section_table`
--
ALTER TABLE `section_table`
  ADD CONSTRAINT `section_table_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project_table` (`project_id`);

--
-- Constraints for table `user_details_table`
--
ALTER TABLE `user_details_table`
  ADD CONSTRAINT `user_details_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`),
  ADD CONSTRAINT `user_details_table_ibfk_2` FOREIGN KEY (`occupation`) REFERENCES `occupation_table` (`occ_id`);
