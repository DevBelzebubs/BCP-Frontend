import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core';

@Component({
  selector: 'app-dashboard-header',
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class DashboardHeader {
  private auth = inject(AuthService);
  private router = inject(Router);

  toggleMenu = output<void>();

  protected userName() {
    return this.auth.getUserName() ?? 'Usuario';
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
