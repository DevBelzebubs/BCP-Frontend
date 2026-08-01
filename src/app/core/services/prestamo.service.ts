import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface SolicitudCreditoDTO {
  monto: number;
  plazoMeses: number;
  razon: string;
}

export interface PrestamoResponseDTO {
  id: number;
  usuarioId: number;
  monto: number;
  plazoMeses: number;
  interes: number;
  estado: string;
  razon: string;
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

  solicitarConDocumentos(dto: SolicitudCreditoDTO, archivos: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('solicitud', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
    for (const archivo of archivos) {
      formData.append('documentos', archivo, archivo.name);
    }
    return this.http.post(`${API_URL}/api/prestamos/solicitar`, formData);
  }

  listar(): Observable<any> {
    return this.http.get(`${API_URL}/api/prestamos`);
  }

  listarPorCliente(): Observable<any> {
    return this.http.get(`${API_URL}/api/prestamos/cliente`);
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
