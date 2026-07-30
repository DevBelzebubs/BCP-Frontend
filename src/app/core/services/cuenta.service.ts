import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';

export interface AbrirCuentaPayload {
  dni: string;
  tipoCuenta: string;
  nombre?: string;
  correo?: string;
  contrasena?: string;
  telefono?: string;
  direccion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CuentaService {

  constructor(private http: HttpClient) {}

  abrirCuenta(data: AbrirCuentaPayload): Observable<any> {
    return this.http.post<any>(
      API_ENDPOINTS.cuentas.abrirCuenta,
      data
    );
  }
}
