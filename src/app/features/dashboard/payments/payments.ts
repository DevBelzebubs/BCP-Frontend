import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../core';
import { BcpPendingPayments, BcpButton } from '../../../shared/ui';

@Component({
  selector: 'app-payments',
  imports: [CommonModule, RouterModule, BcpPendingPayments, BcpButton],
  templateUrl: './payments.html',
})
export class Payments {
  private dashboardService = inject(DashboardService);
  protected data = this.dashboardService.data;

  protected pagos = computed(() => this.data()?.pagosPendientes ?? []);

  protected totalPendiente = computed(() =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
      this.pagos().reduce((s, p) => s + p.montoPendiente, 0)
    )
  );

  protected countPendiente = computed(() => this.pagos().length);

  protected mayorPendiente = computed(() => {
    const p = this.pagos();
    if (p.length === 0) return null;
    return p.reduce((max, item) => item.montoPendiente > max.montoPendiente ? item : max, p[0]);
  });

  protected formatMonto(monto: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
  }
}
