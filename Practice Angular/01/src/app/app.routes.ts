import { Routes } from '@angular/router';
import { PublicLayout } from './shared/layout/public-layout/public-layout';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
];
