import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpInput, BcpButton, BcpAlert } from '../../../../shared/ui';
import { BackofficeService } from '../../../../core';

@Component({
  selector: 'app-backoffice-reconciliation',
  imports: [CommonModule, FormsModule, RouterModule, BcpInput, BcpButton, BcpAlert],
  templateUrl: './backoffice-reconciliation.html',
})
export class BackofficeReconciliation {
  private service = inject(BackofficeService);
  fechaConciliacion = new Date().toISOString().split('T')[0];
  operacionesTexto = '';
  loading = signal(false);
  error = signal('');
  resultado = signal<any>(null);

  procesar() {
    if (!this.operacionesTexto.trim()) return;
    this.loading.set(true);
    this.error.set('');
    const lineas = this.operacionesTexto.trim().split('\n').filter(l => l.trim());
    const operaciones = lineas.map((l, i) => {
      const parts = l.split(',');
      return {
        idOperacionExterna: i + 1,
        fecha: this.fechaConciliacion,
        monto: parseFloat(parts[0] || '0'),
        tipo: parts[1] || 'OTRO',
        descripcion: parts[2] || '',
      };
    });
    this.service.procesarConciliacion({ fechaConciliacion: this.fechaConciliacion, operaciones }).subscribe({
      next: (res) => { this.loading.set(false); this.resultado.set(res.data || res); },
      error: (err) => { this.loading.set(false); this.error.set('Error al procesar conciliación'); },
    });
  }
}
