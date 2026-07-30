import { Routes } from '@angular/router';
import { authGuard } from '../core';
import { DashboardShell } from '../components/dashboard/shell/shell';
import { Overview } from '../features/dashboard/overview/overview';
import { Accounts } from '../features/dashboard/accounts/accounts';
import { Payments } from '../features/dashboard/payments/payments';
import { Loans } from '../features/dashboard/loans/loans';
import { Profile } from '../features/dashboard/profile/profile';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardShell,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },
      { path: 'accounts', component: Accounts },
      { path: 'payments', component: Payments },
      { path: 'loans', component: Loans },
      { path: 'profile', component: Profile },
    ],
  },
];
