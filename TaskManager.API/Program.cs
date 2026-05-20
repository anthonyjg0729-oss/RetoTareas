// Program.cs
// Punto de entrada de la aplicación.
// Aquí configuramos la inyección de dependencias y los middlewares.

using TaskManager.Application.Interfaces;
using TaskManager.Application.UseCases;
using TaskManager.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Cadena de conexión a PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Registramos las dependencias
// El repositorio implementa la interfaz (principio de inversión de dependencias)
builder.Services.AddScoped<ITareaRepository>(sp => new TareaRepository(connectionString!));
builder.Services.AddScoped<TareaUseCases>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuramos CORS para que el frontend pueda consumir la API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.Run();