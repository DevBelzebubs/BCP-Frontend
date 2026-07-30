import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
})
export class DashboardSidebar {
  protected navItems: NavItem[] = [
    { label: 'Resumen', route: '/dashboard/overview', icon: 'home' },
    { label: 'Mis Cuentas', route: '/dashboard/accounts', icon: 'bank' },
    { label: 'Pagos', route: '/dashboard/payments', icon: 'card' },
    { label: 'Préstamos', route: '/dashboard/loans', icon: 'wallet' },
    { label: 'Mi Perfil', route: '/dashboard/profile', icon: 'user' },
  ];
}
