import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BcpButton, BcpAlert } from '../../../shared/ui';
import { AuthService, DashboardService, ReclamoService, type ReclamoResponseDTO } from '../../../core';

@Component({
  selector: 'app-claims',
  imports: [CommonModule, FormsModule, RouterModule, BcpButton, BcpAlert],
  templateUrl: './claims.html',
})
export class Claims implements OnInit {
  private reclamoService = inject(ReclamoService);
  private dashboard = inject(DashboardService);
  private auth = inject(AuthService);

  descripcion = '';
  tipoReclamo = signal<string>('RECLAMO');
  categoria = signal<string>('PRODUCTO');
  loading = signal(false);
  error = signal('');
  success = signal(false);
  historialReclamos = signal<ReclamoResponseDTO[]>([]);
  historialLoading = signal(false);

  tiposReclamo = [
    { value: 'QUEJA', label: 'Queja' },
    { value: 'RECLAMO', label: 'Reclamo' },
    { value: 'SUGERENCIA', label: 'Sugerencia' },
  ];

  categorias = [
    { value: 'PRODUCTO', label: 'Producto' },
    { value: 'CUENTAS', label: 'Cuentas' },
    { value: 'TRANSFERENCIAS', label: 'Transferencias' },
    { value: 'TARJETAS', label: 'Tarjetas' },
    { value: 'OTROS', label: 'Otros' },
  ];

  tipoLabel = computed(() => this.tiposReclamo.find(t => t.value === this.tipoReclamo())?.label ?? '');
  categoriaLabel = computed(() => this.categorias.find(c => c.value === this.categoria())?.label ?? '');

  userName = computed(() => this.dashboard.data()?.informacionUsuario.nombre ?? this.auth.getUserName() ?? '');
  hasHistorial = computed(() => this.historialReclamos().length > 0);

  enviarReclamo() {
    if (!this.descripcion.trim()) return;
    this.loading.set(true);
    this.error.set('');
    this.reclamoService.crear({
      dniCliente: this.auth.getUserDni() ?? '',
      descripcion: `[${this.tipoLabel()}] [${this.categoriaLabel()}] ${this.descripcion}`,
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        this.descripcion = '';
        this.cargarHistorial();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al enviar reclamo');
      },
    });
  }

  private cargarHistorial() {
    const clienteId = this.dashboard.data()?.informacionUsuario.id;
    if (!clienteId) return;
    this.historialLoading.set(true);
    this.reclamoService.listarPorCliente(clienteId).subscribe({
      next: (res: any) => {
        this.historialReclamos.set(res.data ?? []);
        this.historialLoading.set(false);
      },
      error: () => this.historialLoading.set(false),
    });
  }

  estadoClass(estado: string): string {
    const map: Record<string, string> = {
      PENDIENTE: 'bg-red-50 text-red-700',
      EN_REVISION: 'bg-yellow-50 text-yellow-700',
      ATENDIDO: 'bg-green-50 text-green-700',
      RECHAZADO: 'bg-gray-100 text-gray-600',
    };
    return map[estado] ?? 'bg-gray-100 text-gray-600';
  }

  estadoLabel(estado: string): string {
    const map: Record<string, string> = {
      PENDIENTE: 'Pendiente',
      EN_REVISION: 'En Revisión',
      ATENDIDO: 'Atendido',
      RECHAZADO: 'Rechazado',
    };
    return map[estado] ?? estado;
  }

  ngOnInit() {
    if (this.dashboard.data()) {
      this.cargarHistorial();
    }
  }
}
