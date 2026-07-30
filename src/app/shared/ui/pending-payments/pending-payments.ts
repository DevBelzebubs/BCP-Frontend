import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcpCard } from '../bcp-card/bcp-card';
import { BcpButton } from '../bcp-button/bcp-button';
import type { PagoPendiente } from '../../../core';

@Component({
  selector: 'bcp-pending-payments',
  imports: [CommonModule, BcpCard, BcpButton],
  templateUrl: './pending-payments.html',
  styleUrl: './pending-payments.css',
})
export class BcpPendingPayments {
  pagos = input.required<PagoPendiente[]>();

  protected hasPagos = computed(() => this.pagos().length > 0);

  protected formatMonto(monto: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
  }
}
