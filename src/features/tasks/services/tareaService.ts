// tareaService.ts
// Servicio que hace las llamadas HTTP al backend.
// Conecta con los endpoints de la API REST.

import axiosInstance from '../../../shared/api/axiosConfig';

// Tipo de tarea que devuelve el backend
export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: string;
  estado: string;
  creadoEn: string;
  actualizadoEn: string;
}

// Obtiene todas las tareas
export const obtenerTareas = async (): Promise<Tarea[]> => {
  const response = await axiosInstance.get('/Tareas');
  return response.data;
};

// Filtra tareas por estado y/o prioridad
export const filtrarTareas = async (
  estado?: string,
  prioridad?: string,
): Promise<Tarea[]> => {
  const response = await axiosInstance.get('/Tareas/filtrar', {
    params: {estado, prioridad},
  });
  return response.data;
};

// Obtiene el detalle de una tarea por ID
export const obtenerTareaPorId = async (id: number): Promise<Tarea> => {
  const response = await axiosInstance.get(`/Tareas/${id}`);
  return response.data;
};