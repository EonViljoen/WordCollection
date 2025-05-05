using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WordCollectionApi.Models;
using WordCollectionApi.Services;
using Serilog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using WordCollectionApi.Common;
using Microsoft.AspNetCore.Authentication;
using AspNet.Security.OAuth.GitHub;


var builder = WebApplication.CreateBuilder(args);

// Read the configuration file (appsettings.json)
var configuration = builder.Configuration;

// Set up Serilog to read from the configuration file
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)  // Read from appsettings.json
    .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day)  // Log to a file
    .WriteTo.Console()
    .CreateLogger();

// Add logging configuration using Serilog
builder.Host.UseSerilog();

// Configure DB settings from appsettings.json
builder.Services.Configure<DbSettings>(builder.Configuration.GetSection("StoreDatabase"));

// Setup Mongo Client to expose DB to API
builder.Services.AddSingleton<IMongoClient>(x =>
{
    var dbSettings = x.GetRequiredService<IOptions<DbSettings>>().Value;
    var mongoConnectionString = Environment.GetEnvironmentVariable("MONGO_URI")
        ?? configuration["StoreDatabase:ConnectionString"];


    return new MongoClient(mongoConnectionString);
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
    policy.AddPolicy("AllowGHPages",
            policyBuilder =>
            {
                policyBuilder.WithOrigins("https://eonviljoen.github.io")
                .AllowAnyMethod()
                .AllowAnyHeader();
            }
        );
    policy.AddPolicy("AllowLocalhost",
        policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// MVC + Swashbuckle + Swagger
builder.Services.AddControllers()
    .AddJsonOptions(
    options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient();

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

app.UseCors("AllowGHPages");
//app.UseCors("AllowLocalhost");

app.MapControllers();

try
{
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}