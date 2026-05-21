# TaskManager - Frontend Mobile

Aplicación móvil desarrollada con React Native CLI para la gestión de tareas.

## Stack Tecnológico

- React Native 0.85 (CLI)
- TypeScript
- React Navigation (navegación entre pantallas)
- Axios (peticiones HTTP)

## Arquitectura

El proyecto sigue Feature-Based Architecture:
src/
├── features/
│   └── tasks/
│       ├── screens/     → Pantallas (Lista, Filtro, Detalle)
│       ├── hooks/       → Lógica y conexión con servicios
│       ├── services/    → Llamadas HTTP al backend
│       ├── components/  → Componentes reutilizables
│       └── types/       → Tipos TypeScript
└── shared/
├── api/             → Configuración base de Axios
├── navigation/      → Configuración de rutas
└── constants/       → Constantes globales

## Requisitos previos

- Node.js 20+
- Java JDK 17
- Android Studio
- React Native CLI

## Configuración y ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar Metro

```bash
npx react-native start
```

### 3. Ejecutar en Android

```bash
npx react-native run-android
```

## Pantallas

| Pantalla | Descripción |
|----------|-------------|
| Lista de tareas | Muestra todas las tareas con prioridad y estado |
| Filtrado | Filtra tareas por estado y/o prioridad |
| Detalle | Muestra toda la información de una tarea |

## Decisiones técnicas

**¿Por qué Feature-Based Architecture?**
Organiza el código por funcionalidad en lugar de por tipo de archivo. Cada feature es autocontenida y escalable. Si se agrega un nuevo módulo, solo se crea una nueva carpeta en features/ sin tocar lo existente.

**¿Por qué React Native CLI en vez de Expo?**
El reto pide explícitamente React Native CLI. Además permite mayor control sobre el proyecto y es el estándar en proyectos profesionales.

**¿Por qué sin UI Kit?**
El reto lo indica explícitamente. Permite demostrar habilidad para construir componentes propios reutilizables.