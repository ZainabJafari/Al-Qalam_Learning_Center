import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, computed, effect, signal } from '@angular/core';
import { Language, TranslationKey, translations } from './translations';

const storageKey = 'alqalam-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly selectedLanguage = signal<Language>(this.getInitialLanguage());

  readonly language = this.selectedLanguage.asReadonly();
  readonly direction = computed(() => this.language() === 'fa' ? 'rtl' : 'ltr');
  readonly locale = computed(() => this.language() === 'fa' ? 'fa-AF' : 'en-US');

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    effect(() => {
      const language = this.language();

      this.document.documentElement.lang = language === 'fa' ? 'fa-AF' : 'en';
      this.document.documentElement.dir = this.direction();
      this.persistLanguage(language);
    });
  }

  toggleLanguage(): void {
    this.setLanguage(this.language() === 'en' ? 'fa' : 'en');
  }

  setLanguage(language: Language): void {
    this.selectedLanguage.set(language);
  }

  translate(key: TranslationKey): string {
    return translations[this.language()][key] ?? translations.en[key] ?? key;
  }

  private getInitialLanguage(): Language {
    try {
      const storedLanguage = localStorage.getItem(storageKey);

      if (storedLanguage === 'en' || storedLanguage === 'fa') {
        return storedLanguage;
      }

      if (navigator.language.toLowerCase().startsWith('fa')) {
        return 'fa';
      }
    } catch {
      return 'en';
    }

    return 'en';
  }

  private persistLanguage(language: Language): void {
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // Browsers can block storage; language switching still works for the session.
    }
  }
}
