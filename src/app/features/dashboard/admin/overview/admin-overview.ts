import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core';

@Component({
  selector: 'app-admin-overview',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-overview.html',
})
export class AdminOverview {
  private auth = inject(AuthService);
  protected userName = this.auth.getUserName() ?? 'Admin';
}
