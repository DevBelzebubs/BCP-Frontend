import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core';

@Component({
  selector: 'app-asesor-overview',
  imports: [CommonModule, RouterModule],
  templateUrl: './asesor-overview.html',
  styleUrl: './asesor-overview.css',
})
export class AsesorOverview {
  private auth = inject(AuthService);
  protected userName = this.auth.getUserName() ?? 'Asesor';
}
