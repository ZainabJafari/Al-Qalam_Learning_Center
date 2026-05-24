using AlQalamLearningCenter.Api.Data;
using AlQalamLearningCenter.Api.Dtos;
using AlQalamLearningCenter.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace AlQalamLearningCenter.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DonationsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public DonationsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<ActionResult<CreateDonationResponse>> Create(
        CreateDonationRequest request)
    {
        if (request.AmountMinor <= 0)
        {
            return BadRequest(new
            {
                message = "Amount must be greater than zero."
            });
        }

        var currency = NormalizeRequiredCode(request.Currency, 3);

        if (currency is null)
        {
            return BadRequest(new
            {
                message = "Currency must use a 3-letter code, for example USD."
            });
        }

        if (!TryNormalizeOptionalCode(request.DonorCountry, 2, out var donorCountry))
        {
            return BadRequest(new
            {
                message = "Donor country must use a 2-letter code, for example SE."
            });
        }

        var donation = CreateDonation(request, currency, donorCountry);

        _dbContext.Donations.Add(donation);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(
            actionName: nameof(Create),
            routeValues: new { id = donation.Id },
            value: CreateResponse(donation));
    }

    private static Donation CreateDonation(
        CreateDonationRequest request,
        string currency,
        string? donorCountry)
    {
        return new Donation
        {
            Id = Guid.NewGuid(),
            AmountMinor = request.AmountMinor,
            Currency = currency,
            Frequency = request.Frequency,
            Status = DonationStatus.Pending,
            DonorName = NormalizeOptionalText(request.DonorName),
            DonorEmail = NormalizeOptionalText(request.DonorEmail),
            DonorCountry = donorCountry,
            Message = NormalizeOptionalText(request.Message),
            CoverProcessingFee = request.CoverProcessingFee,
            TotalAmountMinor = request.AmountMinor,
            CreatedAt = DateTimeOffset.UtcNow
        };
    }

    private static CreateDonationResponse CreateResponse(Donation donation)
    {
        return new CreateDonationResponse
        {
            Id = donation.Id,
            AmountMinor = donation.AmountMinor,
            Currency = donation.Currency,
            Frequency = donation.Frequency,
            Status = donation.Status,
            TotalAmountMinor = donation.TotalAmountMinor,
            CreatedAt = donation.CreatedAt
        };
    }

    private static string? NormalizeRequiredCode(string? value, int length)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var code = value.Trim().ToUpperInvariant();

        return code.Length == length ? code : null;
    }

    private static bool TryNormalizeOptionalCode(
        string? value,
        int length,
        out string? code)
    {
        code = null;

        if (string.IsNullOrWhiteSpace(value))
        {
            return true;
        }

        code = value.Trim().ToUpperInvariant();

        return code.Length == length;
    }

    private static string? NormalizeOptionalText(string? value)
    {
        return string.IsNullOrWhiteSpace(value)
            ? null
            : value.Trim();
    }
}
