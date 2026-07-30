import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpInput, BcpButton, BcpAlert } from '../../../../shared/ui';
import { ServicioService, type CrearServicioDTO } from '../../../../core';

@Component({
  selector: 'app-backoffice-services',
  imports: [CommonModule, FormsModule, RouterModule, BcpInput, BcpButton, BcpAlert],
  templateUrl: './backoffice-services.html',
})
export class BackofficeServices implements OnInit {
  private service = inject(ServicioService);
  protected servicios = signal<any[]>([]);
  protected loading = signal(false);
  protected error = signal('');
  protected editMode = signal(false);
  protected editId = signal<number | null>(null);
  protected form = { nombre: '', descripcion: '', recibo: '' };

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading.set(true);
    this.service.obtener(0).subscribe({
      next: (res) => { this.servicios.set(res.data || res); this.loading.set(false); },
      error: () => { this.loading.set(false); },
    });
  }

  guardar() {
    if (!this.form.nombre) return;
    this.loading.set(true);
    const payload: CrearServicioDTO = { nombre: this.form.nombre, descripcion: this.form.descripcion, recibo: Number(this.form.recibo) || 0 };
    const obs = this.editId() ? this.service.editar(this.editId()!, payload) : this.service.crear(payload);
    obs.subscribe({
      next: () => { this.loading.set(false); this.cancelarEdicion(); this.cargar(); },
      error: (err) => { this.loading.set(false); this.error.set('Error al guardar'); },
    });
  }

  editar(s: any) {
    this.editMode.set(true);
    this.editId.set(s.idServicio);
    this.form = { nombre: s.nombre, descripcion: s.descripcion || '', recibo: String(s.recibo || '') };
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar servicio?')) return;
    this.service.eliminar(id).subscribe({ next: () => this.cargar() });
  }

  cancelarEdicion() { this.editMode.set(false); this.editId.set(null); this.form = { nombre: '', descripcion: '', recibo: '' }; }
}
