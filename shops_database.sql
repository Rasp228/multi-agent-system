-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 04 Cze 2023, 19:08
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `shops_database`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `plant`
--

CREATE TABLE `plant` (
  `ID` int(11) NOT NULL,
  `shopID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dificult` int(11) NOT NULL,
  `wateringFrequency` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `sunlight` int(11) NOT NULL,
  `harmfullness` int(11) NOT NULL,
  `color` varchar(255) NOT NULL,
  `images` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `plant`
--

INSERT INTO `plant` (`ID`, `shopID`, `name`, `dificult`, `wateringFrequency`, `size`, `sunlight`, `harmfullness`, `color`, `images`) VALUES
(1, 1, 'Skrzydłokwiat', 2410, 3200, 310, 4310, 4100, 'DCFFDC', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958631390167111/0.webp'),
(2, 2, 'Storczyk niebieski', 243, 131, 140, 130, 4100, '0000FF', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958646460289145/1.webp'),
(3, 3, 'Storczyk (biały)', 243, 131, 140, 130, 4100, 'FFFFFF', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958654551117865/2.webp'),
(4, 4, 'Wężownica', 1410, 241, 230, 241, 320, '8AC570', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958663455621201/3.webp'),
(5, 2, 'Grubosz', 4300, 143, 320, 43, 4100, '00FF00', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958669457670154/4.webp'),
(6, 1, 'Juka Gwatemalska', 3400, 142, 231, 142, 4100, '00FF00', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958676558626906/5.webp'),
(7, 1, 'Figowiec (fikus)', 2410, 420, 142, 240, 4100, '6BFF8B', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958685043703868/6.webp'),
(8, 2, 'Monstera dziurawa', 1310, 31, 32, 1420, 4100, '00FF00', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958688554340413/7.webp'),
(9, 3, 'Szeflera', 1320, 330, 4, 330, 4100, '00FF00', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958695428800633/8.webp'),
(10, 4, 'Aloes', 2400, 231, 1310, 231, 4000, '00FF00', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958701321797723/9.webp'),
(11, 2, 'Wilczomlecz trójżebrowy', 3400, 41, 34, 241, 421, '00FF00', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958707034439690/10.webp'),
(12, 2, 'Głowa starca', 310, 43, 33, 34, 1320, 'AAFFAA', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958713028104263/11.webp'),
(13, 4, 'Kaktus wężowy', 310, 43, 132, 34, 2310, 'CC7777', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958720493953144/13.webp'),
(14, 3, 'Kaktus Bożonarodzeniowy\r\n(Grudnik)(czerwony)\r\n', 2400, 142, 1430, 33, 3100, 'FF2020', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958725371924541/12.webp'),
(15, 3, 'Kaktus Bożonarodzeniowy\r\n(Grudnik) (żółty)\r\n', 2400, 142, 1430, 33, 3100, 'CCCC20', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958741645832378/14.webp'),
(16, 4, 'Fotel teściowej (echinokaktus grusona)', 3400, 34, 141, 14, 2310, '55AA22', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958747157139456/15.webp'),
(17, 1, 'Czapka biskupa (astrophytum myriostigma)', 4300, 243, 4000, 1332, 4100, 'CCFFCC', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958755411525773/16.webp'),
(18, 4, 'Róża doniczkowa (czerwona)', 331, 330, 320, 320, 4100, 'FF0000', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958761971417199/17.webp'),
(19, 4, 'Róża doniczkowa (biała)', 331, 330, 320, 320, 4100, 'FFFFFF', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958767180759060/18.webp'),
(20, 2, 'Irys', 3400, 2441, 4100, 340, 4100, '7755FF', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958773329596449/19.webp'),
(21, 1, 'Kalatea (Calathea)', 23, 2400, 130, 320, 3210, '77FF77', 'https://cdn.discordapp.com/attachments/865584348895248403/1114958779222589461/20.webp');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shop`
--

CREATE TABLE `shop` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `shop`
--

INSERT INTO `shop` (`ID`, `name`) VALUES
(1, 'roslinka'),
(2, 'krzaczek'),
(3, 'ABCogrodu'),
(4, 'tulipan');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `plant`
--
ALTER TABLE `plant`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_132141d44447d902d71ce41f82a` (`shopID`);

--
-- Indeksy dla tabeli `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `plant`
--
ALTER TABLE `plant`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT dla tabeli `shop`
--
ALTER TABLE `shop`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `plant`
--
ALTER TABLE `plant`
  ADD CONSTRAINT `FK_132141d44447d902d71ce41f82a` FOREIGN KEY (`shopID`) REFERENCES `shop` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
