export type DonationFrequency = 'OneTime' | 'Monthly' | 'Yearly';
export type DonationStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Cancelled';

export interface CreateDonationRequest {
  // Money is sent in the smallest currency unit, e.g. 2500 = $25.00.
  amountMinor: number;
  currency: string;
  frequency: DonationFrequency;
  donorName?: string | null;
  donorEmail?: string | null;
  donorCountry?: string | null;
  message?: string | null;
}

export interface DonationResponse {
  id: string;
  amountMinor: number;
  currency: string;
  frequency: DonationFrequency;
  status: DonationStatus;
  createdAt: string;
}

export interface CreateCheckoutSessionResponse {
  // Frontend redirects the donor to this Stripe-hosted payment page.
  checkoutUrl: string;
}

