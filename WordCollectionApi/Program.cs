using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using WordCollectionApi.Models;
using WordCollectionApi.Services;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Read the configuration file (appsettings.json)
var configuration = builder.Configuration;

// Set up Serilog to read from the configuration file
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)  // Read from appsettings.json
    .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day)  // Log to a file
    .CreateLogger();

// Add logging configuration using Serilog
builder.Host.UseSerilog();

// Configure DB settings from appsettings.json
builder.Services.Configure<DbSettings>(
    builder.Configuration.GetSection("StoreDatabase")
    );

// Setup Mongo Client to expose DB to API
builder.Services.AddSingleton<IMongoClient>(x =>
{
    var dbSettings = x.GetRequiredService<IOptions<DbSettings>>().Value;
    return new MongoClient(dbSettings.ConnectionString);
});

// Expose DB to Mongo Client, allowing access
builder.Services.AddSingleton<IMongoDatabase>(x =>
{
    var dbSettings = x.GetRequiredService<IOptions<DbSettings>>().Value;
    var client = x.GetRequiredService<IMongoClient>();
    return client.GetDatabase(dbSettings.DatabaseName);
});

// Register WordService
builder.Services.AddSingleton<WordService>();

// Define CORS policy
builder.Services.AddCors(policy =>
{
    policy.AddPolicy("AllowAngularWebApp",
            policyBuilder =>
            {
                policyBuilder.WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader();
            }
        );
});

// MVC / Swashbuckle stuff
builder.Services.AddControllers()
    .AddJsonOptions(
    options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Use Serilog for request logging
app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Swagger / CORS / Middleware stuff
app.UseHttpsRedirection();

app.UseCors("AllowAngularWebApp");

app.UseAuthorization();

app.MapControllers();

app.Run();

app.Lifetime.ApplicationStopped.Register(Log.CloseAndFlush);
