import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminService } from '../../../../core';

@Component({
  selector: 'app-admin-audit-financial',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-audit-financial.html',
  styleUrl: './admin-audit-financial.css',
})
export class AdminAuditFinancial implements OnInit {
  private service = inject(AdminService);
  protected registros = signal<any[]>([]);
  protected loading = signal(false);
  protected error = signal('');

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading.set(true);
    this.service.listarAuditoriaFinanciera().subscribe({
      next: (res: any) => { this.registros.set(res.data || res); this.loading.set(false); },
      error: () => { this.loading.set(false); this.error.set('Error al cargar auditoría'); },
    });
  }
}
