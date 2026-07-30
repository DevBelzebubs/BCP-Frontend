import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);

  listarEmpleadosConRoles(): Observable<any> {
    return this.http.get(`${API_URL}/api/admin/usuarios/roles`);
  }

  cambiarRolEmpleado(empleadoId: number, nuevoRol: string): Observable<any> {
    return this.http.put(`${API_URL}/api/admin/usuarios/${empleadoId}/rol`, { nuevoRol });
  }

  listarAuditoriaRoles(): Observable<any> {
    return this.http.get(`${API_URL}/api/admin/auditoria/roles`);
  }

  listarAuditoriaFinanciera(): Observable<any> {
    return this.http.get(`${API_URL}/api/admin/auditoria/financiera`);
  }
}
