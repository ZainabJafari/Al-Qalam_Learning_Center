using AlQalamLearningCenter.Api.Interfaces;
using AlQalamLearningCenter.Api.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace AlQalamLearningCenter.Api.Controllers;

[ApiController]
[Route("api/stripe/webhook")]
public class StripeWebhookController : ControllerBase
{
    private const string CheckoutSessionCompleted = "checkout.session.completed";

    private readonly IDonationService _donationService;
    private readonly StripeSettings _stripeSettings;

    public StripeWebhookController(
        IDonationService donationService,
        IOptions<StripeSettings> stripeSettings)
    {
        _donationService = donationService;
        _stripeSettings = stripeSettings.Value;
    }

    [HttpPost]
    public async Task<IActionResult> Handle()
    {
        if (string.IsNullOrWhiteSpace(_stripeSettings.WebhookSecret))
        {
            return BadRequest(new
            {
                message = "Stripe webhook secret is not configured."
            });
        }

        var json = await new StreamReader(Request.Body).ReadToEndAsync();
        var signatureHeader = Request.Headers["Stripe-Signature"].ToString();

        Event stripeEvent;

        try
        {
            stripeEvent = EventUtility.ConstructEvent(
                json,
                signatureHeader,
                _stripeSettings.WebhookSecret);
        }
        catch (StripeException)
        {
            return BadRequest();
        }

        if (await _donationService.HasProcessedStripeEventAsync(stripeEvent.Id))
        {
            return Ok();
        }

        if (stripeEvent.Type == CheckoutSessionCompleted)
        {
            var session = stripeEvent.Data.Object as Session;

            if (!string.IsNullOrWhiteSpace(session?.Id))
            {
                await _donationService.MarkPaidByStripeCheckoutSessionIdAsync(
                    session.Id);
            }
        }

        await _donationService.RecordProcessedStripeEventAsync(
            stripeEvent.Id,
            stripeEvent.Type);

        return Ok();
    }
}
