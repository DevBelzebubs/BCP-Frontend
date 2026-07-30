import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpButton, BcpAlert } from '../../../../shared/ui';
import { PrestamoService } from '../../../../core';

@Component({
  selector: 'app-asesor-loan-list',
  imports: [CommonModule, FormsModule, RouterModule, BcpButton, BcpAlert],
  templateUrl: './asesor-loan-list.html',
  styleUrl: './asesor-loan-list.css',
})
export class AsesorLoanList implements OnInit {
  private service = inject(PrestamoService);
  protected solicitudes = signal<any[]>([]);
  protected loading = signal(false);
  protected error = signal('');
  protected motivoRechazo = signal('');
  protected selectedId = signal<number | null>(null);
  protected accion = signal<'aprobar' | 'rechazar' | null>(null);

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.loading.set(true);
    this.service.listar().subscribe({
      next: (res: any) => { this.solicitudes.set(res.data || res); this.loading.set(false); },
      error: (err) => { this.loading.set(false); this.error.set(err.error?.message || 'Error al cargar'); },
    });
  }

  confirmarAprobar(id: number) {
    this.selectedId.set(id);
    this.accion.set('aprobar');
  }

  confirmarRechazar(id: number) {
    this.selectedId.set(id);
    this.accion.set('rechazar');
  }

  ejecutar() {
    const id = this.selectedId();
    if (!id) return;
    this.loading.set(true);
    if (this.accion() === 'aprobar') {
      this.service.aprobar(id).subscribe({ next: () => this.onDone(), error: (err) => this.onError(err) });
    } else {
      this.service.rechazar(id, { motivo: this.motivoRechazo() || 'Sin especificar' }).subscribe({ next: () => this.onDone(), error: (err) => this.onError(err) });
    }
  }

  private onDone() { this.loading.set(false); this.accion.set(null); this.selectedId.set(null); this.motivoRechazo.set(''); this.cargar(); }
  private onError(err: any) { this.loading.set(false); this.error.set(err.error?.message || 'Error'); }
}
