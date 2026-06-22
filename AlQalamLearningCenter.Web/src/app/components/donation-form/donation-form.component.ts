import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, switchMap } from 'rxjs';
import { LanguageService } from '../../i18n/language.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { DonationService } from '../../services/donation.service';
import { CreateDonationRequest, DonationFrequency } from '../../types/donation.models';

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss']
})
export class DonationFormComponent {
  isDonationLoading = false;
  donationErrorKey = '';
  selectedAmountMinor = 2500;
  selectedFrequency: DonationFrequency = 'OneTime';
  donorName = '';
  donorEmail = '';
  donorMessage = '';

  constructor(
    private readonly donationService: DonationService,
    private readonly languageService: LanguageService
  ) {}

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
      return this.languageService.translate('donationForm.monthlyLower');
    }

    if (this.selectedFrequency === 'Yearly') {
      return this.languageService.translate('donationForm.yearlyLower');
    }

    return this.languageService.translate('donationForm.oneTimeLower');
  }

  get trimmedDonorEmail(): string {
    return this.donorEmail.trim();
  }

  startDonation(): void {
    this.isDonationLoading = true;
    this.donationErrorKey = '';

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
          this.donationErrorKey = 'donationForm.checkoutError';
        }
      });
  }

  private toOptionalText(value: string): string | null {
    const text = value.trim();

    return text.length > 0 ? text : null;
  }
}

