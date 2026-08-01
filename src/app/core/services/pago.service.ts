import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface PagoRequestDTO {
  cuentaId: number;
  pagoId: number;
}

export interface ComprobanteDTO {
  idPago: number;
  servicio: string;
  montoPagado: number;
  fecha: string;
  codigoAutorizacion: string;
}

export interface PagoHistorial {
  idPago: number;
  nombreServicio: string;
  monto: number;
  fecha: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class PagoService {
  private http = inject(HttpClient);

  realizarPago(dto: PagoRequestDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/pagos/realizar`, dto);
  }

  getHistorialPagos(dni: string): Observable<{ data: PagoHistorial[] }> {
    return this.http.get<{ data: PagoHistorial[] }>(`${API_URL}/api/pagos/historial/usuario/${dni}`);
  }
}
