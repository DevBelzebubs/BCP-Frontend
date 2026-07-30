import { Routes } from '@angular/router';
import { roleGuard } from '../core';
import { DashboardShell } from '../components/dashboard/shell/shell';
import { Overview } from '../features/dashboard/overview/overview';
import { Accounts } from '../features/dashboard/accounts/accounts';
import { Payments } from '../features/dashboard/payments/payments';
import { Loans } from '../features/dashboard/loans/loans';
import { Profile } from '../features/dashboard/profile/profile';
import { Transfer } from '../features/dashboard/transfer/transfer';
import { Claims } from '../features/dashboard/claims/claims';

export const clienteRoutes: Routes = [
  {
    path: '',
    component: DashboardShell,
    canActivate: [() => roleGuard(['CLIENTE'])],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },
      { path: 'accounts', component: Accounts },
      { path: 'payments', component: Payments },
      { path: 'loans', component: Loans },
      { path: 'profile', component: Profile },
      { path: 'transfer', component: Transfer },
      { path: 'claims', component: Claims },
    ],
  },
];
