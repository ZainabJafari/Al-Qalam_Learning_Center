using AlQalamLearningCenter.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AlQalamLearningCenter.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Donation> Donations => Set<Donation>();
    public DbSet<StripeWebhookEvent> StripeWebhookEvents => Set<StripeWebhookEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Donation>(entity =>
        {
            entity.ToTable("Donations");

            entity.Property(donation => donation.Currency).HasMaxLength(3);
            entity.Property(donation => donation.Frequency).HasConversion<string>().HasMaxLength(20);
            entity.Property(donation => donation.Status).HasConversion<string>().HasMaxLength(20);

            entity.Property(donation => donation.DonorName).HasMaxLength(120);
            entity.Property(donation => donation.DonorEmail).HasMaxLength(254);
            entity.Property(donation => donation.DonorCountry).HasMaxLength(2);
            entity.Property(donation => donation.Message).HasMaxLength(1000);
            entity.Property(donation => donation.StripeCheckoutSessionId).HasMaxLength(255);
        });

        modelBuilder.Entity<StripeWebhookEvent>(entity =>
        {
            entity.ToTable("StripeWebhookEvents");

            entity.Property(stripeEvent => stripeEvent.StripeEventId).HasMaxLength(255);
            entity.Property(stripeEvent => stripeEvent.EventType).HasMaxLength(100);

            entity.HasIndex(stripeEvent => stripeEvent.StripeEventId)
                .IsUnique();
        });
    }
}
