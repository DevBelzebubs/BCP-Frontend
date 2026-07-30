import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BcpInput, BcpPasswordInput, BcpButton, BcpAlert } from '../../../shared/ui';
import { AuthService } from '../../../core';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, BcpInput, BcpPasswordInput, BcpButton, BcpAlert],
  templateUrl: './login.html',
})
export class Login implements OnInit, OnDestroy {
  nombre = '';
  contrasena = '';
  tipoUsuario = '';
  captchaInput = '';

  timeLeft = signal(295);
  captchaText = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  private authService = inject(AuthService);
  private router = inject(Router);

  private countdownInterval?: ReturnType<typeof setInterval>;

  constructor() {
    this.refreshCaptcha();
  }

  ngOnInit() {
    this.countdownInterval = setInterval(() => {
      const current = this.timeLeft();
      if (current <= 0) {
        clearInterval(this.countdownInterval);
        alert('La sesión ha expirado. Serás redirigido al inicio.');
        this.router.navigate(['/']);
        return;
      }
      this.timeLeft.set(current - 1);
    }, 1000);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  formatTime(): string {
    const minutes = Math.floor(this.timeLeft() / 60);
    const seconds = this.timeLeft() % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  refreshCaptcha() {
    this.captchaText.set(this.authService.generateCaptcha());
    this.captchaInput = '';
  }

  onSubmit() {
    if (this.captchaInput !== this.captchaText()) {
      this.errorMessage.set('El código de verificación es incorrecto');
      this.refreshCaptcha();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({
      nombre: this.nombre,
      contrasena: this.contrasena,
      tipoUsuario: this.tipoUsuario
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.friendlyMessage || err.error?.message || 'Credenciales incorrectas. Inténtalo de nuevo.');
        this.refreshCaptcha();
      }
    });
  }
}
