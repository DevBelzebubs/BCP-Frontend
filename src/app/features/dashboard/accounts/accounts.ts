import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../core';
import { BcpAccountCard, BcpSpinner } from '../../../shared/ui';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, RouterModule, BcpAccountCard, BcpSpinner],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts implements OnInit {
  private dashboardService = inject(DashboardService);
  protected data = this.dashboardService.data;
  protected loading = this.dashboardService.loading;
  protected error = this.dashboardService.error;

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe();
  }
  protected filterTipo = signal<string | null>(null);

  protected userName = computed(() => this.data()?.informacionUsuario.nombre ?? '');

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
      this.cuentas().reduce((s, c) => s + c.saldo, 0)
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

  protected readonly tipoColors: Record<string, string> = {
    AHORROS: 'bg-[#2a6df5]',
    CORRIENTE: 'bg-[#7fd22e]',
    CUENTA_SUELDO: 'bg-[#ff9a3d]',
    PLAZO_FIJO: 'bg-[#6d5ce6]',
  };

  protected distribucionPorTipo = computed(() => {
    const totalSaldo = this.cuentas().reduce((s, c) => s + c.saldo, 0);
    const grupos = new Map<string, number>();
    for (const c of this.cuentas()) {
      grupos.set(c.tipo, (grupos.get(c.tipo) ?? 0) + c.saldo);
    }
    return Array.from(grupos.entries()).map(([tipo, saldo]) => ({
      tipo,
      label: this.tipoLabels[tipo] ?? tipo,
      saldo,
      pct: totalSaldo > 0 ? Math.round((saldo / totalSaldo) * 100) : 0,
    }));
  });

  protected movimientosRecientes = computed(() =>
    this.cuentas()
      .flatMap(c => c.movimientos.map(m => ({
        ...m,
        idCuenta: c.idCuenta,
        tipoCuenta: c.tipo,
        labelCuenta: this.tipoLabels[c.tipo] ?? c.tipo,
      })))
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 10)
  );

  protected totalesMes = computed(() => {
    const t = { depositos: 0, retiros: 0, transferencias: 0 };
    for (const c of this.cuentas()) {
      for (const m of c.movimientos) {
        if (m.tipo === 'DEPOSITO') t.depositos += m.monto;
        else if (m.tipo === 'RETIRO') t.retiros += m.monto;
        else if (m.tipo === 'TRANSFERENCIA') t.transferencias += m.monto;
      }
    }
    return t;
  });

  protected cuentaMasActiva = computed(() => {
    const cuentas = this.cuentas();
    if (cuentas.length === 0) return null;
    return cuentas.reduce((max, c) => c.movimientos.length > max.movimientos.length ? c : max, cuentas[0]);
  });

  protected formatSaldo(saldo: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(saldo);
  }

  protected tipoColor(tipo: string): string {
    return this.tipoColors[tipo] ?? 'bg-gray-400';
  }

  protected formatMonto(monto: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
  }

  protected formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
  }

  protected tipoMovimiento(tipo: string): string {
    const map: Record<string, string> = {
      DEPOSITO: 'Depósito',
      RETIRO: 'Retiro',
      TRANSFERENCIA: 'Transferencia',
    };
    return map[tipo] ?? tipo;
  }

  setFilter(t: string | null) { this.filterTipo.set(t); }
}
