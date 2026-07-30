import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../core';
import { BcpButton } from '../../../shared/ui';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, BcpButton],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private dashboardService = inject(DashboardService);
  protected user = computed(() => this.dashboardService.data()?.informacionUsuario);

  protected userInitial = computed(() => this.user()?.nombre.charAt(0).toUpperCase() ?? '');
}
