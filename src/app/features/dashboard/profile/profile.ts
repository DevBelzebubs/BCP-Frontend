import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../core';
import { BcpCard } from '../../../shared/ui';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, BcpCard],
  templateUrl: './profile.html',
})
export class Profile {
  private dashboardService = inject(DashboardService);
  protected user = computed(() => this.dashboardService.data()?.informacionUsuario);
}
