// TareaUseCases.cs
// Casos de uso de la aplicación.
// Aquí vive la lógica de negocio, usando la interfaz del repositorio.

using TaskManager.Application.Interfaces;
using TaskManager.Domain.Entities;

namespace TaskManager.Application.UseCases;

public class TareaUseCases
{
    // Inyectamos la interfaz, no la implementación concreta
    private readonly ITareaRepository _repository;

    public TareaUseCases(ITareaRepository repository)
    {
        _repository = repository;
    }

    // Caso de uso: obtener todas las tareas
    public async Task<IEnumerable<Tarea>> ObtenerTodas()
    {
        return await _repository.ObtenerTodas();
    }

    // Caso de uso: filtrar tareas por estado y/o prioridad
    public async Task<IEnumerable<Tarea>> Filtrar(string? estado, string? prioridad)
    {
        return await _repository.Filtrar(estado, prioridad);
    }

    // Caso de uso: obtener detalle de una tarea
    public async Task<Tarea?> ObtenerPorId(int id)
    {
        return await _repository.ObtenerPorId(id);
    }
}