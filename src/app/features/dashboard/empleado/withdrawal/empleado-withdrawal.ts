import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpInput, BcpButton, BcpAlert } from '../../../../shared/ui';
import { EmpleadoService } from '../../../../core';

@Component({
  selector: 'app-empleado-withdrawal',
  imports: [CommonModule, FormsModule, RouterModule, BcpInput, BcpButton, BcpAlert],
  templateUrl: './empleado-withdrawal.html',
  styleUrl: './empleado-withdrawal.css',
})
export class EmpleadoWithdrawal {
  private service = inject(EmpleadoService);
  clienteDni = '';
  numeroCuenta = '';
  monto = '';
  loading = signal(false);
  success = signal(false);
  error = signal('');

  onSubmit() {
    const montoNum = Number(this.monto);
    if (!this.clienteDni || !this.numeroCuenta || montoNum <= 0) return;
    this.loading.set(true);
    this.error.set('');
    this.service.retirar({ clienteDni: this.clienteDni, numeroCuenta: this.numeroCuenta, monto: montoNum }).subscribe({
      next: () => { this.loading.set(false); this.success.set(true); },
      error: (err) => { this.loading.set(false); this.error.set(err.error?.message || 'Error al realizar retiro'); },
    });
  }

  reset() { this.clienteDni = ''; this.numeroCuenta = ''; this.monto = ''; this.success.set(false); this.error.set(''); }
}
