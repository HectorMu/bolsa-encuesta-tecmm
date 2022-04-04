
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

INSERT INTO seccion VALUES
(NULL, 'Pertinencia y disponilibidad de medios y recursos para el aprendizaje'),
(NULL, 'Ubicacion laboral para los egresados'),
(NULL, 'Desempeño profesional de los egresados (Coherencia entre la formación y el tipo de empleo)'),
(NULL, 'Expectativas de desarrollo, superación profesional y de actualización'),
(NULL, 'Participación social de los egresados'),
(NULL, 'Comentarios y sugerencias');

CREATE TABLE preguntas(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_seccion INT,
descripcion VARCHAR (250),
FOREIGN KEY (fk_seccion) REFERENCES seccion (id)
);
INSERT INTO preguntas VALUES (NULL, 1,'Calidad de los docentes'),
(NULL, 1,'Plan de estudios'),
(NULL, 1,'Oportunidad de participar en proyectos de investigación y desarrollo'),
(NULL, 1,'Énfasis que se le prestaba a la investigación dentro del proceso de enseñanza'),
(NULL, 1,'Satisfacción con las condiciones de estudio (Infraestructura)'),
(NULL, 1,'Experiencia obtenida a través de la residencia profesional'),
(NULL, 2,'Actividad a la que se dedica actualmente'),
(NULL, 3,'Eficiencia para realizar las actividades laborales, en relación con su formación académica'),
(NULL, 3,'Cómo califica su formación académica con respecto a su desempeño laboral'),
(NULL, 3,'Utilidad de las residencias profesionales o prácticas profesionales para su desarrollo laboral y profesional'),
(NULL, 3,'Aspectos que valora la empresa u otro organismo para la contratacion de egresados'),
(NULL, 4,'Le gustaria tomar cursos de actualización'),
(NULL, 4,'Le gustaria tomar algún posgrado'),
(NULL, 5,'Pertenece a organizaciones sociales'),
(NULL, 5,'Pertenece a organismos de profesionistas'),
(NULL, 5,'Pertenece a la asociación de egresados'),
(NULL, 6,'Opinión o recomendación para mejorar la formación profesional de un egresado de su carrera');

CREATE TABLE seccion2_estudia(
fk_usuario INT PRIMARY key,
fk_pregunta INT,
tipo_estudio VARCHAR(50),
especialidad_institucion VARCHAR (50),
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta) REFERENCES preguntas(id)
);

CREATE TABLE seccion2_trabaja(
fk_usuario INT PRIMARY key,
fk_pregunta INT,
tiempo_primer_empleo VARCHAR (100),
medio_obtener_empleo VARCHAR (100),
requisitos_contratacion VARCHAR (500),
idioma_utilizado VARCHAR(100),
idioma_hablar INT,
idioma_escribir INT,
idioma_leer INT,
idioma_escuchar INT,
antiguedad_empleo VARCHAR(100),
año_ingreso VARCHAR (50),
salario VARCHAR(50),
nivel_jerarquico VARCHAR(100),
condicion_trabajo VARCHAR(100),
relacion_trabajo_formacion VARCHAR(50),
organismo_empresa VARCHAR (100),
actividad_principal_empresa VARCHAR (100),
razon_social VARCHAR(100),
calle VARCHAR (100),
numero INT,
colonia VARCHAR (100),
cp INT,
ciudad VARCHAR (100),
municipio VARCHAR (100),
estado VARCHAR (100),
telefono_empresa INT,
telefono_ext_empresa INT,
fax_empresa INT,
email_empresa VARCHAR (100),
pagina_web VARCHAR(200),
jefe_inmediato VARCHAR(200),
sector_empresa VARCHAR (200),
tamaño_empresa VARCHAR (200)
);

CREATE TABLE seccion3_p4_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta INT,
area_estudio INT,
titulacion INT,
experiencia_laboral INT,
competencia_laboral INT,
posicionamiento_institucion_egreso INT,
conocimiento_idiomas_extranjeros INT,
recomendaciones INT,
personalidad INT,
capacidad_liderazgo INT,
otros INT,
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta) REFERENCES preguntas(id)
);

CREATE TABLE seccion4_p1_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta INT,
cursos VARCHAR (500),
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta) REFERENCES preguntas(id)
);

CREATE TABLE seccion4_p2_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta INT,
posgrado VARCHAR (500),
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta) REFERENCES preguntas(id)
);

CREATE TABLE seccion5_p1_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta INT,
organizaciones_sociales VARCHAR (500),
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta) REFERENCES preguntas(id)
);

CREATE TABLE seccion5_p2_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta INT,
organismos_profesionistas VARCHAR (500),
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta) REFERENCES preguntas(id)
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

