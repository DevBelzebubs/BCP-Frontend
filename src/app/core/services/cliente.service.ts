import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';

export interface ClienteData {
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
}

export interface ClienteBuscarResponse {
  data: ClienteData | null;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  buscarPorDni(dni: string): Observable<ClienteBuscarResponse> {
    return this.http.get<ClienteBuscarResponse>(
      API_ENDPOINTS.cliente.buscarPorDni(dni)
    );
  }
}
