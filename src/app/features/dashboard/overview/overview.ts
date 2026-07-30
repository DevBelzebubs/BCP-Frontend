import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../core';
import { BcpSpinner, BcpAlert, BcpAccountCard, BcpPendingPayments, BcpQuickActions } from '../../../shared/ui';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, RouterModule, BcpSpinner, BcpAlert, BcpAccountCard, BcpPendingPayments, BcpQuickActions],
  templateUrl: './overview.html',
})
export class Overview implements OnInit {
  private dashboardService = inject(DashboardService);

  protected data = this.dashboardService.data;
  protected loading = this.dashboardService.loading;
  protected error = this.dashboardService.error;

  protected userName = computed(() => this.data()?.informacionUsuario.nombre ?? '');
  protected cuentas = computed(() => this.data()?.cuentas ?? []);
  protected pagos = computed(() => this.data()?.pagosPendientes ?? []);
  protected totalSaldo = computed(() =>
    this.cuentas().reduce((sum, c) => sum + c.saldo, 0)
  );
  protected totalSaldoFormatted = computed(() =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(this.totalSaldo())
  );

  ngOnInit() {
    if (!this.data()) {
      this.dashboardService.getDashboard().subscribe();
    }
  }
}
