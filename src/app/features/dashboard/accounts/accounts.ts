import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../core';
import { BcpAccountCard } from '../../../shared/ui';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, RouterModule, BcpAccountCard],
  templateUrl: './accounts.html',
})
export class Accounts {
  private dashboardService = inject(DashboardService);
  protected data = this.dashboardService.data;
}
