import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminService } from '../../../../core';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-users.html',
})
export class AdminUsers implements OnInit {
  private service = inject(AdminService);
  protected empleados = signal<any[]>([]);
  protected loading = signal(false);
  protected error = signal('');
  protected cambiando = signal<number | null>(null);
  protected nuevoRol = signal('');

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading.set(true);
    this.service.listarEmpleadosConRoles().subscribe({
      next: (res: any) => { this.empleados.set(res.data || res); this.loading.set(false); },
      error: () => { this.loading.set(false); this.error.set('Error al cargar empleados'); },
    });
  }

  cambiarRol(id: number) {
    if (!this.nuevoRol()) return;
    this.loading.set(true);
    this.service.cambiarRolEmpleado(id, this.nuevoRol()).subscribe({
      next: () => { this.loading.set(false); this.cambiando.set(null); this.nuevoRol.set(''); this.cargar(); },
      error: (err) => { this.loading.set(false); this.error.set(err.error?.message || 'Error al cambiar rol'); },
    });
  }
}
