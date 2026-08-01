import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpButton, BcpAlert } from '../../../shared/ui';
import { CuentaService, DashboardService, type DetalleCuenta, type ConfirmarTransferenciaDTO, type HistorialTransferencia } from '../../../core';

@Component({
  selector: 'app-transfer',
  imports: [CommonModule, FormsModule, RouterModule, BcpButton, BcpAlert],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css',
})
export class Transfer implements OnInit {
  private cuentaService = inject(CuentaService);
  private dashboardService = inject(DashboardService);

  protected data = this.dashboardService.data;

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe(() => this.cargarHistorialTransferencias());
  }

  protected transferencias = signal<HistorialTransferencia[]>([]);
  protected historialLoading = signal(false);
  protected historialError = signal('');

  protected cargarHistorialTransferencias(): void {
    const dni = this.data()?.informacionUsuario?.dni;
    if (!dni) return;
    this.historialLoading.set(true);
    this.historialError.set('');
    this.cuentaService.getHistorialTransferencias(dni).subscribe({
      next: (res) => {
        this.transferencias.set(res.data ?? []);
        this.historialLoading.set(false);
      },
      error: () => {
        this.historialLoading.set(false);
        this.historialError.set('Error al cargar las últimas transferencias');
      },
    });
  }

  cuentaOrigenId = signal<number | null>(null);
  cuentaDestino = '';
  monto = '';
  otp = '';
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

  protected isSelectedCuenta(numeroCuenta: string): boolean {
    return this.cuentaDestino === numeroCuenta;
  }

  protected formatCuenta(numero: string): string {
    return numero.length >= 4 ? '•••• ' + numero.slice(-4) : numero;
  }

  protected tipoTransferenciaLabel(tipo: string): string {
    return tipo?.toUpperCase() === 'RETIRO' ? 'Transferencia enviada' : 'Transferencia recibida';
  }

  protected tipoSigno(tipo: string): string {
    return tipo?.toUpperCase() === 'RETIRO' ? '-' : '+';
  }

  protected formatFecha(fecha: string): string {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-PE');
  }

  iniciarTransferencia() {
    const origen = this.origenSeleccionado();
    if (!origen) {
      this.error.set('Selecciona la cuenta de origen');
      return;
    }
    const cuentaDestino = this.cuentaDestino.trim();
    if (!cuentaDestino) {
      this.error.set('Ingresa la cuenta destino');
      return;
    }
    if (cuentaDestino === origen.numeroCuenta) {
      this.error.set('La cuenta de origen y destino no pueden ser la misma');
      return;
    }
    const montoNum = Number(this.monto);
    if (!Number.isFinite(montoNum) || montoNum <= 0) {
      this.error.set('Ingresa un monto válido');
      return;
    }
    if (montoNum > origen.saldo) {
      this.error.set('Saldo insuficiente');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.cuentaService.iniciarTransferencia(origen.idCuenta, { numeroCuentaDestino: cuentaDestino, monto: montoNum }).subscribe({
      next: () => {
        this.loading.set(false);
        this.step = 'otp';
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al iniciar transferencia');
      },
    });
  }

  selectCuentaRapida(cuenta: DetalleCuenta) {
    this.cuentaDestino = cuenta.numeroCuenta;
  }

  confirmarTransferencia() {
    if (!this.otp) return;
    this.loading.set(true);
    this.error.set('');
    const dto: ConfirmarTransferenciaDTO = { dni: this.data()?.informacionUsuario?.dni ?? '', codigoOTP: this.otp };
    this.cuentaService.confirmarTransferencia(dto).subscribe({
      next: () => {
        this.loading.set(false);
        this.step = 'success';
        this.dashboardService.refresh();
        this.cargarHistorialTransferencias();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'OTP incorrecto');
      },
    });
  }

  reset() {
    this.step = 'form';
    this.cuentaOrigenId.set(null);
    this.cuentaDestino = '';
    this.monto = '';
    this.otp = '';
    this.error.set('');
  }
}
