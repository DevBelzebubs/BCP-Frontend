import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core';

@Component({
  selector: 'app-backoffice-overview',
  imports: [CommonModule, RouterModule],
  templateUrl: './backoffice-overview.html',
})
export class BackofficeOverview {
  private auth = inject(AuthService);
  protected userName = this.auth.getUserName() ?? 'Backoffice';
}
