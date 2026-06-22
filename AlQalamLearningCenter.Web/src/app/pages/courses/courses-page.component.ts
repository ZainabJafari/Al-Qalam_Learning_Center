import { Component } from '@angular/core';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';
import { courseCategories } from '../../data/course-categories';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [SiteNavbarComponent],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
  readonly heroImageSrc = '/images/class.JPG';
  readonly heroImageAlt = 'Students in a classroom';

  readonly categories = courseCategories;

  readonly totalCourseCount = this.categories.reduce(
    (total, category) => total + category.courses.length,
    0
  );
}

