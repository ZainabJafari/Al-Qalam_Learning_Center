import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
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
export class SiteNavbarComponent implements OnInit {
  @HostBinding('class.is-scrolled') isScrolled = false;

  constructor(private readonly languageService: LanguageService) {}

  ngOnInit(): void {
    this.updateScrollState();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    const isScrolled = window.scrollY > 32;

    if (isScrolled !== this.isScrolled) {
      this.isScrolled = isScrolled;
    }
  }
}
