import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService, PagoService, type DetalleCuenta, type PagoHistorial } from '../../../core';
import { BcpPendingPayments, BcpButton, BcpAlert } from '../../../shared/ui';

@Component({
  selector: 'app-payments',
  imports: [CommonModule, RouterModule, BcpPendingPayments, BcpButton, BcpAlert],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit {
  private dashboardService = inject(DashboardService);
  private pagoService = inject(PagoService);
  protected data = this.dashboardService.data;

  protected pagoSeleccionado = signal<{ idPago: number; nombreServicio: string; montoPendiente: number } | null>(null);
  protected cuentaSeleccionadaId = signal<number | null>(null);
  protected pagando = signal(false);
  protected pagoExitoso = signal(false);
  protected pagoError = signal('');
  protected pagosRealizados = signal<PagoHistorial[]>([]);
  protected historialPagosLoading = signal(false);
  protected historialPagosError = signal('');

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe(() => this.cargarHistorialPagos());
  }

  protected cargarHistorialPagos(): void {
    const dni = this.data()?.informacionUsuario?.dni;
    if (!dni) return;
    this.historialPagosLoading.set(true);
    this.historialPagosError.set('');
    this.pagoService.getHistorialPagos(dni).subscribe({
      next: (res) => {
        this.pagosRealizados.set(res.data ?? []);
        this.historialPagosLoading.set(false);
      },
      error: () => {
        this.historialPagosLoading.set(false);
        this.historialPagosError.set('Error al cargar el historial de pagos');
      },
    });
  }

  protected cuentas = computed(() => this.data()?.cuentas ?? []);

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

  protected formatFecha(fecha: string): string {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-PE');
  }

  protected handlePagar(pagoId: number): void {
    const pago = this.pagos().find(p => p.idPago === pagoId);
    if (!pago) return;
    this.pagoSeleccionado.set({ idPago: pago.idPago, nombreServicio: pago.nombreServicio, montoPendiente: pago.montoPendiente });
    this.cuentaSeleccionadaId.set(null);
    this.pagoExitoso.set(false);
    this.pagoError.set('');
  }

  protected cerrarModal(): void {
    this.pagoSeleccionado.set(null);
    this.cuentaSeleccionadaId.set(null);
    this.pagando.set(false);
    this.pagoExitoso.set(false);
    this.pagoError.set('');
  }

  protected confirmarPago(): void {
    const pago = this.pagoSeleccionado();
    const cuentaId = this.cuentaSeleccionadaId();
    if (!pago || !cuentaId) return;

    this.pagando.set(true);
    this.pagoError.set('');

    this.pagoService.realizarPago({ cuentaId, pagoId: pago.idPago }).subscribe({
      next: () => {
        this.pagando.set(false);
        this.pagoExitoso.set(true);
        this.dashboardService.refresh();
        this.cargarHistorialPagos();
      },
      error: (err) => {
        this.pagando.set(false);
        this.pagoError.set(err.error?.message || 'Error al procesar el pago');
      },
    });
  }

  protected getTipoLabel(tipo: string): string {
    const map: Record<string, string> = { AHORROS: 'Ahorros', CORRIENTE: 'Corriente', PLAZO_FIJO: 'Plazo Fijo' };
    return map[tipo] ?? tipo;
  }

  protected getSaldoSuficiente(cuenta: DetalleCuenta, monto: number): boolean {
    return cuenta.saldo >= monto;
  }
}
