import { Routes } from '@angular/router';
import { roleGuard } from '../core';
import { DashboardShell } from '../components/dashboard/shell/shell';
import { BackofficeOverview } from '../features/dashboard/backoffice/overview/backoffice-overview';
import { BackofficeSupervision } from '../features/dashboard/backoffice/supervision/backoffice-supervision';
import { BackofficeReconciliation } from '../features/dashboard/backoffice/reconciliation/backoffice-reconciliation';
import { BackofficeServices } from '../features/dashboard/backoffice/services/backoffice-services';
import { BackofficeClaims } from '../features/dashboard/backoffice/claims/backoffice-claims';
import { Profile } from '../features/dashboard/profile/profile';

export const backofficeRoutes: Routes = [
  {
    path: '',
    component: DashboardShell,
    canActivate: [() => roleGuard(['BACKOFFICE'])],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: BackofficeOverview },
      { path: 'supervision', component: BackofficeSupervision },
      { path: 'reconciliation', component: BackofficeReconciliation },
      { path: 'services', component: BackofficeServices },
      { path: 'claims', component: BackofficeClaims },
      { path: 'profile', component: Profile },
    ],
  },
];
