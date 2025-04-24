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

// MVC / Swashbuckle stuff
builder.Services.AddControllers()
    .AddJsonOptions(
    options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = false,
//        ValidateAudience = false,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        IssuerSigningKey = new SymmetricSecurityKey(
//            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//    };
//})
//.AddGitHub(options =>
//{
//    options.ClientId = builder.Configuration["GitHub_ClientId"];
//    options.ClientSecret = builder.Configuration["GitHub_ClientSecret"];
//    options.CallbackPath = "/signin-github";

//    options.Events.OnCreatingTicket = async context =>
//    {
//        var email = context.Identity?.FindFirst(ClaimTypes.Email)?.Value;
//        var name = context.Identity?.Name;

//        var jwt = GenerateJwtToken.GenerateToken(email, name, builder);
//        context.Response.Redirect($"https://eonviljoen.github.io/WordCollection/login-success?token={jwt}");
//    };
//});



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

//app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//app.MapGet("/login/github", async (HttpContext context) =>
//{
//    await context.ChallengeAsync("GitHub", new AuthenticationProperties
//    {
//        RedirectUri = "/signin-github"
//    });
//});

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

//app.Lifetime.ApplicationStopped.Register(Log.CloseAndFlush);
