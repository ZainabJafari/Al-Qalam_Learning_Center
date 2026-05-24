namespace AlQalamLearningCenter.Api.Interfaces;

public interface IStripeCheckoutService
{
    Task<string> CreateCheckoutUrlAsync(Guid donationId);
}
