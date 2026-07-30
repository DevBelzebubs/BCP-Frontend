import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface CrearReclamoRequestDTO {
  dniCliente: string;
  descripcion: string;
}

export interface ReclamoResponseDTO {
  idReclamo: number;
  clienteId: number;
  empleadoId: number;
  fechaCreacion: string;
  descripcion: string;
  estadoReclamo: string;
  respuesta: string;
  numeroSeguimiento: string;
}

@Injectable({ providedIn: 'root' })
export class ReclamoService {
  private http = inject(HttpClient);

  crear(dto: CrearReclamoRequestDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/reclamos`, dto);
  }

  obtener(id: number): Observable<any> {
    return this.http.get(`${API_URL}/api/reclamos/${id}`);
  }

  listarTodos(): Observable<any> {
    return this.http.get(`${API_URL}/api/reclamos`);
  }

  listarPorCliente(clienteId: number): Observable<any> {
    return this.http.get(`${API_URL}/api/reclamos/cliente/${clienteId}`);
  }
}
