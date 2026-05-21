# TaskManager - Backend API

API REST desarrollada con .NET 8 usando Clean Architecture para la gestión de tareas.

## Stack Tecnológico

- .NET 8 Web API
- PostgreSQL 16
- Dapper (ORM ligero para stored procedures)
- Docker (contenedor de base de datos)
- Swagger (documentación y testing)

## Arquitectura

El proyecto sigue Clean Architecture dividida en 4 capas:
TaskManager.API          → Controllers, configuración, middlewares
TaskManager.Application  → Casos de uso, interfaces (contratos)
TaskManager.Domain       → Entidades del dominio
TaskManager.Infrastructure → Repositorios, conexión a DB

## Requisitos previos

- .NET 8 SDK
- Docker Desktop
- PostgreSQL (via Docker)

## Configuración y ejecución

### 1. Levantar la base de datos

```bash
docker run --name db-tareas \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=dbtareas \
  -p 5432:5432 \
  -d postgres:16
```

### 2. Ejecutar el script SQL

Ejecuta el archivo `database.sql` en DBeaver o psql para crear las tablas, datos de prueba y stored procedures.

### 3. Levantar el backend

```bash
cd TaskManager.API
dotnet run
```

La API estará disponible en `http://localhost:5041`

### 4. Ver documentación
http://localhost:5041/swagger

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/Tareas | Lista todas las tareas |
| GET | /api/Tareas/filtrar?estado=&prioridad= | Filtra tareas |
| GET | /api/Tareas/{id} | Detalle de una tarea |

## Decisiones técnicas

**¿Por qué Clean Architecture?**
Permite separar responsabilidades claramente. La lógica de negocio en Application no depende de la base de datos ni del framework HTTP.

**¿Por qué Dapper en vez de EF Core?**
El reto pide usar stored procedures. Dapper es ideal para esto porque ejecuta SQL directo sin abstracciones innecesarias.

**¿Por qué PostgreSQL?**
Es open source, no requiere licencia y es fácil de levantar con Docker.
