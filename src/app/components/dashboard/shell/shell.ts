import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardSidebar } from '../sidebar/sidebar';
import { DashboardHeader } from '../header/header';

@Component({
  selector: 'app-dashboard-shell',
  imports: [CommonModule, RouterModule, DashboardSidebar, DashboardHeader],
  templateUrl: './shell.html',
})
export class DashboardShell {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
