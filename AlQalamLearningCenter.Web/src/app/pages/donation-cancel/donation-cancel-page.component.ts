import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-donation-cancel-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './donation-cancel-page.component.html',
  styleUrls: ['./donation-cancel-page.component.scss']
})
export class DonationCancelPageComponent {}

