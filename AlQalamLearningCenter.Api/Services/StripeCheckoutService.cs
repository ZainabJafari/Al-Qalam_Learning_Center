using AlQalamLearningCenter.Api.Data;
using AlQalamLearningCenter.Api.Interfaces;
using AlQalamLearningCenter.Api.Models;
using AlQalamLearningCenter.Api.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace AlQalamLearningCenter.Api.Services;

public class StripeCheckoutService : IStripeCheckoutService
{
    private const string DonationProductName = "Donation to Al-Qalam Learning Center";

    private readonly ApplicationDbContext _dbContext;
    private readonly StripeSettings _stripeSettings;
    private readonly SessionService _sessionService;

    public StripeCheckoutService(
        ApplicationDbContext dbContext,
        IOptions<StripeSettings> stripeSettings)
    {
        _dbContext = dbContext;
        _stripeSettings = stripeSettings.Value;
        _sessionService = new SessionService();
    }

    public async Task<string> CreateCheckoutUrlAsync(Guid donationId)
    {
        EnsureStripeSettingsAreConfigured();

        var donation = await _dbContext.Donations
            .FirstOrDefaultAsync(donation => donation.Id == donationId);

        if (donation is null)
        {
            throw new KeyNotFoundException("Donation was not found.");
        }

        if (donation.Status != DonationStatus.Pending)
        {
            throw new InvalidOperationException("Only pending donations can start checkout.");
        }

        var options = CreateSessionOptions(donation);
        var requestOptions = new RequestOptions
        {
            ApiKey = _stripeSettings.SecretKey
        };

        var session = await _sessionService.CreateAsync(options, requestOptions);

        donation.StripeCheckoutSessionId = session.Id;
        await _dbContext.SaveChangesAsync();

        return session.Url
            ?? throw new InvalidOperationException("Stripe did not return a checkout URL.");
    }

    private SessionCreateOptions CreateSessionOptions(Donation donation)
    {
        return new SessionCreateOptions
        {
            Mode = GetCheckoutMode(donation.Frequency),
            ClientReferenceId = donation.Id.ToString(),
            CustomerEmail = donation.DonorEmail,
            SuccessUrl = BuildReturnUrl(_stripeSettings.SuccessUrl, donation.Id),
            CancelUrl = BuildReturnUrl(_stripeSettings.CancelUrl, donation.Id),
            Metadata = new Dictionary<string, string>
            {
                ["donationId"] = donation.Id.ToString()
            },
            LineItems =
            [
                new SessionLineItemOptions
                {
                    Quantity = 1,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = donation.Currency.ToLowerInvariant(),
                        UnitAmount = donation.AmountMinor,
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = DonationProductName
                        },
                        Recurring = CreateRecurringOptions(donation.Frequency)
                    }
                }
            ]
        };
    }

    private static string GetCheckoutMode(DonationFrequency frequency)
    {
        return frequency == DonationFrequency.OneTime ? "payment" : "subscription";
    }

    private static SessionLineItemPriceDataRecurringOptions? CreateRecurringOptions(
        DonationFrequency frequency)
    {
        return frequency switch
        {
            DonationFrequency.Monthly => new SessionLineItemPriceDataRecurringOptions
            {
                Interval = "month"
            },
            DonationFrequency.Yearly => new SessionLineItemPriceDataRecurringOptions
            {
                Interval = "year"
            },
            _ => null
        };
    }

    private static string BuildReturnUrl(string baseUrl, Guid donationId)
    {
        var separator = baseUrl.Contains('?') ? "&" : "?";

        return $"{baseUrl}{separator}donationId={donationId}&session_id={{CHECKOUT_SESSION_ID}}";
    }

    private void EnsureStripeSettingsAreConfigured()
    {
        if (string.IsNullOrWhiteSpace(_stripeSettings.SecretKey))
        {
            throw new InvalidOperationException("Stripe secret key is not configured.");
        }

        if (string.IsNullOrWhiteSpace(_stripeSettings.SuccessUrl))
        {
            throw new InvalidOperationException("Stripe success URL is not configured.");
        }

        if (string.IsNullOrWhiteSpace(_stripeSettings.CancelUrl))
        {
            throw new InvalidOperationException("Stripe cancel URL is not configured.");
        }
    }
}
