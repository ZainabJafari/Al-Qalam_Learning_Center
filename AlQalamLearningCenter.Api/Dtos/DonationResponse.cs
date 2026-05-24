using AlQalamLearningCenter.Api.Models;

namespace AlQalamLearningCenter.Api.Dtos;

public class DonationResponse
{
    public Guid Id { get; set; }
    public int AmountMinor { get; set; }
    public string Currency { get; set; } = "USD";
    public DonationFrequency Frequency { get; set; }
    public DonationStatus Status { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
