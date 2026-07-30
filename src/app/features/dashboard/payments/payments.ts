import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../core';
import { BcpPendingPayments } from '../../../shared/ui';

@Component({
  selector: 'app-payments',
  imports: [CommonModule, RouterModule, BcpPendingPayments],
  templateUrl: './payments.html',
})
export class Payments {
  private dashboardService = inject(DashboardService);
  protected data = this.dashboardService.data;
}
