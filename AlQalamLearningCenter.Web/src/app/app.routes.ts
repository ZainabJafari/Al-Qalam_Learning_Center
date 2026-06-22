import { Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about/about-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { CoursesPageComponent } from './pages/courses/courses-page.component';
import { DonationCancelPageComponent } from './pages/donation-cancel/donation-cancel-page.component';
import { DonationSuccessPageComponent } from './pages/donation-success/donation-success-page.component';
import { DonatePageComponent } from './pages/donate/donate-page.component';
import { HomePageComponent } from './pages/home/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'donate',
    component: DonatePageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'courses',
    component: CoursesPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'donations/success',
    component: DonationSuccessPageComponent
  },
  {
    path: 'donations/cancel',
    component: DonationCancelPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

