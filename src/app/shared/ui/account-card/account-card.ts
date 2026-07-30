import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcpCard } from '../bcp-card/bcp-card';
import { BcpBadge } from '../bcp-badge/bcp-badge';
import type { DetalleCuenta } from '../../../core';

@Component({
  selector: 'bcp-account-card',
  imports: [CommonModule, BcpCard, BcpBadge],
  templateUrl: './account-card.html',
})
export class BcpAccountCard {
  account = input.required<DetalleCuenta>();
  expanded = signal(false);

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

  protected numeroMasked = computed(() => {
    const num = this.account().numeroCuenta;
    if (!num || num.length < 4) return num;
    return '*'.repeat(num.length - 4) + num.slice(-4);
  });

  protected accentColor = computed(() => {
    const map: Record<string, string> = {
      AHORROS: 'bg-[#0051ff]',
      CORRIENTE: 'bg-[#78be20]',
      CUENTA_SUELDO: 'bg-[#ff7800]',
      PLAZO_FIJO: 'bg-[#002a8d]',
    };
    return map[this.account().tipo] ?? 'bg-[#002a8d]';
  });

  protected badgeVariant = computed(() => {
    const map: Record<string, 'blue' | 'green' | 'orange' | 'navy'> = {
      AHORROS: 'blue',
      CORRIENTE: 'green',
      CUENTA_SUELDO: 'orange',
      PLAZO_FIJO: 'navy',
    };
    return map[this.account().tipo] ?? 'navy';
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

  toggleMovimientos() {
    this.expanded.update(v => !v);
  }
}
