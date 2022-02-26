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
    id int primary key,
    fk_usuario  INT,
    nombreComercial varchar(100),
    calle varchar(50),
    nEmpresa int,
    colonia varchar(50),
    cp varchar(50),
    municipio varchar(50),
    estado varchar(50),
    telefono varchar(100),
    tipo_empresa varchar(50),
    tamaño varchar(100),
    actividad_economica varchar(200),
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
);

create table perfil_egresado(
    nControl int primary key,
    fk_usuario  INT,
    nombreCompleto varchar(100),
    fechaNacimiento varchar(100),
    curp varchar(100),
    sexo varchar(10),
    estadoCivil varchar(20),
    calle varchar(50),
    nCasa int,
    colonia varchar(50),
    cp varchar(50),
    municipio varchar(50),
    estado varchar(50),
    telefono varchar(50),
    telCasa varchar(50),
    carrera varchar(50),
    fechaEgreso varchar(50),
    idiomaExtranjero JSON,
    paquetesComputacionales TEXT,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
);



create table seccion_dos(
    id int primary key auto_increment,
    fk_egresado int,
    pregunta_uno varchar(50),
    pregunta_dos varchar(50),
    pregunta_tres varchar(50),
    pregunta_cuatro varchar(50),
    pregunta_cinco varchar(50),
    pregunta_seis varchar(50),
    foreign key(fk_egresado)references usuarios(id)
);

create table seccion_tres(
    id int primary key auto_increment,
    fk_egresado int,
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
    foreign key(fk_egresado)references usuarios(id)
);

create table seccion_cuatro(
    id int primary key auto_increment,
    fk_egresado int,
    pregunta_uno varchar(50),
    pregunta_dos varchar(50),
    pregunta_tres varchar(50),
    pregunta_cuatro JSON,
    foreign key(fk_egresado)references usuarios(id)
);

create table seccion_cinco(
    id int primary key auto_increment,
    fk_egresado int,
    pregunta_uno JSON,
    pregunta_dos JSON,
    foreign key(fk_egresado)references usuarios(id)
);

create table seccion_seis(
    id int primary key auto_increment,
    fk_egresado int,
    pregunta_uno JSON,
    pregunta_dos JSON,
    pregunta_tres varchar(50),
    foreign key(fk_egresado)references usuarios(id)
);

create table seccion_siete(
    id int primary key auto_increment,
    fk_egresado int,
    comentarios_sugerencias TEXT,
    fecha_realizacion varchar(100),
    foreign key(fk_egresado)references usuarios(id)
);

create table seccion_b(
    id int primary key auto_increment,
    fk_empresa int,
    pregunta_cinco varchar(50),
    pregunta_seis JSON,
    pregunta_siete JSON,
    pregunta_ocho JSON,
    pregunta_nueve TEXT,
    foreign key(fk_empresa)references usuarios(id)
);

create table seccion_c(
    id int primary key auto_increment,
    fk_empresa int,
    pregunta_diez JSON,
    pregunta_once JSON,
    pregunta_doce TEXT,
    pregunta_catorce TEXT,
    foreign key(fk_empresa)references usuarios(id)
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