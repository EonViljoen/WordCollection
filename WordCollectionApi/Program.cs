using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using MongoDB.Driver;
using WordCollectionApi.Models;
using WordCollectionApi.Services;

var builder = WebApplication.CreateBuilder(args);

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

// MVC / Swashbuckle stuff
builder.Services.AddControllers()
    .AddJsonOptions(
    options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Swagger / CORS / Middleware stuff
app.UseHttpsRedirection();

app.UseCors(
        option => option.AllowAnyOrigin()
    );

app.UseAuthorization();

app.MapControllers();

app.Run();
