import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcpBadge } from '../bcp-badge/bcp-badge';
import type { DetalleCuenta } from '../../../core';

@Component({
  selector: 'bcp-account-card',
  imports: [CommonModule, BcpBadge],
  templateUrl: './account-card.html',
  styleUrl: './account-card.css',
})
export class BcpAccountCard {
  account = input.required<DetalleCuenta>();
  titular = input<string>('');

  expanded = signal(false);
  numeroVisible = signal(false);
  saldoVisible = signal(true);

  protected tipoLabel = computed(() => {
    const map: Record<string, string> = {
      AHORROS: 'Cuenta de Ahorros',
      CORRIENTE: 'Cuenta Corriente',
      CUENTA_SUELDO: 'Cuenta Sueldo',
      PLAZO_FIJO: 'Plazo Fijo',
    };
    return map[this.account().tipo] ?? this.account().tipo;
  });

  protected saldoFormatted = computed(() =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(this.account().saldo)
  );

  protected saldoDisplay = computed(() =>
    this.saldoVisible() ? this.saldoFormatted() : '••••••'
  );

  protected numeroDisplay = computed(() => {
    const num = this.account().numeroCuenta;
    if (!num) return '•••• •••• •••• ••••';
    const digits = num.replace(/\D/g, '');
    const last4 = digits.slice(-4);
    if (this.numeroVisible()) {
      return digits.replace(/(.{4})/g, '$1 ').trim();
    }
    if (digits.length <= 4) return digits;
    const masked = '•'.repeat(digits.length - 4);
    return (masked + last4).replace(/(.{4})/g, '$1 ').trim();
  });

  protected gradClass = computed(() => {
    const map: Record<string, string> = {
      AHORROS: 'bg-gradient-to-br from-[#0b4ae0] via-[#2a6df5] to-[#5b95ff]',
      CORRIENTE: 'bg-gradient-to-br from-[#3f8f00] to-[#7fd22e]',
      CUENTA_SUELDO: 'bg-gradient-to-br from-[#e06a00] to-[#ff9a3d]',
      PLAZO_FIJO: 'bg-gradient-to-br from-[#3b2f9e] to-[#6d5ce6]',
    };
    return map[this.account().tipo] ?? 'bg-gradient-to-br from-[#0b4ae0] to-[#5b95ff]';
  });

  protected movimientos = computed(() => this.account().movimientos.slice(0, 5));

  protected formatMonto(monto: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
  }

  protected formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  protected tipoMovimiento(tipo: string): string {
    const map: Record<string, string> = {
      DEPOSITO: 'Depósito',
      RETIRO: 'Retiro',
      TRANSFERENCIA: 'Transferencia',
    };
    return map[tipo] ?? tipo;
  }

  toggleMovimientos(event?: Event) {
    event?.stopPropagation();
    this.expanded.update(v => !v);
  }

  toggleNumero(event: Event) {
    event.stopPropagation();
    this.numeroVisible.update(v => !v);
  }

  toggleSaldo(event: Event) {
    event.stopPropagation();
    this.saldoVisible.update(v => !v);
  }
}
