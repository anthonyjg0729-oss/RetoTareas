-- =============================================
-- SCRIPT: database.sql
-- Base de datos: dbtareas
-- Descripción: Schema completo con tablas,
-- datos de prueba y stored procedures
-- =============================================

-- Tabla de Prioridades
-- Define los niveles de prioridad de una tarea
CREATE TABLE prioridades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de Estados
-- Define los posibles estados de una tarea
CREATE TABLE estados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de Tareas
-- Tabla principal que almacena todas las tareas
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    prioridad_id INT NOT NULL REFERENCES prioridades(id),
    estado_id INT NOT NULL REFERENCES estados(id),
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- DATOS POR DEFECTO
-- =============================================

INSERT INTO prioridades (nombre) VALUES ('Alta'), ('Media'), ('Baja');

INSERT INTO estados (nombre) VALUES ('Pendiente'), ('En Progreso'), ('Completada');

INSERT INTO tareas (titulo, descripcion, prioridad_id, estado_id) VALUES
('Diseñar base de datos', 'Crear el schema con tablas y stored procedures', 1, 3),
('Crear API REST', 'Desarrollar endpoints con .NET 8', 1, 2),
('Desarrollar app mobile', 'Construir pantallas en React Native', 2, 1),
('Escribir documentación', 'README y diagramas de arquitectura', 3, 1),
('Crear stored procedures', 'Implementar SP para listar y filtrar', 2, 2),
('Configurar Docker', 'Levantar PostgreSQL en contenedor', 1, 3);

-- =============================================
-- STORED PROCEDURES
-- =============================================

-- Lista todas las tareas con su prioridad y estado
CREATE OR REPLACE FUNCTION obtener_tareas()
RETURNS TABLE (
    id INT,
    titulo VARCHAR,
    descripcion TEXT,
    prioridad VARCHAR,
    estado VARCHAR,
    creado_en TIMESTAMP,
    actualizado_en TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.titulo,
        t.descripcion,
        p.nombre AS prioridad,
        e.nombre AS estado,
        t.creado_en,
        t.actualizado_en
    FROM tareas t
    INNER JOIN prioridades p ON t.prioridad_id = p.id
    INNER JOIN estados e ON t.estado_id = e.id
    ORDER BY t.creado_en DESC;
END;
$$;

-- Filtra tareas por estado y/o prioridad
CREATE OR REPLACE FUNCTION filtrar_tareas(
    p_estado VARCHAR DEFAULT NULL,
    p_prioridad VARCHAR DEFAULT NULL
)
RETURNS TABLE (
    id INT,
    titulo VARCHAR,
    descripcion TEXT,
    prioridad VARCHAR,
    estado VARCHAR,
    creado_en TIMESTAMP,
    actualizado_en TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.titulo,
        t.descripcion,
        p.nombre AS prioridad,
        e.nombre AS estado,
        t.creado_en,
        t.actualizado_en
    FROM tareas t
    INNER JOIN prioridades p ON t.prioridad_id = p.id
    INNER JOIN estados e ON t.estado_id = e.id
    WHERE 
        (p_estado IS NULL OR e.nombre = p_estado)
        AND
        (p_prioridad IS NULL OR p.nombre = p_prioridad)
    ORDER BY t.creado_en DESC;
END;
$$;

-- Obtiene el detalle de una tarea por su ID
CREATE OR REPLACE FUNCTION obtener_tarea_por_id(p_id INT)
RETURNS TABLE (
    id INT,
    titulo VARCHAR,
    descripcion TEXT,
    prioridad VARCHAR,
    estado VARCHAR,
    creado_en TIMESTAMP,
    actualizado_en TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.titulo,
        t.descripcion,
        p.nombre AS prioridad,
        e.nombre AS estado,
        t.creado_en,
        t.actualizado_en
    FROM tareas t
    INNER JOIN prioridades p ON t.prioridad_id = p.id
    INNER JOIN estados e ON t.estado_id = e.id
    WHERE t.id = p_id;
END;
$$;