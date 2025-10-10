import { Routes } from '@angular/router';
import { Dashboard } from './page/dashboard/dashboard';
import { Login } from './page/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./page/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'login',
    component: Login
  },
];
