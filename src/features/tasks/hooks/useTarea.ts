// useTareas.ts
// Hook personalizado para obtener y filtrar tareas desde el backend.
// Maneja el estado de carga y errores.

import {useState, useEffect, useCallback} from 'react';
import {Tarea, obtenerTareas, filtrarTareas} from '../services/tareaService';

export const useTareas = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarTareas = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerTareas();
      setTareas(data);
    } catch {
      setError('Error al cargar las tareas');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarTareas();
  }, [cargarTareas]);

  return {tareas, cargando, error, recargar: cargarTareas};
};

export const useFiltrarTareas = (estado?: string, prioridad?: string) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtrar = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const estadoParam = estado === 'Todos' ? undefined : estado;
      const prioridadParam = prioridad === 'Todas' ? undefined : prioridad;
      const data = await filtrarTareas(estadoParam, prioridadParam);
      setTareas(data);
    } catch {
      setError('Error al filtrar las tareas');
    } finally {
      setCargando(false);
    }
  }, [estado, prioridad]);

  useEffect(() => {
    filtrar();
  }, [filtrar]);

  return {tareas, cargando, error};
};