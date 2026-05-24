using AlQalamLearningCenter.Api.Dtos;

namespace AlQalamLearningCenter.Api.Interfaces;

public interface IDonationService
{
    Task<DonationResponse> CreateAsync(CreateDonationRequest request);
    Task<DonationResponse?> GetByIdAsync(Guid id);
}
