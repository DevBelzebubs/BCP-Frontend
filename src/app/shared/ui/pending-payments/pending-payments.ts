import { Component, computed, input, output } from '@angular/core';
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
  pagar = output<number>();

  protected hasPagos = computed(() => this.pagos().length > 0);

  protected formatMonto(monto: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
  }

  protected getServicioIcon(nombre: string): { svg: string; bg: string; color: string } {
    const n = nombre.toLowerCase();
    if (n.includes('luz')) return { svg: 'M13 10V3L4 14h7v7l9-11h-7z', bg: 'bg-yellow-100', color: 'text-yellow-600' };
    if (n.includes('agua')) return { svg: 'M12 2a8 8 0 00-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 00-8-8zm0 10a2 2 0 110-4 2 2 0 010 4z', bg: 'bg-blue-100', color: 'text-blue-600' };
    if (n.includes('internet') || n.includes('cable')) return { svg: 'M5 12a7 7 0 0114 0M8 12a4 4 0 018 0M11 12a1 1 0 112 0', bg: 'bg-indigo-100', color: 'text-indigo-600' };
    if (n.includes('gas')) return { svg: 'M17.66 11.2a8 8 0 00-11.32 0A8.12 8.12 0 004 17.2a1 1 0 001 1h14a1 1 0 001-1 8.12 8.12 0 00-2.34-6zM12 2l-1 3h2l-1-3z', bg: 'bg-orange-100', color: 'text-orange-600' };
    if (n.includes('telefon') || n.includes('móvil') || n.includes('movil') || n.includes('celular'))
      return { svg: 'M15.05 3A5.92 5.92 0 0119 6.95M15.05 3A5.92 5.92 0 0119 6.95M17 21h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1zm-6 0H9a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1z', bg: 'bg-green-100', color: 'text-green-600' };
    if (n.includes('seguro')) return { svg: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', bg: 'bg-red-100', color: 'text-red-600' };
    if (n.includes('stream') || n.includes('premium'))
      return { svg: 'M10 15l5-3-5-3v6zm-8 3h2v-2H2v2zm18-10v2h2V8h-2zm-2 10h2v-2h-2v2zM6 18H4v2h2v-2zm12 0h-2v2h2v-2zM6 4H4v2h2V4zm14 2V4h-2v2h2z', bg: 'bg-purple-100', color: 'text-purple-600' };
    return { svg: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', bg: 'bg-[#002a8d] bg-opacity-10', color: 'text-[#002a8d]' };
  }
}
