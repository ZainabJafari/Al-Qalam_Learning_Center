import { Routes } from '@angular/router';
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
