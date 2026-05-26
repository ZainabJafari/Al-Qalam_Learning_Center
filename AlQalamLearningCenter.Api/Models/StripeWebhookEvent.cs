namespace AlQalamLearningCenter.Api.Models;

public class StripeWebhookEvent
{
    public Guid Id { get; set; }
    public string StripeEventId { get; set; } = string.Empty;
    public string EventType { get; set; } = string.Empty;
    public DateTimeOffset ProcessedAt { get; set; } = DateTimeOffset.UtcNow;
}
