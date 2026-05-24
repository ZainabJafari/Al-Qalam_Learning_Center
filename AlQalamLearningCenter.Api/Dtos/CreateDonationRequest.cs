using AlQalamLearningCenter.Api.Models;

namespace AlQalamLearningCenter.Api.Dtos;

public class CreateDonationRequest
{
    public int AmountMinor { get; set; }
    public string Currency { get; set; } = "USD";
    public DonationFrequency Frequency { get; set; } = DonationFrequency.OneTime;

    public string? DonorName { get; set; }
    public string? DonorEmail { get; set; }
    public string? DonorCountry { get; set; }
    public string? Message { get; set; }
}
