import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core';
import { DashboardSidebar, type NavItem } from '../sidebar/sidebar';
import { DashboardHeader } from '../header/header';

@Component({
  selector: 'app-dashboard-shell',
  imports: [CommonModule, RouterModule, DashboardSidebar, DashboardHeader],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class DashboardShell {
  private auth = inject(AuthService);
  sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  protected navItems: NavItem[] = this.getNavItems();

  private getNavItems(): NavItem[] {
    const role = this.auth.getUserType();
    const base = '/dashboard';
    switch (role) {
      case 'CLIENTE':
        return [
          { label: 'Resumen', route: `${base}/cliente/overview`, icon: 'home' },
          { label: 'Mis Cuentas', route: `${base}/cliente/accounts`, icon: 'bank' },
          { label: 'Transferencias', route: `${base}/cliente/transfer`, icon: 'transfer' },
          { label: 'Pagos', route: `${base}/cliente/payments`, icon: 'card' },
          { label: 'Préstamos', route: `${base}/cliente/loans`, icon: 'wallet' },
          { label: 'Reclamos', route: `${base}/cliente/claims`, icon: 'claims' },
          { label: 'Mi Perfil', route: `${base}/cliente/profile`, icon: 'user' },
        ];
      case 'EMPLEADO':
        return [
          { label: 'Resumen', route: `${base}/empleado/overview`, icon: 'home' },
          { label: 'Depósito', route: `${base}/empleado/deposit`, icon: 'deposit' },
          { label: 'Retiro', route: `${base}/empleado/withdrawal`, icon: 'withdrawal' },
          { label: 'Pago Ventanilla', route: `${base}/empleado/cash-payment`, icon: 'cash-payment' },
          { label: 'Mi Perfil', route: `${base}/empleado/profile`, icon: 'user' },
        ];
      case 'ASESOR':
        return [
          { label: 'Resumen', route: `${base}/asesor/overview`, icon: 'home' },
          { label: 'Solicitudes', route: `${base}/asesor/loans`, icon: 'loan-list' },
          { label: 'Reporte Diario', route: `${base}/asesor/reports`, icon: 'report' },
          { label: 'Mi Perfil', route: `${base}/asesor/profile`, icon: 'user' },
        ];
      case 'BACKOFFICE':
        return [
          { label: 'Resumen', route: `${base}/backoffice/overview`, icon: 'home' },
          { label: 'Supervisión', route: `${base}/backoffice/supervision`, icon: 'supervision' },
          { label: 'Conciliación', route: `${base}/backoffice/reconciliation`, icon: 'conciliation' },
          { label: 'Servicios', route: `${base}/backoffice/services`, icon: 'services' },
          { label: 'Reclamos', route: `${base}/backoffice/claims`, icon: 'claims' },
          { label: 'Mi Perfil', route: `${base}/backoffice/profile`, icon: 'user' },
        ];
      case 'ADMIN':
        return [
          { label: 'Resumen', route: `${base}/admin/overview`, icon: 'home' },
          { label: 'Usuarios', route: `${base}/admin/users`, icon: 'admin-users' },
          { label: 'Aud. Roles', route: `${base}/admin/audit-roles`, icon: 'audit-roles' },
          { label: 'Aud. Financiera', route: `${base}/admin/audit-financial`, icon: 'audit-financial' },
          { label: 'Mi Perfil', route: `${base}/admin/profile`, icon: 'user' },
        ];
      default:
        return [];
    }
  }
}
