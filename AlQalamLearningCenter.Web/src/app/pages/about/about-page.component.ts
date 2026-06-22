import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, SiteNavbarComponent, TranslatePipe],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {}

