// TareaRepository.cs
// Implementación concreta del repositorio.
// Aquí usamos Dapper para llamar a los stored procedures de PostgreSQL.

using Dapper;
using Npgsql;
using TaskManager.Application.Interfaces;
using TaskManager.Domain.Entities;

namespace TaskManager.Infrastructure.Repositories;

public class TareaRepository : ITareaRepository
{
    // Cadena de conexión a PostgreSQL
    private readonly string _connectionString;

    public TareaRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    // Crea una nueva conexión a la base de datos
    private NpgsqlConnection CrearConexion() => new NpgsqlConnection(_connectionString);

    // Llama al stored procedure obtener_tareas()
    public async Task<IEnumerable<Tarea>> ObtenerTodas()
    {
        using var conn = CrearConexion();
        return await conn.QueryAsync<Tarea>(
            "SELECT * FROM obtener_tareas()",
            commandType: System.Data.CommandType.Text
        );
    }

    // Llama al stored procedure filtrar_tareas(estado, prioridad)
    public async Task<IEnumerable<Tarea>> Filtrar(string? estado, string? prioridad)
    {
        using var conn = CrearConexion();
        return await conn.QueryAsync<Tarea>(
            "SELECT * FROM filtrar_tareas(@estado, @prioridad)",
            new { estado, prioridad },
            commandType: System.Data.CommandType.Text
        );
    }

    // Llama al stored procedure obtener_tarea_por_id(id)
    public async Task<Tarea?> ObtenerPorId(int id)
    {
        using var conn = CrearConexion();
        return await conn.QueryFirstOrDefaultAsync<Tarea>(
            "SELECT * FROM obtener_tarea_por_id(@id)",
            new { id },
            commandType: System.Data.CommandType.Text
        );
    }
}