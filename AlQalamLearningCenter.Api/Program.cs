using AlQalamLearningCenter.Api.Data;
using AlQalamLearningCenter.Api.Interfaces;
using AlQalamLearningCenter.Api.Options;
using AlQalamLearningCenter.Api.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(
    options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString(
                "DefaultConnection")));

builder.Services.AddScoped<IDonationService, DonationService>();
builder.Services.AddScoped<IStripeCheckoutService, StripeCheckoutService>();

builder.Services.Configure<StripeSettings>(
    builder.Configuration.GetSection("Stripe"));

const string frontendCorsPolicy = "FrontendCorsPolicy";
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>()
    ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(frontendCorsPolicy);

app.UseHttpsRedirection();

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "ok",
        service = "AlQalamLearningCenter.Api",
        timestamp = DateTimeOffset.UtcNow
    });
})
.WithName("HealthCheck");

app.MapControllers();

app.Run();
