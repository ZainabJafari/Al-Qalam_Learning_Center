import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';
import { courseCategories } from '../../data/course-categories';
import { TranslatePipe } from '../../i18n/translate.pipe';
import type { TranslationKey } from '../../i18n/translations';

type CourseSummary = {
  readonly id: string;
  readonly titleKey: TranslationKey;
  readonly imageSrc: string;
  readonly courseCount: number;
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, SiteNavbarComponent, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('educationReality') private readonly educationReality?: ElementRef<HTMLElement>;

  title = 'Al Qalam Learning Center';

  isRealityVisible = false;

  readonly courseSummaries: readonly CourseSummary[] = courseCategories.map((category) => ({
    id: category.id,
    titleKey: category.titleKey,
    imageSrc: category.imageSrc,
    courseCount: category.courses.length
  }));

  private realityObserver?: IntersectionObserver;

  constructor(private readonly ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (!this.educationReality || typeof IntersectionObserver === 'undefined') {
      this.isRealityVisible = true;
      return;
    }

    const realityElement = this.educationReality.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      this.realityObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) {
            return;
          }

          this.realityObserver?.disconnect();
          this.ngZone.run(() => {
            this.isRealityVisible = true;
          });
        },
        {
          rootMargin: '0px 0px -18% 0px',
          threshold: 0.22
        }
      );

      this.realityObserver.observe(realityElement);
    });
  }

  ngOnDestroy(): void {
    this.realityObserver?.disconnect();
  }
}
