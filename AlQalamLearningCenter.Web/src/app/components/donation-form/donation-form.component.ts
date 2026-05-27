import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, switchMap } from 'rxjs';
import { DonationService } from '../../services/donation.service';
import { CreateDonationRequest, DonationFrequency } from '../../types/donation.models';

@Component({
  selector: 'app-donation-form',
  imports: [FormsModule],
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.scss'
})
export class DonationFormComponent {
  isDonationLoading = false;
  donationError = '';
  selectedAmountMinor = 2500;
  selectedFrequency: DonationFrequency = 'OneTime';
  donorName = '';
  donorEmail = '';
  donorMessage = '';

  constructor(private readonly donationService: DonationService) {}

  selectAmount(amountMinor: number): void {
    this.selectedAmountMinor = amountMinor;
  }

  selectFrequency(frequency: DonationFrequency): void {
    this.selectedFrequency = frequency;
  }

  get selectedAmountLabel(): string {
    return `$${this.selectedAmountMinor / 100}`;
  }

  get selectedFrequencyLabel(): string {
    if (this.selectedFrequency === 'Monthly') {
      return 'monthly';
    }

    if (this.selectedFrequency === 'Yearly') {
      return 'yearly';
    }

    return 'one-time';
  }

  get trimmedDonorEmail(): string {
    return this.donorEmail.trim();
  }

  startDonation(): void {
    this.isDonationLoading = true;
    this.donationError = '';

    const request: CreateDonationRequest = {
      amountMinor: this.selectedAmountMinor,
      currency: 'USD',
      frequency: this.selectedFrequency,
      donorName: this.toOptionalText(this.donorName),
      donorEmail: this.toOptionalText(this.donorEmail),
      donorCountry: null,
      message: this.toOptionalText(this.donorMessage)
    };

    this.donationService.createDonation(request)
      .pipe(
        switchMap((donation) => this.donationService.createCheckout(donation.id)),
        finalize(() => {
          this.isDonationLoading = false;
        })
      )
      .subscribe({
        next: (checkout) => {
          window.location.href = checkout.checkoutUrl;
        },
        error: () => {
          this.donationError = 'Could not start donation checkout. Please try again.';
        }
      });
  }

  private toOptionalText(value: string): string | null {
    const text = value.trim();

    return text.length > 0 ? text : null;
  }
}
