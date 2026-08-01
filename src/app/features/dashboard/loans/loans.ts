import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BcpButton, BcpAlert } from '../../../shared/ui';
import { PrestamoService, type PrestamoResponseDTO } from '../../../core';

@Component({
  selector: 'app-loans',
  imports: [CommonModule, RouterModule, BcpButton, BcpAlert],
  templateUrl: './loans.html',
  styleUrl: './loans.css',
})
export class Loans implements OnInit {
  private prestamoService = inject(PrestamoService);

  protected prestamos = signal<PrestamoResponseDTO[]>([]);
  protected loading = signal(false);
  protected error = signal('');

  protected tienePrestamos = computed(() => this.prestamos().length > 0);

  protected montoSimulacion = signal(10000);
  protected plazoSimulacion = signal(12);
  protected resultadoSimulacion = signal<string | null>(null);

  protected razon = signal('');
  protected documentos = signal<File[]>([]);
  protected modalAbierto = signal(false);
  protected enviando = signal(false);
  protected solicitudExitosa = signal(false);

  protected cuotaEstimada = computed(() => {
    const m = this.montoSimulacion();
    const p = this.plazoSimulacion();
    if (!m || !p || m <= 0 || p <= 0) return null;
    const tasaMensual = 0.125 / 12;
    const cuota = m * (tasaMensual * Math.pow(1 + tasaMensual, p)) / (Math.pow(1 + tasaMensual, p) - 1);
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(cuota);
  });

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.loading.set(true);
    this.error.set('');
    this.prestamoService.listarPorCliente().subscribe({
      next: (res: any) => {
        this.loading.set(false);
        this.prestamos.set(Array.isArray(res) ? res : res.data ?? []);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al cargar préstamos');
      },
    });
  }

  simularCuota() {
    const m = this.montoSimulacion();
    const p = this.plazoSimulacion();
    const tasaMensual = 0.125 / 12;
    const cuota = m * (tasaMensual * Math.pow(1 + tasaMensual, p)) / (Math.pow(1 + tasaMensual, p) - 1);
    this.resultadoSimulacion.set(
      new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(cuota)
    );
  }

  solicitarPrestamo() {
    this.error.set('');
    if (!this.montoSimulacion() || this.montoSimulacion() <= 0) {
      this.error.set('Ingresa un monto válido');
      return;
    }
    if (!this.plazoSimulacion() || this.plazoSimulacion() <= 0) {
      this.error.set('Ingresa un plazo válido');
      return;
    }
    if (!this.razon().trim()) {
      this.error.set('Debes indicar la razón de la solicitud');
      return;
    }
    this.solicitudExitosa.set(false);
    this.modalAbierto.set(true);
  }

  onSeleccionarDocumentos(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivos = input.files ? Array.from(input.files) : [];
    if (archivos.length > 0) {
      this.documentos.set([...this.documentos(), ...archivos]);
    }
    input.value = '';
  }

  quitarDocumento(index: number) {
    this.documentos.set(this.documentos().filter((_, i) => i !== index));
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.enviando.set(false);
    this.solicitudExitosa.set(false);
    this.error.set('');
  }

  confirmarSolicitud() {
    this.error.set('');
    this.enviando.set(true);
    this.prestamoService
      .solicitarConDocumentos(
        { monto: this.montoSimulacion(), plazoMeses: this.plazoSimulacion(), razon: this.razon().trim() },
        this.documentos()
      )
      .subscribe({
        next: () => {
          this.enviando.set(false);
          this.solicitudExitosa.set(true);
          this.cargarPrestamos();
        },
        error: (err) => {
          this.enviando.set(false);
          this.error.set(err.error?.message || 'Error al solicitar préstamo');
        },
      });
  }

  estadoLabel(estado: string): string {
    const map: Record<string, string> = {
      PENDIENTE: 'Pendiente',
      APROBADO: 'Aprobado',
      RECHAZADO: 'Rechazado',
      DESEMBOLSADO: 'Desembolsado',
      PAGADO: 'Pagado',
    };
    return map[estado] ?? estado;
  }

  formatMonto(monto: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
  }
}
