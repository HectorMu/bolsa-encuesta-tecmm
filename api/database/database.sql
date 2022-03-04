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



create table seccion_dos(
    fk_usuario int primary key,
    pregunta_uno varchar(50),
    pregunta_dos varchar(50),
    pregunta_tres varchar(50),
    pregunta_cuatro varchar(50),
    pregunta_cinco varchar(50),
    pregunta_seis varchar(50),
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    foreign key(fk_usuario)references usuarios(id)
);

create table seccion_tres(
    fk_usuario int primary key,
    pregunta_uno varchar(50),
    p_uno_estudia varchar(150),
    p_uno_institucion varchar(150),
    pregunta_dos varchar(100),
    pregunta_tres varchar(150),
    pregunta_cuatro varchar(100),
    pregunta_cinco varchar(100),
    pregunta_seis JSON,
    pregunta_siete varchar(100),
    pregunta_ocho varchar(100),
    pregunta_nueve varchar(100),
    pregunta_diez varchar(100),
    pregunta_once varchar(100),
    pregunta_doce JSON,
    pregunta_trece varchar(100),
    pregunta_catorce varchar(100),
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    foreign key(fk_usuario)references usuarios(id)
);

create table seccion_cuatro(
    fk_usuario int primary key,
    pregunta_uno varchar(50),
    pregunta_dos varchar(50),
    pregunta_tres varchar(50),
    pregunta_cuatro JSON,
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    foreign key(fk_usuario)references usuarios(id)
);

create table seccion_cinco(
    fk_usuario int primary key,
    pregunta_uno JSON,
    pregunta_dos JSON,
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    foreign key(fk_usuario)references usuarios(id)
);

create table seccion_seis(
    fk_usuario int primary key,
    pregunta_uno JSON,
    pregunta_dos JSON,
    pregunta_tres varchar(50),
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    foreign key(fk_usuario)references usuarios(id)
);

create table seccion_siete(
    fk_usuario int primary key,
    comentarios_sugerencias TEXT,
    fecha_realizacion varchar(100),
    actualizadoEn varchar(50),
    foreign key(fk_usuario)references usuarios(id)
);

create table seccion_b(
    fk_usuario int primary key,
    pregunta_cinco varchar(50),
    pregunta_seis JSON,
    pregunta_siete JSON,
    pregunta_ocho JSON,
    pregunta_nueve TEXT,
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    foreign key(fk_usuario)references usuarios(id)
);

create table seccion_c(
    fk_usuario int primary key,
    pregunta_diez JSON,
    pregunta_once JSON,
    pregunta_doce TEXT,
    pregunta_catorce TEXT,
    creadoEn varchar(50),
    actualizadoEn varchar(50),
    foreign key(fk_usuario)references usuarios(id)
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
CREATE TRIGGER `seccion_b_FechaActualizacion` BEFORE UPDATE ON `seccion_b` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_b_FechaInserccion` BEFORE INSERT ON `seccion_b` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_cinco_FechaActualizacion` BEFORE UPDATE ON `seccion_cinco` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_cinco_FechaInserccion` BEFORE INSERT ON `seccion_cinco` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_cuatro_FechaActualizacion` BEFORE UPDATE ON `seccion_cuatro` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_cuatro_FechaInserccion` BEFORE INSERT ON `seccion_cuatro` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_c_FechaActualizacion` BEFORE UPDATE ON `seccion_c` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_c_FechaInserccion` BEFORE INSERT ON `seccion_c` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_dos_FechaActualizacion` BEFORE UPDATE ON `seccion_dos` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_dos_FechaInserccion` BEFORE INSERT ON `seccion_dos` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_seis_FechaActualizacion` BEFORE UPDATE ON `seccion_seis` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_seis_FechaInserccion` BEFORE INSERT ON `seccion_seis` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_siete_FechaActualizacion` BEFORE UPDATE ON `seccion_siete` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_siete_FechaInserccion` BEFORE INSERT ON `seccion_siete` FOR EACH ROW BEGIN
	SET NEW.fecha_realizacion = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_tres_FechaActualizacion` BEFORE UPDATE ON `seccion_tres` FOR EACH ROW BEGIN
	SET NEW.actualizadoEn = CURRENT_TIMESTAMP();
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `seccion_tres_FechaInserccion` BEFORE INSERT ON `seccion_tres` FOR EACH ROW BEGIN
	SET NEW.creadoEn = CURRENT_TIMESTAMP();
    SET NEW.actualizadoEn = 'Pendiente';
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `usuarios_BorrarDatosExistentesEgresado` BEFORE DELETE ON `usuarios` FOR EACH ROW BEGIN
	DELETE FROM perfil_egresado WHERE fk_usuario = OLD.id;
	DELETE FROM seccion_dos WHERE fk_usuario = OLD.id;
	DELETE FROM seccion_tres WHERE fk_usuario = OLD.id;
	DELETE FROM seccion_cuatro WHERE fk_usuario = OLD.id;
	DELETE FROM seccion_cinco WHERE fk_usuario = OLD.id;
	DELETE FROM seccion_seis WHERE fk_usuario = OLD.id;
	DELETE FROM seccion_siete WHERE fk_usuario = OLD.id;
	DELETE FROM solicitud_bolsa WHERE fk_egresado = OLD.id;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `usuarios_BorrarDatosExistentesEmpresa` BEFORE DELETE ON `usuarios` FOR EACH ROW BEGIN
	DELETE FROM perfil_empresa WHERE fk_usuario = OLD.id;
	DELETE FROM seccion_b WHERE fk_usuario = OLD.id;
	DELETE FROM seccion_c WHERE fk_usuario = OLD.id;
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