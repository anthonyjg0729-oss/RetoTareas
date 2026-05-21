# TaskManager - Frontend Mobile

Aplicación móvil desarrollada con React Native CLI para la gestión de tareas.

## Stack Tecnológico

- React Native 0.85 (CLI)
- TypeScript
- React Navigation (navegación entre pantallas)
- Axios (peticiones HTTP)

## Instrucciones de Setup y Ejecución

### Requisitos previos

- Node.js 20+
- Java JDK 17
- Android Studio
- React Native CLI

### 1. Clonar el repositorio

```bash
git clone https://github.com/anthonyjg0729-oss/RetoTareas.git
cd RetoTareas
git checkout feature/frontend-base
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Levantar Metro

```bash
npx react-native start
```

### 4. Ejecutar en Android

```bash
npx react-native run-android
```

> ⚠️ El backend debe estar corriendo en `http://localhost:5041` antes de iniciar la app.

## Pantallas

| Pantalla | Descripción |
|----------|-------------|
| Lista de tareas | Muestra todas las tareas con prioridad y estado |
| Filtrado | Filtra tareas por estado y/o prioridad |
| Detalle | Muestra toda la información de una tarea |

---

## Documentación Técnica

### Diagrama de Arquitectura Frontend (Feature-Based)
src/
├── features/                  # Módulos por funcionalidad
│   └── tasks/
│       ├── screens/           # Pantallas (Lista, Filtro, Detalle)
│       ├── hooks/             # Lógica y conexión con servicios
│       ├── services/          # Llamadas HTTP al backend (Axios)
│       ├── components/        # Componentes reutilizables
│       └── types/             # Tipos TypeScript
│
└── shared/                    # Compartido entre features
├── api/                   # Configuración base de Axios
├── navigation/            # Configuración de rutas (React Navigation)
└── constants/             # Constantes globales

### Diagrama de Comunicación (App ↔ API ↔ DB)
┌─────────────────────────────────────────────────────────┐
│                     React Native App                    │
│                                                         │
│  ListaTareaScreen → useTareas() → tareaService.ts       │
│  FiltroTareaScreen → useFiltrarTareas() → tareaService  │
│  DetalleTareaScreen → obtenerTareaPorId() → tareaService│
└─────────────────────┬───────────────────────────────────┘
│ Axios HTTP
│ http://10.0.2.2:5041/api
▼
┌─────────────────────────────────────────────────────────┐
│                   .NET 8 Web API                        │
│                                                         │
│  GET /api/Tareas          → TareasController            │
│  GET /api/Tareas/filtrar  → TareasController            │
│  GET /api/Tareas/{id}     → TareasController            │
└─────────────────────┬───────────────────────────────────┘
│ Dapper + Stored Procedures
▼
┌─────────────────────────────────────────────────────────┐
│                PostgreSQL (Docker:5432)                  │
│                                                         │
│  obtener_tareas()                                       │
│  filtrar_tareas(estado, prioridad)                      │
│  obtener_tarea_por_id(id)                               │
└─────────────────────────────────────────────────────────┘

### Justificación de Decisiones Técnicas

**¿Por qué Feature-Based Architecture?**
Organiza el código por funcionalidad en lugar de por tipo de archivo. Cada feature es autocontenida: si se agrega un módulo de "proyectos", solo se crea una carpeta nueva en `features/` sin tocar el código existente.

**¿Por qué React Native CLI y no Expo?**
El reto lo indica explícitamente. Además, React Native CLI permite mayor control sobre el proyecto y es el estándar en aplicaciones móviles profesionales de producción.

**¿Por qué sin UI Kit?**
El reto lo indica explícitamente. Permite demostrar la habilidad para construir componentes propios reutilizables sin depender de librerías externas de diseño.

**¿Por qué Axios?**
Es la librería HTTP más usada en proyectos React Native profesionales. Permite configurar una instancia base con la URL del backend, simplificando todas las llamadas HTTP del proyecto.

**¿Por qué TypeScript?**
Agrega tipado estático al proyecto, reduciendo errores en tiempo de desarrollo. Es el estándar en proyectos React Native de producción.