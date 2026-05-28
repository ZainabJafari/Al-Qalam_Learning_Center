import { Component } from '@angular/core';
import { DonationFormComponent } from '../../components/donation-form/donation-form.component';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-donate-page',
  standalone: true,
  imports: [DonationFormComponent, SiteNavbarComponent, TranslatePipe],
  templateUrl: './donate-page.component.html',
  styleUrl: './donate-page.component.scss'
})
export class DonatePageComponent {}
