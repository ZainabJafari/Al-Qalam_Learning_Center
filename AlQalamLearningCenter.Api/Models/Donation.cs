namespace AlQalamLearningCenter.Api.Models;

public class Donation
{
    public Guid Id { get; set; }

    public int AmountMinor { get; set; }
    public string Currency { get; set; } = "USD";

    public DonationFrequency Frequency { get; set; } = DonationFrequency.OneTime;
    public DonationStatus Status { get; set; } = DonationStatus.Pending;

    public string? DonorName { get; set; }
    public string? DonorEmail { get; set; }
    public string? DonorCountry { get; set; }

    public string? Message { get; set; }

    public bool CoverProcessingFee { get; set; }
    public int? ProcessingFeeMinor { get; set; }
    public int TotalAmountMinor { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? PaidAt { get; set; }
}
