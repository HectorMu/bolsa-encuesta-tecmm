//Posible version 2 de la tabla para tener un mejor manejo de las secciones respuestas y las preguntas


create database control_egresados;

use control_egresados;

create table roles(
    id int primary key auto_increment,
    rol varchar(50)
);

insert into roles values
(null, 'Administrador'),
(null, 'Egresado'),
(null, 'Empresa');


create table usuarios(
    id int primary key auto_increment,
    correo varchar(100),
    clave varchar(300),
    fk_rol int,
    FOREIGN KEY (fk_rol) REFERENCES roles (id),
    creadoEn varchar(50),
    actualizadoEn varchar(50)
);

create table perfil_empresa(
    fk_usuario int primary key,
    nombre_comercial varchar(100),
    calle varchar(50),
    numero_empresa int,
    colonia varchar(50),
    cp varchar(50),
    municipio varchar(50),
    estado varchar(50),
    telefono varchar(100),
    tipo_empresa varchar(50),
    tamaño varchar(100),
    actividad_economica varchar(200),
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
);

create table perfil_egresado(
    fk_usuario int primary key,
	 no_control int,
    nombre_completo varchar(100),
    fechaNacimiento varchar(100),
    curp varchar(100),
    sexo varchar(10),
    estado_civil varchar(20),
    calle varchar(50),
    numero_casa int,
    colonia varchar(50),
    cp varchar(50),
    municipio varchar(50),
    estado varchar(50),
    telefono varchar(50),
    tel_casa varchar(50),
    carrera varchar(50),
    fecha_egreso varchar(50),
    idioma_extranjero JSON,
    titulado varchar(10),
    paquetes_computacionales TEXT,
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
);





CREATE TABLE seccion(
id INT PRIMARY KEY AUTO_INCREMENT,
descripcion VARCHAR (250)
);

CREATE TABLE preguntas(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_seccion INT,
descripcion VARCHAR (250),
FOREIGN KEY (fk_seccion) REFERENCES seccion (id)
);


CREATE TABLE respuestas(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_pregunta INT,
fk_seccion INT,
fk_usuario INT,
respuesta TEXT,
FOREIGN KEY (fk_pregunta) REFERENCES preguntas(id),
FOREIGN KEY (fk_seccion) REFERENCES seccion(id),
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
);








create table publicacion_bolsa(
    folio int primary key,
    fk_empresa int,
    vacante varchar(100),
    descripcion TEXT,
    ubicacion varchar(50),
    fecha_creacion varchar(100),
    fecha_expira varchar(100),
    consultas int,
    solicitudes_total int,
    solicitudes_revisadas int,
    solicitudes_sinrevisar int,
    status varchar(50),
    foreign key(fk_empresa)references usuarios(id)
);

create table solicitud_bolsa(
    id int primary key auto_increment,
    fk_vacante int,
    fk_egresado int,
    status varchar(50),
    curriculum varchar(200),
    foreign key(fk_vacante)references publicacion_bolsa(folio),
    foreign key(fk_egresado)references usuarios(id)
);

//DISPARADORES------------------------------------------------------------------------------

DELIMITER //
CREATE TRIGGER `perfil_egresado_FechaActualizacion` BEFORE UPDATE ON `perfil_egresado` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `perfil_egresado_FechaInserccion` BEFORE INSERT ON `perfil_egresado` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `perfil_empresa_FechaActualizacion` BEFORE UPDATE ON `perfil_empresa` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `perfil_empresa_FechaInserccion` BEFORE INSERT ON `perfil_empresa` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `publicacion_bolsa_FechaInserccion` BEFORE INSERT ON `publicacion_bolsa` FOR EACH ROW BEGIN
	SET NEW.fecha_creacion = CURRENT_TIMESTAMP();
END//
DELIMITER ;



DELIMITER //
CREATE TRIGGER `usuarios_BorrarDatosExistentesEgresado` BEFORE DELETE ON `usuarios` FOR EACH ROW BEGIN
	DELETE FROM perfil_egresado WHERE fk_usuario = OLD.id;
	DELETE FROM solicitud_bolsa WHERE fk_egresado = OLD.id;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `usuarios_BorrarDatosExistentesEmpresa` BEFORE DELETE ON `usuarios` FOR EACH ROW BEGIN
	DELETE FROM perfil_empresa WHERE fk_usuario = OLD.id;
	DELETE FROM publicacion_bolsa WHERE fk_empresa = OLD.id;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `usuarios_FechaDeActualizacion` BEFORE UPDATE ON `usuarios` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `usuarios_FechaDeInsercion` BEFORE INSERT ON `usuarios` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;
