import { Routes } from '@angular/router';
import { roleGuard } from '../core';
import { DashboardShell } from '../components/dashboard/shell/shell';
import { EmpleadoOverview } from '../features/dashboard/empleado/overview/empleado-overview';
import { EmpleadoDeposit } from '../features/dashboard/empleado/deposit/empleado-deposit';
import { EmpleadoWithdrawal } from '../features/dashboard/empleado/withdrawal/empleado-withdrawal';
import { EmpleadoCashPayment } from '../features/dashboard/empleado/cash-payment/empleado-cash-payment';
import { Profile } from '../features/dashboard/profile/profile';

export const empleadoRoutes: Routes = [
  {
    path: '',
    component: DashboardShell,
    canActivate: [() => roleGuard(['EMPLEADO'])],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: EmpleadoOverview },
      { path: 'deposit', component: EmpleadoDeposit },
      { path: 'withdrawal', component: EmpleadoWithdrawal },
      { path: 'cash-payment', component: EmpleadoCashPayment },
      { path: 'profile', component: Profile },
    ],
  },
];
