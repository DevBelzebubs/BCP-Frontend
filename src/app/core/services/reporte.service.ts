import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private http = inject(HttpClient);

  generarDiario(fecha: string): Observable<Blob> {
    return this.http.get(`${API_URL}/api/reportes/diario`, {
      params: { fecha },
      responseType: 'blob'
    });
  }
}
