import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-cuenta',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
})
export class RegistroCuenta implements OnInit {
  tipoCuenta = '';
  nombre = '';
  correo = '';
  dni = '';
  telefono = '';
  contrasena = '';
  direccion = '';

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  isDniVerified = signal(false);
  isDniLoading = signal(false);

  private readonly API_URL = 'http://localhost:8080';

  accountTypeLabels: Record<string, string> = {
    'AHORROS': 'Cuenta de Ahorros',
    'CORRIENTE': 'Cuenta Corriente',
    'CUENTA_SUELDO': 'Cuenta Sueldo',
    'PLAZO_FIJO': 'Depósito a Plazo Fijo',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tipoCuenta = this.route.snapshot.queryParamMap.get('tipo') || 'AHORROS';
  }

  getAccountLabel(): string {
    return this.accountTypeLabels[this.tipoCuenta] || this.tipoCuenta;
  }

  onDniBlur() {
    if (!this.dni || this.dni.length < 8) return;

    this.isDniLoading.set(true);
    this.errorMessage.set('');

    this.http.get<any>(`${this.API_URL}/api/cliente/${this.dni}/buscar`).subscribe({
      next: (response) => {
        this.isDniLoading.set(false);
        if (response.data) {
          this.isDniVerified.set(true);
          this.nombre = response.data.nombre || '';
          this.correo = response.data.correo || '';
          this.telefono = response.data.telefono || '';
          this.direccion = response.data.direccion || '';
        } else {
          this.isDniVerified.set(false);
          this.nombre = '';
          this.correo = '';
          this.telefono = '';
          this.direccion = '';
        }
      },
      error: () => {
        this.isDniLoading.set(false);
        this.isDniVerified.set(false);
      }
    });
  }

  onSubmit() {
    if (!this.dni || this.dni.length < 8) {
      this.errorMessage.set('El DNI debe tener 8 dígitos');
      return;
    }

    if (!this.isDniVerified()) {
      if (!this.nombre || !this.correo || !this.contrasena || !this.telefono || !this.direccion) {
        this.errorMessage.set('Todos los campos son obligatorios');
        return;
      }
    }

    if (!this.isDniVerified() && this.contrasena.length < 4) {
      this.errorMessage.set('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const payload: any = {
      dni: this.dni,
      tipoCuenta: this.tipoCuenta,
    };

    if (!this.isDniVerified()) {
      payload.nombre = this.nombre;
      payload.correo = this.correo;
      payload.contrasena = this.contrasena;
      payload.telefono = this.telefono;
      payload.direccion = this.direccion;
    }

    this.http.post<any>(`${this.API_URL}/api/cuentas/abrir-cuenta`, payload).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.successMessage.set('Cuenta creada exitosamente');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Error al crear la cuenta');
      }
    });
  }
}
