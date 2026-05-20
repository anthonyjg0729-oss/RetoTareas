// Tarea.cs
// Entidad principal del dominio.
namespace TaskManager.Domain.Entities;

public class Tarea
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Prioridad { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public DateTime CreadoEn { get; set; }
    public DateTime ActualizadoEn { get; set; }
}