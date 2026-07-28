import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
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

  private countdownInterval?: ReturnType<typeof setInterval>;
  private readonly API_URL = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private router: Router) {
    this.generateCaptcha();
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

  generateCaptcha(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  refreshCaptcha() {
    this.captchaText.set(this.generateCaptcha());
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

    this.http.post<any>(this.API_URL, {
      nombre: this.nombre,
      contrasena: this.contrasena,
      tipoUsuario: this.tipoUsuario
    }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        const data = response.data || response;
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.nombre);
        localStorage.setItem('userType', data.tipoUsuario);
        localStorage.setItem('userDni', data.dni);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Credenciales incorrectas. Inténtalo de nuevo.');
        this.refreshCaptcha();
      }
    });
  }
}
