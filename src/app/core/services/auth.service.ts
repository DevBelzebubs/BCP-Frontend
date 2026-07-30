import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AUTH_ENDPOINTS } from '../config/api.config';

export interface AuthResponse {
  token: string;
  nombre: string;
  tipoUsuario: string;
  dni: string;
}

export interface LoginPayload {
  nombre: string;
  contrasena: string;
  tipoUsuario: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly userNameKey = 'userName';
  private readonly userTypeKey = 'userType';
  private readonly userDniKey = 'userDni';

  isAuthenticated = signal(this.hasToken());
  userType = signal<string | null>(this.getUserType());

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<any>(
      AUTH_ENDPOINTS.login,
      payload
    ).pipe(
      tap((response: any) => {
        const data = response.data || response;
        this.saveSession(data);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userTypeKey);
    localStorage.removeItem(this.userDniKey);
    this.isAuthenticated.set(false);
    this.userType.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  getUserType(): string | null {
    return localStorage.getItem(this.userTypeKey);
  }

  getUserDni(): string | null {
    return localStorage.getItem(this.userDniKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private saveSession(data: AuthResponse): void {
    localStorage.setItem(this.tokenKey, data.token);
    localStorage.setItem(this.userNameKey, data.nombre);
    localStorage.setItem(this.userTypeKey, data.tipoUsuario);
    localStorage.setItem(this.userDniKey, data.dni);
    this.isAuthenticated.set(true);
    this.userType.set(data.tipoUsuario);
  }

  generateCaptcha(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
