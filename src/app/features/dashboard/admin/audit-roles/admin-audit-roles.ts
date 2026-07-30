import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminService } from '../../../../core';

@Component({
  selector: 'app-admin-audit-roles',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-audit-roles.html',
})
export class AdminAuditRoles implements OnInit {
  private service = inject(AdminService);
  protected registros = signal<any[]>([]);
  protected loading = signal(false);
  protected error = signal('');

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading.set(true);
    this.service.listarAuditoriaRoles().subscribe({
      next: (res: any) => { this.registros.set(res.data || res); this.loading.set(false); },
      error: () => { this.loading.set(false); this.error.set('Error al cargar auditoría'); },
    });
  }
}
