-- MySQL Script generated by MySQL Workbench
-- Tue Jun 18 10:23:09 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema agenda
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `agenda` ;

-- -----------------------------------------------------
-- Schema agenda
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `agenda` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `agenda` ;

-- -----------------------------------------------------
-- Table `agenda`.`empresa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`empresa` ;

CREATE TABLE IF NOT EXISTS `agenda`.`empresa` (
  `id` INT NOT NULL auto_increment,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `agenda`.`rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`rol` ;

CREATE TABLE IF NOT EXISTS `agenda`.`rol` (
  `id` INT NOT NULL auto_increment,
  `nombre` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `agenda`.`area`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`area` ;

CREATE TABLE IF NOT EXISTS `agenda`.`area` (
  `id` INT NOT NULL auto_increment,
  `nombre` VARCHAR(50) NULL,
  `empresaFk` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_area_empresa1_idx` (`empresaFk` ASC) VISIBLE,
  CONSTRAINT `fk_area_empresa1`
    FOREIGN KEY (`empresaFk`)
    REFERENCES `agenda`.`empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agenda`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`usuario` ;

CREATE TABLE IF NOT EXISTS `agenda`.`usuario` (
  `id` INT NOT NULL auto_increment,
  `nombre` VARCHAR(50) NULL DEFAULT NULL,
  `apePaterno` VARCHAR(50) NULL DEFAULT NULL,
  `apeMaterno` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(20) NULL DEFAULT NULL,
  `telefono` VARCHAR(10) NULL DEFAULT NULL,
  `fechaNac` DATE NULL DEFAULT NULL,
  `rolFk` INT NOT NULL,
  `empresaFk` INT NOT NULL,
  `areaFk` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_rol1_idx` (`rolFk` ASC) VISIBLE,
  INDEX `fk_usuario_empresa1_idx` (`empresaFk` ASC) VISIBLE,
  INDEX `fk_usuario_area1_idx` (`areaFk` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_rol1`
    FOREIGN KEY (`rolFk`)
    REFERENCES `agenda`.`rol` (`id`),
  CONSTRAINT `fk_usuario_empresa1`
    FOREIGN KEY (`empresaFk`)
    REFERENCES `agenda`.`empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_area1`
    FOREIGN KEY (`areaFk`)
    REFERENCES `agenda`.`area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `agenda`.`mantenimiento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`mantenimiento` ;

CREATE TABLE IF NOT EXISTS `agenda`.`mantenimiento` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(150) NULL DEFAULT NULL,
  `descripcion` VARCHAR(500) NULL DEFAULT NULL,
  `fechaRegistro` DATE NULL DEFAULT NULL,
  `aceptado` TINYINT NULL,
  `costo` FLOAT NULL DEFAULT NULL,
  `estadoPago` VARCHAR(50) NULL DEFAULT NULL,
  `finalizado` TINYINT NULL,
  `fechaFin` DATE NULL,
  `usuarioFk` INT NOT NULL,
  `areaFk` INT NOT NULL,
  `empleadoFk` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mantenimiento_usuario1_idx` (`usuarioFk` ASC) VISIBLE,
  INDEX `fk_mantenimiento_area1_idx` (`areaFk` ASC) VISIBLE,
  INDEX `fk_mantenimiento_usuario2_idx` (`empleadoFk` ASC) VISIBLE,
  CONSTRAINT `fk_mantenimiento_usuario1`
    FOREIGN KEY (`usuarioFk`)
    REFERENCES `agenda`.`usuario` (`id`),
  CONSTRAINT `fk_mantenimiento_area1`
    FOREIGN KEY (`areaFk`)
    REFERENCES `agenda`.`area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mantenimiento_usuario2`
    FOREIGN KEY (`empleadoFk`)
    REFERENCES `agenda`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `agenda`.`comentario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`comentario` ;

CREATE TABLE IF NOT EXISTS `agenda`.`comentario` (
  `id` INT NOT NULL auto_increment,
  `descripcion` VARCHAR(500) NULL,
  `fecha` DATE NULL,
  `mantenimientoFk` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comentario_mantenimiento1_idx` (`mantenimientoFk` ASC) VISIBLE,
  CONSTRAINT `fk_comentario_mantenimiento1`
    FOREIGN KEY (`mantenimientoFk`)
    REFERENCES `agenda`.`mantenimiento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- Inserciones de prueba 
-- Inserta datos en la tabla `empresa`
INSERT INTO `agenda`.`empresa` (`id`, `nombre`) VALUES 
(1, 'Bellakera 1'),
(2, 'Empresa durísima');

-- Inserta datos en la tabla `rol`
INSERT INTO `agenda`.`rol` (`id`, `nombre`) VALUES 
(1, 'administrador'),
(2, 'empleado'),
(3, 'cliente');

-- Inserta datos en la tabla `area`
INSERT INTO `agenda`.`area` (`id`, `nombre`, `empresaFk`) VALUES 
(1, 'Pintura', 1),
(2, 'Soldadura', 1),
(3, 'Plomería', 2);

-- Inserta datos en la tabla `usuario`
INSERT INTO `agenda`.`usuario` (`id`, `nombre`, `apePaterno`, `apeMaterno`, `email`, `password`, `telefono`, `fechaNac`, `rolFk`, `empresaFk`, `areaFk`) VALUES 
(1, 'Admin', 'Admin', 'Admin', 'rojassanchezo63@gmail.com', 'admin123', '1234567890', '1980-01-01', 1, 1, NULL),  -- Administrador
(2, 'Empleado1', 'Perez', 'Gomez', 'empleado1@empresa.com', 'empleado123', '1234567891', '1990-01-01', 2, 1, 1),  -- Empleado de Empresa A en Area 1
(3, 'Empleado2', 'Lopez', 'Martinez', 'empleado2@empresa.com', 'empleado123', '1234567892', '1992-01-01', 2, 2, 3),  -- Empleado de Empresa B en Area 3
(4, 'Cliente1', 'Garcia', 'Fernandez', 'cliente1@empresa.com', 'cliente123', '1234567893', '2000-01-01', 3, 1, NULL);  -- Cliente de Empresa A

-- Inserta datos en la tabla `mantenimiento`
INSERT INTO `agenda`.`mantenimiento` (`id`, `nombre`, `descripcion`, `fechaRegistro`, `aceptado`, `costo`, `estadoPago`, `finalizado`, `fechaFin`, `usuarioFk`, `areaFk`, `empleadoFk`) VALUES 
(1, 'Mantenimiento A', 'Descripción del mantenimiento A', '2024-06-01', 1, 100.0, 'pendiente', 0, NULL, 4, 1, 2),  -- Asignado a Cliente1 y Empleado1
(2, 'Mantenimiento B', 'Descripción del mantenimiento B', '2024-06-02', 1, 200.0, 'pagado', 1, '2024-06-10', 4, 3, 3);  -- Asignado a Cliente1 y Empleado2

-- Inserta datos en la tabla `comentario`
INSERT INTO `agenda`.`comentario` (`id`, `descripcion`, `fecha`, `mantenimientoFk`) VALUES 
(1, 'Comentario sobre el mantenimiento A', '2024-06-05', 1),
(2, 'Comentario sobre el mantenimiento B', '2024-06-11', 2);

