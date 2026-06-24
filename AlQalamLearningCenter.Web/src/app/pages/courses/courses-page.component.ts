import { Component } from '@angular/core';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';
import { courseCategories } from '../../data/course-categories';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [SiteNavbarComponent, TranslatePipe],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
  readonly heroImageSrc = '/images/alisa.jpg';
  readonly heroImageAlt = 'Students learning together in a classroom';

  readonly categories = courseCategories;

  readonly totalCourseCount = this.categories.reduce(
    (total, category) => total + category.courses.length,
    0
  );
}
