import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';
import { courseCategories } from '../../data/course-categories';
import { TranslatePipe } from '../../i18n/translate.pipe';

type CourseSummary = {
  readonly id: string;
  readonly title: string;
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
export class HomePageComponent {
  title = 'Al Qalam Learning Center';

  readonly courseSummaries: readonly CourseSummary[] = courseCategories.map((category) => ({
    id: category.id,
    title: category.title,
    imageSrc: category.imageSrc,
    courseCount: category.courses.length
  }));
}

