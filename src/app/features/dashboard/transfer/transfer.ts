import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpButton, BcpAlert } from '../../../shared/ui';
import { CuentaService, DashboardService, type DetalleCuenta } from '../../../core';

@Component({
  selector: 'app-transfer',
  imports: [CommonModule, FormsModule, RouterModule, BcpButton, BcpAlert],
  templateUrl: './transfer.html',
})
export class Transfer {
  private cuentaService = inject(CuentaService);
  private dashboardService = inject(DashboardService);

  protected data = this.dashboardService.data;

  cuentaOrigenId = signal<number | null>(null);
  cuentaDestino = '';
  monto = '';
  otp = '';
  transactionId = signal<string | null>(null);
  step: 'form' | 'otp' | 'success' = 'form';
  loading = signal(false);
  error = signal('');

  protected cuentas = computed(() => this.data()?.cuentas ?? []);

  protected totalSaldo = computed(() =>
    this.cuentas().reduce((sum, c) => sum + c.saldo, 0)
  );

  protected totalSaldoFormatted = computed(() =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(this.totalSaldo())
  );

  protected cuentasCount = computed(() => this.cuentas().length);

  protected origenSeleccionado = computed(() =>
    this.cuentas().find(c => c.idCuenta === this.cuentaOrigenId())
  );

  protected cuentasSinOrigen = computed(() =>
    this.cuentas().filter(c => c.idCuenta !== this.cuentaOrigenId())
  );

  protected montoFormatted = computed(() => {
    const n = Number(this.monto);
    return n > 0 ? new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(n) : '';
  });

  protected readonly LIMITE_DIARIO = 5000;

  protected limiteRestante = computed(() =>
    Math.max(0, this.LIMITE_DIARIO - (Number(this.monto) || 0))
  );

  protected porcentajeLimiteUsado = computed(() =>
    Math.min(100, (Number(this.monto) || 0) / this.LIMITE_DIARIO * 100)
  );

  protected disponibleLabel = computed(() => {
    const origen = this.origenSeleccionado();
    return origen ? this.formatSaldo(origen.saldo) : 'Selecciona origen';
  });

  protected formatSaldo(saldo: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(saldo);
  }

  protected tipoLabel(tipo: string): string {
    const map: Record<string, string> = {
      AHORROS: 'Ahorros',
      CORRIENTE: 'Corriente',
      CUENTA_SUELDO: 'Sueldo',
      PLAZO_FIJO: 'Plazo Fijo',
    };
    return map[tipo] ?? tipo;
  }

  protected isSelectedCuenta(id: number): boolean {
    return this.cuentaDestino === String(id);
  }

  protected formatCuenta(numero: string): string {
    return numero.length >= 4 ? '•••• ' + numero.slice(-4) : numero;
  }

  iniciarTransferencia() {
    const montoNum = Number(this.monto);
    if (!this.cuentaOrigenId() || !this.cuentaDestino || montoNum <= 0) return;
    this.loading.set(true);
    this.error.set('');
    this.cuentaService.iniciarTransferencia(this.cuentaOrigenId()!, { idCuentaDestino: +this.cuentaDestino, monto: montoNum }).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        this.transactionId.set(res.data?.idTransaccion ?? null);
        this.step = 'otp';
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al iniciar transferencia');
      },
    });
  }

  selectCuentaRapida(cuenta: DetalleCuenta) {
    this.cuentaDestino = String(cuenta.idCuenta);
  }

  confirmarTransferencia() {
    if (!this.otp) return;
    this.loading.set(true);
    this.error.set('');
    this.cuentaService.confirmarTransferencia({ idTransaccion: this.transactionId()!, otp: this.otp } as any).subscribe({
      next: () => {
        this.loading.set(false);
        this.step = 'success';
        this.dashboardService.refresh();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'OTP incorrecto');
      },
    });
  }

  reset() {
    this.step = 'form';
    this.cuentaDestino = '';
    this.monto = '';
    this.otp = '';
    this.transactionId.set(null);
    this.error.set('');
  }
}
