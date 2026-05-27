import { Component } from '@angular/core';
import { DonationFormComponent } from '../../components/donation-form/donation-form.component';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';

@Component({
  selector: 'app-donate-page',
  imports: [DonationFormComponent, SiteNavbarComponent],
  templateUrl: './donate-page.component.html',
  styleUrl: './donate-page.component.scss'
})
export class DonatePageComponent {}
