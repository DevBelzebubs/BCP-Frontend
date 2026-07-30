import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReclamoService } from '../../../../core';

@Component({
  selector: 'app-backoffice-claims',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './backoffice-claims.html',
  styleUrl: './backoffice-claims.css',
})
export class BackofficeClaims implements OnInit {
  private service = inject(ReclamoService);
  protected reclamos = signal<any[]>([]);
  protected loading = signal(false);
  protected error = signal('');

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading.set(true);
    this.service.listarTodos().subscribe({
      next: (res: any) => { this.reclamos.set(res.data || res); this.loading.set(false); },
      error: (err) => { this.loading.set(false); this.error.set('Error al cargar reclamos'); },
    });
  }
}
