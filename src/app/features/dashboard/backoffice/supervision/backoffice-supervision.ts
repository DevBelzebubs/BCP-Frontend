import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BackofficeService } from '../../../../core';

@Component({
  selector: 'app-backoffice-supervision',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './backoffice-supervision.html',
})
export class BackofficeSupervision implements OnInit {
  private service = inject(BackofficeService);
  protected operaciones = signal<any[]>([]);
  protected loading = signal(false);
  protected error = signal('');

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading.set(true);
    this.service.listarOperacionesSupervision().subscribe({
      next: (res: any) => { this.operaciones.set(res.data || res); this.loading.set(false); },
      error: (err) => { this.loading.set(false); this.error.set('Error al cargar operaciones'); },
    });
  }

  descargarReporteGlobal() {
    this.service.generarReporteGlobal().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'reporte-global.pdf'; a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
