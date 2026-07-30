import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpInput, BcpButton, BcpAlert } from '../../../../shared/ui';
import { ReporteService } from '../../../../core';

@Component({
  selector: 'app-asesor-reports',
  imports: [CommonModule, FormsModule, RouterModule, BcpInput, BcpButton, BcpAlert],
  templateUrl: './asesor-reports.html',
})
export class AsesorReports {
  private service = inject(ReporteService);
  fecha = new Date().toISOString().split('T')[0];
  loading = signal(false);
  error = signal('');

  descargar() {
    if (!this.fecha) return;
    this.loading.set(true);
    this.error.set('');
    this.service.generarDiario(this.fecha).subscribe({
      next: (blob) => {
        this.loading.set(false);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-diario-${this.fecha}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => { this.loading.set(false); this.error.set('Error al generar reporte'); },
    });
  }
}
