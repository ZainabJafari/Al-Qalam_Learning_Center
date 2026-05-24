using AlQalamLearningCenter.Api.Dtos;
using AlQalamLearningCenter.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AlQalamLearningCenter.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DonationsController : ControllerBase
{
    private readonly IDonationService _donationService;
    private readonly IStripeCheckoutService _stripeCheckoutService;

    public DonationsController(
        IDonationService donationService,
        IStripeCheckoutService stripeCheckoutService)
    {
        _donationService = donationService;
        _stripeCheckoutService = stripeCheckoutService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<DonationResponse>> GetById(Guid id)
    {
        var donation = await _donationService.GetByIdAsync(id);

        return donation is null ? NotFound() : Ok(donation);
    }

    [HttpPost]
    public async Task<ActionResult<DonationResponse>> Create(
        CreateDonationRequest request)
    {
        if (request.AmountMinor <= 0)
        {
            return BadRequest(new
            {
                message = "Amount must be greater than zero."
            });
        }

        if (NormalizeRequiredCode(request.Currency, 3) is null)
        {
            return BadRequest(new
            {
                message = "Currency must use a 3-letter code, for example USD."
            });
        }

        if (!IsValidOptionalCode(request.DonorCountry, 2))
        {
            return BadRequest(new
            {
                message = "Donor country must use a 2-letter code, for example SE."
            });
        }

        var response = await _donationService.CreateAsync(request);

        return CreatedAtAction(
            actionName: nameof(GetById),
            routeValues: new { id = response.Id },
            value: response);
    }

    [HttpPost("{id:guid}/checkout")]
    public async Task<ActionResult<CreateCheckoutSessionResponse>> CreateCheckout(
        Guid id)
    {
        try
        {
            var checkoutUrl = await _stripeCheckoutService.CreateCheckoutUrlAsync(id);

            return Ok(new CreateCheckoutSessionResponse
            {
                CheckoutUrl = checkoutUrl
            });
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new
            {
                message = exception.Message
            });
        }
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

    private static bool IsValidOptionalCode(
        string? value,
        int length)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return true;
        }

        var code = value.Trim().ToUpperInvariant();

        return code.Length == length;
    }
}
