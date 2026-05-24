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
        });
    }
}