CREATE TABLE seccion_empresa(
id INT PRIMARY KEY AUTO_INCREMENT,
descripcion VARCHAR (250)
);

INSERT INTO seccion_empresa VALUES
(NUll, 'Ubicación laboral de los egresados'),
(NULL, 'Competencias laborales');

CREATE TABLE preguntas_empresa(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_seccion_empresa INT,
descripcion VARCHAR (250),
FOREIGN KEY (fk_seccion_empresa) REFERENCES seccion_empresa(id)
);
INSERT INTO preguntas_empresa VALUES
(NULL, 1,'Número de profesionistas con nivel de licenciatura que laboran en la empresa u organismo'),
(NULL, 1,'Número de egresados del Instituto Tecnológico y nivel jerárquico que ocupan en su organización'),
(NULL, 1,'Congruencia entre perfil profesional y función que desarrollan los egresados del Instituto Tecnológico en su empresa u organización. Del total de egresados anote el porcentaje que corresponda'),
(NULL, 1,'Requisitos que establece su empresa u organización para la contratación de personal con nivel de licenciatura'),
(NULL, 1,'Carreras que demanda preferentemente su empresa u organismo'),
(NULL, 2,'En su opinión, ¿Qué competencias considera que deben desarrollar los egresados del Instituto Tecnológico, para desempeñarse eficientemente en sus actividades laborales?'),
(NULL, 2,'Con base al desempeño laboral así como a las actividades laborales que realiza el egresado. ¿Cómo considera su desempeño laboral respecto a su formación académica? Del total de egresados anote el porcentaje que corresponda.'),
(NULL, 2,'De acuerdo con las necesidades de su empresa u organismo, ¿Qué sugiere para mejorar la formación de los egresados del Instituto Tecnológico?'),
(NULL, 2,'Comentarios y sugerencias');

CREATE TABLE seccionB_p6_detalle(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_usuario INT,
fk_pregunta_empresa INT,
carrera VARCHAR(50),
mando_superior INT,
mando_intermedio INT,
supervisor INT,
tecnico_auxiliar INT,
otros_p6 INT,
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta_empresa) REFERENCES preguntas_empresa(id)
);

CREATE TABLE seccionB_p7_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta_empresa INT,
completamente INT,
medianamente INT,
ligeramente INT,
ninguna_relacion INT,
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta_empresa) REFERENCES preguntas_empresa(id)
);

CREATE TABLE seccionB_p8_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta_empresa INT,
area_estudio VARCHAR(20),
titulacion VARCHAR(20),
experiencia_laboral VARCHAR(20),
competencia_laboral VARCHAR(20),
posicionamiento_institucion_egreso VARCHAR(20),
conocimiento_idiomas_extranjeros VARCHAR(20),
recomendaciones VARCHAR(20),
personalidad VARCHAR(20),
capacidad_liderazgo VARCHAR(20),
otros_p8 VARCHAR(20),
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta_empresa) REFERENCES preguntas_empresa(id)
);

CREATE TABLE seccionC_p10_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta_empresa INT,
habilidad_resolver_conflictos INT,
ortografia_redaccion INT,
mejora_procesos INT,
trabajo_equipo INT,
habilidad_administrar_tiempo INT,
seguridad_personal INT,
facilidad_palabra INT,
gestion_proyectos INT,
puntualidad_asistencia INT,
cumplimiento_normas INT,
integracion_trabajo INT,
creatividad_innovacion INT,
capacidad_negociacion INT,
capacidad_analisis INT,
liderazgo INT,
adaptacion_cambio INT,
otros INT,
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta_empresa) REFERENCES preguntas_empresa(id)
);

CREATE TABLE seccionC_p11_detalle(
fk_usuario INT PRIMARY key,
fk_pregunta_empresa INT,
excelente INT,
muy_bueno INT,
bueno INT,
regular INT,
malo INT,
FOREIGN KEY (fk_usuario) REFERENCES usuarios(id),
FOREIGN KEY (fk_pregunta_empresa) REFERENCES preguntas_empresa(id)
);

CREATE TABLE respuestas_empresa(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_pregunta_empresa INT,
fk_seccion_empresa INT,
fk_usuario INT,
respuesta TEXT,
FOREIGN KEY (fk_pregunta_empresa) REFERENCES preguntas_empresa(id),
FOREIGN KEY (fk_seccion_empresa) REFERENCES seccion_empresa(id),
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
    status varchar(50),
    foreign key(fk_empresa)references usuarios(id)
);

CREATE TABLE vistas_publicaciones(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_publicacion INT,
    fk_usuario INT,
	FOREIGN KEY (fk_publicacion) REFERENCES publicacion_bolsa(folio),
	FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
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
