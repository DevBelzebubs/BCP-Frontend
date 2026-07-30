import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpInput, BcpButton, BcpAlert } from '../../../../shared/ui';
import { EmpleadoService } from '../../../../core';

@Component({
  selector: 'app-empleado-cash-payment',
  imports: [CommonModule, FormsModule, RouterModule, BcpInput, BcpButton, BcpAlert],
  templateUrl: './empleado-cash-payment.html',
  styleUrl: './empleado-cash-payment.css',
})
export class EmpleadoCashPayment {
  private service = inject(EmpleadoService);
  clienteDni = '';
  numeroCuenta = '';
  pagoId = '';
  loading = signal(false);
  success = signal(false);
  error = signal('');

  onSubmit() {
    const pagoIdNum = Number(this.pagoId);
    if (!this.clienteDni || !this.numeroCuenta || pagoIdNum <= 0) return;
    this.loading.set(true);
    this.error.set('');
    this.service.pagar({ clienteDni: this.clienteDni, numeroCuenta: this.numeroCuenta, pagoId: pagoIdNum }).subscribe({
      next: () => { this.loading.set(false); this.success.set(true); },
      error: (err) => { this.loading.set(false); this.error.set(err.error?.message || 'Error al procesar pago'); },
    });
  }

  reset() { this.clienteDni = ''; this.numeroCuenta = ''; this.pagoId = ''; this.success.set(false); this.error.set(''); }
}
