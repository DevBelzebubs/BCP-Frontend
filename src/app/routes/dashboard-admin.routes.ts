import { Routes } from '@angular/router';
import { roleGuard } from '../core';
import { DashboardShell } from '../components/dashboard/shell/shell';
import { AdminOverview } from '../features/dashboard/admin/overview/admin-overview';
import { AdminUsers } from '../features/dashboard/admin/users/admin-users';
import { AdminAuditRoles } from '../features/dashboard/admin/audit-roles/admin-audit-roles';
import { AdminAuditFinancial } from '../features/dashboard/admin/audit-financial/admin-audit-financial';
import { Profile } from '../features/dashboard/profile/profile';

export const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardShell,
    canActivate: [() => roleGuard(['ADMIN'])],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: AdminOverview },
      { path: 'users', component: AdminUsers },
      { path: 'audit-roles', component: AdminAuditRoles },
      { path: 'audit-financial', component: AdminAuditFinancial },
      { path: 'profile', component: Profile },
    ],
  },
];
