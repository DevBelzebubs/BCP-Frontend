import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, API_ENDPOINTS } from '../config/api.config';

export interface AbrirCuentaPayload {
  dni: string;
  tipoCuenta: string;
  nombre?: string;
  correo?: string;
  contrasena?: string;
  telefono?: string;
  direccion?: string;
}

export interface TransferenciaRequest {
  numeroCuentaDestino: string;
  monto: number;
}

export interface TransferirResponse {
  idTransaccion: string;
}

export interface ConfirmarTransferenciaDTO {
  dni: string;
  codigoOTP: string;
}

export interface HistorialTransferencia {
  id: number;
  cuentaId: number;
  numeroCuenta: string;
  tipo: string;
  monto: number;
  fecha: string;
}


@Injectable({
  providedIn: 'root',
})
export class CuentaService {
  private http = inject(HttpClient);

  abrirCuenta(data: AbrirCuentaPayload): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.cuentas.abrirCuenta, data);
  }

  iniciarTransferencia(cuentaOrigenId: number, data: TransferenciaRequest): Observable<any> {
    return this.http.post(`${API_URL}/api/cuentas/${cuentaOrigenId}/transferir`, data);
  }

  confirmarTransferencia(data: ConfirmarTransferenciaDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/cuentas/confirmar-transferencia`, data);
  }

  getHistorialTransferencias(dni: string): Observable<{ data: HistorialTransferencia[] }> {
    return this.http.get<{ data: HistorialTransferencia[] }>(`${API_URL}/api/cuentas/historial-transferencias/usuario/${dni}`);
  }
}
