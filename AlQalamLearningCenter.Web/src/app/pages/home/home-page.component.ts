import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteNavbarComponent } from '../../components/site-navbar/site-navbar.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, SiteNavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  title = 'Al Qalam Learning Center';
}
