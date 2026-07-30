import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface CrearServicioDTO {
  nombre: string;
  descripcion: string;
  recibo: number;
}

export interface ServicioResponseDTO {
  idServicio: number;
  nombre: string;
  descripcion: string;
  recibo: number;
}

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private http = inject(HttpClient);

  crear(dto: CrearServicioDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/servicios`, dto);
  }

  editar(id: number, dto: Partial<CrearServicioDTO>): Observable<any> {
    return this.http.put(`${API_URL}/api/servicios/${id}`, dto);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/api/servicios/${id}`);
  }

  obtener(id: number): Observable<any> {
    return this.http.get(`${API_URL}/api/servicios/${id}`);
  }
}
