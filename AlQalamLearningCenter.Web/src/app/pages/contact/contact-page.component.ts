import { Component } from '@angular/core';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [SiteNavbarComponent, TranslatePipe],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {}
