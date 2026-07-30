import { Component, inject, computed, signal } from '@angular/core';
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
  protected filterTipo = signal<string | null>(null);

  protected cuentas = computed(() => this.data()?.cuentas ?? []);

  protected filteredCuentas = computed(() => {
    const f = this.filterTipo();
    return f ? this.cuentas().filter(c => c.tipo === f) : this.cuentas();
  });

  protected tipos = computed(() => {
    const set = new Set(this.cuentas().map(c => c.tipo));
    return Array.from(set);
  });

  protected total = computed(() =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
      this.filteredCuentas().reduce((s, c) => s + c.saldo, 0)
    )
  );

  protected movimientosMesTotal = computed(() =>
    this.cuentas().reduce((sum, c) => sum + c.movimientos.length, 0)
  );

  protected cuentaMayorSaldo = computed(() => {
    const cuentas = this.cuentas();
    if (cuentas.length === 0) return null;
    return cuentas.reduce((max, c) => c.saldo > max.saldo ? c : max, cuentas[0]);
  });

  protected ultimoMovimiento = computed(() => {
    const all = this.cuentas().flatMap(c => c.movimientos);
    if (all.length === 0) return null;
    return all.reduce((latest, m) =>
      new Date(m.fecha) > new Date(latest.fecha) ? m : latest, all[0]
    );
  });

  protected readonly tipoLabels: Record<string, string> = {
    AHORROS: 'Ahorros',
    CORRIENTE: 'Corriente',
    CUENTA_SUELDO: 'Sueldo',
    PLAZO_FIJO: 'Plazo Fijo',
  };

  protected formatSaldo(saldo: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(saldo);
  }

  setFilter(t: string | null) { this.filterTipo.set(t); }
}
