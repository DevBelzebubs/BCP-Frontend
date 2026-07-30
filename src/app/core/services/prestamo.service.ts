import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface SolicitudCreditoDTO {
  usuarioId: number;
  monto: number;
  plazoMeses: number;
}

export interface PrestamoResponseDTO {
  id: number;
  usuarioId: number;
  monto: number;
  plazoMeses: number;
  interes: number;
  estado: string;
}

export interface RechazoRequestDTO {
  motivo: string;
}

@Injectable({ providedIn: 'root' })
export class PrestamoService {
  private http = inject(HttpClient);

  solicitar(dto: SolicitudCreditoDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/prestamos/solicitar`, dto);
  }

  listar(): Observable<any> {
    return this.http.get(`${API_URL}/api/prestamos`);
  }

  obtener(id: number): Observable<any> {
    return this.http.get(`${API_URL}/api/prestamos/${id}`);
  }

  aprobar(id: number): Observable<any> {
    return this.http.post(`${API_URL}/api/prestamos/${id}/aprobar`, {});
  }

  rechazar(id: number, dto: RechazoRequestDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/prestamos/${id}/rechazar`, dto);
  }

  solicitarDocumentacion(id: number): Observable<any> {
    return this.http.post(`${API_URL}/api/prestamos/${id}/solicitar-documentacion`, {});
  }
}
