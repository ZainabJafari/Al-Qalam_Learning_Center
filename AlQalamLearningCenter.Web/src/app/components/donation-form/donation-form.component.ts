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
  private readonly minimumDonationMinor = 100;

  isDonationLoading = false;
  donationErrorKey = '';
  selectedAmountMinor = 2500;
  customAmountDollars: number | null = null;
  isCustomAmountSelected = false;
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
    this.customAmountDollars = null;
    this.isCustomAmountSelected = false;
    this.clearAmountError();
  }

  selectCustomAmount(): void {
    this.isCustomAmountSelected = true;
    this.customAmountDollars ??= this.selectedAmountMinor / 100;
    this.setCustomAmount(this.customAmountDollars);
  }

  setCustomAmount(amountDollars: number | null): void {
    this.isCustomAmountSelected = true;
    this.customAmountDollars = amountDollars;
    this.selectedAmountMinor = this.toAmountMinor(amountDollars);
    this.clearAmountError();
  }

  selectFrequency(frequency: DonationFrequency): void {
    this.selectedFrequency = frequency;
  }

  get selectedAmountLabel(): string {
    const wholeDollars = Math.floor(this.selectedAmountMinor / 100);
    const cents = this.selectedAmountMinor % 100;

    return cents === 0
      ? `$${wholeDollars}`
      : `$${wholeDollars}.${cents.toString().padStart(2, '0')}`;
  }

  get hasValidDonationAmount(): boolean {
    return this.selectedAmountMinor >= this.minimumDonationMinor;
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
    this.donationErrorKey = '';

    if (!this.hasValidDonationAmount) {
      this.donationErrorKey = 'donationForm.amountError';
      return;
    }

    this.isDonationLoading = true;

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

  private toAmountMinor(amountDollars: number | null): number {
    if (typeof amountDollars !== 'number' || !Number.isFinite(amountDollars)) {
      return 0;
    }

    return Math.max(0, Math.round(amountDollars * 100));
  }

  private clearAmountError(): void {
    if (this.donationErrorKey === 'donationForm.amountError') {
      this.donationErrorKey = '';
    }
  }
}
