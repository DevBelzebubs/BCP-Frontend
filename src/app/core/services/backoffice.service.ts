import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface MarcarSospechosoDTO {
  operacionId: number;
  tipoOperacion: string;
  justificacion: string;
}

export interface ConciliacionRequestDTO {
  fechaConciliacion: string;
  operaciones: Array<{
    idOperacionExterna: number;
    fecha: string;
    monto: number;
    tipo: string;
    descripcion: string;
  }>;
}

@Injectable({ providedIn: 'root' })
export class BackofficeService {
  private http = inject(HttpClient);

  listarOperacionesSupervision(): Observable<any> {
    return this.http.get(`${API_URL}/api/backoffice/supervision/operaciones`);
  }

  marcarSospechosa(dto: MarcarSospechosoDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/backoffice/supervision/marcar-sospechosa`, dto);
  }

  generarReporteGlobal(): Observable<Blob> {
    return this.http.get(`${API_URL}/api/backoffice/supervision/reporte-global`, { responseType: 'blob' });
  }

  procesarConciliacion(dto: ConciliacionRequestDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/conciliacion/procesar`, dto);
  }
}
