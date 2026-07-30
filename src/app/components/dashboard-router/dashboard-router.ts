import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core';

@Component({
  selector: 'app-dashboard-router',
  template: '',
})
export class DashboardRouter implements OnInit {
  private router = inject(Router);
  private auth = inject(AuthService);

  ngOnInit() {
    const role = this.auth.getUserType();
    const routeMap: Record<string, string> = {
      CLIENTE: '/dashboard/cliente',
      EMPLEADO: '/dashboard/empleado',
      ASESOR: '/dashboard/asesor',
      BACKOFFICE: '/dashboard/backoffice',
      ADMIN: '/dashboard/admin',
    };
    const target = (role && routeMap[role]) ? routeMap[role] : '/login';
    this.router.navigateByUrl(target, { replaceUrl: true });
  }
}
