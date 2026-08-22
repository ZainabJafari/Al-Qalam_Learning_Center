import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';
import { courseCategories } from '../../data/course-categories';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [RouterLink, SiteNavbarComponent, TranslatePipe],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('programSection') private readonly programSections?: QueryList<ElementRef<HTMLElement>>;

  readonly heroImageSrc = '/images/alisa.jpg';

  readonly categories = courseCategories;

  readonly visibleProgramIds = new Set<string>();

  readonly totalCourseCount = this.categories.reduce(
    (total, category) => total + category.courses.length,
    0
  );

  private programObserver?: IntersectionObserver;

  constructor(private readonly ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const sections = this.programSections?.toArray() ?? [];

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') {
      this.showAllPrograms();
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.programObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }

            const programId = (entry.target as HTMLElement).dataset['programId'];

            if (!programId) {
              continue;
            }

            this.programObserver?.unobserve(entry.target);
            this.ngZone.run(() => {
              this.visibleProgramIds.add(programId);
            });
          }
        },
        {
          rootMargin: '0px 0px -16% 0px',
          threshold: 0.2
        }
      );

      for (const section of sections) {
        this.programObserver.observe(section.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    this.programObserver?.disconnect();
  }

  private showAllPrograms(): void {
    for (const category of this.categories) {
      this.visibleProgramIds.add(category.id);
    }
  }
}
