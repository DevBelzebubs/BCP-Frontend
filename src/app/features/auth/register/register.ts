import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService, CuentaService } from '../../../core';
import { BcpButton, BcpInput, BcpPasswordInput, BcpAlert, BcpSpinner } from '../../../shared/ui';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, BcpButton, BcpInput, BcpPasswordInput, BcpAlert, BcpSpinner],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register implements OnInit {
  tipoCuenta = '';
  nombre = '';
  correo = '';
  dni = '';
  telefono = '';
  contrasena = '';
  confirmContrasena = '';
  direccion = '';
  aceptaTerminos = false;

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  isDniVerified = signal(false);
  isDniLoading = signal(false);
  isDniSearched = signal(false);

  currentStep = signal(1);

  touchedNombre = signal(false);
  touchedCorreo = signal(false);
  touchedTelefono = signal(false);
  touchedDireccion = signal(false);

  readonly accountTypeLabels: Record<string, string> = {
    AHORROS: 'Cuenta de Ahorros',
    CORRIENTE: 'Cuenta Corriente',
    CUENTA_SUELDO: 'Cuenta Sueldo',
    PLAZO_FIJO: 'Depósito a Plazo Fijo'
  };

  readonly steps = [
    { number: 1, label: 'DNI', desc: 'Identificación' },
    { number: 2, label: 'Datos Personales', desc: 'Información personal' },
    { number: 3, label: 'Seguridad', desc: 'Contraseña y términos' },
    { number: 4, label: 'Confirmación', desc: 'Revisa tus datos' },
  ];

  constructor(
    private clienteService: ClienteService,
    private cuentaService: CuentaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tipoCuenta = this.route.snapshot.queryParamMap.get('tipo') || 'AHORROS';
  }

  private searchDni(dni: string) {
    this.isDniLoading.set(true);
    this.clienteService.buscarPorDni(dni).subscribe({
      next: (response) => {
        this.isDniLoading.set(false);
        this.isDniSearched.set(true);
        if (response.data) {
          this.nombre = response.data.nombre || '';
          this.correo = response.data.correo || '';
          this.telefono = response.data.telefono || '';
          this.direccion = response.data.direccion || '';
          this.isDniVerified.set(true);
        } else {
          this.isDniVerified.set(false);
        }
      },
      error: () => {
        this.isDniLoading.set(false);
        this.isDniSearched.set(true);
        this.isDniVerified.set(false);
      },
    });
  }

  onDniInput() {
    this.isDniSearched.set(false);
    this.isDniVerified.set(false);
    if (this.dni.trim().length === 8) {
      this.searchDni(this.dni.trim());
    }
  }

  canGoNext(): boolean {
    switch (this.currentStep()) {
      case 1: return this.dni.trim().length === 8 && this.isDniSearched();
      case 2: return !!(this.nombre.trim() && this.correo.trim());
      case 3: return !!(this.contrasena && this.contrasena === this.confirmContrasena && this.aceptaTerminos);
      case 4: return true;
      default: return false;
    }
  }

  nextStep() {
    if (this.canGoNext() && this.currentStep() < 4) {
      if (this.currentStep() === 2) {
        this.touchedNombre.set(true);
        this.touchedCorreo.set(true);
      }
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  goToStep(step: number) {
    if (step < this.currentStep()) {
      this.currentStep.set(step);
    }
  }

  goBack() {
    this.router.navigate(['/abrir-cuenta']);
  }

  goToLogin() {
    this.router.navigate(['/dashboard']);
  }

  editStep(step: number) {
    this.currentStep.set(step);
  }

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.cuentaService.abrirCuenta({
      dni: this.dni,
      tipoCuenta: this.tipoCuenta,
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena,
      telefono: this.telefono,
      direccion: this.direccion,
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('¡Cuenta creada exitosamente!');
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.friendlyMessage || 'Error al crear la cuenta. Inténtalo de nuevo.');
      },
    });
  }

  get passwordStrength(): 'none' | 'weak' | 'medium' | 'strong' {
    const p = this.contrasena;
    if (!p) return 'none';
    if (p.length < 6) return 'weak';
    if (p.length < 10) return 'medium';
    const hasUpper = /[A-Z]/.test(p);
    const hasLower = /[a-z]/.test(p);
    const hasDigit = /\d/.test(p);
    const hasSpecial = /[^A-Za-z0-9]/.test(p);
    const score = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;
    if (score >= 3) return 'strong';
    return 'medium';
  }
}
