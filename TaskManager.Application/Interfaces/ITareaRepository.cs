// ITareaRepository.cs
// Interfaz que define el contrato del repositorio de tareas.
using TaskManager.Domain.Entities;

namespace TaskManager.Application.Interfaces;

public interface ITareaRepository
{
    // Obtiene todas las tareas
    Task<IEnumerable<Tarea>> ObtenerTodas();

    // Filtra tareas por estado o prioridad (parámetros opcionales)
    Task<IEnumerable<Tarea>> Filtrar(string? estado, string? prioridad);

    // Obtiene el detalle de una tarea por su ID
    Task<Tarea?> ObtenerPorId(int id);
}