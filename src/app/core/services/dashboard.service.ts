import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface UsuarioInfo {
  id: number;
  nombre: string;
  correo: string;
  dni: string;
  direccion: string;
  telefono: string;
}

export interface Movimiento {
  id: number;
  tipo: string;
  monto: number;
  fecha: string;
}

export interface DetalleCuenta {
  idCuenta: number;
  tipo: string;
  saldo: number;
  numeroCuenta: string;
  movimientos: Movimiento[];
}

export interface PagoPendiente {
  idPago: number;
  nombreServicio: string;
  montoPendiente: number;
}

export interface DashboardData {
  informacionUsuario: UsuarioInfo;
  cuentas: DetalleCuenta[];
  pagosPendientes: PagoPendiente[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  readonly data = signal<DashboardData | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  getDashboard(): Observable<DashboardData> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<ApiResponse<DashboardData>>(`${API_URL}/api/cliente/dashboard`).pipe(
      map(res => res.data),
      tap({
        next: (data) => {
          this.data.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.friendlyMessage || err.error?.message || 'Error al cargar datos');
        },
      })
    );
  }

  clear(): void {
    this.data.set(null);
    this.loading.set(false);
    this.error.set(null);
  }

  refresh(): void {
    this.getDashboard().subscribe();
  }
}
