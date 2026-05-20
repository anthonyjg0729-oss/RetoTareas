
// TareasControllers.cs
// Controlador REST que expone los endpoints de tareas.
// Recibe las peticiones HTTP y las delega a los casos de uso.

using Microsoft.AspNetCore.Mvc;
using TaskManager.Application.UseCases;

namespace TaskManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TareasController : ControllerBase
{
    private readonly TareaUseCases _useCases;

    public TareasController(TareaUseCases useCases)
    {
        _useCases = useCases;
    }

    // GET api/tareas
    // Obtiene todas las tareas
    [HttpGet]
    public async Task<IActionResult> ObtenerTodas()
    {
        var tareas = await _useCases.ObtenerTodas();
        return Ok(tareas);
    }

    // GET api/tareas/filtrar?estado=Pendiente&prioridad=Alta
    // Filtra tareas por estado y/o prioridad
    [HttpGet("filtrar")]
    public async Task<IActionResult> Filtrar(
        [FromQuery] string? estado,
        [FromQuery] string? prioridad)
    {
        var tareas = await _useCases.Filtrar(estado, prioridad);
        return Ok(tareas);
    }

    // GET api/tareas/1
    // Obtiene el detalle de una tarea por su ID
    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerPorId(int id)
    {
        var tarea = await _useCases.ObtenerPorId(id);
        if (tarea is null)
            return NotFound(new { mensaje = "Tarea no encontrada" });
        return Ok(tarea);
    }
}