import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, switchMap, take, takeWhile, timer } from 'rxjs';
import { LanguageService } from '../../i18n/language.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { DonationService } from '../../services/donation.service';
import { DonationFrequency, DonationResponse } from '../../types/donation.models';

@Component({
  selector: 'app-donation-success-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './donation-success-page.component.html',
  styleUrl: './donation-success-page.component.scss'
})
export class DonationSuccessPageComponent {
  donation$: Observable<DonationResponse | null>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly donationService: DonationService,
    private readonly languageService: LanguageService
  ) {
    this.donation$ = this.route.queryParamMap.pipe(
      map((params) => params.get('donationId')),
      switchMap((donationId) => {
        if (!donationId) {
          return of(null);
        }

        return timer(0, 2000).pipe(
          switchMap(() => this.donationService.getDonation(donationId).pipe(
            catchError(() => of(null))
          )),
          takeWhile((donation) => donation?.status === 'Pending', true),
          take(8)
        );
      })
    );
  }

  formatAmount(amountMinor: number, currency: string): string {
    return new Intl.NumberFormat(this.languageService.locale(), {
      style: 'currency',
      currency
    }).format(amountMinor / 100);
  }

  formatFrequency(frequency: DonationFrequency): string {
    if (frequency === 'Monthly') {
      return this.languageService.translate('donationForm.monthly');
    }

    if (frequency === 'Yearly') {
      return this.languageService.translate('donationForm.yearly');
    }

    return this.languageService.translate('donationForm.oneTime');
  }

  formatStatus(status: DonationResponse['status']): string {
    if (status === 'Paid') {
      return this.languageService.translate('success.paid');
    }

    if (status === 'Pending') {
      return this.languageService.translate('success.pending');
    }

    return status;
  }
}
