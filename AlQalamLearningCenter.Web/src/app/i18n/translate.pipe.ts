import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language.service';
import { TranslationKey } from './translations';

@Pipe({
  name: 't',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private readonly languageService: LanguageService) {}

  transform(key: TranslationKey | string): string {
    return this.languageService.translate(key as TranslationKey);
  }
}
