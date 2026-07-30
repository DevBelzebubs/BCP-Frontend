import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService, type DetalleCuenta, type Movimiento } from '../../../core';
import { BcpAlert, BcpAccountCard, BcpPendingPayments, BcpQuickActions } from '../../../shared/ui';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, RouterModule, BcpAlert, BcpAccountCard, BcpPendingPayments, BcpQuickActions],
  templateUrl: './overview.html',
})
export class Overview implements OnInit {
  private dashboardService = inject(DashboardService);

  protected data = this.dashboardService.data;
  protected loading = this.dashboardService.loading;
  protected error = this.dashboardService.error;

  protected accountTypeFilter = signal<string | null>(null);

  protected userName = computed(() => this.data()?.informacionUsuario.nombre ?? '');
  protected userInitial = computed(() => this.userName().charAt(0).toUpperCase());
  protected cuentas = computed(() => this.data()?.cuentas ?? []);
  protected pagos = computed(() => this.data()?.pagosPendientes ?? []);

  protected filteredCuentas = computed(() => {
    const filter = this.accountTypeFilter();
    return filter ? this.cuentas().filter(c => c.tipo === filter) : this.cuentas();
  });

  protected accountTypes = computed(() => {
    const types = new Set(this.cuentas().map(c => c.tipo));
    return Array.from(types);
  });

  protected totalSaldo = computed(() =>
    this.cuentas().reduce((sum, c) => sum + c.saldo, 0)
  );

  protected totalSaldoFormatted = computed(() =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(this.totalSaldo())
  );

  protected ultimosMovimientos = computed(() => {
    const all: (Movimiento & { cuentaTipo: string })[] = [];
    for (const c of this.cuentas()) {
      for (const m of c.movimientos) {
        all.push({ ...m, cuentaTipo: c.tipo });
      }
    }
    return all.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).slice(0, 5);
  });

  protected greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  });

  protected currentDate = computed(() =>
    new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
  );

  protected formatMonto(monto: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
  }

  protected tipoMovimiento(tipo: string): string {
    const map: Record<string, string> = {
      DEPOSITO: 'Depósito',
      RETIRO: 'Retiro',
      TRANSFERENCIA: 'Transferencia',
    };
    return map[tipo] ?? tipo;
  }

  protected hasMovements = computed(() => this.ultimosMovimientos().length > 0);

  setFilter(tipo: string | null) {
    this.accountTypeFilter.set(tipo);
  }

  ngOnInit() {
    if (!this.data()) {
      this.dashboardService.getDashboard().subscribe();
    }
  }
}
