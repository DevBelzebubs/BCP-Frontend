import { Routes } from '@angular/router';
import { roleGuard } from '../core';
import { DashboardShell } from '../components/dashboard/shell/shell';
import { AsesorOverview } from '../features/dashboard/asesor/overview/asesor-overview';
import { AsesorLoanList } from '../features/dashboard/asesor/loans/asesor-loan-list';
import { AsesorReports } from '../features/dashboard/asesor/reports/asesor-reports';
import { Profile } from '../features/dashboard/profile/profile';

export const asesorRoutes: Routes = [
  {
    path: '',
    component: DashboardShell,
    canActivate: [() => roleGuard(['ASESOR'])],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: AsesorOverview },
      { path: 'loans', component: AsesorLoanList },
      { path: 'reports', component: AsesorReports },
      { path: 'profile', component: Profile },
    ],
  },
];
