# TaskManager - Backend API

API REST desarrollada con .NET 8 usando Clean Architecture para la gestión de tareas.

## Stack Tecnológico

- .NET 8 Web API
- PostgreSQL 16
- Dapper (ORM ligero para stored procedures)
- Docker (contenedor de base de datos)
- Swagger (documentación y testing)

## Instrucciones de Setup y Ejecución

### Requisitos previos

- .NET 8 SDK
- Docker Desktop

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

### 4. Ver documentación Swagger
http://localhost:5041/swagger

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/Tareas | Lista todas las tareas |
| GET | /api/Tareas/filtrar?estado=&prioridad= | Filtra tareas |
| GET | /api/Tareas/{id} | Detalle de una tarea |

---

## Documentación Técnica

### Diagrama de Arquitectura Backend (Clean Architecture)
┌─────────────────────────────────────────────┐
│              TaskManager.API                │
│     Controllers · Swagger · CORS · DI       │
└───────────────────┬─────────────────────────┘
│
┌───────────────────▼─────────────────────────┐
│          TaskManager.Application            │
│       Casos de uso · Interfaces             │
└───────────────────┬─────────────────────────┘
│
┌───────────────────▼─────────────────────────┐
│            TaskManager.Domain               │
│        Entidades puras · Sin dependencias   │
└─────────────────────────────────────────────┘
▲
┌───────────────────┴─────────────────────────┐
│        TaskManager.Infrastructure           │
│     Repositorios · Dapper · PostgreSQL      │
└─────────────────────────────────────────────┘

### Diagrama de Comunicación (App ↔ API ↔ DB)
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  React Native   │         │   .NET 8 API    │         │   PostgreSQL    │
│   (Frontend)    │         │   puerto 5041   │         │  (Docker:5432)  │
└────────┬────────┘         └────────┬────────┘         └────────┬────────┘
│                           │                            │
│   GET /api/Tareas         │                            │
│──────────────────────────►│                            │
│                           │  SELECT * FROM             │
│                           │  obtener_tareas()          │
│                           │───────────────────────────►│
│                           │                            │
│                           │   Retorna filas            │
│                           │◄───────────────────────────│
│   JSON Response           │                            │
│◄──────────────────────────│                            │
│                           │                            │
│  GET /api/Tareas/filtrar  │                            │
│  ?estado=Pendiente        │                            │
│──────────────────────────►│                            │
│                           │  SELECT * FROM             │
│                           │  filtrar_tareas(           │
│                           │    'Pendiente', NULL)      │
│                           │───────────────────────────►│
│                           │   Retorna filas filtradas  │
│                           │◄───────────────────────────│
│   JSON Response           │                            │
│◄──────────────────────────│                            │

### Justificación de Decisiones Técnicas

**¿Por qué Clean Architecture?**
Permite separar responsabilidades claramente. La lógica de negocio en `Application` no depende de la base de datos ni del framework HTTP. Si mañana cambiamos PostgreSQL por SQL Server, solo tocamos `Infrastructure` sin afectar el resto.

**¿Por qué Dapper y no Entity Framework Core?**
El reto exige el uso de stored procedures. Dapper es ideal para esto porque ejecuta SQL directo sin abstracciones innecesarias, dando control total sobre las queries y respetando los SP ya definidos en la DB.

**¿Por qué PostgreSQL con Docker?**
PostgreSQL es open source, no requiere licencia y es fácil de levantar con Docker. Docker garantiza el mismo entorno en cualquier máquina, facilitando la reproducibilidad del proyecto.

**¿Por qué Swagger?**
Genera documentación interactiva automáticamente desde los controladores. Permite probar los endpoints sin herramientas externas como Postman.

**¿Por qué separar en 4 proyectos y no en carpetas?**
Cada proyecto es un assembly independiente. Esto fuerza las dependencias correctas en tiempo de compilación: `Domain` no puede importar `Infrastructure` aunque se intente, porque no tiene referencia a ese proyecto.