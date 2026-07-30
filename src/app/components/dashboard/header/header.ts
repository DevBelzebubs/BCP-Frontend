import { Component, OnInit, OnDestroy, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, getRoleLabel } from '../../../core';

@Component({
  selector: 'app-dashboard-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class DashboardHeader implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private router = inject(Router);

  toggleMenu = output<void>();

  currentTime = signal(this.getCurrentTime());
  private timeInterval: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    this.timeInterval = setInterval(() => {
      this.currentTime.set(this.getCurrentTime());
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  }

  protected userName() {
    return this.auth.getUserName() ?? 'Usuario';
  }

  protected userRole() {
    return getRoleLabel(this.auth.getUserType());
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
