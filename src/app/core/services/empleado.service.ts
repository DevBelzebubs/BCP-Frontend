import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

export interface DepositoVentanillaDTO {
  clienteDni: string;
  numeroCuenta: string;
  monto: number;
}

export interface RetiroVentanillaDTO {
  clienteDni: string;
  numeroCuenta: string;
  monto: number;
}

export interface PagoVentanillaDTO {
  clienteDni: string;
  numeroCuenta: string;
  pagoId: number;
}

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private http = inject(HttpClient);

  depositar(dto: DepositoVentanillaDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/empleado/operaciones-ventanilla/deposito`, dto);
  }

  retirar(dto: RetiroVentanillaDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/empleado/operaciones-ventanilla/retiro`, dto);
  }

  pagar(dto: PagoVentanillaDTO): Observable<any> {
    return this.http.post(`${API_URL}/api/empleado/operaciones-ventanilla/pago`, dto);
  }
}
