using AlQalamLearningCenter.Api.Data;
using AlQalamLearningCenter.Api.Dtos;
using AlQalamLearningCenter.Api.Interfaces;
using AlQalamLearningCenter.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AlQalamLearningCenter.Api.Services;

public class DonationService : IDonationService
{
    private readonly ApplicationDbContext _dbContext;

    public DonationService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<DonationResponse> CreateAsync(
        CreateDonationRequest request)
    {
        var donation = new Donation
        {
            Id = Guid.NewGuid(),
            AmountMinor = request.AmountMinor,
            Currency = request.Currency.Trim().ToUpperInvariant(),
            Frequency = request.Frequency,
            Status = DonationStatus.Pending,
            DonorName = NormalizeOptionalText(request.DonorName),
            DonorEmail = NormalizeOptionalText(request.DonorEmail),
            DonorCountry = NormalizeOptionalCode(request.DonorCountry),
            Message = NormalizeOptionalText(request.Message),
            CreatedAt = DateTimeOffset.UtcNow
        };

        _dbContext.Donations.Add(donation);
        await _dbContext.SaveChangesAsync();

        return ToResponse(donation);
    }

    public async Task<DonationResponse?> GetByIdAsync(Guid id)
    {
        var donation = await _dbContext.Donations
            .AsNoTracking()
            .FirstOrDefaultAsync(donation => donation.Id == id);

        return donation is null ? null : ToResponse(donation);
    }

    private static DonationResponse ToResponse(Donation donation)
    {
        return new DonationResponse
        {
            Id = donation.Id,
            AmountMinor = donation.AmountMinor,
            Currency = donation.Currency,
            Frequency = donation.Frequency,
            Status = donation.Status,
            CreatedAt = donation.CreatedAt
        };
    }

    private static string? NormalizeOptionalText(string? value)
    {
        return string.IsNullOrWhiteSpace(value)
            ? null
            : value.Trim();
    }

    private static string? NormalizeOptionalCode(string? value)
    {
        return string.IsNullOrWhiteSpace(value)
            ? null
            : value.Trim().ToUpperInvariant();
    }
}
