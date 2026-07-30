import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core';

@Component({
  selector: 'app-empleado-overview',
  imports: [CommonModule, RouterModule],
  templateUrl: './empleado-overview.html',
})
export class EmpleadoOverview {
  private auth = inject(AuthService);
  protected userName = this.auth.getUserName() ?? 'Empleado';
  protected today = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
