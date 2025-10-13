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
    component: Dashboard,
    title: "Dashboard"
  },
  {
    path: 'login',
    component: Login
  },
];
