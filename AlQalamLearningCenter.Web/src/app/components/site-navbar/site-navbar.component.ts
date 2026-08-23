import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-site-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.scss']
})
export class SiteNavbarComponent {
  isMobileMenuOpen = false;

  constructor(private readonly languageService: LanguageService) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.closeMobileMenu();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 720) {
      this.closeMobileMenu();
    }
  }
}
